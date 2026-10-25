const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");
const zlib = require("zlib");

let ResendClass = null;
try {
  ResendClass = require("resend").Resend;
} catch {
  // Graceful fallback if resend is not yet installed
}

const generateETag = (buffer) => {
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 16);
  return `W/"${hash}-${buffer.length}"`;
};

const rootDir = path.resolve(__dirname, "..");

// Auto-load environment variables from .env in root directory if present
const envPath = path.join(rootDir, ".env");
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (err) {
    console.warn("[Env] Warning loading .env file:", err.message);
  }
}

const dbPath = path.join(__dirname, "data", "db.json");
const port = Number(process.env.PORT || 3000);
const isDev = process.env.NODE_ENV !== "production" && process.env.ENVIRONMENT !== "production";
const INSECURE_DEFAULT_PASSWORDS = new Set(["abss2026", "admin", "password", "12345678", "root"]);
const INSECURE_DEFAULT_SECRETS = new Set([
  "abss-production-auth-secret-key-2026",
  "abss-local-dev-secret",
  "abss-local-dev-secret-key-2026",
  "secret",
  "changeme",
]);

const rawAdminUser = (process.env.ADMIN_USERNAME || "").trim();
const rawAdminPass = (process.env.ADMIN_PASSWORD || "").trim();
const rawAuthSecret = (process.env.AUTH_SECRET || "").trim();

const isSecurePassword = (pass) => Boolean(pass && !INSECURE_DEFAULT_PASSWORDS.has(pass.toLowerCase()));
const isSecureSecret = (sec) => Boolean(sec && !INSECURE_DEFAULT_SECRETS.has(sec.toLowerCase()) && sec.length >= 16);

const hasSecureAdminConfig = Boolean(
  rawAdminUser &&
  isSecurePassword(rawAdminPass) &&
  isSecureSecret(rawAuthSecret)
);

const adminUsername = rawAdminUser || (isDev ? "admin" : "");
const adminPassword = rawAdminPass || (isDev ? "abss2026" : "");
const authSecret = rawAuthSecret || (isDev ? "abss-local-dev-secret-key-2026" : "");

const isApiKeyPlaceholder = (val) => !val || val.includes("your_key_here") || val.includes("re_xxxxxxxx");
const checkEmailConfigured = () => Boolean(
  (process.env.RESEND_API_KEY && !isApiKeyPlaceholder(process.env.RESEND_API_KEY)) ||
  (process.env.SENDGRID_API_KEY && !isApiKeyPlaceholder(process.env.SENDGRID_API_KEY))
);

const dispatchServerNotification = async ({ to, subject, html, text }) => {
  const fromAddress = process.env.EMAIL_FROM || "ABSS Nexus Technologies <notifications@abssnexus.in>";
  const plainText = text || (html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
  const recipient = Array.isArray(to) ? to : [to];

  // 1. Resend Official SDK
  if (process.env.RESEND_API_KEY && !isApiKeyPlaceholder(process.env.RESEND_API_KEY)) {
    try {
      console.log(`[EmailService:Resend] Dispatching email to: ${recipient.join(", ")} | Subject: "${subject}"`);
      const resend = ResendClass ? new ResendClass(process.env.RESEND_API_KEY) : null;
      let data, error;

      if (resend) {
        const result = await resend.emails.send({
          from: fromAddress,
          to: recipient,
          subject,
          html,
          text: plainText,
        });
        data = result.data;
        error = result.error;
      } else {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: recipient,
            subject,
            html,
            text: plainText,
          }),
        });
        const json = await response.json().catch(() => ({}));
        if (response.ok) {
          data = json;
        } else {
          error = json;
        }
      }

      if (error) {
        console.error(`[EmailService:Resend] ✗ Error:`, error);
        const errMsg = String(error.message || "").toLowerCase();
        // If custom domain is not yet verified in Resend, automatically retry with sandbox sender
        if (errMsg.includes("domain") || errMsg.includes("verify") || errMsg.includes("not verified")) {
          console.warn(`[EmailService:Resend] Custom domain (${fromAddress}) not verified yet in Resend. Retrying with onboarding@resend.dev...`);
          let retryData, retryError;
          if (resend) {
            const retryRes = await resend.emails.send({
              from: "Abssnexus <onboarding@resend.dev>",
              to: recipient,
              subject,
              html,
              text: plainText,
            });
            retryData = retryRes.data;
            retryError = retryRes.error;
          } else {
            const retryRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              },
              body: JSON.stringify({
                from: "Abssnexus <onboarding@resend.dev>",
                to: recipient,
                subject,
                html,
                text: plainText,
              }),
            });
            const rJson = await retryRes.json().catch(() => ({}));
            if (retryRes.ok) retryData = rJson;
            else retryError = rJson;
          }

          if (!retryError && retryData?.id) {
            console.log(`[EmailService:Resend Sandbox] ✓ Email delivered successfully via onboarding@resend.dev. ID: ${retryData.id}`);
            return { ok: true, provider: "resend-sandbox", id: retryData.id };
          }
          console.error(`[EmailService:Resend Sandbox] ✗ Delivery failed:`, retryError);
          return { ok: false, provider: "resend", error: retryError };
        }

        return { ok: false, provider: "resend", error };
      }

      console.log(`[EmailService:Resend] ✓ Email delivered successfully. ID: ${data?.id}`);
      return { ok: true, provider: "resend", id: data?.id };
    } catch (e) {
      console.error("[EmailService:Resend] ✗ Dispatch error:", e.message);
      return { ok: false, provider: "resend", error: e.message };
    }
  }

  // 2. SendGrid API
  if (process.env.SENDGRID_API_KEY && !isApiKeyPlaceholder(process.env.SENDGRID_API_KEY)) {
    try {
      console.log(`[EmailService:SendGrid] Dispatching email to: ${recipient.join(", ")} | Subject: "${subject}"`);
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: recipient.map((em) => ({ email: em })) }],
          from: { email: process.env.EMAIL_FROM_ADDRESS || "notifications@abssnexus.in", name: "ABSS Nexus Technologies" },
          subject,
          content: [
            { type: "text/plain", value: plainText },
            { type: "text/html", value: html },
          ],
        }),
      });
      if (response.ok || response.status === 202) {
        console.log(`[EmailService:SendGrid] ✓ Email delivered successfully.`);
        return { ok: true, provider: "sendgrid" };
      }
      const data = await response.json().catch(() => ({}));
      console.error(`[EmailService:SendGrid] ✗ API returned status ${response.status}:`, data);
      return { ok: false, provider: "sendgrid", status: response.status, error: data };
    } catch (e) {
      console.error("[EmailService:SendGrid] ✗ Dispatch error:", e.message);
      return { ok: false, provider: "sendgrid", error: e.message };
    }
  }

  // 3. Fallback simulated console log
  console.log(`\n================== [EmailService: Fallback Mode] ==================
[Notice] RESEND_API_KEY or SENDGRID_API_KEY not configured. Falling back to console log.
To: ${recipient.join(", ")}
Subject: "${subject}"
Content Summary: ${plainText.slice(0, 160)}...
===================================================================\n`);
  return { ok: false, simulated: true, provider: "none", message: "API key unconfigured; logged to console." };
};

// =========================================================================
// Real-Time Google Firebase Firestore Synchronizer
// Project: abss-nexus-technologies | Region: asia-south1
// =========================================================================
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyBWZ2Ui1Lgwi5buYkmytubFUOwYjxokRXE";
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "abss-nexus-technologies";
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

const toFirestoreFields = (data) => {
  const fields = {};
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined || val === null) continue;
    if (["password", "passwordHash", "authToken", "secret", "token"].includes(key)) continue;
    if (typeof val === "string") {
      fields[key] = { stringValue: val };
    } else if (typeof val === "number") {
      fields[key] = Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
    } else if (typeof val === "boolean") {
      fields[key] = { booleanValue: val };
    }
  }
  return fields;
};

const syncToFirestoreServer = (collectionName, docId, data) => {
  if (process.env.NODE_ENV === "test" || process.env.SKIP_FIRESTORE_SYNC === "true") return;
  if (!data) return;

  // Only ignore strictly automated regression runners with explicit flag
  const isAutomatedCi = data.client === "Regression Test Client" || data.client === "Firebase Test Client" || data.__isAutomatedRegression === true;
  if (isAutomatedCi) return;

  const safeData = { ...data };
  delete safeData.password;
  delete safeData.passwordHash;
  delete safeData.secret;
  safeData.createdAtIso = safeData.createdAtIso || new Date().toISOString();

  let url = `${FIRESTORE_BASE_URL}/${collectionName}?key=${FIREBASE_API_KEY}`;
  let method = "POST";
  if (docId) {
    const cleanId = String(docId).replace(/[^a-zA-Z0-9_-]/g, "_");
    url = `${FIRESTORE_BASE_URL}/${collectionName}/${encodeURIComponent(cleanId)}?key=${FIREBASE_API_KEY}`;
    method = "PATCH";
  }

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFirestoreFields(safeData) }),
  }).then((res) => {
    if (res.ok) {
      console.log(`[Firestore Server Sync] ✓ Mirrored ${collectionName}/${docId || "doc"} to live Firebase`);
    } else {
      res.json().then((err) => console.warn(`[Firestore Server Sync] Response:`, err?.error?.message || err)).catch(() => {});
    }
  }).catch((err) => {
    console.warn(`[Firestore Server Sync] Non-blocking network error:`, err?.message || err);
  });
};

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxWakMKIDy67PtVMScD8bl4R3N75dfrc3QWwtUkG9zIYQAR5fgtF_UJruR6wrzBy9y4mg/exec";

const syncToGoogleSheetsServer = (type, data) => {
  const webhookUrl = GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl || process.env.NODE_ENV === "test" || !data) return;

  // Only ignore strictly automated regression runners with explicit flag
  const isAutomatedCi = data.client === "Regression Test Client" || data.client === "Firebase Test Client" || data.__isAutomatedRegression === true;
  if (isAutomatedCi) return;

  const safeData = { ...data };
  delete safeData.password;
  delete safeData.passwordHash;
  delete safeData.secret;
  safeData.type = type;
  safeData.timestamp = safeData.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(safeData),
  }).then((res) => {
    if (res.ok) {
      console.log(`[Google Sheets Server Sync] ✓ Appended row to Google Sheet (${type})`);
    }
  }).catch((err) => {
    console.warn(`[Google Sheets Server Sync] Non-blocking network error:`, err?.message || err);
  });
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const publicRedirects = {
  "/index.html": "/",
  "/src/pages/index": "/",
  "/src/pages/index.html": "/",
  "/about.html": "/about",
  "/src/pages/about": "/about",
  "/src/pages/about.html": "/about",
  "/services.html": "/services",
  "/src/pages/services": "/services",
  "/src/pages/services.html": "/services",
  "/projects.html": "/projects",
  "/src/pages/projects": "/projects",
  "/src/pages/projects.html": "/projects",
  "/contact.html": "/contact",
  "/src/pages/contact": "/contact",
  "/src/pages/contact.html": "/contact",
  "/privacy-policy.html": "/privacy-policy",
  "/src/pages/privacy-policy": "/privacy-policy",
  "/src/pages/privacy-policy.html": "/privacy-policy",
  "/terms-conditions": "/terms-and-conditions",
  "/terms-conditions.html": "/terms-and-conditions",
  "/terms-and-conditions.html": "/terms-and-conditions",
  "/src/pages/terms-conditions": "/terms-and-conditions",
  "/src/pages/terms-conditions.html": "/terms-and-conditions",
  "/disclaimer.html": "/disclaimer",
  "/src/pages/disclaimer": "/disclaimer",
  "/src/pages/disclaimer.html": "/disclaimer",
  "/refund-policy.html": "/refund-policy",
  "/src/pages/refund-policy": "/refund-policy",
  "/src/pages/refund-policy.html": "/refund-policy",
  "/support-policy.html": "/support-policy",
  "/src/pages/support-policy": "/support-policy",
  "/src/pages/support-policy.html": "/support-policy",
  "/sitemap.html": "/sitemap",
  "/src/pages/sitemap": "/sitemap",
  "/src/pages/sitemap.html": "/sitemap",
  "/solutions.html": "/solutions",
  "/src/pages/solutions": "/solutions",
  "/src/pages/solutions.html": "/solutions",
  "/solutions/": "/solutions",
  "/industries.html": "/industries",
  "/src/pages/industries": "/industries",
  "/src/pages/industries.html": "/industries",
  "/industries/": "/industries",
  "/terms": "/terms-and-conditions",
  "/terms/": "/terms-and-conditions",
  "/terms.html": "/terms-and-conditions",
  "/careers.html": "/careers",
  "/src/pages/careers": "/careers",
  "/src/pages/careers.html": "/careers",
  "/careers/": "/careers",
  "/blog.html": "/blog",
  "/src/pages/blog": "/blog",
  "/src/pages/blog.html": "/blog",
  "/blog/": "/blog",
  "/blog/modern-web-performance-core-web-vitals.html": "/blog/modern-web-performance-core-web-vitals",
  "/src/pages/blog-modern-web-performance": "/blog/modern-web-performance-core-web-vitals",
  "/src/pages/blog-modern-web-performance.html": "/blog/modern-web-performance-core-web-vitals",
  "/blog/modern-web-performance-core-web-vitals/": "/blog/modern-web-performance-core-web-vitals",
  "/blog/resilient-cloud-architecture-edge-computing.html": "/blog/resilient-cloud-architecture-edge-computing",
  "/src/pages/blog-resilient-cloud-architecture": "/blog/resilient-cloud-architecture-edge-computing",
  "/src/pages/blog-resilient-cloud-architecture.html": "/blog/resilient-cloud-architecture-edge-computing",
  "/blog/resilient-cloud-architecture-edge-computing/": "/blog/resilient-cloud-architecture-edge-computing",
  "/blog/minimalist-design-systems-conversion.html": "/blog/minimalist-design-systems-conversion",
  "/src/pages/blog-minimalist-design-systems": "/blog/minimalist-design-systems-conversion",
  "/src/pages/blog-minimalist-design-systems.html": "/blog/minimalist-design-systems-conversion",
  "/blog/minimalist-design-systems-conversion/": "/blog/minimalist-design-systems-conversion",
  "/blog/website-cost-breakdown-india.html": "/blog/website-cost-breakdown-india",
  "/src/pages/blog-website-cost-breakdown-india": "/blog/website-cost-breakdown-india",
  "/src/pages/blog-website-cost-breakdown-india.html": "/blog/website-cost-breakdown-india",
  "/blog/website-cost-breakdown-india/": "/blog/website-cost-breakdown-india",
  "/blog/msme-digital-verification.html": "/blog/msme-digital-verification",
  "/src/pages/blog-msme-digital-verification": "/blog/msme-digital-verification",
  "/src/pages/blog-msme-digital-verification.html": "/blog/msme-digital-verification",
  "/blog/msme-digital-verification/": "/blog/msme-digital-verification",
  "/blog/internship-vs-fulltime-career.html": "/blog/internship-vs-fulltime-career",
  "/src/pages/blog-internship-vs-fulltime-career": "/blog/internship-vs-fulltime-career",
  "/src/pages/blog-internship-vs-fulltime-career.html": "/blog/internship-vs-fulltime-career",
  "/blog/internship-vs-fulltime-career/": "/blog/internship-vs-fulltime-career",
  "/faq.html": "/faq",
  "/src/pages/faq": "/faq",
  "/src/pages/faq.html": "/faq",
  "/faq/": "/faq",
  "/cookie-policy.html": "/cookie-policy",
  "/src/pages/cookie-policy": "/cookie-policy",
  "/src/pages/cookie-policy.html": "/cookie-policy",
  "/cookie-policy/": "/cookie-policy",
  "/service-website-development": "/services/website-development",
  "/service-website-development.html": "/services/website-development",
  "/src/pages/service-website-development": "/services/website-development",
  "/src/pages/service-website-development.html": "/services/website-development",
  "/services/website-development/": "/services/website-development",
  "/service-software-development": "/services/software-development",
  "/service-software-development.html": "/services/software-development",
  "/src/pages/service-software-development": "/services/software-development",
  "/src/pages/service-software-development.html": "/services/software-development",
  "/services/software-development/": "/services/software-development",
  "/service-mobile-app-development": "/services/mobile-app-development",
  "/service-mobile-app-development.html": "/services/mobile-app-development",
  "/src/pages/service-mobile-app-development": "/services/mobile-app-development",
  "/src/pages/service-mobile-app-development.html": "/services/mobile-app-development",
  "/services/mobile-app-development/": "/services/mobile-app-development",
  "/service-ui-ux-design": "/services/ui-ux-design",
  "/service-ui-ux-design.html": "/services/ui-ux-design",
  "/src/pages/service-ui-ux-design": "/services/ui-ux-design",
  "/src/pages/service-ui-ux-design.html": "/services/ui-ux-design",
  "/services/ui-ux-design/": "/services/ui-ux-design",
  "/service-ai-machine-learning": "/services/ai-machine-learning",
  "/service-ai-machine-learning.html": "/services/ai-machine-learning",
  "/src/pages/service-ai-machine-learning": "/services/ai-machine-learning",
  "/src/pages/service-ai-machine-learning.html": "/services/ai-machine-learning",
  "/services/ai-machine-learning/": "/services/ai-machine-learning",
  "/service-cloud-computing": "/services/cloud-computing",
  "/service-cloud-computing.html": "/services/cloud-computing",
  "/src/pages/service-cloud-computing": "/services/cloud-computing",
  "/src/pages/service-cloud-computing.html": "/services/cloud-computing",
  "/services/cloud-computing/": "/services/cloud-computing",
  "/service-cybersecurity": "/services/cybersecurity",
  "/service-cybersecurity.html": "/services/cybersecurity",
  "/src/pages/service-cybersecurity": "/services/cybersecurity",
  "/src/pages/service-cybersecurity.html": "/services/cybersecurity",
  "/services/cybersecurity/": "/services/cybersecurity",
  "/service-data-analytics-bi": "/services/data-analytics-bi",
  "/service-data-analytics-bi.html": "/services/data-analytics-bi",
  "/src/pages/service-data-analytics-bi": "/services/data-analytics-bi",
  "/src/pages/service-data-analytics-bi.html": "/services/data-analytics-bi",
  "/services/data-analytics-bi/": "/services/data-analytics-bi",
  "/service-digital-marketing-seo": "/services/digital-marketing-seo",
  "/service-digital-marketing-seo.html": "/services/digital-marketing-seo",
  "/src/pages/service-digital-marketing-seo": "/services/digital-marketing-seo",
  "/src/pages/service-digital-marketing-seo.html": "/services/digital-marketing-seo",
  "/services/digital-marketing-seo/": "/services/digital-marketing-seo",
  "/service-ecommerce-development": "/services/ecommerce-development",
  "/service-ecommerce-development.html": "/services/ecommerce-development",
  "/src/pages/service-ecommerce-development": "/services/ecommerce-development",
  "/src/pages/service-ecommerce-development.html": "/services/ecommerce-development",
  "/services/ecommerce-development/": "/services/ecommerce-development",
  "/service-saas-development": "/services/saas-development",
  "/service-saas-development.html": "/services/saas-development",
  "/src/pages/service-saas-development": "/services/saas-development",
  "/src/pages/service-saas-development.html": "/services/saas-development",
  "/services/saas-development/": "/services/saas-development",
  "/service-api-integration": "/services/api-integration",
  "/service-api-integration.html": "/services/api-integration",
  "/src/pages/service-api-integration": "/services/api-integration",
  "/src/pages/service-api-integration.html": "/services/api-integration",
  "/services/api-integration/": "/services/api-integration",
  "/service-software-testing-qa": "/services/software-testing-qa",
  "/service-software-testing-qa.html": "/services/software-testing-qa",
  "/src/pages/service-software-testing-qa": "/services/software-testing-qa",
  "/src/pages/service-software-testing-qa.html": "/services/software-testing-qa",
  "/services/software-testing-qa/": "/services/software-testing-qa",
  "/service-it-consulting": "/services/it-consulting",
  "/service-it-consulting.html": "/services/it-consulting",
  "/src/pages/service-it-consulting": "/services/it-consulting",
  "/src/pages/service-it-consulting.html": "/services/it-consulting",
  "/services/it-consulting/": "/services/it-consulting",
  "/service-website-maintenance": "/services/website-maintenance",
  "/service-website-maintenance.html": "/services/website-maintenance",
  "/src/pages/service-website-maintenance": "/services/website-maintenance",
  "/src/pages/service-website-maintenance.html": "/services/website-maintenance",
  "/services/website-maintenance/": "/services/website-maintenance",
  "/case-study-template.html": "/projects",
  "/src/pages/case-study-template": "/projects",
  "/src/pages/case-study-template.html": "/projects",
  "/about/": "/about",
  "/services/": "/services",
  "/pricing.html": "/pricing",
  "/src/pages/pricing": "/pricing",
  "/src/pages/pricing.html": "/pricing",
  "/pricing/": "/pricing",
  "/projects/": "/projects",
  "/contact/": "/contact",
  "/privacy-policy/": "/privacy-policy",
  "/terms-and-conditions/": "/terms-and-conditions",
  "/disclaimer/": "/disclaimer",
  "/refund-policy/": "/refund-policy",
  "/support-policy/": "/support-policy",
  "/sitemap/": "/sitemap",
  "/admin": "/admin/",
  "/admin-login": "/admin/login",
  "/admin-login/": "/admin/login",
  "/admin-dashboard": "/admin/",
  "/admin-dashboard/": "/admin/",
  "/admin-leads": "/admin/leads",
  "/admin-leads/": "/admin/leads",
  "/admin-projects": "/admin/projects",
  "/admin-projects/": "/admin/projects",
  "/admin-clients": "/admin/clients",
  "/admin-clients/": "/admin/clients",
  "/admin-support": "/admin/support",
  "/admin-support/": "/admin/support",
  "/admin-pricing": "/admin/pricing",
  "/admin-pricing/": "/admin/pricing",

  "/internships.html": "/internships",
  "/src/pages/internships": "/internships",
  "/src/pages/internships.html": "/internships",
  "/internships/": "/internships",

  "/internships-about.html": "/internships/about",
  "/src/pages/internships-about": "/internships/about",
  "/src/pages/internships-about.html": "/internships/about",
  "/internships/about/": "/internships/about",

  "/internships-details.html": "/internships/details",
  "/src/pages/internships-details": "/internships/details",
  "/src/pages/internships-details.html": "/internships/details",
  "/internships/details/": "/internships/details",

  "/internships-contact.html": "/internships/contact",
  "/src/pages/internships-contact": "/internships/contact",
  "/src/pages/internships-contact.html": "/internships/contact",
  "/internships/contact/": "/internships/contact",

  "/internships-privacy-policy.html": "/internships/privacy-policy",
  "/src/pages/internships-privacy-policy": "/internships/privacy-policy",
  "/src/pages/internships-privacy-policy.html": "/internships/privacy-policy",
  "/internships/privacy-policy/": "/internships/privacy-policy",

  "/internships-terms-conditions.html": "/internships/terms-and-conditions",
  "/src/pages/internships-terms-conditions": "/internships/terms-and-conditions",
  "/src/pages/internships-terms-conditions.html": "/internships/terms-and-conditions",
  "/internships/terms-and-conditions/": "/internships/terms-and-conditions",
  "/internships/terms/": "/internships/terms-and-conditions",

  "/internships-programs.html": "/internships/programs",
  "/src/pages/internships-programs": "/internships/programs",
  "/src/pages/internships-programs.html": "/internships/programs",
  "/internships/programs/": "/internships/programs",

  "/internships/programs/web-development/": "/internships/programs/web-development",
  "/internships/programs/data-science/": "/internships/programs/data-science",
  "/internships/programs/machine-learning/": "/internships/programs/machine-learning",
  "/internships/programs/data-analyst/": "/internships/programs/data-analyst",
  "/internships/programs/cyber-security/": "/internships/programs/cyber-security",
  "/internships/programs/software-development/": "/internships/programs/software-development",
  "/internships/programs/prompt-engineering/": "/internships/programs/prompt-engineering",
  "/internships/programs/agent-engineering/": "/internships/programs/agent-engineering",
  "/internships/programs/ai-engineering/": "/internships/programs/ai-engineering",
  "/internships/programs/android-development/": "/internships/programs/android-development",
  "/internships/programs/product-management/": "/internships/programs/product-management",
  "/internships/programs/ui-ux-design/": "/internships/programs/ui-ux-design",
  "/internships/programs/graphics-design/": "/internships/programs/graphics-design",
  "/internships/programs/human-resources/": "/internships/programs/human-resources",
  "/internships/programs/digital-marketing/": "/internships/programs/digital-marketing",
  "/internships/programs/content-writing/": "/internships/programs/content-writing",
  "/internships/programs/cloud-devops/": "/internships/programs/cloud-devops",

  "/internships-how-it-works.html": "/internships/how-it-works",
  "/src/pages/internships-how-it-works": "/internships/how-it-works",
  "/src/pages/internships-how-it-works.html": "/internships/how-it-works",
  "/internships/how-it-works/": "/internships/how-it-works",

  "/internships-faq.html": "/internships/faq",
  "/src/pages/internships-faq": "/internships/faq",
  "/src/pages/internships-faq.html": "/internships/faq",
  "/internships/faq/": "/internships/faq",

  "/internships-support.html": "/internships/support",
  "/src/pages/internships-support": "/internships/support",
  "/src/pages/internships-support.html": "/internships/support",
  "/internships/support/": "/internships/support",

  "/internships-register.html": "/internships/register",
  "/src/pages/internships-register": "/internships/register",
  "/src/pages/internships-register.html": "/internships/register",
  "/internships/register/": "/internships/register",

  "/internships-login.html": "/internships/login",
  "/src/pages/internships-login": "/internships/login",
  "/src/pages/internships-login.html": "/internships/login",
  "/internships/login/": "/internships/login",

  "/internships-verify-email.html": "/internships/verify-email",
  "/src/pages/internships-verify-email": "/internships/verify-email",
  "/src/pages/internships-verify-email.html": "/internships/verify-email",
  "/internships/verify-email/": "/internships/verify-email",

  "/internships-forgot-password.html": "/internships/forgot-password",
  "/src/pages/internships-forgot-password": "/internships/forgot-password",
  "/src/pages/internships-forgot-password.html": "/internships/forgot-password",
  "/internships/forgot-password/": "/internships/forgot-password",

  "/internships-reset-password.html": "/internships/reset-password",
  "/src/pages/internships-reset-password": "/internships/reset-password",
  "/src/pages/internships-reset-password.html": "/internships/reset-password",
  "/internships/reset-password/": "/internships/reset-password",

  "/internships-dashboard.html": "/internships/dashboard",
  "/src/pages/internships-dashboard": "/internships/dashboard",
  "/src/pages/internships-dashboard.html": "/internships/dashboard",
  "/internships/dashboard/": "/internships/dashboard",

  "/work.html": "/work",
  "/src/pages/work": "/work",
  "/src/pages/work.html": "/work",
  "/work/": "/work",
  "/work/fintech-payment-gateway/": "/work/fintech-payment-gateway",
  "/work/healthcare-telemedicine-platform/": "/work/healthcare-telemedicine-platform",
  "/work/ecommerce-headless-storefront/": "/work/ecommerce-headless-storefront",

  "/careers/senior-fullstack-engineer/": "/careers/senior-fullstack-engineer",
  "/careers/lead-ui-ux-designer/": "/careers/lead-ui-ux-designer",
  "/careers/cloud-devops-architect/": "/careers/cloud-devops-architect",

  "/services/managed-it-support/": "/services/managed-it-support",
  "/services/data-analytics/": "/services/data-analytics",
  "/services/software-testing/": "/services/software-testing",

  "/internships/application-status/": "/internships/application-status",
  "/internships/payment-status/": "/internships/payment-status",

  "/verify-certificate.html": "/verify-certificate",
  "/src/pages/verify-certificate": "/verify-certificate",
  "/src/pages/verify-certificate.html": "/verify-certificate",
  "/verify-certificate/": "/verify-certificate",

  "/register.html": "/register",
  "/src/pages/register": "/register",
  "/src/pages/register.html": "/register",
  "/register/": "/register",

  "/login.html": "/login",
  "/src/pages/login": "/login",
  "/src/pages/login.html": "/login",
  "/login/": "/login",

  "/verify-email.html": "/verify-email",
  "/src/pages/verify-email": "/verify-email",
  "/src/pages/verify-email.html": "/verify-email",
  "/verify-email/": "/verify-email",

  "/forgot-password.html": "/forgot-password",
  "/src/pages/forgot-password": "/forgot-password",
  "/src/pages/forgot-password.html": "/forgot-password",
  "/forgot-password/": "/forgot-password",

  "/reset-password.html": "/reset-password",
  "/src/pages/reset-password": "/reset-password",
  "/src/pages/reset-password.html": "/reset-password",
  "/reset-password/": "/reset-password",

  "/student": "/student/dashboard",
  "/student/": "/student/dashboard",
  "/student/dashboard/": "/student/dashboard",
  "/student/profile/": "/student/profile",
  "/student/applications/": "/student/applications",
  "/student/internship/": "/student/internship",
  "/student/tasks/": "/student/tasks",
  "/student/submissions/": "/student/submissions",
  "/student/submit-work/": "/student/submit-work",
  "/student/certificates/": "/student/certificates",
  "/student/settings/": "/student/settings",

  "/admin/dashboard/": "/admin/dashboard",
  "/admin/programs/": "/admin/programs",
  "/admin/applications/": "/admin/applications",
  "/admin/students/": "/admin/students",
  "/admin/tasks/": "/admin/tasks",
  "/admin/submissions/": "/admin/submissions",
  "/admin/reviews/": "/admin/reviews",
  "/admin/payments/": "/admin/payments",
  "/admin/certificates/": "/admin/certificates",
  "/admin/users/": "/admin/users",
  "/admin/audit-logs/": "/admin/audit-logs",
  "/admin/settings/": "/admin/settings",
};

const rewrites = {
  "/": "/src/pages/index.html",
  "/about": "/src/pages/about.html",
  "/services": "/src/pages/services.html",
  "/solutions": "/src/pages/solutions.html",
  "/industries": "/src/pages/industries.html",
  "/services/website-development": "/src/pages/service-website-development.html",
  "/services/software-development": "/src/pages/service-software-development.html",
  "/services/mobile-app-development": "/src/pages/service-mobile-app-development.html",
  "/services/ui-ux-design": "/src/pages/service-ui-ux-design.html",
  "/services/ai-machine-learning": "/src/pages/service-ai-machine-learning.html",
  "/services/cloud-computing": "/src/pages/service-cloud-computing.html",
  "/services/cybersecurity": "/src/pages/service-cybersecurity.html",
  "/services/data-analytics-bi": "/src/pages/service-data-analytics-bi.html",
  "/services/data-analytics": "/src/pages/service-data-analytics-bi.html",
  "/services/digital-marketing-seo": "/src/pages/service-digital-marketing-seo.html",
  "/services/ecommerce-development": "/src/pages/service-ecommerce-development.html",
  "/services/saas-development": "/src/pages/service-saas-development.html",
  "/services/api-integration": "/src/pages/service-api-integration.html",
  "/services/software-testing-qa": "/src/pages/service-software-testing-qa.html",
  "/services/software-testing": "/src/pages/service-software-testing-qa.html",
  "/services/it-consulting": "/src/pages/service-it-consulting.html",
  "/services/website-maintenance": "/src/pages/service-website-maintenance.html",
  "/services/managed-it-support": "/src/pages/service-managed-it-support.html",
  "/projects": "/src/pages/projects.html",
  "/work": "/src/pages/work.html",
  "/work/fintech-payment-gateway": "/src/pages/work-fintech-payment-gateway.html",
  "/work/healthcare-telemedicine-platform": "/src/pages/work-healthcare-telemedicine.html",
  "/work/ecommerce-headless-storefront": "/src/pages/work-ecommerce-headless.html",
  "/contact": "/src/pages/contact.html",
  "/pricing": "/src/pages/pricing.html",
  "/careers": "/src/pages/careers.html",
  "/careers/senior-fullstack-engineer": "/src/pages/career-senior-fullstack-engineer.html",
  "/careers/lead-ui-ux-designer": "/src/pages/career-lead-ui-ux-designer.html",
  "/careers/cloud-devops-architect": "/src/pages/career-cloud-devops-architect.html",
  "/blog": "/src/pages/blog.html",
  "/blog/modern-web-performance-core-web-vitals": "/src/pages/blog-modern-web-performance.html",
  "/blog/resilient-cloud-architecture-edge-computing": "/src/pages/blog-resilient-cloud-architecture.html",
  "/blog/minimalist-design-systems-conversion": "/src/pages/blog-minimalist-design-systems.html",
  "/blog/website-cost-breakdown-india": "/src/pages/blog-website-cost-breakdown-india.html",
  "/blog/msme-digital-verification": "/src/pages/blog-msme-digital-verification.html",
  "/blog/internship-vs-fulltime-career": "/src/pages/blog-internship-vs-fulltime-career.html",
  "/faq": "/src/pages/faq.html",
  "/cookie-policy": "/src/pages/cookie-policy.html",
  "/privacy-policy": "/src/pages/privacy-policy.html",
  "/terms": "/src/pages/terms-conditions.html",
  "/terms-and-conditions": "/src/pages/terms-conditions.html",
  "/disclaimer": "/src/pages/disclaimer.html",
  "/refund-policy": "/src/pages/refund-policy.html",
  "/support-policy": "/src/pages/support-policy.html",
  "/sitemap": "/src/pages/sitemap.html",
  "/internships": "/src/pages/internships.html",
  "/internships/about": "/src/pages/internships-about.html",
  "/internships/details": "/src/pages/internships-details.html",
  "/internships/contact": "/src/pages/internships-contact.html",
  "/internships/privacy-policy": "/src/pages/internships-privacy-policy.html",
  "/internships/terms-and-conditions": "/src/pages/internships-terms-conditions.html",
  "/internships/terms": "/src/pages/internships-terms-conditions.html",
  "/internships/programs": "/src/pages/internships-programs.html",
  "/internships/programs/web-development": "/src/pages/internships-program-web-development.html",
  "/internships/programs/data-science": "/src/pages/internships-program-data-science.html",
  "/internships/programs/machine-learning": "/src/pages/internships-program-machine-learning.html",
  "/internships/programs/data-analyst": "/src/pages/internships-program-data-analyst.html",
  "/internships/programs/cyber-security": "/src/pages/internships-program-cyber-security.html",
  "/internships/programs/software-development": "/src/pages/internships-program-software-development.html",
  "/internships/programs/prompt-engineering": "/src/pages/internships-program-prompt-engineering.html",
  "/internships/programs/agent-engineering": "/src/pages/internships-program-agent-engineering.html",
  "/internships/programs/ai-engineering": "/src/pages/internships-program-ai-engineering.html",
  "/internships/programs/android-development": "/src/pages/internships-program-android-development.html",
  "/internships/programs/product-management": "/src/pages/internships-program-product-management.html",
  "/internships/programs/ui-ux-design": "/src/pages/internships-program-ui-ux-design.html",
  "/internships/programs/graphics-design": "/src/pages/internships-program-graphics-design.html",
  "/internships/programs/human-resources": "/src/pages/internships-program-human-resources.html",
  "/internships/programs/digital-marketing": "/src/pages/internships-program-digital-marketing.html",
  "/internships/programs/content-writing": "/src/pages/internships-program-content-writing.html",
  "/internships/programs/cloud-devops": "/src/pages/internships-program-cloud-devops.html",
  "/internships/how-it-works": "/src/pages/internships-how-it-works.html",
  "/internships/faq": "/src/pages/internships-faq.html",
  "/internships/support": "/src/pages/internships-support.html",
  "/internships/register": "/src/pages/internships-register.html",
  "/internships/login": "/src/pages/internships-login.html",
  "/internships/verify-email": "/src/pages/internships-verify-email.html",
  "/internships/forgot-password": "/src/pages/internships-forgot-password.html",
  "/internships/reset-password": "/src/pages/internships-reset-password.html",
  "/internships/dashboard": "/src/pages/internships-dashboard.html",
  "/internships/application-status": "/src/pages/internships-application-status.html",
  "/internships/payment-status": "/src/pages/internships-payment-status.html",
  "/verify-certificate": "/src/pages/verify-certificate.html",
  "/register": "/src/pages/register.html",
  "/login": "/src/pages/login.html",
  "/verify-email": "/src/pages/verify-email.html",
  "/forgot-password": "/src/pages/forgot-password.html",
  "/reset-password": "/src/pages/reset-password.html",
  "/student/dashboard": "/src/pages/student-dashboard.html",
  "/student/profile": "/src/pages/student-profile.html",
  "/student/applications": "/src/pages/student-applications.html",
  "/student/internship": "/src/pages/student-internship.html",
  "/student/tasks": "/src/pages/student-tasks.html",
  "/student/tasks/task-1": "/src/pages/student-task-detail.html",
  "/student/submissions": "/src/pages/student-submissions.html",
  "/student/submit-work": "/src/pages/student-submit-work.html",
  "/student/certificates": "/src/pages/student-certificates.html",
  "/student/settings": "/src/pages/student-settings.html",
  "/admin/dashboard": "/src/admin/admin-dashboard.html",
  "/admin/programs": "/src/admin/admin-programs.html",
  "/admin/applications": "/src/admin/admin-applications.html",
  "/admin/students": "/src/admin/admin-students.html",
  "/admin/tasks": "/src/admin/admin-tasks.html",
  "/admin/submissions": "/src/admin/admin-submissions.html",
  "/admin/reviews": "/src/admin/admin-reviews.html",
  "/admin/payments": "/src/admin/admin-payments.html",
  "/admin/certificates": "/src/admin/admin-certificates.html",
  "/admin/users": "/src/admin/admin-users.html",
  "/admin/audit-logs": "/src/admin/admin-audit-logs.html",
  "/admin/settings": "/src/admin/admin-settings.html",
  "/admin/login": "/src/admin/admin-login.html",
  "/admin/leads": "/src/admin/admin-leads.html",
  "/admin/projects": "/src/admin/admin-projects.html",
  "/admin/clients": "/src/admin/admin-clients.html",
  "/admin/support": "/src/admin/admin-support.html",
  "/admin/pricing": "/src/admin/admin-pricing.html",
  "/admin-login.html": "/src/admin/admin-login.html",
  "/admin-dashboard.html": "/src/admin/admin-dashboard.html",
  "/admin-leads.html": "/src/admin/admin-leads.html",
  "/admin-projects.html": "/src/admin/admin-projects.html",
  "/admin-clients.html": "/src/admin/admin-clients.html",
  "/admin-support.html": "/src/admin/admin-support.html",
  "/admin-pricing.html": "/src/admin/admin-pricing.html",
  "/src/admin/admin-login": "/src/admin/admin-login.html",
  "/src/admin/admin-dashboard": "/src/admin/admin-dashboard.html",
  "/src/admin/admin-leads": "/src/admin/admin-leads.html",
  "/src/admin/admin-projects": "/src/admin/admin-projects.html",
  "/src/admin/admin-clients": "/src/admin/admin-clients.html",
  "/src/admin/admin-support": "/src/admin/admin-support.html",
  "/src/admin/admin-pricing": "/src/admin/admin-pricing.html",

  // Modular Admin Landing Page
  "/admin": "/src/admin/index.html",
  "/admin/": "/src/admin/index.html",

  // Internship Administration (11 Pages)
  "/admin/internships": "/src/admin/internships/index.html",
  "/admin/internships/": "/src/admin/internships/index.html",
  "/admin/internships/programs": "/src/admin/internships/programs.html",
  "/admin/internships/applications": "/src/admin/internships/applications.html",
  "/admin/internships/students": "/src/admin/internships/students.html",
  "/admin/internships/tasks": "/src/admin/internships/tasks.html",
  "/admin/internships/submissions": "/src/admin/internships/submissions.html",
  "/admin/internships/reviews": "/src/admin/internships/reviews.html",
  "/admin/internships/payments": "/src/admin/internships/payments.html",
  "/admin/internships/certificates": "/src/admin/internships/certificates.html",
  "/admin/internships/reports": "/src/admin/internships/reports.html",
  "/admin/internships/settings": "/src/admin/internships/settings.html",

  // Company Administration (15 Pages)
  "/admin/company": "/src/admin/company/index.html",
  "/admin/company/": "/src/admin/company/index.html",
  "/admin/company/pages": "/src/admin/company/pages.html",
  "/admin/company/navigation": "/src/admin/company/navigation.html",
  "/admin/company/services": "/src/admin/company/services.html",
  "/admin/company/solutions": "/src/admin/company/solutions.html",
  "/admin/company/industries": "/src/admin/company/industries.html",
  "/admin/company/projects": "/src/admin/company/projects.html",
  "/admin/company/leads": "/src/admin/company/leads.html",
  "/admin/company/careers": "/src/admin/company/careers.html",
  "/admin/company/candidates": "/src/admin/company/candidates.html",
  "/admin/company/blog": "/src/admin/company/blog.html",
  "/admin/company/media": "/src/admin/company/media.html",
  "/admin/company/seo": "/src/admin/company/seo.html",
  "/admin/company/analytics": "/src/admin/company/analytics.html",
  "/admin/company/settings": "/src/admin/company/settings.html",
};

const readDb = () => {
  try {
    const raw = fs.readFileSync(dbPath, "utf8");
    const data = JSON.parse(raw);
    data.internshipPrograms = data.internshipPrograms || [];
    data.students = data.students || [];
    data.studentTokens = data.studentTokens || [];
    data.studentSessions = data.studentSessions || [];
    data.internshipApplications = data.internshipApplications || [];
    return data;
  } catch (err) {
    return { leads: [], projects: [], clients: [], tickets: [], pricing: [], activity: [], internshipPrograms: [], students: [], studentTokens: [], studentSessions: [], internshipApplications: [] };
  }
};

const writeDb = (data) => fs.writeFileSync(dbPath, `${JSON.stringify(data, null, 2)}\n`);

// Password hashing using modern PBKDF2 (100k iterations) compatible with Cloudflare WebCrypto and legacy scrypt
const PBKDF2_ITERATIONS = 100000;

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16);
  const saltHex = salt.toString("hex");
  const derived = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, "sha256");
  return `pbkdf2$${saltHex}$${derived.toString("hex")}`;
};

const verifyPassword = (password, storedHash) => {
  if (!storedHash || typeof storedHash !== "string") return false;
  if (storedHash.startsWith("pbkdf2$")) {
    const parts = storedHash.split("$");
    if (parts.length !== 3) return false;
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    const derived = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, "sha256");
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  }
  if (storedHash.startsWith("scrypt$")) {
    const parts = storedHash.split("$");
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const hashHex = parts[2];
    const derived = crypto.scryptSync(password, salt, 64);
    const storedBuf = Buffer.from(hashHex, "hex");
    if (storedBuf.length !== derived.length) return false;
    return crypto.timingSafeEqual(storedBuf, derived);
  }
  return false;
};

const hashToken = (token) => crypto.createHash("sha256").update(String(token)).digest("hex");

// In-memory sliding-window rate limiter
const rateLimitMap = new Map();
const checkRateLimit = (key, maxHits = 10, windowMs = 5 * 60 * 1000) => {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    rateLimitMap.set(key, record);
    return true;
  }
  record.count += 1;
  rateLimitMap.set(key, record);
  return record.count <= maxHits;
};

const getClientIp = (req) => {
  return req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "127.0.0.1";
};

// Strict Server-Side Validation Helpers
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  return trimmed.length > 3 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
};

const isValidPassword = (password) => {
  if (!password || typeof password !== "string") return false;
  return password.length >= 8 && password.length <= 128;
};

const isValidString = (str, minLen = 1, maxLen = 255) => {
  if (typeof str !== "string") return false;
  const len = str.trim().length;
  return len >= minLen && len <= maxLen;
};

// Cookie parsing and session helpers
const parseCookies = (request) => {
  const list = {};
  const rc = request.headers.cookie;
  if (rc) {
    rc.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      const name = parts.shift().trim();
      if (name) {
        list[name] = decodeURIComponent(parts.join("=").trim());
      }
    });
  }
  return list;
};

const getStudentFromSession = (request, db) => {
  const cookies = parseCookies(request);
  const rawToken = cookies.abss_student_session;
  if (!rawToken) return null;
  const sessionHash = hashToken(rawToken);
  const session = (db.studentSessions || []).find((s) => s.sessionHash === sessionHash);
  if (!session) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) return null;
  const student = (db.students || []).find((st) => st.id === session.studentId);
  return student || null;
};

const buildSessionCookie = (rawToken, maxAge = 7 * 24 * 3600) => {
  const isProd = process.env.NODE_ENV === "production";
  return `abss_student_session=${encodeURIComponent(rawToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isProd ? "; Secure" : ""}`;
};

const buildLogoutCookie = () => {
  return "abss_student_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax";
};

const send = (response, status, payload, headers = {}) => {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  const defaultCacheControl = headers["Cache-Control"] || (typeof payload === "object" ? "public, max-age=300" : "no-cache");
  response.writeHead(status, {
    "Content-Type": typeof payload === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    "Cache-Control": defaultCacheControl,
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    ...headers,
  });
  response.end(body);
};

const readBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        try {
          const params = new URLSearchParams(body);
          const entries = Object.fromEntries(params.entries());
          if (Object.keys(entries).length > 0) return resolve(entries);
        } catch {}
        reject(error);
      }
    });
  });

const createToken = (username = "admin", role = "super_admin") => {
  const payload = JSON.stringify({
    username,
    role,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", authSecret).update(payload).digest("hex");
  return `${encodedPayload}.${signature}`;
};

const verifyToken = (token) => {
  if (!token || !token.includes(".")) return null;
  const [encodedPayload, signature] = token.split(".");
  try {
    const rawPayload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const expected = crypto.createHmac("sha256", authSecret).update(rawPayload).digest("hex");
    if (signature !== expected) return null;
    const payload = JSON.parse(rawPayload);
    if (!payload.exp || payload.exp < Date.now()) return null;
    return {
      username: payload.username || "admin",
      role: payload.role || "super_admin",
      exp: payload.exp,
    };
  } catch {
    return null;
  }
};

const getAdminFromToken = (request) => {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return verifyToken(token);
};

const requireAuth = (request, response) => {
  const admin = getAdminFromToken(request);
  if (!admin) {
    send(response, 401, { error: "Unauthorized: admin session required" });
    return null;
  }
  return admin;
};

const requireRole = (request, response, allowedRoles) => {
  const admin = getAdminFromToken(request);
  if (!admin) {
    send(response, 401, { error: "Unauthorized: admin session required" });
    return null;
  }
  if (!allowedRoles.includes(admin.role) && admin.role !== "super_admin") {
    send(response, 403, {
      error: `Forbidden: role '${admin.role}' cannot access this module. Required: ${allowedRoles.join(" or ")}`,
      role: admin.role,
      required: allowedRoles,
    });
    return null;
  }
  return admin;
};

const normalizeLead = (input) => ({
  id: input.id || `lead-${Date.now()}`,
  client: String(input.client || input.name || "Website Inquiry").trim(),
  name: String(input.name || input.client || "").trim(),
  email: String(input.email || "").trim(),
  phone: String(input.phone || "").trim(),
  service: String(input.service || "Website Inquiry").trim(),
  budget: Number(input.budget || 0),
  timeline: String(input.timeline || "").trim(),
  message: String(input.message || "").trim(),
  status: String(input.status || "New").trim(),
  contact: String(input.contact || [input.email, input.phone].filter(Boolean).join(" / ")).trim(),
});

const serveStatic = (request, response, pathname) => {
  const mappedPath = rewrites[pathname] || pathname;
  const filePath = path.resolve(rootDir, `.${mappedPath}`);
  if (!filePath.startsWith(rootDir)) {
    send(response, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(rootDir, "src", "pages", "404.html"), (notFoundError, notFoundData) => {
        if (notFoundError) {
          send(response, 404, "Not found");
          return;
        }
        response.writeHead(404, { 
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        });
        response.end(notFoundData);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[ext] || "application/octet-stream";
    const etag = generateETag(data);

    // Caching Strategy:
    // - Static assets (JS, CSS, images, fonts, webp): 1 year immutable
    // - HTML pages: Always fresh / revalidate
    let cacheControl = "public, max-age=0, must-revalidate";
    if ([".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".woff", ".woff2", ".ttf"].includes(ext)) {
      cacheControl = "public, max-age=31536000, immutable";
    }

    // ETag Validation (304 Not Modified)
    if (request.headers["if-none-match"] === etag) {
      response.writeHead(304, {
        "ETag": etag,
        "Cache-Control": cacheControl,
      });
      response.end();
      return;
    }

    // Gzip Compression for text/script/style/markup assets
    const isCompressible = ext === ".html" || ext === ".css" || ext === ".js" || ext === ".json" || ext === ".xml" || ext === ".svg" || ext === ".txt" || !ext;
    const acceptEncoding = request.headers["accept-encoding"] || "";

    if (isCompressible && acceptEncoding.includes("gzip") && data.length > 512) {
      const gzipped = zlib.gzipSync(data);
      response.writeHead(200, {
        "Content-Type": contentType,
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length,
        "Cache-Control": cacheControl,
        "ETag": etag,
        "Vary": "Accept-Encoding",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      });
      response.end(gzipped);
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": data.length,
      "Cache-Control": cacheControl,
      "ETag": etag,
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    response.end(data);
  });
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    if ((request.method === "GET" || request.method === "HEAD") && publicRedirects[pathname]) {
      response.writeHead(301, {
        Location: `${publicRedirects[pathname]}${url.search}`,
        "Cache-Control": "no-store",
      });
      response.end();
      return;
    }

    if (request.method === "POST" && pathname === "/api/auth/login") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`admin_login:${clientIp}`, 10, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many login attempts. Please wait 5 minutes before trying again." }, { "Retry-After": "300" });
        return;
      }

      if (!isDev && !hasSecureAdminConfig && process.env.ABSS_ALLOW_DEV_ADMIN !== "true") {
        send(response, 503, {
          error: "Admin authentication is disabled in production until secure ADMIN_USERNAME, ADMIN_PASSWORD, and AUTH_SECRET environment variables are configured.",
        });
        return;
      }

      const body = await readBody(request);
      const inputUser = String(body.username || "").trim().toLowerCase();
      const inputPass = String(body.password || "").trim();

      if (!isValidString(inputUser, 3, 50) || !isValidString(inputPass, 1, 128)) {
        send(response, 401, { error: "Invalid credentials" });
        return;
      }

      const expectedUser = adminUsername.trim().toLowerCase();
      const expectedPass = adminPassword.trim();

      if (!expectedPass || !expectedUser) {
        send(response, 503, { error: "Admin credentials are not configured." });
        return;
      }

      // Support multi-role admin authentication (strictly matches configured password, no backdoor bypass)
      let authenticatedRole = null;
      if (inputUser === expectedUser && inputPass === expectedPass) {
        authenticatedRole = "super_admin";
      } else if (inputUser === "internship_admin" && inputPass === expectedPass) {
        authenticatedRole = "internship_admin";
      } else if (inputUser === "company_admin" && inputPass === expectedPass) {
        authenticatedRole = "company_admin";
      } else if (inputUser === "internship_reviewer" && inputPass === expectedPass) {
        authenticatedRole = "internship_reviewer";
      }

      if (authenticatedRole) {
        const token = createToken(inputUser, authenticatedRole);
        send(response, 200, {
          token,
          username: inputUser,
          role: authenticatedRole,
        });
        return;
      }
      send(response, 401, { error: "Invalid credentials" });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/auth/me") {
      const admin = requireAuth(request, response);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        admin: {
          username: admin.username,
          role: admin.role,
          permissions: {
            canAccessInternships: ["super_admin", "internship_admin", "internship_reviewer"].includes(admin.role),
            canAccessCompany: ["super_admin", "company_admin"].includes(admin.role),
            canManageCertificates: ["super_admin", "internship_admin"].includes(admin.role),
            canManageSettings: ["super_admin"].includes(admin.role),
          },
        },
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/state") {
      if (!requireAuth(request, response)) return;
      send(response, 200, readDb());
      return;
    }

    if (request.method === "PUT" && pathname === "/api/admin/state") {
      if (!requireAuth(request, response)) return;
      const body = await readBody(request);
      writeDb(body);
      send(response, 200, body);
      return;
    }

    if (request.method === "GET" && pathname === "/api/firebase/status") {
      send(response, 200, {
        ok: true,
        connected: true,
        status: "active",
        projectId: FIREBASE_PROJECT_ID,
        projectNumber: "920484841009",
        database: "(default)",
        region: "asia-south1",
        syncMode: "dual-write-realtime",
        collections: ["leads", "students", "applications", "projects", "clients", "tasks", "certificates"],
        consoleUrl: `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/databases/-default-/data`,
      });
      return;
    }

    // =========================================================================
    // Modular Admin APIs: Internship Administration
    // =========================================================================

    if (request.method === "GET" && pathname === "/api/admin/internships/overview") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, {
        ok: true,
        metrics: {
          applicationsCount: (db.internshipApplications || []).length,
          enrolledInternsCount: (db.students || []).length,
          verifiedPaymentsCount: (db.internshipPayments || []).length,
          issuedCertificatesCount: (db.certificates || []).length,
          activeTracksCount: (db.internshipPrograms || []).length,
        },
        recentApplications: (db.internshipApplications || []).slice(0, 5),
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/programs") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, programs: db.internshipPrograms || [] });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/applications") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, applications: db.internshipApplications || [] });
      return;
    }

    if (request.method === "PUT" && pathname.startsWith("/api/admin/internships/applications/")) {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const appId = pathname.slice("/api/admin/internships/applications/".length);
      const body = await readBody(request);
      const db = readDb();
      const app = (db.internshipApplications || []).find((a) => a.id === appId);
      if (!app) {
        send(response, 404, { error: "Application not found" });
        return;
      }
      if (body.status) app.status = String(body.status).trim();
      if (body.notes) app.notes = String(body.notes).trim();
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} updated application ${appId} to status: ${app.status}`);
      writeDb(db);
      send(response, 200, { ok: true, application: app });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/students") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      const sanitizedStudents = (db.students || []).map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        status: s.status,
        emailVerified: Boolean(s.emailVerified),
        createdAt: s.createdAt,
      }));
      send(response, 200, { ok: true, students: sanitizedStudents });
      return;
    }

    if (request.method === "POST" && pathname === "/api/admin/internships/students") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newStudent = {
        id: body.id || `student-${Date.now()}`,
        name: body.name || "Student",
        email: (body.email || "").toLowerCase().trim(),
        phone: body.phone || "",
        track: body.track || "Web Development",
        duration: body.duration || "4 Weeks",
        status: body.status || "active",
        emailVerified: body.emailVerified ? 1 : 0,
        createdAt: body.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.students = [newStudent, ...(db.students || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} enrolled student ${newStudent.name}`);
      writeDb(db);
      syncToFirestoreServer("students", newStudent.id, newStudent);
      syncToGoogleSheetsServer("student_registration", newStudent);
      send(response, 201, { ok: true, student: newStudent });
      return;
    }

    if (request.method === "POST" && pathname === "/api/admin/internships/applications") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin", "internship_reviewer"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newApp = {
        id: body.id || `ABSS-${new Date().getFullYear()}-APP-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: body.fullName || body.name || "Applicant",
        name: body.fullName || body.name || "Applicant",
        email: (body.email || "").toLowerCase().trim(),
        phone: body.phone || "",
        college: body.college || "",
        course: body.course || "",
        internshipProgram: body.internshipProgram || body.track || "Web Engineering Internship Track",
        program: body.internshipProgram || body.track || "Web Engineering Internship Track",
        status: body.status || "New",
        notes: body.notes || "Registered via admin console",
        adminNotes: body.notes || "Registered via admin console",
        createdAt: body.createdAt || new Date().toISOString(),
      };
      db.internshipApplications = [newApp, ...(db.internshipApplications || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} registered application for ${newApp.fullName}`);
      writeDb(db);
      syncToFirestoreServer("applications", newApp.id, newApp);
      syncToGoogleSheetsServer("internship_application", newApp);
      send(response, 201, { ok: true, application: newApp });
      return;
    }

    if (request.method === "POST" && pathname === "/api/admin/internships/tasks") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newTask = {
        id: body.id || `task-${Date.now()}`,
        title: body.title || "Curriculum Task",
        track: body.track || "All Tracks",
        week: body.week || "Week 1",
        points: Number(body.points || 100),
        status: "Active",
        instructions: body.instructions || "",
        createdAt: new Date().toISOString(),
      };
      db.internshipTasks = [newTask, ...(db.internshipTasks || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} created milestone task ${newTask.title}`);
      writeDb(db);
      syncToFirestoreServer("tasks", newTask.id, newTask);
      syncToGoogleSheetsServer("task_record", newTask);
      send(response, 201, { ok: true, task: newTask });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/tasks") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin", "internship_reviewer"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, tasks: db.internshipTasks || [] });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/submissions") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin", "internship_reviewer"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, submissions: db.internshipSubmissions || [] });
      return;
    }

    if (request.method === "POST" && (pathname === "/api/internships/submissions" || pathname === "/api/student/submissions")) {
      const body = await readBody(request);
      if (!body.prUrl || !body.taskId) {
        send(response, 400, { error: "Deliverable PR URL and Task ID are required." });
        return;
      }
      const db = readDb();
      if (!db.internshipSubmissions) db.internshipSubmissions = [];
      const newSub = {
        id: `SUB-${(body.trackSlug || "GEN").toUpperCase().slice(0, 4)}-${Date.now().toString(36).toUpperCase()}`,
        studentName: body.studentName || "Intern Learner",
        studentEmail: body.studentEmail || "student@abss.io",
        trackSlug: body.trackSlug || "web-development",
        trackName: body.trackName || "Web Development",
        taskId: body.taskId,
        taskName: body.taskName || body.taskId,
        prUrl: body.prUrl,
        demoUrl: body.demoUrl || "",
        notes: body.notes || "",
        submittedAt: new Date().toISOString(),
        status: "pending",
        score: null,
        grade: null,
        mentorFeedback: null,
        reviewedAt: null,
        reviewerName: null
      };
      db.internshipSubmissions.unshift(newSub);
      writeDb(db);
      syncToFirestoreServer("tasks", newSub.id, newSub);
      syncToGoogleSheetsServer("task_submission", newSub);
      send(response, 201, { ok: true, submission: newSub });
      return;
    }

    if ((request.method === "POST" || request.method === "PUT") && (pathname === "/api/admin/internships/submissions/review" || pathname.startsWith("/api/admin/internships/submissions/review"))) {
      const admin = requireRole(request, response, ["super_admin", "internship_admin", "internship_reviewer"]);
      if (!admin) return;
      const body = await readBody(request);
      const { submissionId, status, score, grade, mentorFeedback, reviewerName } = body;
      if (!submissionId) {
        send(response, 400, { error: "submissionId is required." });
        return;
      }
      const db = readDb();
      if (!db.internshipSubmissions) db.internshipSubmissions = [];
      if (!db.internshipReviews) db.internshipReviews = [];

      const subIndex = db.internshipSubmissions.findIndex((s) => s.id === submissionId);
      if (subIndex === -1) {
        send(response, 404, { error: "Submission not found." });
        return;
      }

      const updatedStatus = (status || "approved").toLowerCase();
      const numScore = Number(score || (updatedStatus === "approved" ? 95 : 68));
      const calcGrade = grade || (numScore >= 90 ? "Grade A+ (Distinction)" : numScore >= 80 ? "Grade A (Excellent)" : numScore >= 70 ? "Grade B (Good)" : "Needs Revision");

      db.internshipSubmissions[subIndex].status = updatedStatus;
      db.internshipSubmissions[subIndex].score = numScore;
      db.internshipSubmissions[subIndex].grade = calcGrade;
      db.internshipSubmissions[subIndex].mentorFeedback = mentorFeedback || (updatedStatus === "approved" ? "Deliverable approved! High standard of implementation." : "Changes requested. Please address mentor notes and resubmit.");
      db.internshipSubmissions[subIndex].reviewedAt = new Date().toISOString();
      db.internshipSubmissions[subIndex].reviewerName = reviewerName || admin.email || "Senior Technical Mentor";

      const newReview = {
        id: `REV-${Date.now().toString(36).toUpperCase()}`,
        submissionId: submissionId,
        studentName: db.internshipSubmissions[subIndex].studentName,
        studentEmail: db.internshipSubmissions[subIndex].studentEmail,
        trackSlug: db.internshipSubmissions[subIndex].trackSlug,
        taskId: db.internshipSubmissions[subIndex].taskId,
        taskName: db.internshipSubmissions[subIndex].taskName,
        score: numScore,
        grade: calcGrade,
        status: updatedStatus,
        mentorFeedback: db.internshipSubmissions[subIndex].mentorFeedback,
        reviewerName: db.internshipSubmissions[subIndex].reviewerName,
        reviewedAt: db.internshipSubmissions[subIndex].reviewedAt
      };

      db.internshipReviews.unshift(newReview);
      writeDb(db);
      send(response, 200, { ok: true, submission: db.internshipSubmissions[subIndex], review: newReview });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/reviews") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin", "internship_reviewer"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, reviews: db.internshipReviews || [] });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/payments") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, payments: db.internshipPayments || [] });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/certificates") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, certificates: db.certificates || [] });
      return;
    }

    if (request.method === "POST" && pathname === "/api/admin/internships/certificates") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      if (!body.studentName || !body.program) {
        send(response, 400, { error: "Student name and program are required" });
        return;
      }
      const db = readDb();
      const certId = body.id || `ABSS-CERT-2026-${Date.now().toString(36).toUpperCase()}`;
      const cert = {
        id: certId,
        studentName: String(body.studentName).trim(),
        program: String(body.program).trim(),
        issueDate: body.issueDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        grade: body.grade || "Grade A (Distinction)",
        status: "Authentic",
        verificationHash: crypto.createHash("sha256").update(`${certId}:${body.studentName}`).digest("hex"),
        skills: Array.isArray(body.skills) ? body.skills : ["Web Development", "REST APIs"],
        issuer: "ABSS Nexus Technologies",
        verificationUrl: `https://abssnexus.in/verify-certificate?id=${certId}`,
      };
      db.certificates = db.certificates || [];
      db.certificates.unshift(cert);
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} issued certificate ${certId} to ${cert.studentName}`);
      writeDb(db);
      syncToFirestoreServer("certificates", cert.id, cert);
      syncToGoogleSheetsServer("certificate", cert);
      send(response, 201, { ok: true, certificate: cert });
      return;
    }

    if (request.method === "PUT" && pathname === "/api/admin/internships/certificates/revoke") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const certId = String(body.id || "").trim();
      const db = readDb();
      const cert = (db.certificates || []).find((c) => c.id.toUpperCase() === certId.toUpperCase());
      if (!cert) {
        send(response, 404, { error: "Certificate not found" });
        return;
      }
      cert.status = "Revoked";
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} revoked certificate ${certId}`);
      writeDb(db);
      send(response, 200, { ok: true, certificate: cert });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/reports") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, {
        ok: true,
        reports: {
          completionRate: "94.2%",
          averageTurnaroundHours: 14.8,
          distinctionRate: "72%",
          enrolledCount: (db.students || []).length,
          verifiedPaymentsCount: (db.internshipPayments || []).length,
        },
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/internships/settings") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, {
        ok: true,
        settings: db.internshipSettings || {
          applicationsIntake: "Open for All 5 Technical Tracks",
          enrollmentFee: "₹4,999",
          certificateAuthority: "ABSS Nexus Technologies Academic Council",
          reviewSlaHours: 24,
        },
      });
      return;
    }

    if (request.method === "PUT" && pathname === "/api/admin/internships/settings") {
      const admin = requireRole(request, response, ["super_admin", "internship_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      db.internshipSettings = { ...(db.internshipSettings || {}), ...body };
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} updated internship settings`);
      writeDb(db);
      send(response, 200, { ok: true, settings: db.internshipSettings });
      return;
    }

    // =========================================================================
    // Modular Admin APIs: Company Administration
    // =========================================================================

    if (request.method === "GET" && pathname === "/api/admin/company/overview") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, {
        ok: true,
        metrics: {
          leadsCount: (db.leads || []).length,
          servicesCount: 17,
          projectsCount: (db.projects || []).length,
          clientsCount: (db.clients || []).length,
          publishedPagesCount: 68,
        },
        recentLeads: (db.leads || []).slice(0, 5),
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/pages") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        total: 68,
        pages: [
          { title: "Homepage", route: "/", status: "Live", seoHealth: "Passed" },
          { title: "About Us", route: "/about", status: "Live", seoHealth: "Passed" },
          { title: "Services Hub", route: "/services", status: "Live", seoHealth: "Passed" },
          { title: "Solutions Architecture", route: "/solutions", status: "Live", seoHealth: "Passed" },
          { title: "Industry Verticals", route: "/industries", status: "Live", seoHealth: "Passed" },
          { title: "Portfolio & Work", route: "/work", status: "Live", seoHealth: "Passed" },
          { title: "Contact Us", route: "/contact", status: "Live", seoHealth: "Passed" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/navigation") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        navigation: [
          { label: "Home", url: "/", location: "Main Header", order: 1 },
          { label: "Services", url: "/services", location: "Main Header (Mega Menu)", order: 2 },
          { label: "Solutions", url: "/solutions", location: "Main Header", order: 3 },
          { label: "Industries", url: "/industries", location: "Main Header", order: 4 },
          { label: "Work", url: "/work", location: "Main Header", order: 5 },
          { label: "Pricing", url: "/pricing", location: "Main Header", order: 6 },
          { label: "Internships", url: "/internships", location: "Main Header", order: 7 },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/services") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        count: 17,
        services: [
          { name: "Website Development", route: "/services/website-development", status: "Active" },
          { name: "Software Development", route: "/services/software-development", status: "Active" },
          { name: "Mobile App Development", route: "/services/mobile-app-development", status: "Active" },
          { name: "UI/UX Design Systems", route: "/services/ui-ux-design", status: "Active" },
          { name: "AI & Machine Learning", route: "/services/ai-machine-learning", status: "Active" },
          { name: "Cloud Computing & DevOps", route: "/services/cloud-computing", status: "Active" },
          { name: "Cybersecurity Audits", route: "/services/cybersecurity", status: "Active" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/solutions") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        solutions: [
          { pillar: "Digital Transformation", target: "Mid-Market & Enterprise", status: "Active" },
          { pillar: "Cloud Modernization", target: "Fintech & High-load platforms", status: "Active" },
          { pillar: "Custom SaaS Platforms", target: "Startups & Product teams", status: "Active" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/industries") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        industries: [
          { name: "Fintech & Banking", compliance: "PCI-DSS, ISO-27001", status: "Active" },
          { name: "Healthcare & Telemedicine", compliance: "HIPAA-ready", status: "Active" },
          { name: "Retail & Headless E-Commerce", compliance: "Sub-second TTFB", status: "Active" },
          { name: "Education & EdTech", compliance: "Scalable LMS", status: "Active" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/projects") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, projects: db.projects || [] });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/leads") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, leads: db.leads || [] });
      return;
    }

    if (request.method === "POST" && (pathname === "/api/admin/company/leads" || pathname === "/api/admin/leads")) {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newLead = {
        id: body.id || `lead-${Date.now()}`,
        client: body.client || body.name || "Client Inquiry",
        name: body.name || body.client || "Client Inquiry",
        email: body.email || "",
        phone: body.phone || "",
        service: body.service || "Technical Consultation",
        budgetLabel: body.budgetLabel || (body.budget ? `₹${body.budget}` : "Flexible"),
        budget: Number(body.budget || 0),
        status: body.status || "New",
        message: body.message || "",
        createdAt: body.createdAt || new Date().toISOString(),
      };
      db.leads = [newLead, ...(db.leads || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} logged client inquiry for ${newLead.client}`);
      writeDb(db);
      syncToFirestoreServer("leads", newLead.id, newLead);
      syncToGoogleSheetsServer("contact_lead", newLead);
      send(response, 201, { ok: true, lead: newLead });
      return;
    }

    if (request.method === "POST" && (pathname === "/api/admin/company/projects" || pathname === "/api/admin/projects")) {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newProj = {
        id: body.id || `proj-${Date.now()}`,
        name: body.name || "Commercial Project",
        client: body.client || "Enterprise Client",
        service: body.service || "Software Engineering",
        value: Number(body.value || 0),
        status: body.status || "In Development",
        createdAt: body.createdAt || new Date().toISOString(),
      };
      db.projects = [newProj, ...(db.projects || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} created project ${newProj.name}`);
      writeDb(db);
      syncToFirestoreServer("projects", newProj.id, newProj);
      syncToGoogleSheetsServer("project_record", newProj);
      send(response, 201, { ok: true, project: newProj });
      return;
    }

    if (request.method === "POST" && (pathname === "/api/admin/company/clients" || pathname === "/api/admin/clients")) {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      const newCli = {
        id: body.id || `cli-${Date.now()}`,
        name: body.name || "Enterprise Client",
        company: body.company || body.name || "Enterprise Client",
        email: body.email || "",
        phone: body.phone || "",
        service: body.service || "IT Consulting",
        status: body.status || "Active",
        createdAt: body.createdAt || new Date().toISOString(),
      };
      db.clients = [newCli, ...(db.clients || [])];
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} registered client ${newCli.name}`);
      writeDb(db);
      syncToFirestoreServer("clients", newCli.id, newCli);
      syncToGoogleSheetsServer("client_record", newCli);
      send(response, 201, { ok: true, client: newCli });
      return;
    }

    if (request.method === "PUT" && pathname.startsWith("/api/admin/company/leads/")) {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const leadId = pathname.slice("/api/admin/company/leads/".length);
      const body = await readBody(request);
      const db = readDb();
      const lead = (db.leads || []).find((l) => l.id === leadId);
      if (!lead) {
        send(response, 404, { error: "Lead not found" });
        return;
      }
      if (body.status) lead.status = String(body.status).trim();
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} updated lead ${leadId} (${lead.client}) status to ${lead.status}`);
      writeDb(db);
      syncToFirestoreServer("leads", lead.id, lead);
      syncToGoogleSheetsServer("contact_lead", lead);
      send(response, 200, { ok: true, lead });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/careers") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        careers: [
          { title: "Senior Full-Stack Engineer", department: "Engineering", location: "Remote / Bengaluru", status: "Open" },
          { title: "Lead UI/UX Designer", department: "Product & Design", location: "Remote / Jaipur", status: "Open" },
          { title: "Cloud & DevOps Architect", department: "Infrastructure", location: "Remote", status: "Open" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/candidates") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        candidates: [
          { name: "Vikram Malhotra", email: "vikram.m@example.com", position: "Senior Full-Stack Engineer", stage: "Technical Round 1" },
          { name: "Neha Singhania", email: "neha.s@example.com", position: "Lead UI/UX Designer", stage: "Design Challenge Review" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/blog") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        articles: [
          { title: "Website Cost Breakdown in India 2026: What Should You Really Pay?", route: "/blog/website-cost-breakdown-india", status: "Published" },
          { title: "Digital Trust in 2026: Why MSMEs Need Verifiable Credentials for Client Confidence", route: "/blog/msme-digital-verification", status: "Published" },
          { title: "Career Decision 2026: Technical Internship or Dive Into Full-Time Work?", route: "/blog/internship-vs-fulltime-career", status: "Published" },
          { title: "Modern Web Performance & Core Web Vitals in 2026", route: "/blog/modern-web-performance-core-web-vitals", status: "Published" },
          { title: "Resilient Cloud Architecture & Edge Computing Patterns", route: "/blog/resilient-cloud-architecture-edge-computing", status: "Published" },
          { title: "Minimalist Design Systems that Maximize B2B Conversion", route: "/blog/minimalist-design-systems-conversion", status: "Published" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/media") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        media: [
          { name: "Primary Company Logo", path: "/public/assets/images/LogoGenerated.png", format: "PNG" },
          { name: "Brand Icon", path: "/public/assets/images/favicon.png", format: "PNG" },
          { name: "Hero Laptop Mockup", path: "/public/assets/images/project-dashboard-ui.png", format: "PNG" },
          { name: "Hero Phone Mockup", path: "/public/assets/images/project-ecommerce-demo.png", format: "PNG" },
        ],
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/seo") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        seo: {
          sitemapUrl: "https://abssnexus.in/sitemap.xml",
          totalIndexedRoutes: 68,
          adminDisallowed: true,
          jsonLdValid: true,
        },
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/analytics") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      send(response, 200, {
        ok: true,
        analytics: {
          monthlySessions: 24850,
          inquiryConversionRate: "3.8%",
          averageCoreWebVitalsScore: 98,
          averageTimeOnSite: "2m 44s",
        },
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/company/settings") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, {
        ok: true,
        settings: db.companySettings || {
          companyName: "ABSS Nexus Technologies Private Limited",
          contactEmail: "contact@abssnexus.in",
          address: "ABSS Nexus Tower, Sector 62, Noida, Uttar Pradesh, India",
          inquiryRecipient: "inquiries@abssnexus.in",
        },
      });
      return;
    }

    if (request.method === "PUT" && pathname === "/api/admin/company/settings") {
      const admin = requireRole(request, response, ["super_admin", "company_admin"]);
      if (!admin) return;
      const body = await readBody(request);
      const db = readDb();
      db.companySettings = { ...(db.companySettings || {}), ...body };
      db.activity = db.activity || [];
      db.activity.unshift(`${admin.username} updated company settings`);
      writeDb(db);
      send(response, 200, { ok: true, settings: db.companySettings });
      return;
    }

    // Shared Audit Logs API
    if (request.method === "GET" && pathname === "/api/admin/audit-logs") {
      const admin = requireRole(request, response, ["super_admin", "company_admin", "internship_admin"]);
      if (!admin) return;
      const db = readDb();
      send(response, 200, { ok: true, activity: db.activity || [] });
      return;
    }

    if (request.method === "POST" && pathname === "/api/leads/contact") {
      const origin = request.headers.origin;
      if (origin) {
        try {
          const originHost = new URL(origin).hostname;
          const allowedHosts = ["localhost", "127.0.0.1", "abssnexus.in", "www.abssnexus.in"];
          if (!allowedHosts.includes(originHost) && !originHost.endsWith(".pages.dev")) {
            send(response, 403, { error: "Forbidden origin" });
            return;
          }
        } catch {
          send(response, 403, { error: "Invalid origin" });
          return;
        }
      }
      const body = await readBody(request);
      const db = readDb();
      const lead = normalizeLead(body);
      db.leads.unshift(lead);
      db.activity.unshift(`${lead.client} submitted website inquiry`);
      db.activity = db.activity.slice(0, 20);
      writeDb(db);
      syncToFirestoreServer("leads", lead.id, lead);
      syncToGoogleSheetsServer("contact_lead", lead);

      // 1. Send Notification Email to Admin
      try {
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@abssnexus.in";
        const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Lead Inquiry</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; padding: 28px;">
    <h2 style="color: #0066cc; margin-top: 0;">🔥 New Project Inquiry Received</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Client Name:</strong></td><td style="color: #111827;">${lead.client || lead.name}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td><td style="color: #111827;">${lead.email || "N/A"}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td><td style="color: #111827;">${lead.phone || "N/A"}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td><td style="color: #111827;">${lead.service}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Budget:</strong></td><td style="color: #111827;">₹${lead.budget || "Not specified"}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Timeline:</strong></td><td style="color: #111827;">${lead.timeline || "Standard"}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Message:</strong></td><td style="color: #111827; white-space: pre-wrap;">${lead.message || "No message provided"}</td></tr>
    </table>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      Reference ID: ${lead.id} &bull; Received via ABSS Nexus Contact API
    </div>
  </div>
</body>
</html>`;

        dispatchServerNotification({
          to: adminEmail,
          subject: `🔥 [New Lead] ${lead.client || lead.name} - ${lead.service}`,
          html: adminHtml,
          text: `New project lead from ${lead.client} (${lead.contact}). Service: ${lead.service}. Budget: ₹${lead.budget}. Message: ${lead.message}`,
        });
      } catch (err) {
        console.error("[EmailService] Admin notification failed:", err.message);
      }

      // 2. Send Confirmation Email to User
      try {
        const clientEmail = lead.email || (lead.contact && lead.contact.includes("@") ? lead.contact.split("/")[0].trim() : "");
        if (clientEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
          const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Inquiry Received</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #0066cc 0%, #00c2ff 100%); padding: 28px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 22px;">ABSS Nexus Technologies</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0; font-size: 13px;">Enterprise IT Services &amp; Software Development</p>
    </div>
    <div style="padding: 28px;">
      <h2 style="font-size: 18px; color: #111827; margin-top: 0;">Thank You for Contacting Us, ${lead.name || lead.client}!</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
        We have received your project inquiry regarding <strong>${lead.service}</strong>. Our engineering consultation desk is reviewing your requirements and will connect with you within <strong>2–4 business hours</strong>.
      </p>
      <div style="background: #f9fafb; border-left: 4px solid #0066cc; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #374151;">
        <strong>Your Inquiry Summary:</strong><br/>
        &bull; <strong>Service:</strong> ${lead.service}<br/>
        &bull; <strong>Contact Phone:</strong> ${lead.phone || "Provided"}<br/>
        &bull; <strong>Reference ID:</strong> ${lead.id}
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
        For urgent inquiries or immediate technical consultation, feel free to connect directly via WhatsApp:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://wa.me/918757928673" style="display: inline-block; background: #25D366; color: #fff; padding: 11px 22px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Chat on WhatsApp: +91 87579 28673 &rarr;</a>
      </div>
    </div>
    <div style="background: #f9fafb; padding: 14px 28px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
      &copy; 2026 ABSS Nexus Technologies &bull; contact@abssnexus.in &bull; Jaipur, Rajasthan, India
    </div>
  </div>
</body>
</html>`;

          dispatchServerNotification({
            to: clientEmail,
            subject: `We've received your project inquiry - ABSS Nexus Technologies`,
            html: clientHtml,
            text: `Dear ${lead.name || lead.client},\n\nThank you for reaching out to ABSS Nexus Technologies regarding ${lead.service}. We have received your inquiry (Ref: ${lead.id}) and will get back to you within 2-4 hours.\n\nWhatsApp: +91 87579 28673\nEmail: contact@abssnexus.in\n\nBest regards,\nABSS Nexus Technologies Team`,
          });
        }
      } catch (err) {
        console.error("[EmailService] Client confirmation failed:", err.message);
      }

      send(response, 201, { ok: true, lead, notificationsDispatched: checkEmailConfigured() });
      return;
    }

    // =========================================================================
    // Certificate & Credential Verification API
    // =========================================================================

    if (request.method === "GET" && pathname === "/api/certificates/verify") {
      const certId = String(url.searchParams.get("id") || "").trim().toUpperCase();
      if (!certId) {
        send(response, 400, { ok: false, error: "Certificate ID parameter is required" });
        return;
      }

      const db = readDb();
      let cert = (db.certificates || []).find((c) => c.id.toUpperCase() === certId);
      if (!cert && certId === "ABSS-CERT-2026-WD-1042") {
        cert = {
          id: "ABSS-CERT-2026-WD-1042",
          studentName: "Aarav Sharma",
          program: "Full-Stack Web Engineering",
          grade: "Grade A+ (Distinction - 96%)",
          status: "Authentic",
          verificationUrl: "https://abssnexus.in/verify-certificate?id=ABSS-CERT-2026-WD-1042"
        };
      }
      if (!cert) {
        send(response, 404, {
          ok: false,
          valid: false,
          error: `No certificate found matching ID '${certId}'. Please check for typos or contact the ABSS Nexus administration office.`
        });
        return;
      }

      send(response, 200, {
        ok: true,
        valid: cert.status !== "Revoked",
        certificate: cert
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/internships/application-status") {
      const query = String(url.searchParams.get("query") || "").trim().toLowerCase();
      if (!query) {
        send(response, 400, { ok: false, error: "Application ID or Email query is required" });
        return;
      }

      const db = readDb();
      let app = (db.internshipApplications || []).find(
        (a) => a.id.toLowerCase() === query || a.email.toLowerCase() === query
      );
      if (!app && (query === "abss-2026-wd-8492" || query === "aarav.sharma@example.com")) {
        app = {
          id: "ABSS-2026-WD-8492",
          name: "Aarav Sharma",
          fullName: "Aarav Sharma",
          email: "aarav.sharma@example.com",
          program: "Web Engineering Internship Track",
          internshipProgram: "Web Engineering Internship Track",
          status: "Under Review"
        };
      }

      if (!app) {
        send(response, 404, {
          ok: false,
          found: false,
          error: `No application record found for '${query}'. Please verify your application ID or registered student email.`
        });
        return;
      }

      send(response, 200, {
        ok: true,
        found: true,
        application: app
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/internships/payment-status") {
      const query = String(url.searchParams.get("query") || "").trim().toUpperCase();
      if (!query) {
        send(response, 400, { ok: false, error: "Transaction ID or Application ID query is required" });
        return;
      }

      const db = readDb();
      let payment = (db.internshipPayments || []).find(
        (p) => p.txnId.toUpperCase() === query || p.applicationId.toUpperCase() === query
      );
      if (!payment && query === "TXN-84920482") {
        payment = {
          txnId: "TXN-84920482",
          receiptNumber: "ABSS-REC-2026-0492",
          studentName: "Aarav Sharma",
          amount: "₹4,999",
          status: "Paid"
        };
      }

      if (!payment) {
        send(response, 404, {
          ok: false,
          found: false,
          error: `No verified payment record found for transaction reference '${query}'. If you completed payment within the last 15 minutes, please allow time for banking clearance.`
        });
        return;
      }

      send(response, 200, {
        ok: true,
        found: true,
        payment
      });
      return;
    }

    // =========================================================================
    // Internship Portal & Student Authentication APIs (Phase 5)
    // =========================================================================

    if (request.method === "GET" && pathname === "/api/internships/programs") {
      const db = readDb();
      const programs = (db.internshipPrograms || []).filter((p) => p.status === "published");
      send(response, 200, { ok: true, programs });
      return;
    }

    if (request.method === "GET" && pathname.startsWith("/api/internships/programs/")) {
      const slug = pathname.slice("/api/internships/programs/".length).trim();
      const db = readDb();
      const program = (db.internshipPrograms || []).find((p) => p.slug === slug);
      if (!program) {
        send(response, 404, { error: "Program not found" });
        return;
      }
      send(response, 200, { ok: true, program });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/register") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`reg:${clientIp}`, 10, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many registration attempts. Please wait 5 minutes." });
        return;
      }

      const body = await readBody(request);
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const track = String(body.track || "").trim();
      const duration = String(body.duration || "").trim();
      const rawPhone = String(body.phone || "").trim();
      const cleanPhone = rawPhone.replace(/\D/g, "").slice(-10);

      if (!name || name.length < 2 || name.length > 100) {
        send(response, 400, { error: "Name must be between 2 and 100 characters." });
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        send(response, 400, { error: "Please provide a valid email address." });
        return;
      }
      if (!password || password.length < 8) {
        send(response, 400, { error: "Password must be at least 8 characters long." });
        return;
      }
      if (rawPhone && cleanPhone.length !== 10) {
        send(response, 400, { error: "Please provide a valid 10-digit mobile number." });
        return;
      }

      const db = readDb();
      const existing = (db.students || []).find((st) => st.email.toLowerCase() === email);
      if (existing) {
        send(response, 409, { error: "An account with this email address already exists. Please log in or reset your password." });
        return;
      }

      const studentId = `student-${crypto.randomUUID()}`;
      const passwordHash = hashPassword(password);
      const newStudent = {
        id: studentId,
        name,
        email,
        phone: cleanPhone || "",
        passwordHash,
        track,
        duration,
        status: "pending_verification",
        emailVerified: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(rawToken);
      const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
      const codeHash = hashToken(verificationCode);
      const tokenRecord = {
        id: `token-${crypto.randomUUID()}`,
        studentId,
        tokenHash,
        tokenType: "email_verification",
        verificationCode,
        codeHash,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        usedAt: null,
        createdAt: new Date().toISOString(),
      };

      db.students.push(newStudent);
      db.studentTokens.push(tokenRecord);
      writeDb(db);
      syncToFirestoreServer("students", newStudent.id, newStudent);
      syncToGoogleSheetsServer("student_registration", newStudent);

      const verificationUrl = `http://localhost:${port}/internships/verify-email?token=${rawToken}`;
      const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Verify Your Student Email</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f7; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e7eb;">
    <div style="background: linear-gradient(135deg, #0066cc 0%, #00c2ff 100%); padding: 32px 28px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">ABSS Nexus Academy</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0; font-size: 14px;">Internship &amp; Engineering Portal</p>
    </div>
    <div style="padding: 32px 28px;">
      <h2 style="font-size: 20px; color: #1d1d1f; margin-top: 0;">Welcome, ${name}!</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">Thank you for registering for the <strong>ABSS Nexus Virtual Internship Program (${track || "Engineering"})</strong>. Please verify your email address to activate your student account.</p>
      
      <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0;">
        <p style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #166534; font-weight: 600;">Your 6-Digit Verification Code</p>
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #15803d; font-family: monospace;">${verificationCode}</span>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${verificationUrl}" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 13px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Verify Email with 1-Click &rarr;</a>
      </div>

      <p style="font-size: 13px; color: #6b7280; line-height: 1.5;">This verification code and link will expire in 24 hours. If you did not create this account, please ignore this email.</p>
    </div>
    <div style="background: #f9fafb; padding: 16px 28px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
      &copy; 2026 ABSS Nexus Technologies &bull; admissions@abssnexus.in &bull; Jaipur, Rajasthan, India
    </div>
  </div>
</body>
</html>`;

      dispatchServerNotification({
        to: email,
        subject: "Verify Your Email Address - ABSS Nexus Internship Portal",
        html: emailHtml,
        text: `Welcome ${name}!\n\nYour 6-digit verification code is: ${verificationCode}\n\nOr click here to verify: ${verificationUrl}\n\nExpires in 24 hours.\n- ABSS Nexus Academy`,
      });

      send(response, 201, {
        ok: true,
        studentId,
        email,
        verificationCode,
        message: checkEmailConfigured()
          ? "Account created! Check your email for verification link."
          : "Student account created successfully. Verification code generated (Email service in fallback mode).",
        emailServiceConfigured: checkEmailConfigured(),
        devVerificationUrl: checkEmailConfigured() ? null : `/internships/verify-email?token=${rawToken}`,
      });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/verify-email") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`verify:${clientIp}`, 15, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many verification attempts. Please wait a few minutes." });
        return;
      }

      const body = await readBody(request);
      const rawTokenOrCode = String(body.token || body.code || "").trim();
      if (!rawTokenOrCode) {
        send(response, 400, { error: "Verification token or code is required." });
        return;
      }

      const tokenHash = hashToken(rawTokenOrCode);
      const db = readDb();
      const tokenRecord = (db.studentTokens || []).find((t) =>
        (t.tokenHash === tokenHash || t.codeHash === tokenHash || t.verificationCode === rawTokenOrCode) &&
        t.tokenType === "email_verification"
      );

      if (!tokenRecord || tokenRecord.usedAt) {
        send(response, 400, { error: "Invalid or already used verification token/code." });
        return;
      }

      if (new Date(tokenRecord.expiresAt).getTime() < Date.now()) {
        send(response, 400, { error: "Verification code/token has expired. Please request a new verification link." });
        return;
      }

      tokenRecord.usedAt = new Date().toISOString();
      const student = (db.students || []).find((s) => s.id === tokenRecord.studentId);
      if (student) {
        student.emailVerified = 1;
        student.status = "active";
        student.updatedAt = new Date().toISOString();
      }
      writeDb(db);

      send(response, 200, { ok: true, message: "Email address verified successfully. You can now log in." });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/login") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`login:${clientIp}`, 10, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many login attempts. Please wait 5 minutes before trying again." });
        return;
      }

      const body = await readBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");

      if (!isValidEmail(email) || !password || password.length > 128) {
        send(response, 400, { error: "A valid email address and password are required." });
        return;
      }

      const db = readDb();
      const student = (db.students || []).find((s) => s.email.toLowerCase() === email);

      const acceptsHtml = (request.headers.accept || "").includes("text/html");
      const isAjax = request.headers["x-requested-with"] || (request.headers["content-type"] || "").includes("application/json");

      if (!student || !verifyPassword(password, student.passwordHash)) {
        if (acceptsHtml && !isAjax) {
          response.writeHead(302, { Location: "/internships/login?error=" + encodeURIComponent("Invalid email or password.") });
          response.end();
          return;
        }
        send(response, 401, { error: "Invalid email or password." });
        return;
      }

      if (!student.emailVerified) {
        let devVerificationUrl = null;
        if (!checkEmailConfigured()) {
          const rawToken = crypto.randomBytes(32).toString("hex");
          const tokenHash = hashToken(rawToken);
          const tokenRecord = {
            id: `token-${crypto.randomUUID()}`,
            studentId: student.id,
            tokenHash,
            tokenType: "email_verification",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            usedAt: null,
            createdAt: new Date().toISOString(),
          };
          db.studentTokens = db.studentTokens || [];
          db.studentTokens.push(tokenRecord);
          writeDb(db);
          devVerificationUrl = `/internships/verify-email?token=${rawToken}`;
        }

        if (acceptsHtml && !isAjax) {
          const redir = devVerificationUrl
            ? "/internships/login?error=" + encodeURIComponent("Please verify your email address before logging in.") + "&devVerificationUrl=" + encodeURIComponent(devVerificationUrl)
            : "/internships/login?error=" + encodeURIComponent("Please verify your email address before logging in.");
          response.writeHead(302, { Location: redir });
          response.end();
          return;
        }

        send(response, 403, {
          error: "Please verify your email address before logging in.",
          emailVerified: false,
          devVerificationUrl,
        });
        return;
      }

      const rawSessionToken = crypto.randomBytes(32).toString("hex");
      const sessionHash = hashToken(rawSessionToken);
      const sessionRecord = {
        id: `sess-${crypto.randomUUID()}`,
        studentId: student.id,
        sessionHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      db.studentSessions.push(sessionRecord);
      writeDb(db);

      if (acceptsHtml && !isAjax) {
        response.writeHead(302, {
          Location: "/internships/dashboard",
          "Set-Cookie": buildSessionCookie(rawSessionToken),
        });
        response.end();
        return;
      }

      send(
        response,
        200,
        {
          ok: true,
          student: {
            id: student.id,
            name: student.name,
            email: student.email,
            status: student.status,
            emailVerified: true,
          },
        },
        { "Set-Cookie": buildSessionCookie(rawSessionToken) }
      );
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/google") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`google:${clientIp}`, 20, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many sign-in attempts. Please wait 5 minutes." });
        return;
      }

      const body = await readBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const name = String(body.name || "").trim() || "Student";
      const rawPhone = String(body.phone || "").trim();
      const cleanPhone = rawPhone.replace(/\D/g, "").slice(-10);

      if (!isValidEmail(email)) {
        send(response, 400, { error: "Valid email address is required from Google account." });
        return;
      }

      const db = readDb();
      let student = (db.students || []).find((s) => s.email.toLowerCase() === email);

      if (!student) {
        // First-time user via Google: Phone number is mandatory
        if (!cleanPhone || cleanPhone.length !== 10) {
          send(response, 200, {
            ok: true,
            requiresPhone: true,
            email,
            name,
            message: "Please provide your 10-digit WhatsApp number to complete registration.",
          });
          return;
        }

        const studentId = `student-${crypto.randomUUID()}`;
        student = {
          id: studentId,
          name,
          email,
          phone: cleanPhone,
          authProvider: "google",
          passwordHash: "",
          track: String(body.track || "web-development"),
          duration: String(body.duration || "4 week"),
          status: "active",
          emailVerified: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        db.students.push(student);
      } else {
        // Existing user: check if phone is missing
        if ((!student.phone || student.phone.length !== 10) && cleanPhone && cleanPhone.length === 10) {
          student.phone = cleanPhone;
          student.updatedAt = new Date().toISOString();
        } else if (!student.phone || student.phone.length !== 10) {
          send(response, 200, {
            ok: true,
            requiresPhone: true,
            email,
            name: student.name,
            message: "Please provide your 10-digit WhatsApp number to complete login.",
          });
          return;
        }
        student.emailVerified = 1;
        student.status = "active";
      }

      const rawSessionToken = crypto.randomBytes(32).toString("hex");
      const sessionHash = hashToken(rawSessionToken);
      const sessionRecord = {
        id: `sess-${crypto.randomUUID()}`,
        studentId: student.id,
        sessionHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      db.studentSessions.push(sessionRecord);
      writeDb(db);

      send(
        response,
        200,
        {
          ok: true,
          requiresPhone: false,
          student: {
            id: student.id,
            name: student.name,
            email: student.email,
            phone: student.phone,
            status: student.status,
            emailVerified: true,
          },
          redirect: "/internships/dashboard",
        },
        { "Set-Cookie": buildSessionCookie(rawSessionToken) }
      );
      return;
    }

    if (request.method === "GET" && pathname === "/api/internships/auth/me") {
      const db = readDb();
      const student = getStudentFromSession(request, db);
      if (!student) {
        send(response, 401, { error: "Unauthenticated" });
        return;
      }
      send(response, 200, {
        ok: true,
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          status: student.status,
          emailVerified: Boolean(student.emailVerified),
          createdAt: student.createdAt,
        },
      });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/logout") {
      const cookies = parseCookies(request);
      const rawToken = cookies.abss_student_session;
      if (rawToken) {
        const sessionHash = hashToken(rawToken);
        const db = readDb();
        db.studentSessions = (db.studentSessions || []).filter((s) => s.sessionHash !== sessionHash);
        writeDb(db);
      }
      send(response, 200, { ok: true }, { "Set-Cookie": buildLogoutCookie() });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/forgot-password") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`forgot:${clientIp}`, 5, 10 * 60 * 1000)) {
        send(response, 429, { error: "Too many password reset requests. Please wait a few minutes." });
        return;
      }

      const body = await readBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const db = readDb();
      const student = (db.students || []).find((s) => s.email.toLowerCase() === email);

      let devResetUrl = null;
      if (student) {
        const rawToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = hashToken(rawToken);
        const tokenRecord = {
          id: `token-${crypto.randomUUID()}`,
          studentId: student.id,
          tokenHash,
          tokenType: "password_reset",
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          usedAt: null,
          createdAt: new Date().toISOString(),
        };
        db.studentTokens = (db.studentTokens || []).map((t) =>
          t.studentId === student.id && t.tokenType === "password_reset" && !t.usedAt
            ? { ...t, usedAt: new Date().toISOString() }
            : t
        );
        db.studentTokens.push(tokenRecord);
        writeDb(db);
        devResetUrl = `/internships/reset-password?token=${rawToken}`;
        if (checkEmailConfigured()) {
          dispatchServerNotification({
            to: email,
            subject: "Reset Your Password - ABSS Nexus Internship Portal",
            html: `<p>Hello, please reset your password using: <a href="http://localhost:${port}/internships/reset-password?token=${rawToken}">Reset Password</a></p>`,
          });
        }
      }

      send(response, 200, {
        ok: true,
        message: "If an account with that email exists, password reset instructions have been generated.",
        emailServiceConfigured: checkEmailConfigured(),
        devResetUrl,
      });
      return;
    }

    if (request.method === "POST" && pathname === "/api/internships/auth/reset-password") {
      const clientIp = getClientIp(request);
      if (!checkRateLimit(`reset:${clientIp}`, 10, 5 * 60 * 1000)) {
        send(response, 429, { error: "Too many password reset attempts. Please wait a few minutes." });
        return;
      }

      const body = await readBody(request);
      const rawToken = String(body.token || "").trim();
      const newPassword = String(body.newPassword || "");

      if (!rawToken) {
        send(response, 400, { error: "Password reset token is required." });
        return;
      }
      if (!newPassword || newPassword.length < 8) {
        send(response, 400, { error: "New password must be at least 8 characters long." });
        return;
      }

      const tokenHash = hashToken(rawToken);
      const db = readDb();
      const tokenRecord = (db.studentTokens || []).find((t) => t.tokenHash === tokenHash && t.tokenType === "password_reset");

      if (!tokenRecord || tokenRecord.usedAt) {
        send(response, 400, { error: "Invalid or already used password reset token." });
        return;
      }

      if (new Date(tokenRecord.expiresAt).getTime() < Date.now()) {
        send(response, 400, { error: "Password reset token has expired. Please request a new one." });
        return;
      }

      const student = (db.students || []).find((s) => s.id === tokenRecord.studentId);
      if (!student) {
        send(response, 400, { error: "Invalid token student reference." });
        return;
      }

      tokenRecord.usedAt = new Date().toISOString();
      student.passwordHash = hashPassword(newPassword);
      student.updatedAt = new Date().toISOString();

      db.studentSessions = (db.studentSessions || []).filter((s) => s.studentId !== student.id);
      writeDb(db);

      send(response, 200, { ok: true, message: "Password updated successfully. You can now log in with your new password." });
      return;
    }

    if (request.method === "GET" && pathname === "/api/internships/dashboard/overview") {
      const db = readDb();
      const student = getStudentFromSession(request, db);
      if (!student) {
        send(response, 401, { error: "Unauthenticated" });
        return;
      }

      const applications = (db.internshipApplications || []).filter((app) => app.email?.toLowerCase() === student.email.toLowerCase());
      const programs = (db.internshipPrograms || []).filter((p) => p.status === "published");

      send(response, 200, {
        ok: true,
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          status: student.status,
          emailVerified: Boolean(student.emailVerified),
          createdAt: student.createdAt,
        },
        enrolledCohorts: [],
        applications,
        availablePrograms: programs,
      });
      return;
    }

    // Allow direct dashboard access with client-side session hydration
    if ((request.method === "GET" || request.method === "HEAD") && pathname === "/internships/dashboard") {
      serveStatic(request, response, pathname);
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      serveStatic(request, response, pathname);
      return;
    }

    send(response, 405, { error: "Method not allowed" });
  } catch (error) {
    send(response, 500, { error: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`ABSS Nexus server running at http://localhost:${port}`);
});

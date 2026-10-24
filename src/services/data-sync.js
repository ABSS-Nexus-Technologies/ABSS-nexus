/**
 * ABSS Nexus Technologies — Multi-Destination Data Sync Engine
 * Enables simultaneous storage across:
 * 1. Cloudflare D1 / Local SQLite backend
 * 2. Firebase Firestore (abss-nexus-technologies)
 * 3. Google Sheets Real-Time Webhook (Live spreadsheet rows on Google Drive/Mobile)
 *
 * Security Architecture:
 * - Passwords, secret hashes, and authentication tokens are NEVER dispatched to Google Sheets.
 * - Only safe business contact and registration attributes are mirrored.
 * - Outgoing webhook requests are non-blocking, ensuring zero latency impact for students.
 */

(function () {
  "use strict";

  const STORAGE_KEY_WEBHOOK = "abss_google_sheets_webhook_url";
  const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxWakMKIDy67PtVMScD8bl4R3N75dfrc3QWwtUkG9zIYQAR5fgtF_UJruR6wrzBy9y4mg/exec";

  const getWebhookUrl = () => {
    return (
      (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY_WEBHOOK)) ||
      (typeof window !== "undefined" && window.__ABSS_CONFIG__?.GOOGLE_SHEETS_WEBHOOK_URL) ||
      DEFAULT_WEBHOOK_URL
    );
  };

  const sanitizeDataForSpreadsheet = (payload) => {
    const safe = { ...payload };
    // Strictly omit authentication credentials
    delete safe.password;
    delete safe.confirmPassword;
    delete safe.passwordHash;
    delete safe.token;
    delete safe.authToken;
    delete safe.secret;

    safe.timestamp = safe.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    return safe;
  };

  /**
   * Dispatches record to Google Sheets Apps Script Webhook
   */
  async function syncToGoogleSheets(payload) {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
      // Clean silent fallback if webhook not yet configured
      return { success: false, reason: "webhook_not_configured" };
    }

    const cleanData = sanitizeDataForSpreadsheet(payload);

    try {
      // Using no-cors mode allows direct browser dispatch without CORS errors from Google Apps Script
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      });

      console.info("[ABSS Sync] Successfully dispatched row to Google Sheets:", cleanData.email || cleanData.client);
      return { success: true };
    } catch (err) {
      console.warn("[ABSS Sync] Google Sheets sync error:", err?.message || err);
      return { success: false, error: err?.message };
    }
  }

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

  /**
   * Dispatches record directly to Firebase Firestore Native via official Google Cloud REST endpoint
   */
  async function syncToFirestore(collectionName, data) {
    try {
      if (!data) return { success: false };
      // Only ignore strictly automated regression runners with explicit flag
      const isAutomatedCi = data.client === "Regression Test Client" || data.__isAutomatedRegression === true;
      if (isAutomatedCi) return { success: true, ignored: "automated_ci_data" };

      const apiKey = (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_API_KEY) || "AIzaSyBWZ2Ui1Lgwi5buYkmytubFUOwYjxokRXE";
      const projectId = (typeof window !== "undefined" && window.__ABSS_CONFIG__?.FIREBASE_PROJECT_ID) || "abss-nexus-technologies";
      const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

      const safeData = sanitizeDataForSpreadsheet(data);
      safeData.createdAtIso = safeData.createdAtIso || new Date().toISOString();

      const docId = data.id || (data.email ? String(data.email).replace(/[^a-zA-Z0-9_-]/g, "_") : "");
      let url = `${baseUrl}/${collectionName}?key=${apiKey}`;
      let method = "POST";
      if (docId) {
        const cleanId = String(docId).replace(/[^a-zA-Z0-9_-]/g, "_");
        url = `${baseUrl}/${collectionName}/${encodeURIComponent(cleanId)}?key=${apiKey}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: toFirestoreFields(safeData) }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        console.warn("[ABSS Sync] Firestore API response:", response.status, errJson);
        return { success: false, status: response.status, error: errJson };
      }

      const resData = await response.json();
      console.info(`[ABSS Sync] ✓ Synced record to Firestore collection "${collectionName}":`, resData.name?.split("/").pop());
      return { success: true, doc: resData };
    } catch (err) {
      console.warn("[ABSS Sync] Firestore sync error:", err?.message || err);
      return { success: false, error: err?.message };
    }
  }

  /**
   * Dual Sync: Broadcasts registration or inquiry to both Firebase and Google Sheets
   */
  async function dualSyncRecord(type, data) {
    const payload = {
      type: type || "registration",
      ...data,
      source: "ABSS Nexus Portal",
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // 1. Google Sheets background sync (fire-and-forget)
    syncToGoogleSheets(payload).catch(() => {});

    let collectionName = "students";
    if (type === "contact_lead" || type === "lead") collectionName = "leads";
    else if (type === "internship_application" || type === "application") collectionName = "applications";
    else if (type === "project" || type === "project_record") collectionName = "projects";
    else if (type === "client" || type === "client_record") collectionName = "clients";
    else if (type === "task" || type === "task_record") collectionName = "tasks";
    else if (type === "certificate" || type === "certificate_record") collectionName = "certificates";
    else if (type === "student_registration" || type === "student") collectionName = "students";

    syncToFirestore(collectionName, payload).catch(() => {});

    return { ok: true };
  }

  window.AbssDataSync = {
    getWebhookUrl,
    setWebhookUrl(url) {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY_WEBHOOK, String(url || "").trim());
      }
    },
    syncToGoogleSheets,
    syncToFirestore,
    dualSyncRecord,
  };
})();

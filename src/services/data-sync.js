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

  const getWebhookUrl = () => {
    return (
      (typeof window !== "undefined" && window.__ABSS_CONFIG__?.GOOGLE_SHEETS_WEBHOOK_URL) ||
      (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY_WEBHOOK)) ||
      ""
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

  /**
   * Dispatches student profile to Firebase Firestore (if Firebase is loaded)
   */
  async function syncToFirestore(collectionName, data) {
    try {
      const { firebaseConfig, isFirebaseConfigured } = await import("./firebase-config.js");
      if (!isFirebaseConfigured()) return { success: false, reason: "firebase_not_configured" };

      const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js");
      const { getFirestore, collection, addDoc, doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");

      const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const safeData = sanitizeDataForSpreadsheet(data);
      safeData.createdAtIso = new Date().toISOString();

      if (data.id || data.email) {
        const docId = String(data.id || data.email).replace(/[^a-zA-Z0-9_-]/g, "_");
        await setDoc(doc(db, collectionName, docId), safeData, { merge: true });
      } else {
        await addDoc(collection(db, collectionName), safeData);
      }

      console.info(`[ABSS Sync] Synced record to Firebase collection "${collectionName}":`, safeData.email || safeData.name);
      return { success: true };
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

    // 2. Firebase Firestore sync (fire-and-forget)
    const collectionName = type === "contact_lead" ? "leads" : "students";
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

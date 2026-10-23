window.AbssAdminConfig = {
  mode: "api",
  apiBaseUrl: "",
  login: {
    sessionKey: "abss-admin-auth",
    tokenKey: "abss-admin-token",
  },
  storage: {
    stateKey: "abss-admin-dashboard",
    contactLeadQueueKey: "abss-contact-lead-queue",
  },
  backend: {
    provider: "cloudflare-pages-functions",
  },
};

if (typeof document !== "undefined" && !window.AbssDataSync) {
  const syncScript = document.createElement("script");
  syncScript.src = "/src/services/data-sync.js";
  syncScript.defer = true;
  document.head.appendChild(syncScript);
}

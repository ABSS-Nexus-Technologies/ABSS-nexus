(function () {
  const config = window.AbssAdminConfig || {};
  const storage = config.storage || {};
  const stateKey = storage.stateKey || "abss-admin-dashboard";
  const contactLeadQueueKey = storage.contactLeadQueueKey || "abss-contact-lead-queue";
  const apiBaseUrl = config.apiBaseUrl || "";
  const login = config.login || {};
  const tokenKey = login.tokenKey || "abss-admin-token";

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const readJson = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || clone(fallback);
    } catch (error) {
      return clone(fallback);
    }
  };

  const writeJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const mergeContactLeads = (state) => {
    const currentState = state || {};
    const queuedLeads = readJson(contactLeadQueueKey, []);
    if (!queuedLeads.length) return currentState;

    const existingIds = new Set((currentState.leads || []).map((lead) => lead.id));
    const freshLeads = queuedLeads.filter((lead) => !existingIds.has(lead.id));
    if (!freshLeads.length) return currentState;

    return {
      ...currentState,
      leads: [...freshLeads, ...(currentState.leads || [])],
      activity: [`${freshLeads.length} website inquiry added`, ...(currentState.activity || [])].slice(0, 8),
    };
  };

  const isApiMode = () => (config.mode || "local") === "api";
  const getToken = () => sessionStorage.getItem(tokenKey) || "";

  const requestJson = async (method, path, body, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${apiBaseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          message = errorData.error;
        }
      } catch {}
      const err = new Error(message);
      err.status = response.status;
      throw err;
    }

    return response.status === 204 ? null : response.json();
  };

  window.AbssAdminApi = {
    getMode() {
      return config.mode || "local";
    },

    loadState(defaultState) {
      if (isApiMode() && getToken()) {
        return mergeContactLeads(readJson(stateKey, defaultState));
      }

      if (isApiMode()) {
        return mergeContactLeads(clone(defaultState));
      }

      return mergeContactLeads(readJson(stateKey, defaultState));
    },

    async loadStateAsync(defaultState) {
      if (isApiMode() && getToken()) {
        try {
          const remoteState = await requestJson("GET", "/api/admin/state");
          if (remoteState) {
            writeJson(stateKey, remoteState);
            return mergeContactLeads(remoteState);
          }
        } catch (error) {
          console.warn("Remote state fetch failed, falling back to local cache", error);
        }
      }
      return this.loadState(defaultState);
    },

    saveState(state) {
      writeJson(stateKey, state);

      if (isApiMode() && getToken()) {
        requestJson("PUT", "/api/admin/state", state).catch((error) => {
          console.error("Background state sync failed:", error);
        });
        return;
      }

      if (isApiMode() && !getToken()) {
        throw new Error("Admin session required");
      }
    },

    async saveStateAsync(state) {
      writeJson(stateKey, state);

      if (isApiMode() && getToken()) {
        return requestJson("PUT", "/api/admin/state", state);
      }

      if (isApiMode() && !getToken()) {
        throw new Error("Admin session required");
      }
    },

    queueContactLead(lead) {
      const queuedLeads = readJson(contactLeadQueueKey, []);
      queuedLeads.unshift(lead);
      writeJson(contactLeadQueueKey, queuedLeads.slice(0, 50));

      if (isApiMode()) {
        return requestJson("POST", "/api/leads/contact", lead);
      }

      return Promise.resolve({ ok: true, lead });
    },

    async getStorageStatus() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/storage-status");
      }

      const state = readJson(stateKey, { leads: [], projects: [], clients: [], tickets: [] });
      return {
        activeStorage: "KV fallback",
        d1Connected: false,
        kvConnected: true,
        counts: {
          leads: (state.leads || []).length,
          projects: (state.projects || []).length,
          clients: (state.clients || []).length,
          tickets: (state.tickets || []).length,
        },
        migration: { completed: false },
      };
    },

    async listLeads(options = {}) {
      const params = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") params.set(key, value);
      });

      if (isApiMode() && getToken()) {
        return requestJson("GET", `/api/admin/leads?${params.toString()}`);
      }

      const state = readJson(stateKey, { leads: [] });
      return { items: state.leads || [], total: (state.leads || []).length, page: Number(options.page || 1), pageSize: Number(options.pageSize || 20) };
    },

    async createLead(lead) {
      if (isApiMode() && getToken()) {
        return requestJson("POST", "/api/leads/contact", lead);
      }

      const state = readJson(stateKey, { leads: [] });
      state.leads = [lead, ...(state.leads || [])];
      writeJson(stateKey, state);
      return { ok: true, lead };
    },

    async updateLead(id, updates) {
      if (isApiMode() && getToken()) {
        return requestJson("PUT", `/api/admin/leads/${encodeURIComponent(id)}`, updates);
      }

      const state = readJson(stateKey, { leads: [] });
      state.leads = (state.leads || []).map((lead) => (lead.id === id ? { ...lead, ...updates } : lead));
      writeJson(stateKey, state);
      return { ok: true };
    },

    async deleteLead(id) {
      if (isApiMode() && getToken()) {
        return requestJson("DELETE", `/api/admin/leads/${encodeURIComponent(id)}`);
      }

      const state = readJson(stateKey, { leads: [] });
      state.leads = (state.leads || []).filter((lead) => lead.id !== id);
      writeJson(stateKey, state);
      return { ok: true };
    },

    async listApplications() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/internships/applications");
      }
      const state = readJson(stateKey, { internshipApplications: [] });
      return { ok: true, applications: state.internshipApplications || [] };
    },

    async updateApplication(id, updates) {
      if (isApiMode() && getToken()) {
        return requestJson("PUT", `/api/admin/internships/applications/${encodeURIComponent(id)}`, updates);
      }
      const state = readJson(stateKey, { internshipApplications: [] });
      state.internshipApplications = (state.internshipApplications || []).map((app) =>
        app.id === id ? { ...app, ...updates } : app
      );
      writeJson(stateKey, state);
      return { ok: true };
    },

    async listStudents() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/internships/students");
      }
      const state = readJson(stateKey, { students: [] });
      return { ok: true, students: state.students || [] };
    },

    async listCertificates() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/internships/certificates");
      }
      const state = readJson(stateKey, { certificates: [] });
      return { ok: true, certificates: state.certificates || [] };
    },

    async createCertificate(cert) {
      if (isApiMode() && getToken()) {
        return requestJson("POST", "/api/admin/internships/certificates", cert);
      }
      const state = readJson(stateKey, { certificates: [] });
      state.certificates = [cert, ...(state.certificates || [])];
      writeJson(stateKey, state);
      return { ok: true, certificate: cert };
    },

    async revokeCertificate(id) {
      if (isApiMode() && getToken()) {
        return requestJson("PUT", "/api/admin/internships/certificates/revoke", { id });
      }
      const state = readJson(stateKey, { certificates: [] });
      state.certificates = (state.certificates || []).map((c) =>
        c.id === id ? { ...c, status: "Revoked" } : c
      );
      writeJson(stateKey, state);
      return { ok: true };
    },

    async getInternshipsOverview() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/internships/overview");
      }
      const state = readJson(stateKey, {});
      return {
        ok: true,
        metrics: {
          applicationsCount: (state.internshipApplications || []).length,
          enrolledInternsCount: (state.students || []).length,
          verifiedPaymentsCount: 0,
          issuedCertificatesCount: (state.certificates || []).length,
          activeTracksCount: 5,
        },
        recentApplications: (state.internshipApplications || []).slice(0, 5),
      };
    },

    async getCompanyOverview() {
      if (isApiMode() && getToken()) {
        return requestJson("GET", "/api/admin/company/overview");
      }
      const state = readJson(stateKey, {});
      return {
        ok: true,
        metrics: {
          leadsCount: (state.leads || []).length,
          activeProjectsCount: (state.projects || []).length,
          clientsCount: (state.clients || []).length,
          servicesCount: 17,
          publishedPagesCount: "68+",
        },
        recentLeads: (state.leads || []).slice(0, 5),
      };
    },

    async migrateStorage() {
      if (!isApiMode() || !getToken()) {
        throw new Error("Admin session required");
      }

      return requestJson("POST", "/api/admin/migrate-storage");
    },

    getLogin() {
      return {
        sessionKey: config.login?.sessionKey || "abss-admin-auth",
        tokenKey,
      };
    },

    async login(username, password) {
      if (isApiMode()) {
        const result = await requestJson("POST", "/api/auth/login", { username, password });
        sessionStorage.setItem(tokenKey, result.token);
        if (result.role) sessionStorage.setItem("abss-admin-role", result.role);
        if (result.username) sessionStorage.setItem("abss-admin-username", result.username);
        return result;
      }

      throw new Error("Invalid credentials");
    },

    logout() {
      sessionStorage.removeItem(tokenKey);
      sessionStorage.removeItem("abss-admin-role");
      sessionStorage.removeItem("abss-admin-username");
    },

    async validateSession(defaultState) {
      if (!isApiMode()) {
        return { authenticated: false, state: null, admin: null };
      }

      const token = getToken();
      if (!token) {
        return { authenticated: false, state: null, admin: null };
      }

      try {
        let adminInfo = null;
        try {
          const meRes = await requestJson("GET", "/api/admin/auth/me");
          if (meRes && meRes.admin) {
            adminInfo = meRes.admin;
            sessionStorage.setItem("abss-admin-role", adminInfo.role);
            sessionStorage.setItem("abss-admin-username", adminInfo.username);
          }
        } catch {}

        const state = await requestJson("GET", "/api/admin/state");
        if (state) {
          writeJson(stateKey, state);
        }
        return {
          authenticated: true,
          admin: adminInfo || {
            username: sessionStorage.getItem("abss-admin-username") || "admin",
            role: sessionStorage.getItem("abss-admin-role") || "super_admin"
          },
          state: mergeContactLeads(state || defaultState || {})
        };
      } catch (error) {
        if (error.status === 401 || (error.message && error.message.toLowerCase().includes("unauthorized"))) {
          this.logout();
          return { authenticated: false, state: null, admin: null };
        }
        console.warn("Session validation warning, keeping session with local state", error);
        const cachedState = readJson(stateKey, defaultState);
        return {
          authenticated: true,
          admin: {
            username: sessionStorage.getItem("abss-admin-username") || "admin",
            role: sessionStorage.getItem("abss-admin-role") || "super_admin"
          },
          state: mergeContactLeads(cachedState || {})
        };
      }
    },

    isAuthenticated() {
      return isApiMode() && Boolean(getToken());
    },
  };
})();

(function () {
  const loginPath = "/admin/login";
  const defaultAdminPage = "/admin/";

  // Allowed targets for safe redirect
  const isAllowedAdminTarget = (target) => {
    if (!target) return false;
    const clean = String(target).trim();
    if (clean === "/admin" || clean === "/admin/") return true;
    if (clean.startsWith("/admin/internships")) return true;
    if (clean.startsWith("/admin/company")) return true;
    if (/^\/admin\/(dashboard|leads|projects|clients|support|pricing|programs|applications|students|tasks|submissions|reviews|payments|certificates|users|audit-logs|settings)$/.test(clean)) return true;
    if (/^admin-(dashboard|leads|projects|clients|support|pricing|programs|applications|students|tasks|submissions|reviews|payments|certificates|users|audit-logs|settings)\.html$/.test(clean)) return true;
    return false;
  };

  const getCurrentAdminPage = () => {
    return window.location.pathname || defaultAdminPage;
  };

  const getSafeNextPage = (target) => {
    if (!target) return defaultAdminPage;
    const candidate = String(target).trim();
    if (isAllowedAdminTarget(candidate)) return candidate;
    // Map legacy format
    const baseName = candidate.split("/").pop().replace(/^admin-/, "").replace(/\.html$/, "");
    if (["programs", "applications", "students", "tasks", "submissions", "reviews", "payments", "certificates"].includes(baseName)) {
      return `/admin/internships/${baseName}`;
    }
    if (["leads", "projects", "clients", "support", "pricing"].includes(baseName)) {
      return `/admin/company/${baseName}`;
    }
    return defaultAdminPage;
  };

  const redirectToLogin = (customNext) => {
    const nextPage = getSafeNextPage(customNext || getCurrentAdminPage());
    window.location.replace(`/admin/login?next=${encodeURIComponent(nextPage)}`);
  };

  window.AbssAdminAuthGuard = {
    getSafeNextPage,

    redirectToLogin,

    async requireAdminSession(defaultState, moduleRequired) {
      const result = await window.AbssAdminApi?.validateSession(defaultState);
      if (!result?.authenticated) {
        redirectToLogin();
        return { authenticated: false, state: null, admin: null };
      }

      // Check role permissions if module is required
      const adminRole = result.admin?.role || sessionStorage.getItem("abss-admin-role") || "super_admin";
      if (moduleRequired) {
        const canAccessInternships = ["super_admin", "internship_admin", "internship_reviewer"].includes(adminRole);
        const canAccessCompany = ["super_admin", "company_admin"].includes(adminRole);

        if (moduleRequired === "internships" && !canAccessInternships) {
          alert(`Access Restricted: Your role (${adminRole}) does not have permission to access Internship Administration.`);
          window.location.replace("/admin/company/");
          return { authenticated: false, state: null, admin: null };
        }

        if (moduleRequired === "company" && !canAccessCompany) {
          alert(`Access Restricted: Your role (${adminRole}) does not have permission to access Company Administration.`);
          window.location.replace("/admin/internships/");
          return { authenticated: false, state: null, admin: null };
        }
      }

      return result;
    },

    async redirectAuthenticatedLogin(nextPage) {
      const result = await window.AbssAdminApi?.validateSession();
      if (result?.authenticated) {
        const safe = getSafeNextPage(nextPage);
        window.location.replace(safe);
      }
    },
  };
})();

/**
 * ABSS Nexus Technologies - Enterprise Admin Operations Real-Time Engine
 * Connects all admin modules and pages directly to Cloudflare D1 / backend storage.
 * Eliminates static mock data and provides dynamic CRUD, live metrics, and clean empty states.
 */

(function () {
  "use strict";

  const adminApi = window.AbssAdminApi;
  if (!adminApi) return;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const formatDate = (value) => {
    if (!value) return "Just now";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatMoney = (val) => {
    const num = Number(val || 0);
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const statusClass = (status) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("convert") || s.includes("select") || s.includes("authentic") || s.includes("live") || s.includes("paid") || s.includes("active")) return "status-success";
    if (s.includes("shortlist") || s.includes("proposal") || s.includes("review") || s.includes("dev")) return "status-info";
    if (s.includes("new") || s.includes("pending") || s.includes("contact")) return "status-warning";
    if (s.includes("reject") || s.includes("revoke")) return "status-danger";
    return "status-neutral";
  };

  const emptyStateHtml = (icon, title, message, colSpan = 6) => `
    <tr>
      <td colspan="${colSpan}" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">${icon}</div>
        <strong style="display: block; font-size: 1.05rem; color: #1d1d1f; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif;">${escapeHtml(title)}</strong>
        <p style="margin: 0; font-size: 0.88rem; color: #6e6e73; max-width: 480px; margin: 0 auto;">${escapeHtml(message)}</p>
      </td>
    </tr>
  `;

  // Global State in memory
  let liveState = {
    leads: [],
    internshipApplications: [],
    students: [],
    certificates: [],
    projects: [],
    clients: [],
    tickets: [],
    pricing: [],
    activity: [],
    metrics: {}
  };

  async function initAdminEngine() {
    // 1. Verify Authentication Session
    const moduleType = window.location.pathname.includes("/admin/company") ? "company" : window.location.pathname.includes("/admin/internships") ? "internships" : null;
    const session = await window.AbssAdminAuthGuard.requireAdminSession(null, moduleType);
    if (!session || !session.authenticated) return;

    // Set User Role Badge if present
    const roleBadge = document.getElementById("adminUserRoleBadge");
    if (roleBadge && session.admin) {
      roleBadge.textContent = session.admin.role || "super_admin";
    }

    // 2. Fetch Live Real Database State
    try {
      liveState = await adminApi.loadStateAsync({});
    } catch (e) {
      console.warn("Real database state fetch fallback:", e);
      liveState = adminApi.loadState({});
    }

    // Ensure metrics object
    liveState.metrics = liveState.metrics || {};
    const leads = liveState.leads || [];
    const applications = liveState.internshipApplications || [];
    const students = liveState.students || [];
    const certificates = liveState.certificates || [];
    const projects = liveState.projects || [];
    const clients = liveState.clients || [];

    // Derive accurate counts
    const leadsCount = liveState.metrics.totalLeads ?? leads.length;
    const studentsCount = liveState.metrics.enrolledStudents ?? students.length;
    const appsCount = liveState.metrics.totalApplications ?? applications.length;
    const certsCount = liveState.metrics.issuedCertificates ?? certificates.length;
    const tracksCount = liveState.metrics.activeTracks ?? 5;
    const projectsCount = liveState.metrics.activeProjects ?? projects.length;
    const clientsCount = liveState.metrics.totalClients ?? clients.length;

    // 3. Update KPI Metric Cards Across Pages
    updateMetricCards({
      leadsCount,
      studentsCount,
      appsCount,
      certsCount,
      tracksCount,
      projectsCount,
      clientsCount
    });

    // 4. Update Sidebar Badges
    updateSidebarBadges({
      leadsCount,
      studentsCount,
      appsCount,
      certsCount,
      tracksCount,
      projectsCount
    });

    // 5. Update Hub Page Features (if on /admin/ or /admin/index.html)
    updateHubPageFeatures({
      leadsCount,
      studentsCount,
      appsCount,
      certsCount,
      tracksCount,
      projectsCount
    });

    // 6. Bind & Render Real Tables
    renderLeadsTable(leads);
    renderApplicationsTable(applications);
    renderStudentsTable(students);
    renderCertificatesTable(certificates);
    renderClientsTable(clients);
    renderProjectsTable(projects);

    // 7. Bind Live Search Inputs
    bindSearchFilters();

    // 8. Bind CSV Export Buttons
    bindExportCsv();

    // 9. Bind Certificate Issuance Modal & Revocation
    bindCertificateActions();
  }

  function updateMetricCards(counts) {
    // A. By data-metric attribute
    document.querySelectorAll("[data-metric='leads']").forEach((el) => { el.textContent = counts.leadsCount; });
    document.querySelectorAll("[data-metric='students']").forEach((el) => { el.textContent = counts.studentsCount; });
    document.querySelectorAll("[data-metric='applications']").forEach((el) => { el.textContent = counts.appsCount; });
    document.querySelectorAll("[data-metric='certificates']").forEach((el) => { el.textContent = counts.certsCount; });
    document.querySelectorAll("[data-metric='tracks']").forEach((el) => { el.textContent = `${counts.tracksCount} Tracks`; });
    document.querySelectorAll("[data-metric='projects']").forEach((el) => { el.textContent = counts.projectsCount; });
    document.querySelectorAll("[data-metric='clients']").forEach((el) => { el.textContent = counts.clientsCount; });

    // B. Legacy Overview cards by label
    document.querySelectorAll(".card").forEach((card) => {
      const label = card.querySelector("span")?.textContent?.trim()?.toUpperCase() || "";
      const valEl = card.querySelector("strong");
      if (!valEl) return;
      if (label.includes("ENROLLED STUDENTS")) valEl.textContent = counts.studentsCount;
      if (label.includes("ACTIVE TRACKS")) valEl.textContent = `${counts.tracksCount} Tracks`;
      if (label.includes("PENDING SUBMISSIONS") || label.includes("PENDING INQUIRIES")) valEl.textContent = `${counts.appsCount} Active`;
      if (label.includes("CERTIFICATES ISSUED")) valEl.textContent = `${counts.certsCount} Certified`;
    });

    // C. Modular KPI Grid cards (.admin-kpi-card)
    document.querySelectorAll(".admin-kpi-card").forEach((card) => {
      const label = card.querySelector(".kpi-label")?.textContent?.trim()?.toUpperCase() || "";
      const valEl = card.querySelector(".kpi-value");
      if (!valEl) return;

      if (label.includes("TOTAL APPLICATIONS")) valEl.textContent = counts.appsCount;
      if (label.includes("ENROLLED INTERNS") || label.includes("TOTAL ENROLLED") || label.includes("ENROLLED STUDENTS")) valEl.textContent = counts.studentsCount;
      if (label.includes("ISSUED CERTIFICATES")) valEl.textContent = counts.certsCount;
      if (label.includes("TOTAL LEADS") || label.includes("WEBSITE INQUIRIES")) valEl.textContent = counts.leadsCount;
      if (label.includes("ACTIVE CLIENT PROJECTS")) valEl.textContent = counts.projectsCount;
    });
  }

  function updateSidebarBadges(counts) {
    document.querySelectorAll(".admin-sidebar-nav a, .admin-tabs a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const badge = link.querySelector(".sidebar-badge");
      if (!badge) return;

      if (href.includes("/applications")) badge.textContent = counts.appsCount;
      if (href.includes("/students")) badge.textContent = counts.studentsCount;
      if (href.includes("/certificates")) badge.textContent = counts.certsCount;
      if (href.includes("/leads")) badge.textContent = counts.leadsCount;
      if (href.includes("/projects")) badge.textContent = counts.projectsCount;
      if (href.includes("/programs")) badge.textContent = counts.tracksCount;
    });
  }

  function updateHubPageFeatures(counts) {
    document.querySelectorAll(".module-card-features").forEach((list) => {
      list.querySelectorAll("li").forEach((item) => {
        const text = item.textContent || "";
        if (text.includes("Applications Pipeline")) {
          item.innerHTML = `<span class="feature-check">✓</span> <span><strong>${counts.appsCount}</strong> Applications Pipeline &amp; Review</span>`;
        }
        if (text.includes("Active Enrolled Learners")) {
          item.innerHTML = `<span class="feature-check">✓</span> <span><strong>${counts.studentsCount}</strong> Active Enrolled Learners</span>`;
        }
        if (text.includes("Fee Payments") && text.includes("Verified Certificates")) {
          item.innerHTML = `<span class="feature-check">✓</span> <span><strong>0</strong> Fee Payments &amp; <strong>${counts.certsCount}</strong> Verified Certificates</span>`;
        }
        if (text.includes("Client Inquiries")) {
          item.innerHTML = `<span class="feature-check">✓</span> <span><strong>${counts.leadsCount}</strong> Client Inquiries &amp; Pipeline Leads</span>`;
        }
      });
    });
  }

  // =========================================================================
  // LEADS TABLE
  // =========================================================================
  function renderLeadsTable(leads) {
    const table = document.querySelector("[data-leads-table]") || (window.location.pathname.includes("leads") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!leads || leads.length === 0) {
      table.innerHTML = emptyStateHtml("📬", "No Client Inquiries Yet", "Submissions from the website contact form and consultation requests will appear here in real time.", 8);
      return;
    }

    table.innerHTML = leads.map((lead) => {
      const name = lead.client || lead.name || "Website Inquiry";
      const email = lead.email || (lead.contact && lead.contact.split(" / ")[0]) || "Not provided";
      const phone = lead.phone || (lead.contact && lead.contact.split(" / ")[1]) || "";
      const service = lead.service || "Technical Consultation";
      const budget = lead.budgetLabel || (lead.budget ? formatMoney(lead.budget) : "Not specified");
      const date = formatDate(lead.createdAt);
      const status = lead.status || "New";

      return `
        <tr style="border-bottom: 1px solid #e5e5ea;" data-row-id="${escapeHtml(lead.id)}">
          <td style="padding: 12px; font-weight: 600; font-family: monospace; font-size: 0.8rem;">${escapeHtml(lead.id)}</td>
          <td style="padding: 12px;">
            <strong>${escapeHtml(name)}</strong><br/>
            <small style="color: #6e6e73;">${escapeHtml(email)} ${phone ? `&bull; ${escapeHtml(phone)}` : ""}</small>
          </td>
          <td style="padding: 12px;">${escapeHtml(service)}</td>
          <td style="padding: 12px;">${escapeHtml(lead.timeline || "Flexible")}</td>
          <td style="padding: 12px; font-weight: 600; color: #0066cc;">${escapeHtml(budget)}</td>
          <td style="padding: 12px; color: #6e6e73; font-size: 0.84rem;">${escapeHtml(date)}</td>
          <td style="padding: 12px;">
            <span class="status-pill ${statusClass(status)}" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 700;">${escapeHtml(status)}</span>
          </td>
          <td style="padding: 12px;">
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-action-view-lead" data-id="${escapeHtml(lead.id)}" style="padding: 4px 10px; background: #0066cc; color: #ffffff; border: none; border-radius: 6px; font-size: 0.76rem; font-weight: 600; cursor: pointer;">Details</button>
              <button type="button" class="btn-action-cycle-lead" data-id="${escapeHtml(lead.id)}" style="padding: 4px 8px; background: #f5f5f7; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Status</button>
              <button type="button" class="btn-action-delete-lead" data-id="${escapeHtml(lead.id)}" style="padding: 4px 8px; background: #fff; color: #dc2626; border: 1px solid #fee2e2; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Bind row actions
    table.querySelectorAll(".btn-action-view-lead").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const lead = (liveState.leads || []).find((l) => l.id === id);
        if (!lead) return;
        showLeadModal(lead);
      });
    });

    table.querySelectorAll(".btn-action-cycle-lead").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const lead = (liveState.leads || []).find((l) => l.id === id);
        if (!lead) return;
        const statuses = ["New", "Follow Up", "Call Booked", "Proposal Sent", "Converted", "Rejected"];
        const nextIdx = (statuses.indexOf(lead.status) + 1) % statuses.length;
        const newStatus = statuses[nextIdx];
        try {
          await adminApi.updateLead(id, { status: newStatus });
          lead.status = newStatus;
          renderLeadsTable(liveState.leads);
        } catch (e) {
          alert("Could not update status: " + e.message);
        }
      });
    });

    table.querySelectorAll(".btn-action-delete-lead").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
          await adminApi.deleteLead(id);
          liveState.leads = liveState.leads.filter((l) => l.id !== id);
          renderLeadsTable(liveState.leads);
          updateMetricCards({ ...liveState.metrics, leadsCount: liveState.leads.length });
        } catch (e) {
          alert("Could not delete lead: " + e.message);
        }
      });
    });
  }

  function showLeadModal(lead) {
    let modal = document.getElementById("adminLeadDetailModal");
    if (!modal) {
      modal = document.createElement("dialog");
      modal.id = "adminLeadDetailModal";
      modal.style.cssText = "border: none; border-radius: 16px; padding: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.2); max-width: 580px; width: 90%; background: #fff;";
      document.body.appendChild(modal);
    }
    const email = lead.email || (lead.contact && lead.contact.split(" / ")[0]) || "";
    const phone = lead.phone || (lead.contact && lead.contact.split(" / ")[1]) || "";
    const cleanPhone = phone.replace(/[^\d]/g, "");

    modal.innerHTML = `
      <div style="padding: 24px; border-bottom: 1px solid #e5e5ea; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.76rem; font-weight: 700; color: #0066cc; text-transform: uppercase;">Lead Specification</span>
          <h2 style="margin: 2px 0 0; font-size: 1.25rem;">${escapeHtml(lead.client || lead.name || "Client Inquiry")}</h2>
        </div>
        <button type="button" id="closeLeadModalBtn" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #6e6e73;">&times;</button>
      </div>
      <div style="padding: 24px; max-height: 65vh; overflow-y: auto; font-size: 0.9rem; line-height: 1.6;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">INQUIRY ID</strong><span>${escapeHtml(lead.id)}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">SERVICE REQUESTED</strong><span>${escapeHtml(lead.service || "Consultation")}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">EMAIL</strong><a href="mailto:${escapeHtml(email)}" style="color: #0066cc;">${escapeHtml(email || "None")}</a></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">PHONE</strong><span>${escapeHtml(phone || "None")}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">ESTIMATED BUDGET</strong><span style="font-weight: 700; color: #0066cc;">${escapeHtml(lead.budgetLabel || formatMoney(lead.budget))}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">TIMELINE</strong><span>${escapeHtml(lead.timeline || "Flexible")}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">SUBMISSION DATE</strong><span>${escapeHtml(formatDate(lead.createdAt))}</span></div>
          <div><strong style="color: #6e6e73; font-size: 0.78rem; display: block;">CURRENT STATUS</strong><span class="status-pill ${statusClass(lead.status)}" style="padding: 2px 8px; border-radius: 999px; font-size: 0.72rem;">${escapeHtml(lead.status || "New")}</span></div>
        </div>
        <div style="background: #f5f5f7; border-radius: 10px; padding: 14px; margin-top: 14px;">
          <strong style="color: #6e6e73; font-size: 0.78rem; display: block; margin-bottom: 4px;">PROJECT MESSAGE &amp; SCOPE</strong>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(lead.message || "No project message provided.")}</p>
        </div>
      </div>
      <div style="padding: 16px 24px; border-top: 1px solid #e5e5ea; display: flex; justify-content: flex-end; gap: 10px; background: #fafafa; border-radius: 0 0 16px 16px;">
        ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" target="_blank" style="padding: 8px 16px; background: #25D366; color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.82rem; font-weight: 600;">Chat on WhatsApp</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}" style="padding: 8px 16px; background: #0066cc; color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.82rem; font-weight: 600;">Reply via Email</a>` : ""}
      </div>
    `;

    document.getElementById("closeLeadModalBtn")?.addEventListener("click", () => modal.close());
    modal.showModal();
  }

  // =========================================================================
  // APPLICATIONS TABLE
  // =========================================================================
  function renderApplicationsTable(apps) {
    const table = document.querySelector("[data-applications-table]") || (window.location.pathname.includes("applications") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!apps || apps.length === 0) {
      table.innerHTML = emptyStateHtml("📝", "No Applications Yet", "Candidate applications submitted through the internship registration portal will appear here in real time.", 6);
      return;
    }

    table.innerHTML = apps.map((app) => {
      const name = app.fullName || app.name || "Student Applicant";
      const email = app.email || "No email";
      const program = app.internshipProgram || app.program || "Internship Track";
      const notes = app.adminNotes || app.notes || app.motivation || (app.college ? `Institution: ${app.college}` : "Registered application record");
      const status = app.status || "New";

      return `
        <tr style="border-bottom: 1px solid #e5e5ea;" data-app-id="${escapeHtml(app.id)}">
          <td style="padding: 14px; font-family: monospace; font-size: 0.82rem; font-weight: 600;">${escapeHtml(app.id)}</td>
          <td style="padding: 14px;">
            <strong>${escapeHtml(name)}</strong><br/>
            <small style="color: #6e6e73;">${escapeHtml(email)} ${app.phone ? `&bull; ${escapeHtml(app.phone)}` : ""}</small>
          </td>
          <td style="padding: 14px; font-weight: 500;">${escapeHtml(program)}</td>
          <td style="padding: 14px; font-size: 0.84rem; color: #555; max-width: 240px;">${escapeHtml(notes)}</td>
          <td style="padding: 14px;">
            <span class="status-pill ${statusClass(status)}" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 700;">${escapeHtml(status)}</span>
          </td>
          <td style="padding: 14px;">
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-action-approve-app" data-id="${escapeHtml(app.id)}" style="padding: 4px 10px; background: #0066cc; color: #fff; border: none; border-radius: 6px; font-size: 0.76rem; font-weight: 600; cursor: pointer;">Approve</button>
              <button type="button" class="btn-action-reject-app" data-id="${escapeHtml(app.id)}" style="padding: 4px 10px; background: #fff; color: #dc2626; border: 1px solid #fee2e2; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Reject</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    table.querySelectorAll(".btn-action-approve-app").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const app = (liveState.internshipApplications || []).find((a) => a.id === id);
        if (!app) return;
        const nextStatus = app.status === "New" ? "Under Review" : app.status === "Under Review" ? "Shortlisted" : "Selected";
        try {
          await adminApi.updateApplication(id, { status: nextStatus });
          app.status = nextStatus;
          renderApplicationsTable(liveState.internshipApplications);
        } catch (e) {
          alert("Update failed: " + e.message);
        }
      });
    });

    table.querySelectorAll(".btn-action-reject-app").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const app = (liveState.internshipApplications || []).find((a) => a.id === id);
        if (!app) return;
        if (!confirm("Mark this application as Rejected?")) return;
        try {
          await adminApi.updateApplication(id, { status: "Rejected" });
          app.status = "Rejected";
          renderApplicationsTable(liveState.internshipApplications);
        } catch (e) {
          alert("Update failed: " + e.message);
        }
      });
    });
  }

  // =========================================================================
  // STUDENTS TABLE
  // =========================================================================
  function renderStudentsTable(students) {
    const table = document.querySelector("[data-students-table]") || (window.location.pathname.includes("students") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!students || students.length === 0) {
      table.innerHTML = emptyStateHtml("🎓", "No Enrolled Interns Yet", "Registered students will appear here once they create accounts and enroll in internship tracks.", 6);
      return;
    }

    table.innerHTML = students.map((s) => `
      <tr style="border-bottom: 1px solid #e5e5ea;">
        <td style="padding: 14px; font-family: monospace; font-size: 0.82rem;">${escapeHtml(s.id || "STD-" + Math.abs(s.email.hashCode?.() || 101))}</td>
        <td style="padding: 14px;"><strong>${escapeHtml(s.name)}</strong></td>
        <td style="padding: 14px;"><a href="mailto:${escapeHtml(s.email)}" style="color: #0066cc;">${escapeHtml(s.email)}</a></td>
        <td style="padding: 14px;">
          <span class="status-pill ${s.emailVerified ? 'status-success' : 'status-warning'}" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 700;">
            ${s.emailVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </td>
        <td style="padding: 14px; color: #6e6e73; font-size: 0.84rem;">${escapeHtml(formatDate(s.createdAt))}</td>
        <td style="padding: 14px;">
          <a href="mailto:${escapeHtml(s.email)}" style="padding: 4px 10px; background: #f5f5f7; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 0.76rem; text-decoration: none; color: #1d1d1f;">Contact</a>
        </td>
      </tr>
    `).join("");
  }

  // =========================================================================
  // CERTIFICATES TABLE
  // =========================================================================
  function renderCertificatesTable(certs) {
    const table = document.querySelector("[data-certificates-table]") || (window.location.pathname.includes("certificates") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!certs || certs.length === 0) {
      table.innerHTML = emptyStateHtml("📜", "No Certificates Issued Yet", "Cryptographically verifiable certificates will appear here once minted by an administrator.", 7);
      return;
    }

    table.innerHTML = certs.map((c) => `
      <tr style="border-bottom: 1px solid #e5e5ea;">
        <td style="padding: 12px; font-family: monospace; font-size: 0.8rem; font-weight: 700;">${escapeHtml(c.id)}</td>
        <td style="padding: 12px;"><strong>${escapeHtml(c.studentName)}</strong></td>
        <td style="padding: 12px;">${escapeHtml(c.program)}</td>
        <td style="padding: 12px; color: #6e6e73; font-size: 0.84rem;">${escapeHtml(c.issueDate || formatDate(c.createdAt))}</td>
        <td style="padding: 12px; font-weight: 600; font-size: 0.84rem;">${escapeHtml(c.grade || "Grade A (Distinction)")}</td>
        <td style="padding: 12px;">
          <span class="status-pill ${statusClass(c.status)}" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 700;">${escapeHtml(c.status || "Authentic")}</span>
        </td>
        <td style="padding: 12px;">
          <div style="display: flex; gap: 6px;">
            <a href="/verify-certificate?id=${encodeURIComponent(c.id)}" target="_blank" style="padding: 4px 8px; background: #0066cc; color: #fff; text-decoration: none; border-radius: 6px; font-size: 0.76rem; font-weight: 600;">Verify</a>
            ${c.status !== "Revoked" ? `<button type="button" class="btn-revoke-cert" data-id="${escapeHtml(c.id)}" style="padding: 4px 8px; background: #fff; color: #dc2626; border: 1px solid #fee2e2; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Revoke</button>` : ""}
          </div>
        </td>
      </tr>
    `).join("");

    table.querySelectorAll(".btn-revoke-cert").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (!confirm(`Are you sure you want to revoke certificate ${id}? This action is irreversible.`)) return;
        try {
          await adminApi.revokeCertificate(id);
          const c = (liveState.certificates || []).find((item) => item.id === id);
          if (c) c.status = "Revoked";
          renderCertificatesTable(liveState.certificates);
        } catch (e) {
          alert("Revocation failed: " + e.message);
        }
      });
    });
  }

  // =========================================================================
  // CLIENTS & PROJECTS TABLES
  // =========================================================================
  function renderClientsTable(clients) {
    const table = document.querySelector("[data-clients-table]") || (window.location.pathname.includes("clients") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!clients || clients.length === 0) {
      table.innerHTML = emptyStateHtml("🏢", "No Client Records Yet", "Enterprise and corporate clients will appear here once converted from qualified leads.", 7);
      return;
    }

    table.innerHTML = clients.map((c) => `
      <tr style="border-bottom: 1px solid #e5e5ea;">
        <td style="padding: 12px; font-weight: 600;">${escapeHtml(c.id || "CLI-01")}</td>
        <td style="padding: 12px;"><strong>${escapeHtml(c.name)}</strong></td>
        <td style="padding: 12px;">${escapeHtml(c.service || "Enterprise IT")}</td>
        <td style="padding: 12px;"><a href="mailto:${escapeHtml(c.email)}" style="color: #0066cc;">${escapeHtml(c.email || "—")}</a></td>
        <td style="padding: 12px;">${escapeHtml(c.phone || "—")}</td>
        <td style="padding: 12px;"><span class="status-pill status-success" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem;">ACTIVE</span></td>
        <td style="padding: 12px;"><button type="button" style="padding: 4px 10px; background: #f5f5f7; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Manage</button></td>
      </tr>
    `).join("");
  }

  function renderProjectsTable(projects) {
    const table = document.querySelector("[data-projects-table]") || (window.location.pathname.includes("projects") ? document.querySelector("table tbody") : null);
    if (!table) return;

    if (!projects || projects.length === 0) {
      table.innerHTML = emptyStateHtml("💼", "No Active Projects Yet", "Client development projects and software engineering contracts will appear here.", 6);
      return;
    }

    table.innerHTML = projects.map((p) => `
      <tr style="border-bottom: 1px solid #e5e5ea;">
        <td style="padding: 12px; font-weight: 600;">${escapeHtml(p.id)}</td>
        <td style="padding: 12px;"><strong>${escapeHtml(p.name)}</strong></td>
        <td style="padding: 12px;">${escapeHtml(p.client)}</td>
        <td style="padding: 12px; font-weight: 600; color: #0066cc;">${formatMoney(p.value)}</td>
        <td style="padding: 12px;"><span class="status-pill status-info" style="padding: 4px 10px; border-radius: 999px; font-size: 0.74rem;">${escapeHtml(p.status || "IN DEV")}</span></td>
        <td style="padding: 12px;"><button type="button" style="padding: 4px 10px; background: #f5f5f7; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 0.76rem; cursor: pointer;">Milestones</button></td>
      </tr>
    `).join("");
  }

  // =========================================================================
  // ACTIONS: CERTIFICATE ISSUANCE MODAL
  // =========================================================================
  function bindCertificateActions() {
    const newCertBtn = document.querySelector("[data-btn-new-cert]") || (window.location.pathname.includes("certificates") ? document.querySelector(".admin-actions-bar button:last-child") : null);
    if (!newCertBtn) return;

    newCertBtn.addEventListener("click", () => {
      let modal = document.getElementById("issueCertModal");
      if (!modal) {
        modal = document.createElement("dialog");
        modal.id = "issueCertModal";
        modal.style.cssText = "border: none; border-radius: 16px; padding: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.2); max-width: 500px; width: 90%; background: #fff;";
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div style="padding: 20px 24px; border-bottom: 1px solid #e5e5ea; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 1.15rem; font-family: 'Space Grotesk', sans-serif;">Issue Verifiable Certificate</h3>
          <button type="button" id="closeCertModal" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #6e6e73;">&times;</button>
        </div>
        <form id="issueCertForm" style="padding: 24px; display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">STUDENT FULL NAME *</label>
            <input type="text" id="certStudentName" required placeholder="e.g. Rahul Verma" style="width: 100%; padding: 10px 12px; border: 1px solid #d2d2d7; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">PROGRAM TRACK *</label>
            <select id="certProgram" required style="width: 100%; padding: 10px 12px; border: 1px solid #d2d2d7; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
              <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
              <option value="AI & Applied Machine Learning">AI & Applied Machine Learning</option>
              <option value="Software & Full-Stack Development">Software & Full-Stack Development</option>
              <option value="UI/UX Product Design">UI/UX Product Design</option>
              <option value="Cloud Computing & DevOps">Cloud Computing & DevOps</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">GRADE &amp; MERIT</label>
            <input type="text" id="certGrade" value="Grade A+ (Distinction - 96%)" style="width: 100%; padding: 10px 12px; border: 1px solid #d2d2d7; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">CUSTOM CERTIFICATE ID (OPTIONAL)</label>
            <input type="text" id="certCustomId" placeholder="Leave blank to auto-generate" style="width: 100%; padding: 10px 12px; border: 1px solid #d2d2d7; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" />
          </div>
          <div style="margin-top: 10px; display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" id="cancelCertBtn" style="padding: 8px 16px; background: #f5f5f7; border: 1px solid #d2d2d7; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Cancel</button>
            <button type="submit" style="padding: 8px 18px; background: #0066cc; color: #fff; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Issue Credential</button>
          </div>
        </form>
      `;

      document.getElementById("closeCertModal")?.addEventListener("click", () => modal.close());
      document.getElementById("cancelCertBtn")?.addEventListener("click", () => modal.close());

      document.getElementById("issueCertForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const studentName = document.getElementById("certStudentName").value.trim();
        const program = document.getElementById("certProgram").value;
        const grade = document.getElementById("certGrade").value.trim();
        const customId = document.getElementById("certCustomId").value.trim();

        try {
          const payload = { studentName, program, grade };
          if (customId) payload.id = customId;
          const result = await adminApi.createCertificate(payload);
          modal.close();
          alert(`Certificate successfully minted in D1 database!\nID: ${result.certificate.id}`);
          liveState.certificates = [result.certificate, ...(liveState.certificates || [])];
          renderCertificatesTable(liveState.certificates);
          updateMetricCards({ ...liveState.metrics, certsCount: liveState.certificates.length });
        } catch (err) {
          alert("Error creating certificate: " + err.message);
        }
      });

      modal.showModal();
    });
  }

  // =========================================================================
  // LIVE SEARCH
  // =========================================================================
  function bindSearchFilters() {
    const searchInput = document.querySelector("input[type='search'], .admin-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll("table tbody tr").forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? "" : "none";
      });
    });
  }

  // =========================================================================
  // CSV EXPORT
  // =========================================================================
  function bindExportCsv() {
    const exportBtn = document.querySelector(".btn-admin-secondary[onclick*='CSV'], button[onclick*='CSV']");
    if (!exportBtn) return;

    exportBtn.removeAttribute("onclick");
    exportBtn.addEventListener("click", () => {
      let rows = [];
      let filename = "abss-admin-export.csv";

      if (window.location.pathname.includes("leads")) {
        filename = "abss-leads.csv";
        rows = [["Lead ID", "Client Name", "Email", "Phone", "Service", "Budget", "Status", "Date"]];
        (liveState.leads || []).forEach((l) => {
          rows.push([l.id, l.client || l.name, l.email, l.phone, l.service, l.budget, l.status, l.createdAt]);
        });
      } else if (window.location.pathname.includes("applications")) {
        filename = "abss-applications.csv";
        rows = [["Application ID", "Name", "Email", "Track", "College", "Status", "Date"]];
        (liveState.internshipApplications || []).forEach((a) => {
          rows.push([a.id, a.fullName || a.name, a.email, a.internshipProgram, a.college, a.status, a.createdAt]);
        });
      } else if (window.location.pathname.includes("students")) {
        filename = "abss-students.csv";
        rows = [["Student ID", "Name", "Email", "Verified", "Date"]];
        (liveState.students || []).forEach((s) => {
          rows.push([s.id, s.name, s.email, s.emailVerified ? "Yes" : "No", s.createdAt]);
        });
      } else if (window.location.pathname.includes("certificates")) {
        filename = "abss-certificates.csv";
        rows = [["Certificate ID", "Student Name", "Program", "Grade", "Status", "Issue Date"]];
        (liveState.certificates || []).forEach((c) => {
          rows.push([c.id, c.studentName, c.program, c.grade, c.status, c.issueDate]);
        });
      } else {
        filename = "abss-database-summary.csv";
        rows = [
          ["Entity", "Total Real Records in D1"],
          ["Leads", (liveState.leads || []).length],
          ["Internship Applications", (liveState.internshipApplications || []).length],
          ["Enrolled Students", (liveState.students || []).length],
          ["Certificates", (liveState.certificates || []).length],
          ["Projects", (liveState.projects || []).length],
          ["Clients", (liveState.clients || []).length]
        ];
      }

      const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.map((x) => `"${String(x ?? '').replace(/"/g, '""')}"`).join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminEngine);
  } else {
    initAdminEngine();
  }
})();

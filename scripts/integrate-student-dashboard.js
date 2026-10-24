const fs = require("fs");
const path = require("path");
const { DOMAIN_TASKS, AVAILABLE_DOMAINS } = require("./build-domain-tasks.js");

const targetFile = path.resolve(__dirname, "..", "src", "scripts", "student-dashboard.js");
let code = fs.readFileSync(targetFile, "utf8");

// 1. Prepare replacement for top STATE definition up to init()
const startMarker = "  // State\n  const STATE = {";
const endMarker = "  // DOM Init\n  document.addEventListener('DOMContentLoaded', init);";

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find markers in student-dashboard.js!");
  process.exit(1);
}

const newDefinitions = `  // Available domains and their respective 5 curriculum milestones
  const AVAILABLE_DOMAINS = ${JSON.stringify(AVAILABLE_DOMAINS, null, 2)};

  const DOMAIN_TASKS = ${JSON.stringify(DOMAIN_TASKS, null, 2)};

  // State
  const STATE = {
    isAuthenticated: false,
    student: {
      id: 'ABSS-STUDENT',
      name: 'Student Intern',
      email: 'student@abssnexus.in',
      mobile: '',
      college: 'Enrolled University',
      domain: 'Web Development',
      domainSlug: 'web-development',
      joinedDate: 'Active Session',
      validThrough: 'Current Cohort',
      status: 'Active Intern',
      tokens: 0.0,
      referralCredits: 0,
      upiId: '',
      skills: 'Web Development, Programming'
    },
    activePanel: 'overview',
    taskFilter: 'all',
    taskSearch: '',
    availableDomains: AVAILABLE_DOMAINS,
    tasks: JSON.parse(JSON.stringify(DOMAIN_TASKS['web-development'])),
    submissions: [],
    chatMessages: [
      {
        sender: 'ai',
        text: 'Welcome to ABSS Nexus Academy! I am your AI Career Coach. I track your curriculum milestones, assist with code architecture, technical interview preparation, and portfolio reviews. Which milestone are you working on today?',
        time: '10:00 AM'
      }
    ],
    tickets: []
  };

  function switchDomain(domainSlugOrName, suppressToast = false) {
    if (!domainSlugOrName) return;
    const clean = String(domainSlugOrName).trim().toLowerCase();
    const matched = AVAILABLE_DOMAINS.find(
      (d) => d.slug.toLowerCase() === clean ||
             d.name.toLowerCase() === clean ||
             d.id.toLowerCase() === clean ||
             clean.includes(d.slug.toLowerCase()) ||
             clean.includes(d.name.toLowerCase())
    ) || AVAILABLE_DOMAINS[0];

    STATE.student.domain = matched.name;
    STATE.student.domainSlug = matched.slug;
    STATE.student.skills = matched.name + ', Technical Deliverables, ISO Credential Standards';

    const templateTasks = DOMAIN_TASKS[matched.slug] || DOMAIN_TASKS['web-development'];

    try {
      const savedTasks = localStorage.getItem('abss_tasks_' + matched.slug);
      if (savedTasks) {
        STATE.tasks = JSON.parse(savedTasks);
      } else {
        STATE.tasks = JSON.parse(JSON.stringify(templateTasks));
      }
    } catch (e) {
      STATE.tasks = JSON.parse(JSON.stringify(templateTasks));
    }

    try {
      const savedSubs = localStorage.getItem('abss_subs_' + matched.slug);
      if (savedSubs) {
        STATE.submissions = JSON.parse(savedSubs);
      } else {
        STATE.submissions = [];
      }
    } catch (e) {
      STATE.submissions = [];
    }

    try {
      localStorage.setItem('abss_active_domain', matched.slug);
    } catch (e) {}

    renderStudentState();
    renderTasks();
    renderSubmissions();

    if (!suppressToast && typeof showToast === 'function') {
      showToast(\`Switched workspace to \${matched.name}\`);
    }
  }
`;

code = code.slice(0, startIndex) + newDefinitions + "\n\n" + code.slice(endIndex);

// 2. Enhance checkSession to inspect query params and localStorage
const checkSessionOld = `    // Try fetching overview
    try {
      const overviewRes = await fetch('/api/internships/dashboard/overview');
      if (overviewRes.ok) {
        const overviewData = await overviewRes.json();
        if (overviewData && overviewData.applications && overviewData.applications.length > 0) {
          const latest = overviewData.applications[0];
          if (latest.programTitle) STATE.student.domain = latest.programTitle;
        }
      }
    } catch (e) {}`;

const checkSessionNew = `    // Check active domain from URL parameter or saved user preference
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryDomain = urlParams.get('domain') || urlParams.get('track');
      const savedDomain = localStorage.getItem('abss_active_domain');
      if (queryDomain) {
        switchDomain(queryDomain, true);
      } else if (savedDomain) {
        switchDomain(savedDomain, true);
      }
    } catch (e) {}

    // Try fetching overview from server
    try {
      const overviewRes = await fetch('/api/internships/dashboard/overview');
      if (overviewRes.ok) {
        const overviewData = await overviewRes.json();
        if (overviewData && overviewData.applications && overviewData.applications.length > 0) {
          const latest = overviewData.applications[0];
          if (latest.programTitle || latest.programSlug) {
            switchDomain(latest.programSlug || latest.programTitle, true);
          }
        }
      }
    } catch (e) {}`;

if (code.includes(checkSessionOld)) {
  code = code.replace(checkSessionOld, checkSessionNew);
} else {
  console.warn("Could not find exact checkSessionOld string to replace!");
}

// 3. Enhance Workspace Switcher Modal handler
const wsModalOldStart = "    // Workspace switcher modal\n    const wsBtn = document.getElementById('btn-open-workspace-modal');";
const wsModalOldEnd = "    // Instant certificate dialog\n    const instantDialog = document.getElementById('instant-certificate-dialog');";

const wsStartIndex = code.indexOf(wsModalOldStart);
const wsEndIndex = code.indexOf(wsModalOldEnd);

if (wsStartIndex !== -1 && wsEndIndex !== -1) {
  const wsModalNew = `    // Workspace switcher modal with category filtering and instant search
    const wsBtn = document.getElementById('btn-open-workspace-modal');
    const wsModal = document.getElementById('workspace-switcher-modal');
    const wsClose = document.getElementById('ws-modal-close');
    const wsList = document.getElementById('workspace-modal-list');

    if (wsBtn && wsModal) {
      let modalCategoryFilter = 'all';
      let modalSearchQuery = '';

      function renderWorkspaceModalList() {
        if (!wsList) return;

        let filtered = AVAILABLE_DOMAINS;
        if (modalCategoryFilter !== 'all') {
          filtered = filtered.filter(d => d.category === modalCategoryFilter);
        }
        if (modalSearchQuery) {
          const q = modalSearchQuery.toLowerCase();
          filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
        }

        const categories = ['all', 'Engineering & Dev', 'AI & Data', 'Design & Creative', 'Business & Strategy', 'Marketing & Growth'];

        let html = \`
          <div style="margin-bottom: 14px;">
            <input type="text" id="ws-filter-input" placeholder="Search 16+ tracks (e.g. Cyber Security, AI, Android, HR)..." value="\${modalSearchQuery}" style="width: 100%; padding: 10px 14px; border: 1px solid var(--portal-line); border-radius: 10px; background: rgba(0,0,0,0.25); color: #fff; font-size: 13.5px; box-sizing: border-box; outline: none;" />
          </div>
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 12px; scrollbar-width: none;">
            \${categories.map(cat => \`
              <button type="button" class="ws-cat-pill" data-cat="\${cat}" style="padding: 5px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 600; white-space: nowrap; cursor: pointer; border: 1px solid var(--portal-line); \${modalCategoryFilter === cat ? 'background: #0066cc; color: #fff; border-color: #0066cc;' : 'background: rgba(255,255,255,0.06); color: var(--portal-muted);'}">
                \${cat === 'all' ? 'All Tracks (16+)' : cat}
              </button>
            \`).join('')}
          </div>
          <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
            \${filtered.length === 0 ? '<div style="text-align: center; color: var(--portal-muted); padding: 24px;">No matching internship tracks found.</div>' : ''}
            \${filtered.map(d => \`
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--portal-line); border-radius: 12px; cursor: pointer; transition: all 0.2s ease;" data-switch-domain="\${d.slug}">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 22px;">\${d.icon}</span>
                  <div>
                    <strong style="color: #fff; font-size: 13.5px; display: block;">\${d.name}</strong>
                    <div style="font-size: 11.5px; color: var(--portal-muted);">\${d.category} &bull; \${d.count} Milestones</div>
                  </div>
                </div>
                <span class="state-badge \${d.name === STATE.student.domain || d.slug === STATE.student.domainSlug ? 'state-badge-active' : 'state-badge-neutral'}">
                  \${d.name === STATE.student.domain || d.slug === STATE.student.domainSlug ? 'Active' : 'Switch'}
                </span>
              </div>
            \`).join('')}
          </div>
        \`;

        wsList.innerHTML = html;

        // Search input binding
        const searchInput = wsList.querySelector('#ws-filter-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.setSelectionRange(modalSearchQuery.length, modalSearchQuery.length);
          searchInput.addEventListener('input', (e) => {
            modalSearchQuery = e.target.value;
            renderWorkspaceModalList();
          });
        }

        // Category pill binding
        wsList.querySelectorAll('.ws-cat-pill').forEach(btn => {
          btn.addEventListener('click', () => {
            modalCategoryFilter = btn.dataset.cat;
            renderWorkspaceModalList();
          });
        });

        // Item selection binding
        wsList.querySelectorAll('[data-switch-domain]').forEach(item => {
          item.addEventListener('click', () => {
            const slug = item.dataset.switchDomain;
            switchDomain(slug);
            wsModal.setAttribute('hidden', 'true');
          });
        });
      }

      wsBtn.addEventListener('click', () => {
        renderWorkspaceModalList();
        wsModal.removeAttribute('hidden');
      });
    }

    if (wsClose && wsModal) {
      wsClose.addEventListener('click', () => wsModal.setAttribute('hidden', 'true'));
      wsModal.addEventListener('click', (e) => {
        if (e.target === wsModal) wsModal.setAttribute('hidden', 'true');
      });
    }

`;

  code = code.slice(0, wsStartIndex) + wsModalNew + code.slice(wsEndIndex);
} else {
  console.warn("Could not find wsModal markers!");
}

// 4. Save progress on submission
const subSaveOld = `        renderTasks();
        renderSubmissions();
        renderStudentState();`;

const subSaveNew = `        try {
          localStorage.setItem('abss_tasks_' + STATE.student.domainSlug, JSON.stringify(STATE.tasks));
          localStorage.setItem('abss_subs_' + STATE.student.domainSlug, JSON.stringify(STATE.submissions));
        } catch (e) {}

        renderTasks();
        renderSubmissions();
        renderStudentState();`;

if (code.includes(subSaveOld)) {
  code = code.replace(subSaveOld, subSaveNew);
}

fs.writeFileSync(targetFile, code, "utf8");
console.log("Successfully updated student-dashboard.js with full 16+ tracks and dynamic domain task switching!");

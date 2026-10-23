/**
 * ABSS NEXUS ACADEMY — STUDENT WORKSPACE DASHBOARD CONTROLLER
 * Ultra-Responsive Single Page Application Architecture
 * Fully Interactive: AI Career Coach, Resume Builder, Tasks, Digital ID, Certificates, Refer & Earn
 */

(function () {
  'use strict';

  // State
  const STATE = {
    isAuthenticated: false,
    student: {
      id: 'ABSS-STUDENT',
      name: 'Student Intern',
      email: 'student@abssnexus.in',
      mobile: '',
      college: 'Enrolled University',
      domain: 'Web Engineering Track',
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
    tasks: [
      {
        id: 'TASK-1',
        name: 'Milestone 1: Responsive Landing Page & Design System',
        desc: 'Build a production-grade responsive landing page showcasing CSS Grid, Flexbox, semantic markup, and mobile-first layout principles.',
        status: 'approved',
        grade: 'A+ (98/100)',
        submittedDate: '18 Jan 2026',
        proofUrl: 'https://github.com/aaravsharma/nexus-landing-page',
        feedback: 'Exceptional visual polish, accessible contrast ratios, and clean semantic structure. Approved for production milestone credit.',
        time: '4–6 hrs',
        difficulty: 'Beginner-Friendly',
        steps: [
          'Scaffold semantic HTML5 document structure with accessibility landmark roles',
          'Create modern responsive CSS layout using custom properties and fluid typography',
          'Ensure 100% Mobile responsiveness across 320px to 1440px viewports',
          'Deploy code to GitHub and host live demo via Netlify or Vercel'
        ]
      },
      {
        id: 'TASK-2',
        name: 'Milestone 2: RESTful API Integration & Client State',
        desc: 'Implement dynamic asynchronous data fetching, error handling states, local storage persistence, and component lifecycle events.',
        status: 'in-progress',
        grade: 'Under Review',
        submittedDate: '22 Jan 2026',
        proofUrl: 'https://github.com/aaravsharma/nexus-client-portal',
        feedback: 'Submission received. Mentor review is scheduled within 24 hours.',
        time: '8–10 hrs',
        difficulty: 'Intermediate',
        steps: [
          'Design client state store for user authentication and cohort milestones',
          'Integrate Fetch/Axios API with loading skeletons and graceful error boundaries',
          'Implement optimistic UI updates for interactive dashboard widgets',
          'Document API contracts and endpoints in repository README'
        ]
      },
      {
        id: 'TASK-3',
        name: 'Milestone 3: Database Models & Secure Backend Endpoints',
        desc: 'Create scalable database schemas, JWT token validation, rate-limiting middlewares, and unit testing suites.',
        status: 'pending',
        grade: 'Not Submitted',
        submittedDate: '--',
        proofUrl: '',
        feedback: 'Unlocked upon approval of Milestone 2.',
        time: '12–14 hrs',
        difficulty: 'Advanced',
        steps: [
          'Create relational or document database schema with normalized foreign keys',
          'Implement PBKDF2 or bcrypt password hashing and tokenized auth headers',
          'Build input sanitization and parameter validation pipelines',
          'Write automated HTTP endpoint tests'
        ]
      },
      {
        id: 'TASK-4',
        name: 'Milestone 4: Cloud Functions, Webhooks & Automated CI/CD',
        desc: 'Deploy serverless edge functions, configure GitHub Actions automated pipelines, and manage production environment secrets.',
        status: 'pending',
        grade: 'Not Submitted',
        submittedDate: '--',
        proofUrl: '',
        feedback: 'Locked. Pending earlier milestones.',
        time: '10–12 hrs',
        difficulty: 'Advanced',
        steps: [
          'Configure serverless function endpoints on Cloudflare Pages or AWS Lambda',
          'Setup automated GitHub Actions CI pipeline to run linting and tests on pull request',
          'Implement webhook listeners for payment confirmation and verification events'
        ]
      },
      {
        id: 'TASK-5',
        name: 'Milestone 5: Capstone Deployment & Technical Viva',
        desc: 'Final full-stack production deployment, performance lighthouse audit > 90, peer review, and technical demonstration video.',
        status: 'pending',
        grade: 'Not Submitted',
        submittedDate: '--',
        proofUrl: '',
        feedback: 'Locked. Final milestone.',
        time: '14–16 hrs',
        difficulty: 'Capstone',
        steps: [
          'Full production deployment on custom domain with SSL & security headers',
          'Complete Core Web Vitals audit (LCP < 2.5s, INP < 200ms, CLS < 0.1)',
          'Record 3-minute Loom/YouTube project walkthrough demonstration',
          'Submit capstone project link for final ISO certificate verification'
        ]
      }
    ],
    submissions: [
      {
        task: 'Milestone 1: Responsive Landing Page',
        status: 'Approved',
        feedback: 'Mastery of responsive typography and mobile navigation confirmed.',
        date: '18 Jan 2026',
        url: 'https://github.com/aaravsharma/nexus-landing-page'
      },
      {
        task: 'Milestone 2: RESTful API Integration',
        status: 'Under Review',
        feedback: 'Awaiting mentor evaluation. Status will update automatically.',
        date: '22 Jan 2026',
        url: 'https://github.com/aaravsharma/nexus-client-portal'
      }
    ],
    chatMessages: [
      {
        sender: 'ai',
        text: 'Hello Aarav! I am your ABSS Nexus AI Career Coach. I track your Full-Stack Web Engineering milestones and can help you optimize your code, prepare for technical interviews, improve your resume, or plan your next career step. What are you working on today?',
        time: '10:00 AM'
      }
    ],
    tickets: [
      {
        id: 'TCK-1092',
        subject: 'Query regarding Milestone 3 Database Schema Guidelines',
        status: 'Answered',
        date: '21 Jan 2026',
        messages: [
          { sender: 'Student', text: 'Should I use Cloudflare D1 SQL or MongoDB for Milestone 3 backend task?', time: '21 Jan 14:30' },
          { sender: 'Senior Mentor', text: 'Both are acceptable! For production edge apps we recommend Cloudflare D1 SQL, but MongoDB Atlas is also accepted if you prefer document models.', time: '21 Jan 15:45' }
        ]
      }
    ],
    availableDomains: [
      { id: 'web-dev', name: 'Full-Stack Web Engineering', icon: '💻', count: 5 },
      { id: 'ai-ml', name: 'AI & Machine Learning Engineering', icon: '🤖', count: 5 },
      { id: 'cloud-devops', name: 'Cloud Computing & DevOps Architecture', icon: '☁️', count: 5 },
      { id: 'ui-ux', name: 'UI/UX Product Design', icon: '🎨', count: 5 },
      { id: 'cybersecurity', name: 'Cybersecurity & Ethical Hacking', icon: '🛡️', count: 5 }
    ]
  };

  // DOM Init
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupEventListeners();
    await checkSession();
    renderStudentState();
    renderTasks();
    renderSubmissions();
    renderChatMessages();
    renderTickets();
    setupModals();
    handleUrlPanel();
    hideLoading();
  }

  function hideLoading() {
    const loader = document.getElementById('dashboard-loading');
    if (loader) {
      loader.setAttribute('hidden', 'true');
    }
  }

  // Session & Data Sync
  async function checkSession() {
    try {
      const res = await fetch('/api/internships/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data && data.student) {
          STATE.isAuthenticated = true;
          STATE.student.name = data.student.name || STATE.student.name;
          STATE.student.email = data.student.email || STATE.student.email;
          STATE.student.id = 'ABSS-' + (data.student.id || '2026-WD-8421').slice(-8).toUpperCase();
        }
      }
    } catch (e) {
      // Graceful offline/demo fallback
      console.log('Running in client state mode.');
    }

    // Try fetching overview
    try {
      const overviewRes = await fetch('/api/internships/dashboard/overview');
      if (overviewRes.ok) {
        const overviewData = await overviewRes.json();
        if (overviewData && overviewData.applications && overviewData.applications.length > 0) {
          const latest = overviewData.applications[0];
          if (latest.programTitle) STATE.student.domain = latest.programTitle;
        }
      }
    } catch (e) {}
  }

  function renderStudentState() {
    // Topbar & Sidebar
    const initials = getInitials(STATE.student.name);
    setText('sidebar-name', STATE.student.name);
    setText('sidebar-domain', STATE.student.domain);
    setText('sidebar-avatar', initials);
    setText('topbar-avatar', initials);
    setText('current-workspace-name', STATE.student.domain);
    setText('sidebar-id', STATE.student.id);

    // Tokens & Credits
    setText('top-token-balance', STATE.student.tokens.toFixed(1));
    setText('wallet-total', STATE.student.tokens.toFixed(1));
    setText('wallet-free', '2.0');
    setText('wallet-purchased', (STATE.student.tokens - 2.0 > 0 ? (STATE.student.tokens - 2.0).toFixed(1) : '0.0'));
    setText('referral-available-credits', '₹' + STATE.student.referralCredits);
    setText('referral-total-credits', '₹' + STATE.student.referralCredits);
    setText('overview-referral-earned', STATE.student.referralCredits);

    // Digital ID
    setText('id-avatar', initials);
    setText('id-name', STATE.student.name);
    setText('id-domain', STATE.student.domain);
    setText('id-number', STATE.student.id);
    setText('id-joined', STATE.student.joinedDate);
    setText('id-status', STATE.student.status);
    setText('id-valid-through', STATE.student.validThrough);

    // Profile Settings Form
    setValue('settings-name-input', STATE.student.name);
    setText('settings-email', STATE.student.email);
    setText('settings-mobile', STATE.student.mobile);
    setValue('settings-college', STATE.student.college);
    setValue('settings-skills', STATE.student.skills);
    setValue('career-skills', STATE.student.skills);
    setValue('upi-id', STATE.student.upiId);

    // Generate dynamic QR Code for ID card
    renderQrCode();

    // Stats calculations
    const approved = STATE.tasks.filter((t) => t.status === 'approved').length;
    const underReview = STATE.tasks.filter((t) => t.status === 'in-progress').length;
    const remaining = STATE.tasks.length - approved;
    const pct = Math.round((approved / STATE.tasks.length) * 100);

    setText('stat-approved', approved);
    setText('stat-approved-detail', `of ${STATE.tasks.length} milestones`);
    setText('stat-review', underReview);
    setText('stat-remaining', remaining);
    setText('stat-end-date', STATE.student.validThrough);
    setText('roadmap-progress', pct + '%');

    // Populate Task Select Dropdown in Submission form
    const taskSelect = document.getElementById('submission-task');
    if (taskSelect) {
      taskSelect.innerHTML = STATE.tasks
        .map((t) => `<option value="${t.id}">${t.name} (${t.status.toUpperCase()})</option>`)
        .join('');
    }

    // Set referral link
    const refLink = `${window.location.origin}/internships/register?ref=${STATE.student.id}`;
    setText('overview-referral-link', refLink);
    setValue('referral-link', refLink);
  }

  function renderQrCode() {
    const qrContainer = document.getElementById('digital-id-qr');
    if (!qrContainer) return;
    const verifyUrl = `${window.location.origin}/verify-certificate?id=${STATE.student.id}`;
    // Generate clean SVG QR-style data placeholder or canvas
    qrContainer.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%" shape-rendering="crispEdges">
        <rect width="100" height="100" fill="#ffffff" />
        <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M20,20 h10 v10 h-10 z" fill="#061129" />
        <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M70,20 h10 v10 h-10 z" fill="#061129" />
        <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M20,70 h10 v10 h-10 z" fill="#061129" />
        <rect x="50" y="20" width="5" height="10" fill="#061129" />
        <rect x="65" y="55" width="20" height="8" fill="#061129" />
        <rect x="55" y="70" width="10" height="15" fill="#061129" />
        <rect x="75" y="75" width="15" height="15" fill="#061129" />
      </svg>
    `;
  }

  // Navigation Panel Switching
  function switchPanel(panelId) {
    if (!panelId) return;
    STATE.activePanel = panelId;

    // Update Sidebar & Bottom Nav active states
    document.querySelectorAll('[data-panel-target]').forEach((btn) => {
      const match = btn.dataset.panelTarget === panelId;
      btn.classList.toggle('is-active', match);
      if (match) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });

    // Update Views
    document.querySelectorAll('.portal-view').forEach((view) => {
      view.classList.remove('is-active');
    });

    const targetView = document.getElementById(`panel-${panelId}`);
    if (targetView) {
      targetView.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Topbar page title
    const titles = {
      overview: 'Student Workspace Overview',
      roadmap: 'Curriculum & Task Roadmap',
      submit: 'Submit Project Deliverable',
      'id-card': 'Digital Student ID',
      certificate: 'ISO Certificate & Evaluation',
      referrals: 'Refer & Earn Rewards',
      career: 'AI Career Coach',
      'career-plan': '30-Day Career Action Plan',
      resume: 'Interactive Resume Builder',
      interview: 'Mock Technical Interview',
      opportunities: 'Matched Remote Opportunities',
      wallet: 'Career AI Tokens',
      support: 'Mentor Support Desk',
      settings: 'Student Profile & Settings'
    };
    setText('page-title', titles[panelId] || 'Student Workspace');

    // Update history URL quietly
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('panel', panelId);
    window.history.replaceState({}, '', newUrl);
  }

  function handleUrlPanel() {
    const params = new URLSearchParams(window.location.search);
    const panel = params.get('panel');
    if (panel) {
      switchPanel(panel);
    }
  }

  // Tasks List Rendering
  function renderTasks() {
    const list = document.getElementById('task-list');
    if (!list) return;

    let filtered = STATE.tasks;
    if (STATE.taskFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === STATE.taskFilter);
    }
    if (STATE.taskSearch) {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(STATE.taskSearch) ||
        t.desc.toLowerCase().includes(STATE.taskSearch)
      );
    }

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--portal-muted);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h3>No milestones found matching criteria</h3>
          <p>Try switching filters or clearing your search phrase.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered
      .map((task) => {
        const badgeClass =
          task.status === 'approved'
            ? 'state-badge-success'
            : task.status === 'in-progress'
            ? 'state-badge-active'
            : 'state-badge-neutral';
        const badgeText =
          task.status === 'approved'
            ? 'Approved ✓'
            : task.status === 'in-progress'
            ? 'In Progress ⏳'
            : 'Pending 🔒';

        const actionBtn =
          task.status === 'approved'
            ? `<span style="color: var(--portal-teal); font-weight: 700; font-size: 13px;">✓ Approved (${task.grade})</span>`
            : task.status === 'in-progress'
            ? `<button class="portal-button portal-button-secondary" data-submit-task="${task.id}" type="button">Resubmit Proof</button>`
            : `<button class="portal-button portal-button-primary" data-submit-task="${task.id}" type="button">Start &amp; Submit</button>`;

        return `
          <article class="task-card">
            <div class="task-card-header">
              <div class="task-card-title-group">
                <span class="portal-eyebrow">${task.id} &bull; ${task.difficulty} &bull; Est. ${task.time}</span>
                <h3>${task.name}</h3>
              </div>
              <span class="state-badge ${badgeClass}">${badgeText}</span>
            </div>
            <p class="task-card-desc">${task.desc}</p>
            <ul class="task-steps-list">
              ${task.steps
                .map(
                  (step) => `
                <li>
                  <span class="task-step-check ${task.status === 'approved' ? 'is-completed' : ''}">${task.status === 'approved' ? '✓' : '•'}</span>
                  <span>${step}</span>
                </li>
              `
                )
                .join('')}
            </ul>
            <div class="task-card-footer">
              <div>
                <strong>Mentor Feedback: </strong>
                <span>${task.feedback}</span>
              </div>
              <div>${actionBtn}</div>
            </div>
          </article>
        `;
      })
      .join('');

    // Bind task card submit buttons
    list.querySelectorAll('[data-submit-task]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const taskId = btn.dataset.submitTask;
        const select = document.getElementById('submission-task');
        if (select) select.value = taskId;
        switchPanel('submit');
      });
    });
  }

  // Submissions Rendering
  function renderSubmissions() {
    const tbody = document.getElementById('submission-history');
    if (!tbody) return;

    if (STATE.submissions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--portal-muted); padding: 24px;">No submissions yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = STATE.submissions
      .map((s) => {
        const isApproved = s.status === 'Approved';
        const badge = isApproved ? 'state-badge-success' : 'state-badge-active';
        return `
          <tr>
            <td><strong>${s.task}</strong></td>
            <td><span class="state-badge ${badge}">${s.status}</span></td>
            <td style="color: var(--portal-muted); max-width: 300px;">${s.feedback}</td>
            <td style="font-family: var(--font-mono); font-size: 12px;">${s.date}</td>
            <td><a href="${s.url}" target="_blank" rel="noopener noreferrer" style="color: var(--portal-cyan); text-decoration: underline; font-weight: 600;">View Proof &rarr;</a></td>
          </tr>
        `;
      })
      .join('');
  }

  // Chat Messages Rendering
  function renderChatMessages() {
    const container = document.getElementById('career-coach-messages');
    if (!container) return;

    container.innerHTML = STATE.chatMessages
      .map(
        (m) => `
        <div class="coach-msg coach-msg-${m.sender}">
          <div class="coach-msg-bubble">
            ${m.text}
            <div style="font-size: 10px; opacity: 0.6; margin-top: 6px; text-align: right;">${m.time}</div>
          </div>
        </div>
      `
      )
      .join('');

    container.scrollTop = container.scrollHeight;
  }

  // Tickets Rendering
  function renderTickets() {
    const list = document.getElementById('ticket-list');
    if (!list) return;

    list.innerHTML = STATE.tickets
      .map(
        (t) => `
        <div style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--portal-line-subtle); border-radius: 12px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="portal-eyebrow">${t.id} &bull; ${t.date}</span>
            <span class="state-badge state-badge-success">${t.status}</span>
          </div>
          <h4 style="margin: 0 0 10px; color: #fff; font-size: 15px;">${t.subject}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            ${t.messages
              .map(
                (m) => `
              <div style="padding: 8px 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <strong style="color: var(--portal-cyan);">${m.sender}: </strong>
                <span style="color: var(--portal-muted);">${m.text}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // Event Listeners
  function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('[data-panel-target]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchPanel(btn.dataset.panelTarget);
      });
    });

    // Task Filter Buttons
    document.querySelectorAll('[data-task-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-task-filter]').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        STATE.taskFilter = btn.dataset.taskFilter;
        renderTasks();
      });
    });

    // Task Search
    const searchInput = document.getElementById('task-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        STATE.taskSearch = e.target.value.toLowerCase().trim();
        renderTasks();
      });
    }

    // Refresh Dashboard
    const refreshBtn = document.getElementById('refresh-dashboard');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        showToast('Workspace telemetry refreshed');
        renderStudentState();
        renderTasks();
      });
    }

    // Logout
    const logoutBtn = document.getElementById('db-btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await fetch('/api/internships/auth/logout', { method: 'POST' });
        } catch (e) {}
        window.location.href = '/internships/login';
      });
    }

    // Submission Form
    const subForm = document.getElementById('submission-form');
    if (subForm) {
      subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskId = getValue('submission-task');
        const proofUrl = getValue('submission-proof');
        const msgEl = document.getElementById('submission-form-message');

        if (!proofUrl || !proofUrl.startsWith('http')) {
          if (msgEl) msgEl.textContent = 'Please enter a valid HTTP/HTTPS project URL.';
          return;
        }

        const task = STATE.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = 'in-progress';
          task.proofUrl = proofUrl;
          task.submittedDate = 'Just now';
          task.feedback = 'Project deliverable received! Mentor review assigned.';
        }

        STATE.submissions.unshift({
          task: task ? task.name : 'Custom Deliverable',
          status: 'Under Review',
          feedback: 'Deliverable submitted. Evaluation will be finalized shortly.',
          date: 'Just now',
          url: proofUrl
        });

        renderTasks();
        renderSubmissions();
        renderStudentState();
        subForm.reset();
        showToast('Milestone submitted successfully!');
        if (msgEl) msgEl.textContent = 'Submission recorded successfully!';
      });
    }

    // AI Career Coach Prompt Starters
    document.querySelectorAll('[data-coach-prompt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prompt = btn.dataset.coachPrompt;
        sendChatMessage(prompt);
      });
    });

    // AI Career Coach Composer Form
    const coachForm = document.getElementById('career-coach-form');
    if (coachForm) {
      coachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('career-coach-input');
        if (input && input.value.trim()) {
          sendChatMessage(input.value.trim());
          input.value = '';
        }
      });
    }

    // Career 30-Day Plan Assessment
    const planForm = document.getElementById('career-assessment-form');
    if (planForm) {
      planForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateCareerPlan();
      });
    }

    // Resume Save Draft
    const resumeForm = document.getElementById('career-profile-form');
    if (resumeForm) {
      resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Resume draft saved successfully!');
      });
    }

    // Resume Print
    const printBtn = document.getElementById('career-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Interview Practice Form
    const interviewForm = document.getElementById('interview-start-form');
    if (interviewForm) {
      interviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        startInterviewPractice();
      });
    }

    // Referrals UPI Form
    const upiForm = document.getElementById('upi-form');
    if (upiForm) {
      upiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const upi = getValue('upi-id');
        STATE.student.upiId = upi;
        showToast('UPI ID saved! Payout link activated.');
        const msg = document.getElementById('upi-message');
        if (msg) msg.textContent = 'UPI ID saved successfully!';
        const linkCard = document.getElementById('referral-link-card');
        if (linkCard) linkCard.removeAttribute('hidden');
      });
    }

    // Copy Referral Link
    const copyRefBtn = document.getElementById('copy-referral-link');
    if (copyRefBtn) {
      copyRefBtn.addEventListener('click', () => {
        const link = getValue('referral-link');
        navigator.clipboard.writeText(link).then(() => {
          showToast('Referral link copied to clipboard!');
        });
      });
    }

    const overviewCopyBtn = document.getElementById('overview-copy-referral');
    if (overviewCopyBtn) {
      overviewCopyBtn.addEventListener('click', () => {
        const link = getValue('referral-link');
        navigator.clipboard.writeText(link).then(() => {
          showToast('Referral link copied!');
        });
      });
    }

    // Support Ticket Form
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = getValue('ticket-subject');
        const message = getValue('ticket-message');
        if (!subject || !message) return;

        STATE.tickets.unshift({
          id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
          subject,
          status: 'Open',
          date: 'Just now',
          messages: [{ sender: 'Student', text: message, time: 'Just now' }]
        });

        renderTickets();
        ticketForm.reset();
        showToast('Support ticket created. A mentor will respond soon.');
      });
    }

    // Settings Profile Form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        STATE.student.name = getValue('settings-name-input') || STATE.student.name;
        STATE.student.college = getValue('settings-college') || STATE.student.college;
        STATE.student.skills = getValue('settings-skills') || STATE.student.skills;
        renderStudentState();
        showToast('Profile information saved successfully!');
      });
    }

    // State CTA buttons
    const stateAction = document.getElementById('state-action');
    if (stateAction) {
      stateAction.addEventListener('click', () => switchPanel('roadmap'));
    }

    const nextTaskAction = document.getElementById('next-task-action');
    if (nextTaskAction) {
      nextTaskAction.addEventListener('click', () => switchPanel('submit'));
    }

    // Offer Letter Download Simulation
    const dlOffer = document.getElementById('download-offer');
    if (dlOffer) {
      dlOffer.addEventListener('click', () => {
        downloadDocument('ABSS_Nexus_Offer_Letter.pdf', 'Offer Letter Generated and Downloaded!');
      });
    }

    const dlCert = document.getElementById('download-certificate');
    if (dlCert) {
      dlCert.addEventListener('click', () => {
        downloadDocument('ABSS_Nexus_ISO_Certificate.pdf', 'ISO Certificate Downloaded!');
      });
    }

    // LinkedIn Share Action
    document.querySelectorAll('[data-linkedin-share]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.linkedinShare;
        const text =
          type === 'offer'
            ? `I am thrilled to announce that I have joined ABSS Nexus Academy as a ${STATE.student.domain} Intern! Excited to build high-performance web systems and learn from industry mentors. #ABSSNexus #Engineering #Internship`
            : `Proud to receive my ISO-certified Internship Completion Credential in ${STATE.student.domain} from ABSS Nexus Academy! Check my verified portfolio credentials here: ${window.location.origin}/verify-certificate?id=${STATE.student.id} #Certified #Developer`;

        navigator.clipboard.writeText(text).then(() => {
          showToast('LinkedIn post text copied! Opening LinkedIn...');
          window.open('https://www.linkedin.com/feed/', '_blank');
        });
      });
    });
  }

  // Modals setup
  function setupModals() {
    // Workspace switcher modal
    const wsBtn = document.getElementById('btn-open-workspace-modal');
    const wsModal = document.getElementById('workspace-switcher-modal');
    const wsClose = document.getElementById('ws-modal-close');
    const wsList = document.getElementById('workspace-modal-list');

    if (wsBtn && wsModal) {
      wsBtn.addEventListener('click', () => {
        if (wsList) {
          wsList.innerHTML = STATE.availableDomains
            .map(
              (d) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; margin-bottom: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--portal-line); border-radius: 12px; cursor: pointer;" data-switch-domain="${d.name}">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 22px;">${d.icon}</span>
                <div>
                  <strong style="color: #fff; font-size: 14px;">${d.name}</strong>
                  <div style="font-size: 12px; color: var(--portal-muted);">${d.count} Milestones &bull; ISO-Aligned</div>
                </div>
              </div>
              <span class="state-badge ${d.name === STATE.student.domain ? 'state-badge-active' : 'state-badge-neutral'}">${d.name === STATE.student.domain ? 'Active' : 'Switch'}</span>
            </div>
          `
            )
            .join('');

          wsList.querySelectorAll('[data-switch-domain]').forEach((item) => {
            item.addEventListener('click', () => {
              const domName = item.dataset.switchDomain;
              STATE.student.domain = domName;
              renderStudentState();
              wsModal.setAttribute('hidden', 'true');
              showToast(`Switched workspace to ${domName}`);
            });
          });
        }
        wsModal.removeAttribute('hidden');
      });
    }

    if (wsClose && wsModal) {
      wsClose.addEventListener('click', () => wsModal.setAttribute('hidden', 'true'));
      wsModal.addEventListener('click', (e) => {
        if (e.target === wsModal) wsModal.setAttribute('hidden', 'true');
      });
    }

    // Instant certificate dialog
    const instantDialog = document.getElementById('instant-certificate-dialog');
    document.querySelectorAll('[data-open-instant-certificate]').forEach((b) => {
      b.addEventListener('click', () => {
        if (instantDialog) instantDialog.removeAttribute('hidden');
      });
    });
  }

  // AI Career Coach Interaction
  function sendChatMessage(text) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    STATE.chatMessages.push({ sender: 'user', text, time: timeNow });
    renderChatMessages();

    // Deduct simulated token cost
    if (STATE.student.tokens >= 0.2) {
      STATE.student.tokens = Math.max(0, STATE.student.tokens - 0.2);
      setText('top-token-balance', STATE.student.tokens.toFixed(1));
    }

    // Dynamic AI response simulation based on user intent
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('next') || lower.includes('focus') || lower.includes('task')) {
        aiReply = `Based on your telemetry, you have completed Milestone 1 with an A+! Your immediate next focus should be **Milestone 2: RESTful API Integration & Client State**. Make sure to write comprehensive error handling for failed network requests and test on slow 3G networks.`;
      } else if (lower.includes('skill') || lower.includes('learn')) {
        aiReply = `For ${STATE.student.domain}, the top 3 high-impact skills employers are seeking right now are: **1) TypeScript with React 19**, **2) Cloudflare Workers / Edge Serverless**, and **3) Automated Vitest / Playwright End-to-End Testing**. Mastering these will set you apart from 90% of applicants!`;
      } else if (lower.includes('resume') || lower.includes('portfolio')) {
        aiReply = `To make your resume standout to engineering leads: Quantify your results in your project bullet points. For example: *"Engineered asynchronous API caching layer, reducing page load latency by 45% and eliminating redundant network fetches."* You can preview and edit your draft right now in our **Resume Builder** tab!`;
      } else if (lower.includes('interview')) {
        aiReply = `For technical frontend/full-stack interviews, prioritize practicing: **1) JavaScript Closures & Event Loop**, **2) Optimizing Core Web Vitals (LCP, INP, CLS)**, and **3) System design for a live search autocomplete component**. Check out our **Interview Practice** tab for 5 real-world questions!`;
      } else {
        aiReply = `Great question regarding ${STATE.student.domain}! When tackling this in production, focus on modular architecture, accessible semantic UI, and clean documentation. Would you like specific code examples or a step-by-step checklist?`;
      }

      STATE.chatMessages.push({ sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      renderChatMessages();
    }, 600);
  }

  // Career 30-Day Plan Generation
  function generateCareerPlan() {
    const resultsContainer = document.getElementById('career-results');
    if (!resultsContainer) return;

    resultsContainer.removeAttribute('hidden');
    resultsContainer.innerHTML = `
      <div style="padding: 24px; background: rgba(0, 119, 255, 0.12); border: 1px solid var(--portal-line); border-radius: 16px; margin-bottom: 24px;">
        <span class="portal-eyebrow">Personalized 30-Day Action Roadmap</span>
        <h3 style="margin: 4px 0 16px; color: #fff; font-size: 20px;">Your Tailored Engineering Growth Plan</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-cyan);">Week 1: Foundations & Architecture</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Master state flow, complete Milestone 2 API integration, and audit Core Web Vitals metrics.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-teal);">Week 2: Backend & Database Schema</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Implement normalized relational D1 SQL tables, write JWT auth guard middlewares.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-purple);">Week 3: Production CI/CD & Cloud</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Scaffold GitHub Actions workflow, automate pull-request preview builds and security linting.</p>
          </div>
          <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px;">
            <strong style="color: var(--portal-amber);">Week 4: Capstone, Resume & Viva</strong>
            <p style="margin: 6px 0 0; font-size: 13px; color: var(--portal-muted);">Finalize public portfolio URL, complete technical viva interview, claim ISO certificate.</p>
          </div>
        </div>
      </div>
    `;
    showToast('30-Day Career Plan generated!');
  }

  // Interview Practice Questions
  function startInterviewPractice() {
    const qContainer = document.getElementById('interview-questions');
    const form = document.getElementById('interview-answer-form');
    if (!qContainer || !form) return;

    const role = getValue('interview-role') || 'Full-Stack Developer';
    const questions = [
      `1. Explain how the JavaScript Event Loop handles Promises (Microtasks) versus setTimeout (Macrotasks).`,
      `2. What strategies do you use to diagnose and fix a slow Largest Contentful Paint (LCP) in modern web applications?`,
      `3. How do you prevent SQL Injection and Cross-Site Scripting (XSS) in serverless RESTful endpoints?`,
      `4. Describe your approach to managing relational state versus caching in distributed edge environments.`,
      `5. Walk me through a challenging bug you diagnosed in a web project and how you verified the fix.`
    ];

    qContainer.innerHTML = questions
      .map(
        (q, idx) => `
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 700; color: #fff; margin-bottom: 8px;">${q}</label>
          <textarea rows="3" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--portal-line); border-radius: 10px; color: #fff;" placeholder="Type your structured technical answer here..."></textarea>
        </div>
      `
      )
      .join('');

    form.removeAttribute('hidden');
    showToast(`Interview loaded for ${role}. Type your answers to receive mentor evaluation!`);
  }

  // Document download helper
  function downloadDocument(filename, msg) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('ABSS NEXUS ACADEMY OFFICIAL DOCUMENT - ' + filename));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(msg);
  }

  // Toast System
  function showToast(message) {
    let toast = document.getElementById('portal-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portal-toast';
      toast.className = 'portal-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.removeAttribute('hidden');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      toast.setAttribute('hidden', 'true');
    }, 3200);
  }

  // Utilities
  function getInitials(name) {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
})();

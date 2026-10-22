const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

function renderStudentNav(activeTab) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", href: "/student/dashboard", icon: "📊" },
    { id: "profile", label: "Profile", href: "/student/profile", icon: "👤" },
    { id: "applications", label: "My Applications", href: "/student/applications", icon: "📝" },
    { id: "internship", label: "My Track", href: "/student/internship", icon: "🎓" },
    { id: "tasks", label: "Task List", href: "/student/tasks", icon: "📋" },
    { id: "submissions", label: "Work Submissions", href: "/student/submissions", icon: "📤" },
    { id: "submit-work", label: "Submit Work", href: "/student/submit-work", icon: "🚀" },
    { id: "certificates", label: "Certificates", href: "/student/certificates", icon: "🏆" },
    { id: "settings", label: "Settings", href: "/student/settings", icon: "⚙️" }
  ];

  return `
    <nav class="student-tabs-nav" style="display: flex; gap: 8px; overflow-x: auto; padding: 12px 0; border-bottom: 1px solid #d2d2d7; margin-bottom: 28px;">
      ${tabs.map(t => `
        <a href="${t.href}" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; font-size: 0.88rem; font-weight: 600; text-decoration: none; white-space: nowrap; transition: all 0.2s ease; ${activeTab === t.id ? 'background: #0066cc; color: #ffffff;' : 'background: #ffffff; color: #1d1d1f; border: 1px solid #d2d2d7;'}">
          <span>${t.icon}</span>
          <span>${t.label}</span>
        </a>
      `).join("")}
    </nav>
  `;
}

function generateStudentPage({ filename, title, activeTab, pageHeading, pageEyebrow, contentHtml }) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${title} | ABSS Nexus Student Portal</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
  </head>
  <body style="background: #F5F5F7; min-height: 100vh; display: flex; flex-direction: column;">
    <!-- Top Student Header Bar -->
    <header style="background: #FFFFFF; border-bottom: 1px solid #D2D2D7; padding: 14px 0; position: sticky; top: 0; z-index: 100;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
            <img src="/public/assets/images/favicon.png" alt="ABSS Nexus Logo" width="32" height="32" style="height: 32px; width: 32px;" />
            <strong style="font-size: 1.05rem; color: #1D1D1F; font-family: 'Space Grotesk', sans-serif;">ABSS Nexus Student Portal</strong>
          </a>
          <span style="background: rgba(0, 102, 204, 0.08); color: #0066CC; padding: 4px 10px; border-radius: 999px; font-size: 0.76rem; font-weight: 700;">Full-Stack Web Engineering</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div id="studentAvatarInitials" style="width: 32px; height: 32px; border-radius: 50%; background: #0066cc; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">ST</div>
            <span id="studentDisplayName" style="font-size: 0.88rem; font-weight: 600; color: #1d1d1f;">Intern Student</span>
          </div>
          <form action="/api/internships/auth/logout" method="POST" style="margin: 0;">
            <button type="submit" style="background: transparent; border: 1px solid #d2d2d7; border-radius: 999px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600; color: #6e6e73; cursor: pointer; transition: all 0.2s ease;">Sign Out</button>
          </form>
        </div>
      </div>
    </header>

    <main class="container" style="flex: 1; padding: 32px 16px 60px;">
      <div style="margin-bottom: 24px;">
        <span id="studentWelcomeGreeting" style="font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em; color: #0066cc; text-transform: uppercase;">${pageEyebrow}</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; color: #1d1d1f; margin: 4px 0 0;">${pageHeading}</h1>
      </div>

      ${renderStudentNav(activeTab)}

      ${contentHtml}
    </main>

    <footer style="background: #ffffff; border-top: 1px solid #d2d2d7; padding: 24px 0; text-align: center; font-size: 0.85rem; color: #6e6e73;">
      <div class="container">
        &copy; 2026 ABSS Nexus Technologies. All rights reserved. &bull; <a href="/internships/support" style="color: #0066cc;">Technical Support</a> &bull; <a href="/privacy-policy" style="color: #0066cc;">Privacy</a>
      </div>
    </footer>
    <script src="/src/scripts/script.js" defer></script>
    <script>
      (function() {
        fetch("/api/internships/auth/me")
          .then(function(r) { return r.ok ? r.json() : null; })
          .then(function(data) {
            if (data && (data.student || data.user)) {
              var s = data.student || data.user;
              var name = s.name || s.fullName || "Intern Student";
              var initials = name.split(" ").map(function(p) { return p[0]; }).filter(Boolean).slice(0, 2).join("").toUpperCase() || "ST";
              var nameEl = document.getElementById("studentDisplayName");
              var avatarEl = document.getElementById("studentAvatarInitials");
              if (nameEl) nameEl.textContent = name;
              if (avatarEl) avatarEl.textContent = initials;
              var profName = document.getElementById("profileNameBig");
              var profAvatar = document.getElementById("profileAvatarBig");
              var profEmail = document.getElementById("profileEmailSubtitle");
              if (profName) profName.textContent = name;
              if (profAvatar) profAvatar.textContent = initials;
              if (profEmail && s.email) profEmail.innerHTML = s.email + " &bull; Active Enrolled Intern &bull; Batch of 2026";
              var certRecipient = document.getElementById("certStudentRecipient");
              if (certRecipient) certRecipient.textContent = name;
              var welcomeEl = document.getElementById("studentWelcomeGreeting");
              if (welcomeEl && welcomeEl.textContent.includes("STUDENT")) welcomeEl.textContent = "Welcome Back, " + name.split(" ")[0];
            }
          })
          .catch(function() {});
      })();
    </script>
  </body>
</html>`;

  fs.writeFileSync(path.join(pagesDir, filename), html, "utf8");
  console.log(`Generated: src/pages/${filename}`);
}

// 1. /student/dashboard (#46)
generateStudentPage({
  filename: "student-dashboard.html",
  title: "Dashboard Overview",
  activeTab: "dashboard",
  pageEyebrow: "Student Sprint Telemetry",
  pageHeading: "Internship Sprint Dashboard",
  contentHtml: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 32px;">
      <div class="card" style="padding: 24px; border-radius: 16px;">
        <span style="font-size: 0.8rem; font-weight: 600; color: #6e6e73;">TRACK PROGRESS</span>
        <strong style="display: block; font-size: 1.8rem; color: #0066cc; margin: 6px 0;">75% Completed</strong>
        <div style="background: #e5e5ea; height: 6px; border-radius: 3px; overflow: hidden;"><div style="background: #0066cc; width: 75%; height: 100%;"></div></div>
        <small style="color: #6e6e73; margin-top: 6px; display: block;">Sprint 3 of 4 in progress</small>
      </div>
      <div class="card" style="padding: 24px; border-radius: 16px;">
        <span style="font-size: 0.8rem; font-weight: 600; color: #6e6e73;">COMPLETED TASKS</span>
        <strong style="display: block; font-size: 1.8rem; color: #10b981; margin: 6px 0;">9 / 12 Delivered</strong>
        <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #10b981;">Average Grade: 96%</span>
      </div>
      <div class="card" style="padding: 24px; border-radius: 16px;">
        <span style="font-size: 0.8rem; font-weight: 600; color: #6e6e73;">NEXT DEADLINE</span>
        <strong style="display: block; font-size: 1.8rem; color: #f59e0b; margin: 6px 0;">In 3 Days</strong>
        <small style="color: #6e6e73;">Milestone 3: REST API Testing</small>
      </div>
      <div class="card" style="padding: 24px; border-radius: 16px;">
        <span style="font-size: 0.8rem; font-weight: 600; color: #6e6e73;">MENTORSHIP</span>
        <strong style="display: block; font-size: 1.8rem; color: #1d1d1f; margin: 6px 0;">Active</strong>
        <small style="color: #6e6e73;">Senior Engineer: Rohan Verma</small>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
      <div class="card" style="padding: 28px; border-radius: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="font-size: 1.25rem; margin: 0;">Active Sprint Deliverables</h2>
          <a href="/student/tasks" style="color: #0066cc; font-size: 0.88rem; font-weight: 600;">View All Tasks &rarr;</a>
        </div>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: #f5f5f7; border: 1px solid #e5e5ea; border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="display: block; font-size: 0.95rem;">Task #10: Cloudflare Worker Edge Authentication</strong>
              <span style="font-size: 0.82rem; color: #6e6e73;">Milestone: Edge Security &bull; Due: Oct 25, 2026</span>
            </div>
            <a href="/student/submit-work" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.82rem;">Submit PR</a>
          </div>
          <div style="background: #f5f5f7; border: 1px solid #e5e5ea; border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="display: block; font-size: 0.95rem;">Task #09: PostgreSQL D1 Migration Scripts</strong>
              <span style="font-size: 0.82rem; color: #6e6e73;">Milestone: Database Architecture &bull; Status: Approved</span>
            </div>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Approved &bull; 98/100</span>
          </div>
        </div>
      </div>

      <div class="card" style="padding: 28px; border-radius: 18px;">
        <h2 style="font-size: 1.25rem; margin: 0 0 16px;">Mentor Notices</h2>
        <div style="background: rgba(0, 102, 204, 0.06); border: 1px solid rgba(0, 102, 204, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <strong style="color: #0066cc; font-size: 0.9rem; display: block; margin-bottom: 4px;">Live Architecture Review</strong>
          <p style="font-size: 0.85rem; color: #1d1d1f; margin: 0 0 8px;">Weekly group mentorship session scheduled for Thursday 4:00 PM IST.</p>
          <span style="font-size: 0.78rem; color: #6e6e73;">Host: Tech Lead Rohan</span>
        </div>
        <a href="/student/internship" class="btn btn-secondary" style="width: 100%; text-align: center; font-size: 0.85rem;">View Track Curriculum</a>
      </div>
    </div>
  `
});

// 2. /student/profile (#47)
generateStudentPage({
  filename: "student-profile.html",
  title: "Student Profile",
  activeTab: "profile",
  pageEyebrow: "Personal & Academic Credentials",
  pageHeading: "Student Profile Information",
  contentHtml: `
    <div class="card" style="padding: 36px; border-radius: 20px; max-width: 860px;">
      <div style="display: flex; gap: 24px; align-items: center; border-bottom: 1px solid #e5e5ea; padding-bottom: 24px; margin-bottom: 28px; flex-wrap: wrap;">
        <div id="profileAvatarBig" style="width: 80px; height: 80px; border-radius: 50%; background: #0066cc; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800;">ST</div>
        <div>
          <h2 id="profileNameBig" style="margin: 0 0 6px;">Intern Student</h2>
          <p id="profileEmailSubtitle" style="margin: 0; color: #6e6e73; font-size: 0.92rem;">student@college.edu &bull; B.Tech Computer Science &bull; Batch of 2026</p>
          <span class="badge" style="margin-top: 8px; background: rgba(16, 185, 129, 0.12); color: #10b981;">Active Verified Student</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">COLLEGE / UNIVERSITY</label>
          <input type="text" value="Accredited University / Institute" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px; background: #ffffff;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">DEGREE &amp; MAJOR</label>
          <input type="text" value="B.Tech / BCA / MCA / B.Sc" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px; background: #ffffff;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">GITHUB PROFILE</label>
          <input type="text" placeholder="https://github.com/your-username" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #6e6e73; margin-bottom: 6px;">LINKEDIN PROFILE</label>
          <input type="text" placeholder="https://linkedin.com/in/your-profile" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
      </div>

      <h3 style="margin: 0 0 14px;">Technical Skills &amp; Badges</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;">
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">JavaScript (ES6+)</span>
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">Node.js</span>
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">Cloudflare Workers</span>
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">PostgreSQL</span>
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">HTML5 &amp; CSS3</span>
        <span class="chip" style="background: #f5f5f7; border: 1px solid #d2d2d7; padding: 6px 14px; border-radius: 8px;">Git &amp; GitHub</span>
      </div>

      <button type="button" class="btn btn-primary" onclick="alert('Profile details saved successfully!');">Update Profile &rarr;</button>
    </div>
  `
});

// 3. /student/applications (#48)
generateStudentPage({
  filename: "student-applications.html",
  title: "My Applications",
  activeTab: "applications",
  pageEyebrow: "Admissions & Enrollment",
  pageHeading: "Internship Program Applications",
  contentHtml: `
    <div class="card" style="padding: 32px; border-radius: 18px;">
      <h2 style="font-size: 1.25rem; margin: 0 0 20px;">Submitted Applications</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #f5f5f7; border-bottom: 2px solid #d2d2d7; text-align: left;">
              <th style="padding: 12px 16px;">App ID</th>
              <th style="padding: 12px 16px;">Program Track</th>
              <th style="padding: 12px 16px;">Applied Date</th>
              <th style="padding: 12px 16px;">Status</th>
              <th style="padding: 12px 16px;">Offer Letter</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 16px; font-family: monospace;">ABSS-2026-WD-1042</td>
              <td style="padding: 16px;"><strong>Full-Stack Web Engineering</strong></td>
              <td style="padding: 16px;">Feb 15, 2026</td>
              <td style="padding: 16px;"><span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Accepted &bull; Active</span></td>
              <td style="padding: 16px;"><button class="btn btn-secondary" onclick="alert('Downloading verified Offer Letter PDF...');" style="padding: 6px 14px; font-size: 0.8rem;">Download PDF</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e5ea;">
        <a href="/internships/programs" class="btn btn-secondary">Explore Other Programs &rarr;</a>
      </div>
    </div>
  `
});

// 4. /student/internship (#49)
generateStudentPage({
  filename: "student-internship.html",
  title: "My Internship Track",
  activeTab: "internship",
  pageEyebrow: "Curriculum & Syllabus",
  pageHeading: "Full-Stack Web Engineering Track",
  contentHtml: `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
      <div class="card" style="padding: 32px; border-radius: 18px;">
        <h2 style="font-size: 1.3rem; margin: 0 0 8px;">Milestone Roadmap (8-Week Technical Sprint)</h2>
        <p style="color: #6e6e73; font-size: 0.92rem; margin: 0 0 24px;">Master production web engineering with industry-reviewed milestones.</p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #f5f5f7; border-left: 4px solid #10b981; border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="color: #1d1d1f;">Weeks 1-2: Advanced Architecture &amp; Core Web Vitals</strong>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Completed</span>
            </div>
            <p style="font-size: 0.85rem; color: #6e6e73; margin: 6px 0 0;">LCP, FID, CLS tuning, responsive Apple-inspired CSS tokens, semantic layout.</p>
          </div>
          <div style="background: #f5f5f7; border-left: 4px solid #10b981; border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="color: #1d1d1f;">Weeks 3-4: Serverless APIs &amp; Edge Compute</strong>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Completed</span>
            </div>
            <p style="font-size: 0.85rem; color: #6e6e73; margin: 6px 0 0;">Node.js endpoints, Cloudflare Workers routing, rate limiting, and CORS security.</p>
          </div>
          <div style="background: #f5f5f7; border-left: 4px solid #0066cc; border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="color: #1d1d1f;">Weeks 5-6: Database Schema &amp; Cryptographic Auth</strong>
              <span class="badge" style="background: rgba(0, 102, 204, 0.15); color: #0066cc;">In Progress</span>
            </div>
            <p style="font-size: 0.85rem; color: #6e6e73; margin: 6px 0 0;">Relational SQL schemas, PBKDF2 password hashing, HttpOnly session cookies.</p>
          </div>
          <div style="background: #f5f5f7; border-left: 4px solid #d2d2d7; border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between;">
              <strong style="color: #6e6e73;">Weeks 7-8: Capstone Production Deployment &amp; Review</strong>
              <span class="badge" style="background: #e5e5ea; color: #6e6e73;">Upcoming</span>
            </div>
            <p style="font-size: 0.85rem; color: #6e6e73; margin: 6px 0 0;">CI/CD automation, lighthouse regression tests, and final engineering demo.</p>
          </div>
        </div>
      </div>

      <div class="card" style="padding: 28px; border-radius: 18px;">
        <h2 style="font-size: 1.2rem; margin: 0 0 16px;">Track Resources</h2>
        <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 0.88rem; line-height: 2;">
          <li>📦 <a href="https://github.com/ABSS-Nexus-Technologies" target="_blank" rel="noopener noreferrer" style="color: #0066cc; font-weight: 600;">Starter GitHub Repository</a></li>
          <li>📖 <a href="/internships/faq" style="color: #0066cc;">Syllabus Documentation</a></li>
          <li>💬 <a href="/internships/support" style="color: #0066cc;">Discord Mentor Channel</a></li>
          <li>⚡ <a href="/student/tasks" style="color: #0066cc;">Active Sprint Task Board</a></li>
        </ul>
        <div style="padding: 16px; background: #f5f5f7; border-radius: 12px; font-size: 0.82rem; color: #6e6e73;">
          <strong>Direct Technical Mentor:</strong><br />
          Rohan Verma &bull; rohan@abssnexus.in<br />
          Office Hours: Mon/Thu 4-5 PM IST
        </div>
      </div>
    </div>
  `
});

// 5. /student/tasks (#50)
generateStudentPage({
  filename: "student-tasks.html",
  title: "Task Board",
  activeTab: "tasks",
  pageEyebrow: "Sprint Tasks &amp; Milestones",
  pageHeading: "Technical Assignments &amp; Sprints",
  contentHtml: `
    <div class="card" style="padding: 32px; border-radius: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;">All Tasks (12)</button>
          <button class="btn btn-secondary" style="padding: 6px 16px; font-size: 0.85rem;">Pending (2)</button>
          <button class="btn btn-secondary" style="padding: 6px 16px; font-size: 0.85rem;">Approved (9)</button>
        </div>
        <a href="/student/submit-work" class="btn btn-primary" style="font-size: 0.85rem;">+ Submit Work Deliverable</a>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #f5f5f7; border-bottom: 2px solid #d2d2d7; text-align: left;">
              <th style="padding: 12px 14px;">Task ID</th>
              <th style="padding: 12px 14px;">Title &amp; Milestone</th>
              <th style="padding: 12px 14px;">Due Date</th>
              <th style="padding: 12px 14px;">Status</th>
              <th style="padding: 12px 14px;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 14px; font-family: monospace;">TASK-10</td>
              <td style="padding: 14px;"><strong>Cloudflare Worker Edge Authentication</strong><br /><small style="color: #6e6e73;">Milestone 3: Security &amp; Tokens</small></td>
              <td style="padding: 14px;">Oct 25, 2026</td>
              <td style="padding: 14px;"><span class="badge" style="background: rgba(0, 102, 204, 0.12); color: #0066cc;">In Progress</span></td>
              <td style="padding: 14px;"><a href="/student/tasks/task-1" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">View Spec &rarr;</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 14px; font-family: monospace;">TASK-09</td>
              <td style="padding: 14px;"><strong>PostgreSQL D1 Migration Scripts</strong><br /><small style="color: #6e6e73;">Milestone 3: Database Models</small></td>
              <td style="padding: 14px;">Oct 18, 2026</td>
              <td style="padding: 14px;"><span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Approved (98%)</span></td>
              <td style="padding: 14px;"><a href="/student/submissions" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">Review Notes</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 14px; font-family: monospace;">TASK-08</td>
              <td style="padding: 14px;"><strong>REST API Endpoint Architecture</strong><br /><small style="color: #6e6e73;">Milestone 2: Serverless Logic</small></td>
              <td style="padding: 14px;">Oct 12, 2026</td>
              <td style="padding: 14px;"><span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Approved (95%)</span></td>
              <td style="padding: 14px;"><a href="/student/submissions" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">Review Notes</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
});

// 6. /student/tasks/:id (`/student/task-detail`) (#51)
generateStudentPage({
  filename: "student-task-detail.html",
  title: "Task Details: Edge Authentication",
  activeTab: "tasks",
  pageEyebrow: "Milestone 3 Assignment Specification",
  pageHeading: "TASK-10: Cloudflare Worker Edge Authentication",
  contentHtml: `
    <div class="card" style="padding: 36px; border-radius: 20px; max-width: 860px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e5ea; padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="badge" style="background: rgba(0, 102, 204, 0.12); color: #0066cc;">In Progress &bull; Priority High</span>
          <span style="font-size: 0.85rem; color: #6e6e73; margin-left: 12px;">Due: Oct 25, 2026</span>
        </div>
        <a href="/student/submit-work" class="btn btn-primary">Submit PR Deliverable &rarr;</a>
      </div>

      <h2>Assignment Objective</h2>
      <p style="color: #6e6e73; line-height: 1.7;">Implement cryptographic session validation and token verification on Cloudflare Workers edge nodes. Ensure all protected routes redirect unauthenticated traffic and prevent timing attacks using constant-time comparison.</p>

      <h3>Acceptance Criteria</h3>
      <ul style="color: #6e6e73; line-height: 1.8; padding-left: 20px;">
        <li>Read <code>abss_student_session</code> HttpOnly cookie from request headers.</li>
        <li>Hash raw cookie token with SHA-256 and query active session records.</li>
        <li>Return HTTP 401 Unauthorized for expired or missing tokens.</li>
        <li>Pass 100% of automated Jest integration tests without regression.</li>
      </ul>

      <h3>Starter Resources</h3>
      <div style="background: #f5f5f7; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 10px; font-size: 0.9rem;"><strong>Git Starter Branch:</strong> <code>git checkout -b feature/edge-auth</code></p>
        <p style="margin: 0; font-size: 0.9rem;"><strong>Documentation Link:</strong> <a href="/internships/faq" style="color: #0066cc;">API Security Guidelines v4.2</a></p>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 32px;">
        <a href="/student/submit-work" class="btn btn-primary" style="flex: 1; text-align: center;">Ready to Submit? Open Submission Form</a>
        <a href="/student/tasks" class="btn btn-secondary">Back to Task Board</a>
      </div>
    </div>
  `
});

// 7. /student/submissions (#52)
generateStudentPage({
  filename: "student-submissions.html",
  title: "Work Submissions",
  activeTab: "submissions",
  pageEyebrow: "Evaluations & Review History",
  pageHeading: "Work Submission Log &amp; Feedback",
  contentHtml: `
    <div class="card" style="padding: 32px; border-radius: 18px;">
      <h2 style="font-size: 1.25rem; margin: 0 0 20px;">Review Evaluation History</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #f5f5f7; border-bottom: 2px solid #d2d2d7; text-align: left;">
              <th style="padding: 12px 14px;">Submission</th>
              <th style="padding: 12px 14px;">Deliverable Link</th>
              <th style="padding: 12px 14px;">Score</th>
              <th style="padding: 12px 14px;">Reviewer Notes</th>
              <th style="padding: 12px 14px;">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 14px;"><strong>TASK-09: D1 Database Migrations</strong></td>
              <td style="padding: 14px;"><a href="https://github.com" target="_blank" rel="noopener noreferrer" style="color: #0066cc;">PR #42 (github.com)</a></td>
              <td style="padding: 14px;"><span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">98 / 100</span></td>
              <td style="padding: 14px; font-size: 0.85rem; color: #6e6e73;">"Excellent foreign key constraints and clean schema indexes. Production grade."</td>
              <td style="padding: 14px; color: #6e6e73;">Oct 18, 2026</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5ea;">
              <td style="padding: 14px;"><strong>TASK-08: REST API Architecture</strong></td>
              <td style="padding: 14px;"><a href="https://github.com" target="_blank" rel="noopener noreferrer" style="color: #0066cc;">PR #38 (github.com)</a></td>
              <td style="padding: 14px;"><span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">95 / 100</span></td>
              <td style="padding: 14px; font-size: 0.85rem; color: #6e6e73;">"Clean error handling. Minor optimization suggested on query pagination."</td>
              <td style="padding: 14px; color: #6e6e73;">Oct 12, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 24px;">
        <a href="/student/submit-work" class="btn btn-primary">+ Submit Another Deliverable</a>
      </div>
    </div>
  `
});

// 8. /student/submit-work (#53)
generateStudentPage({
  filename: "student-submit-work.html",
  title: "Submit Internship Work",
  activeTab: "submit-work",
  pageEyebrow: "Deliverables Portal",
  pageHeading: "Submit Work Deliverable for Evaluation",
  contentHtml: `
    <div class="card" style="padding: 36px; border-radius: 20px; max-width: 780px;">
      <form onsubmit="event.preventDefault(); alert('Work deliverable submitted successfully! Your mentor will review within 24-48 hours.'); window.location.href='/student/submissions';">
        <div class="form-group" style="margin-bottom: 20px;">
          <label for="task-select" style="display: block; font-weight: 600; margin-bottom: 6px;">Select Milestone Task</label>
          <select id="task-select" required style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px; font-size: 0.95rem;">
            <option value="TASK-10">TASK-10: Cloudflare Worker Edge Authentication</option>
            <option value="TASK-11">TASK-11: Full-Stack Integration Testing</option>
            <option value="TASK-12">TASK-12: Capstone Final Project Demo</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label for="pr-url" style="display: block; font-weight: 600; margin-bottom: 6px;">GitHub Pull Request / Repository URL</label>
          <input type="url" id="pr-url" required placeholder="https://github.com/your-username/abss-internship/pull/1" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label for="demo-url" style="display: block; font-weight: 600; margin-bottom: 6px;">Live Demo URL (Cloudflare Pages or Vercel)</label>
          <input type="url" id="demo-url" placeholder="https://your-preview-deployment.pages.dev" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label for="notes" style="display: block; font-weight: 600; margin-bottom: 6px;">Engineering Notes &amp; Implementation Summary</label>
          <textarea id="notes" rows="4" placeholder="Summarize your architecture choices, security patterns implemented, and testing results..." style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;"></textarea>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: #1d1d1f; cursor: pointer;">
            <input type="checkbox" required />
            <span>I certify this code represents my authentic engineering work meeting ABSS Nexus integrity standards.</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="padding: 14px 28px; font-size: 1rem;">Submit Deliverable to Reviewer &rarr;</button>
      </form>
    </div>
  `
});

// 9. /student/certificates (#54)
generateStudentPage({
  filename: "student-certificates.html",
  title: "My Certificates",
  activeTab: "certificates",
  pageEyebrow: "Credentials & Badges",
  pageHeading: "Issued Completion Certificates",
  contentHtml: `
    <div class="card" style="padding: 36px; border-radius: 20px; max-width: 860px;">
      <div style="background: #ffffff; border: 2px solid #10b981; border-radius: 18px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">OFFICIALLY VERIFIED</span>
            <h2 style="font-size: 1.4rem; margin: 8px 0 2px;">Full-Stack Web Engineering Certification</h2>
            <span style="font-size: 0.88rem; color: #6e6e73;">Issued to: <strong id="certStudentRecipient">Intern Student</strong> &bull; Grade: A+ (96%)</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: #6e6e73;">Credential ID</span>
            <strong style="display: block; font-family: monospace; font-size: 0.95rem; color: #0066cc;">ABSS-CERT-2026-WD-1042</strong>
          </div>
        </div>

        <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 0.88rem; color: #1d1d1f; line-height: 1.6;">"Has successfully satisfied all production milestones in Web Architecture, Cloudflare Serverless Workers, Relational Database Modeling, and High-Performance Edge Optimization under industry mentorship."</p>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="alert('Downloading authenticated Certificate PDF...');">Download High-Res PDF &darr;</button>
          <a href="/verify-certificate" class="btn btn-secondary">Public Verification Page &rarr;</a>
          <button class="btn btn-secondary" onclick="alert('LinkedIn certification badge link copied to clipboard!');">Share to LinkedIn</button>
        </div>
      </div>
    </div>
  `
});

// 10. /student/settings (#55)
generateStudentPage({
  filename: "student-settings.html",
  title: "Account Settings",
  activeTab: "settings",
  pageEyebrow: "Security & Preferences",
  pageHeading: "Student Account Settings",
  contentHtml: `
    <div class="card" style="padding: 36px; border-radius: 20px; max-width: 780px;">
      <h2 style="font-size: 1.25rem; margin: 0 0 20px;">Security Credentials</h2>
      <form onsubmit="event.preventDefault(); alert('Security settings updated successfully!');" style="margin-bottom: 36px;">
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 600; margin-bottom: 6px;">Current Password</label>
          <input type="password" required placeholder="Enter current password" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; margin-bottom: 6px;">New Password (Min 8 Characters)</label>
          <input type="password" required minlength="8" placeholder="Enter new secure password" style="width: 100%; padding: 12px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <button type="submit" class="btn btn-secondary">Change Password</button>
      </form>

      <h2 style="font-size: 1.25rem; margin: 0 0 20px;">Notification Preferences</h2>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; font-size: 0.9rem;">
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <input type="checkbox" checked />
          <span>Email notifications for mentor submission reviews and grades</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <input type="checkbox" checked />
          <span>Weekly reminder of upcoming assignment deadlines</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <input type="checkbox" checked />
          <span>Live architecture masterclass invitations</span>
        </label>
      </div>

      <div style="padding-top: 24px; border-top: 1px solid #e5e5ea;">
        <form action="/api/internships/auth/logout" method="POST">
          <button type="submit" class="btn btn-secondary" style="color: #dc2626; border-color: #fca5a5;">Log Out from All Sessions</button>
        </form>
      </div>
    </div>
  `
});

console.log("Student Dashboard Suite (10 Pages) build complete.");

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/pages/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. CONDENSE SERVICES (Remove services 6 through 15, keep 1-5 and 16, add sleek pills)
const s6Marker = '<!-- Service 6: Cloud Computing & DevOps -->';
const s16Marker = '<!-- Service 16: Managed IT Support -->';

if (content.includes(s6Marker) && content.includes(s16Marker)) {
  const s6Index = content.indexOf(s6Marker);
  const s16Index = content.indexOf(s16Marker);
  
  content = content.slice(0, s6Index) + '<!-- Flagship Service 6: Managed IT Support -->\n            ' + content.slice(s16Index + s16Marker.length);
  console.log('✓ Services reduced to 6 flagship cards');
} else {
  console.log('⚠ Services marker not found or already modified');
}

// Add pill directory above "View All 16 Services & Packages" button if not already present
const btnOld = '<div style="text-align: center; margin-top: 48px;">\n            <a class="btn btn-glow-cyan" href="/services">View All 16 Services &amp; Packages &rarr;</a>';
const btnNew = `<!-- Specialization Directory Tags -->
          <div class="services-tag-pills" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 36px; max-width: 840px; margin-left: auto; margin-right: auto;">
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Cloud &amp; DevOps</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Cybersecurity</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">E-Commerce Solutions</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Headless CMS</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Data Analytics &amp; BI</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">APIs &amp; Microservices</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">QA &amp; Automation</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">IoT &amp; Embedded</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Blockchain &amp; Web3</span>
            <span style="font-size: 0.8rem; color: var(--color-text-dim); padding: 4px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 999px;">Website Maintenance</span>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a class="btn btn-glow-cyan" href="/services">View All 16 Services &amp; Packages &rarr;</a>`;

if (content.includes(btnOld)) {
  content = content.replace(btnOld, btnNew);
  console.log('✓ Added directory pills and streamlined services CTA');
}

// 2. STREAMLINE SOLUTIONS & INDUSTRIES (Compact 1-liner statements)
const oldSolutionsSection = `<div class="solutions-modern-grid">
            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3>SaaS &amp; Tech Startups</h3>
              <p>Rapid MVP creation, interactive product landing pages, and intuitive user dashboards engineered to accelerate market validation.</p>
              <ul class="solution-features-list">
                <li>Frictionless user onboarding</li>
                <li>Interactive demo dashboards</li>
                <li>Edge-hosted performance</li>
              </ul>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <h3>E-Commerce &amp; Retail</h3>
              <p>Conversion-focused storefronts, lightning-fast product catalogs, and frictionless checkout pathways designed to maximize revenue.</p>
              <ul class="solution-features-list">
                <li>Sub-second product displays</li>
                <li>Direct WhatsApp ordering</li>
                <li>Mobile-first cart workflows</li>
              </ul>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <h3>Educational Institutes</h3>
              <p>Complete academic portals organizing course admissions, faculty departments, student notices, and campus resources.</p>
              <ul class="solution-features-list">
                <li>Structured admissions inquiry</li>
                <li>Course &amp; department guides</li>
                <li>High-volume mobile stability</li>
              </ul>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Enterprise Operations</h3>
              <p>Internal business management portals, role-based admin consoles, and structured SQL database backends that streamline business workflows.</p>
              <ul class="solution-features-list">
                <li>Cloudflare D1 edge database</li>
                <li>Audit logging &amp; telemetry</li>
                <li>Granular role security</li>
              </ul>
            </article>
          </div>`;

const newSolutionsSection = `<div class="solutions-modern-grid">
            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3>SaaS &amp; Tech Startups</h3>
              <p>Rapid MVP creation, interactive product landing pages, and intuitive user dashboards engineered to accelerate market validation.</p>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <h3>E-Commerce &amp; Retail</h3>
              <p>Conversion-focused storefronts, lightning-fast product catalogs, and frictionless checkout pathways designed to maximize revenue.</p>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <h3>Educational Institutes</h3>
              <p>Complete academic portals organizing course admissions, faculty departments, student notices, and campus resources.</p>
            </article>

            <article class="solution-modern-card">
              <div class="card-icon-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Enterprise Operations</h3>
              <p>Internal business management portals, role-based admin consoles, and structured SQL backends that streamline business workflows.</p>
            </article>
          </div>`;

if (content.includes(oldSolutionsSection)) {
  content = content.replace(oldSolutionsSection, newSolutionsSection);
  console.log('✓ Solutions grid streamlined');
}

// 3. STREAMLINE PROCESS SECTION
const oldProcess = `<div class="agency-process-track">
            <article class="process-step-card">
              <div class="step-num-glow">01</div>
              <h3>Discussion &amp; Strategy</h3>
              <p>Understand your business objectives, target audience, brand requirements, and feature scope.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">02</div>
              <h3>Architecture &amp; Scope</h3>
              <p>Define site structure, page flows, technology selection, and concrete delivery timelines.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">03</div>
              <h3>UI/UX Prototyping</h3>
              <p>Create modern, intuitive interface designs with clean typography and responsive layouts.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">04</div>
              <h3>Engineering &amp; Code</h3>
              <p>Build semantic, fast-loading pages and integrate required forms, APIs, and databases.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">05</div>
              <h3>Audit, Launch &amp; Support</h3>
              <p>Perform mobile audits, speed checks, and deploy to global edge CDN with post-launch care.</p>
            </article>
          </div>`;

const newProcess = `<div class="agency-process-track">
            <article class="process-step-card">
              <div class="step-num-glow">01</div>
              <h3>Strategy</h3>
              <p>Aligning objectives, user personas, and core project scope.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">02</div>
              <h3>Architecture</h3>
              <p>Defining page flows, data schemas, and sprint timelines.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">03</div>
              <h3>Prototyping</h3>
              <p>Crafting high-fidelity UI designs and responsive layouts.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">04</div>
              <h3>Engineering</h3>
              <p>Developing lightweight semantic code with fast API backends.</p>
            </article>

            <article class="process-step-card">
              <div class="step-num-glow">05</div>
              <h3>Launch</h3>
              <p>Global CDN deployment, QA audits, and post-delivery care.</p>
            </article>
          </div>`;

if (content.includes(oldProcess)) {
  content = content.replace(oldProcess, newProcess);
  console.log('✓ Process track streamlined');
}

// 4. REMOVE COMPARISON TABLE
const tableMarkerStart = '<!-- Value Comparison Matrix -->';
const tableMarkerEnd = '<!-- Founder Spotlight in Strengths Section -->';

if (content.includes(tableMarkerStart) && content.includes(tableMarkerEnd)) {
  const tStart = content.indexOf(tableMarkerStart);
  const tEnd = content.indexOf(tableMarkerEnd);
  content = content.slice(0, tStart) + content.slice(tEnd);
  console.log('✓ Removed bulky comparison table from strengths section');
}

// 5. STREAMLINE INTERNSHIP SECTION
const internshipGridMarker = '<div class="internship-tracks-grid">';
const internshipSectionEnd = '</section>\n\n      <!-- Section 9: Project Enquiry CTA -->';

if (content.includes(internshipGridMarker) && content.includes(internshipSectionEnd)) {
  const gStart = content.indexOf(internshipGridMarker);
  const sEnd = content.indexOf(internshipSectionEnd);
  
  const upgradedInternshipBanner = `<!-- Compact Tracks Strip -->
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 24px;">
            <a href="/internships/programs/web-development" class="track-badge" style="text-decoration: none; font-size: 0.85rem; padding: 6px 14px; background: rgba(0, 113, 227, 0.1); border: 1px solid rgba(0, 113, 227, 0.3); border-radius: 999px; color: #5ac8fa; transition: all 0.2s ease;">Track 01: Web Development &rarr;</a>
            <a href="/internships/programs/software-development" class="track-badge" style="text-decoration: none; font-size: 0.85rem; padding: 6px 14px; background: rgba(52, 199, 89, 0.1); border: 1px solid rgba(52, 199, 89, 0.3); border-radius: 999px; color: #34c759; transition: all 0.2s ease;">Track 02: Software &amp; Full-Stack &rarr;</a>
            <a href="/internships/programs/ui-ux-design" class="track-badge" style="text-decoration: none; font-size: 0.85rem; padding: 6px 14px; background: rgba(175, 82, 222, 0.1); border: 1px solid rgba(175, 82, 222, 0.3); border-radius: 999px; color: #bf5af2; transition: all 0.2s ease;">Track 03: UI/UX Design &rarr;</a>
          </div>
        </div>
      `;

  content = content.slice(0, gStart) + upgradedInternshipBanner + content.slice(sEnd);
  console.log('✓ Streamlined internship section into sleek compact banner');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✓ index.html successfully updated and streamlined!');

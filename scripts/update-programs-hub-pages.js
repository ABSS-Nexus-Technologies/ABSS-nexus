const fs = require("fs");
const path = require("path");
const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "backend", "data", "db.json"), "utf8"));

const rootDir = path.resolve(__dirname, "..");
const internshipsHtmlFile = path.join(rootDir, "src", "pages", "internships.html");
const programsHtmlFile = path.join(rootDir, "src", "pages", "internships-programs.html");

function buildTrackCardHtml(prog, isProgramCatalog = false) {
  return `            <div class="portal-card" data-category="${prog.category}">
              <div class="portal-card-header">
                <span class="portal-badge">${prog.category}</span>
                <h3>${prog.title}</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; ${prog.workMode}</span>
                <span class="portal-meta-pill">&#9200; ${prog.duration}</span>
                <span class="portal-meta-pill" style="color: #00c2ff; font-weight: 600;">&#10003; ISO Verified</span>
              </div>
              <p class="portal-card-desc">
                ${prog.description}
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> ${prog.skills}
              </div>
              <div style="margin-top: 20px; display: flex; gap: 8px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/${prog.slug}" style="flex: 1; text-align: center; justify-content: center;">
                  View Syllabus &rarr;
                </a>
                <a class="btn btn-glass" href="/internships/register?track=${prog.slug}" style="padding: 10px 14px; text-align: center;">
                  Apply
                </a>
              </div>
            </div>`;
}

// 1. Update src/pages/internships.html
let internshipsHtml = fs.readFileSync(internshipsHtmlFile, "utf8");

const tracksStartMarker = '<!-- 4. 5 High-Demand Specialization Tracks -->';
const tracksEndMarker = '<!-- 5. 4-Step Zero-Friction Student Journey -->';

const tStart = internshipsHtml.indexOf(tracksStartMarker);
const tEnd = internshipsHtml.indexOf(tracksEndMarker);

if (tStart !== -1 && tEnd !== -1) {
  const cardsHtml = db.internshipPrograms.map(p => buildTrackCardHtml(p, false)).join("\n\n");
  const newTracksSection = `<!-- 4. 16 Comprehensive Specialization Tracks -->
      <section class="portal-section-white" id="tracks">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Industry Curricula &bull; 16+ Specializations</span>
            <h2>Select Your Specialization Track</h2>
            <p>Industry-aligned virtual internships with milestone tasks, mentor feedback, and verifiable ISO credentials across engineering, AI, design, and business.</p>
          </div>

          <div class="portal-grid">
${cardsHtml}
          </div>
        </div>
      </section>

      `;

  internshipsHtml = internshipsHtml.slice(0, tStart) + newTracksSection + internshipsHtml.slice(tEnd);
  fs.writeFileSync(internshipsHtmlFile, internshipsHtml, "utf8");
  console.log("Successfully updated src/pages/internships.html with all 16+ tracks!");
} else {
  console.error("Could not find tracks markers in internships.html");
}

// 2. Update src/pages/internships-programs.html
let programsHtml = fs.readFileSync(programsHtmlFile, "utf8");

const progGridStartMarker = '<div class="portal-grid">';
const progGridEndMarker = '</div>\n        </div>\n      </section>';

const pStart = programsHtml.indexOf(progGridStartMarker);
const pEnd = programsHtml.indexOf(progGridEndMarker, pStart);

if (pStart !== -1 && pEnd !== -1) {
  const cardsHtml = db.internshipPrograms.map(p => buildTrackCardHtml(p, true)).join("\n\n");
  const newGrid = `<div class="portal-grid">
${cardsHtml}`;

  programsHtml = programsHtml.slice(0, pStart) + newGrid + programsHtml.slice(pEnd);
  // Also update badge text
  programsHtml = programsHtml.replace(/5 Modular Tracks/g, "16+ Comprehensive Tracks");
  programsHtml = programsHtml.replace(/Curriculum Catalog &bull; 5 Modular Tracks/g, "Curriculum Catalog &bull; 16+ Comprehensive Specializations");
  fs.writeFileSync(programsHtmlFile, programsHtml, "utf8");
  console.log("Successfully updated src/pages/internships-programs.html with all 16+ tracks!");
} else {
  console.error("Could not find grid markers in internships-programs.html");
}

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/pages/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. REMOVE duplicate company intro band (#intro) if present
const introStart = '<!-- Section 2: Company Introduction -->';
const statsStart = '<!-- Live Stats Bar Section -->';
if (content.includes(introStart) && content.includes(statsStart)) {
  const iStart = content.indexOf(introStart);
  const sStart = content.indexOf(statsStart);
  content = content.slice(0, iStart) + content.slice(sStart);
  console.log('✓ Removed duplicate company-intro-band');
}

// 2. REMOVE Section 4: Solutions and Industries (#solutions)
const solutionsMarkerStart = '<!-- Section 4: Solutions and Industries -->';
const projectsMarkerStart = '<!-- Section 5: Featured Portfolio -->';
if (content.includes(solutionsMarkerStart) && content.includes(projectsMarkerStart)) {
  const solStart = content.indexOf(solutionsMarkerStart);
  const projStart = content.indexOf(projectsMarkerStart);
  content = content.slice(0, solStart) + content.slice(projStart);
  console.log('✓ Removed Section 4: Solutions & Industries (#solutions)');
}

// 3. STREAMLINE Projects: Keep Top 3 Projects (Personal Portfolio, Dashboard, E-Commerce), remove 4, 5, 6
const proj4Marker = '<!-- Project 4: Business Landing Page -->';
const projGridEnd = '</div>\n\n          <div style="text-align: center; margin-top: 48px;">\n            <a class="btn btn-glass" href="/work">Explore Full Portfolio Archive &rarr;</a>';

if (content.includes(proj4Marker) && content.includes(projGridEnd)) {
  const p4Start = content.indexOf(proj4Marker);
  const pEnd = content.indexOf(projGridEnd);
  content = content.slice(0, p4Start) + content.slice(pEnd);
  console.log('✓ Trimmed Projects grid to Top 3 flagship demos');
}

// 4. REMOVE Section 6 (Process) and Section 7 (Strengths/Why ABSS/Founder)
const processStart = '<!-- Section 6: Company Process -->';
const testimonialsStart = '<!-- Section: Verified Client Testimonials -->';
if (content.includes(processStart) && content.includes(testimonialsStart)) {
  const procStart = content.indexOf(processStart);
  const testStart = content.indexOf(testimonialsStart);
  content = content.slice(0, procStart) + content.slice(testStart);
  console.log('✓ Removed Section 6 (Process) and Section 7 (Strengths/Founder)');
}

// 5. REMOVE Section 8: Internship (#internship)
const internshipStart = '<!-- Section 8: Internship Program Introduction -->';
const ctaBandStart = '<!-- Section 9: Project Enquiry CTA -->';
if (content.includes(internshipStart) && content.includes(ctaBandStart)) {
  const internStart = content.indexOf(internshipStart);
  const ctaStart = content.indexOf(ctaBandStart);
  content = content.slice(0, internStart) + content.slice(ctaStart);
  console.log('✓ Removed Section 8: Internship Program (#internship)');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✓ Ultra-Lean Apple Layout applied to src/pages/index.html!');

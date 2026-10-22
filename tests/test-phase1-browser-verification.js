const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${message}`);
}

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runLiveVerification() {
  console.log('=== Running Live HTTP Server Verification (Phase 1) ===\n');

  // 1. Verify Homepage 200 OK and Content
  console.log('--- 1. Live Homepage Content & Header Checks ---');
  const homeRes = await fetchUrl('/');
  assert(homeRes.status === 200, 'Homepage served with 200 OK');
  const html = homeRes.body;

  assert(html.includes('class="announcement-bar"'), 'Announcement bar present in served HTML');
  assert(html.includes('href="/contact#project-inquiry"'), 'Announcement CTA links to inquiry route');
  assert(html.includes('class="brand-name">ABSS Nexus Technologies</span>'), 'Brand name present in served HTML');
  assert(html.includes('mega-menu-services'), 'Services mega menu present in served HTML');
  assert(html.includes('mega-menu-solutions'), 'Solutions mega menu present in served HTML');
  assert(html.includes('Start Project'), 'Start Project button present in served HTML');

  // 2. Verify Hero Elements in Served HTML
  console.log('\n--- 2. Live Homepage Hero Checks ---');
  assert(html.includes('DIGITAL INNOVATION • SOFTWARE • DESIGN') || html.includes('DIGITAL INNOVATION &bull; SOFTWARE &bull; DESIGN'), 'Hero eyebrow present');
  assert(html.includes('Move Businesses Forward'), 'Hero H1 headline present');
  assert(html.includes('Start Your Project'), 'Primary CTA "Start Your Project" present');
  assert(html.includes('Explore Our Services'), 'Secondary CTA "Explore Our Services" present');
  assert(html.includes('hero-device-workspace'), 'Hero device workspace mockup container present');
  assert(html.includes('hero-laptop'), 'Hero laptop mockup present');
  assert(html.includes('hero-phone'), 'Hero phone mockup present');
  assert(html.includes('/public/assets/images/project-dashboard-ui.png'), 'Laptop displays SaaS dashboard image');
  assert(html.includes('/public/assets/images/project-ecommerce-demo.png'), 'Phone displays ecommerce demo image');

  // 3. Verify Live Static Asset Delivery
  console.log('\n--- 3. Live Static Asset Delivery Checks ---');
  const cssRes = await fetchUrl('/src/styles/components/header.css');
  assert(cssRes.status === 200, 'header.css served with 200 OK');
  assert(cssRes.body.includes('.site-header.is-scrolled'), 'header.css contains compact sticky scroll styles');
  assert(cssRes.body.includes('.mega-menu-solutions'), 'header.css contains solutions mega-menu styles');

  const heroCssRes = await fetchUrl('/src/styles/components/hero.css');
  assert(heroCssRes.status === 200, 'hero.css served with 200 OK');
  assert(heroCssRes.body.includes('.reveal-on-scroll'), 'hero.css contains scroll reveal animation styles');

  const contactJsRes = await fetchUrl('/src/scripts/config/contact.js');
  assert(contactJsRes.status === 200, 'contact.js served with 200 OK');
  assert(contactJsRes.body.includes('918757928673'), 'contact.js configures official WhatsApp number');

  const parallaxJsRes = await fetchUrl('/src/scripts/components/hero-parallax.js');
  assert(parallaxJsRes.status === 200, 'hero-parallax.js served with 200 OK');

  const scrollRevealJsRes = await fetchUrl('/src/scripts/components/scroll-reveal.js');
  assert(scrollRevealJsRes.status === 200, 'scroll-reveal.js served with 200 OK');

  const dashboardImgRes = await fetchUrl('/public/assets/images/project-dashboard-ui.png');
  assert(dashboardImgRes.status === 200, 'Dashboard screenshot served with 200 OK');

  const phoneImgRes = await fetchUrl('/public/assets/images/project-ecommerce-demo.png');
  assert(phoneImgRes.status === 200, 'Ecommerce demo screenshot served with 200 OK');

  // 4. Verify Responsive Breakpoint Tokens in CSS
  console.log('\n--- 4. Responsive Breakpoint & Media Query Verification ---');
  assert(cssRes.body.includes('@media (max-width: 1140px)'), '1140px tablet/mobile nav breakpoint present');
  assert(cssRes.body.includes('@media (max-width: 480px)'), '480px small mobile breakpoint present');
  assert(heroCssRes.body.includes('@media (min-width: 992px)'), '992px 2-column hero grid breakpoint present');
  assert(heroCssRes.body.includes('@media (max-width: 768px)'), '768px mobile visual adjustment present');
  assert(heroCssRes.body.includes('@media (max-width: 480px)'), '480px stacked CTA actions present');

  // 5. Verify Accessibility States in HTML and CSS
  console.log('\n--- 5. Accessibility States Verification ---');
  assert(html.includes('aria-expanded="false"'), 'aria-expanded initialized on toggle and dropdown triggers');
  assert(html.includes('aria-controls="main-nav-links"'), 'aria-controls associated with main-nav-links');
  assert(html.includes('aria-label="Main Navigation"'), 'Main Navigation has accessible label');
  assert(html.includes('aria-label="Contact us on WhatsApp"'), 'WhatsApp floating button has accessible label');
  assert(cssRes.body.includes(':focus-visible'), 'focus-visible outline indicators defined');
  assert(cssRes.body.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion handled in header.css');
  assert(heroCssRes.body.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion handled in hero.css');

  console.log('\n🎉 ALL LIVE SERVER & ASSET CHECKS COMPLETED AND PASSED!\n');
}

runLiveVerification().catch(err => {
  console.error('❌ Server check error:', err);
  process.exit(1);
});

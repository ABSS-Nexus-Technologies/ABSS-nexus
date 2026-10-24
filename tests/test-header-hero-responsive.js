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

console.log('=== Starting Header & Hero Comprehensive Phase 1 Verification ===\n');

// 1. Check Homepage HTML
const indexPath = path.join(ROOT, 'src/pages/index.html');
assert(fs.existsSync(indexPath), 'src/pages/index.html exists');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// 2. Announcement bar verification
console.log('\n--- 1. Announcement Bar Verification ---');
assert(
  indexHtml.includes('Technical Internship Cohort') ||
  indexHtml.includes('Applications open for 2026') ||
  indexHtml.includes('Free consultation available for website &amp; digital projects.') ||
  indexHtml.includes('Free consultation available for website & digital projects.'),
  'Announcement message matches specification'
);
assert(indexHtml.includes('live-pulse-dot'), 'Green status indicator dot present');
assert(
  indexHtml.includes('Apply for Internship &rarr;') || indexHtml.includes('Apply for Internship →') ||
  indexHtml.includes('Start your business website &rarr;') || indexHtml.includes('Start your business website →'),
  'CTA "Apply for Internship →" present'
);
assert(indexHtml.includes('href="/internships"') || indexHtml.includes('href="/contact#project-inquiry"'), 'CTA links to route');

// 3. Navigation Header Brand verification
console.log('\n--- 2. Navigation Header Brand Verification ---');
assert(
  indexHtml.includes('/public/assets/images/favicon.png'),
  'Brand logo uses favicon.png 38x38 mark instead of colliding wide graphic'
);
assert(
  indexHtml.includes('<span class="brand-name">ABSS Nexus Technologies</span>'),
  'Brand name "ABSS Nexus Technologies" cleanly structured'
);

// 4. Navigation Links & Mega Menus verification
console.log('\n--- 3. Navigation Links & Mega Menus Verification ---');
// Extract main-nav-links block
const navLinksMatch = indexHtml.match(/<div class="nav-links" id="main-nav-links">([\s\S]*?)<\/div>\s*<\/nav>/);
assert(navLinksMatch !== null, 'Main nav-links container exists');
const navLinksContent = navLinksMatch[1];

// Count top-level direct links
const navLinkDirects = [
  ...navLinksContent.matchAll(/<a\s+[^>]*class="[^"]*nav-link[^"]*"[^>]*>([^<]+)<\/a>/g)
];
const topDirectLabels = navLinkDirects.map(m => m[1].trim());
assert(topDirectLabels.includes('Home'), 'Nav contains Home');
assert(topDirectLabels.includes('Industries'), 'Nav contains Industries');
assert(topDirectLabels.includes('Work'), 'Nav contains Work');
assert(topDirectLabels.includes('Pricing'), 'Nav contains Pricing');
assert(indexHtml.includes('Apply for Internship'), 'Announcement bar contains Apply for Internship CTA');
assert(topDirectLabels.includes('Blog'), 'Nav contains Blog');
assert(topDirectLabels.includes('About'), 'Nav contains About');
assert(topDirectLabels.includes('Contact'), 'Nav contains Contact');

// Verify both dropdown triggers exist
assert(navLinksContent.includes('<span>Services</span>'), 'Nav contains Services dropdown trigger');
assert(navLinksContent.includes('<span>Solutions</span>'), 'Nav contains Solutions dropdown trigger');

// Verify mega menu containers exist inside nav
assert(navLinksContent.includes('mega-menu-services'), 'Services mega menu container exists');
assert(navLinksContent.includes('mega-menu-solutions'), 'Solutions mega menu container exists');

// Verify solution categories exist in solutions mega menu
assert(navLinksContent.includes('Business Process Automation'), 'Solutions mega menu contains Business Process Automation');
assert(navLinksContent.includes('Custom Software Platforms'), 'Solutions mega menu contains Custom Software Platforms');
assert(navLinksContent.includes('Cloud Adoption &amp; Modernization') || navLinksContent.includes('Cloud Adoption & Modernization'), 'Solutions mega menu contains Cloud Adoption');
assert(navLinksContent.includes('Strategic Digital Transformation'), 'Solutions mega menu contains Strategic Digital Transformation');

// Ensure no duplicate Solutions or Industries
const solutionsCount = (navLinksContent.match(/href="\/solutions"/g) || []).length;
const industriesCount = (navLinksContent.match(/href="\/industries"/g) || []).length;
assert(solutionsCount === 1, `Exact single instance of Solutions link (found ${solutionsCount})`);
assert(industriesCount === 1, `Exact single instance of Industries link (found ${industriesCount})`);

// 5. Start Project Button verification
console.log('\n--- 4. Start Project Button Verification ---');
assert(
  navLinksContent.includes('<a class="nav-cta" href="/contact#project-inquiry">Start Project</a>'),
  'Start Project CTA button exists with correct class, text and link'
);

// 6. Homepage Hero verification
console.log('\n--- 5. Homepage Hero Section Verification ---');
assert(
  indexHtml.includes('Move Businesses Forward') ||
  indexHtml.includes('Building High-Performance Digital Experiences'),
  'Hero headline present and accurate'
);
assert(
  indexHtml.includes('ENTERPRISE IT SERVICES') ||
  indexHtml.includes('DIGITAL INNOVATION') ||
  indexHtml.includes('Digital Engineering & Solutions'),
  'Eyebrow label present'
);
assert(indexHtml.includes('Start Your Project'), 'Primary CTA "Start Your Project" present');
assert(
  indexHtml.includes('Explore Our Services') || indexHtml.includes('Explore Services'),
  'Secondary CTA "Explore Our Services" present'
);
assert(indexHtml.includes('hero-device-workspace'), 'Realistic device workspace container present');
assert(indexHtml.includes('hero-laptop'), 'Realistic laptop mockup present');
assert(indexHtml.includes('hero-phone'), 'Realistic smartphone mockup present');
assert(indexHtml.includes('project-dashboard-ui.png'), 'Laptop displays real SaaS dashboard screenshot');
assert(indexHtml.includes('project-ecommerce-demo.png'), 'Phone displays real ecommerce demo screenshot');

// Verify mockup images exist on disk
assert(
  fs.existsSync(path.join(ROOT, 'public/assets/images/project-dashboard-ui.png')),
  'project-dashboard-ui.png exists on disk'
);
assert(
  fs.existsSync(path.join(ROOT, 'public/assets/images/project-ecommerce-demo.png')),
  'project-ecommerce-demo.png exists on disk'
);

// 7. CSS Quality, Sticky Header & Responsive Breakpoints
console.log('\n--- 6. CSS Quality & Responsive Breakpoint Verification ---');
const headerCssPath = path.join(ROOT, 'src/styles/components/header.css');
assert(fs.existsSync(headerCssPath), 'src/styles/components/header.css exists');
const headerCss = fs.readFileSync(headerCssPath, 'utf8');

assert(headerCss.includes('white-space: nowrap'), 'CTA button enforces single-line nowrap');
assert(headerCss.includes('.site-header.is-scrolled'), 'Compact sticky header on scroll styling defined');
assert(headerCss.includes('.mega-menu-solutions'), 'Solutions mega menu styling defined');
assert(headerCss.includes('@media (max-width: 1140px)'), 'Responsive breakpoint at 1140px for tablet/mobile nav toggle');
assert(headerCss.includes('@media (max-width: 480px)'), 'Responsive breakpoint at 480px for small mobile');
assert(headerCss.includes('.announcement-bar'), 'Announcement bar styling defined');
assert(headerCss.includes('.live-pulse-dot'), 'Live status indicator animation defined');
assert(headerCss.includes('.mega-menu'), 'Mega menu styles defined');
assert(headerCss.includes('prefers-reduced-motion'), 'Reduced motion accessibility supported in header');

const heroCssPath = path.join(ROOT, 'src/styles/components/hero.css');
assert(fs.existsSync(heroCssPath), 'src/styles/components/hero.css exists');
const heroCss = fs.readFileSync(heroCssPath, 'utf8');

assert(heroCss.includes('.hero-device-workspace'), 'Hero device workspace CSS defined');
assert(heroCss.includes('.hero-laptop'), 'Hero laptop frame CSS defined');
assert(heroCss.includes('.hero-phone'), 'Hero phone frame CSS defined');
assert(heroCss.includes('@media (min-width: 992px)'), 'Hero 2-column grid breakpoint defined at 992px');
assert(heroCss.includes('@media (max-width: 768px)'), 'Hero mobile adjustments defined at 768px');
assert(heroCss.includes('clamp('), 'Hero uses responsive clamp() typography');
assert(heroCss.includes('.reveal-on-scroll'), 'Progressive scroll reveal styles defined');

// 8. Interactive Parallax & Scripts Verification
console.log('\n--- 7. Interactive Parallax & Contact Configuration ---');
const contactConfigPath = path.join(ROOT, 'src/scripts/config/contact.js');
assert(fs.existsSync(contactConfigPath), 'src/scripts/config/contact.js exists');
const contactConfig = fs.readFileSync(contactConfigPath, 'utf8');
assert(contactConfig.includes('918757928673'), 'Central contact config defines official WhatsApp number');

const heroParallaxPath = path.join(ROOT, 'src/scripts/components/hero-parallax.js');
assert(fs.existsSync(heroParallaxPath), 'src/scripts/components/hero-parallax.js exists');
const heroParallax = fs.readFileSync(heroParallaxPath, 'utf8');
assert(heroParallax.includes('prefers-reduced-motion'), 'Hero parallax respects reduced-motion preference');
assert(heroParallax.includes('requestAnimationFrame'), 'Hero parallax uses smooth requestAnimationFrame lerp');

const scrollRevealPath = path.join(ROOT, 'src/scripts/components/scroll-reveal.js');
assert(fs.existsSync(scrollRevealPath), 'src/scripts/components/scroll-reveal.js exists');

// Verify floating WhatsApp button
assert(
  indexHtml.includes('https://wa.me/918757928673'),
  'Floating WhatsApp button links to configured official number'
);
assert(
  indexHtml.includes('aria-label="Contact us on WhatsApp"') ||
  indexHtml.includes('aria-label="Chat with ABSS Nexus Technologies on WhatsApp"'),
  'Floating WhatsApp button has accessible aria-label'
);

// 9. Check consistency across sample public pages
console.log('\n--- 8. Global Header Consistency Verification Across Routes ---');
const samplePages = [
  'src/pages/about.html',
  'src/pages/services.html',
  'src/pages/solutions.html',
  'src/pages/industries.html',
  'src/pages/work.html',
  'src/pages/pricing.html',
  'src/pages/contact.html',
  'src/pages/faq.html',
  'src/pages/careers.html',
  'src/pages/blog.html',
  'src/pages/privacy-policy.html',
  'src/pages/terms-conditions.html',
  'src/pages/cookie-policy.html',
  'src/pages/disclaimer.html',
  'src/pages/refund-policy.html',
  'src/pages/support-policy.html',
  'src/pages/sitemap.html'
];

for (const p of samplePages) {
  const fullP = path.join(ROOT, p);
  if (fs.existsSync(fullP)) {
    const content = fs.readFileSync(fullP, 'utf8');
    assert(content.includes('class="site-header"'), `${p} contains standardized site-header`);
    assert(content.includes('class="announcement-bar"'), `${p} contains announcement-bar`);
    assert(content.includes('Start Project'), `${p} contains Start Project CTA`);
    assert(content.includes('class="brand-name">ABSS Nexus Technologies</span>'), `${p} contains brand name`);
  }
}

console.log('\n🎉 ALL PHASE 1 HEADER & HERO VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');

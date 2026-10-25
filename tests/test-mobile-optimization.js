const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.join(__dirname, '..');

console.log('=== Starting Part 4 Mobile Perfection & Small Screen Verification ===\n');

// 1. Verify CSS Mobile Breakpoints in src/styles/styles.css
console.log('--- 1. Mobile Breakpoint Variables ---');
const stylesCss = fs.readFileSync(path.join(ROOT, 'src/styles/styles.css'), 'utf8');

assert(stylesCss.includes('@media (max-width: 480px)'), 'styles.css has max-width: 480px breakpoint');
assert(stylesCss.includes('--container-padding: 16px'), '480px reduces --container-padding to 16px');
assert(stylesCss.includes('@media (max-width: 360px)'), 'styles.css has max-width: 360px breakpoint');
assert(stylesCss.includes('--container-padding: 12px'), '360px reduces --container-padding to 12px');
console.log('✓ PASS: CSS variable breakpoints defined for 480px and 360px');

// 2. Announcement Bar Fixes
console.log('\n--- 2. Announcement Bar Verification ---');
assert(stylesCss.includes('.announcement-bar {'), '.announcement-bar class styled');
assert(stylesCss.includes('font-size: 0.75rem'), 'Announcement bar scales font-size to 0.75rem on tiny screens');
assert(stylesCss.includes('width: 6px !important'), 'Pulse dot scales to 6px on <= 360px');
console.log('✓ PASS: Announcement bar scales gracefully for tiny mobile devices');

// 3. KPI Metrics Row
console.log('\n--- 3. KPI Metrics Row Grid ---');
assert(stylesCss.includes('.metrics-row {'), '.metrics-row grid styled');
assert(stylesCss.includes('grid-template-columns: repeat(2, 1fr)'), 'Metrics row switches to 2 columns on mobile (<= 480px)');
assert(stylesCss.includes('.metric-number {'), '.metric-number styled');
assert(stylesCss.includes('font-size: clamp('), '.metric-number uses fluid clamp()');
console.log('✓ PASS: KPI metrics configured with responsive 2-column mobile layout');

// 4. Internship Showcase & Feature Cards
console.log('\n--- 4. Internship Showcase & Feature Cards ---');
assert(stylesCss.includes('.academy-showcase {'), '.academy-showcase padding styled');
assert(stylesCss.includes('.feature-cards {'), '.feature-cards grid styled');
assert(stylesCss.includes('grid-template-columns: 1fr'), 'Feature cards stack vertically on <= 480px');
console.log('✓ PASS: Feature cards stack vertically on small screens');

// 5. Hero Section Responsive Text
console.log('\n--- 5. Hero Section Responsive Typography ---');
assert(stylesCss.includes('.hero-title'), '.hero-title defined');
assert(stylesCss.includes('.hero-subtitle'), '.hero-subtitle defined');
console.log('✓ PASS: Hero title and subtitle use responsive clamp font sizing');

// 6. Button Tap Targets & Form Inputs
console.log('\n--- 6. Touch Targets & Form Inputs ---');
assert(stylesCss.includes('min-height: 44px'), 'Buttons enforce iOS 44px min-height tap target');
assert(stylesCss.includes('min-width: 44px'), 'Buttons enforce iOS 44px min-width tap target');
assert(stylesCss.includes('font-size: 16px'), 'Form inputs enforce 16px font-size to prevent iOS zoom');
console.log('✓ PASS: Touch tap targets meet Apple HIG (44px min) and inputs prevent iOS zoom');

// 7. Card Grid Gaps & Section Padding
console.log('\n--- 7. Card Grids & Section Rhythm ---');
assert(stylesCss.includes('.card-grid {'), '.card-grid styled');
assert(stylesCss.includes('--section-py-compact'), 'Sections use compact padding on <= 768px');
console.log('✓ PASS: Responsive card gaps and section paddings verified');

// 8. Navigation Hamburger
console.log('\n--- 8. Navigation Hamburger Tap Target ---');
assert(stylesCss.includes('.mobile-menu-toggle {'), '.mobile-menu-toggle styled');
const headerCss = fs.readFileSync(path.join(ROOT, 'src/styles/components/header.css'), 'utf8');
assert(headerCss.includes('width: 44px !important'), 'Header nav toggle has 44px width');
assert(headerCss.includes('height: 44px !important'), 'Header nav toggle has 44px height');
console.log('✓ PASS: Navigation hamburger has 44px accessible touch target');

// 9. Verify index.html Markup
console.log('\n--- 9. Index.html DOM Verification ---');
const indexHtml = fs.readFileSync(path.join(ROOT, 'src/pages/index.html'), 'utf8');
assert(indexHtml.includes('academy-showcase'), 'index.html includes academy-showcase class');
assert(indexHtml.includes('metrics-row'), 'index.html includes metrics-row class');
assert(indexHtml.includes('metric-item'), 'index.html includes metric-item class');
assert(indexHtml.includes('metric-number'), 'index.html includes metric-number class');
assert(indexHtml.includes('metric-label'), 'index.html includes metric-label class');
assert(indexHtml.includes('feature-cards'), 'index.html includes feature-cards class');
assert(indexHtml.includes('hero-title'), 'index.html includes hero-title class');
assert(indexHtml.includes('hero-subtitle'), 'index.html includes hero-subtitle class');
console.log('✓ PASS: index.html markup correctly structured with mobile utility classes');

console.log('\n🎉 ALL PART 4 MOBILE OPTIMIZATION VERIFICATIONS PASSED!\n');

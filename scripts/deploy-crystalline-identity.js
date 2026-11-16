const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { generateCrystallineSvg } = require('./build-crystalline-a');

const targetDir = path.join(__dirname, '../public/assets/images/crystalline-apex');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Standalone Vector SVG (Transparent)
const symbolSvg = generateCrystallineSvg({ width: 800, height: 800, withBackground: false });

// 2. Standalone Vector SVG on Obsidian Background
const symbolDarkBgSvg = generateCrystallineSvg({ width: 800, height: 800, withBackground: true });

// Common Defs for Gradients and Filters
const commonDefs = `
    <linearGradient id="gl-bright" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#00F0FF" />
    </linearGradient>
    <linearGradient id="gl-top" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#00D4FF" />
    </linearGradient>
    <linearGradient id="gl-lit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="60%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>
    <linearGradient id="gl-mid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00B4D8" />
      <stop offset="60%" stop-color="#0077B6" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>
    <linearGradient id="gl-sh-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="70%" stop-color="#0052FF" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>
    <linearGradient id="gl-sh-deep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#023E8A" />
      <stop offset="60%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#001845" />
    </linearGradient>
    <linearGradient id="gl-sh-darkest" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#010B1C" />
    </linearGradient>
    <linearGradient id="gl-crease" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#67E8F9" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0.3" />
    </linearGradient>
    <filter id="gl-drop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#00F0FF" flood-opacity="0.3"/>
    </filter>`;

const symbolGroup = `
  <g transform="translate(6, 4) scale(0.72)" filter="url(#gl-drop)">
    <!-- Polygons -->
    <polygon points="50,8 44,28 50,22" fill="url(#gl-top)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 50,22 56,28" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 38,32 44,28" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 56,28 62,32" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    
    <polygon points="50,22 44,28 50,38" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,22 50,38 56,28" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="38,32 28,56 44,28" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="44,28 28,56 36,50" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="44,28 36,50 50,38" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,38 36,50 42,50" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="62,32 56,28 72,56" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="56,28 64,50 72,56" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="56,28 50,38 64,50" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,38 58,50 64,50" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="28,56 18,80 36,50" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 18,80 28,72" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 28,72 36,62" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 42,50 36,62" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="18,80 12,88 28,72" fill="url(#gl-top)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="12,88 24,88 28,72" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="24,88 32,80 28,72" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="28,72 32,80 38,70" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="72,56 64,50 82,80" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 72,72 82,80" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 64,62 72,72" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 64,62 58,50" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="82,80 72,72 88,88" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="88,88 72,72 76,88" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="76,88 72,72 68,80" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="72,72 62,70 68,80" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="36,62 50,62 50,74" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,62 64,62 50,74" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,62 50,74 38,70" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,62 62,70 50,74" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <!-- Outlines -->
    <path d="M 50 8 L 38 32 L 28 56 L 18 80 L 12 88 L 24 88 L 32 80 L 38 70 L 50 74 L 62 70 L 68 80 L 76 88 L 88 88 L 82 80 L 72 56 L 62 32 Z" fill="none" stroke="#00F0FF" stroke-width="0.8"/>
    <path d="M 50 38 L 42 50 L 36 62 L 50 62 L 64 62 L 58 50 Z" fill="none" stroke="#00F0FF" stroke-width="0.8"/>
  </g>`;

// 3. Master Horizontal Brand Lockup (Dark Theme, 1600x480, ViewBox 0 0 280 80)
const lockupDarkSvg = `<svg width="1600" height="480" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>${commonDefs}</defs>
  ${symbolGroup}
  <text x="88" y="42" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#00F0FF">NEXUS</tspan></text>
  <text x="90" y="60" fill="#38BDF8" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="4">TECHNOLOGIES</text>
</svg>`;

// 4. Master Horizontal Brand Lockup (Light Theme)
const lockupLightSvg = `<svg width="1600" height="480" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>${commonDefs}</defs>
  ${symbolGroup}
  <text x="88" y="42" fill="#0F172A" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#0066FF">NEXUS</tspan></text>
  <text x="90" y="60" fill="#0284C7" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="4">TECHNOLOGIES</text>
</svg>`;

// 5. iOS / Android App Icon Squircle (1024x1024)
const appIconSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="app-bg" x1="100" y1="50" x2="924" y2="974" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#070A12" />
      <stop offset="100%" stop-color="#02040A" />
    </linearGradient>
    <radialGradient id="app-halo" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.32" />
      <stop offset="60%" stop-color="#0052FF" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="app-stroke" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#0052FF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#1E293B" stop-opacity="0.4" />
    </linearGradient>
    ${commonDefs}
  </defs>

  <!-- iOS Squircle Shape -->
  <rect x="16" y="16" width="992" height="992" rx="224" fill="url(#app-bg)" stroke="url(#app-stroke)" stroke-width="8" />

  <!-- Ambient Light Halo -->
  <circle cx="512" cy="490" r="400" fill="url(#app-halo)" />

  <!-- Scaled Symbol Centered -->
  <g transform="translate(132, 100) scale(7.4)">
    <!-- Polygons -->
    <polygon points="50,8 44,28 50,22" fill="url(#gl-top)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 50,22 56,28" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 38,32 44,28" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,8 56,28 62,32" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    
    <polygon points="50,22 44,28 50,38" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,22 50,38 56,28" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="38,32 28,56 44,28" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="44,28 28,56 36,50" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="44,28 36,50 50,38" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,38 36,50 42,50" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="62,32 56,28 72,56" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="56,28 64,50 72,56" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="56,28 50,38 64,50" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,38 58,50 64,50" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="28,56 18,80 36,50" fill="url(#gl-bright)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 18,80 28,72" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 28,72 36,62" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,50 42,50 36,62" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="18,80 12,88 28,72" fill="url(#gl-top)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="12,88 24,88 28,72" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="24,88 32,80 28,72" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="28,72 32,80 38,70" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="72,56 64,50 82,80" fill="url(#gl-mid)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 72,72 82,80" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 64,62 72,72" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,50 64,62 58,50" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="82,80 72,72 88,88" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="88,88 72,72 76,88" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="76,88 72,72 68,80" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="72,72 62,70 68,80" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <polygon points="36,62 50,62 50,74" fill="url(#gl-lit)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="50,62 64,62 50,74" fill="url(#gl-sh-light)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="36,62 50,74 38,70" fill="url(#gl-sh-deep)" stroke="url(#gl-crease)" stroke-width="0.35"/>
    <polygon points="64,62 62,70 50,74" fill="url(#gl-sh-darkest)" stroke="url(#gl-crease)" stroke-width="0.35"/>

    <!-- Outlines -->
    <path d="M 50 8 L 38 32 L 28 56 L 18 80 L 12 88 L 24 88 L 32 80 L 38 70 L 50 74 L 62 70 L 68 80 L 76 88 L 88 88 L 82 80 L 72 56 L 62 32 Z" fill="none" stroke="#00F0FF" stroke-width="0.8"/>
    <path d="M 50 38 L 42 50 L 36 62 L 50 62 L 64 62 L 58 50 Z" fill="none" stroke="#00F0FF" stroke-width="0.8"/>
  </g>
</svg>`;

async function main() {
  console.log('Generating 3D Crystalline Multi-Faceted Brand Assets...');

  // Save SVGs
  fs.writeFileSync(path.join(targetDir, 'crystalline-symbol.svg'), symbolSvg);
  fs.writeFileSync(path.join(targetDir, 'crystalline-symbol-dark.svg'), symbolDarkBgSvg);
  fs.writeFileSync(path.join(targetDir, 'crystalline-lockup-dark.svg'), lockupDarkSvg);
  fs.writeFileSync(path.join(targetDir, 'crystalline-lockup-light.svg'), lockupLightSvg);
  fs.writeFileSync(path.join(targetDir, 'crystalline-app-icon.svg'), appIconSvg);

  const symBuf = Buffer.from(symbolSvg);
  const lockupDarkBuf = Buffer.from(lockupDarkSvg);
  const lockupLightBuf = Buffer.from(lockupLightSvg);
  const appIconBuf = Buffer.from(appIconSvg);

  // Symbol Raster Formats
  const sizes = [1024, 512, 256, 128, 64, 32, 16];
  for (const s of sizes) {
    await sharp(symBuf).resize(s, s).png().toFile(path.join(targetDir, `crystalline-symbol-${s}.png`));
    await sharp(symBuf).resize(s, s).webp({ quality: 95 }).toFile(path.join(targetDir, `crystalline-symbol-${s}.webp`));
  }

  // Lockups
  await sharp(lockupDarkBuf).resize(1600, 480).png().toFile(path.join(targetDir, 'crystalline-lockup-1600.png'));
  await sharp(lockupDarkBuf).resize(800, 240).png().toFile(path.join(targetDir, 'crystalline-lockup-800.png'));
  await sharp(lockupLightBuf).resize(1600, 480).png().toFile(path.join(targetDir, 'crystalline-lockup-light-1600.png'));

  // App Icon
  await sharp(appIconBuf).resize(1024, 1024).png().toFile(path.join(targetDir, 'crystalline-app-icon-1024.png'));
  await sharp(appIconBuf).resize(512, 512).png().toFile(path.join(targetDir, 'crystalline-app-icon-512.png'));
  await sharp(appIconBuf).resize(192, 192).png().toFile(path.join(targetDir, 'crystalline-app-icon-192.png'));

  // Copy Subagent 8K Mockup
  const subagentMockupSrc = '/Users/shubhamkumar/.gemini/antigravity/brain/450d5399-ae8a-4348-9ff9-93fa1d9db292/abss_nexus_business_card_mockup_1794835406038.jpg';
  if (fs.existsSync(subagentMockupSrc)) {
    fs.copyFileSync(subagentMockupSrc, path.join(targetDir, 'abss-nexus-card-mockup.jpg'));
    console.log('Copied 8K luxury business card mockup.');
  }

  // Deploy Directly as Master Website Assets in public/assets/images/
  const imgDir = path.join(__dirname, '../public/assets/images');
  await sharp(symBuf).resize(512, 512).png().toFile(path.join(imgDir, 'favicon.png'));
  await sharp(symBuf).resize(512, 512).webp({ quality: 95 }).toFile(path.join(imgDir, 'favicon.webp'));
  await sharp(symBuf).resize(32, 32).png().toFile(path.join(imgDir, 'favicon-32x32.png'));
  await sharp(symBuf).resize(32, 32).webp({ quality: 95 }).toFile(path.join(imgDir, 'favicon-32x32.webp'));
  await sharp(appIconBuf).resize(180, 180).png().toFile(path.join(imgDir, 'apple-touch-icon.png'));
  await sharp(appIconBuf).resize(180, 180).webp({ quality: 95 }).toFile(path.join(imgDir, 'apple-touch-icon.webp'));

  // Master Lockups
  await sharp(lockupDarkBuf).resize(800, 240).png().toFile(path.join(imgDir, 'Logo.png'));
  await sharp(lockupDarkBuf).resize(800, 240).webp({ quality: 95 }).toFile(path.join(imgDir, 'Logo.webp'));
  await sharp(lockupDarkBuf).resize(800, 240).png().toFile(path.join(imgDir, 'LogoGenerated.png'));
  await sharp(lockupDarkBuf).resize(800, 240).webp({ quality: 95 }).toFile(path.join(imgDir, 'LogoGenerated.webp'));

  // Root public/favicon.ico
  await sharp(symBuf).resize(32, 32).toFormat('png').toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('✅ All 3D Crystalline brand assets generated and deployed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

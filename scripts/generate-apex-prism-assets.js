const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/assets/images/apex-prism');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Apex Prism Standalone Vector (Pure SVG, 800x800, ViewBox 0 0 100 100)
const symbolSvg = `<svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="p-left" x1="20" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0052FF" />
      <stop offset="70%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#90E0EF" />
    </linearGradient>
    <linearGradient id="p-right" x1="50" y1="15" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0096C7" />
      <stop offset="50%" stop-color="#023E8A" />
      <stop offset="100%" stop-color="#03045E" />
    </linearGradient>
    <linearGradient id="p-inner" x1="35" y1="52" x2="65" y2="82" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#001845" />
    </linearGradient>
    <filter id="p-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Facet (Illuminated Face) -->
  <path d="M50 14 L18 80 L36 80 L50 48 Z" fill="url(#p-left)" />

  <!-- Right Facet (Shaded Depth Face) -->
  <path d="M50 14 L50 48 L64 80 L82 80 Z" fill="url(#p-right)" />

  <!-- Floating Nexus Core Diamond in Inner Cavity -->
  <path d="M36 80 L50 48 L64 80 L50 68 Z" fill="url(#p-inner)" />

  <!-- Glowing Laser Apex Node -->
  <path d="M50 42 L55 50 L50 58 L45 50 Z" fill="#00F0FF" filter="url(#p-glow)" />
  <circle cx="50" cy="50" r="2.2" fill="#FFFFFF" />

  <!-- Precision Ground Stabilizer Lines -->
  <rect x="22" y="84" width="12" height="2" rx="1" fill="#00D4FF" opacity="0.8" />
  <rect x="66" y="84" width="12" height="2" rx="1" fill="#0052FF" opacity="0.8" />
</svg>`;

// 2. Apex Prism Horizontal Brand Lockup (Dark Background, 1600x480, ViewBox 0 0 280 80)
const lockupDarkSvg = `<svg width="1600" height="480" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="p-left-l" x1="20" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0052FF" />
      <stop offset="70%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#90E0EF" />
    </linearGradient>
    <linearGradient id="p-right-l" x1="50" y1="15" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0096C7" />
      <stop offset="50%" stop-color="#023E8A" />
      <stop offset="100%" stop-color="#03045E" />
    </linearGradient>
    <linearGradient id="p-inner-l" x1="35" y1="52" x2="65" y2="82" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#001845" />
    </linearGradient>
    <filter id="p-glow-l" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Scaled Symbol on Left -->
  <g transform="translate(10, 6) scale(0.68)">
    <path d="M50 14 L18 80 L36 80 L50 48 Z" fill="url(#p-left-l)" />
    <path d="M50 14 L50 48 L64 80 L82 80 Z" fill="url(#p-right-l)" />
    <path d="M36 80 L50 48 L64 80 L50 68 Z" fill="url(#p-inner-l)" />
    <path d="M50 42 L55 50 L50 58 L45 50 Z" fill="#00F0FF" filter="url(#p-glow-l)" />
    <circle cx="50" cy="50" r="2.2" fill="#FFFFFF" />
    <rect x="22" y="84" width="12" height="2" rx="1" fill="#00D4FF" opacity="0.8" />
    <rect x="66" y="84" width="12" height="2" rx="1" fill="#0052FF" opacity="0.8" />
  </g>
  <!-- Typography for Dark Theme -->
  <text x="88" y="42" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#00F0FF">NEXUS</tspan></text>
  <text x="90" y="60" fill="#38BDF8" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="4">TECHNOLOGIES</text>
</svg>`;

// 3. Apex Prism Horizontal Brand Lockup (Light Background, 1600x480)
const lockupLightSvg = `<svg width="1600" height="480" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="p-left-lt" x1="20" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0052FF" />
      <stop offset="70%" stop-color="#00A3FF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="p-right-lt" x1="50" y1="15" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="50%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#0C4A6E" />
    </linearGradient>
    <linearGradient id="p-inner-lt" x1="35" y1="52" x2="65" y2="82" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0C4A6E" />
      <stop offset="100%" stop-color="#082F49" />
    </linearGradient>
  </defs>
  <!-- Scaled Symbol on Left -->
  <g transform="translate(10, 6) scale(0.68)">
    <path d="M50 14 L18 80 L36 80 L50 48 Z" fill="url(#p-left-lt)" />
    <path d="M50 14 L50 48 L64 80 L82 80 Z" fill="url(#p-right-lt)" />
    <path d="M36 80 L50 48 L64 80 L50 68 Z" fill="url(#p-inner-lt)" />
    <path d="M50 42 L55 50 L50 58 L45 50 Z" fill="#0284C7" />
    <circle cx="50" cy="50" r="2.2" fill="#00D4FF" />
    <rect x="22" y="84" width="12" height="2" rx="1" fill="#0284C7" opacity="0.9" />
    <rect x="66" y="84" width="12" height="2" rx="1" fill="#0C4A6E" opacity="0.9" />
  </g>
  <!-- Typography for Light Theme -->
  <text x="88" y="42" fill="#0F172A" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#0066FF">NEXUS</tspan></text>
  <text x="90" y="60" fill="#0284C7" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10.5" letter-spacing="4">TECHNOLOGIES</text>
</svg>`;

// 4. iOS / Android App Icon (1024x1024 Squircle with 3D Depth)
const appIconSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="100" y1="50" x2="924" y2="974" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#080E1C" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <radialGradient id="halo-glow" cx="50%" cy="48%" r="45%">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#0052FF" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="border-stroke" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.6" />
      <stop offset="30%" stop-color="#0052FF" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#1E293B" stop-opacity="0.4" />
    </linearGradient>
    <linearGradient id="p-left-app" x1="20" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0052FF" />
      <stop offset="70%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#E0F2FE" />
    </linearGradient>
    <linearGradient id="p-right-app" x1="50" y1="15" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0096C7" />
      <stop offset="50%" stop-color="#023E8A" />
      <stop offset="100%" stop-color="#03045E" />
    </linearGradient>
    <linearGradient id="p-inner-app" x1="35" y1="52" x2="65" y2="82" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#001845" />
    </linearGradient>
    <filter id="core-glow-app" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- iOS Squircle Shape -->
  <rect x="16" y="16" width="992" height="992" rx="224" fill="url(#bg-grad)" stroke="url(#border-stroke)" stroke-width="8" />

  <!-- Ambient Light Halo -->
  <circle cx="512" cy="490" r="380" fill="url(#halo-glow)" />

  <!-- Scaled Symbol Centered -->
  <g transform="translate(172, 150) scale(6.8)">
    <path d="M50 14 L18 80 L36 80 L50 48 Z" fill="url(#p-left-app)" />
    <path d="M50 14 L50 48 L64 80 L82 80 Z" fill="url(#p-right-app)" />
    <path d="M36 80 L50 48 L64 80 L50 68 Z" fill="url(#p-inner-app)" />
    <path d="M50 42 L55 50 L50 58 L45 50 Z" fill="#00F0FF" filter="url(#core-glow-app)" />
    <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
    <rect x="22" y="84" width="12" height="2" rx="1" fill="#00D4FF" opacity="0.9" />
    <rect x="66" y="84" width="12" height="2" rx="1" fill="#0052FF" opacity="0.9" />
  </g>
</svg>`;

async function main() {
  console.log('Generating Apex Prism master brand assets...');

  // Save SVG files
  fs.writeFileSync(path.join(targetDir, 'apex-prism-symbol.svg'), symbolSvg);
  fs.writeFileSync(path.join(targetDir, 'apex-prism-lockup.svg'), lockupDarkSvg);
  fs.writeFileSync(path.join(targetDir, 'apex-prism-lockup-dark.svg'), lockupDarkSvg);
  fs.writeFileSync(path.join(targetDir, 'apex-prism-lockup-light.svg'), lockupLightSvg);
  fs.writeFileSync(path.join(targetDir, 'apex-prism-app-icon.svg'), appIconSvg);

  const symbolBuffer = Buffer.from(symbolSvg);
  const lockupDarkBuffer = Buffer.from(lockupDarkSvg);
  const lockupLightBuffer = Buffer.from(lockupLightSvg);
  const appIconBuffer = Buffer.from(appIconSvg);

  // Standalone Symbol PNGs & WebPs
  const symbolSizes = [1024, 512, 256, 128, 64, 32, 16];
  for (const size of symbolSizes) {
    await sharp(symbolBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(targetDir, `apex-prism-symbol-${size}.png`));
    await sharp(symbolBuffer)
      .resize(size, size)
      .webp({ quality: 95 })
      .toFile(path.join(targetDir, `apex-prism-symbol-${size}.webp`));
  }

  // Lockups
  await sharp(lockupDarkBuffer)
    .resize(1600, 480)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-lockup-1600.png'));
  await sharp(lockupDarkBuffer)
    .resize(800, 240)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-lockup-800.png'));
  await sharp(lockupLightBuffer)
    .resize(1600, 480)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-lockup-light-1600.png'));

  // App Icon
  await sharp(appIconBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-app-icon-1024.png'));
  await sharp(appIconBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-app-icon-512.png'));
  await sharp(appIconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(targetDir, 'apex-prism-app-icon-192.png'));

  // Update Core Website Logos in public/assets/images/
  const imgDir = path.join(__dirname, '../public/assets/images');
  await sharp(symbolBuffer).resize(512, 512).png().toFile(path.join(imgDir, 'favicon.png'));
  await sharp(symbolBuffer).resize(512, 512).webp({ quality: 95 }).toFile(path.join(imgDir, 'favicon.webp'));
  await sharp(symbolBuffer).resize(32, 32).png().toFile(path.join(imgDir, 'favicon-32x32.png'));
  await sharp(symbolBuffer).resize(32, 32).webp({ quality: 95 }).toFile(path.join(imgDir, 'favicon-32x32.webp'));
  await sharp(appIconBuffer).resize(180, 180).png().toFile(path.join(imgDir, 'apple-touch-icon.png'));
  await sharp(appIconBuffer).resize(180, 180).webp({ quality: 95 }).toFile(path.join(imgDir, 'apple-touch-icon.webp'));

  // Master Logo.png & LogoGenerated.png (Lockups)
  await sharp(lockupDarkBuffer).resize(800, 240).png().toFile(path.join(imgDir, 'Logo.png'));
  await sharp(lockupDarkBuffer).resize(800, 240).webp({ quality: 95 }).toFile(path.join(imgDir, 'Logo.webp'));
  await sharp(lockupDarkBuffer).resize(800, 240).png().toFile(path.join(imgDir, 'LogoGenerated.png'));
  await sharp(lockupDarkBuffer).resize(800, 240).webp({ quality: 95 }).toFile(path.join(imgDir, 'LogoGenerated.webp'));

  // Root public/ favicon.ico (using 32x32 PNG as ico)
  await sharp(symbolBuffer).resize(32, 32).toFormat('png').toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('✅ All Apex Prism master assets generated successfully!');
}

main().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});

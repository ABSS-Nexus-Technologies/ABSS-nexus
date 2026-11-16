import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/assets/images/logos');
fs.mkdirSync(OUT_DIR, { recursive: true });

function layoutArc(str, startDeg, endDeg, yPos = 19.5) {
  const chars = str.split('');
  const n = chars.length;
  const step = (endDeg - startDeg) / (n - 1);
  return chars.map((ch, i) => {
    const angle = (startDeg + i * step).toFixed(2);
    return `<text x="50" y="${yPos}" text-anchor="middle" transform="rotate(${angle} 50 50)">${ch}</text>`;
  }).join('');
}

function layoutLowerArc(str, startDeg, endDeg, yPos = 85.2) {
  const chars = str.split('');
  const n = chars.length;
  const step = (endDeg - startDeg) / (n - 1);
  return chars.map((ch, i) => {
    const angle = (startDeg + i * step).toFixed(2);
    return `<text x="50" y="${yPos}" text-anchor="middle" transform="rotate(${angle} 50 50)">${ch}</text>`;
  }).join('');
}

const logos = {
  // 1. Lettermark Monogram Squircle (1024x1024)
  '1-lettermark': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 80 80',
    svg: `<svg width="1024" height="1024" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lm-bg" x1="6" y1="6" x2="74" y2="74" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#090D18" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="lm-cyan" x1="18" y1="20" x2="26" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0077E6" />
    </linearGradient>
    <linearGradient id="lm-ribbon" x1="24" y1="22" x2="62" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="48%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
    <linearGradient id="lm-white" x1="54" y1="20" x2="62" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <filter id="lm-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="4" y="4" width="72" height="72" rx="18" fill="url(#lm-bg)" />
  <rect x="5" y="5" width="70" height="70" rx="17" stroke="rgba(0, 229, 255, 0.3)" stroke-width="1.5" />
  
  <!-- Left Pillar 'A' -->
  <rect x="18" y="20" width="8.5" height="40" rx="4.25" fill="url(#lm-cyan)" />
  
  <!-- Right Pillar 'N' -->
  <rect x="53.5" y="20" width="8.5" height="40" rx="4.25" fill="url(#lm-white)" />
  
  <!-- Middle Nexus Diagonal Ribbon -->
  <path d="M22 24.5L58 55.5" stroke="url(#lm-ribbon)" stroke-width="8.5" stroke-linecap="round" />
  
  <!-- Central Nexus Energy Core Node -->
  <circle cx="40" cy="40" r="4.5" fill="#FFFFFF" filter="url(#lm-glow)" />
  <circle cx="40" cy="40" r="2.5" fill="#00E5FF" />
</svg>`,
    bgDark: true
  },

  // 2. Wordmark Light (1200x400)
  '2-wordmark': {
    width: 1200,
    height: 400,
    viewBox: '0 0 200 65',
    svg: `<svg width="1200" height="400" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wm-cyan-grad" x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="100%" stop-color="#6366F1" />
    </linearGradient>
  </defs>
  <!-- Main Wordmark -->
  <text x="12" y="36" fill="#0F172A" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="url(#wm-cyan-grad)" font-weight="800">NEXUS</tspan></text>
  
  <!-- Subtitle Divider Accent -->
  <circle cx="16" cy="49" r="3" fill="url(#wm-cyan-grad)" />
  <rect x="23" y="47.8" width="56" height="2.4" rx="1.2" fill="url(#wm-cyan-grad)" />
  
  <!-- Descriptor Line -->
  <text x="86" y="52" fill="#475569" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="8.8" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>`,
    bgDark: false
  },

  // 2. Wordmark Dark (1200x400)
  '2-wordmark-dark': {
    width: 1200,
    height: 400,
    viewBox: '0 0 200 65',
    svg: `<svg width="1200" height="400" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wm-cyan-dark" x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
  </defs>
  <!-- Main Wordmark -->
  <text x="12" y="36" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="url(#wm-cyan-dark)" font-weight="800">NEXUS</tspan></text>
  
  <!-- Subtitle Divider Accent -->
  <circle cx="16" cy="49" r="3" fill="url(#wm-cyan-dark)" />
  <rect x="23" y="47.8" width="56" height="2.4" rx="1.2" fill="url(#wm-cyan-dark)" />
  
  <!-- Descriptor Line -->
  <text x="86" y="52" fill="#38BDF8" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="8.8" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>`,
    bgDark: true
  },

  // 3. Pictorial Mark - Supersonic Origami Nexus Rocket (1024x1024)
  '3-pictorial': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 80 80',
    svg: `<svg width="1024" height="1024" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pm-top" x1="12" y1="12" x2="68" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="pm-side" x1="20" y1="36" x2="64" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="pm-trail" x1="18" y1="52" x2="32" y2="65" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF6B4A" />
      <stop offset="100%" stop-color="#F43F5E" />
    </linearGradient>
  </defs>
  <!-- Orbit Guide -->
  <circle cx="40" cy="40" r="33" stroke="#00E5FF" stroke-opacity="0.28" stroke-width="2" stroke-dasharray="6 5" />
  
  <!-- Supersonic Stealth Jet Facets -->
  <path d="M14 40L65 15L44 45L14 40Z" fill="url(#pm-top)" />
  <path d="M44 45L65 15L52 65L37 49L44 45Z" fill="url(#pm-side)" />
  
  <!-- Speed Trails -->
  <path d="M25 53L17 63M33 57L27 66" stroke="url(#pm-trail)" stroke-width="3.4" stroke-linecap="round" />
  
  <!-- Beacon Node -->
  <circle cx="65" cy="15" r="4.5" fill="#FFFFFF" stroke="#00E5FF" stroke-width="2.5" />
  <circle cx="65" cy="15" r="2" fill="#00E5FF" />
</svg>`,
    bgDark: true
  },

  // 4. Abstract Mark - Interlocking Nexus Bridge (1024x1024)
  '4-abstract': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 80 80',
    svg: `<svg width="1024" height="1024" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ab-left" x1="14" y1="12" x2="32" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="ab-right" x1="48" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="ab-bridge" x1="18" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="48%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>
  
  <!-- Left Pillar -->
  <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="url(#ab-left)" />
  
  <!-- Right Pillar -->
  <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="url(#ab-right)" />
  
  <!-- Dynamic Diagonal Nexus Bridge -->
  <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="url(#ab-bridge)" />
  
  <!-- Center Nexus Diamond Core -->
  <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" />
  <circle cx="40" cy="40" r="2.2" fill="#00E5FF" />
</svg>`,
    bgDark: true
  },

  // 5. Tech Mascot - Cyber Nexus Fox / AI Bot (1024x1024)
  '5-mascot': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 80 80',
    svg: `<svg width="1024" height="1024" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mc-fur" x1="16" y1="12" x2="64" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="60%" stop-color="#0284C7" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="mc-inner" x1="20" y1="18" x2="30" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
  </defs>
  
  <!-- Outer Tech Halo -->
  <circle cx="40" cy="42" r="33" fill="#090D18" stroke="rgba(0, 229, 255, 0.35)" stroke-width="1.5" />
  
  <!-- Left & Right Cyber Ears -->
  <path d="M18 33L15 11L33 23Z" fill="url(#mc-fur)" />
  <path d="M62 33L65 11L47 23Z" fill="url(#mc-fur)" />
  <path d="M19 28L18 16L29 24Z" fill="url(#mc-inner)" />
  <path d="M61 28L62 16L51 24Z" fill="url(#mc-inner)" />
  
  <!-- Head Base -->
  <path d="M16 38C16 26 26 20 40 20C54 20 64 26 64 38C64 53 53 64 40 66C27 64 16 53 16 38Z" fill="url(#mc-fur)" />
  
  <!-- White Cheek Highlights -->
  <path d="M17 41C23 41 29 45 33 52C36 57 38 61 40 66C27 64 17 54 17 41Z" fill="#F8FAFC" />
  <path d="M63 41C57 41 51 45 47 52C44 57 42 61 40 66C53 64 63 54 63 41Z" fill="#F8FAFC" />
  
  <!-- Cyber Visor / Holographic HUD -->
  <rect x="20" y="32" width="40" height="14" rx="7" fill="#0B132B" stroke="#00E5FF" stroke-width="1.5" />
  <circle cx="30" cy="39" r="3.5" fill="#00E5FF" />
  <circle cx="50" cy="39" r="3.5" fill="#00E5FF" />
  <circle cx="31" cy="38" r="1.3" fill="#FFFFFF" />
  <circle cx="51" cy="38" r="1.3" fill="#FFFFFF" />
  
  <!-- Nose & Smile -->
  <path d="M36.5 52C36.5 50.3 38 49.5 40 49.5C42 49.5 43.5 50.3 43.5 52C43.5 53.5 41.5 55 40 55C38.5 55 36.5 53.5 36.5 52Z" fill="#090D18" />
  <path d="M36 58C38.2 60 41.8 60 44 58" stroke="#090D18" stroke-width="2.2" stroke-linecap="round" />
</svg>`,
    bgDark: true
  },

  // 6. Combination Main Light (1470x480)
  '6-combination-main': {
    width: 1470,
    height: 480,
    viewBox: '0 0 255 80',
    svg: `<svg width="1470" height="480" viewBox="0 0 255 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ab-c-left" x1="14" y1="12" x2="32" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="ab-c-right" x1="48" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="ab-c-bridge" x1="18" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="50%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>
  
  <!-- Left Scaled Abstract Mark -->
  <g transform="translate(8, 8) scale(0.8)">
    <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="url(#ab-c-left)" />
    <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="url(#ab-c-right)" />
    <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="url(#ab-c-bridge)" />
    <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" />
  </g>
  
  <!-- Text Lockup -->
  <text x="78" y="42" fill="#0F172A" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#00A3FF">NEXUS</tspan></text>
  <text x="80" y="60" fill="#475569" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="10.5" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>`,
    bgDark: false
  },

  // 6. Combination Main Dark (1470x480)
  '6-combination-main-dark': {
    width: 1470,
    height: 480,
    viewBox: '0 0 255 80',
    svg: `<svg width="1470" height="480" viewBox="0 0 255 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ab-cd-left" x1="14" y1="12" x2="32" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="ab-cd-right" x1="48" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="ab-cd-bridge" x1="18" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>
  
  <!-- Left Scaled Abstract Mark -->
  <g transform="translate(8, 8) scale(0.8)">
    <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="url(#ab-cd-left)" />
    <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="url(#ab-cd-right)" />
    <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="url(#ab-cd-bridge)" />
    <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" />
  </g>
  
  <!-- Text Lockup -->
  <text x="78" y="42" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#00E5FF">NEXUS</tspan></text>
  <text x="80" y="60" fill="#38BDF8" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="10.5" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>`,
    bgDark: true
  },

  // 7. Emblem Badge (1024x1024)
  '7-emblem': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 100 100',
    svg: `<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="em-ring" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
    <linearGradient id="em-core" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="em-mark" x1="36" y1="34" x2="64" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="55%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>
  
  <!-- Outer Discs & Rings -->
  <circle cx="50" cy="50" r="46" fill="url(#em-core)" />
  <circle cx="50" cy="50" r="44.5" stroke="url(#em-ring)" stroke-width="2.5" />
  <circle cx="50" cy="50" r="40.5" stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-dasharray="2 3" />
  
  <!-- Upper Perimeter Text: ABSS NEXUS -->
  <g fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="800" font-size="6.4">
    ${layoutArc('ABSS NEXUS', -50, 50, 19.5)}
  </g>
  
  <!-- Lower Perimeter Text: TECHNOLOGIES -->
  <g fill="#00E5FF" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="5.4">
    ${layoutLowerArc('TECHNOLOGIES', 55, -55, 85.2)}
  </g>
  
  <!-- Diamond Star Pins at 9 and 3 o'clock -->
  <path d="M13 50L15.2 47.8L17.4 50L15.2 52.2Z" fill="#00E5FF" />
  <path d="M82.6 50L84.8 47.8L87 50L84.8 52.2Z" fill="#FF6B4A" />
  
  <!-- Inner Shield Core -->
  <circle cx="50" cy="50" r="24" fill="#090D18" stroke="rgba(255,255,255,0.2)" stroke-width="1.4" />
  <circle cx="50" cy="50" r="21.5" stroke="url(#em-ring)" stroke-opacity="0.5" stroke-width="1" />
  
  <!-- Central Stylized Nexus Core Pillars -->
  <rect x="37.5" y="36" width="6" height="28" rx="3" fill="#00E5FF" />
  <rect x="56.5" y="36" width="6" height="28" rx="3" fill="#8B5CF6" />
  <path d="M40.5 39L59.5 61" stroke="url(#em-mark)" stroke-width="6" stroke-linecap="round" />
  <path d="M50 46.5L53 50L50 53.5L47 50Z" fill="#FFFFFF" />
</svg>`,
    bgDark: true
  },

  // 8. Official Corporate Seal (1024x1024)
  '8-corporate-seal': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 100 100',
    svg: `<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Border Rings -->
  <circle cx="50" cy="50" r="46.5" stroke="#0D2054" stroke-width="2.4" />
  <circle cx="50" cy="50" r="43" stroke="#0D2054" stroke-width="1" />
  <circle cx="50" cy="50" r="25" stroke="#0D2054" stroke-width="1.5" />
  
  <!-- Perimeter Upper Text: • ABSS NEXUS TECHNOLOGIES • -->
  <g fill="#0D2054" font-family="'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="5.6">
    ${layoutArc('• ABSS NEXUS TECHNOLOGIES •', -105, 105, 19)}
  </g>
  
  <!-- Perimeter Lower Text: CORPORATE SEAL • ESTD 2026 -->
  <g fill="#0D2054" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="5.2">
    ${layoutLowerArc('CORPORATE SEAL • ESTD 2026', 60, -60, 86.2)}
  </g>
  
  <!-- Central Emblem Mark -->
  <g transform="translate(31, 31) scale(0.48)">
    <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="#0D2054" />
    <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="#0D2054" />
    <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="#0D2054" />
    <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" />
  </g>
</svg>`,
    bgDark: false
  },

  // 9. Stacked Vertical Centered (1024x1024)
  '9-stacked-vertical': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 100 100',
    svg: `<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sv-left" x1="14" y1="12" x2="32" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="sv-right" x1="48" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="sv-bridge" x1="18" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>
  
  <!-- Centered Scaled Icon Mark -->
  <g transform="translate(24, 6) scale(0.65)">
    <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="url(#sv-left)" />
    <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="url(#sv-right)" />
    <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="url(#sv-bridge)" />
    <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" />
  </g>
  
  <!-- Stacked Centered Typography -->
  <text x="50" y="69" text-anchor="middle" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="12.5" letter-spacing="-0.3">ABSS <tspan fill="#00E5FF">NEXUS</tspan></text>
  <text x="50" y="80" text-anchor="middle" fill="#38BDF8" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="700" font-size="4.5" letter-spacing="2.2">TECHNOLOGIES</text>
</svg>`,
    bgDark: true
  },

  // 10. Social Profile Avatar (1024x1024)
  '10-social-avatar': {
    width: 1024,
    height: 1024,
    viewBox: '0 0 100 100',
    svg: `<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sa-bg" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#090D18" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="sa-cyan" x1="14" y1="12" x2="32" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="sa-violet" x1="48" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#4F46E5" />
    </linearGradient>
    <linearGradient id="sa-bridge" x1="18" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
    <filter id="sa-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Outer Dark Rounded Squircle / Circle -->
  <rect x="0" y="0" width="100" height="100" rx="28" fill="url(#sa-bg)" />
  <circle cx="50" cy="50" r="47" stroke="rgba(0, 229, 255, 0.4)" stroke-width="1.8" />
  <circle cx="50" cy="50" r="44" stroke="rgba(139, 92, 246, 0.2)" stroke-width="1" stroke-dasharray="3 4" />
  
  <!-- Centered Nexus Mark -->
  <g transform="translate(18, 18) scale(0.8)">
    <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20V60C32 64.4183 28.4183 68 24 68C19.5817 68 16 64.4183 16 60V20Z" fill="url(#sa-cyan)" />
    <path d="M48 20C48 15.5817 51.5817 12 56 12C60.4183 12 64 15.5817 64 20V60C64 64.4183 60.4183 68 56 68C51.5817 68 48 64.4183 48 60V20Z" fill="url(#sa-violet)" />
    <path d="M18.2 24.8C15.8 21.1 16.9 16.2 20.6 13.8C24.3 11.4 29.2 12.5 31.6 16.2L61.8 55.2C64.2 58.9 63.1 63.8 59.4 66.2C55.7 68.6 50.8 67.5 48.4 63.8L18.2 24.8Z" fill="url(#sa-bridge)" />
    <path d="M40 33.5L46 40L40 46.5L34 40L40 33.5Z" fill="#FFFFFF" filter="url(#sa-glow)" />
    <circle cx="40" cy="40" r="2.2" fill="#00E5FF" />
  </g>
</svg>`,
    bgDark: true
  }
};

async function main() {
  console.log('Generating complete suite of ABSS Nexus Technologies logos...');

  for (const [name, meta] of Object.entries(logos)) {
    const svgPath = path.join(OUT_DIR, `${name}.svg`);
    const pngPath = path.join(OUT_DIR, `${name}.png`);
    const jpgPath = path.join(OUT_DIR, `${name}.jpg`);
    const webpPath = path.join(OUT_DIR, `${name}.webp`);

    // 1. Write SVG
    fs.writeFileSync(svgPath, meta.svg, 'utf8');

    // 2. Render PNG (Transparent background)
    await sharp(Buffer.from(meta.svg), { density: 300 })
      .resize(meta.width, meta.height)
      .png()
      .toFile(pngPath);

    // 3. Render JPG (Solid background depending on theme)
    const bgColor = meta.bgDark ? '#090D18' : '#FFFFFF';
    await sharp(Buffer.from(meta.svg), { density: 300 })
      .resize(meta.width, meta.height)
      .flatten({ background: bgColor })
      .jpeg({ quality: 95 })
      .toFile(jpgPath);

    // 4. Render WebP
    await sharp(Buffer.from(meta.svg), { density: 300 })
      .resize(meta.width, meta.height)
      .webp({ quality: 95 })
      .toFile(webpPath);

    console.log(`✓ Generated: ${name} (.svg, .png, .jpg, .webp)`);
  }

  // Also update default root logo files in public/assets/images/
  console.log('\nUpdating default site logo files in public/assets/images/...');
  const mainDarkSvg = logos['6-combination-main-dark'].svg;
  const mainLightSvg = logos['6-combination-main'].svg;

  await sharp(Buffer.from(mainDarkSvg), { density: 300 })
    .resize(600, 299, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/assets/images/LogoGenerated.png');

  await sharp(Buffer.from(mainDarkSvg), { density: 300 })
    .resize(600, 299, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile('public/assets/images/LogoGenerated.webp');

  await sharp(Buffer.from(mainLightSvg), { density: 300 })
    .resize(600, 299, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/assets/images/Logo.png');

  await sharp(Buffer.from(mainLightSvg), { density: 300 })
    .resize(600, 299, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile('public/assets/images/Logo.webp');

  console.log('✓ Updated public/assets/images/LogoGenerated.{png,webp} and Logo.{png,webp}');
}

main().catch(err => {
  console.error('Error generating logos:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define the 3D Crystalline Multi-Faceted Letter "A"
// ViewBox: 0 0 100 100
// Coordinates:
// Outer Apex: (50, 8)
// Left Outer Leg: (14, 88)
// Left Outer Bevel: (14, 88) -> (18, 92) -> (32, 92) -> (36, 80)
// Right Outer Leg: (86, 88)
// Right Outer Bevel: (86, 88) -> (82, 92) -> (68, 92) -> (64, 80)
// Inner Triangle (Eye): Top (50, 38), Left (36, 62), Right (64, 62)
// Crossbar Bottom Notch: (50, 72)
//
// Key Feature from User Reference:
// Radial diamond facets on the arms, where facets fan out from nodes on the outer/ridge/inner edges!

function generateCrystallineSvg({ width = 800, height = 800, withBackground = false }) {
  // Vertices:
  const V = {
    // Apex
    top: [50, 8],
    top_spine: [50, 22],
    
    // Left outer edge
    l_out1: [38, 32],
    l_out2: [28, 56],
    l_out3: [18, 80],
    l_foot_tip: [12, 88],
    l_foot_bot: [24, 88],
    l_foot_in: [32, 80],
    
    // Left spine (ridge)
    l_sp1: [44, 28],
    l_sp2: [36, 50],
    l_sp3: [28, 72],

    // Right outer edge
    r_out1: [62, 32],
    r_out2: [72, 56],
    r_out3: [82, 80],
    r_foot_tip: [88, 88],
    r_foot_bot: [76, 88],
    r_foot_in: [68, 80],

    // Right spine (ridge)
    r_sp1: [56, 28],
    r_sp2: [64, 50],
    r_sp3: [72, 72],

    // Inner Triangle (Counter)
    in_top: [50, 38],
    in_l_mid: [42, 50],
    in_bl: [36, 62],
    in_br: [64, 62],
    in_r_mid: [58, 50],
    in_bot_mid: [50, 62],

    // Crossbar bottom notch & center
    cross_notch: [50, 74],
    cross_l_in: [38, 70],
    cross_r_in: [62, 70],
  };

  // Helper to format polygon path from point names
  const poly = (pts) => pts.map(p => `${V[p][0]},${V[p][1]}`).join(' ');

  // Facet Definitions with realistic light angles:
  // We classify facets into:
  // Key Highlight (#00F0FF -> #E0F2FE)
  // Illuminated (#00D4FF -> #38BDF8)
  // Midtone Cyan (#00A8E8 -> #0077B6)
  // Shaded Azure (#0052FF -> #023E8A)
  // Deep Shadow (#03045E -> #001845)

  const facets = [
    // Top Apex Facets
    { id: 'f-top-l', pts: ['top', 'l_sp1', 'top_spine'], grad: 'g-hl-top' },
    { id: 'f-top-r', pts: ['top', 'top_spine', 'r_sp1'], grad: 'g-lit-top' },
    { id: 'f-top-lo', pts: ['top', 'l_out1', 'l_sp1'], grad: 'g-lit' },
    { id: 'f-top-ro', pts: ['top', 'r_sp1', 'r_out1'], grad: 'g-mid' },

    // Upper Spine to Inner Top
    { id: 'f-spin-l', pts: ['top_spine', 'l_sp1', 'in_top'], grad: 'g-sh-light' },
    { id: 'f-spin-r', pts: ['top_spine', 'in_top', 'r_sp1'], grad: 'g-sh-deep' },

    // Left Arm Upper Outer
    { id: 'f-l-up-out', pts: ['l_out1', 'l_out2', 'l_sp1'], grad: 'g-hl-bright' },
    { id: 'f-l-up-in', pts: ['l_sp1', 'l_out2', 'l_sp2'], grad: 'g-lit' },
    { id: 'f-l-in-up', pts: ['l_sp1', 'l_sp2', 'in_top'], grad: 'g-mid' },
    { id: 'f-l-in-mid', pts: ['in_top', 'l_sp2', 'in_l_mid'], grad: 'g-sh-light' },

    // Right Arm Upper Outer (Fan/Jewel Cut like Reference!)
    { id: 'f-r-up-out', pts: ['r_out1', 'r_sp1', 'r_out2'], grad: 'g-lit' },
    { id: 'f-r-up-in', pts: ['r_sp1', 'r_sp2', 'r_out2'], grad: 'g-mid' },
    { id: 'f-r-in-up', pts: ['r_sp1', 'in_top', 'r_sp2'], grad: 'g-sh-deep' },
    { id: 'f-r-in-mid', pts: ['in_top', 'in_r_mid', 'r_sp2'], grad: 'g-sh-darkest' },

    // Left Arm Lower (Mid to Foot)
    { id: 'f-l-mid-out', pts: ['l_out2', 'l_out3', 'l_sp2'], grad: 'g-hl-bright' },
    { id: 'f-l-mid-in', pts: ['l_sp2', 'l_out3', 'l_sp3'], grad: 'g-lit' },
    { id: 'f-l-in-bl', pts: ['l_sp2', 'l_sp3', 'in_bl'], grad: 'g-mid' },
    { id: 'f-l-in-mid2', pts: ['l_sp2', 'in_l_mid', 'in_bl'], grad: 'g-sh-light' },
    { id: 'f-l-foot-out', pts: ['l_out3', 'l_foot_tip', 'l_sp3'], grad: 'g-lit-top' },
    { id: 'f-l-foot-bot', pts: ['l_foot_tip', 'l_foot_bot', 'l_sp3'], grad: 'g-sh-light' },
    { id: 'f-l-foot-in', pts: ['l_foot_bot', 'l_foot_in', 'l_sp3'], grad: 'g-sh-deep' },
    { id: 'f-l-foot-up', pts: ['l_sp3', 'l_foot_in', 'cross_l_in'], grad: 'g-mid' },

    // Right Arm Lower (Mid to Foot - Mirror Diamond Cut)
    { id: 'f-r-mid-out', pts: ['r_out2', 'r_sp2', 'r_out3'], grad: 'g-mid' },
    { id: 'f-r-mid-in', pts: ['r_sp2', 'r_sp3', 'r_out3'], grad: 'g-sh-light' },
    { id: 'f-r-in-br', pts: ['r_sp2', 'in_br', 'r_sp3'], grad: 'g-sh-deep' },
    { id: 'f-r-in-mid2', pts: ['r_sp2', 'in_br', 'in_r_mid'], grad: 'g-sh-darkest' },
    { id: 'f-r-foot-out', pts: ['r_out3', 'r_sp3', 'r_foot_tip'], grad: 'g-lit' },
    { id: 'f-r-foot-bot', pts: ['r_foot_tip', 'r_sp3', 'r_foot_bot'], grad: 'g-sh-light' },
    { id: 'f-r-foot-in', pts: ['r_foot_bot', 'r_sp3', 'r_foot_in'], grad: 'g-sh-deep' },
    { id: 'f-r-foot-up', pts: ['r_sp3', 'cross_r_in', 'r_foot_in'], grad: 'g-sh-darkest' },

    // Crossbar Facets (Chevron Center Bridge)
    { id: 'f-cr-top-l', pts: ['in_bl', 'in_bot_mid', 'cross_notch'], grad: 'g-lit' },
    { id: 'f-cr-top-r', pts: ['in_bot_mid', 'in_br', 'cross_notch'], grad: 'g-sh-light' },
    { id: 'f-cr-bot-l', pts: ['in_bl', 'cross_notch', 'cross_l_in'], grad: 'g-sh-deep' },
    { id: 'f-cr-bot-r', pts: ['in_br', 'cross_r_in', 'cross_notch'], grad: 'g-sh-darkest' },
  ];

  // Outer Perimeter path for crisp metallic border
  const outerPerimeter = `M ${V.top[0]} ${V.top[1]} 
    L ${V.l_out1[0]} ${V.l_out1[1]} 
    L ${V.l_out2[0]} ${V.l_out2[1]} 
    L ${V.l_out3[0]} ${V.l_out3[1]} 
    L ${V.l_foot_tip[0]} ${V.l_foot_tip[1]} 
    L ${V.l_foot_bot[0]} ${V.l_foot_bot[1]} 
    L ${V.l_foot_in[0]} ${V.l_foot_in[1]} 
    L ${V.cross_l_in[0]} ${V.cross_l_in[1]} 
    L ${V.cross_notch[0]} ${V.cross_notch[1]} 
    L ${V.cross_r_in[0]} ${V.cross_r_in[1]} 
    L ${V.r_foot_in[0]} ${V.r_foot_in[1]} 
    L ${V.r_foot_bot[0]} ${V.r_foot_bot[1]} 
    L ${V.r_foot_tip[0]} ${V.r_foot_tip[1]} 
    L ${V.r_out3[0]} ${V.r_out3[1]} 
    L ${V.r_out2[0]} ${V.r_out2[1]} 
    L ${V.r_out1[0]} ${V.r_out1[1]} Z`;

  // Inner Perimeter path
  const innerPerimeter = `M ${V.in_top[0]} ${V.in_top[1]} 
    L ${V.in_l_mid[0]} ${V.in_l_mid[1]} 
    L ${V.in_bl[0]} ${V.in_bl[1]} 
    L ${V.in_bot_mid[0]} ${V.in_bot_mid[1]} 
    L ${V.in_br[0]} ${V.in_br[1]} 
    L ${V.in_r_mid[0]} ${V.in_r_mid[1]} Z`;

  const bgRect = withBackground 
    ? `<rect width="100%" height="100%" fill="#080C14"/>
       <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.15"/>
         <stop offset="70%" stop-color="#0052FF" stop-opacity="0.05"/>
         <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
       </radialGradient>
       <circle cx="50" cy="50" r="45" fill="url(#bg-glow)"/>`
    : '';

  return `<svg width="${width}" height="${height}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Brilliant Highlight Gradient (Directional light catching the top-left facets) -->
    <linearGradient id="g-hl-bright" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#00F0FF" />
    </linearGradient>

    <!-- Top Apex Highlight -->
    <linearGradient id="g-hl-top" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#00D4FF" />
    </linearGradient>

    <!-- Illuminated Cyan Surface -->
    <linearGradient id="g-lit-top" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="60%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>

    <!-- Standard Lit Facet -->
    <linearGradient id="g-lit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="60%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>

    <!-- Midtone Azure Cyan -->
    <linearGradient id="g-mid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00B4D8" />
      <stop offset="60%" stop-color="#0077B6" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>

    <!-- Shaded Depth Facet (Light shadow) -->
    <linearGradient id="g-sh-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="70%" stop-color="#0052FF" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>

    <!-- Shaded Deep Shadow Facet -->
    <linearGradient id="g-sh-deep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#023E8A" />
      <stop offset="60%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#001845" />
    </linearGradient>

    <!-- Darkest Cavity Shadow Facet -->
    <linearGradient id="g-sh-darkest" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03045E" />
      <stop offset="100%" stop-color="#010B1C" />
    </linearGradient>

    <!-- Metallic Embossed Crease Stroke Gradient -->
    <linearGradient id="g-crease-hl" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#67E8F9" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0.3" />
    </linearGradient>

    <!-- Ambient Shadow Filter -->
    <filter id="c-ambient-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.7"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#00F0FF" flood-opacity="0.25"/>
    </filter>
  </defs>

  ${bgRect}

  <g filter="url(#c-ambient-shadow)">
    <!-- Multi-Faceted Triangular Polygons -->
    ${facets.map(f => `
    <polygon id="${f.id}" points="${poly(f.pts)}" fill="url(#${f.grad})" stroke="url(#g-crease-hl)" stroke-width="0.35" stroke-linejoin="round"/>
    `).join('')}

    <!-- High-Precision Metallic Outer Border -->
    <path d="${outerPerimeter}" fill="none" stroke="#00F0FF" stroke-width="0.8" stroke-linejoin="round" stroke-opacity="0.95"/>
    <path d="${outerPerimeter}" fill="none" stroke="#FFFFFF" stroke-width="0.25" stroke-linejoin="round" stroke-opacity="0.8"/>

    <!-- High-Precision Metallic Inner Border -->
    <path d="${innerPerimeter}" fill="none" stroke="#00F0FF" stroke-width="0.8" stroke-linejoin="round" stroke-opacity="0.95"/>
    <path d="${innerPerimeter}" fill="none" stroke="#FFFFFF" stroke-width="0.25" stroke-linejoin="round" stroke-opacity="0.8"/>
  </g>
</svg>`;
}

module.exports = { generateCrystallineSvg };

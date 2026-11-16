import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.abspath('public/assets/images/fresh-concepts')
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Concept 1: The Quantum Nexus Ribbon (Infinity A + N)
svg_concept_1 = """<svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="q-ribbon-1" x1="20" y1="85" x2="50" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0066FF" />
      <stop offset="60%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>
    <linearGradient id="q-ribbon-2" x1="50" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#7928CA" />
      <stop offset="100%" stop-color="#FF0080" />
    </linearGradient>
    <linearGradient id="q-cross" x1="30" y1="58" x2="70" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#7928CA" />
      <stop offset="100%" stop-color="#0066FF" />
    </linearGradient>
    <filter id="q-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Ascending Ribbon -->
  <path d="M22 82 C20 72 24 55 36 34 L50 14 L50 26 L39 44 C31 58 29 68 31 76 Z" fill="url(#q-ribbon-1)" />

  <!-- Right Descending Loop -->
  <path d="M50 14 L64 34 C76 55 80 72 78 82 L69 76 C71 68 69 58 61 44 L50 26 Z" fill="url(#q-ribbon-2)" />

  <!-- Crossover Nexus Bridge (The 'N' loop inside the 'A') -->
  <path d="M28 62 C34 56 42 56 50 62 C58 68 66 68 72 62 L75 68 C66 76 56 76 48 68 C40 60 34 60 25 68 Z" fill="url(#q-cross)" />

  <!-- Central Nexus Energy Core Spark -->
  <circle cx="50" cy="50" r="5" fill="#00F0FF" filter="url(#q-glow)" />
  <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
</svg>"""

# 2. Concept 2: The Apex Prism (3D Isometric Delta)
svg_concept_2 = """<svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect x="22" y="84" width="12" height="2" rx="1" fill="#00D4FF" opacity="0.6" />
  <rect x="66" y="84" width="12" height="2" rx="1" fill="#0052FF" opacity="0.6" />
</svg>"""

# 3. Concept 3: The Kinetic Blades (Aerodynamic Precision 'A')
svg_concept_3 = """<svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="kb-left" x1="20" y1="85" x2="48" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0066FF" />
      <stop offset="100%" stop-color="#00F0FF" />
    </linearGradient>
    <linearGradient id="kb-right" x1="52" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#7928CA" />
    </linearGradient>
    <linearGradient id="kb-beam" x1="15" y1="58" x2="85" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#00F0FF" />
    </linearGradient>
    <filter id="kb-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Fin Blade -->
  <path d="M46 16 L22 82 L33 82 L50 32 Z" fill="url(#kb-left)" />

  <!-- Right Fin Blade -->
  <path d="M54 16 L50 32 L67 82 L78 82 Z" fill="url(#kb-right)" />

  <!-- Top Apex Laser Bridge -->
  <path d="M46 16 L50 12 L54 16 L50 20 Z" fill="#FFFFFF" />

  <!-- Horizontal Laser Nexus Beam -->
  <rect x="24" y="55" width="52" height="4.5" rx="2.25" fill="url(#kb-beam)" filter="url(#kb-glow)" />
  <circle cx="50" cy="57.25" r="4.5" fill="#FFFFFF" />
  <circle cx="50" cy="57.25" r="2" fill="#00F0FF" />
</svg>"""

# 4. Concept 4: The Cyber Hyper-Hexagon (Interconnected Matrix 'A')
svg_concept_4 = """<svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hh-outer" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#0066FF" />
      <stop offset="100%" stop-color="#7928CA" />
    </linearGradient>
    <linearGradient id="hh-core" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>
    <filter id="hh-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Outer Isometric Hexagon Framework -->
  <path d="M50 12 L84 31 L84 69 L50 88 L16 69 L16 31 Z" stroke="rgba(0, 240, 255, 0.25)" stroke-width="2" stroke-dasharray="4 4" fill="none" />

  <!-- Internal 'A' Geometric Struts -->
  <!-- Left Leg -->
  <path d="M50 16 L20 70 L30 70 L50 32 Z" fill="url(#hh-outer)" />
  <!-- Right Leg -->
  <path d="M50 16 L50 32 L70 70 L80 70 Z" fill="url(#hh-outer)" />
  <!-- Center Nexus Cross-Truss -->
  <path d="M34 50 L66 50 L50 78 Z" stroke="url(#hh-core)" stroke-width="3" stroke-linejoin="round" fill="none" />

  <!-- Hexagonal Corner Vertex Pins -->
  <circle cx="50" cy="16" r="3.5" fill="#00F0FF" />
  <circle cx="20" cy="70" r="3.5" fill="#0066FF" />
  <circle cx="80" cy="70" r="3.5" fill="#7928CA" />

  <!-- Core Quantum Energy Singularity -->
  <circle cx="50" cy="50" r="5" fill="#00F0FF" filter="url(#hh-glow)" />
  <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
</svg>"""

concepts = {
    'concept-1-quantum-nexus': (svg_concept_1, "Concept 1: The Quantum Nexus Loop", "Continuous impossible geometric ribbon forming an intertwined 'A' and 'N' monogram."),
    'concept-2-apex-prism': (svg_concept_2, "Concept 2: The Apex Prism", "Sharp 3D isometric faceted delta/chevron pyramid with glowing laser apex cavity."),
    'concept-3-kinetic-blades': (svg_concept_3, "Concept 3: The Kinetic Blades", "Aerodynamic precision-cut geometric blades forming an ultra-fast 'A' with laser nexus beam."),
    'concept-4-hyper-hexagon': (svg_concept_4, "Concept 4: The Cyber Hyper-Hexagon", "Interconnected isometric honeycomb matrix with quantum energy singularity at the center.")
}

for slug, (svg_code, title, desc) in concepts.items():
    svg_path = os.path.join(OUT_DIR, f"{slug}.svg")
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_code)

print("All 4 fresh vector concept SVGs written successfully!")

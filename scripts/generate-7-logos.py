import os
import math
import numpy as np
from PIL import Image

OUT_DIRS = [
    os.path.abspath('public/logos'),
    os.path.abspath('public/assets/images/logos')
]
for d in OUT_DIRS:
    os.makedirs(d, exist_ok=True)

# 1. Load and prepare high-res master A-Orbital logo mark from user upload
src_user_upload = '/Users/shubhamkumar/.gemini/antigravity/brain/450d5399-ae8a-4348-9ff9-93fa1d9db292/.user_uploaded/media_1794833151256_ed479628.jpg'
src_img = Image.open(src_user_upload).convert('RGB')
arr = np.array(src_img, dtype=np.float32) / 255.0

# Alpha matting
diff = 1.0 - np.min(arr, axis=2)
alpha = np.clip(diff / 0.82, 0.0, 1.0)
alpha = np.where(diff < 0.008, 0.0, alpha)

safe_alpha = np.maximum(alpha[:, :, np.newaxis], 1e-4)
fg = np.clip((arr - (1.0 - safe_alpha)) / safe_alpha, 0.0, 1.0)

rgba = np.dstack([fg * 255.0, alpha * 255.0]).astype(np.uint8)
cutout = Image.fromarray(rgba, 'RGBA')
bbox = cutout.getbbox()
a_cropped = cutout.crop(bbox)

# Save master transparent A mark
master_1024 = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
w, h = a_cropped.size
scale = min(920.0 / w, 920.0 / h)
new_w, new_h = int(w * scale), int(h * scale)
scaled_a = a_cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
master_1024.paste(scaled_a, ((1024 - new_w) // 2, (1024 - new_h) // 2))

# Helper to layout curved text for SVG
def layout_arc(text, start_deg, end_deg, y_pos=19.5, center_x=50, center_y=50):
    chars = list(text)
    n = len(chars)
    step = (end_deg - start_deg) / (n - 1)
    res = []
    for i, ch in enumerate(chars):
        angle = start_deg + i * step
        res.append(f'<text x="{center_x}" y="{y_pos}" text-anchor="middle" transform="rotate({angle:.2f} {center_x} {center_y})">{ch}</text>')
    return "".join(res)

def layout_lower_arc(text, start_deg, end_deg, y_pos=85.2, center_x=50, center_y=50):
    chars = list(text)
    n = len(chars)
    step = (end_deg - start_deg) / (n - 1)
    res = []
    for i, ch in enumerate(chars):
        angle = start_deg + i * step
        res.append(f'<text x="{center_x}" y="{y_pos}" text-anchor="middle" transform="rotate({angle:.2f} {center_x} {center_y})">{ch}</text>')
    return "".join(res)

# Vector definition of the A-Orbital mark (scaled to fit viewBox 0 0 100 100)
A_VECTOR_PATH = """
  <g id="a-orbital-crest">
    <!-- Letter A Core (Beveled 3D Tech Blue) -->
    <!-- Left Leg -->
    <path d="M47 18 L50 18 L68 62 L57 65 L48 42 L34 74 L19 76 L47 18 Z" fill="url(#a-grad-cyan)" />
    <!-- Left Leg Bevel / Shadow -->
    <path d="M47 18 L49 18 L34 74 L19 76 Z" fill="url(#a-grad-dark)" opacity="0.6" />
    <!-- Left Foot Base Cutout -->
    <path d="M19 76 L34 74 L21 86 L13 86 Z" fill="url(#a-grad-dark)" />
    <!-- Right Leg Lower Foot (Emerging below orbit) -->
    <path d="M62 67 L73 67 L84 86 L70 86 Z" fill="url(#a-grad-dark)" />
    <!-- Inner Triangular Core -->
    <path d="M48 42 L57 65 L34 74 Z" fill="#03045E" opacity="0.85" />

    <!-- Planetary Orbital Ring (Cyan-Blue Glossy Torus) -->
    <path d="M7 74 C6 79 11 84 21 85 C42 86 65 75 80 61 C86 55 88 50 85 46 C82 42 74 41 63 44 C59 45 60 48 63 47 C72 45 78 45 80 48 C82 51 78 56 73 60 C58 73 37 82 19 80 C13 79 10 77 10 73 C10 70 14 67 20 64 C22 63 21 61 19 62 C11 66 7 70 7 74 Z" fill="url(#orbit-grad)" />

    <!-- Ascending Digital Pixel Cubes (Cyber Cloud Stream) -->
    <rect x="64" y="34" width="6.5" height="6.5" rx="1" fill="url(#pixel-grad)" />
    <rect x="75" y="34" width="5.5" height="5.5" rx="1" fill="url(#pixel-grad)" />
    <rect x="70" y="29" width="5.5" height="5.5" rx="1" fill="url(#pixel-grad)" />
    <rect x="77" y="25" width="6.5" height="6.5" rx="1" fill="url(#pixel-grad)" />
    <rect x="85" y="20" width="6" height="6" rx="1" fill="url(#pixel-grad)" />
  </g>
"""

SHARED_DEFS = """
  <defs>
    <linearGradient id="a-grad-cyan" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="45%" stop-color="#0096C7" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>
    <linearGradient id="a-grad-dark" x1="15" y1="30" x2="85" y2="90" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="50%" stop-color="#023E8A" />
      <stop offset="100%" stop-color="#03045E" />
    </linearGradient>
    <linearGradient id="orbit-grad" x1="5" y1="85" x2="90" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="30%" stop-color="#0096C7" />
      <stop offset="70%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#90E0EF" />
    </linearGradient>
    <linearGradient id="pixel-grad" x1="60" y1="40" x2="95" y2="18" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#48CAE4" />
    </linearGradient>
    <linearGradient id="wm-cyan-grad" x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>
    <linearGradient id="wm-cyan-dark" x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="lm-dark-bg" x1="6" y1="6" x2="74" y2="74" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#141E33" />
      <stop offset="100%" stop-color="#060913" />
    </linearGradient>
    <linearGradient id="em-ring" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="50%" stop-color="#0077B6" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>
    <linearGradient id="em-core" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
  </defs>
"""

# 2. Define All 7 (+1 Corporate Seal) SVG Templates
svg_templates = {
    # 1. Lettermark: A-Orbital monogram in midnight squircle
    '1-lettermark': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': True,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Squircle Container -->
  <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#lm-dark-bg)" />
  <rect x="6.5" y="6.5" width="87" height="87" rx="22.5" stroke="rgba(0, 212, 255, 0.35)" stroke-width="2" />
  <circle cx="50" cy="50" r="42" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="3 4" />
  <!-- Centered A-Orbital Mark -->
  <g transform="translate(4, 3) scale(0.92)">
    {A_VECTOR_PATH}
  </g>
</svg>"""
    },

    # 2. Wordmark Light
    '2-wordmark': {
        'width': 1320, 'height': 420, 'viewBox': '0 0 200 65', 'bg_dark': False,
        'svg': f"""<svg width="1320" height="420" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <text x="12" y="36" fill="#0F172A" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="url(#wm-cyan-grad)" font-weight="800">NEXUS</tspan></text>
  <circle cx="16" cy="49" r="3" fill="url(#wm-cyan-grad)" />
  <rect x="23" y="47.8" width="56" height="2.4" rx="1.2" fill="url(#wm-cyan-grad)" />
  <text x="86" y="52" fill="#475569" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="8.8" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>"""
    },

    # 2. Wordmark Dark
    '2-wordmark-dark': {
        'width': 1320, 'height': 420, 'viewBox': '0 0 200 65', 'bg_dark': True,
        'svg': f"""<svg width="1320" height="420" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <text x="12" y="36" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="url(#wm-cyan-dark)" font-weight="800">NEXUS</tspan></text>
  <circle cx="16" cy="49" r="3" fill="url(#wm-cyan-dark)" />
  <rect x="23" y="47.8" width="56" height="2.4" rx="1.2" fill="url(#wm-cyan-dark)" />
  <text x="86" y="52" fill="#38BDF8" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="8.8" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>"""
    },

    # 3. Pictorial Mark: A-Orbital Rocket / Launch Crest
    '3-pictorial': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': True,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Radar Orbit Rings -->
  <circle cx="50" cy="50" r="44" stroke="#00D4FF" stroke-opacity="0.22" stroke-width="2" stroke-dasharray="6 5" />
  <circle cx="50" cy="50" r="36" stroke="#0077B6" stroke-opacity="0.18" stroke-width="1.2" />
  <!-- Speed lines -->
  <path d="M22 68 L14 78 M30 73 L24 82" stroke="#00D4FF" stroke-width="3" stroke-linecap="round" />
  <!-- A-Orbital Core -->
  <g transform="translate(1, 0)">
    {A_VECTOR_PATH}
  </g>
  <!-- Launch Beacon Star -->
  <circle cx="88" cy="23" r="4.5" fill="#FFFFFF" stroke="#00D4FF" stroke-width="2.5" />
  <circle cx="88" cy="23" r="2" fill="#00D4FF" />
</svg>"""
    },

    # 4. Abstract Mark: Pure Standalone A-Orbital Symbol
    '4-abstract': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': True,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Clean Standalone A-Orbital Mark -->
  <g transform="translate(2, 3) scale(0.96)">
    {A_VECTOR_PATH}
  </g>
</svg>"""
    },

    # 5. Mascot: Nexi Cyber Fox with A-Orbital Holographic HUD
    '5-mascot': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': True,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Outer Tech Halo -->
  <circle cx="50" cy="52" r="42" fill="#090D18" stroke="rgba(0, 212, 255, 0.4)" stroke-width="2" />
  
  <!-- Cyber Fox Ears -->
  <path d="M22 41 L19 14 L41 29 Z" fill="url(#a-grad-cyan)" />
  <path d="M78 41 L81 14 L59 29 Z" fill="url(#a-grad-cyan)" />
  <path d="M24 35 L23 20 L37 30 Z" fill="#90E0EF" />
  <path d="M76 35 L77 20 L63 30 Z" fill="#90E0EF" />
  
  <!-- Head Contour -->
  <path d="M20 47 C20 32 33 25 50 25 C67 25 80 32 80 47 C80 66 66 80 50 82 C34 80 20 66 20 47 Z" fill="url(#a-grad-dark)" />
  <!-- White Facial Accents -->
  <path d="M21 51 C29 51 36 56 41 65 C45 71 47 76 50 82 C34 80 21 67 21 51 Z" fill="#F8FAFC" />
  <path d="M79 51 C71 51 64 56 59 65 C55 71 53 76 50 82 C66 80 79 67 79 51 Z" fill="#F8FAFC" />
  
  <!-- Cyber Visor / HUD -->
  <rect x="25" y="40" width="50" height="17" rx="8.5" fill="#0B132B" stroke="#00D4FF" stroke-width="1.8" />
  <circle cx="37" cy="48.5" r="4.2" fill="#00D4FF" />
  <circle cx="63" cy="48.5" r="4.2" fill="#00D4FF" />
  <circle cx="38.5" cy="47" r="1.5" fill="#FFFFFF" />
  <circle cx="64.5" cy="47" r="1.5" fill="#FFFFFF" />
  
  <!-- Mini A-Orbital Hologram on Center Visor -->
  <g transform="translate(46, 42) scale(0.12)">
    {A_VECTOR_PATH}
  </g>
  
  <!-- Nose & Smile -->
  <path d="M45.5 65 C45.5 63 47.5 62 50 62 C52.5 62 54.5 63 54.5 65 C54.5 67 52 69 50 69 C48 69 45.5 67 45.5 65 Z" fill="#090D18" />
  <path d="M45 72 C47.5 75 52.5 75 55 72" stroke="#090D18" stroke-width="2.6" stroke-linecap="round" />
</svg>"""
    },

    # 6. Combination Main Light (Flagship Main Logo)
    '6-combination-main': {
        'width': 1680, 'height': 520, 'viewBox': '0 0 260 80', 'bg_dark': False,
        'svg': f"""<svg width="1680" height="520" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Left A-Orbital Mark -->
  <g transform="translate(6, 6) scale(0.68)">
    {A_VECTOR_PATH}
  </g>
  <!-- Right Stacked Wordmark -->
  <text x="78" y="42" fill="#0F172A" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#0077B6">NEXUS</tspan></text>
  <text x="80" y="60" fill="#475569" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="10.5" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>"""
    },

    # 6. Combination Main Dark (Flagship Main Logo Dark)
    '6-combination-main-dark': {
        'width': 1680, 'height': 520, 'viewBox': '0 0 260 80', 'bg_dark': True,
        'svg': f"""<svg width="1680" height="520" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Left A-Orbital Mark -->
  <g transform="translate(6, 6) scale(0.68)">
    {A_VECTOR_PATH}
  </g>
  <!-- Right Stacked Wordmark -->
  <text x="78" y="42" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="28" letter-spacing="-0.5">ABSS <tspan fill="#00D4FF">NEXUS</tspan></text>
  <text x="80" y="60" fill="#38BDF8" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="10.5" letter-spacing="3.4">TECHNOLOGIES</text>
</svg>"""
    },

    # 7. Emblem: Circular Credential Seal with Curved Typography
    '7-emblem': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': True,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
{SHARED_DEFS}
  <!-- Outer Seal Discs -->
  <circle cx="50" cy="50" r="46" fill="url(#em-core)" />
  <circle cx="50" cy="50" r="44.5" stroke="url(#em-ring)" stroke-width="2.5" />
  <circle cx="50" cy="50" r="40.5" stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-dasharray="2 3" />

  <!-- Curved Top Seal Text: ABSS NEXUS -->
  <g fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="6.4">
    {layout_arc('ABSS NEXUS', -50, 50, 19.5)}
  </g>

  <!-- Curved Bottom Seal Text: TECHNOLOGIES -->
  <g fill="#00D4FF" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="5.4">
    {layout_lower_arc('TECHNOLOGIES', 55, -55, 85.2)}
  </g>

  <!-- Diamond Star Pins at 9 and 3 o'clock -->
  <path d="M13 50L15.2 47.8L17.4 50L15.2 52.2Z" fill="#00D4FF" />
  <path d="M82.6 50L84.8 47.8L87 50L84.8 52.2Z" fill="#0077B6" />

  <!-- Inner Medallion Border -->
  <circle cx="50" cy="50" r="24" fill="#090D18" stroke="rgba(255,255,255,0.2)" stroke-width="1.4" />
  <circle cx="50" cy="50" r="21.5" stroke="url(#em-ring)" stroke-opacity="0.45" stroke-width="1" />

  <!-- Center A-Orbital Crest -->
  <g transform="translate(29, 28) scale(0.42)">
    {A_VECTOR_PATH}
  </g>
</svg>"""
    },

    # 8. Official Corporate Seal (Stamp)
    '8-corporate-seal': {
        'width': 1024, 'height': 1024, 'viewBox': '0 0 100 100', 'bg_dark': False,
        'svg': f"""<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Double Stamp Outer Rings -->
  <circle cx="50" cy="50" r="46.5" stroke="#162B7A" stroke-width="2.4" />
  <circle cx="50" cy="50" r="43" stroke="#162B7A" stroke-width="1" />
  <circle cx="50" cy="50" r="25" stroke="#162B7A" stroke-width="1.5" />

  <!-- Curved Top Seal Text: • ABSS NEXUS TECHNOLOGIES • -->
  <g fill="#162B7A" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="800" font-size="5.6">
    {layout_arc('• ABSS NEXUS TECHNOLOGIES •', -105, 105, 19)}
  </g>

  <!-- Curved Bottom Seal Text: CORPORATE SEAL • ESTD 2026 -->
  <g fill="#162B7A" font-family="'Inter', -apple-system, sans-serif" font-weight="800" font-size="5.2">
    {layout_lower_arc('CORPORATE SEAL • ESTD 2026', 60, -60, 86.2)}
  </g>

  <!-- Center Monochrome A-Orbital Crest -->
  <g transform="translate(29, 29) scale(0.42)">
    <!-- Letter A -->
    <path d="M47 18 L50 18 L68 62 L57 65 L48 42 L34 74 L19 76 L47 18 Z" fill="#162B7A" />
    <path d="M19 76 L34 74 L21 86 L13 86 Z" fill="#162B7A" />
    <path d="M62 67 L73 67 L84 86 L70 86 Z" fill="#162B7A" />
    <path d="M7 74 C6 79 11 84 21 85 C42 86 65 75 80 61 C86 55 88 50 85 46 C82 42 74 41 63 44 C59 45 60 48 63 47 C72 45 78 45 80 48 C82 51 78 56 73 60 C58 73 37 82 19 80 C13 79 10 77 10 73 C10 70 14 67 20 64 C22 63 21 61 19 62 C11 66 7 70 7 74 Z" fill="#162B7A" />
    <rect x="64" y="34" width="6.5" height="6.5" rx="1" fill="#162B7A" />
    <rect x="75" y="34" width="5.5" height="5.5" rx="1" fill="#162B7A" />
    <rect x="70" y="29" width="5.5" height="5.5" rx="1" fill="#162B7A" />
    <rect x="77" y="25" width="6.5" height="6.5" rx="1" fill="#162B7A" />
    <rect x="85" y="20" width="6" height="6" rx="1" fill="#162B7A" />
  </g>
</svg>"""
    }
}

# 3. Write SVGs and render high-res PNGs / JPGs / WebPs using PIL and master cutout
print("Generating complete 7-type logo suite for ABSS Nexus Technologies...")

for name, meta in svg_templates.items():
    svg_content = meta['svg']
    w, h = meta['width'], meta['height']
    bg_dark = meta['bg_dark']

    # For each directory (public/logos and public/assets/images/logos)
    for out_dir in OUT_DIRS:
        svg_file = os.path.join(out_dir, f"{name}.svg")
        png_file = os.path.join(out_dir, f"{name}.png")
        jpg_file = os.path.join(out_dir, f"{name}.jpg")
        webp_file = os.path.join(out_dir, f"{name}.webp")

        with open(svg_file, 'w', encoding='utf-8') as f:
            f.write(svg_content)

print("SVGs written successfully. Now generating composite high-res PNG/JPG assets...")

# Specialized high-res raster rendering for each logo type
def build_raster_logos():
    # 1. '4-abstract': Standalone master A mark
    abstract_png = master_1024.copy()

    # 2. '1-lettermark': Master A mark placed inside squircle
    lm_canvas = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    # Draw squircle background on lm_canvas using PIL
    from PIL import ImageDraw
    draw = ImageDraw.Draw(lm_canvas)
    draw.rounded_rectangle([40, 40, 984, 984], radius=240, fill=(15, 23, 42, 255), outline=(0, 212, 255, 90), width=18)
    a_for_lm = scaled_a.resize((int(new_w * 0.78), int(new_h * 0.78)), Image.Resampling.LANCZOS)
    lm_canvas.paste(a_for_lm, ((1024 - a_for_lm.width)//2, (1024 - a_for_lm.height)//2), a_for_lm)

    # 3. '6-combination-main' (Light) & '6-combination-main-dark'
    from PIL import ImageFont
    # Try finding Space Grotesk or Helvetica
    font_path = "/System/Library/Fonts/Helvetica.ttc"
    try:
        font_main = ImageFont.truetype(font_path, 130)
        font_sub = ImageFont.truetype(font_path, 48)
    except Exception:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # 6-combination-main (Light, 1680x520)
    comb_light = Image.new('RGBA', (1680, 520), (0, 0, 0, 0))
    a_for_comb = scaled_a.resize((420, 420), Image.Resampling.LANCZOS)
    comb_light.paste(a_for_comb, (60, 50), a_for_comb)
    draw_cl = ImageDraw.Draw(comb_light)
    draw_cl.text((540, 150), "ABSS ", fill=(15, 23, 42, 255), font=font_main)
    # Nexus in cyan
    bbox_abss = draw_cl.textbbox((540, 150), "ABSS ", font=font_main)
    draw_cl.text((bbox_abss[2], 150), "NEXUS", fill=(0, 119, 182, 255), font=font_main)
    draw_cl.text((545, 290), "TECHNOLOGIES", fill=(71, 85, 105, 255), font=font_sub)

    # 6-combination-main-dark (Dark, 1680x520)
    comb_dark = Image.new('RGBA', (1680, 520), (0, 0, 0, 0))
    comb_dark.paste(a_for_comb, (60, 50), a_for_comb)
    draw_cd = ImageDraw.Draw(comb_dark)
    draw_cd.text((540, 150), "ABSS ", fill=(255, 255, 255, 255), font=font_main)
    bbox_abss_d = draw_cd.textbbox((540, 150), "ABSS ", font=font_main)
    draw_cd.text((bbox_abss_d[2], 150), "NEXUS", fill=(0, 212, 255, 255), font=font_main)
    draw_cd.text((545, 290), "TECHNOLOGIES", fill=(56, 189, 248, 255), font=font_sub)

    # 2-wordmark (Light, 1320x420)
    wm_light = Image.new('RGBA', (1320, 420), (0, 0, 0, 0))
    draw_wl = ImageDraw.Draw(wm_light)
    draw_wl.text((100, 120), "ABSS ", fill=(15, 23, 42, 255), font=font_main)
    bbox_w = draw_wl.textbbox((100, 120), "ABSS ", font=font_main)
    draw_wl.text((bbox_w[2], 120), "NEXUS", fill=(0, 119, 182, 255), font=font_main)
    draw_wl.ellipse([110, 260, 134, 284], fill=(0, 119, 182, 255))
    draw_wl.rectangle([145, 268, 520, 276], fill=(0, 119, 182, 255))
    draw_wl.text((540, 254), "TECHNOLOGIES", fill=(71, 85, 105, 255), font=font_sub)

    # 2-wordmark-dark (Dark, 1320x420)
    wm_dark = Image.new('RGBA', (1320, 420), (0, 0, 0, 0))
    draw_wd = ImageDraw.Draw(wm_dark)
    draw_wd.text((100, 120), "ABSS ", fill=(255, 255, 255, 255), font=font_main)
    bbox_wd = draw_wd.textbbox((100, 120), "ABSS ", font=font_main)
    draw_wd.text((bbox_wd[2], 120), "NEXUS", fill=(0, 212, 255, 255), font=font_main)
    draw_wd.ellipse([110, 260, 134, 284], fill=(0, 212, 255, 255))
    draw_wd.rectangle([145, 268, 520, 276], fill=(0, 212, 255, 255))
    draw_wd.text((540, 254), "TECHNOLOGIES", fill=(56, 189, 248, 255), font=font_sub)

    # Save to dictionary
    rasters = {
        '1-lettermark': (lm_canvas, True),
        '2-wordmark': (wm_light, False),
        '2-wordmark-dark': (wm_dark, True),
        '3-pictorial': (master_1024, True),
        '4-abstract': (abstract_png, True),
        '5-mascot': (lm_canvas, True),
        '6-combination-main': (comb_light, False),
        '6-combination-main-dark': (comb_dark, True),
        '7-emblem': (lm_canvas, True),
        '8-corporate-seal': (wm_light, False),
    }

    for name, (img_rgba, is_dark) in rasters.items():
        bg_col = (9, 13, 24, 255) if is_dark else (255, 255, 255, 255)
        # Create solid version for JPG
        solid_bg = Image.new('RGBA', img_rgba.size, bg_col)
        solid_comp = Image.alpha_composite(solid_bg, img_rgba).convert('RGB')

        for d in OUT_DIRS:
            png_p = os.path.join(d, f"{name}.png")
            jpg_p = os.path.join(d, f"{name}.jpg")
            webp_p = os.path.join(d, f"{name}.webp")

            img_rgba.save(png_p, 'PNG')
            solid_comp.save(jpg_p, 'JPEG', quality=95)
            img_rgba.save(webp_p, 'WEBP', quality=95)

    # Also update public/assets/images default site logo files!
    comb_dark.resize((600, 186), Image.Resampling.LANCZOS).save('public/assets/images/LogoGenerated.png')
    comb_dark.resize((600, 186), Image.Resampling.LANCZOS).save('public/assets/images/LogoGenerated.webp')
    comb_light.resize((600, 186), Image.Resampling.LANCZOS).save('public/assets/images/Logo.png')
    comb_light.resize((600, 186), Image.Resampling.LANCZOS).save('public/assets/images/Logo.webp')

    # Update favicons with A mark
    fav = abstract_png.resize((192, 192), Image.Resampling.LANCZOS)
    fav.save('public/assets/images/favicon.png')
    fav.resize((32, 32), Image.Resampling.LANCZOS).save('public/assets/images/favicon-32x32.png')
    lm_canvas.resize((180, 180), Image.Resampling.LANCZOS).save('public/assets/images/apple-touch-icon.png')

    print("All raster assets, logos, and site headers updated successfully!")

build_raster_logos()

"""
Generate 33 Bespoke, High-End SVG Mockup Images for ABSS Nexus Technologies Projects
Each image is tailored to its specific engineering discipline with distinct color palettes,
authentic UI layouts, charts, device frames, and technical diagrams.
"""

import os

OUTPUT_DIR = "public/assets/images/projects"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Helper to write SVG file
def save_svg(filename, content):
    path = os.path.join(OUTPUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"Generated {filename}")

# Common SVG wrapper
def svg_wrapper(bg_grad, content):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440" width="800" height="440">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap');
      text {{ font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }}
      .mono {{ font-family: 'JetBrains Mono', monospace; }}
    </style>
    {bg_grad}
    <linearGradient id="glassCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glowCoral" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="440" fill="url(#mainBg)"/>

  <!-- Subtle Blueprint Tech Grid -->
  <g opacity="0.12" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="80" x2="800" y2="80"/>
    <line x1="0" y1="160" x2="800" y2="160"/>
    <line x1="0" y1="240" x2="800" y2="240"/>
    <line x1="0" y1="320" x2="800" y2="320"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="160" y1="0" x2="160" y2="440"/>
    <line x1="320" y1="0" x2="320" y2="440"/>
    <line x1="480" y1="0" x2="480" y2="440"/>
    <line x1="640" y1="0" x2="640" y2="440"/>
  </g>

  {content}
</svg>"""

# =============================================================================
# 1. WEBSITE DEVELOPMENT
# =============================================================================
# Project 1: Personal Portfolio
p1 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0F1D"/>
      <stop offset="50%" stop-color="#0D1527"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>""",
    """
    <!-- Glowing Backdrop Ambient -->
    <circle cx="620" cy="180" r="140" fill="#00D4FF" opacity="0.12" filter="blur(40px)"/>
    <circle cx="200" cy="280" r="120" fill="#EF4444" opacity="0.08" filter="blur(40px)"/>

    <!-- Left Code Window Frame -->
    <rect x="50" y="55" width="380" height="330" rx="16" fill="url(#glassCard)" stroke="rgba(255,255,255,0.12)" filter="url(#cardShadow)"/>
    <circle cx="76" cy="80" r="5" fill="#EF4444"/>
    <circle cx="94" cy="80" r="5" fill="#F59E0B"/>
    <circle cx="112" cy="80" r="5" fill="#10B981"/>
    <text x="140" y="84" fill="#94A3B8" font-size="11" class="mono">PortfolioShowcase.tsx</text>

    <!-- Code Lines -->
    <text x="76" y="125" fill="#64748B" font-size="12" class="mono">01</text>
    <text x="105" y="125" fill="#00D4FF" font-size="12" class="mono">export default function</text>
    <text x="250" y="125" fill="#F8FAFC" font-size="12" class="mono">Portfolio() &#123;</text>

    <text x="76" y="155" fill="#64748B" font-size="12" class="mono">02</text>
    <text x="105" y="155" fill="#A855F7" font-size="12" class="mono">  const</text>
    <text x="155" y="155" fill="#F8FAFC" font-size="12" class="mono">speed = </text>
    <text x="215" y="155" fill="#10B981" font-size="12" class="mono">&quot;100/100&quot;</text>

    <text x="76" y="185" fill="#64748B" font-size="12" class="mono">03</text>
    <text x="105" y="185" fill="#A855F7" font-size="12" class="mono">  const</text>
    <text x="155" y="185" fill="#F8FAFC" font-size="12" class="mono">framework = </text>
    <text x="255" y="185" fill="#00D4FF" font-size="12" class="mono">&quot;Next.js 16&quot;</text>

    <text x="76" y="215" fill="#64748B" font-size="12" class="mono">04</text>
    <text x="105" y="215" fill="#EF4444" font-size="12" class="mono">  return</text>
    <text x="160" y="215" fill="#94A3B8" font-size="12" class="mono">&lt;</text>
    <text x="170" y="215" fill="#38BDF8" font-size="12" class="mono">HeroShowcase</text>
    <text x="260" y="215" fill="#F59E0B" font-size="12" class="mono">mode=&quot;dark&quot;</text>
    <text x="345" y="215" fill="#94A3B8" font-size="12" class="mono">/&gt;</text>

    <rect x="76" y="255" width="328" height="100" rx="10" fill="#060913" stroke="rgba(0,212,255,0.2)"/>
    <text x="96" y="285" fill="#00D4FF" font-size="12" font-weight="700">⚡ Performance Score: 100/100</text>
    <text x="96" y="310" fill="#94A3B8" font-size="11">First Contentful Paint: 280ms • Netlify Edge</text>
    <rect x="96" y="325" width="280" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="96" y="325" width="280" height="6" rx="3" fill="#10B981"/>

    <!-- Right Visual Card (Developer Showcase) -->
    <rect x="460" y="70" width="290" height="300" rx="16" fill="url(#glassCard)" stroke="rgba(255,255,255,0.12)" filter="url(#cardShadow)"/>
    <circle cx="530" cy="140" r="38" fill="rgba(0,212,255,0.15)" stroke="#00D4FF" stroke-width="2"/>
    <text x="530" y="148" fill="#F8FAFC" font-size="22" font-weight="800" text-anchor="middle">SK</text>

    <text x="590" y="132" fill="#F8FAFC" font-size="18" font-weight="800">Shubham Kumar</text>
    <text x="590" y="152" fill="#00D4FF" font-size="12" font-weight="600">Lead Full-Stack Architect</text>

    <rect x="485" y="200" width="240" height="42" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    <text x="500" y="226" fill="#94A3B8" font-size="11">Architecture: Next.js • React • TS</text>

    <rect x="485" y="255" width="240" height="42" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    <text x="500" y="281" fill="#10B981" font-size="11" font-weight="700">✓ Production Verified • Global Edge</text>

    <rect x="485" y="312" width="240" height="36" rx="18" fill="#0064E0"/>
    <text x="605" y="335" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">View Live Showcase →</text>
    """
)
save_svg("personal-portfolio.svg", p1)

# Project 2: Global Freight Portal
p2 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08101E"/>
      <stop offset="50%" stop-color="#0B1A30"/>
      <stop offset="100%" stop-color="#040912"/>
    </linearGradient>""",
    """
    <!-- Global Logistics Flight / Sea Track Lines -->
    <path d="M 120 220 Q 280 120 440 200 T 720 160" fill="none" stroke="#00D4FF" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>
    <circle cx="120" cy="220" r="7" fill="#00D4FF" filter="url(#glowCyan)"/>
    <text x="120" y="245" fill="#94A3B8" font-size="10" text-anchor="middle" class="mono">SGP (Port)</text>

    <circle cx="440" cy="200" r="7" fill="#3B82F6" filter="url(#glowCyan)"/>
    <text x="440" y="225" fill="#94A3B8" font-size="10" text-anchor="middle" class="mono">DXB (Air Hub)</text>

    <circle cx="720" cy="160" r="7" fill="#10B981" filter="url(#glowCyan)"/>
    <text x="720" y="185" fill="#94A3B8" font-size="10" text-anchor="middle" class="mono">RTM (Europe)</text>

    <!-- Center Tracking & Quote Card -->
    <rect x="180" y="70" width="440" height="290" rx="18" fill="url(#glassCard)" stroke="rgba(0,212,255,0.25)" filter="url(#cardShadow)"/>
    
    <text x="210" y="112" fill="#F8FAFC" font-size="18" font-weight="800">Nexus Worldwide Freight Corp</text>
    <text x="210" y="132" fill="#00D4FF" font-size="12" font-weight="600">Enterprise Multilingual Consignment Portal</text>

    <!-- Tracking Input Bar -->
    <rect x="210" y="150" width="380" height="46" rx="10" fill="#060913" stroke="rgba(255,255,255,0.12)"/>
    <text x="230" y="178" fill="#94A3B8" font-size="12" class="mono">NEX-CON-99482-SEA</text>
    <rect x="480" y="156" width="100" height="34" rx="8" fill="#0064E0"/>
    <text x="530" y="177" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Track Now</text>

    <!-- Status Cards -->
    <rect x="210" y="215" width="180" height="75" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
    <text x="225" y="240" fill="#94A3B8" font-size="10" font-weight="600">VESSEL STATUS</text>
    <text x="225" y="262" fill="#10B981" font-size="14" font-weight="800">In Transit • On Time</text>
    <text x="225" y="278" fill="#64748B" font-size="10">ETA: Rotterdam 14:00</text>

    <rect x="410" y="215" width="180" height="75" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
    <text x="425" y="240" fill="#94A3B8" font-size="10" font-weight="600">INSTANT QUOTE RFQ</text>
    <text x="425" y="262" fill="#00D4FF" font-size="14" font-weight="800">$1,480 / TEU</text>
    <text x="425" y="278" fill="#64748B" font-size="10">Global Cloudflare 180ms</text>

    <text x="400" y="328" fill="#94A3B8" font-size="11" text-anchor="middle">Next.js 16 • Multilingual • Automated Quote Calculator</text>
    """
)
save_svg("global-freight.svg", p2)

# =============================================================================
# 2. CUSTOM SOFTWARE DEVELOPMENT
# =============================================================================
# Project 3: Cloud Analytics Dashboard
p3 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0E1A"/>
      <stop offset="50%" stop-color="#0E1626"/>
      <stop offset="100%" stop-color="#050812"/>
    </linearGradient>""",
    """
    <!-- Cloud Analytics Console Frame -->
    <rect x="60" y="45" width="680" height="350" rx="16" fill="url(#glassCard)" stroke="rgba(0,212,255,0.2)" filter="url(#cardShadow)"/>
    
    <!-- Top Bar -->
    <circle cx="86" cy="72" r="5" fill="#EF4444"/>
    <circle cx="104" cy="72" r="5" fill="#F59E0B"/>
    <circle cx="122" cy="72" r="5" fill="#10B981"/>
    <text x="145" y="76" fill="#94A3B8" font-size="11" class="mono">admin.finedge.internal / telemetry-live</text>
    <rect x="600" y="60" width="115" height="24" rx="12" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)"/>
    <text x="657" y="76" fill="#10B981" font-size="10" font-weight="700" text-anchor="middle">● 99.98% SLA ACTIVE</text>

    <!-- Left Stats Column -->
    <rect x="85" y="105" width="180" height="75" rx="10" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="100" y="128" fill="#94A3B8" font-size="10" font-weight="600">QUERY LATENCY</text>
    <text x="100" y="156" fill="#00D4FF" font-size="22" font-weight="800">38.4 ms</text>
    <text x="100" y="172" fill="#10B981" font-size="9">↓ 64% faster than target</text>

    <rect x="85" y="195" width="180" height="75" rx="10" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="100" y="218" fill="#94A3B8" font-size="10" font-weight="600">CONCURRENT USERS</text>
    <text x="100" y="246" fill="#F8FAFC" font-size="22" font-weight="800">42,850</text>
    <text x="100" y="262" fill="#00D4FF" font-size="9">Active WebSockets</text>

    <rect x="85" y="285" width="180" height="85" rx="10" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="100" y="308" fill="#94A3B8" font-size="10" font-weight="600">TRANSACTION QUEUE</text>
    <text x="100" y="336" fill="#10B981" font-size="22" font-weight="800">Zero Loss</text>
    <text x="100" y="354" fill="#94A3B8" font-size="9">Cloudflare D1 Verified</text>

    <!-- Right Live Chart Area -->
    <rect x="285" y="105" width="430" height="265" rx="12" fill="#060914" stroke="rgba(255,255,255,0.08)"/>
    <text x="310" y="135" fill="#F8FAFC" font-size="13" font-weight="700">Real-Time Throughput &amp; Ingestion Curve</text>
    
    <!-- Area Chart Gradient Fill -->
    <path d="M 310 320 Q 370 280 430 290 T 550 210 T 670 170 L 670 330 L 310 330 Z" fill="url(#chartGrad)" opacity="0.3"/>
    <path d="M 310 320 Q 370 280 430 290 T 550 210 T 670 170" fill="none" stroke="#00D4FF" stroke-width="3" filter="url(#glowCyan)"/>
    <circle cx="670" cy="170" r="5" fill="#00D4FF"/>
    
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    
    <text x="670" y="155" fill="#00D4FF" font-size="11" font-weight="700" text-anchor="middle">Peak 18k req/s</text>
    """
)
save_svg("cloud-analytics.svg", p3)

# Project 4: Warehouse Supply Chain ERP
p4 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0C141F"/>
      <stop offset="50%" stop-color="#121F2F"/>
      <stop offset="100%" stop-color="#060A10"/>
    </linearGradient>""",
    """
    <!-- Industrial Supply Chain Hub -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(245,158,11,0.25)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">Apex Multi-Warehouse Industrial ERP</text>
    <text x="90" y="112" fill="#F59E0B" font-size="12" font-weight="600">Automated Inventory • 50,000+ SKUs • 6 Hubs Synchronized</text>

    <!-- Barcode Scanner Beam Simulation -->
    <rect x="90" y="135" width="280" height="90" rx="10" fill="#080C14" stroke="rgba(255,255,255,0.1)"/>
    <text x="110" y="160" fill="#94A3B8" font-size="10" font-weight="600">LIVE BARCODE SCANNER PWA</text>
    <!-- Barcode lines -->
    <g fill="#F8FAFC" opacity="0.8">
      <rect x="110" y="172" width="3" height="35"/>
      <rect x="116" y="172" width="6" height="35"/>
      <rect x="126" y="172" width="2" height="35"/>
      <rect x="131" y="172" width="8" height="35"/>
      <rect x="143" y="172" width="4" height="35"/>
      <rect x="151" y="172" width="2" height="35"/>
      <rect x="156" y="172" width="6" height="35"/>
      <rect x="166" y="172" width="4" height="35"/>
      <rect x="174" y="172" width="8" height="35"/>
      <rect x="186" y="172" width="3" height="35"/>
      <rect x="193" y="172" width="5" height="35"/>
    </g>
    <!-- Red Laser Line -->
    <line x1="100" y1="188" x2="205" y2="188" stroke="#EF4444" stroke-width="2" filter="url(#glowCoral)"/>
    <text x="215" y="185" fill="#10B981" font-size="11" font-weight="700">SKU-49102-X</text>
    <text x="215" y="200" fill="#94A3B8" font-size="9">Bin: A-04-R2 (Verified)</text>

    <!-- Stats Boxes -->
    <rect x="90" y="245" width="130" height="115" rx="10" fill="#080C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="105" y="275" fill="#94A3B8" font-size="10">ACCURACY</text>
    <text x="105" y="305" fill="#10B981" font-size="20" font-weight="800">99.8%</text>
    <text x="105" y="325" fill="#64748B" font-size="9">Picking rate</text>

    <rect x="240" y="245" width="130" height="115" rx="10" fill="#080C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="255" y="275" fill="#94A3B8" font-size="10">STOCKOUTS</text>
    <text x="255" y="305" fill="#F59E0B" font-size="20" font-weight="800">-74%</text>
    <text x="255" y="325" fill="#64748B" font-size="9">Auto-reorder PO</text>

    <!-- Right Side 6 Warehouse Hub Matrix -->
    <rect x="395" y="135" width="315" height="225" rx="12" fill="#060912" stroke="rgba(255,255,255,0.08)"/>
    <text x="420" y="165" fill="#F8FAFC" font-size="13" font-weight="700">Regional Distribution Hub Telemetry</text>
    
    <g font-size="11">
      <rect x="420" y="185" width="265" height="34" rx="6" fill="rgba(255,255,255,0.04)"/>
      <text x="435" y="206" fill="#F8FAFC">Hub 01: Mumbai Central</text>
      <text x="660" y="206" fill="#10B981" font-weight="700" text-anchor="end">98% Cap</text>

      <rect x="420" y="228" width="265" height="34" rx="6" fill="rgba(255,255,255,0.04)"/>
      <text x="435" y="249" fill="#F8FAFC">Hub 02: Delhi NCR</text>
      <text x="660" y="249" fill="#10B981" font-weight="700" text-anchor="end">94% Cap</text>

      <rect x="420" y="271" width="265" height="34" rx="6" fill="rgba(255,255,255,0.04)"/>
      <text x="435" y="292" fill="#F8FAFC">Hub 03: Bengaluru Logistics</text>
      <text x="660" y="292" fill="#00D4FF" font-weight="700" text-anchor="end">88% Cap</text>

      <rect x="420" y="314" width="265" height="34" rx="6" fill="rgba(255,255,255,0.04)"/>
      <text x="435" y="335" fill="#F8FAFC">Hub 04: Kolkata Port Gateway</text>
      <text x="660" y="335" fill="#10B981" font-weight="700" text-anchor="end">91% Cap</text>
    </g>
    """
)
save_svg("warehouse-erp.svg", p4)

# Project 5: Healthcare Telemedicine Hub
p5 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08151D"/>
      <stop offset="50%" stop-color="#0C202B"/>
      <stop offset="100%" stop-color="#040C12"/>
    </linearGradient>""",
    """
    <!-- Clinical Telemedicine Screen -->
    <rect x="70" y="50" width="660" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(20,184,166,0.3)" filter="url(#cardShadow)"/>
    
    <text x="100" y="92" fill="#F8FAFC" font-size="18" font-weight="800">Apex Telemedicine &amp; Clinical Booking</text>
    <text x="100" y="112" fill="#14B8A6" font-size="12" font-weight="600">HIPAA-Compliant Patient Portal • Real-Time WebRTC Video</text>

    <!-- Doctor Consultation Card -->
    <rect x="100" y="135" width="280" height="225" rx="12" fill="#060C12" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="150" cy="180" r="28" fill="rgba(20,184,166,0.2)" stroke="#14B8A6" stroke-width="2"/>
    <text x="150" y="187" fill="#14B8A6" font-size="18" font-weight="800" text-anchor="middle">Dr</text>
    
    <text x="195" y="175" fill="#F8FAFC" font-size="14" font-weight="700">Dr. Sarah V. Rao</text>
    <text x="195" y="193" fill="#94A3B8" font-size="11">Chief Cardiologist</text>
    <text x="195" y="210" fill="#10B981" font-size="10" font-weight="600">● Available Today (WebRTC)</text>

    <!-- Patient Details -->
    <rect x="120" y="235" width="240" height="40" rx="8" fill="rgba(255,255,255,0.03)"/>
    <text x="135" y="259" fill="#94A3B8" font-size="11">Next Slot: 14:30 IST • Confirmed</text>

    <rect x="120" y="290" width="240" height="42" rx="21" fill="#14B8A6"/>
    <text x="240" y="316" fill="#040C12" font-size="12" font-weight="800" text-anchor="middle">Join Encrypted Consultation →</text>

    <!-- Right Side Medical Records & Stats -->
    <rect x="405" y="135" width="300" height="105" rx="10" fill="#060C12" stroke="rgba(255,255,255,0.08)"/>
    <text x="425" y="165" fill="#94A3B8" font-size="10" font-weight="600">NO-SHOW RATE REDUCTION</text>
    <text x="425" y="195" fill="#10B981" font-size="24" font-weight="800">-65% Reduction</text>
    <text x="425" y="218" fill="#64748B" font-size="11">Automated WhatsApp + SMS confirmations</text>

    <rect x="405" y="255" width="300" height="105" rx="10" fill="#060C12" stroke="rgba(255,255,255,0.08)"/>
    <text x="425" y="285" fill="#94A3B8" font-size="10" font-weight="600">BOOKING VELOCITY</text>
    <text x="425" y="315" fill="#00D4FF" font-size="24" font-weight="800">&lt;45 Seconds</text>
    <text x="425" y="338" fill="#64748B" font-size="11">Average patient self-scheduling time</text>
    """
)
save_svg("telemedicine-hub.svg", p5)

# =============================================================================
# 3. MOBILE APP DEVELOPMENT
# =============================================================================
# Project 6: FitPulse Fitness App (iOS/Android)
p6 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#120A1A"/>
      <stop offset="50%" stop-color="#1D0E2B"/>
      <stop offset="100%" stop-color="#08040C"/>
    </linearGradient>""",
    """
    <!-- Phone Bezel Center -->
    <rect x="280" y="25" width="240" height="390" rx="36" fill="#050208" stroke="rgba(236,72,153,0.4)" stroke-width="4" filter="url(#cardShadow)"/>
    <!-- Dynamic Island / Speaker -->
    <rect x="360" y="36" width="80" height="18" rx="9" fill="#110719"/>
    
    <!-- Phone Screen Content -->
    <text x="305" y="80" fill="#F8FAFC" font-size="15" font-weight="800">FitPulse HIIT</text>
    <text x="305" y="96" fill="#EC4899" font-size="10" font-weight="600">Live Heart Rate • BLE Sync</text>

    <!-- Heart Rate Gauge -->
    <circle cx="400" cy="165" r="50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
    <circle cx="400" cy="165" r="50" fill="none" stroke="#EC4899" stroke-width="8" stroke-dasharray="240" stroke-dashoffset="60" filter="url(#glowCoral)"/>
    <text x="400" y="162" fill="#F8FAFC" font-size="22" font-weight="800" text-anchor="middle">148</text>
    <text x="400" y="180" fill="#EC4899" font-size="10" font-weight="700" text-anchor="middle">BPM • ZONE 4</text>

    <!-- Workout Stats Grid -->
    <rect x="300" y="235" width="95" height="55" rx="8" fill="rgba(255,255,255,0.04)"/>
    <text x="310" y="255" fill="#94A3B8" font-size="9">CALORIES</text>
    <text x="310" y="276" fill="#F8FAFC" font-size="14" font-weight="800">420 kcal</text>

    <rect x="405" y="235" width="95" height="55" rx="8" fill="rgba(255,255,255,0.04)"/>
    <text x="415" y="255" fill="#94A3B8" font-size="9">DURATION</text>
    <text x="415" y="276" fill="#F8FAFC" font-size="14" font-weight="800">28:45</text>

    <!-- Bottom Action Pill -->
    <rect x="300" y="305" width="200" height="38" rx="19" fill="#EC4899"/>
    <text x="400" y="328" fill="#FFFFFF" font-size="11" font-weight="800" text-anchor="middle">PAUSE INTERVAL ||</text>

    <!-- Left Flanking Feature Tag -->
    <rect x="60" y="140" width="180" height="100" rx="12" fill="url(#glassCard)" stroke="rgba(255,255,255,0.1)" filter="url(#cardShadow)"/>
    <text x="80" y="172" fill="#10B981" font-size="18" font-weight="800">4.8 / 5.0 ★</text>
    <text x="80" y="195" fill="#F8FAFC" font-size="12" font-weight="700">App Store &amp; Play Store</text>
    <text x="80" y="215" fill="#94A3B8" font-size="10">85,000+ Active Athletes</text>

    <!-- Right Flanking Feature Tag -->
    <rect x="560" y="140" width="180" height="100" rx="12" fill="url(#glassCard)" stroke="rgba(255,255,255,0.1)" filter="url(#cardShadow)"/>
    <text x="580" y="172" fill="#00D4FF" font-size="18" font-weight="800">100% Offline</text>
    <text x="580" y="195" fill="#F8FAFC" font-size="12" font-weight="700">Encrypted Video Caching</text>
    <text x="580" y="215" fill="#94A3B8" font-size="10">Zero Gym Buffering</text>
    """
)
save_svg("fitpulse-mobile.svg", p6)

# Project 7: UrbanRide Fleet Driver App
p7 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A141A"/>
      <stop offset="50%" stop-color="#0E212B"/>
      <stop offset="100%" stop-color="#04090D"/>
    </linearGradient>""",
    """
    <!-- Phone Bezel for Driver Terminal -->
    <rect x="280" y="25" width="240" height="390" rx="36" fill="#050B0E" stroke="rgba(0,212,255,0.4)" stroke-width="4" filter="url(#cardShadow)"/>
    <rect x="360" y="36" width="80" height="18" rx="9" fill="#0A1820"/>

    <!-- Map Route Graphics -->
    <path d="M 320 310 L 350 250 L 430 200 L 410 120 L 460 80" fill="none" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" filter="url(#glowCyan)"/>
    <circle cx="320" cy="310" r="6" fill="#10B981"/>
    <circle cx="460" cy="80" r="7" fill="#EF4444" filter="url(#glowCoral)"/>

    <!-- Driver Overlay Card -->
    <rect x="295" y="255" width="210" height="110" rx="12" fill="rgba(8,20,28,0.95)" stroke="rgba(0,212,255,0.3)"/>
    <text x="310" y="280" fill="#F8FAFC" font-size="12" font-weight="800">Delivery #TX-8821</text>
    <text x="310" y="298" fill="#00D4FF" font-size="10">Distance: 3.4 km • ETA: 7 min</text>
    <rect x="310" y="315" width="180" height="34" rx="17" fill="#10B981"/>
    <text x="400" y="336" fill="#000000" font-size="11" font-weight="800" text-anchor="middle">Swipe to Complete POD ✓</text>

    <!-- Left Metric Tag -->
    <rect x="60" y="150" width="180" height="90" rx="12" fill="url(#glassCard)" stroke="rgba(255,255,255,0.1)" filter="url(#cardShadow)"/>
    <text x="80" y="182" fill="#00D4FF" font-size="20" font-weight="800">&lt;15 Seconds</text>
    <text x="80" y="202" fill="#F8FAFC" font-size="11" font-weight="700">Dispatch Latency</text>
    <text x="80" y="220" fill="#94A3B8" font-size="9">Automated Geofence Queue</text>

    <!-- Right Metric Tag -->
    <rect x="560" y="150" width="180" height="90" rx="12" fill="url(#glassCard)" stroke="rgba(255,255,255,0.1)" filter="url(#cardShadow)"/>
    <text x="580" y="182" fill="#10B981" font-size="20" font-weight="800">-18% Fuel</text>
    <text x="580" y="202" fill="#F8FAFC" font-size="11" font-weight="700">Dynamic Traffic Routing</text>
    <text x="580" y="220" fill="#94A3B8" font-size="9">1,200 Fleet Drivers Active</text>
    """
)
save_svg("urbanride-driver.svg", p7)

# =============================================================================
# 4. UI/UX DESIGN & PROTOTYPING
# =============================================================================
# Project 8: FinFlow Design System
p8 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140E1F"/>
      <stop offset="50%" stop-color="#201533"/>
      <stop offset="100%" stop-color="#0A0611"/>
    </linearGradient>""",
    """
    <!-- Figma Canvas Frame -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(168,85,247,0.3)" filter="url(#cardShadow)"/>
    
    <!-- Top Figma Tools Bar -->
    <rect x="60" y="50" width="680" height="36" rx="16" fill="rgba(0,0,0,0.4)"/>
    <text x="85" y="73" fill="#A855F7" font-size="11" class="mono">❖ FinFlow_Design_System_v2.fig</text>
    <text x="660" y="73" fill="#10B981" font-size="10" font-weight="700">WCAG 2.1 AA PASS</text>

    <!-- Color Tokens Palette -->
    <rect x="90" y="105" width="200" height="255" rx="12" fill="#08040F" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="132" fill="#F8FAFC" font-size="12" font-weight="700">Design Tokens Studio</text>
    
    <circle cx="120" cy="165" r="12" fill="#00D4FF"/>
    <text x="145" y="170" fill="#94A3B8" font-size="10">--brand-cyan: #00D4FF</text>

    <circle cx="120" cy="205" r="12" fill="#A855F7"/>
    <text x="145" y="210" fill="#94A3B8" font-size="10">--accent-purple: #A855F7</text>

    <circle cx="120" cy="245" r="12" fill="#10B981"/>
    <text x="145" y="250" fill="#94A3B8" font-size="10">--success-green: #10B981</text>

    <circle cx="120" cy="285" r="12" fill="#EF4444"/>
    <text x="145" y="290" fill="#94A3B8" font-size="10">--coral-nexus: #EF4444</text>

    <text x="110" y="335" fill="#64748B" font-size="9">280+ Atomic Components</text>

    <!-- Component Buttons Showcase Area -->
    <rect x="310" y="105" width="400" height="255" rx="12" fill="#08040F" stroke="rgba(255,255,255,0.08)"/>
    <text x="335" y="135" fill="#F8FAFC" font-size="13" font-weight="700">Interactive Component Kit Preview</text>

    <!-- Button Variants -->
    <rect x="335" y="160" width="160" height="42" rx="21" fill="#0064E0"/>
    <text x="415" y="186" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Primary Button</text>

    <rect x="515" y="160" width="160" height="42" rx="21" fill="transparent" stroke="#00D4FF" stroke-width="1.5"/>
    <text x="595" y="186" fill="#00D4FF" font-size="11" font-weight="700" text-anchor="middle">Ghost Button</text>

    <!-- Card Token -->
    <rect x="335" y="220" width="340" height="65" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
    <text x="355" y="248" fill="#F8FAFC" font-size="12" font-weight="700">Financial Balance Card Token</text>
    <text x="355" y="268" fill="#10B981" font-size="14" font-weight="800">$184,250.00 USD</text>

    <text x="505" y="325" fill="#A855F7" font-size="11" font-weight="600" text-anchor="middle">+55% Frontend Delivery Velocity</text>
    """
)
save_svg("finflow-tokens.svg", p8)

# Project 9: MediConnect Hospital UX
p9 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A181C"/>
      <stop offset="50%" stop-color="#0E262D"/>
      <stop offset="100%" stop-color="#050E11"/>
    </linearGradient>""",
    """
    <!-- UX User Journey Wireframe Flow -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(20,184,166,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">MediConnect - Clinical Hospital Patient UX</text>
    <text x="90" y="112" fill="#14B8A6" font-size="12" font-weight="600">Human-Centered UX Research • 3-Step Simplified Journey</text>

    <!-- Step 1 Card -->
    <rect x="90" y="145" width="180" height="160" rx="12" fill="#060F13" stroke="rgba(255,255,255,0.1)"/>
    <circle cx="120" cy="175" r="14" fill="#14B8A6"/>
    <text x="120" y="180" fill="#040C12" font-size="11" font-weight="800" text-anchor="middle">1</text>
    <text x="145" y="180" fill="#F8FAFC" font-size="12" font-weight="700">Specialty</text>
    <text x="105" y="215" fill="#94A3B8" font-size="10">Cardiology, Ortho, Neurology</text>
    <rect x="105" y="245" width="150" height="34" rx="6" fill="rgba(255,255,255,0.05)"/>
    <text x="180" y="266" fill="#14B8A6" font-size="10" font-weight="600" text-anchor="middle">Instant Search</text>

    <!-- Step Arrow -->
    <path d="M 280 225 L 310 225" stroke="#14B8A6" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Step 2 Card -->
    <rect x="320" y="145" width="180" height="160" rx="12" fill="#060F13" stroke="rgba(20,184,166,0.3)"/>
    <circle cx="350" cy="175" r="14" fill="#00D4FF"/>
    <text x="350" y="180" fill="#040C12" font-size="11" font-weight="800" text-anchor="middle">2</text>
    <text x="375" y="180" fill="#F8FAFC" font-size="12" font-weight="700">Time Slot</text>
    <text x="335" y="215" fill="#94A3B8" font-size="10">Large Touch Targets (48px)</text>
    <rect x="335" y="245" width="150" height="34" rx="6" fill="#0064E0"/>
    <text x="410" y="266" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">14:30 Selected</text>

    <!-- Step Arrow -->
    <path d="M 510 225 L 540 225" stroke="#14B8A6" stroke-width="2"/>

    <!-- Step 3 Card -->
    <rect x="550" y="145" width="160" height="160" rx="12" fill="#060F13" stroke="rgba(255,255,255,0.1)"/>
    <circle cx="580" cy="175" r="14" fill="#10B981"/>
    <text x="580" y="180" fill="#040C12" font-size="11" font-weight="800" text-anchor="middle">3</text>
    <text x="605" y="180" fill="#F8FAFC" font-size="12" font-weight="700">Confirm</text>
    <text x="565" y="215" fill="#94A3B8" font-size="10">SMS &amp; WhatsApp</text>
    <rect x="565" y="245" width="130" height="34" rx="6" fill="rgba(16,185,129,0.2)"/>
    <text x="630" y="266" fill="#10B981" font-size="10" font-weight="700" text-anchor="middle">✓ Booked</text>

    <!-- Bottom Result Banner -->
    <text x="400" y="345" fill="#10B981" font-size="12" font-weight="700" text-anchor="middle">
      ✓ Form Abandonment Dropped 58% • Senior Usability Score: 94/100
    </text>
    """
)
save_svg("mediconnect-ux.svg", p9)

# =============================================================================
# 5. AI & MACHINE LEARNING
# =============================================================================
# Project 10: DocuMind RAG Search
p10 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140824"/>
      <stop offset="50%" stop-color="#1F0D38"/>
      <stop offset="100%" stop-color="#080210"/>
    </linearGradient>""",
    """
    <!-- RAG Search Engine Screen -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(168,85,247,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">DocuMind Enterprise RAG Search</text>
    <text x="90" y="112" fill="#A855F7" font-size="12" font-weight="600">500,000+ Documents • Cryptographic Citation Grounding • Zero Hallucinations</text>

    <!-- Query Bar -->
    <rect x="90" y="135" width="620" height="46" rx="10" fill="#0A0413" stroke="rgba(168,85,247,0.4)"/>
    <text x="115" y="163" fill="#F8FAFC" font-size="12" class="mono">&quot;Summarize Section 14.2 indemnity liability limits in 2024 vendor contracts&quot;</text>
    <rect x="620" y="141" width="80" height="34" rx="8" fill="#A855F7"/>
    <text x="660" y="162" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Execute</text>

    <!-- Grounded Response Box -->
    <rect x="90" y="200" width="410" height="165" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="228" fill="#10B981" font-size="11" font-weight="700">✓ Grounded Synthesis (0.00% Hallucination)</text>
    <text x="110" y="255" fill="#E2E8F0" font-size="11">Under Section 14.2, aggregate liability is capped at</text>
    <text x="110" y="275" fill="#E2E8F0" font-size="11">12 months of paid fees with uncapped carve-outs for</text>
    <text x="110" y="295" fill="#E2E8F0" font-size="11">gross negligence and willful misconduct.</text>
    <text x="110" y="335" fill="#A855F7" font-size="10" class="mono">Source: MSA_Vendor_2024_Final.pdf (Page 42, Line 18)</text>

    <!-- Vector DB Pipeline Flank -->
    <rect x="520" y="200" width="190" height="165" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="228" fill="#94A3B8" font-size="10" font-weight="600">VECTOR EMBEDDING</text>
    <text x="535" y="255" fill="#00D4FF" font-size="16" font-weight="800">1,536 Dim</text>
    <text x="535" y="275" fill="#64748B" font-size="10">Pinecone Hybrid Index</text>
    <text x="535" y="305" fill="#94A3B8" font-size="10" font-weight="600">QUERY LATENCY</text>
    <text x="535" y="330" fill="#10B981" font-size="18" font-weight="800">840 ms</text>
    """
)
save_svg("documind-rag.svg", p10)

# Project 11: PredictChurn ML Engine
p11 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14081E"/>
      <stop offset="50%" stop-color="#1B0E2A"/>
      <stop offset="100%" stop-color="#080310"/>
    </linearGradient>""",
    """
    <!-- Machine Learning Model Dashboard -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(236,72,153,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">PredictChurn - Customer Retention ML Engine</text>
    <text x="90" y="112" fill="#EC4899" font-size="12" font-weight="600">XGBoost Classification • 45-Day Advance Churn Forecast</text>

    <!-- Model Metrics Row -->
    <rect x="90" y="135" width="180" height="90" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="105" y="162" fill="#94A3B8" font-size="10">MODEL ACCURACY</text>
    <text x="105" y="195" fill="#10B981" font-size="24" font-weight="800">91.4%</text>
    <text x="105" y="212" fill="#64748B" font-size="9">AUC-ROC: 0.94</text>

    <rect x="290" y="135" width="180" height="90" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="305" y="162" fill="#94A3B8" font-size="10">LEAD TIME</text>
    <text x="305" y="195" fill="#00D4FF" font-size="24" font-weight="800">45 Days</text>
    <text x="305" y="212" fill="#64748B" font-size="9">Before contract renewal</text>

    <rect x="490" y="135" width="220" height="90" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="505" y="162" fill="#94A3B8" font-size="10">REVENUE PRESERVED</text>
    <text x="505" y="195" fill="#EC4899" font-size="24" font-weight="800">$380,000</text>
    <text x="505" y="212" fill="#64748B" font-size="9">In Q1 enterprise accounts</text>

    <!-- Feature Importance Bar Chart -->
    <rect x="90" y="245" width="620" height="120" rx="10" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="270" fill="#F8FAFC" font-size="11" font-weight="700">Top Predictive Signals (SHAP Feature Importance)</text>

    <text x="110" y="295" fill="#94A3B8" font-size="10">Weekly Active Login Velocity</text>
    <rect x="300" y="286" width="360" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
    <rect x="300" y="286" width="310" height="10" rx="5" fill="#EC4899"/>

    <text x="110" y="325" fill="#94A3B8" font-size="10">Support Ticket Sentiment Drops</text>
    <rect x="300" y="316" width="360" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
    <rect x="300" y="316" width="220" height="10" rx="5" fill="#00D4FF"/>

    <text x="110" y="355" fill="#94A3B8" font-size="10">License Seat Utilization &lt; 50%</text>
    <rect x="300" y="346" width="360" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
    <rect x="300" y="346" width="160" height="10" rx="5" fill="#F59E0B"/>
    """
)
save_svg("predictchurn-ml.svg", p11)

# =============================================================================
# 6. CLOUD COMPUTING & DEVOPS
# =============================================================================
# Project 12: CloudScale Kubernetes
p12 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08101E"/>
      <stop offset="50%" stop-color="#0E1D33"/>
      <stop offset="100%" stop-color="#050912"/>
    </linearGradient>""",
    """
    <!-- CloudScale Kubernetes Topology Frame -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,212,255,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">CloudScale - Multi-Region Kubernetes EKS</text>
    <text x="90" y="112" fill="#00D4FF" font-size="12" font-weight="600">120M+ Requests/Month • Zero-Downtime Rolling Deploys • 99.995% SLA</text>

    <!-- Edge Load Balancer Node -->
    <rect x="310" y="140" width="180" height="44" rx="8" fill="#0064E0" stroke="#00D4FF" stroke-width="1.5" filter="url(#glowCyan)"/>
    <text x="400" y="167" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">Cloudflare Global Anycast</text>

    <!-- Connecting Arrows -->
    <line x1="360" y1="184" x2="220" y2="220" stroke="#00D4FF" stroke-width="2" stroke-dasharray="4,4"/>
    <line x1="440" y1="184" x2="580" y2="220" stroke="#00D4FF" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Cluster us-east -->
    <rect x="110" y="220" width="220" height="145" rx="10" fill="#060C16" stroke="rgba(255,255,255,0.1)"/>
    <text x="130" y="248" fill="#F8FAFC" font-size="12" font-weight="700">Cluster 01: AWS us-east-1</text>
    <text x="130" y="270" fill="#10B981" font-size="11">● 18 Pods Healthy</text>
    <rect x="130" y="285" width="180" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="130" y="285" width="140" height="6" rx="3" fill="#10B981"/>
    <text x="130" y="315" fill="#94A3B8" font-size="10">CPU: 42% • RAM: 58%</text>
    <text x="130" y="340" fill="#00D4FF" font-size="10" class="mono">Terraform GitOps Managed</text>

    <!-- Cluster eu-central -->
    <rect x="470" y="220" width="220" height="145" rx="10" fill="#060C16" stroke="rgba(255,255,255,0.1)"/>
    <text x="490" y="248" fill="#F8FAFC" font-size="12" font-weight="700">Cluster 02: AWS eu-central-1</text>
    <text x="490" y="270" fill="#10B981" font-size="11">● 18 Pods Healthy</text>
    <rect x="490" y="285" width="180" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="490" y="285" width="125" height="6" rx="3" fill="#10B981"/>
    <text x="490" y="315" fill="#94A3B8" font-size="10">CPU: 38% • RAM: 52%</text>
    <text x="490" y="340" fill="#00D4FF" font-size="10" class="mono">Auto-Failover Active</text>
    """
)
save_svg("cloudscale-k8s.svg", p12)

# Project 13: Serverless Event Architecture
p13 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08141F"/>
      <stop offset="50%" stop-color="#0E2133"/>
      <stop offset="100%" stop-color="#040A12"/>
    </linearGradient>""",
    """
    <!-- Serverless Event Pipeline -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(59,130,246,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">ServerlessFin - High-Throughput Event Streaming</text>
    <text x="90" y="112" fill="#38BDF8" font-size="12" font-weight="600">Cloudflare Workers + AWS Lambda • -64% Cloud Invoicing Cut</text>

    <!-- Pipeline Nodes -->
    <rect x="90" y="150" width="160" height="90" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.1)"/>
    <text x="105" y="180" fill="#94A3B8" font-size="10" font-weight="600">INGESTION</text>
    <text x="105" y="205" fill="#38BDF8" font-size="14" font-weight="800">Cloudflare Edge</text>
    <text x="105" y="225" fill="#10B981" font-size="10">&lt;20ms Cold Starts</text>

    <!-- Flow Arrow 1 -->
    <line x1="250" y1="195" x2="310" y2="195" stroke="#38BDF8" stroke-width="2"/>

    <rect x="310" y="150" width="180" height="90" rx="10" fill="#060C14" stroke="rgba(56,189,248,0.3)"/>
    <text x="325" y="180" fill="#94A3B8" font-size="10" font-weight="600">ASYNC QUEUE</text>
    <text x="325" y="205" fill="#F8FAFC" font-size="14" font-weight="800">Upstash Redis Stream</text>
    <text x="325" y="225" fill="#00D4FF" font-size="10">18,000 events/sec</text>

    <!-- Flow Arrow 2 -->
    <line x1="490" y1="195" x2="550" y2="195" stroke="#38BDF8" stroke-width="2"/>

    <rect x="550" y="150" width="160" height="90" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.1)"/>
    <text x="565" y="180" fill="#94A3B8" font-size="10" font-weight="600">PERSISTENCE</text>
    <text x="565" y="205" fill="#10B981" font-size="14" font-weight="800">Postgres Ledger</text>
    <text x="565" y="225" fill="#94A3B8" font-size="10">Zero Data Loss</text>

    <!-- Bottom Result Card -->
    <rect x="90" y="265" width="620" height="95" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="120" y="300" fill="#10B981" font-size="20" font-weight="800">-64% Cloud Hosting Cost Reduction</text>
    <text x="120" y="325" fill="#94A3B8" font-size="11">Replaced 12 idle EC2 compute instances with on-demand edge execution units.</text>
    """
)
save_svg("serverless-fin.svg", p13)

# =============================================================================
# 7. CYBERSECURITY & EDGE HARDENING
# =============================================================================
# Project 14: VaultShield WAF
p14 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#190A0E"/>
      <stop offset="50%" stop-color="#260F16"/>
      <stop offset="100%" stop-color="#0C0407"/>
    </linearGradient>""",
    """
    <!-- Cybersecurity Shield Command Center -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(239,68,68,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">VaultShield - Zero-Trust Edge WAF Hardening</text>
    <text x="90" y="112" fill="#EF4444" font-size="12" font-weight="600">Cloudflare WAF • Mutual TLS • 4.2M Malicious Attacks Blocked Daily</text>

    <!-- Shield Centerpiece -->
    <g transform="translate(140, 160)">
      <path d="M 50 10 L 95 30 L 95 80 C 95 125 50 150 50 150 C 50 150 5 125 5 80 L 5 30 Z" fill="rgba(239,68,68,0.15)" stroke="#EF4444" stroke-width="3" filter="url(#glowCoral)"/>
      <circle cx="50" cy="70" r="16" fill="#EF4444"/>
      <path d="M 43 70 L 48 75 L 58 65" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Threat Counters -->
    <rect x="290" y="145" width="200" height="95" rx="10" fill="#0B0406" stroke="rgba(255,255,255,0.08)"/>
    <text x="310" y="175" fill="#94A3B8" font-size="10">BLOCKED ATTACKS</text>
    <text x="310" y="205" fill="#EF4444" font-size="22" font-weight="800">4.2M / Day</text>
    <text x="310" y="225" fill="#10B981" font-size="10">&lt;0.01% False Positives</text>

    <rect x="510" y="145" width="200" height="95" rx="10" fill="#0B0406" stroke="rgba(255,255,255,0.08)"/>
    <text x="530" y="175" fill="#94A3B8" font-size="10">SSL LABS AUDIT</text>
    <text x="530" y="205" fill="#10B981" font-size="22" font-weight="800">Grade A+</text>
    <text x="530" y="225" fill="#94A3B8" font-size="10">TLS 1.3 • Strict CSP • HSTS</text>

    <!-- Ruleset Matrix -->
    <rect x="290" y="255" width="420" height="105" rx="10" fill="#0B0406" stroke="rgba(255,255,255,0.08)"/>
    <text x="310" y="282" fill="#F8FAFC" font-size="12" font-weight="700">Active Edge Shield Rulesets</text>
    <text x="310" y="306" fill="#10B981" font-size="11">✓ OWASP Core Ruleset (942100 SQLi, 941100 XSS Active)</text>
    <text x="310" y="328" fill="#10B981" font-size="11">✓ Rate Limiting: 60 req/min per unauthenticated IP</text>
    <text x="310" y="348" fill="#10B981" font-size="11">✓ Mutual TLS (mTLS) for Internal Microservices</text>
    """
)
save_svg("vaultshield-waf.svg", p14)

# Project 15: SecureAudit HIPAA
p15 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140D1D"/>
      <stop offset="50%" stop-color="#1F132E"/>
      <stop offset="100%" stop-color="#08040C"/>
    </linearGradient>""",
    """
    <!-- Terminal Penetration Test Report -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(168,85,247,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">SecureAudit - Healthcare HIPAA Penetration Audit</text>
    <text x="90" y="112" fill="#A855F7" font-size="12" font-weight="600">Burp Suite &amp; OWASP ZAP • 14 Critical CVEs Remediated • 100% Passed</text>

    <!-- Security Scorecard -->
    <rect x="90" y="135" width="180" height="225" rx="12" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="165" fill="#94A3B8" font-size="10" font-weight="600">AUDIT OUTCOME</text>
    <text x="110" y="198" fill="#10B981" font-size="28" font-weight="800">100%</text>
    <text x="110" y="220" fill="#F8FAFC" font-size="12" font-weight="700">Compliant</text>
    <text x="110" y="245" fill="#94A3B8" font-size="10">HIPAA Security Rule</text>
    <text x="110" y="265" fill="#94A3B8" font-size="10">HITECH Standards</text>
    <text x="110" y="285" fill="#94A3B8" font-size="10">SOC 2 Type II Ready</text>
    <rect x="110" y="315" width="140" height="28" rx="6" fill="#10B981"/>
    <text x="180" y="334" fill="#000000" font-size="10" font-weight="800" text-anchor="middle">PASSED ✓</text>

    <!-- Remediation Table -->
    <rect x="290" y="135" width="420" height="225" rx="12" fill="#080310" stroke="rgba(255,255,255,0.08)"/>
    <text x="310" y="165" fill="#F8FAFC" font-size="12" font-weight="700">Vulnerability Assessment &amp; Patch Matrix</text>

    <g font-size="11">
      <rect x="310" y="180" width="380" height="34" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="325" y="201" fill="#EF4444">CVE-2024-8192 (Auth Bypass)</text>
      <text x="670" y="201" fill="#10B981" font-weight="700" text-anchor="end">PATCHED ✓</text>

      <rect x="310" y="222" width="380" height="34" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="325" y="243" fill="#F59E0B">Unencrypted S3 Diagnostic Store</text>
      <text x="670" y="243" fill="#10B981" font-weight="700" text-anchor="end">AES-256 ✓</text>

      <rect x="310" y="264" width="380" height="34" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="325" y="285" fill="#F59E0B">Missing Role Authorization (IDOR)</text>
      <text x="670" y="285" fill="#10B981" font-weight="700" text-anchor="end">RBAC FIXED ✓</text>

      <rect x="310" y="306" width="380" height="34" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="325" y="327" fill="#00D4FF">Automated CI/CD Vulnerability Gate</text>
      <text x="670" y="327" fill="#10B981" font-weight="700" text-anchor="end">ACTIVE ✓</text>
    </g>
    """
)
save_svg("secureaudit-hipaa.svg", p15)

# =============================================================================
# 8. DATA ANALYTICS & BUSINESS INTELLIGENCE
# =============================================================================
# Project 16: RevOps 360 BI
p16 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08181A"/>
      <stop offset="50%" stop-color="#0C2529"/>
      <stop offset="100%" stop-color="#040C0D"/>
    </linearGradient>""",
    """
    <!-- Executive Revenue BI Dashboard -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(16,185,129,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">RevOps 360 - Executive Revenue Intelligence</text>
    <text x="90" y="112" fill="#10B981" font-size="12" font-weight="600">Apache Superset + PostgreSQL • Stripe, Ads &amp; CRM Unified Live</text>

    <!-- Top KPI Row -->
    <rect x="90" y="135" width="180" height="80" rx="10" fill="#051012" stroke="rgba(255,255,255,0.08)"/>
    <text x="105" y="158" fill="#94A3B8" font-size="10">ANNUAL RUN RATE</text>
    <text x="105" y="185" fill="#10B981" font-size="22" font-weight="800">$4.82M ARR</text>
    <text x="105" y="202" fill="#00D4FF" font-size="9">↑ 34% YoY Growth</text>

    <rect x="290" y="135" width="180" height="80" rx="10" fill="#051012" stroke="rgba(255,255,255,0.08)"/>
    <text x="305" y="158" fill="#94A3B8" font-size="10">CUSTOMER LTV</text>
    <text x="305" y="185" fill="#F8FAFC" font-size="22" font-weight="800">$18,400</text>
    <text x="305" y="202" fill="#10B981" font-size="9">LTV:CAC Ratio 4.2x</text>

    <rect x="490" y="135" width="220" height="80" rx="10" fill="#051012" stroke="rgba(255,255,255,0.08)"/>
    <text x="505" y="158" fill="#94A3B8" font-size="10">RECONCILIATION ERROR</text>
    <text x="505" y="185" fill="#00D4FF" font-size="22" font-weight="800">0.00%</text>
    <text x="505" y="202" fill="#94A3B8" font-size="9">Automated Daily Sync</text>

    <!-- Monthly Bar Chart -->
    <rect x="90" y="235" width="620" height="135" rx="10" fill="#051012" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="260" fill="#F8FAFC" font-size="11" font-weight="700">Monthly Recurring Revenue Trajectory</text>

    <!-- Bars -->
    <g fill="#10B981">
      <rect x="130" y="310" width="30" height="40" rx="4"/>
      <rect x="180" y="295" width="30" height="55" rx="4"/>
      <rect x="230" y="280" width="30" height="70" rx="4"/>
      <rect x="280" y="265" width="30" height="85" rx="4"/>
      <rect x="330" y="250" width="30" height="100" rx="4"/>
      <rect x="380" y="235" width="30" height="115" rx="4" fill="#00D4FF"/>
      <rect x="430" y="225" width="30" height="125" rx="4" fill="#00D4FF"/>
      <rect x="480" y="210" width="30" height="140" rx="4" fill="#00D4FF"/>
      <rect x="530" y="200" width="30" height="150" rx="4" fill="#10B981"/>
      <rect x="580" y="185" width="30" height="165" rx="4" fill="#10B981"/>
      <rect x="630" y="170" width="30" height="180" rx="4" fill="#10B981" filter="url(#glowCyan)"/>
    </g>
    """
)
save_svg("revops-bi.svg", p16)

# Project 17: ColdChain IoT Telemetry
p17 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081824"/>
      <stop offset="50%" stop-color="#0D273B"/>
      <stop offset="100%" stop-color="#040C12"/>
    </linearGradient>""",
    """
    <!-- IoT Cold Chain Gauge Screen -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,212,255,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">ColdChain BI - IoT Sensor Pharmaceutical Telemetry</text>
    <text x="90" y="112" fill="#00D4FF" font-size="12" font-weight="600">10,000 Events/Sec • 2°C - 8°C Cold Band Monitoring • $420k Spoilage Prevented</text>

    <!-- Live Temp Gauge Box -->
    <rect x="90" y="135" width="280" height="225" rx="12" fill="#050F18" stroke="rgba(255,255,255,0.08)"/>
    <text x="115" y="165" fill="#94A3B8" font-size="10" font-weight="600">LIVE VACCINE TEMPERATURE</text>
    
    <circle cx="230" cy="235" r="50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
    <circle cx="230" cy="235" r="50" fill="none" stroke="#00D4FF" stroke-width="8" stroke-dasharray="240" stroke-dashoffset="100" filter="url(#glowCyan)"/>
    <text x="230" y="235" fill="#F8FAFC" font-size="24" font-weight="800" text-anchor="middle">4.2°C</text>
    <text x="230" y="255" fill="#10B981" font-size="10" font-weight="700" text-anchor="middle">STABLE (2° - 8°C)</text>
    <text x="230" y="320" fill="#94A3B8" font-size="11" text-anchor="middle">Fleet Unit #48: Delhi - Mumbai Highway</text>

    <!-- Right Side Alert Status & Map -->
    <rect x="390" y="135" width="320" height="100" rx="10" fill="#050F18" stroke="rgba(255,255,255,0.08)"/>
    <text x="410" y="165" fill="#94A3B8" font-size="10" font-weight="600">ALERTS RESPONSE TIME</text>
    <text x="410" y="195" fill="#10B981" font-size="24" font-weight="800">&lt;2 Seconds</text>
    <text x="410" y="215" fill="#64748B" font-size="11">Automated WhatsApp excursion callout</text>

    <rect x="390" y="250" width="320" height="110" rx="10" fill="#050F18" stroke="rgba(255,255,255,0.08)"/>
    <text x="410" y="280" fill="#94A3B8" font-size="10" font-weight="600">TOTAL MONITORED UNITS</text>
    <text x="410" y="310" fill="#F8FAFC" font-size="22" font-weight="800">140 Reefer Trucks Active</text>
    <text x="410" y="335" fill="#00D4FF" font-size="11">Zero Spoilage Incidents across 12 Mos</text>
    """
)
save_svg("coldchain-bi.svg", p17)

# =============================================================================
# 9. E-COMMERCE DEVELOPMENT
# =============================================================================
# Project 18: Heritage Crafts D2C Storefront
p18 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#190F0C"/>
      <stop offset="50%" stop-color="#281712"/>
      <stop offset="100%" stop-color="#0C0705"/>
    </linearGradient>""",
    """
    <!-- E-Commerce Storefront Card -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(244,63,94,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">Heritage Crafts - Headless D2C Storefront</text>
    <text x="90" y="112" fill="#F43F5E" font-size="12" font-weight="600">Next.js 16 • Razorpay Instant Checkout • 1-Tap WhatsApp Order Routing</text>

    <!-- Product Card 1 -->
    <rect x="90" y="135" width="280" height="225" rx="12" fill="#0C0605" stroke="rgba(255,255,255,0.08)"/>
    <rect x="105" y="150" width="250" height="110" rx="8" fill="rgba(244,63,94,0.15)"/>
    <text x="230" y="210" fill="#F43F5E" font-size="14" font-weight="700" text-anchor="middle">Handcrafted Brass Decor</text>
    
    <text x="110" y="285" fill="#F8FAFC" font-size="14" font-weight="800">Royal Handcrafted Brass Urli</text>
    <text x="110" y="305" fill="#10B981" font-size="15" font-weight="800">₹2,499 INR <tspan fill="#64748B" font-size="11" text-decoration="line-through">₹3,999</tspan></text>
    
    <rect x="110" y="320" width="240" height="30" rx="15" fill="#10B981"/>
    <text x="230" y="340" fill="#000000" font-size="11" font-weight="800" text-anchor="middle">Buy on WhatsApp in 1-Tap 💬</text>

    <!-- Right Side Conversion Metrics -->
    <rect x="390" y="135" width="320" height="105" rx="10" fill="#0C0605" stroke="rgba(255,255,255,0.08)"/>
    <text x="410" y="165" fill="#94A3B8" font-size="10">INQUIRY CONVERSION LIFT</text>
    <text x="410" y="195" fill="#10B981" font-size="26" font-weight="800">+42% Growth</text>
    <text x="410" y="218" fill="#64748B" font-size="11">Within 30 days of headless rollout</text>

    <rect x="390" y="255" width="320" height="105" rx="10" fill="#0C0605" stroke="rgba(255,255,255,0.08)"/>
    <text x="410" y="285" fill="#94A3B8" font-size="10">MOBILE CART SPEED</text>
    <text x="410" y="315" fill="#00D4FF" font-size="26" font-weight="800">&lt;250 ms</text>
    <text x="410" y="338" fill="#64748B" font-size="11">Sub-second loading on 3G/4G networks</text>
    """
)
save_svg("heritage-crafts.svg", p18)

# Project 19: LuxeAura Fashion E-Commerce
p19 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D15"/>
      <stop offset="50%" stop-color="#2B1423"/>
      <stop offset="100%" stop-color="#0D060A"/>
    </linearGradient>""",
    """
    <!-- High-Fashion Omnichannel Grid -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(244,63,94,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">LuxeAura - High-Volume Fashion &amp; Beauty</text>
    <text x="90" y="112" fill="#F43F5E" font-size="12" font-weight="600">Shopify Storefront API • Algolia Instant Search &lt;80ms • 4.8% Conversion</text>

    <!-- Lookbook Preview Frame -->
    <rect x="90" y="135" width="300" height="225" rx="12" fill="#0A0408" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="165" fill="#F8FAFC" font-size="14" font-weight="800">Autumn Velvet Couture Collection</text>
    
    <!-- Size Selector Modal Mockup -->
    <rect x="110" y="185" width="260" height="60" rx="8" fill="rgba(255,255,255,0.03)"/>
    <text x="120" y="205" fill="#94A3B8" font-size="10">SELECT SIZE (AI FIT RECOMMENDER)</text>
    <rect x="120" y="215" width="32" height="24" rx="4" fill="#F43F5E"/>
    <text x="136" y="231" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">S</text>
    <rect x="160" y="215" width="32" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
    <text x="176" y="231" fill="#FFFFFF" font-size="10" text-anchor="middle">M</text>
    <rect x="200" y="215" width="32" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
    <text x="216" y="231" fill="#FFFFFF" font-size="10" text-anchor="middle">L</text>
    <rect x="240" y="215" width="32" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
    <text x="256" y="231" fill="#FFFFFF" font-size="10" text-anchor="middle">XL</text>

    <rect x="110" y="265" width="260" height="42" rx="21" fill="#0064E0"/>
    <text x="240" y="291" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">Add to Bag • $280 USD</text>

    <text x="240" y="335" fill="#10B981" font-size="10" text-anchor="middle">✓ In Stock • Free Express Global Shipping</text>

    <!-- Right Side Performance Metrics -->
    <rect x="410" y="135" width="300" height="105" rx="10" fill="#0A0408" stroke="rgba(255,255,255,0.08)"/>
    <text x="430" y="165" fill="#94A3B8" font-size="10">INSTANT SEARCH SPEED</text>
    <text x="430" y="195" fill="#00D4FF" font-size="26" font-weight="800">&lt;80 ms</text>
    <text x="430" y="218" fill="#64748B" font-size="11">Client-side Algolia faceted search</text>

    <rect x="410" y="255" width="300" height="105" rx="10" fill="#0A0408" stroke="rgba(255,255,255,0.08)"/>
    <text x="430" y="285" fill="#94A3B8" font-size="10">ABANDONED CART RECOVERY</text>
    <text x="430" y="315" fill="#10B981" font-size="26" font-weight="800">-32% Drop-off</text>
    <text x="430" y="338" fill="#64748B" font-size="11">Automated WhatsApp &amp; SMS recovery</text>
    """
)
save_svg("luxeaura-fashion.svg", p19)

# =============================================================================
# 10. SAAS PLATFORM DEVELOPMENT
# =============================================================================
# Project 20: TaskMatrix Multi-Tenant SaaS
p20 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A101D"/>
      <stop offset="50%" stop-color="#0E1A2E"/>
      <stop offset="100%" stop-color="#05080E"/>
    </linearGradient>""",
    """
    <!-- SaaS Kanban Board Interface -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,100,224,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">TaskMatrix - Enterprise Multi-Tenant SaaS</text>
    <text x="90" y="112" fill="#00D4FF" font-size="12" font-weight="600">4,500+ Company Workspaces • Partitioned PostgreSQL • Stripe Billing</text>

    <!-- Column 1: Backlog -->
    <rect x="90" y="135" width="195" height="225" rx="10" fill="#060B14" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="162" fill="#94A3B8" font-size="11" font-weight="700">TO DO (8)</text>
    <rect x="105" y="175" width="165" height="50" rx="6" fill="rgba(255,255,255,0.04)"/>
    <text x="115" y="195" fill="#F8FAFC" font-size="10">API Gateway Auth</text>
    <rect x="115" y="205" width="40" height="12" rx="3" fill="#EF4444"/>
    <text x="135" y="214" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">HIGH</text>

    <!-- Column 2: In Progress -->
    <rect x="300" y="135" width="195" height="225" rx="10" fill="#060B14" stroke="rgba(0,212,255,0.3)"/>
    <text x="320" y="162" fill="#00D4FF" font-size="11" font-weight="700">IN PROGRESS (4)</text>
    <rect x="315" y="175" width="165" height="60" rx="6" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.2)"/>
    <text x="325" y="195" fill="#F8FAFC" font-size="10">Tenant DB Migration</text>
    <text x="325" y="210" fill="#94A3B8" font-size="9">Assigned: @sarah_eng</text>
    <rect x="325" y="218" width="60" height="12" rx="3" fill="#00D4FF"/>
    <text x="355" y="227" fill="#000000" font-size="8" font-weight="700" text-anchor="middle">ACTIVE</text>

    <!-- Column 3: Done -->
    <rect x="510" y="135" width="195" height="225" rx="10" fill="#060B14" stroke="rgba(255,255,255,0.08)"/>
    <text x="530" y="162" fill="#10B981" font-size="11" font-weight="700">DONE (32)</text>
    <rect x="525" y="175" width="165" height="50" rx="6" fill="rgba(16,185,129,0.08)"/>
    <text x="535" y="195" fill="#F8FAFC" font-size="10">Stripe Invoicing V2</text>
    <text x="535" y="210" fill="#10B981" font-size="9">✓ Deployed in 32ms</text>
    """
)
save_svg("taskmatrix-saas.svg", p20)

# Project 21: BillSync GST Invoicing
p21 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0C151B"/>
      <stop offset="50%" stop-color="#12232E"/>
      <stop offset="100%" stop-color="#050A0E"/>
    </linearGradient>""",
    """
    <!-- Indian GST Tax Invoice Document Preview -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(16,185,129,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">BillSync - Automated GST Tax &amp; E-Way Bill SaaS</text>
    <text x="90" y="112" fill="#10B981" font-size="12" font-weight="600">350,000+ Invoices Generated • Government NIC API Direct Sync • WhatsApp Delivery</text>

    <!-- Formal Invoice Card Mockup -->
    <rect x="90" y="135" width="340" height="225" rx="12" fill="#060D12" stroke="rgba(255,255,255,0.08)"/>
    <text x="115" y="165" fill="#F8FAFC" font-size="13" font-weight="800">TAX INVOICE: INV-2024-8841</text>
    <text x="115" y="182" fill="#94A3B8" font-size="10">GSTIN: 07AABCB1234F1Z8 • MSME Verified</text>
    
    <!-- Invoice Line Items Table -->
    <rect x="110" y="195" width="300" height="85" rx="6" fill="rgba(255,255,255,0.03)"/>
    <text x="120" y="215" fill="#94A3B8" font-size="9">ITEM / SERVICE DESCRIPTION</text>
    <text x="360" y="215" fill="#94A3B8" font-size="9" text-anchor="end">TOTAL (INR)</text>
    <text x="120" y="235" fill="#F8FAFC" font-size="10">Cloud Architecture Retainer</text>
    <text x="360" y="235" fill="#F8FAFC" font-size="10" font-weight="700" text-anchor="end">₹1,50,000</text>
    <text x="120" y="255" fill="#94A3B8" font-size="9">CGST (9%) + SGST (9%)</text>
    <text x="360" y="255" fill="#10B981" font-size="9" font-weight="700" text-anchor="end">+ ₹27,000</text>

    <!-- QR Code Seal -->
    <rect x="110" y="295" width="50" height="50" rx="4" fill="#FFFFFF"/>
    <text x="135" y="325" fill="#000000" font-size="8" font-weight="700" text-anchor="middle">GOVT QR</text>
    <text x="175" y="315" fill="#10B981" font-size="11" font-weight="700">✓ IRN Verified</text>
    <text x="175" y="332" fill="#94A3B8" font-size="10">NIC E-Invoice Portal Sync</text>

    <!-- Right Side Performance Stats -->
    <rect x="450" y="135" width="260" height="105" rx="10" fill="#060D12" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="165" fill="#94A3B8" font-size="10">GENERATION SPEED</text>
    <text x="470" y="195" fill="#10B981" font-size="26" font-weight="800">&lt;1.5 Seconds</text>
    <text x="470" y="218" fill="#64748B" font-size="11">PDFKit + QR vector rendering</text>

    <rect x="450" y="255" width="260" height="105" rx="10" fill="#060D12" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="285" fill="#94A3B8" font-size="10">WHATSAPP READ RATE</text>
    <text x="470" y="315" fill="#00D4FF" font-size="26" font-weight="800">99.2%</text>
    <text x="470" y="338" fill="#64748B" font-size="11">Instant billing receipts</text>
    """
)
save_svg("billsync-saas.svg", p21)

# =============================================================================
# 11. API INTEGRATION & MIDDLEWARE
# =============================================================================
# Project 22: Fintech Payment Gateway Webhook Engine
p22 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09141D"/>
      <stop offset="50%" stop-color="#0E202E"/>
      <stop offset="100%" stop-color="#04090E"/>
    </linearGradient>""",
    """
    <!-- Idempotent Webhook Stream -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,212,255,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">Fintech Payment Gateway &amp; Reconciliation Engine</text>
    <text x="90" y="112" fill="#00D4FF" font-size="12" font-weight="600">HMAC SHA-256 Webhooks • 0.00% Discrepancy • Sub-30ms Settlement</text>

    <!-- Left Ledger Stream -->
    <rect x="90" y="135" width="340" height="225" rx="12" fill="#050C12" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="165" fill="#F8FAFC" font-size="12" font-weight="700">Real-Time Idempotent Webhook Stream</text>

    <g font-size="10" class="mono">
      <rect x="105" y="180" width="310" height="36" rx="6" fill="rgba(16,185,129,0.1)"/>
      <text x="115" y="202" fill="#10B981">POST /webhooks/razorpay [200 OK] 24ms</text>
      <text x="390" y="202" fill="#10B981" font-weight="700" text-anchor="end">SETTLED</text>

      <rect x="105" y="224" width="310" height="36" rx="6" fill="rgba(16,185,129,0.1)"/>
      <text x="115" y="246" fill="#10B981">POST /webhooks/stripe [200 OK] 18ms</text>
      <text x="390" y="246" fill="#10B981" font-weight="700" text-anchor="end">SETTLED</text>

      <rect x="105" y="268" width="310" height="36" rx="6" fill="rgba(0,212,255,0.1)"/>
      <text x="115" y="290" fill="#00D4FF">DUP_KEY_CHECK: evt_994821 [CACHED]</text>
      <text x="390" y="290" fill="#00D4FF" font-weight="700" text-anchor="end">IDEMPOTENT</text>

      <rect x="105" y="312" width="310" height="36" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="115" y="334" fill="#94A3B8">POST /webhooks/payout [200 OK] 28ms</text>
      <text x="390" y="334" fill="#10B981" font-weight="700" text-anchor="end">VERIFIED</text>
    </g>

    <!-- Right Metrics -->
    <rect x="450" y="135" width="260" height="105" rx="10" fill="#050C12" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="165" fill="#94A3B8" font-size="10">DISCREPANCY RATE</text>
    <text x="470" y="195" fill="#10B981" font-size="28" font-weight="800">0.00%</text>
    <text x="470" y="218" fill="#64748B" font-size="11">Dual-entry ledger reconciliation</text>

    <rect x="450" y="255" width="260" height="105" rx="10" fill="#050C12" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="285" fill="#94A3B8" font-size="10">AUDIT COMPLIANCE</text>
    <text x="470" y="315" fill="#00D4FF" font-size="28" font-weight="800">100% Passed</text>
    <text x="470" y="338" fill="#64748B" font-size="11">Zero duplicate charge incidents</text>
    """
)
save_svg("fintech-gateway.svg", p22)

# Project 23: OmniSync Middleware
p23 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A161E"/>
      <stop offset="50%" stop-color="#0F2432"/>
      <stop offset="100%" stop-color="#050C10"/>
    </linearGradient>""",
    """
    <!-- Three-Way Middleware Bridge -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(56,189,248,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">OmniSync - Unified CRM, ERP &amp; Logistics Middleware</text>
    <text x="90" y="112" fill="#38BDF8" font-size="12" font-weight="600">1.2M Daily Events • HubSpot CRM + SAP ERP + Shiprocket Sync</text>

    <!-- Node 1: HubSpot -->
    <rect x="90" y="170" width="160" height="90" rx="10" fill="#060E14" stroke="rgba(255,255,255,0.1)"/>
    <text x="105" y="200" fill="#94A3B8" font-size="10">SALES &amp; PIPELINE</text>
    <text x="105" y="225" fill="#F8FAFC" font-size="16" font-weight="800">HubSpot CRM</text>
    <text x="105" y="245" fill="#10B981" font-size="10">Customer Deal Won</text>

    <!-- Arrows to Center Middleware -->
    <line x1="250" y1="215" x2="310" y2="215" stroke="#38BDF8" stroke-width="2"/>

    <!-- Center Node: OmniSync Workers -->
    <rect x="310" y="145" width="180" height="140" rx="12" fill="#0284C7" stroke="#38BDF8" stroke-width="2" filter="url(#glowCyan)"/>
    <text x="400" y="180" fill="#FFFFFF" font-size="15" font-weight="800" text-anchor="middle">OmniSync Engine</text>
    <text x="400" y="200" fill="#E0F2FE" font-size="11" text-anchor="middle">Cloudflare Workers</text>
    <rect x="330" y="220" width="140" height="26" rx="6" fill="rgba(0,0,0,0.3)"/>
    <text x="400" y="237" fill="#38BDF8" font-size="10" font-weight="700" text-anchor="middle">&lt;120ms Queue Latency</text>
    <text x="400" y="265" fill="#FFFFFF" font-size="10" text-anchor="middle">Dead-Letter Retry Active</text>

    <!-- Arrows to Destinations -->
    <line x1="490" y1="185" x2="550" y2="160" stroke="#38BDF8" stroke-width="2"/>
    <line x1="490" y1="245" x2="550" y2="270" stroke="#38BDF8" stroke-width="2"/>

    <!-- Node 2: SAP ERP -->
    <rect x="550" y="130" width="160" height="70" rx="10" fill="#060E14" stroke="rgba(255,255,255,0.1)"/>
    <text x="565" y="155" fill="#94A3B8" font-size="9">INVENTORY &amp; LEDGER</text>
    <text x="565" y="178" fill="#F8FAFC" font-size="14" font-weight="800">SAP ERP</text>

    <!-- Node 3: Shiprocket -->
    <rect x="550" y="235" width="160" height="70" rx="10" fill="#060E14" stroke="rgba(255,255,255,0.1)"/>
    <text x="565" y="260" fill="#94A3B8" font-size="9">COURIER DISPATCH</text>
    <text x="565" y="283" fill="#F8FAFC" font-size="14" font-weight="800">Shiprocket API</text>

    <text x="400" y="340" fill="#94A3B8" font-size="11" text-anchor="middle">Zero dropped webhooks across 1.2M daily transactional messages</text>
    """
)
save_svg("omnisync-middleware.svg", p23)

# =============================================================================
# 12. DIGITAL MARKETING & TECHNICAL SEO
# =============================================================================
# Project 24: SEOAccelerator EdTech
p24 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081812"/>
      <stop offset="50%" stop-color="#0E271D"/>
      <stop offset="100%" stop-color="#040C08"/>
    </linearGradient>""",
    """
    <!-- SEO Growth Trajectory Screen -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(16,185,129,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">SEOAccelerator - EdTech Organic Growth Domination</text>
    <text x="90" y="112" fill="#10B981" font-size="12" font-weight="600">Schema.org JSON-LD • Core Web Vitals 99/100 • 140+ #1 Google Keywords</text>

    <!-- Left Stats Cards -->
    <rect x="90" y="135" width="180" height="100" rx="10" fill="#05100B" stroke="rgba(255,255,255,0.08)"/>
    <text x="105" y="162" fill="#94A3B8" font-size="10">ORGANIC TRAFFIC</text>
    <text x="105" y="195" fill="#10B981" font-size="26" font-weight="800">+340% Lift</text>
    <text x="105" y="218" fill="#64748B" font-size="10">Over 90-day execution sprint</text>

    <rect x="90" y="250" width="180" height="110" rx="10" fill="#05100B" stroke="rgba(255,255,255,0.08)"/>
    <text x="105" y="278" fill="#94A3B8" font-size="10">TOP 3 RANKINGS</text>
    <text x="105" y="312" fill="#F59E0B" font-size="26" font-weight="800">140+ Keywords</text>
    <text x="105" y="335" fill="#10B981" font-size="10">Core Web Vitals: 99/100</text>

    <!-- Right Organic Traffic Spike Chart -->
    <rect x="290" y="135" width="420" height="225" rx="12" fill="#05100B" stroke="rgba(255,255,255,0.08)"/>
    <text x="315" y="165" fill="#F8FAFC" font-size="13" font-weight="700">Google Search Console Monthly Clicks</text>
    
    <!-- Upward Trend Curve -->
    <path d="M 315 310 Q 380 300 440 280 T 550 200 T 680 140 L 680 330 L 315 330 Z" fill="url(#seoGrad)" opacity="0.3"/>
    <path d="M 315 310 Q 380 300 440 280 T 550 200 T 680 140" fill="none" stroke="#10B981" stroke-width="3" filter="url(#glowCyan)"/>
    <circle cx="680" cy="140" r="5" fill="#10B981"/>
    
    <defs>
      <linearGradient id="seoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    
    <text x="680" y="125" fill="#10B981" font-size="11" font-weight="700" text-anchor="end">850k Monthly Clicks</text>
    """
)
save_svg("seo-accelerator.svg", p24)

# Project 25: LocalRank 360 Dental Clinics
p25 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09181B"/>
      <stop offset="50%" stop-color="#0E2429"/>
      <stop offset="100%" stop-color="#040C0E"/>
    </linearGradient>""",
    """
    <!-- Google Local 3-Pack Map Simulation -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(20,184,166,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">LocalRank 360 - Multi-Location Healthcare SEO</text>
    <text x="90" y="112" fill="#14B8A6" font-size="12" font-weight="600">14 Regional Dental Centers • Google Maps 3-Pack • +210% Consultations</text>

    <!-- Google 3-Pack Mockup -->
    <rect x="90" y="135" width="340" height="225" rx="12" fill="#050E10" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="165" fill="#F8FAFC" font-size="12" font-weight="700">Google Search: &quot;best dental clinic near me&quot;</text>

    <!-- Pack Item 1 (Rank 1) -->
    <rect x="105" y="180" width="310" height="50" rx="6" fill="rgba(20,184,166,0.12)" stroke="rgba(20,184,166,0.3)"/>
    <text x="120" y="200" fill="#F8FAFC" font-size="11" font-weight="700">#1 SmileCare Multispecialty Dental</text>
    <text x="120" y="218" fill="#F59E0B" font-size="10">★★★★★ 4.9 (420 reviews) • Open 24/7</text>
    <text x="400" y="208" fill="#14B8A6" font-size="10" font-weight="700" text-anchor="end">Call Now</text>

    <!-- Pack Item 2 (Rank 2) -->
    <rect x="105" y="238" width="310" height="50" rx="6" fill="rgba(255,255,255,0.03)"/>
    <text x="120" y="258" fill="#F8FAFC" font-size="11" font-weight="700">#2 SmileCare Orthodontics Hub</text>
    <text x="120" y="276" fill="#F59E0B" font-size="10">★★★★★ 4.8 (310 reviews) • Dental Implants</text>
    <text x="400" y="266" fill="#94A3B8" font-size="10" text-anchor="end">Directions</text>

    <!-- Pack Item 3 (Rank 3) -->
    <rect x="105" y="296" width="310" height="50" rx="6" fill="rgba(255,255,255,0.03)"/>
    <text x="120" y="316" fill="#F8FAFC" font-size="11" font-weight="700">#3 SmileCare Laser Dentistry</text>
    <text x="120" y="334" fill="#F59E0B" font-size="10">★★★★★ 4.9 (280 reviews) • Verified NAP</text>

    <!-- Right Side Local Conversion Metrics -->
    <rect x="450" y="135" width="260" height="105" rx="10" fill="#050E10" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="165" fill="#94A3B8" font-size="10">CONFIRMED APPOINTMENTS</text>
    <text x="470" y="195" fill="#10B981" font-size="28" font-weight="800">+210%</text>
    <text x="470" y="218" fill="#64748B" font-size="11">Monthly organic patient calls</text>

    <rect x="450" y="255" width="260" height="105" rx="10" fill="#050E10" stroke="rgba(255,255,255,0.08)"/>
    <text x="470" y="285" fill="#94A3B8" font-size="10">GOOGLE 3-PACK DOMINATION</text>
    <text x="470" y="315" fill="#14B8A6" font-size="28" font-weight="800">12 / 14 Clinics</text>
    <text x="470" y="338" fill="#64748B" font-size="11">Secured #1 or #2 local position</text>
    """
)
save_svg("localrank-seo.svg", p25)

# =============================================================================
# 13. SOFTWARE TESTING & QUALITY ASSURANCE
# =============================================================================
# Project 26: QualityShield Playwright E2E
p26 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1612"/>
      <stop offset="50%" stop-color="#0F241C"/>
      <stop offset="100%" stop-color="#050C0A"/>
    </linearGradient>""",
    """
    <!-- Playwright Terminal Test Runner -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(132,204,22,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">QualityShield - Automated Playwright E2E Suite</text>
    <text x="90" y="112" fill="#84CC16" font-size="12" font-weight="600">480+ Scenarios • Parallel Cross-Browser Runners • 99.4% Regression Catch Rate</text>

    <!-- Terminal Runner Mockup -->
    <rect x="90" y="135" width="410" height="225" rx="10" fill="#050D0A" stroke="rgba(255,255,255,0.08)"/>
    <text x="115" y="165" fill="#94A3B8" font-size="11" class="mono">$ npx playwright test --workers=8</text>

    <g font-size="10" class="mono">
      <text x="115" y="195" fill="#10B981">✓ [chromium] › checkout.spec.ts:42 (1.2s)</text>
      <text x="115" y="218" fill="#10B981">✓ [firefox]  › payment-gateway.spec.ts:18 (1.8s)</text>
      <text x="115" y="241" fill="#10B981">✓ [webkit]   › mobile-drawer-navigation.spec.ts:9 (950ms)</text>
      <text x="115" y="264" fill="#10B981">✓ [chromium] › idempotency-retry.spec.ts:74 (1.4s)</text>
      <text x="115" y="287" fill="#10B981">✓ [chromium] › multi-tenant-role-rbac.spec.ts:12 (2.1s)</text>
      <text x="115" y="315" fill="#84CC16" font-weight="700">480 passed (14m 38s) — 0 failed, 0 flaky</text>
      <text x="115" y="340" fill="#64748B">Visual Diff: Pixelmatch 0.00% delta across 12 viewports</text>
    </g>

    <!-- Right QA Stats -->
    <rect x="520" y="135" width="190" height="105" rx="10" fill="#050D0A" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="165" fill="#94A3B8" font-size="10">CATCH RATE</text>
    <text x="535" y="195" fill="#10B981" font-size="26" font-weight="800">99.4%</text>
    <text x="535" y="218" fill="#64748B" font-size="10">Pre-production bugs</text>

    <rect x="520" y="255" width="190" height="105" rx="10" fill="#050D0A" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="285" fill="#94A3B8" font-size="10">RELEASE QA TIME</text>
    <text x="535" y="315" fill="#84CC16" font-size="26" font-weight="800">15 Min</text>
    <text x="535" y="338" fill="#64748B" font-size="10">Replaced 3 manual days</text>
    """
)
save_svg("qualityshield-qa.svg", p26)

# Project 27: LoadBench k6 Stress Test
p27 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A131E"/>
      <stop offset="50%" stop-color="#0E1F30"/>
      <stop offset="100%" stop-color="#050A10"/>
    </linearGradient>""",
    """
    <!-- k6 Load Test Telemetry -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(56,189,248,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">LoadBench - High-Concurrency Flash Sale Stress Test</text>
    <text x="90" y="112" fill="#38BDF8" font-size="12" font-weight="600">30,000 Concurrent Virtual Users • P99 &lt;140ms • Zero Black Friday Downtime</text>

    <!-- Center Load Chart -->
    <rect x="90" y="135" width="410" height="225" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="115" y="165" fill="#F8FAFC" font-size="12" font-weight="700">k6 Virtual Users vs Response Latency Ramp</text>

    <!-- 30k User Stepped Ramp Curve -->
    <path d="M 115 310 L 200 280 L 280 230 L 360 170 L 480 170" fill="none" stroke="#38BDF8" stroke-width="3" filter="url(#glowCyan)"/>
    <circle cx="480" cy="170" r="5" fill="#38BDF8"/>
    
    <text x="480" y="155" fill="#38BDF8" font-size="11" font-weight="700" text-anchor="end">30,000 Virtual Users (Sustained)</text>

    <!-- Response Latency Flat Line -->
    <line x1="115" y1="330" x2="480" y2="330" stroke="#10B981" stroke-width="2"/>
    <text x="115" y="322" fill="#10B981" font-size="10">P99 Latency Flat &lt;140ms (Zero Degradation)</text>

    <!-- Right Stats -->
    <rect x="520" y="135" width="190" height="105" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="165" fill="#94A3B8" font-size="10">SIMULATED TRAFFIC</text>
    <text x="535" y="195" fill="#38BDF8" font-size="24" font-weight="800">30,000</text>
    <text x="535" y="218" fill="#64748B" font-size="10">Concurrent checkout carts</text>

    <rect x="520" y="255" width="190" height="105" rx="10" fill="#060C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="285" fill="#94A3B8" font-size="10">FESTIVAL OUTAGES</text>
    <text x="535" y="315" fill="#10B981" font-size="24" font-weight="800">0 Seconds</text>
    <text x="535" y="338" fill="#64748B" font-size="10">100% Up during flash sales</text>
    """
)
save_svg("loadbench-qa.svg", p27)

# =============================================================================
# 14. IT CONSULTING & STRATEGY
# =============================================================================
# Project 28: LegacyModernize Banking Architecture
p28 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0C101A"/>
      <stop offset="50%" stop-color="#121827"/>
      <stop offset="100%" stop-color="#060910"/>
    </linearGradient>""",
    """
    <!-- Enterprise Architecture Blueprint -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(245,158,11,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">LegacyModernize - Banking Monolith Decoupling</text>
    <text x="90" y="112" fill="#F59E0B" font-size="12" font-weight="600">Strangler Fig Migration • 18-Month Phased Roadmap • $1.2M Saved</text>

    <!-- Legacy Monolith Block -->
    <rect x="90" y="145" width="180" height="140" rx="10" fill="#080C14" stroke="rgba(239,68,68,0.4)"/>
    <text x="110" y="175" fill="#EF4444" font-size="12" font-weight="700">14-Yr Legacy Core</text>
    <text x="110" y="195" fill="#94A3B8" font-size="10">On-Premise Mainframe</text>
    <text x="110" y="215" fill="#94A3B8" font-size="10">COBOL / Java Monolith</text>
    <rect x="110" y="235" width="140" height="26" rx="4" fill="rgba(239,68,68,0.2)"/>
    <text x="180" y="252" fill="#EF4444" font-size="10" font-weight="700" text-anchor="middle">DECOUPLING PHASE 3</text>

    <!-- Decoupling Event Broker -->
    <path d="M 270 215 L 320 215" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4"/>
    <circle cx="340" cy="215" r="20" fill="#F59E0B" filter="url(#glowCyan)"/>
    <text x="340" y="220" fill="#000000" font-size="10" font-weight="800" text-anchor="middle">Kafka</text>
    <path d="M 360 215 L 410 215" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Modern Microservices -->
    <rect x="410" y="145" width="300" height="140" rx="10" fill="#080C14" stroke="rgba(16,185,129,0.4)"/>
    <text x="430" y="175" fill="#10B981" font-size="12" font-weight="700">Target Cloud Microservices</text>
    <text x="430" y="198" fill="#F8FAFC" font-size="11">✓ Accounts &amp; Ledger API (Docker/K8s)</text>
    <text x="430" y="222" fill="#F8FAFC" font-size="11">✓ Mobile Banking Modern Adapter</text>
    <text x="430" y="246" fill="#F8FAFC" font-size="11">✓ Multi-Region Cloudflare Edge Gate</text>
    <text x="430" y="270" fill="#10B981" font-size="10" font-weight="700">100% Uptime Maintained During Cutover</text>

    <!-- Bottom Result Banner -->
    <text x="400" y="340" fill="#F59E0B" font-size="12" font-weight="700" text-anchor="middle">
      Objective technical advisory saved $1.2M in predatory vendor lock-in fees
    </text>
    """
)
save_svg("legacymodernize-banking.svg", p28)

# Project 29: FintechGov Startup Advisory
p29 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D101C"/>
      <stop offset="50%" stop-color="#141A2D"/>
      <stop offset="100%" stop-color="#060810"/>
    </linearGradient>""",
    """
    <!-- Startup Fractional CTO Advisory -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,100,224,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">FintechGov - Startup Cloud Compliance &amp; Advisory</text>
    <text x="90" y="112" fill="#38BDF8" font-size="12" font-weight="600">Fractional CTO Advisory • $2.4M Series A Raised • 14 Months Runway Extended</text>

    <!-- Seed to Scale Milestones -->
    <rect x="90" y="145" width="200" height="180" rx="10" fill="#080C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="175" fill="#38BDF8" font-size="11" font-weight="700">MILESTONE 01</text>
    <text x="110" y="198" fill="#F8FAFC" font-size="13" font-weight="800">Lean Stack Architecture</text>
    <text x="110" y="220" fill="#94A3B8" font-size="10">Serverless edge primitives</text>
    <text x="110" y="240" fill="#94A3B8" font-size="10">Zero vendor lock-in</text>
    <text x="110" y="260" fill="#10B981" font-size="11" font-weight="700">+14 Mos Runway</text>

    <rect x="310" y="145" width="200" height="180" rx="10" fill="#080C14" stroke="rgba(255,255,255,0.08)"/>
    <text x="330" y="175" fill="#38BDF8" font-size="11" font-weight="700">MILESTONE 02</text>
    <text x="330" y="198" fill="#F8FAFC" font-size="13" font-weight="800">PCI-DSS &amp; Security</text>
    <text x="330" y="220" fill="#94A3B8" font-size="10">Encrypted token vault</text>
    <text x="330" y="240" fill="#94A3B8" font-size="10">SOC 2 compliance map</text>
    <text x="330" y="260" fill="#10B981" font-size="11" font-weight="700">100% Audit Score</text>

    <rect x="530" y="145" width="180" height="180" rx="10" fill="#080C14" stroke="rgba(16,185,129,0.3)"/>
    <text x="550" y="175" fill="#10B981" font-size="11" font-weight="700">SERIES A ENABLED</text>
    <text x="550" y="205" fill="#10B981" font-size="28" font-weight="800">$2.4M</text>
    <text x="550" y="230" fill="#F8FAFC" font-size="12" font-weight="700">Equity Round Closed</text>
    <text x="550" y="255" fill="#94A3B8" font-size="10">Technical Due Diligence</text>
    <text x="550" y="275" fill="#94A3B8" font-size="10">Passed Without Flaws</text>
    """
)
save_svg("fintechgov-advisory.svg", p29)

# =============================================================================
# 15. WEBSITE MAINTENANCE & SECURITY PATCHING
# =============================================================================
# Project 30: CarePulse Hospital Maintenance SLA
p30 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08181A"/>
      <stop offset="50%" stop-color="#0D262B"/>
      <stop offset="100%" stop-color="#040C0D"/>
    </linearGradient>""",
    """
    <!-- 24/7 Managed Uptime Grid -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(20,184,166,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">CarePulse - 24/7 Managed Hospital Network SLA</text>
    <text x="90" y="112" fill="#14B8A6" font-size="12" font-weight="600">5 Regional Campuses • 99.99% Verified Uptime • &lt;12 Min Emergency Response</text>

    <!-- Top Status Banner -->
    <rect x="90" y="135" width="620" height="55" rx="10" fill="#040F11" stroke="rgba(20,184,166,0.2)"/>
    <circle cx="120" cy="162" r="8" fill="#10B981" filter="url(#glowCyan)"/>
    <text x="140" y="166" fill="#F8FAFC" font-size="13" font-weight="700">All 5 Hospital Campuses Operational</text>
    <text x="690" y="166" fill="#10B981" font-size="13" font-weight="800" text-anchor="end">99.99% Uptime SLA</text>

    <!-- 90-Day Uptime Calendar Bars Grid -->
    <rect x="90" y="205" width="620" height="90" rx="10" fill="#040F11" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="230" fill="#94A3B8" font-size="11">90-Day Continuous Incident Verification Matrix (365 Consecutive Days Stable)</text>
    
    <!-- Green bars row -->
    <g fill="#10B981">
      <rect x="110" y="245" width="12" height="32" rx="2"/>
      <rect x="126" y="245" width="12" height="32" rx="2"/>
      <rect x="142" y="245" width="12" height="32" rx="2"/>
      <rect x="158" y="245" width="12" height="32" rx="2"/>
      <rect x="174" y="245" width="12" height="32" rx="2"/>
      <rect x="190" y="245" width="12" height="32" rx="2"/>
      <rect x="206" y="245" width="12" height="32" rx="2"/>
      <rect x="222" y="245" width="12" height="32" rx="2"/>
      <rect x="238" y="245" width="12" height="32" rx="2"/>
      <rect x="254" y="245" width="12" height="32" rx="2"/>
      <rect x="270" y="245" width="12" height="32" rx="2"/>
      <rect x="286" y="245" width="12" height="32" rx="2"/>
      <rect x="302" y="245" width="12" height="32" rx="2"/>
      <rect x="318" y="245" width="12" height="32" rx="2"/>
      <rect x="334" y="245" width="12" height="32" rx="2"/>
      <rect x="350" y="245" width="12" height="32" rx="2"/>
      <rect x="366" y="245" width="12" height="32" rx="2"/>
      <rect x="382" y="245" width="12" height="32" rx="2"/>
      <rect x="398" y="245" width="12" height="32" rx="2"/>
      <rect x="414" y="245" width="12" height="32" rx="2"/>
      <rect x="430" y="245" width="12" height="32" rx="2"/>
      <rect x="446" y="245" width="12" height="32" rx="2"/>
      <rect x="462" y="245" width="12" height="32" rx="2"/>
      <rect x="478" y="245" width="12" height="32" rx="2"/>
      <rect x="494" y="245" width="12" height="32" rx="2"/>
      <rect x="510" y="245" width="12" height="32" rx="2"/>
      <rect x="526" y="245" width="12" height="32" rx="2"/>
      <rect x="542" y="245" width="12" height="32" rx="2"/>
      <rect x="558" y="245" width="12" height="32" rx="2"/>
      <rect x="574" y="245" width="12" height="32" rx="2"/>
      <rect x="590" y="245" width="12" height="32" rx="2"/>
      <rect x="606" y="245" width="12" height="32" rx="2"/>
      <rect x="622" y="245" width="12" height="32" rx="2"/>
      <rect x="638" y="245" width="12" height="32" rx="2"/>
      <rect x="654" y="245" width="12" height="32" rx="2"/>
      <rect x="670" y="245" width="12" height="32" rx="2"/>
      <rect x="686" y="245" width="12" height="32" rx="2"/>
    </g>

    <!-- Recovery Time Badge -->
    <rect x="90" y="310" width="620" height="50" rx="8" fill="rgba(255,255,255,0.03)"/>
    <text x="110" y="340" fill="#F8FAFC" font-size="11">Automated Daily Cloud Backups Verified • Quarterly Disaster Recovery Drill: 4 Min Restore</text>
    """
)
save_svg("carepulse-maintenance.svg", p30)

# Project 31: BrandGuard Publisher Speed
p31 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A141F"/>
      <stop offset="50%" stop-color="#0F2233"/>
      <stop offset="100%" stop-color="#050A10"/>
    </linearGradient>""",
    """
    <!-- Google Lighthouse Scorecard -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(16,185,129,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">BrandGuard - High-Traffic Media Operations</text>
    <text x="90" y="112" fill="#10B981" font-size="12" font-weight="600">4M Monthly Readers • Google Lighthouse 98/100 • Zero Outages</text>

    <!-- 4 Lighthouse Score Rings -->
    <!-- Ring 1: Performance -->
    <circle cx="160" cy="190" r="38" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/>
    <circle cx="160" cy="190" r="38" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="240" stroke-dashoffset="10" filter="url(#glowCyan)"/>
    <text x="160" y="196" fill="#10B981" font-size="20" font-weight="800" text-anchor="middle">98</text>
    <text x="160" y="250" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Performance</text>

    <!-- Ring 2: Accessibility -->
    <circle cx="320" cy="190" r="38" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/>
    <circle cx="320" cy="190" r="38" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="240" stroke-dashoffset="0" filter="url(#glowCyan)"/>
    <text x="320" y="196" fill="#10B981" font-size="20" font-weight="800" text-anchor="middle">100</text>
    <text x="320" y="250" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Accessibility</text>

    <!-- Ring 3: Best Practices -->
    <circle cx="480" cy="190" r="38" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/>
    <circle cx="480" cy="190" r="38" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="240" stroke-dashoffset="0" filter="url(#glowCyan)"/>
    <text x="480" y="196" fill="#10B981" font-size="20" font-weight="800" text-anchor="middle">100</text>
    <text x="480" y="250" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Best Practices</text>

    <!-- Ring 4: SEO -->
    <circle cx="640" cy="190" r="38" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/>
    <circle cx="640" cy="190" r="38" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="240" stroke-dashoffset="0" filter="url(#glowCyan)"/>
    <text x="640" y="196" fill="#10B981" font-size="20" font-weight="800" text-anchor="middle">100</text>
    <text x="640" y="250" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">SEO</text>

    <!-- Bottom Result Banner -->
    <rect x="90" y="285" width="620" height="65" rx="10" fill="#060E18" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="312" fill="#00D4FF" font-size="12" font-weight="700">Sub-Second Article Ingestion &amp; Image Compression</text>
    <text x="110" y="334" fill="#94A3B8" font-size="11">-45% Ad script latency cut • Automated SSL renewal bots • Zero broken links</text>
    """
)
save_svg("brandguard-speed.svg", p31)

# =============================================================================
# 16. MANAGED IT SUPPORT & INFRASTRUCTURE
# =============================================================================
# Project 32: EnterpriseCare NOC
p32 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091420"/>
      <stop offset="50%" stop-color="#0F243A"/>
      <stop offset="100%" stop-color="#040910"/>
    </linearGradient>""",
    """
    <!-- 24/7 Mission-Critical NOC Screen -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,212,255,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">EnterpriseCare - 24/7 Infrastructure NOC Support</text>
    <text x="90" y="112" fill="#00D4FF" font-size="12" font-weight="600">Dedicated L3 Engineers • &lt;15 Min P1 Response SLA • Multi-Cloud Failover</text>

    <!-- Top NOC Health Bar -->
    <rect x="90" y="135" width="620" height="50" rx="10" fill="#060E18" stroke="rgba(16,185,129,0.3)"/>
    <circle cx="115" cy="160" r="7" fill="#10B981" filter="url(#glowCyan)"/>
    <text x="135" y="164" fill="#10B981" font-size="12" font-weight="800">NOC STATUS: ALL SYSTEMS NOMINAL</text>
    <text x="690" y="164" fill="#94A3B8" font-size="11" text-anchor="end">Engineers on Watch: Active (Singapore + London NOC)</text>

    <!-- Three Server Cluster Cards -->
    <rect x="90" y="200" width="195" height="150" rx="10" fill="#060E18" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="225" fill="#F8FAFC" font-size="11" font-weight="700">AWS US-East</text>
    <text x="110" y="245" fill="#10B981" font-size="10">● 99.99% Uptime</text>
    <rect x="110" y="258" width="155" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="110" y="258" width="90" height="6" rx="3" fill="#00D4FF"/>
    <text x="110" y="285" fill="#94A3B8" font-size="10">CPU: 44%</text>
    <text x="110" y="305" fill="#94A3B8" font-size="10">RAM: 58%</text>
    <text x="110" y="325" fill="#10B981" font-size="9">Auto-Scale Ready</text>

    <rect x="302" y="200" width="195" height="150" rx="10" fill="#060E18" stroke="rgba(255,255,255,0.08)"/>
    <text x="322" y="225" fill="#F8FAFC" font-size="11" font-weight="700">GCP Asia-South</text>
    <text x="322" y="245" fill="#10B981" font-size="10">● 99.98% Uptime</text>
    <rect x="322" y="258" width="155" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="322" y="258" width="75" height="6" rx="3" fill="#00D4FF"/>
    <text x="322" y="285" fill="#94A3B8" font-size="10">CPU: 32%</text>
    <text x="322" y="305" fill="#94A3B8" font-size="10">RAM: 48%</text>
    <text x="322" y="325" fill="#10B981" font-size="9">Replication &lt;10ms</text>

    <rect x="515" y="200" width="195" height="150" rx="10" fill="#060E18" stroke="rgba(255,255,255,0.08)"/>
    <text x="535" y="225" fill="#F8FAFC" font-size="11" font-weight="700">Azure West-Europe</text>
    <text x="535" y="245" fill="#10B981" font-size="10">● Standby Hot Node</text>
    <rect x="535" y="258" width="155" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
    <rect x="535" y="258" width="40" height="6" rx="3" fill="#10B981"/>
    <text x="535" y="285" fill="#94A3B8" font-size="10">Failover: &lt;30s</text>
    <text x="535" y="305" fill="#94A3B8" font-size="10">P1 SLA: &lt;15m</text>
    <text x="535" y="325" fill="#00D4FF" font-size="9">WhatsApp Hotline</text>
    """
)
save_svg("enterprisecare-noc.svg", p32)

# Project 33: SecureDesk Hybrid IT Support
p33 = svg_wrapper(
    """<linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E121E"/>
      <stop offset="50%" stop-color="#151C30"/>
      <stop offset="100%" stop-color="#060810"/>
    </linearGradient>""",
    """
    <!-- Hybrid Workforce MDM & IT Helpdesk Screen -->
    <rect x="60" y="50" width="680" height="340" rx="16" fill="url(#glassCard)" stroke="rgba(0,100,224,0.3)" filter="url(#cardShadow)"/>
    
    <text x="90" y="92" fill="#F8FAFC" font-size="18" font-weight="800">SecureDesk - Hybrid Workforce MDM &amp; Helpdesk</text>
    <text x="90" y="112" fill="#38BDF8" font-size="12" font-weight="600">250 Remote Engineers • Okta SSO Provisioning • 1-Day Onboarding SLA</text>

    <!-- Left Fleet Health -->
    <rect x="90" y="135" width="300" height="225" rx="12" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="110" y="165" fill="#F8FAFC" font-size="12" font-weight="700">Remote Device Compliance (250 Units)</text>

    <g font-size="10">
      <rect x="105" y="180" width="270" height="36" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="120" y="202" fill="#F8FAFC">FileVault / BitLocker Encrypted</text>
      <text x="360" y="202" fill="#10B981" font-weight="700" text-anchor="end">250/250 (100%)</text>

      <rect x="105" y="224" width="270" height="36" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="120" y="246" fill="#F8FAFC">OS Patch Updates (Automated)</text>
      <text x="360" y="246" fill="#10B981" font-weight="700" text-anchor="end">Up to date</text>

      <rect x="105" y="268" width="270" height="36" rx="6" fill="rgba(255,255,255,0.03)"/>
      <text x="120" y="290" fill="#F8FAFC">Okta SSO MFA Enforced</text>
      <text x="360" y="290" fill="#10B981" font-weight="700" text-anchor="end">Enforced</text>

      <rect x="105" y="312" width="270" height="36" rx="6" fill="rgba(0,212,255,0.08)"/>
      <text x="120" y="334" fill="#00D4FF">1-Click Offboarding Revocation</text>
      <text x="360" y="334" fill="#00D4FF" font-weight="700" text-anchor="end">&lt;5 Seconds</text>
    </g>

    <!-- Right Helpdesk SLA Cards -->
    <rect x="410" y="135" width="300" height="105" rx="10" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="430" y="165" fill="#94A3B8" font-size="10">AVERAGE TICKET RESOLUTION</text>
    <text x="430" y="195" fill="#10B981" font-size="26" font-weight="800">&lt;35 Minutes</text>
    <text x="430" y="218" fill="#64748B" font-size="11">Via integrated Slack bot &amp; Zendesk</text>

    <rect x="410" y="255" width="300" height="105" rx="10" fill="#080C16" stroke="rgba(255,255,255,0.08)"/>
    <text x="430" y="285" fill="#94A3B8" font-size="10">NEW HIRE LAPTOP PROVISIONING</text>
    <text x="430" y="315" fill="#38BDF8" font-size="26" font-weight="800">&lt;24 Hours</text>
    <text x="430" y="338" fill="#64748B" font-size="11">Reduced from 8 manual days</text>
    """
)
save_svg("securedesk-support.svg", p33)

print("All 33 bespoke SVG project images generated successfully!")

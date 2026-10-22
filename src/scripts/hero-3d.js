/**
 * ABSS Nexus Technologies — Refined Apple-Inspired Digital Workspace 3D Hero Visual
 * Art-directed, realistic 3D composition featuring precision MacBook Unibody, iPhone Pro,
 * translucent blue architectural glass backdrop, and exactly two restrained metric badges.
 */

(function initPremiumWorkspaceHero() {
  const heroSection = document.getElementById("hero");
  const canvasContainer = document.getElementById("hero-3d-canvas-container");
  if (!heroSection || !canvasContainer) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function isWebGLAvailable() {
    try {
      const testCanvas = document.createElement("canvas");
      return Boolean(window.WebGLRenderingContext && (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable() || typeof THREE === "undefined") {
    heroSection.classList.add("use-3d-fallback");
    return;
  }

  let scene, camera, renderer;
  let workspaceGroup, laptopGroup, phoneGroup, architecturalGroup, panelsGroup;
  let floatingBadges = [];
  let animFrameId = null;
  let isVisible = true;

  // Pointer tracking with smooth lerp
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;
  let targetScrollProgress = 0;

  // Textures cache for clean disposal
  const texturesToDispose = [];

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    targetScrollProgress = Math.min(Math.max(scrollY / (heroHeight * 0.9), 0), 1);
  }

  function onMouseMove(event) {
    const rect = canvasContainer.getBoundingClientRect();
    const clientX = event.clientX - (rect.left + rect.width / 2);
    const clientY = event.clientY - (rect.top + rect.height / 2);
    mouse.targetX = Math.max(Math.min(clientX / (window.innerWidth * 0.5), 1), -1);
    mouse.targetY = Math.max(Math.min(clientY / (window.innerHeight * 0.5), 1), -1);
  }

  // Helper: rounded rectangle path for 2D canvas
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Helper: rounded rectangle shape for 3D extrusion
  function createRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return shape;
  }

  // --- Dynamic High-DPI Canvas Textures ---

  // 1. Laptop Screen: High-Res Executive SaaS Dashboard (1536 x 960)
  function createLaptopScreenTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1536;
    canvas.height = 960;
    const ctx = canvas.getContext("2d");

    // Dark titanium slate background
    const bgGrad = ctx.createLinearGradient(0, 0, 1536, 960);
    bgGrad.addColorStop(0, "#0c111a");
    bgGrad.addColorStop(1, "#070a10");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1536, 960);

    // Subtle background architectural grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1536; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 960);
      ctx.stroke();
    }
    for (let y = 0; y < 960; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1536, y);
      ctx.stroke();
    }

    // Top Window Chrome / App Header (height 68)
    ctx.fillStyle = "#121824";
    ctx.fillRect(0, 0, 1536, 68);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 67, 1536, 1);

    // Apple Traffic Dots
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(36, 34, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(62, 34, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(88, 34, 8, 0, Math.PI * 2);
    ctx.fill();

    // App Title
    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("ABSS Nexus Architecture  •  Enterprise Console v4.2", 130, 41);

    // Top Right Status Badge
    roundRect(ctx, 1260, 18, 240, 32, 16);
    ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(1280, 34, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#34d399";
    ctx.font = "600 15px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Global Edge • 99.98% SLA", 1294, 39);

    // --- Row 1: KPI Telemetry Cards (Y: 96, height: 110) ---
    const cards = [
      { label: "CORE WEB VITALS", val: "100 / 100", sub: "LCP 0.8s • CLS 0.0 • FID 12ms", color: "#10b981", tag: "PASS" },
      { label: "GLOBAL EDGE TTFB", val: "18 ms", sub: "Cloudflare D1 + Worker Edge", color: "#38bdf8", tag: "OPTIMAL" },
      { label: "SYSTEM RELIABILITY", val: "99.98%", sub: "High-Availability Multi-Region", color: "#818cf8", tag: "STABLE" }
    ];

    const cardW = 460;
    const cardGap = 28;
    cards.forEach((c, idx) => {
      const cx = 50 + idx * (cardW + cardGap);
      roundRect(ctx, cx, 96, cardW, 110, 14);
      ctx.fillStyle = "rgba(22, 30, 46, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(51, 65, 85, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Top label & tag
      ctx.fillStyle = "#94a3b8";
      ctx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.letterSpacing = "0.08em";
      ctx.fillText(c.label, cx + 22, 126);

      roundRect(ctx, cx + cardW - 82, 110, 60, 20, 6);
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fill();
      ctx.fillStyle = c.color;
      ctx.font = "700 11px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.tag, cx + cardW - 70, 124);

      // Value
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 32px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.val, cx + 22, 166);

      // Subtitle
      ctx.fillStyle = "#64748b";
      ctx.font = "500 14px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.sub, cx + 22, 192);
    });

    // --- Row 2: Main Telemetry Vector Chart (Y: 236, height: 490) ---
    // Left Chart Panel (width: 950)
    roundRect(ctx, 50, 236, 950, 490, 16);
    ctx.fillStyle = "rgba(18, 24, 38, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Real-Time Network Performance & Traffic Velocity", 80, 280);

    ctx.fillStyle = "#64748b";
    ctx.font = "500 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Edge-routed requests processed under sub-second latency thresholds", 80, 306);

    // Chart grid lines
    const chartX = 110;
    const chartY = 350;
    const chartW = 840;
    const chartH = 310;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const gy = chartY + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(chartX, gy);
      ctx.lineTo(chartX + chartW, gy);
      ctx.stroke();

      ctx.fillStyle = "#475569";
      ctx.font = "500 12px monospace";
      const val = (4 - i) * 50;
      ctx.fillText(val + "k", chartX - 38, gy + 4);
    }

    // Chart Area & Curve
    const points = [
      [0, 240], [140, 200], [280, 220], [420, 120],
      [560, 150], [700, 60], [840, 40]
    ];

    ctx.beginPath();
    ctx.moveTo(chartX + points[0][0], chartY + points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cx = chartX + (prev[0] + curr[0]) / 2;
      ctx.bezierCurveTo(cx, chartY + prev[1], cx, chartY + curr[1], chartX + curr[0], chartY + curr[1]);
    }

    // Area Fill
    ctx.lineTo(chartX + chartW, chartY + chartH);
    ctx.lineTo(chartX, chartY + chartH);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
    areaGrad.addColorStop(0, "rgba(0, 102, 204, 0.35)");
    areaGrad.addColorStop(0.6, "rgba(0, 102, 204, 0.08)");
    areaGrad.addColorStop(1, "rgba(0, 102, 204, 0)");
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Curve Line
    ctx.beginPath();
    ctx.moveTo(chartX + points[0][0], chartY + points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cx = chartX + (prev[0] + curr[0]) / 2;
      ctx.bezierCurveTo(cx, chartY + prev[1], cx, chartY + curr[1], chartX + curr[0], chartY + curr[1]);
    }
    ctx.strokeStyle = "#0088ff";
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Pulse dot at peak
    const peakX = chartX + points[points.length - 1][0];
    const peakY = chartY + points[points.length - 1][1];
    ctx.fillStyle = "rgba(0, 136, 255, 0.35)";
    ctx.beginPath();
    ctx.arc(peakX, peakY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(peakX, peakY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Peak tooltip badge
    roundRect(ctx, peakX - 110, peakY - 44, 105, 30, 8);
    ctx.fillStyle = "#0066cc";
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("214.8k req/s", peakX - 98, peakY - 24);

    // Right Side Deployment Feed Panel (width: 458)
    roundRect(ctx, 1028, 236, 458, 490, 16);
    ctx.fillStyle = "rgba(18, 24, 38, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Enterprise Infrastructure", 1058, 280);

    ctx.fillStyle = "#64748b";
    ctx.font = "500 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Active production micro-services", 1058, 306);

    const services = [
      { name: "Global CDN Edge Routing", status: "Optimal (12ms)", detail: "310 PoPs worldwide", color: "#10b981" },
      { name: "Cloudflare D1 Storage", status: "Synchronized", detail: "Multi-region replica cluster", color: "#10b981" },
      { name: "Enterprise SSL / WAF Shield", status: "Protected", detail: "A+ Qualys SSL Labs rating", color: "#10b981" },
      { name: "Automated Build Pipeline", status: "Build #4912 Live", detail: "Passed 39 validation tests", color: "#38bdf8" }
    ];

    services.forEach((s, idx) => {
      const sy = 345 + idx * 82;
      roundRect(ctx, 1058, sy, 398, 68, 10);
      ctx.fillStyle = "rgba(30, 41, 59, 0.6)";
      ctx.fill();
      ctx.strokeStyle = "rgba(51, 65, 85, 0.35)";
      ctx.stroke();

      ctx.fillStyle = "#f1f5f9";
      ctx.font = "600 15px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(s.name, 1076, sy + 28);

      ctx.fillStyle = "#64748b";
      ctx.font = "500 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(s.detail, 1076, sy + 50);

      roundRect(ctx, 1310, sy + 18, 132, 28, 6);
      ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
      ctx.fill();
      ctx.fillStyle = s.color;
      ctx.font = "600 12px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(s.status, 1322, sy + 37);
    });

    // --- Bottom Code Snippet Rail (Y: 750, height: 160) ---
    roundRect(ctx, 50, 750, 1436, 160, 14);
    ctx.fillStyle = "rgba(12, 16, 26, 0.95)";
    ctx.fill();
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "italic 16px ui-monospace, Menlo, Monaco, monospace";
    ctx.fillText("// ABSS Nexus High-Performance Software Engineering — Scaled for Enterprise Digital Authority", 80, 792);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "600 17px ui-monospace, Menlo, Monaco, monospace";
    ctx.fillText("export const ", 80, 830);

    ctx.fillStyle = "#f8fafc";
    ctx.fillText("nexusEngine = ", 210, 830);

    ctx.fillStyle = "#818cf8";
    ctx.fillText("createResilientStack({ ", 350, 830);

    ctx.fillStyle = "#94a3b8";
    ctx.fillText("architecture: ", 605, 830);
    ctx.fillStyle = "#34d399";
    ctx.fillText('"Modern Web"', 735, 830);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(", performance: ", 860, 830);
    ctx.fillStyle = "#34d399";
    ctx.fillText('"Sub-Second"', 1000, 830);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(", ssl: ", 1125, 830);
    ctx.fillStyle = "#34d399";
    ctx.fillText('"A+"', 1180, 830);
    ctx.fillStyle = "#818cf8";
    ctx.fillText(" });", 1220, 830);

    ctx.fillStyle = "#10b981";
    ctx.font = "600 15px ui-monospace, Menlo, Monaco, monospace";
    ctx.fillText("✔ Status: Production Deployed (0.3s)  •  Core Web Vitals Pass Rate: 100%", 80, 874);

    const tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    texturesToDispose.push(tex);
    return tex;
  }

  // 2. Laptop Keyboard Deck Well (1024 x 512)
  function createKeyboardDeckTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Recessed dark well
    ctx.fillStyle = "#14171e";
    ctx.fillRect(0, 0, 1024, 512);

    ctx.strokeStyle = "#232834";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 1022, 510);

    // Chiclet Key Grid
    const rows = [
      { count: 14, h: 28, labels: ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "⏻"] },
      { count: 14, h: 44, labels: ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "delete"] },
      { count: 14, h: 44, labels: ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"] },
      { count: 13, h: 44, labels: ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"] },
      { count: 12, h: 44, labels: ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"] },
      { count: 7, h: 44, labels: ["fn", "control", "option", "command", "                    ", "command", "option"] }
    ];

    let startY = 32;
    rows.forEach((r, rIdx) => {
      const gap = 8;
      const totalGaps = (r.count - 1) * gap;
      const keyW = (960 - totalGaps) / r.count;

      for (let i = 0; i < r.count; i++) {
        let kw = keyW;
        let kx = 32 + i * (keyW + gap);

        // Spacebar row adjustment
        if (rIdx === 5) {
          if (i === 4) {
            kw = 340;
            kx = 32 + 4 * 84;
          } else if (i > 4) {
            kx = 32 + 4 * 84 + 340 + 8 + (i - 5) * 84;
            kw = 84;
          } else {
            kw = 84;
            kx = 32 + i * (84 + gap);
          }
        }

        roundRect(ctx, kx, startY, kw, r.h, 5);
        const keyGrad = ctx.createLinearGradient(kx, startY, kx, startY + r.h);
        keyGrad.addColorStop(0, "#232834");
        keyGrad.addColorStop(1, "#181b24");
        ctx.fillStyle = keyGrad;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Key labels
        const lbl = r.labels[i] || "";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "600 12px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(lbl, kx + kw / 2, startY + r.h / 2);
      }
      startY += r.h + gap;
    });

    // Reset alignment
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    const tex = new THREE.CanvasTexture(canvas);
    texturesToDispose.push(tex);
    return tex;
  }

  // 3. Smartphone Screen: iOS-Inspired Companion UI (512 x 1024)
  function createPhoneScreenTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Dark sleek titanium background
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 1024);
    bgGrad.addColorStop(0, "#0c111a");
    bgGrad.addColorStop(1, "#070a10");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 1024);

    // Dynamic Island
    roundRect(ctx, 176, 24, 160, 36, 18);
    ctx.fillStyle = "#000000";
    ctx.fill();

    // Camera lens reflection
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(310, 42, 6, 0, Math.PI * 2);
    ctx.fill();

    // Status Row
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("9:41", 42, 48);

    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("5G  100%", 470, 48);
    ctx.textAlign = "left";

    // Header title
    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.letterSpacing = "0.08em";
    ctx.fillText("ABSS NEXUS OPERATIONS", 36, 115);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 28px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("System Overview", 36, 155);

    // Main KPI Card: Conversion Velocity
    roundRect(ctx, 36, 185, 440, 290, 20);
    ctx.fillStyle = "rgba(22, 30, 46, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(51, 65, 85, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("CLIENT CONVERSION VELOCITY", 60, 225);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 46px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("+142.8%", 60, 280);

    roundRect(ctx, 290, 244, 155, 30, 8);
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.fill();
    ctx.fillStyle = "#10b981";
    ctx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("● Top Tier Velocity", 305, 264);

    // Smooth spline graph
    const chartY = 330;
    const pts = [[0, 95], [80, 80], [160, 65], [240, 50], [320, 25], [380, 10]];
    const startX = 66;

    ctx.beginPath();
    ctx.moveTo(startX + pts[0][0], chartY + pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = startX + (prev[0] + curr[0]) / 2;
      ctx.bezierCurveTo(cx, chartY + prev[1], cx, chartY + curr[1], startX + curr[0], chartY + curr[1]);
    }
    ctx.lineTo(startX + pts[pts.length - 1][0], chartY + 115);
    ctx.lineTo(startX, chartY + 115);
    ctx.closePath();

    const gGrad = ctx.createLinearGradient(0, chartY, 0, chartY + 115);
    gGrad.addColorStop(0, "rgba(0, 102, 204, 0.45)");
    gGrad.addColorStop(1, "rgba(0, 102, 204, 0)");
    ctx.fillStyle = gGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(startX + pts[0][0], chartY + pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = startX + (prev[0] + curr[0]) / 2;
      ctx.bezierCurveTo(cx, chartY + prev[1], cx, chartY + curr[1], startX + curr[0], chartY + curr[1]);
    }
    ctx.strokeStyle = "#0088ff";
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Three Quick Telemetry Tiles
    const tiles = [
      { title: "Core Web Vitals", metric: "100 / 100", status: "Verified Clean", color: "#10b981" },
      { title: "Edge Latency (TTFB)", metric: "18 ms", status: "Global Edge", color: "#38bdf8" },
      { title: "Active SLA Shield", metric: "99.98%", status: "Zero Downtime", color: "#818cf8" }
    ];

    tiles.forEach((t, i) => {
      const ty = 505 + i * 140;
      roundRect(ctx, 36, ty, 440, 118, 18);
      ctx.fillStyle = "rgba(22, 30, 46, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
      ctx.stroke();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(t.title, 62, ty + 38);

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 28px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(t.metric, 62, ty + 78);

      roundRect(ctx, 296, ty + 50, 150, 30, 8);
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fill();
      ctx.fillStyle = t.color;
      ctx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(t.status, 312, ty + 70);
    });

    // Home indicator bar at bottom
    roundRect(ctx, 186, 1000, 140, 5, 2.5);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    texturesToDispose.push(tex);
    return tex;
  }

  // 4. Exactly Two Floating Glass Badges (512 x 220)
  function createFloatingBadgeTexture(category, title, metric, iconType) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 220;
    const ctx = canvas.getContext("2d");

    // Pure frosted glass card base (Apple Style)
    roundRect(ctx, 8, 8, 496, 204, 22);
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 220);
    bgGrad.addColorStop(0, "rgba(255, 255, 255, 0.96)");
    bgGrad.addColorStop(1, "rgba(245, 247, 250, 0.92)");
    ctx.fillStyle = bgGrad;
    ctx.fill();

    ctx.strokeStyle = "rgba(209, 213, 219, 0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Icon Circle
    roundRect(ctx, 36, 38, 54, 54, 16);
    if (iconType === "shield") {
      ctx.fillStyle = "rgba(0, 102, 204, 0.12)";
      ctx.fill();
      ctx.fillStyle = "#0066cc";
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚡", 63, 76);
    } else {
      ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
      ctx.fill();
      ctx.fillStyle = "#10b981";
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✔", 63, 76);
    }
    ctx.textAlign = "left";

    // Category pill / tracker
    ctx.fillStyle = iconType === "shield" ? "#0066cc" : "#059669";
    ctx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.letterSpacing = "0.08em";
    ctx.fillText(category.toUpperCase(), 110, 56);

    // Main title
    ctx.fillStyle = "#1d1d1f";
    ctx.font = "800 26px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(title, 110, 88);

    // Divider line
    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.fillRect(36, 118, 440, 1.5);

    // Metric detail
    ctx.fillStyle = "#6e6e73";
    ctx.font = "600 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(metric, 36, 162);

    const tex = new THREE.CanvasTexture(canvas);
    texturesToDispose.push(tex);
    return tex;
  }

  // 5. Realistic Ground Ambient Occlusion & Contact Shadow (1024 x 512)
  function createGroundShadowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Clear
    ctx.clearRect(0, 0, 1024, 512);

    // 1. Laptop Base Contact Shadow (Dense, tight)
    const laptopGrad = ctx.createRadialGradient(420, 256, 10, 420, 256, 260);
    laptopGrad.addColorStop(0, "rgba(15, 23, 42, 0.32)");
    laptopGrad.addColorStop(0.3, "rgba(15, 23, 42, 0.18)");
    laptopGrad.addColorStop(0.65, "rgba(15, 23, 42, 0.06)");
    laptopGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = laptopGrad;
    ctx.beginPath();
    ctx.ellipse(420, 256, 260, 120, -0.06, 0, Math.PI * 2);
    ctx.fill();

    // 2. Phone Contact Shadow (Smaller, tight)
    const phoneGrad = ctx.createRadialGradient(760, 280, 4, 760, 280, 110);
    phoneGrad.addColorStop(0, "rgba(15, 23, 42, 0.38)");
    phoneGrad.addColorStop(0.4, "rgba(15, 23, 42, 0.16)");
    phoneGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = phoneGrad;
    ctx.beginPath();
    ctx.ellipse(760, 280, 100, 55, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // 3. Wide Soft Ambient Stage Occlusion
    const ambientGrad = ctx.createRadialGradient(512, 256, 60, 512, 256, 480);
    ambientGrad.addColorStop(0, "rgba(0, 102, 204, 0.06)");
    ambientGrad.addColorStop(0.4, "rgba(15, 23, 42, 0.04)");
    ambientGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = ambientGrad;
    ctx.beginPath();
    ctx.ellipse(512, 256, 480, 210, 0, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    texturesToDispose.push(tex);
    return tex;
  }

  // --- Three.js Scene Initialization ---

  function initScene() {
    const width = canvasContainer.clientWidth || 560;
    const height = canvasContainer.clientHeight || 560;

    scene = new THREE.Scene();

    // Studio camera framing (30° narrow FOV for distortion-free Apple product photography)
    camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000);
    camera.position.set(0, 24, 460);
    camera.lookAt(0, 18, 0);

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "hero-webgl-canvas";
    canvasContainer.appendChild(canvas);

    // --- Studio Lighting Rig (Apple Clean Lighting) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.85);
    scene.add(ambientLight);

    // Key studio softbox
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(100, 180, 140);
    scene.add(keyLight);

    // Soft fill from opposite side
    const fillLight = new THREE.DirectionalLight(0xf8fafc, 0.75);
    fillLight.position.set(-110, 90, 100);
    scene.add(fillLight);

    // Subtle Apple primary blue refraction through glass
    const blueRefractLight = new THREE.PointLight(0x0066cc, 1.1, 750);
    blueRefractLight.position.set(45, 45, -35);
    scene.add(blueRefractLight);

    // Clean specular rim highlight
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.65);
    rimLight.position.set(0, 160, -90);
    scene.add(rimLight);

    // Master Workspace Group
    workspaceGroup = new THREE.Group();
    workspaceGroup.rotation.x = 0.18;
    workspaceGroup.rotation.y = -0.32;
    scene.add(workspaceGroup);

    // 1. Realistic Multi-Layer Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(340, 190);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createGroundShadowTexture(),
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(10, -20, 10);
    workspaceGroup.add(shadowMesh);

    // 2. Translucent Blue-Glass Architectural Forms Behind Devices
    architecturalGroup = new THREE.Group();
    workspaceGroup.add(architecturalGroup);

    // Primary Architectural Curved Glass Sail
    const sailGeo = new THREE.CylinderGeometry(130, 130, 130, 48, 1, true, -Math.PI * 0.28, Math.PI * 0.58);
    const sailMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f6fd,
      metalness: 0.05,
      roughness: 0.14,
      transmission: 0.90,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const sailMesh = new THREE.Mesh(sailGeo, sailMat);
    sailMesh.position.set(10, 45, -45);
    sailMesh.rotation.y = 0.15;
    architecturalGroup.add(sailMesh);

    // Thin silver architectural rim along top edge of primary glass sail
    const rimCurve = new THREE.CylinderGeometry(130.4, 130.4, 1.5, 48, 1, true, -Math.PI * 0.28, Math.PI * 0.58);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd2d2d7,
      metalness: 0.85,
      roughness: 0.2,
      side: THREE.DoubleSide
    });
    const rimMesh = new THREE.Mesh(rimCurve, rimMat);
    rimMesh.position.set(10, 110, -45);
    rimMesh.rotation.y = 0.15;
    architecturalGroup.add(rimMesh);

    // Secondary Accent Glass Sail (Subtle Blue Tint)
    const accentSailGeo = new THREE.CylinderGeometry(155, 155, 95, 36, 1, true, -Math.PI * 0.10, Math.PI * 0.40);
    const accentSailMat = new THREE.MeshPhysicalMaterial({
      color: 0x0066cc,
      metalness: 0.1,
      roughness: 0.18,
      transmission: 0.94,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const accentSailMesh = new THREE.Mesh(accentSailGeo, accentSailMat);
    accentSailMesh.position.set(30, 55, -68);
    accentSailMesh.rotation.y = 0.28;
    architecturalGroup.add(accentSailMesh);

    // 3. Precision MacBook Unibody Laptop
    laptopGroup = new THREE.Group();
    laptopGroup.position.set(-18, -16, 0);
    workspaceGroup.add(laptopGroup);

    // Materials: Silver Aluminium & Precision Black Glass
    const macSilverMat = new THREE.MeshStandardMaterial({
      color: 0xe2e6ec,
      metalness: 0.82,
      roughness: 0.24
    });

    const darkBezelMat = new THREE.MeshStandardMaterial({
      color: 0x0b0e14,
      metalness: 0.9,
      roughness: 0.15
    });

    // Base Chassis (16:10 aspect with realistic rounded corners)
    const baseShape = createRoundedRectShape(148, 98, 6);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 2.0,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.6,
      bevelThickness: 0.6
    });
    const baseMesh = new THREE.Mesh(baseGeo, macSilverMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.set(0, -1.0, 0);
    laptopGroup.add(baseMesh);

    // Recessed Keyboard Deck Well Plane with Precision Backlit Chiclet Keys
    const kbGeo = new THREE.PlaneGeometry(124, 56);
    const kbTexture = createKeyboardDeckTexture();
    const kbMat = new THREE.MeshBasicMaterial({
      map: kbTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, 0.05, -12);
    laptopGroup.add(kbMesh);

    // Glass Trackpad
    const padShape = createRoundedRectShape(52, 34, 3);
    const padGeo = new THREE.ShapeGeometry(padShape);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0xd9dfe7,
      metalness: 0.75,
      roughness: 0.28,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.set(0, 0.06, 28);
    laptopGroup.add(padMesh);

    // Display Hinge
    const hingeGeo = new THREE.CylinderGeometry(1.3, 1.3, 110, 16);
    const hingeMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, metalness: 0.8, roughness: 0.3 });
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.rotation.z = Math.PI / 2;
    hingeMesh.position.set(0, 0.8, -49);
    laptopGroup.add(hingeMesh);

    // Display Lid Assembly (Angled naturally back at 18 degrees from vertical)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.9, -49);
    lidGroup.rotation.x = THREE.MathUtils.degToRad(-18);
    laptopGroup.add(lidGroup);

    // Lid Back Chassis (Extruded along +Z; front face terminates at Z = 0.0)
    const lidShape = createRoundedRectShape(148, 96, 6);
    const lidGeo = new THREE.ExtrudeGeometry(lidShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.5,
      bevelThickness: 0.5
    });
    const lidMesh = new THREE.Mesh(lidGeo, macSilverMat);
    lidMesh.position.set(0, 48, -1.7);
    lidGroup.add(lidMesh);

    // Front Glass Bezel with Camera Notch
    const bezelShape = createRoundedRectShape(146, 94, 5.5);
    const bezelGeo = new THREE.ShapeGeometry(bezelShape);
    darkBezelMat.polygonOffset = true;
    darkBezelMat.polygonOffsetFactor = 1;
    darkBezelMat.polygonOffsetUnits = 1;
    const bezelMesh = new THREE.Mesh(bezelGeo, darkBezelMat);
    bezelMesh.position.set(0, 48, 0.03);
    lidGroup.add(bezelMesh);

    // Camera Lens Dot
    const camGeo = new THREE.CircleGeometry(0.9, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const camMesh = new THREE.Mesh(camGeo, camMat);
    camMesh.position.set(0, 92, 0.08);
    lidGroup.add(camMesh);

    // High-Resolution Active Dashboard Screen (Crisp front layer, unobstructed)
    const screenGeo = new THREE.PlaneGeometry(140, 88);
    const screenTexture = createLaptopScreenTexture();
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 48, 0.08);
    lidGroup.add(screenMesh);

    // Soft Ambient Screen Bounce Light on Keyboard
    const screenBounce = new THREE.PointLight(0x0088ff, 0.85, 120);
    screenBounce.position.set(0, 28, -15);
    laptopGroup.add(screenBounce);

    // 4. Modern Smartphone (iPhone Pro proportions, standing grounded on desk)
    phoneGroup = new THREE.Group();
    phoneGroup.position.set(66, 12, 18);
    phoneGroup.rotation.set(0.04, 0.15, -0.02);
    workspaceGroup.add(phoneGroup);

    // Phone Body with Rounded Corners (Extruded along +Z; front face terminates at Z = 0.0)
    const phoneShape = createRoundedRectShape(32, 66, 5.5);
    const phoneGeo = new THREE.ExtrudeGeometry(phoneShape, {
      depth: 3.2,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.5,
      bevelThickness: 0.5
    });
    const phoneMat = new THREE.MeshStandardMaterial({
      color: 0x161920,
      metalness: 0.88,
      roughness: 0.2
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
    phoneMesh.position.set(0, 0, -3.7);
    phoneGroup.add(phoneMesh);

    // Phone Titanium Bevel Rim
    const rimBoxGeo = new THREE.BoxGeometry(33.2, 67.2, 1.0);
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.16
    });
    const rimBoxMesh = new THREE.Mesh(rimBoxGeo, titaniumMat);
    rimBoxMesh.position.set(0, 0, -1.8);
    phoneGroup.add(rimBoxMesh);

    // Active Mobile Screen (Crisp front layer, unobstructed)
    const phoneScreenGeo = new THREE.PlaneGeometry(29.5, 63.5);
    const phoneTexture = createPhoneScreenTexture();
    const phoneScreenMat = new THREE.MeshBasicMaterial({
      map: phoneTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.08);
    phoneGroup.add(phoneScreenMesh);

    // 5. Exactly TWO Floating Information Panels (Consistent Perspective)
    panelsGroup = new THREE.Group();
    workspaceGroup.add(panelsGroup);

    const panelConfigs = [
      {
        category: "Enterprise Infrastructure",
        title: "Sub-Second Edge",
        metric: "18ms Global TTFB • 99.98% SLA",
        icon: "shield",
        pos: new THREE.Vector3(70, 70, 15),
        size: [64, 27.5],
        baseY: 70,
        phase: 0
      },
      {
        category: "Performance Metrics",
        title: "100 / 100 Core Web Vitals",
        metric: "Zero Cumulative Layout Shift",
        icon: "spark",
        pos: new THREE.Vector3(-76, 44, 25),
        size: [64, 27.5],
        baseY: 44,
        phase: Math.PI
      }
    ];

    panelConfigs.forEach((cfg) => {
      const holder = new THREE.Group();
      holder.position.copy(cfg.pos);
      // Gentle counter-tilt to face camera for optimal typographic readability
      holder.rotation.set(-0.06, 0.16, 0);

      // Frosted Glass Slab
      const slabGeo = new THREE.BoxGeometry(cfg.size[0], cfg.size[1], 1.2);
      const slabMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.12,
        transmission: 0.90,
        transparent: true,
        opacity: 0.95,
        reflectivity: 0.5,
        depthWrite: false
      });
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      holder.add(slabMesh);

      // High-DPI Texture Face
      const faceGeo = new THREE.PlaneGeometry(cfg.size[0] - 0.4, cfg.size[1] - 0.4);
      const faceTex = createFloatingBadgeTexture(cfg.category, cfg.title, cfg.metric, cfg.icon);
      const faceMat = new THREE.MeshBasicMaterial({
        map: faceTex,
        transparent: true,
        opacity: 0.98,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      });
      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.z = 0.65;
      holder.add(faceMesh);

      panelsGroup.add(holder);
      floatingBadges.push({
        holder,
        basePos: cfg.pos.clone(),
        phase: cfg.phase
      });
    });

    // Initial responsive setup
    applyResponsiveScale();

    // Event Listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Viewport IntersectionObserver
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animFrameId && !prefersReducedMotion) {
              animate();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(heroSection);
    }

    // Render initial static frame
    renderer.render(scene, camera);

    // Animate only if reduced motion is not preferred
    if (!prefersReducedMotion) {
      animate();
    }
  }

  function applyResponsiveScale() {
    if (!workspaceGroup || !camera) return;
    const w = window.innerWidth;
    if (w >= 1025) {
      workspaceGroup.scale.setScalar(0.98);
      camera.position.set(0, 24, 460);
    } else if (w >= 768) {
      workspaceGroup.scale.setScalar(0.92);
      camera.position.set(0, 22, 450);
    } else if (w >= 480) {
      workspaceGroup.scale.setScalar(0.86);
      camera.position.set(0, 20, 440);
    } else {
      workspaceGroup.scale.setScalar(0.80);
      camera.position.set(0, 18, 435);
    }
  }

  function onWindowResize() {
    if (!renderer || !camera || !canvasContainer) return;
    const width = canvasContainer.clientWidth || 560;
    const height = canvasContainer.clientHeight || 560;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    applyResponsiveScale();

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    }
  }

  function onVisibilityChange() {
    isVisible = document.visibilityState === "visible";
    if (isVisible && !animFrameId && !prefersReducedMotion) {
      animate();
    }
  }

  // --- Animation Loop ---

  function animate() {
    if (!isVisible) {
      animFrameId = null;
      return;
    }

    animFrameId = requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Smooth subtle pointer lerp (weighted, restrained damping)
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Smooth scroll interpolation
    scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

    // Restrained camera & workspace parallax (max ~2 degrees)
    if (workspaceGroup) {
      workspaceGroup.rotation.y = -0.30 + mouse.x * 0.06;
      workspaceGroup.rotation.x = 0.16 - mouse.y * 0.04 + scrollProgress * 0.12;

      // Subtle, slow breathing oscillation on devices (grounded)
      laptopGroup.position.y = -16 + Math.sin(time * 0.6) * 1.0;
      phoneGroup.position.y = 12 + Math.sin(time * 0.6 + 0.8) * 1.0;

      // Exactly two floating badges oscillate gently out-of-phase
      floatingBadges.forEach((b) => {
        b.holder.position.y = b.basePos.y + Math.sin(time * 0.8 + b.phase) * 1.8;
      });
    }

    renderer.render(scene, camera);
  }

  // Start initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScene);
  } else {
    initScene();
  }
})();

/**
 * Interactive 3D Perspective Tilt for Cinematic Service Cards
 */
(function init3DCardTilt() {
  const cards = document.querySelectorAll(".cinematic-service-card");
  if (!cards.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  cards.forEach((card) => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = "transform 0.15s ease-out, box-shadow 0.2s ease-out";
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width - 0.5) * 2;
      const normY = (mouseY / bounds.height - 0.5) * 2;

      const tiltX = -normY * 4.5;
      const tiltY = normX * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    }

    function onMouseLeave() {
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);
  });
})();

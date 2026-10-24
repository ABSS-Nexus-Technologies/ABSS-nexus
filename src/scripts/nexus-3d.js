/**
 * ABSS Nexus Technologies - Luxury 3D WebGL Engine & 3D Interactive Card Dynamics
 * Features:
 * - Real-time Three.js 3D Champagne Gold Polyhedron & Gyroscopic Nexus Core
 * - Dynamic 3D Particle Constellation with Depth Physics
 * - Mouse Tracking, Interactive 360° Drag Rotation, Speed Boost & Wireframe Toggles
 * - 3D Perspective Card Tilt on Hover for Services, Projects & Leadership
 */

(function initAbsNexus3D() {
  "use strict";

  // Check if browser supports WebGL
  function hasWebGL() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  /* ==========================================================================
     1. HERO 3D WEBGL NEXUS CORE
     ========================================================================== */
  function setupNexusCore3D() {
    const canvas = document.getElementById("nexus-3d-canvas");
    const container = document.getElementById("nexus3d-container");
    if (!canvas || !container || !window.THREE || !hasWebGL()) {
      return;
    }

    const THREE = window.THREE;

    // Dimensions
    const getWidth = () => container.clientWidth || 480;
    const getHeight = () => container.clientHeight || 380;

    let width = getWidth();
    let height = getHeight();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Lights (Champagne Gold & Light Gold)
    const ambientLight = new THREE.AmbientLight(0xf5f2ea, 1.2);
    scene.add(ambientLight);

    const goldPointLight1 = new THREE.PointLight(0xc8a96b, 3.2, 50);
    goldPointLight1.position.set(4, 4, 4);
    scene.add(goldPointLight1);

    const lightGoldPointLight2 = new THREE.PointLight(0xe4cc96, 2.5, 50);
    lightGoldPointLight2.position.set(-4, -3, 3);
    scene.add(lightGoldPointLight2);

    const frontDirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    frontDirLight.position.set(0, 5, 4);
    scene.add(frontDirLight);

    // Root Group that holds the 3D entity
    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);

    // --- Component A: Outer Icosahedron Mesh (Faceted Dark Charcoal Glass) ---
    const icoGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x161616,
      emissive: 0x1a1a1a,
      roughness: 0.18,
      metalness: 0.88,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.92,
      flatShading: true,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    nexusGroup.add(icoMesh);

    // --- Component B: Champagne Gold Wireframe Overlay ---
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.205, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8a96b,
      wireframe: true,
      transparent: true,
      opacity: 0.88,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    nexusGroup.add(wireframeMesh);

    // --- Component C: Glowing Vertex Points ---
    const vertexPositions = icoGeometry.attributes.position.array;
    const vertexPointsGeom = new THREE.BufferGeometry();
    vertexPointsGeom.setAttribute("position", new THREE.BufferAttribute(vertexPositions, 3));
    const vertexMaterial = new THREE.PointsMaterial({
      color: 0xe4cc96,
      size: 0.08,
      transparent: true,
      opacity: 0.95,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeom, vertexMaterial);
    nexusGroup.add(vertexPoints);

    // --- Component D: Inner Pulsing Gold Core (Octahedron) ---
    const innerCoreGeom = new THREE.OctahedronGeometry(0.68, 0);
    const innerCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a96b,
      emissive: 0x937537,
      emissiveIntensity: 0.6,
      metalness: 0.92,
      roughness: 0.22,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeom, innerCoreMaterial);
    nexusGroup.add(innerCore);

    // --- Component E: Orbiting Gyroscope Rings ---
    const ring1Geom = new THREE.TorusGeometry(1.68, 0.016, 16, 120);
    const ring1Material = new THREE.MeshStandardMaterial({
      color: 0xc8a96b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x3d321c,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    nexusGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.92, 0.014, 16, 120);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0xe4cc96,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x4a3e23,
      emissiveIntensity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Material);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 4;
    nexusGroup.add(ring2);

    // Satellite beads on rings
    const beadGeom = new THREE.SphereGeometry(0.065, 12, 12);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xe4cc96,
      emissive: 0xc8a96b,
      emissiveIntensity: 0.8,
    });
    const bead1 = new THREE.Mesh(beadGeom, beadMat);
    ring1.add(bead1);
    bead1.position.set(1.68, 0, 0);

    const bead2 = new THREE.Mesh(beadGeom, beadMat);
    ring2.add(bead2);
    bead2.position.set(-1.92, 0, 0);

    // --- Component F: Floating Golden Dust Particles Field ---
    const particleCount = 650;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xc8a96b);
    const colorLightGold = new THREE.Color(0xe4cc96);
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      tempColor.lerpColors(colorGold, colorLightGold, Math.random());
      particleColors[i * 3] = tempColor.r;
      particleColors[i * 3 + 1] = tempColor.g;
      particleColors[i * 3 + 2] = tempColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particleSystem);

    // Interaction variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let baseSpinSpeed = 0.005;
    let spinMultiplier = 1;
    let isWireframeOnly = false;
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resize handling
    const onResize = () => {
      width = getWidth();
      height = getHeight();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Mouse / Touch Drag to Rotate
    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onMouseMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Parallax tracking when not dragging
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetCameraX = normX * 0.45;
      targetCameraY = normY * 0.35;

      if (!isDragging) return;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      dragVelocityX = deltaX * 0.007;
      dragVelocityY = deltaY * 0.007;

      nexusGroup.rotation.y += dragVelocityX;
      nexusGroup.rotation.x += dragVelocityY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onMouseDown, { passive: true });
    window.addEventListener("touchmove", onMouseMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // HUD Button Controls
    const btnWireframe = document.getElementById("btn-toggle-wireframe");
    if (btnWireframe) {
      btnWireframe.addEventListener("click", (e) => {
        e.stopPropagation();
        isWireframeOnly = !isWireframeOnly;
        icoMesh.visible = !isWireframeOnly;
        btnWireframe.classList.toggle("active", isWireframeOnly);
      });
    }

    const btnSpin = document.getElementById("btn-toggle-spin");
    if (btnSpin) {
      btnSpin.addEventListener("click", (e) => {
        e.stopPropagation();
        spinMultiplier = spinMultiplier === 1 ? 3.5 : 1;
        btnSpin.classList.toggle("active", spinMultiplier > 1);
        setTimeout(() => {
          spinMultiplier = 1;
          btnSpin.classList.remove("active");
        }, 3200);
      });
    }

    const btnReset = document.getElementById("btn-reset-camera");
    if (btnReset) {
      btnReset.addEventListener("click", (e) => {
        e.stopPropagation();
        nexusGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 0, 4.3);
        dragVelocityX = 0;
        dragVelocityY = 0;
      });
    }

    // Animation Loop with Visibility Check
    let isVisible = true;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
    }

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Inertial spin decay
      if (!isDragging) {
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        nexusGroup.rotation.y += dragVelocityX;
        nexusGroup.rotation.x += dragVelocityY;

        if (!isReducedMotion) {
          nexusGroup.rotation.y += baseSpinSpeed * spinMultiplier;
          nexusGroup.rotation.x += 0.002 * spinMultiplier;
        }
      }

      // Gyro rings internal counter-rotations
      ring1.rotation.z += 0.008 * spinMultiplier;
      ring2.rotation.z -= 0.006 * spinMultiplier;

      // Inner core pulse and counter-rotation
      innerCore.rotation.y -= 0.012 * spinMultiplier;
      innerCore.rotation.x += 0.006 * spinMultiplier;
      const pulseScale = 0.68 + Math.sin(elapsedTime * 2.2) * 0.04;
      innerCore.scale.set(pulseScale, pulseScale, pulseScale);

      // Particle system gentle undulation
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.4) * 0.05;

      // Moving Point Lights for dynamic specular reflection
      goldPointLight1.position.x = Math.sin(elapsedTime * 1.2) * 4.5;
      goldPointLight1.position.y = Math.cos(elapsedTime * 0.8) * 4.5;
      lightGoldPointLight2.position.x = -Math.sin(elapsedTime * 1.5) * 4.5;
      lightGoldPointLight2.position.z = Math.cos(elapsedTime * 1.2) * 4.0;

      // Smooth Camera lerp to cursor parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ==========================================================================
     2. LUXURY 3D PERSPECTIVE CARD TILT ON HOVER
     ========================================================================== */
  function setup3DCardTilt() {
    // Only apply on devices with hover/pointer capabilities
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll(
      ".luxury-service-card, .project-modern-card, .executive-member-card, .why-card-luxury, .testimonial-card-luxury, .agency-stat-card"
    );

    cards.forEach((card) => {
      // Create glare overlay element if not present
      let glare = card.querySelector(".card-3d-glare");
      if (!glare) {
        glare = document.createElement("div");
        glare.className = "card-3d-glare";
        card.appendChild(glare);
      }

      card.style.transformStyle = "preserve-3d";
      card.style.transition = "transform 0.15s ease-out, box-shadow 0.25s ease";

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -7;
        const rotateY = ((cardX - centerX) / centerX) * 7;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;

        // Move glare reflection
        const glareX = (cardX / rect.width) * 100;
        const glareY = (cardY / rect.height) * 100;
        glare.style.opacity = "1";
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(228, 204, 150, 0.16) 0%, transparent 65%)`;
      };

      const onMouseLeave = () => {
        card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease";
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
        glare.style.opacity = "0";
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupNexusCore3D();
      setup3DCardTilt();
    });
  } else {
    setupNexusCore3D();
    setup3DCardTilt();
  }
})();

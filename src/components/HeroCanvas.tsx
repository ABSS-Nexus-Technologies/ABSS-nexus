'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  colorType: 'cyan' | 'purple';
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let isDark = true;

    // Detect theme
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      isDark = currentTheme !== 'light';
    };
    checkTheme();

    const themeObserver = new MutationObserver(() => {
      checkTheme();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Track mouse
    const mouse = {
      x: -9999,
      y: -9999,
      radius: 160,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Initialize particles
    let particles: Particle[] = [];
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 42 : 75;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-seed particles if empty
      if (particles.length === 0) {
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            vz: (Math.random() - 0.5) * 0.005,
            baseRadius: Math.random() * 1.8 + 1.2,
            colorType: Math.random() > 0.45 ? 'cyan' : 'purple',
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Visibility observer to pause when scrolled out
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    // Color definitions
    const getColors = () => {
      if (isDark) {
        return {
          cyan: 'rgba(0, 212, 255, ',
          purple: 'rgba(168, 85, 247, ',
          line: 'rgba(0, 212, 255, ',
          mouseLine: 'rgba(168, 85, 247, ',
        };
      }
      return {
        cyan: 'rgba(2, 132, 199, ',
        purple: 'rgba(124, 58, 237, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(124, 58, 237, ',
      };
    };

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        p.z += p.vz;

        if (p.z < 0.5) { p.z = 0.5; p.vz = -p.vz; }
        if (p.z > 2.5) { p.z = 2.5; p.vz = -p.vz; }

        // Wrap edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Mouse interaction (gravity / soft repel)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.8;
            p.x -= (dx / dist) * force * 2.5;
            p.y -= (dy / dist) * force * 2.5;

            // Connect particle to mouse
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const mouseLineAlpha = (1 - dist / mouse.radius) * (isDark ? 0.35 : 0.25);
            ctx.strokeStyle = `${colors.mouseLine}${mouseLineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle
        const r = p.baseRadius * (p.z * 0.7);
        const alpha = Math.min((p.z - 0.4) * (isDark ? 0.65 : 0.5), 0.9);
        const pColor = p.colorType === 'cyan' ? `${colors.cyan}${alpha})` : `${colors.purple}${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.shadowColor = p.colorType === 'cyan' ? '#00D4FF' : '#A855F7';
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxDist = 115;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.22 : 0.16) * ((p.z + p2.z) / 4);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${colors.line}${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-interactive-canvas"
      aria-hidden="true"
    />
  );
}

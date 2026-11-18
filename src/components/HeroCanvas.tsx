'use client';

import React, { useEffect, useRef } from 'react';

export type HeroVariant =
  | 'home'
  | 'services'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'ecosystem'
  | 'work'
  | 'solutions'
  | 'industries'
  | 'blog'
  | 'careers'
  | 'brand'
  | 'legal'
  | 'faq';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  colorType: 'primary' | 'secondary';
}

interface HeroCanvasProps {
  variant?: HeroVariant;
}

interface Palette {
  primary: string;
  secondary: string;
  line: string;
  mouseLine: string;
  shadowPrimary: string;
  shadowSecondary: string;
}

function getVariantPalette(variant: HeroVariant, isDark: boolean): Palette {
  if (isDark) {
    switch (variant) {
      case 'services':
        return {
          primary: 'rgba(0, 229, 255, ',
          secondary: 'rgba(56, 189, 248, ',
          line: 'rgba(0, 229, 255, ',
          mouseLine: 'rgba(56, 189, 248, ',
          shadowPrimary: '#00E5FF',
          shadowSecondary: '#38BDF8',
        };
      case 'pricing':
        return {
          primary: 'rgba(16, 185, 129, ',
          secondary: 'rgba(52, 211, 153, ',
          line: 'rgba(16, 185, 129, ',
          mouseLine: 'rgba(52, 211, 153, ',
          shadowPrimary: '#10B981',
          shadowSecondary: '#34D399',
        };
      case 'about':
        return {
          primary: 'rgba(245, 158, 11, ',
          secondary: 'rgba(168, 85, 247, ',
          line: 'rgba(245, 158, 11, ',
          mouseLine: 'rgba(168, 85, 247, ',
          shadowPrimary: '#F59E0B',
          shadowSecondary: '#A855F7',
        };
      case 'contact':
        return {
          primary: 'rgba(244, 63, 94, ',
          secondary: 'rgba(0, 212, 255, ',
          line: 'rgba(244, 63, 94, ',
          mouseLine: 'rgba(0, 212, 255, ',
          shadowPrimary: '#F43F5E',
          shadowSecondary: '#00D4FF',
        };
      case 'ecosystem':
        return {
          primary: 'rgba(168, 85, 247, ',
          secondary: 'rgba(236, 72, 153, ',
          line: 'rgba(168, 85, 247, ',
          mouseLine: 'rgba(236, 72, 153, ',
          shadowPrimary: '#A855F7',
          shadowSecondary: '#EC4899',
        };
      case 'work':
        return {
          primary: 'rgba(99, 102, 241, ',
          secondary: 'rgba(20, 184, 166, ',
          line: 'rgba(99, 102, 241, ',
          mouseLine: 'rgba(20, 184, 166, ',
          shadowPrimary: '#6366F1',
          shadowSecondary: '#14B8A6',
        };
      case 'solutions':
        return {
          primary: 'rgba(59, 130, 246, ',
          secondary: 'rgba(147, 51, 234, ',
          line: 'rgba(59, 130, 246, ',
          mouseLine: 'rgba(147, 51, 234, ',
          shadowPrimary: '#3B82F6',
          shadowSecondary: '#9333EA',
        };
      case 'industries':
        return {
          primary: 'rgba(45, 212, 191, ',
          secondary: 'rgba(59, 130, 246, ',
          line: 'rgba(45, 212, 191, ',
          mouseLine: 'rgba(59, 130, 246, ',
          shadowPrimary: '#2DD4BF',
          shadowSecondary: '#3B82F6',
        };
      case 'blog':
        return {
          primary: 'rgba(56, 189, 248, ',
          secondary: 'rgba(251, 146, 60, ',
          line: 'rgba(56, 189, 248, ',
          mouseLine: 'rgba(251, 146, 60, ',
          shadowPrimary: '#38BDF8',
          shadowSecondary: '#FB923C',
        };
      case 'careers':
        return {
          primary: 'rgba(168, 85, 247, ',
          secondary: 'rgba(16, 185, 129, ',
          line: 'rgba(168, 85, 247, ',
          mouseLine: 'rgba(16, 185, 129, ',
          shadowPrimary: '#A855F7',
          shadowSecondary: '#10B981',
        };
      case 'brand':
        return {
          primary: 'rgba(0, 212, 255, ',
          secondary: 'rgba(59, 130, 246, ',
          line: 'rgba(0, 212, 255, ',
          mouseLine: 'rgba(59, 130, 246, ',
          shadowPrimary: '#00D4FF',
          shadowSecondary: '#3B82F6',
        };
      case 'legal':
        return {
          primary: 'rgba(148, 163, 184, ',
          secondary: 'rgba(56, 189, 248, ',
          line: 'rgba(148, 163, 184, ',
          mouseLine: 'rgba(56, 189, 248, ',
          shadowPrimary: '#94A3B8',
          shadowSecondary: '#38BDF8',
        };
      case 'faq':
        return {
          primary: 'rgba(14, 165, 233, ',
          secondary: 'rgba(129, 140, 248, ',
          line: 'rgba(14, 165, 233, ',
          mouseLine: 'rgba(129, 140, 248, ',
          shadowPrimary: '#0EA5E9',
          shadowSecondary: '#818CF8',
        };
      case 'home':
      default:
        return {
          primary: 'rgba(0, 212, 255, ',
          secondary: 'rgba(168, 85, 247, ',
          line: 'rgba(0, 212, 255, ',
          mouseLine: 'rgba(168, 85, 247, ',
          shadowPrimary: '#00D4FF',
          shadowSecondary: '#A855F7',
        };
    }
  }

  // Light Mode Palettes (Slightly deeper tones for rich contrast on light background)
  switch (variant) {
    case 'services':
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(14, 165, 233, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(14, 165, 233, ',
        shadowPrimary: '#0284C7',
        shadowSecondary: '#0EA5E9',
      };
    case 'pricing':
      return {
        primary: 'rgba(5, 150, 105, ',
        secondary: 'rgba(13, 148, 136, ',
        line: 'rgba(5, 150, 105, ',
        mouseLine: 'rgba(13, 148, 136, ',
        shadowPrimary: '#059669',
        shadowSecondary: '#0D9488',
      };
    case 'about':
      return {
        primary: 'rgba(217, 119, 6, ',
        secondary: 'rgba(124, 58, 237, ',
        line: 'rgba(217, 119, 6, ',
        mouseLine: 'rgba(124, 58, 237, ',
        shadowPrimary: '#D97706',
        shadowSecondary: '#7C3AED',
      };
    case 'contact':
      return {
        primary: 'rgba(225, 29, 72, ',
        secondary: 'rgba(2, 132, 199, ',
        line: 'rgba(225, 29, 72, ',
        mouseLine: 'rgba(2, 132, 199, ',
        shadowPrimary: '#E11D48',
        shadowSecondary: '#0284C7',
      };
    case 'ecosystem':
      return {
        primary: 'rgba(124, 58, 237, ',
        secondary: 'rgba(192, 38, 211, ',
        line: 'rgba(124, 58, 237, ',
        mouseLine: 'rgba(192, 38, 211, ',
        shadowPrimary: '#7C3AED',
        shadowSecondary: '#C026D3',
      };
    case 'work':
      return {
        primary: 'rgba(67, 56, 202, ',
        secondary: 'rgba(13, 148, 136, ',
        line: 'rgba(67, 56, 202, ',
        mouseLine: 'rgba(13, 148, 136, ',
        shadowPrimary: '#4338CA',
        shadowSecondary: '#0D9488',
      };
    case 'solutions':
      return {
        primary: 'rgba(37, 99, 235, ',
        secondary: 'rgba(124, 58, 237, ',
        line: 'rgba(37, 99, 235, ',
        mouseLine: 'rgba(124, 58, 237, ',
        shadowPrimary: '#2563EB',
        shadowSecondary: '#7C3AED',
      };
    case 'industries':
      return {
        primary: 'rgba(15, 118, 110, ',
        secondary: 'rgba(29, 78, 216, ',
        line: 'rgba(15, 118, 110, ',
        mouseLine: 'rgba(29, 78, 216, ',
        shadowPrimary: '#0F766E',
        shadowSecondary: '#1D4ED8',
      };
    case 'blog':
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(234, 88, 12, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(234, 88, 12, ',
        shadowPrimary: '#0284C7',
        shadowSecondary: '#EA580C',
      };
    case 'careers':
      return {
        primary: 'rgba(124, 58, 237, ',
        secondary: 'rgba(5, 150, 105, ',
        line: 'rgba(124, 58, 237, ',
        mouseLine: 'rgba(5, 150, 105, ',
        shadowPrimary: '#7C3AED',
        shadowSecondary: '#059669',
      };
    case 'brand':
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(30, 58, 138, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(30, 58, 138, ',
        shadowPrimary: '#0284C7',
        shadowSecondary: '#1E3A8A',
      };
    case 'legal':
      return {
        primary: 'rgba(71, 85, 105, ',
        secondary: 'rgba(2, 132, 199, ',
        line: 'rgba(71, 85, 105, ',
        mouseLine: 'rgba(2, 132, 199, ',
        shadowPrimary: '#475569',
        shadowSecondary: '#0284C7',
      };
    case 'faq':
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(79, 70, 229, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(79, 70, 229, ',
        shadowPrimary: '#0284C7',
        shadowSecondary: '#4F46E5',
      };
    case 'home':
    default:
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(124, 58, 237, ',
        line: 'rgba(2, 132, 199, ',
        mouseLine: 'rgba(124, 58, 237, ',
        shadowPrimary: '#0284C7',
        shadowSecondary: '#7C3AED',
      };
  }
}

export default function HeroCanvas({ variant = 'home' }: HeroCanvasProps) {
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
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 38 : 65;

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
            vx: (Math.random() - 0.5) * 0.42,
            vy: (Math.random() - 0.5) * 0.42,
            vz: (Math.random() - 0.5) * 0.005,
            baseRadius: Math.random() * 1.8 + 1.2,
            colorType: Math.random() > 0.48 ? 'primary' : 'secondary',
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Visibility observer to pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const palette = getVariantPalette(variant, isDark);

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
            const mouseLineAlpha = (1 - dist / mouse.radius) * (isDark ? 0.35 : 0.14);
            ctx.strokeStyle = `${palette.mouseLine}${mouseLineAlpha})`;
            ctx.lineWidth = isDark ? 1 : 0.6;
            ctx.stroke();
          }
        }

        // Draw particle
        const r = isDark ? p.baseRadius * (p.z * 0.7) : p.baseRadius * (p.z * 0.45);
        const alpha = isDark
          ? Math.min((p.z - 0.4) * 0.65, 0.9)
          : Math.min((p.z - 0.4) * 0.28, 0.38);
        const pColor = p.colorType === 'primary' ? `${palette.primary}${alpha})` : `${palette.secondary}${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.shadowColor = p.colorType === 'primary' ? palette.shadowPrimary : palette.shadowSecondary;
        ctx.shadowBlur = isDark ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw connections to nearby particles
        const maxDist = isDark ? 115 : 75;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.22 : 0.08) * ((p.z + p2.z) / 4);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${palette.line}${lineAlpha})`;
            ctx.lineWidth = isDark ? 0.85 : 0.5;
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
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-interactive-canvas"
      aria-hidden="true"
    />
  );
}

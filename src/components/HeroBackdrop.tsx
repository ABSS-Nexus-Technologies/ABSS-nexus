'use client';

import React from 'react';
import HeroCanvas, { HeroVariant } from './HeroCanvas';

export type { HeroVariant };

export interface HeroBackdropProps {
  variant?: HeroVariant;
  className?: string;
  enableCanvas?: boolean;
}

export default function HeroBackdrop({
  variant = 'home',
  className = '',
  enableCanvas = true,
}: HeroBackdropProps) {
  return (
    <div
      className={`hero-ambient-backdrop hero-variant-${variant} ${className}`}
      aria-hidden="true"
    >
      {/* 3D Cybernetic Grid Wallpaper */}
      <div className="hero-backdrop-image" />

      {/* Fluid Dynamic Aurora Mesh Waves */}
      <div className={`hero-aurora-mesh aurora-${variant}`} />

      {/* Subtle Micro-Grid Overlay */}
      <div className="hero-backdrop-grid" />

      {/* Primary Floating Ambient Glow */}
      <div className={`hero-backdrop-glow-cyan glow-primary-${variant}`} />

      {/* Secondary Floating Ambient Glow */}
      <div className={`hero-backdrop-glow-purple glow-secondary-${variant}`} />

      {/* Edge Vignette */}
      <div className="hero-backdrop-vignette" />

      {/* Interactive 3D Particle Constellation Canvas */}
      {enableCanvas && <HeroCanvas variant={variant} />}
    </div>
  );
}

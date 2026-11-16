"use client";

import React, { useId } from "react";

export interface LogoProps {
  size?: number;
  className?: string;
  theme?: "auto" | "light" | "dark";
}

export const SITE_NAME = "ABSS Nexus Technologies";
export const SITE_SHORT_NAME = "ABSS Nexus";

/**
 * Common A-Orbital Vector Path used across marks
 */
function AOrbitalPath({ gradPrefix }: { gradPrefix: string }) {
  return (
    <g id={`a-mark-${gradPrefix}`}>
      {/* Letter A Core (Beveled 3D Tech Blue) */}
      <path d="M47 18 L50 18 L68 62 L57 65 L48 42 L34 74 L19 76 L47 18 Z" fill={`url(#a-grad-cyan-${gradPrefix})`} />
      <path d="M47 18 L49 18 L34 74 L19 76 Z" fill={`url(#a-grad-dark-${gradPrefix})`} opacity="0.6" />
      <path d="M19 76 L34 74 L21 86 L13 86 Z" fill={`url(#a-grad-dark-${gradPrefix})`} />
      <path d="M62 67 L73 67 L84 86 L70 86 Z" fill={`url(#a-grad-dark-${gradPrefix})`} />
      <path d="M48 42 L57 65 L34 74 Z" fill="#03045E" opacity="0.85" />

      {/* Planetary Orbital Ring (Cyan-Blue Glossy Torus) */}
      <path d="M7 74 C6 79 11 84 21 85 C42 86 65 75 80 61 C86 55 88 50 85 46 C82 42 74 41 63 44 C59 45 60 48 63 47 C72 45 78 45 80 48 C82 51 78 56 73 60 C58 73 37 82 19 80 C13 79 10 77 10 73 C10 70 14 67 20 64 C22 63 21 61 19 62 C11 66 7 70 7 74 Z" fill={`url(#orbit-grad-${gradPrefix})`} />

      {/* Ascending Digital Pixel Cubes (Cyber Cloud Stream) */}
      <rect x="64" y="34" width="6.5" height="6.5" rx="1" fill={`url(#pixel-grad-${gradPrefix})`} />
      <rect x="75" y="34" width="5.5" height="5.5" rx="1" fill={`url(#pixel-grad-${gradPrefix})`} />
      <rect x="70" y="29" width="5.5" height="5.5" rx="1" fill={`url(#pixel-grad-${gradPrefix})`} />
      <rect x="77" y="25" width="6.5" height="6.5" rx="1" fill={`url(#pixel-grad-${gradPrefix})`} />
      <rect x="85" y="20" width="6" height="6" rx="1" fill={`url(#pixel-grad-${gradPrefix})`} />
    </g>
  );
}

function CommonGradients({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`a-grad-cyan-${uid}`} x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="45%" stopColor="#0096C7" />
        <stop offset="100%" stopColor="#0077B6" />
      </linearGradient>
      <linearGradient id={`a-grad-dark-${uid}`} x1="15" y1="30" x2="85" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0077B6" />
        <stop offset="50%" stopColor="#023E8A" />
        <stop offset="100%" stopColor="#03045E" />
      </linearGradient>
      <linearGradient id={`orbit-grad-${uid}`} x1="5" y1="85" x2="90" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0077B6" />
        <stop offset="30%" stopColor="#0096C7" />
        <stop offset="70%" stopColor="#00B4D8" />
        <stop offset="100%" stopColor="#90E0EF" />
      </linearGradient>
      <linearGradient id={`pixel-grad-${uid}`} x1="60" y1="40" x2="95" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00B4D8" />
        <stop offset="100%" stopColor="#48CAE4" />
      </linearGradient>
      <linearGradient id={`lm-bg-${uid}`} x1="6" y1="6" x2="74" y2="74" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#141E33" />
        <stop offset="100%" stopColor="#060913" />
      </linearGradient>
      <linearGradient id={`wm-cyan-${uid}`} x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00A3FF" />
        <stop offset="100%" stopColor="#0077B6" />
      </linearGradient>
      <linearGradient id={`wm-cyan-dark-${uid}`} x1="72" y1="8" x2="160" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
      <linearGradient id={`em-ring-${uid}`} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="50%" stopColor="#0077B6" />
        <stop offset="100%" stopColor="#023E8A" />
      </linearGradient>
      <linearGradient id={`em-core-${uid}`} x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#040711" />
      </linearGradient>
    </defs>
  );
}

/**
 * 1. Lettermark (Monogram): Precision geometric "A" Orbital Monogram inside squircle badge.
 */
export function LettermarkLogo({ size = 64, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Lettermark Logo`}
    >
      <CommonGradients uid={uid} />
      <rect x="5" y="5" width="90" height="90" rx="24" fill={`url(#lm-bg-${uid})`} />
      <rect x="6.5" y="6.5" width="87" height="87" rx="22.5" stroke="rgba(0, 212, 255, 0.35)" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 4" />
      <g transform="translate(4, 3) scale(0.92)">
        <AOrbitalPath gradPrefix={uid} />
      </g>
    </svg>
  );
}

/**
 * 2. Wordmark (Logotype): Editorial dual-weight typography with nexus node bridge.
 */
export function WordmarkLogo({ size = 50, className, theme = "auto" }: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const width = Math.round(size * 3.6);

  const isDark = theme === "dark";
  const primaryFill = isDark ? "#FFFFFF" : "#0F172A";
  const mutedFill = isDark ? "#38BDF8" : "#475569";
  const gradId = isDark ? `wm-cyan-dark-${uid}` : `wm-cyan-${uid}`;

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 200 65"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Wordmark Logo`}
    >
      <CommonGradients uid={uid} />
      <text
        x="12"
        y="36"
        fill={primaryFill}
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-0.5"
      >
        ABSS <tspan fill={`url(#${gradId})`} fontWeight="800">NEXUS</tspan>
      </text>

      <circle cx="16" cy="49" r="3" fill={`url(#${gradId})`} />
      <rect x="23" y="47.8" width="56" height="2.4" rx="1.2" fill={`url(#${gradId})`} />

      <text
        x="86"
        y="52"
        fill={mutedFill}
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="8.8"
        letterSpacing="3.4"
      >
        TECHNOLOGIES
      </text>
    </svg>
  );
}

/**
 * 3. Pictorial Mark (Brand Mark): Supersonic A-Orbital Rocket / Launch Crest.
 */
export function PictorialLogo({ size = 64, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Pictorial Logo`}
    >
      <CommonGradients uid={uid} />
      <circle cx="50" cy="50" r="44" stroke="#00D4FF" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="6 5" />
      <circle cx="50" cy="50" r="36" stroke="#0077B6" strokeOpacity="0.18" strokeWidth="1.2" />
      <path d="M22 68 L14 78 M30 73 L24 82" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(1, 0)">
        <AOrbitalPath gradPrefix={uid} />
      </g>
      <circle cx="88" cy="23" r="4.5" fill="#FFFFFF" stroke="#00D4FF" strokeWidth="2.5" />
      <circle cx="88" cy="23" r="2" fill="#00D4FF" />
    </svg>
  );
}

/**
 * 4. Abstract Mark: Pure Standalone A-Orbital Symbol.
 */
export function AbstractLogo({ size = 64, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Abstract Logo`}
    >
      <CommonGradients uid={uid} />
      <g transform="translate(2, 3) scale(0.96)">
        <AOrbitalPath gradPrefix={uid} />
      </g>
    </svg>
  );
}

/**
 * 5. Mascot: "Nexi" Cyber Fox AI Bot with A-Orbital HUD.
 */
export function MascotLogo({ size = 68, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Mascot Logo`}
    >
      <CommonGradients uid={uid} />
      <circle cx="50" cy="52" r="42" fill="#090D18" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="2" />
      <path d="M22 41 L19 14 L41 29 Z" fill={`url(#a-grad-cyan-${uid})`} />
      <path d="M78 41 L81 14 L59 29 Z" fill={`url(#a-grad-cyan-${uid})`} />
      <path d="M24 35 L23 20 L37 30 Z" fill="#90E0EF" />
      <path d="M76 35 L77 20 L63 30 Z" fill="#90E0EF" />

      <path d="M20 47 C20 32 33 25 50 25 C67 25 80 32 80 47 C80 66 66 80 50 82 C34 80 20 66 20 47 Z" fill={`url(#a-grad-dark-${uid})`} />
      <path d="M21 51 C29 51 36 56 41 65 C45 71 47 76 50 82 C34 80 21 67 21 51 Z" fill="#F8FAFC" />
      <path d="M79 51 C71 51 64 56 59 65 C55 71 53 76 50 82 C66 80 79 67 79 51 Z" fill="#F8FAFC" />

      <rect x="25" y="40" width="50" height="17" rx="8.5" fill="#0B132B" stroke="#00D4FF" strokeWidth="1.8" />
      <circle cx="37" cy="48.5" r="4.2" fill="#00D4FF" />
      <circle cx="63" cy="48.5" r="4.2" fill="#00D4FF" />
      <circle cx="38.5" cy="47" r="1.5" fill="#FFFFFF" />
      <circle cx="64.5" cy="47" r="1.5" fill="#FFFFFF" />

      <g transform="translate(46, 42) scale(0.12)">
        <AOrbitalPath gradPrefix={uid} />
      </g>

      <path d="M45.5 65 C45.5 63 47.5 62 50 62 C52.5 62 54.5 63 54.5 65 C54.5 67 52 69 50 69 C48 69 45.5 67 45.5 65 Z" fill="#090D18" />
      <path d="M45 72 C47.5 75 52.5 75 55 72" stroke="#090D18" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 6. Combination Mark (MAIN LOGO): A-Orbital Crest + ABSS Nexus Technologies Wordmark.
 */
export function CombinationLogo({
  size = 42,
  theme = "auto",
  className,
}: LogoProps) {
  const isDark = theme === "dark";
  const primaryFill = isDark ? "#FFFFFF" : "#0F172A";
  const cyanFill = isDark ? "#00D4FF" : "#0077B6";
  const subFill = isDark ? "#38BDF8" : "#475569";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <AbstractLogo size={size} />
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.1,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: Math.max(16, Math.round(size * 0.5)),
            letterSpacing: "-0.02em",
            color: primaryFill,
          }}
        >
          ABSS <span style={{ color: cyanFill }}>NEXUS</span>
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: subFill,
          }}
        >
          TECHNOLOGIES
        </span>
      </span>
    </span>
  );
}

/**
 * 7. Emblem: Circular Credential Seal with radial curved typography.
 */
export function EmblemLogo({ size = 68, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  const topText = "ABSS NEXUS".split("");
  const botText = "TECHNOLOGIES".split("");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Emblem Logo`}
    >
      <CommonGradients uid={uid} />
      <circle cx="50" cy="50" r="46" fill={`url(#em-core-${uid})`} />
      <circle cx="50" cy="50" r="44.5" stroke={`url(#em-ring-${uid})`} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Curved Top Seal Text */}
      <g fill="#FFFFFF" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="800" fontSize="6.4">
        {topText.map((ch, i) => {
          const angle = -50 + (i * 100) / (topText.length - 1);
          return (
            <text key={`top-${i}`} x="50" y="19.5" textAnchor="middle" transform={`rotate(${angle} 50 50)`}>
              {ch}
            </text>
          );
        })}
      </g>

      {/* Curved Bottom Seal Text */}
      <g fill="#00D4FF" fontFamily="'Inter', system-ui, sans-serif" fontWeight="700" fontSize="5.4">
        {botText.map((ch, i) => {
          const angle = 55 - (i * 110) / (botText.length - 1);
          return (
            <text key={`bot-${i}`} x="50" y="85.2" textAnchor="middle" transform={`rotate(${angle} 50 50)`}>
              {ch}
            </text>
          );
        })}
      </g>

      <path d="M13 50L15.2 47.8L17.4 50L15.2 52.2Z" fill="#00D4FF" />
      <path d="M82.6 50L84.8 47.8L87 50L84.8 52.2Z" fill="#0077B6" />

      <circle cx="50" cy="50" r="24" fill="#090D18" stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="21.5" stroke={`url(#em-ring-${uid})`} strokeOpacity="0.45" strokeWidth="1" />

      <g transform="translate(29, 28) scale(0.42)">
        <AOrbitalPath gradPrefix={uid} />
      </g>
    </svg>
  );
}

/**
 * 8. Corporate Seal Stamp: Official Royal-Blue ink stamp.
 */
export function CorporateSealLogo({ size = 110, className }: LogoProps) {
  const ink = "#162B7A";
  const topText = "• ABSS NEXUS TECHNOLOGIES •".split("");
  const botText = "CORPORATE SEAL • ESTD 2026".split("");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`${SITE_NAME} Corporate Seal`}
    >
      <circle cx="50" cy="50" r="46.5" stroke={ink} strokeWidth="2.3" />
      <circle cx="50" cy="50" r="43" stroke={ink} strokeWidth="0.95" />
      <circle cx="50" cy="50" r="25" stroke={ink} strokeWidth="1.5" />

      <g fill={ink} fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="800" fontSize="5.6">
        {topText.map((ch, i) => {
          const angle = -105 + (i * 210) / (topText.length - 1);
          return (
            <text key={`cs-t-${i}`} x="50" y="19" textAnchor="middle" transform={`rotate(${angle} 50 50)`}>
              {ch}
            </text>
          );
        })}
      </g>

      <g fill={ink} fontFamily="'Inter', system-ui, sans-serif" fontWeight="800" fontSize="5.2">
        {botText.map((ch, i) => {
          const angle = 60 - (i * 120) / (botText.length - 1);
          return (
            <text key={`cs-b-${i}`} x="50" y="86.2" textAnchor="middle" transform={`rotate(${angle} 50 50)`}>
              {ch}
            </text>
          );
        })}
      </g>

      <g transform="translate(29, 29) scale(0.42)">
        <path d="M47 18 L50 18 L68 62 L57 65 L48 42 L34 74 L19 76 L47 18 Z" fill={ink} />
        <path d="M19 76 L34 74 L21 86 L13 86 Z" fill={ink} />
        <path d="M62 67 L73 67 L84 86 L70 86 Z" fill={ink} />
        <path d="M7 74 C6 79 11 84 21 85 C42 86 65 75 80 61 C86 55 88 50 85 46 C82 42 74 41 63 44 C59 45 60 48 63 47 C72 45 78 45 80 48 C82 51 78 56 73 60 C58 73 37 82 19 80 C13 79 10 77 10 73 C10 70 14 67 20 64 C22 63 21 61 19 62 C11 66 7 70 7 74 Z" fill={ink} />
        <rect x="64" y="34" width="6.5" height="6.5" rx="1" fill={ink} />
        <rect x="75" y="34" width="5.5" height="5.5" rx="1" fill={ink} />
        <rect x="70" y="29" width="5.5" height="5.5" rx="1" fill={ink} />
        <rect x="77" y="25" width="6.5" height="6.5" rx="1" fill={ink} />
        <rect x="85" y="20" width="6" height="6" rx="1" fill={ink} />
      </g>
    </svg>
  );
}

/** Default Main Logo export */
export function MainLogo({ size = 42, className, theme = "auto" }: LogoProps) {
  return <CombinationLogo size={size} className={className} theme={theme} />;
}

export const ALL_LOGO_VARIANTS = [
  {
    number: 1,
    type: "Lettermark (Monogram)",
    description: `Precision geometric "A" Orbital Monogram set inside a midnight squircle badge with electric cyan glow.`,
    Component: LettermarkLogo,
  },
  {
    number: 2,
    type: "Wordmark (Logotype)",
    description: `Custom dual-weight "${SITE_SHORT_NAME}" typography with precision cyan accent bar and edge telemetry node.`,
    Component: WordmarkLogo,
  },
  {
    number: 3,
    type: "Pictorial Mark (Brand Mark)",
    description: `Faceted "A" supersonic rocket piercing through a cosmic orbit with ascending digital pixel trails.`,
    Component: PictorialLogo,
  },
  {
    number: 4,
    type: "Abstract Mark",
    description: `Pure standalone 3D-beveled "A" symbol with sweeping planetary torus swoosh and ascending cloud cubes.`,
    Component: AbstractLogo,
  },
  {
    number: 5,
    type: "Mascot",
    description: `"Nexi" the friendly tech-fox mentor wearing glowing electric-cyan visor glasses with the "A" hologram.`,
    Component: MascotLogo,
  },
  {
    number: 6,
    type: "Combination Mark (Main Logo)",
    description: `Official Flagship Identity: 3D "A" Orbital Mark paired with stacked ${SITE_NAME} typography — optimized for both light and dark backgrounds.`,
    Component: CombinationLogo,
  },
  {
    number: 7,
    type: "Emblem",
    description: `Circular credential seal with curved orbital perimeter typography and center "A" Orbital Crest.`,
    Component: EmblemLogo,
  },
] as const;

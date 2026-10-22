# Design System & UI Guidelines (DESIGN.md)
## ABSS Nexus Technologies — Visual Language & Interface Specifications

---

## 1. Design Philosophy

The ABSS Nexus Technologies design system is modeled after the refined, precision-engineered aesthetics of **Apple** and high-conversion modern tech giants:
- **Clean Minimalism**: Content-first layouts with purposeful negative space.
- **Visual Hierarchy**: Stark typographic contrasts, subtle borders, and delicate depth.
- **Glassmorphism**: Soft background blurs (`backdrop-filter: blur(20px) saturate(180%)`) on navigation bars and floating elements.
- **Delightful Motion**: Decelerating spring animations and tactile micro-interactions that make interfaces feel responsive and alive.

---

## 2. Color System & Tokens

### 2.1 Core Palette
| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-white` | `#FFFFFF` | Card backgrounds, pure white elements, inverted text |
| `--color-light-gray` | `#F5F5F7` | Section alternations, subtle backdrops, pill badges |
| `--color-near-black` | `#1D1D1F` | Primary text headings, dark neutral accents |
| `--color-secondary-text` | `#6E6E73` | Subtitles, descriptions, metadata, timestamps |
| `--color-border` | `#D2D2D7` | Light subtle borders, dividers, separators |
| `--color-blue` | `#0066CC` | Apple accent blue, primary links, focus rings |
| `--cyan` | `#00c2ff` | High-tech accent glow, brand gradients, button glow |
| `--navy` | `#0d1b2a` | Deep contrast footers, dark backgrounds |

### 2.2 Functional & Status Colors
- **Success / Live Pulse**: `#27C93F` / `#10B981` (Edge active, live status indicators)
- **Warning / Star Ratings**: `#FF9500` (5-star ratings, pending alerts)
- **Error / Revocation**: `#FF3B30` (Invalid certificate, validation error)

### 2.3 Brand Gradients
```css
/* Signature Apple-Inspired Cyan/Blue Gradient */
--brand-gradient: linear-gradient(135deg, #0066CC 0%, #0099FF 100%);

/* Radiant Text Accent Gradient */
--text-gradient-cyan: linear-gradient(135deg, #0066CC 0%, #00c2ff 100%);
```

---

## 3. Typography System

### 3.1 Font Families
- **Body & Interface**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Weights: `400` (Regular), `500` (Medium), `600` (Semibold), `700` (Bold)
- **Display Headings**: `"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif`
  - Weights: `500` (Medium), `600` (Semibold), `700` (Bold)

### 3.2 Fluid Responsive Scale (Clamp)
```css
/* Hero Display H1 */
font-size: clamp(2.1rem, 4.4vw, 3.8rem);
line-height: 1.12;
letter-spacing: -0.025em;

/* Section Heading H2 */
font-size: clamp(1.8rem, 3.2vw, 2.6rem);
line-height: 1.2;
letter-spacing: -0.02em;

/* Card Title H3 */
font-size: clamp(1.2rem, 1.8vw, 1.45rem);
line-height: 1.3;

/* Body Text */
font-size: 1rem (16px);
line-height: 1.65;
```

---

## 4. Spacing, Layout & Grids

### 4.1 Global Container
- **Max Width**: `1240px`
- **Padding**: `0 24px` on desktop, `0 16px` on mobile (< 768px).

### 4.2 Standard Grids
- **3-Column Feature/Service Grid**:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  ```
- **2-Column Hero / Showcase Grid**:
  ```css
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
  ```

---

## 5. UI Component Specifications

### 5.1 Buttons
- **Primary Glowing Button (`.btn-glow-cyan`, `.site-hero__btn--primary`)**:
  - Background: Gradient `#0066CC` to `#0099FF`.
  - Padding: `13px 26px`.
  - Border-radius: `980px` (pill shape).
  - Hover: `transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 102, 204, 0.35);`.
  - Active: `transform: scale(0.97) translateY(0);`.
- **Secondary Glass Button (`.btn-glass`, `.site-hero__btn--secondary`)**:
  - Background: `rgba(255, 255, 255, 0.85)`.
  - Border: `1px solid #D2D2D7`.
  - Color: `#1D1D1F`.
  - Hover: `transform: translateY(-2px); background: #FFFFFF; border-color: #0066CC; color: #0066CC;`.
- **WhatsApp Outline Button (`.btn-whatsapp-outline`)**:
  - Border: `1px solid rgba(37, 211, 102, 0.35)`.
  - Color: `#128C7E`.
  - Hover: `background: rgba(37, 211, 102, 0.08); transform: translateY(-2px);`.

### 5.2 Badges & Status Indicators
- **Apple Pill Badge (`.hero-pill-badge`, `.section-badge-apple`)**:
  - Background: `rgba(0, 102, 204, 0.06)`.
  - Border: `1px solid rgba(0, 102, 204, 0.18)`.
  - Border-radius: `980px`.
  - Typography: `0.78rem`, uppercase, letter-spacing `0.06em`, font-weight `600`.
- **Live Pulse Dot (`.live-pulse-dot`)**:
  - Size: `8px x 8px`, border-radius `50%`.
  - Color: `#27C93F`.
  - Animation: Pulse scale `1` to `1.35` with decaying box-shadow ring.

### 5.3 Interactive Cards
- Border: `1px solid #D2D2D7`.
- Radius: `18px`.
- Box Shadow: `0 4px 20px rgba(0, 0, 0, 0.03)`.
- Hover: `transform: translateY(-6px); box-shadow: 0 16px 36px -10px rgba(0, 102, 204, 0.16); border-color: rgba(0, 102, 204, 0.35);`.

---

## 6. Motion & Animation System

### 6.1 Page Entrance Stagger
Elements at the top of the viewport animate sequentially on load:
```css
/* 1. Badge / Eyebrow */
animation: heroItemFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.05s backwards;

/* 2. Main Title */
animation: heroItemFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s backwards;

/* 3. Description Copy */
animation: heroItemFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.20s backwards;

/* 4. Action Buttons */
animation: heroItemFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.28s backwards;
```

### 6.2 Scroll Reveal Cascades
- Class: `.reveal-on-scroll`
- Stagger Delays: `.reveal-delay-1` (70ms) through `.reveal-delay-6` (420ms).
- Initial State: `opacity: 0; transform: translateY(26px);`.
- Revealed State (`.is-revealed`): `opacity: 1; transform: translateY(0);`.

### 6.3 Cross-Document View Transitions
```css
@view-transition {
  navigation: auto;
}
```

---

## 7. Responsive Breakpoint Matrix

| Viewport Range | Breakpoint Name | Key Layout Adjustments |
| :--- | :--- | :--- |
| **>= 1140px** | Desktop Large | Full horizontal navbar, 3-column mega menus, dual-column hero |
| **992px - 1139px** | Desktop Medium | Collapsed desktop navbar, slightly reduced typography clamp |
| **768px - 991px** | Tablet | Mobile hamburger drawer active, hero visual stacks below copy |
| **481px - 767px** | Mobile Landscape | Single column cards, full-width action buttons |
| **<= 480px** | Mobile Portrait | Compact padding (`16px`), stacked action buttons, 38px touch targets |

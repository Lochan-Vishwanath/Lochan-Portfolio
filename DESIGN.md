# Lochan Portfolio — Design System

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| canvas | #faf9f5 | Page background |
| surface-card | #efe9de | Card backgrounds, assistant chat bubbles |
| surface-dark | #181715 | Dark section backgrounds (Skills, Footer) |
| surface-dark-soft | #1f1e1b | Code window backgrounds |
| surface-dark-elevated | #252320 | Elevated dark surfaces |
| ink | #141413 | Primary text color |
| body | #3d3d3a | Body text |
| muted | #6c6a64 | Secondary text, captions |
| primary | #cc785c | Coral — CTAs, user bubbles, "AI" highlight |
| primary-active | #a9583e | Coral hover state |
| hairline | #e6dfd8 | Borders, dividers |
| on-primary | #ffffff | Text on coral backgrounds |
| on-dark | #ffffff | Text on dark backgrounds |
| on-dark-soft | rgba(255,255,255,0.6) | Soft text on dark backgrounds |
| accent-teal | #5eead4 | Terminal output highlight |

## Typography

### Font Families
- **Display**: Fraunces (Google Fonts) — weight 400, opsz 144, Soft variation. Used for all display headlines.
- **Sans**: Inter — weights 400 and 500. Used for body text, nav links, UI labels.
- **Mono**: JetBrains Mono — used for code/terminal elements.

### Type Scale
| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| H1 (Hero) | Fraunces | 64px desktop / 40px mobile | 400 | tracking-tighter (-0.04em) |
| H2 (Sections) | Fraunces | 36px | 400 | tracking-tight |
| H3 (Project titles) | Fraunces | 28px | 400 | tracking-tight |
| Body | Inter | 18px | 400 | normal |
| Body small | Inter | 16px | 400 | normal |
| Nav links | Inter | 14px | 500 | normal |
| Caption uppercase | Inter | 12px | 500 | tracking-widest uppercase |

## Spacing Scale

| Token | Value |
|-------|-------|
| section | 96px (py-section) |
| xxl | 48px |
| xl | 32px |
| lg | 24px |
| md | 16px |
| sm | 8px |
| xs | 4px |

## Border Radius

| Token | Value |
|-------|-------|
| md | 8px |
| lg | 12px |
| xl | 16px |
| pill | 9999px |

## Components

### Buttons
- **Primary**: bg-primary (#cc785c), text-on-primary, hover:bg-primary-active, rounded-pill, px-lg py-md
- **Secondary**: border border-hairline, bg-canvas, text-ink, hover:bg-surface-card, rounded-pill
- **Focus state**: focus-visible:ring-2 focus-visible:ring-primary

### Cards
- **Surface card**: bg-surface-card, border border-hairline, rounded-xl, p-lg
- **Callout card (coral)**: bg-primary, text-on-primary, rounded-xl, p-lg

### Code Window
- bg-surface-dark, rounded-xl, overflow-hidden
- Top bar: 3 dots (traffic lights) in muted colors
- Content area: bg-surface-dark-soft, p-lg, font-mono

### Chat Bubbles
- **User bubble**: bg-primary, text-on-primary, rounded-lg (bottom-right rounded-sm for tail), px-lg py-md, max-w-[60%], right-aligned
- **Assistant bubble**: bg-surface-card, text-ink, rounded-lg (bottom-left rounded-sm), px-xl py-xl, max-w-[85%], left-aligned

### Badges
- Pill-shaped: rounded-pill, px-sm py-xs
- font-mono 12px
- border-hairline border

### Availability Pill
- Small green dot (#22c55e) + text in muted color
- Used in TopNav (subtle) and Hero (prominent with coral background)

## Surface Rhythm

Page pacing: **cream → dark → cream**

1. Hero, About, Projects, Experience, Writing, Contact: cream (canvas #faf9f5)
2. Skills section ONLY: dark navy (surface-dark #181715)
3. Footer: dark navy (surface-dark #181715)

## Coral Usage Rules (CRITICAL)

Coral (#cc785c) is RESERVED for these specific elements ONLY:
- Primary CTA buttons
- User chat bubbles
- Open-to-work pill (Hero)
- Callout card (Contact section)
- "AI" word in Hero headline
- Card border pulse on CopilotKit tool-fire

**Nowhere else. No exceptions.**

## ONE Design Deviation

This portfolio deviates from the Claude.com design system in **one way**:
- **Display serif**: Fraunces (Google Fonts, weight 400, Soft + opsz 144 variation) replaces Copernicus / Tiempos Headline.

All other tokens, colors, spacing, components, radii, and surface rhythm match the Claude.com design system exactly.

## Accessibility

- All color combinations meet WCAG AA minimum (cream/ink combo is AAA)
- Focus states: visible ring using primary color
- prefers-reduced-motion: disables all animations
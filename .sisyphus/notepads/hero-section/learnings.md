# Hero Section - Learnings

## Design System Patterns
- Tailwind v4 with `@theme` block in `app/globals.css` (no tailwind.config)
- Design tokens as CSS custom properties: `--color-*`, `--spacing-*`, `--radius-*`, `--font-*`
- Path alias: `@/*` → `./*`
- Fonts via `next/font/google` with CSS variable injection

## Component API Conventions
- Button: `onClick` is `() => void` (no event param); href renders `<Link>`
- CodeWindow: children only, dark surface with traffic lights
- Sections: use `"use client"` when containing hooks/interactivity
- Use `export function` pattern (not default export)

## Motion/Animation
- Package: `motion` v12.38.0 (`motion/react` import path)
- `useReducedMotion()` for accessibility
- `mounted` state pattern to avoid SSR hydration mismatch
- Use `aria-hidden` on animated spans, `aria-label` on parent for accessibility

## Gotchas
- `text-display-xl` not defined in theme — used `text-5xl lg:text-6xl` instead
- `profile.resumeUrl` = `/resume.pdf` for download button href
- LSP server `typescript-language-server` not installed; TypeScript check via `tsc --noEmit` works

## 2026-05-04 - useFocusTrap hook created
- Created `hooks/useFocusTrap.ts` - custom React hook for modal focus trapping
- Codebase convention: `"use client"` directive for client-side hooks
- TypeScript strict mode, `@/*` path alias configured
- No existing hooks directory existed, created fresh
- Focus trap uses `querySelectorAll` with proper selector for focusable elements: `button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])` (all with `:not([disabled])`)
- Tab/Shift+Tab cycling wraps focus within container
- Focus restored to trigger element on unmount via `triggerRef`
- No external focus-trap library used

## 2026-05-04 - Experience section created
- Created `components/sections/Experience.tsx` — vertical timeline with coral dots
- `<details>` + `<summary>` for expandable bullet list (closed by default)
- Smooth height animation: `grid [grid-template-rows:0fr]` → `group-open:[grid-template-rows:1fr]` with `transition-[grid-template-rows] duration-300`
- Requires `interpolate-size: allow-keywords` on `:root` (already in globals.css)
- Coral dots: `border-[5px] border-canvas` creates ring effect, centers on timeline line
- Timeline line: absolute positioned `bg-hairline` with `left-[11px]` (half of 22px dot)
- Design tokens used: bg-canvas, py-section, font-display, text-ink, text-primary, text-body, text-muted, bg-hairline
- Caption pattern: `font-sans text-xs font-medium tracking-widest uppercase` (no dedicated utility class)
- Section follows established pattern: `<section id>` + `<div max-w-* mx-auto px-lg>` + `aria-labelledby`
- Build verified: `npm run build` passes clean

## 2026-05-04 - ProjectCard + ProjectModal + useFocusTrap update

### useFocusTrap.ts (rewritten)
- Simplified API: useFocusTrap(isActive: boolean) returns RefObject<HTMLDivElement | null> directly
- Self-captures trigger via document.activeElement when isActive becomes true (no external triggerRef needed)
- Restores focus to captured element on deactivate
- Uses equestAnimationFrame to ensure DOM ready before focusing first focusable
- Cleanup cancels rAF and removes keydown listener

### ProjectCard.tsx
- Chat-bubble layout: user bubble (right/coral) "Tell me about {name}.", assistant bubble (left/cream) with content
- Tech stack: Badge components, max 6 visible, "+N more" Badge for remainder
- Metrics: 3-column grid of stat tiles using bg-canvas on top of surface-card bubble (visually nested)
- Three preview sub-components:
  - IframePreview: sandboxed iframe 16:9 with "Live" pill (accent-teal) top-right
  - MockupPreview: Image inside CodeWindow shell
  - GifPreview: useMatchMedia for prefers-reduced-motion, shows static fallback text if reduced
- CTA: View Details (onClick callback), GitHub + Live Site (Button with href)
- Uses ChatBubble, Badge, Button, CodeWindow � all existing design system primitives

### ProjectModal.tsx
- Backdrop: bg-ink/40 (Tailwind v4 opacity modifier), full-screen fixed overlay, close on click
- Modal: role=dialog, aria-modal, centered, max-w-[880px], content max-h-[90vh] overflow-y-auto
- Animation: grid-template-rows 0fr?1fr transition (NOT interpolate-size), 300ms ease-out
- Close: Esc key listener, backdrop click, close button (?)
- Body scroll locked while open (document.body.style.overflow = 'hidden')
- useFocusTrap for focus management
- Content sections: header with close btn, title+tagline, full tech stack, metrics, interesting decisions, preview, footer links
- Design tokens used throughout: bg-canvas, bg-surface-card, bg-ink/40, text-ink, text-body, text-primary, text-muted, font-display, font-sans, all spacing scale tokens


## T13: Projects section
- Created components/sections/Projects.tsx � cream band, 3 ProjectCards stacked with gap-xxl (48px)
- Modal state: useState<string | null> for slug, find project by slug, pass to ProjectModal
- Follows same section pattern as Experience.tsx: max-w-2xl mx-auto px-lg, py-section, ont-display text-4xl for heading
- ProjectCard already handles user bubble text ('Tell me about {name}.') and 'View Details' button wiring
- Design tokens from globals.css: canvas (#faf9f5), section spacing (96px), xxl gap (48px)
- Build passes clean with Next.js 16.2.4 (Turbopack)

## T??: Chat AvatarButton
- Created `components/chat/AvatarButton.tsx` — floating FAB that opens chat panel via CustomEvent
- Uses `useReducedMotion()` from `motion/react` (already configured with `MotionConfig reducedMotion="user"` in layout)
- Glow pulse animation: `@keyframes glow-pulse` with coral box-shadow, 2s ease-in-out infinite
- Tailwind v4 custom animation: `--animate-glow-pulse: glow-pulse 2s ease-in-out infinite` in `@theme` block
- Design tokens: `bg-primary` (coral #cc785c), `text-on-primary` (white), `rounded-pill`, `bottom-lg right-lg` (24px), `size-14` (56px FAB)
- Focus-visible: `ring-2 ring-primary ring-offset-2` — matches Button component pattern
- Dispatches `CustomEvent("open-chat-panel")` on window — decoupled from ChatPopup
- "AI" text inside (chosen over SpikeMark since plus-shape reads as "close")
- Build verified: `npm run build` passes clean with zero errors
## T19: ChatPopup component

- Created components/chat/ChatPopup.tsx — custom CopilotKit chat popup wrapper
- Uses <CopilotPopup /> from @copilotkit/react-ui (v1.56.4, v2 API)
- Imported @copilotkit/react-ui/styles.css for structural CSS; all visual styling overridden via custom sub-components and CSS variables
- Open/close: Listens for window.addEventListener("open-chat-panel") CustomEvent dispatched by Contact section's "Open chat" button
- State management: isOpen boolean + popupKey counter. Key increments on each open request to force CopilotPopup remount, resetting chat state cleanly
- Conditional rendering: {isOpen && <CopilotPopup />} — unmounts when closed, mounts fresh when opened
- Custom sub-components: CustomMessages (flex-col + overflow-y-auto), CustomUserMessage (coral bg, right-aligned, chat tail), CustomAssistantMessage (cream surface, left-aligned, hairline border), CustomRenderActionExecutionMessage / ToolCallPill (running/complete states)
- Tool-call pill: running= coral border+glow shadow+animated dot, complete= accent-teal, default= hairline+muted. Design tokens: font-mono, text-xs, rounded-pill
- Coral pulse animation: @keyframes coral-card-pulse via inline <style> tag, 0->6px->0 box-shadow with coral at 40% opacity, 1.5s infinite
- CSS variable injection: className overrides CopilotKit defaults (--copilot-kit-primary-color:#cc785c, --copilot-kit-background-color:#181715)
- Type issues: UserMessage/AssistantMessage props are complex CopilotKit types, used ny with content extraction chain. v2 CopilotPopup does NOT accept width/height/instructions as direct props. RenderActionExecutionMessage cast as ny.
- Not yet wired into page.tsx — exported but not imported in page composition yet
- Build: npm run build exits 0, Next.js 16.2.4 Turbopack

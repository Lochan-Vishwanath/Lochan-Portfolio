# Lochan Portfolio — Build Plan

## TL;DR

> **Quick Summary**: Build a single-page portfolio for Lochan Vishwanath (Senior FE Engineer, 6 YoE) using Next.js 15 + Tailwind v4 + CopilotKit chatbot. The portfolio converts a 30-second recruiter skim into an interview. Six checkpoint-based build waves with Playwright verification after each.
>
> **Deliverables**:
> - Next.js 15 App Router SPA with 9 sections (TopNav, Hero, About, Projects×3, Experience, Skills, Writing, Contact, Footer)
> - CopilotKit chatbot with 8 frontend tools + visible tool-call pills + coral card-pulse on tool-fire
> - Framer Motion word-by-word hero animation (respects prefers-reduced-motion)
> - Project modals with focus trap, Esc/backdrop close
> - 6 Playwright checkpoints verifying desktop + mobile at each stage
> - DESIGN.md token system encoded in Tailwind v4 @theme
>
> **Estimated Effort**: Large (25+ tasks across 6 waves)
> **Parallel Execution**: YES - 6 waves with max 6 concurrent tasks per wave
> **Critical Path**: T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8 → T9 → T10 → T11 → T12 → T13 → T14 → T15 → T16 → T17 → T18 → T19 → T20 → T21 → T22 → T23 → T24 → T25 → F1-F4

---

## Context

### Original Request
Build a complete single-page portfolio for Lochan Vishwanath with 6 checkpoints, Playwright verification at each, CopilotKit chatbot with 8 tools, and strict adherence to DESIGN.md tokens (with Fraunces as the only font deviation).

### Interview Summary
**Key Discussions**:
- Design tokens: Use tokens from prompt (no DESIGN.md file exists)
- Assets: All placeholders (avatar, screenshots, resume.pdf)
- GitHub handle: Keep [handle] placeholder
- OpenCode Zen API key: Provided (sk-Se1DQ29a8di9TllY64efoiYjn9wXmDSNXUyVXhLFBbEHcAsbFmbFkBndLE9FH2Bo)
- OpenCode Zen: Multi-protocol gateway, use /chat/completions models only

**Research Findings**:
- Next.js 15 requires React 19, async params/searchParams
- Tailwind v4 uses CSS @theme, not tailwind.config.ts
- framer-motion renamed to "motion" v12, import from "motion/react"
- CopilotKit v1.56.4 stable, useFrontendTool for client-side tools
- Zen injects custom ping events in SSE — may need middleware filtering

### Metis Review
**Identified Gaps** (addressed):
- CopilotKit runtime architecture: Added explicit Route Handler task (T17)
- Zen SSE ping risk: Added middleware filtering layer in runtime
- maxSteps for tool calling: Set to 10 in BuiltInAgent config
- Zod dependency: Added explicit zod install
- Responsive verification: Checkpoints run at both 1280px and 375px
- Error handling for chatbot: Added graceful degradation
- API key security: Server-side only, .env.local in .gitignore
- SEO metadata: Added to layout.tsx task

---

## Work Objectives

### Core Objective
Build a production-quality single-page portfolio that converts recruiter visits into interview requests through clear positioning, project showcase, and an AI chatbot assistant.

### Concrete Deliverables
- `app/layout.tsx` — Root layout with fonts, metadata, CopilotKit provider
- `app/page.tsx` — All 9 sections composed
- `app/api/copilotkit/route.ts` — CopilotKit runtime with Zen proxy
- 8 section components + 6 UI components + 3 chat components
- 5 data files in lib/data/
- 2 Copilot config files (system prompt, tools)
- 6 Playwright test files for checkpoints
- Tailwind v4 @theme in globals.css

### Definition of Done
- [ ] `npm run build` exits 0 with no errors
- [ ] `npm run dev` serves page at localhost:3000
- [ ] All 6 Playwright checkpoints pass at desktop (1280px) and mobile (375px)
- [ ] CopilotKit chat opens, responds, and fires tools
- [ ] No horizontal overflow at 375, 768, 1024, 1440, 1920px
- [ ] Hero animation is one-shot, respects prefers-reduced-motion
- [ ] Project modals trap focus, close on Esc/backdrop
- [ ] No API key in client bundle

### Must Have
- All 9 sections rendering with DESIGN.md tokens
- Fraunces for display headlines (weight 400, tracking-tight/tighter)
- Inter for body text (weights 400, 500)
- JetBrains Mono for code/terminal elements
- Coral (#cc785c) reserved ONLY for: primary CTAs, user chat bubbles, open-to-work pill, callout-card-coral, "AI" in hero, card pulse on tool-fire
- Word-by-word hero animation (one-shot, ~900ms total)
- Chat-exchange layout for project cards
- CopilotKit with 8 tools, tool-call pills, coral border pulse
- Focus trap on modals, semantic HTML, aria labels
- prefers-reduced-motion support

### Must NOT Have (Guardrails)
- No light/dark theme toggle
- No scroll-jacking, parallax, particles, 3D, custom cursor, konami
- No fourth surface tone (no purple, no green beyond status dot)
- No bold Fraunces (weight 400 only)
- No Inter for headlines (display always Fraunces)
- No /projects/[slug] routes — modals only
- No contact form — cards + CTA button only
- No analytics, tracking, cookies
- No .env.local committed
- No more than 3 projects, 3 experience entries, 3 writing cards
- No CopilotKit default UI chrome — custom styled panel only
- No external animation libraries besides motion

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (fresh repo)
- **Automated tests**: Tests-after (Playwright checkpoints after implementation)
- **Framework**: Playwright for E2E verification
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright — navigate, interact, assert DOM, screenshot
- **Build/CLI**: Bash — run commands, validate output, check exit code
- **API**: Bash (curl) — send requests, assert status + response fields

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — scaffolding + tokens):
├── T1: Project scaffolding + dependencies [quick]
├── T2: Tailwind v4 @theme + fonts + globals.css [quick]
├── T3: DESIGN.md reference file + token documentation [quick]
└── T4: Data layer — all 5 lib/data/ files [quick]

Wave 2 (UI primitives — reusable components):
├── T5: SpikeMark + Badge + Button components [quick]
├── T6: Card + CodeWindow + ChatBubble components [quick]
└── T7: TopNav component [quick]

Wave 3 (Static sections — no interactivity):
├── T8: Hero section + word-by-word animation [visual-engineering]
├── T9: About section [quick]
├── T10: Skills section (dark terminal) [quick]
└── T11: Footer component [quick]

Wave 4 (Interactive sections — modals, expands):
├── T12: ProjectCard + ProjectModal with focus trap [visual-engineering]
├── T13: Projects section (3 cards, chat-exchange layout) [visual-engineering]
├── T14: Experience section (timeline + expandable details) [quick]
└── T15: Writing section (placeholder cards) [quick]

Wave 5 (Contact + page composition):
├── T16: Contact section + coral CTA card [quick]
└── T17: page.tsx composition + layout.tsx + metadata [quick]

Wave 6 (CopilotKit + chatbot):
├── T18: CopilotKit runtime route (/api/copilotkit) with Zen proxy [deep]
├── T19: CopilotChat wrapper + CopilotPopup styling [visual-engineering]
├── T20: 8 frontend tools (useCopilotAction) [deep]
├── T21: ToolCallPill component + coral border pulse [visual-engineering]
└── T22: Chat avatar button + pulse animation + "Ask Lochan" label [visual-engineering]

Wave 7 (Playwright checkpoints):
├── T23: CP1 — Foundation verification [quick]
├── T24: CP2 — Hero + About verification [quick]
├── T25: CP3 — Projects + modals verification [quick]
├── T26: CP4 — Experience + Skills + Writing + Contact verification [quick]
├── T27: CP5 — CopilotKit integration verification [deep]
└── T28: CP6 — Polish + responsive sweep [quick]
```

### Dependency Matrix
- **T1-4**: None (parallel foundation)
- **T5-7**: T1, T2 (need deps + tokens)
- **T8-11**: T2, T4, T5, T6, T7 (need tokens, data, UI primitives, nav)
- **T12-15**: T4, T5, T6, T8-T11 (need data, UI primitives, page structure)
- **T16-17**: T5-T16 (need all sections)
- **T18-22**: T1, T2, T17, T4 (need project, tokens, page, data)
- **T23-28**: T1-T22 (need everything built)

### Agent Dispatch Summary
- **Wave 1**: 4 tasks — T1-T4 → `quick`
- **Wave 2**: 3 tasks — T5-T7 → `quick`
- **Wave 3**: 4 tasks — T8 → `visual-engineering`, T9-T11 → `quick`
- **Wave 4**: 4 tasks — T12-T13 → `visual-engineering`, T14-T15 → `quick`
- **Wave 5**: 2 tasks — T16-T17 → `quick`
- **Wave 6**: 5 tasks — T18,T20 → `deep`, T19,T21,T22 → `visual-engineering`
- **Wave 7**: 6 tasks — T23-T26,T28 → `quick`, T27 → `deep`

---

## TODOs

- [x] 1. Project scaffolding + dependencies

  **What to do**:
  - Initialize Next.js 15 project: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
  - Install dependencies: `npm install @copilotkit/react-core@1.56.4 @copilotkit/react-ui@1.56.4 @copilotkit/runtime@1.56.4 motion@12.38.0 lucide-react zod openai @ai-sdk/openai-compatible @next/mdx`
  - Install dev dependencies: `npm install -D @tailwindcss/postcss playwright @playwright/test`
  - Initialize Playwright: `npx playwright install`
  - Create directory structure per spec: app/, components/{sections,ui,chat,nav}/, lib/{data,copilot}/, public/{projects}, tests/
  - Create `.env.local` with `OPENCODE_ZEN_API_KEY=sk-Se1DQ29a8di9TllY64efoiYjn9wXmDSNXUyVXhLFBbEHcAsbFmbFkBndLE9FH2Bo`
  - Add `.env.local` to `.gitignore`
  - Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin
  - Verify `npm run dev` starts without errors

  **Must NOT do**:
  - Do NOT commit .env.local
  - Do NOT use framer-motion package (use "motion")
  - Do NOT create tailwind.config.ts (Tailwind v4 uses @theme in CSS)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Skills Evaluated but Omitted**: None needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T2, T3, T4)
  - **Blocks**: T5-T22 (all subsequent tasks)
  - **Blocked By**: None

  **References**:
  - Next.js 15 docs: `https://nextjs.org/docs/app/getting-started/installation`
  - Tailwind v4 docs: `https://tailwindcss.com/docs/installation`
  - CopilotKit docs: `https://docs.copilotkit.ai/`

  **Acceptance Criteria**:
  - [ ] `npm run dev` starts on localhost:3000 with no errors
  - [ ] `node_modules/` contains all listed packages
  - [ ] `.env.local` exists with OPENCODE_ZEN_API_KEY
  - [ ] `.gitignore` includes `.env.local`
  - [ ] Directory structure matches spec

  **QA Scenarios**:
  ```
  Scenario: Dev server starts cleanly
    Tool: Bash
    Steps:
      1. Run `npm run dev &` in background
      2. Wait 5 seconds
      3. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
    Expected Result: HTTP 200
    Evidence: .sisyphus/evidence/task-1-dev-server.txt

  Scenario: All dependencies installed
    Tool: Bash
    Steps:
      1. Run `npm ls next @copilotkit/react-core motion lucide-react zod @ai-sdk/openai-compatible`
    Expected Result: All packages listed with versions, no "UNMET DEPENDENCY"
    Evidence: .sisyphus/evidence/task-1-deps.txt
  ```

  **Commit**: YES (groups with T2, T3, T4)
  - Message: `chore(portfolio): scaffold Next.js 15 project with dependencies`
  - Pre-commit: `npm run build`

- [x] 2. Tailwind v4 @theme + fonts + globals.css

  **What to do**:
  - Create `app/globals.css` with `@import "tailwindcss"` and `@theme` block
  - Encode all DESIGN.md tokens as CSS custom properties in @theme:
    - Colors: --color-canvas (#faf9f5), --color-surface-card (#efe9de), --color-surface-dark (#181715), --color-surface-dark-soft (#1f1e1b), --color-surface-dark-elevated (#252320), --color-ink (#141413), --color-body (#3d3d3a), --color-muted (#6c6a64), --color-primary (#cc785c), --color-primary-active (#a9583e), --color-hairline (#e6dfd8), --color-on-primary (white #ffffff), --color-on-dark (white), --color-on-dark-soft (rgba(255,255,255,0.6)), --color-accent-teal (pick a teal that works on dark navy, e.g. #5eead4)
    - Spacing: --spacing-section (96px), --spacing-xxl (48px), --spacing-xl (32px), --spacing-lg (24px), --spacing-md (16px), --spacing-sm (8px), --spacing-xs (4px)
    - Radii: --radius-md (8px), --radius-lg (12px), --radius-xl (16px), --radius-pill (9999px)
    - Fonts: --font-display (Fraunces), --font-sans (Inter), --font-mono (JetBrains Mono)
  - Create `app/layout.tsx` with next/font loading:
    - Fraunces: subsets=['latin'], variable='--font-fraunces', display='swap', weight='400'
    - Inter: subsets=['latin'], variable='--font-inter', display='swap', weight=['400','500']
    - JetBrains_Mono: subsets=['latin'], variable='--font-jetbrains-mono', display='swap'
  - Apply font variables to `<html className>` in layout
  - Set up base styles: body gets bg-canvas, text-ink, font-sans, antialiased
  - Add `@media (prefers-reduced-motion: reduce)` global rule disabling animations/transitions
  - Add `interpolate-size: allow-keywords` to :root for details animation support

  **Must NOT do**:
  - Do NOT create tailwind.config.ts
  - Do NOT use @tailwind base/components/utilities directives
  - Do NOT bold Fraunces (weight 400 only)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T3, T4)
  - **Blocks**: T5-T22
  - **Blocked By**: T1 (needs postcss config)

  **References**:
  - Tailwind v4 @theme: `https://tailwindcss.com/docs/theme`
  - next/font: `https://nextjs.org/docs/app/building-your-application/optimizing/fonts`
  - Fraunces Google Fonts: `https://fonts.google.com/specimen/Fraunces`

  **Acceptance Criteria**:
  - [ ] globals.css contains @import "tailwindcss" and @theme block with all tokens
  - [ ] layout.tsx loads Fraunces, Inter, JetBrains Mono via next/font
  - [ ] prefers-reduced-motion media query present
  - [ ] interpolate-size: allow-keywords on :root

  **QA Scenarios**:
  ```
  Scenario: Build succeeds with Tailwind v4
    Tool: Bash
    Steps:
      1. Run `npm run build`
    Expected Result: Exit code 0, no warnings about missing config
    Evidence: .sisyphus/evidence/task-2-build.txt

  Scenario: Fonts load correctly
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000
      2. Evaluate `document.fonts.check('400 16px var(--font-fraunces)')`
    Expected Result: true (font loaded)
    Evidence: .sisyphus/evidence/task-2-fonts.txt
  ```

  **Commit**: YES (groups with T1, T3, T4)
  - Message: `chore(portfolio): configure Tailwind v4 tokens and Google Fonts`

- [x] 3. DESIGN.md reference file + token documentation

  **What to do**:
  - Create `DESIGN.md` in project root documenting all design tokens
  - Include: color palette table with hex values, spacing scale, typography table (H1-H6 sizes, line heights, tracking values), component specs (button styles, card styles, badge styles), surface rhythm rules (cream→dark→cream pacing)
  - Document the ONE deviation: Fraunces replaces Copernicus/Tiempos
  - Document coral color usage rules (reserved for specific elements only)
  - This file serves as the canonical visual contract for the build

  **Must NOT do**:
  - Do NOT introduce additional deviations from the token spec
  - Do NOT add colors/tokens not in the original prompt

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T4)
  - **Blocks**: None (reference only)
  - **Blocked By**: None

  **References**:
  - Design tokens from prompt specification

  **Acceptance Criteria**:
  - [ ] DESIGN.md exists in project root
  - [ ] Contains all color tokens with hex values
  - [ ] Contains spacing scale
  - [ ] Contains typography table
  - [ ] Documents Fraunces deviation
  - [ ] Documents coral usage rules

  **QA Scenarios**:
  ```
  Scenario: DESIGN.md file exists and is readable
    Tool: Bash
    Steps:
      1. Run `test -f DESIGN.md && echo "EXISTS" || echo "MISSING"`
    Expected Result: "EXISTS"
    Evidence: .sisyphus/evidence/task-3-file.txt
  ```

  **Commit**: YES (groups with T1, T2, T4)
  - Message: `docs(portfolio): add DESIGN.md token reference`

- [x] 4. Data layer — all 5 lib/data/ files

  **What to do**:
  - Create `lib/data/profile.ts` with exact profile data from spec
  - Create `lib/data/projects.ts` with exact 3 projects from spec
  - Create `lib/data/experience.ts` with exact 2 experience entries from spec
  - Create `lib/data/skills.ts` with grouped skills (frontend, ai, backend, devops_testing)
  - Create `lib/data/writing.ts` with exact 2 writing entries from spec
  - Export TypeScript interfaces for each data type
  - Use `[handle]` as GitHub placeholder throughout

  **Must NOT do**:
  - Do NOT invent additional projects, experience entries, or writing posts
  - Do NOT use real GitHub handle (keep [handle])
  - Do NOT add fields not in the spec

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T3)
  - **Blocks**: T8, T12-T15, T18, T20
  - **Blocked By**: None

  **References**:
  - Data structures from prompt specification (exact copy)

  **Acceptance Criteria**:
  - [ ] All 5 files exist in lib/data/
  - [ ] profile.ts exports `profile` object with all fields
  - [ ] projects.ts exports `projects` array with 3 entries
  - [ ] experience.ts exports `experience` array with 2 entries
  - [ ] skills.ts exports grouped skills
  - [ ] writing.ts exports `writing` array with 2 entries
  - [ ] All files have TypeScript interfaces

  **QA Scenarios**:
  ```
  Scenario: Data files compile without TypeScript errors
    Tool: Bash
    Steps:
      1. Run `npx tsc --noEmit lib/data/*.ts`
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-4-tsc.txt

  Scenario: Projects data has correct structure
    Tool: Bash
    Steps:
      1. Run `node -e "const p = require('./lib/data/projects.ts'); console.log(p.projects.length)"`
    Expected Result: "3"
    Evidence: .sisyphus/evidence/task-4-projects.txt
  ```

  **Commit**: YES (groups with T1, T2, T3)
  - Message: `feat(data): add profile, projects, experience, skills, writing data`

- [x] 5. SpikeMark + Badge + Button components

  **What to do**:
  - Create `components/ui/SpikeMark.tsx`: 4-spoke radial asterisk inline SVG, 16px, fill-ink. SVG with 4 lines crossing at center (like a compass rose / asterisk).
  - Create `components/ui/Badge.tsx`: Pill-shaped badge component. Props: variant ('default' | 'coral' | 'cream'), children. Uses border-hairline, rounded-pill, px-sm py-xs, font-mono 12px. Coral variant: bg-primary text-on-primary.
  - Create `components/ui/Button.tsx`: Two variants — primary (bg-primary text-on-primary hover:bg-primary-active) and secondary (border border-hairline bg-canvas text-ink hover:bg-surface-card). Props: variant, href (for link), onClick, children, className. Uses rounded-pill, px-lg py-md, font-sans 14px/500. Include focus-visible:ring-2 ring-primary.

  **Must NOT do**:
  - Do NOT add more than 2 button variants
  - Do NOT add icon support to buttons (keep simple)
  - Do NOT use coral for secondary button hover state

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7)
  - **Blocks**: T8-T17, T21
  - **Blocked By**: T1, T2

  **References**:
  - DESIGN.md component specs
  - Tailwind v4 focus-visible patterns

  **Acceptance Criteria**:
  - [ ] SpikeMark renders as 16px 4-spoke SVG
  - [ ] Badge renders with pill shape, correct colors per variant
  - [ ] Button renders primary and secondary variants
  - [ ] Button has focus-visible ring
  - [ ] All components are TypeScript with proper prop types

  **QA Scenarios**:
  ```
  Scenario: Button variants render correctly
    Tool: Playwright
    Steps:
      1. Create temp test page rendering both button variants
      2. Navigate to test page
      3. Screenshot at 1440px
      4. Assert primary button has bg-color #cc785c
      5. Assert secondary button has border and transparent bg
    Expected Result: Both buttons visible with correct colors
    Evidence: .sisyphus/evidence/task-5-buttons.png

  Scenario: SpikeMark SVG renders
    Tool: Playwright
    Steps:
      1. Render SpikeMark component
      2. Assert SVG element exists with 4 line/path children
    Expected Result: SVG with 4 spokes present
    Evidence: .sisyphus/evidence/task-5-spikemark.txt
  ```

  **Commit**: YES (groups with T6, T7)
  - Message: `feat(ui): add SpikeMark, Badge, Button components`

- [x] 6. Card + CodeWindow + ChatBubble components

  **What to do**:
  - Create `components/ui/Card.tsx`: Cream surface card per DESIGN.md. bg-surface-card, border border-hairline, rounded-xl, p-lg. Optional variants: feature-card (same base), callout-card-coral (bg-primary text-on-primary).
  - Create `components/ui/CodeWindow.tsx`: Dark navy code window shell. bg-surface-dark, rounded-xl, overflow-hidden. Top bar with 3 dots (traffic lights) in muted colors. Content area with bg-surface-dark-soft, p-lg, font-mono text-on-dark.
  - Create `components/ui/ChatBubble.tsx`: Two variants — user (right-aligned, bg-primary text-on-primary, rounded-lg with bottom-right rounded-sm for tail effect, px-lg py-md, max-w-[60%]) and assistant (left-aligned, bg-surface-card text-ink, rounded-lg with bottom-left rounded-sm, px-xl py-xl, max-w-[85%]).

  **Must NOT do**:
  - Do NOT add avatar to chat bubbles (spike-mark glyph used in CopilotChat)
  - Do NOT add message timestamps
  - Do NOT make CodeWindow interactive

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T5, T7)
  - **Blocks**: T8, T12-T13, T19
  - **Blocked By**: T1, T2

  **References**:
  - DESIGN.md chat conventions (cream canvas, coral user bubbles, cream assistant bubbles)
  - ChatBubble spec from prompt

  **Acceptance Criteria**:
  - [ ] Card renders with cream surface and hairline border
  - [ ] Card coral variant renders with coral bg and white text
  - [ ] CodeWindow renders with dark navy bg, traffic light dots, monospace content
  - [ ] ChatBubble user variant renders right-aligned, coral, tail effect
  - [ ] ChatBubble assistant variant renders left-aligned, cream surface

  **QA Scenarios**:
  ```
  Scenario: Chat exchange layout renders
    Tool: Playwright
    Steps:
      1. Render a user bubble + assistant bubble in a container
      2. Screenshot at 1440px
      3. Assert user bubble is right-aligned with coral bg
      4. Assert assistant bubble is left-aligned with cream bg
    Expected Result: Chat exchange pattern visible, colors correct
    Evidence: .sisyphus/evidence/task-6-chat.png

  Scenario: CodeWindow syntax coloring
    Tool: Playwright
    Steps:
      1. Render CodeWindow with sample terminal text
      2. Assert $ prompts and commands in text-on-dark
      3. Assert → arrows and output in text-accent-teal
    Expected Result: Syntax coloring visible
    Evidence: .sisyphus/evidence/task-6-codewindow.txt
  ```

  **Commit**: YES (groups with T5, T7)
  - Message: `feat(ui): add Card, CodeWindow, ChatBubble components`

- [x] 7. TopNav component

  **What to do**:
  - Create `components/nav/TopNav.tsx`: 64px tall, bg-canvas, sticky top-0 z-50.
  - Left: SpikeMark glyph (16px) + "Lochan" wordmark in font-display weight 400, 18px.
  - Center-right: anchor links (About · Projects · Experience · Writing · Contact) in font-sans 14px/500 text-muted, hover:text-ink. Smooth scroll to section IDs.
  - Right: small green dot (#22c55e) + "Available" pill in text-muted 13px.
  - Mobile: hamburger menu that expands to show nav links vertically.
  - Use semantic `<nav>` element with aria-label="Main navigation".

  **Must NOT do**:
  - Do NOT add logo image (SpikeMark SVG only)
  - Do NOT add dark mode toggle
  - Do NOT add social links in nav

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T5, T6)
  - **Blocks**: T8-T17
  - **Blocked By**: T1, T2, T5

  **References**:
  - TopNav spec from prompt
  - SpikeMark component from T5

  **Acceptance Criteria**:
  - [ ] TopNav is 64px tall, sticky, bg-canvas
  - [ ] SpikeMark + "Lochan" wordmark visible on left
  - [ ] 5 anchor links visible, hover changes to text-ink
  - [ ] Green dot + "Available" pill on right
  - [ ] Mobile hamburger menu works
  - [ ] Anchor links smooth-scroll to sections

  **QA Scenarios**:
  ```
  Scenario: TopNav renders at desktop
    Tool: Playwright
    Steps:
      1. Render page with TopNav
      2. Resize to 1440px
      3. Assert nav height is 64px
      4. Assert "Lochan" text visible with Fraunces font
      5. Assert all 5 nav links visible
      6. Assert green dot + "Available" visible
    Expected Result: All elements present, correct layout
    Evidence: .sisyphus/evidence/task-7-nav-desktop.png

  Scenario: TopNav renders at mobile
    Tool: Playwright
    Steps:
      1. Resize to 375px
      2. Assert hamburger icon visible
      3. Click hamburger
      4. Assert nav links expand vertically
    Expected Result: Mobile menu works
    Evidence: .sisyphus/evidence/task-7-nav-mobile.png
  ```

  **Commit**: YES (groups with T5, T6)
  - Message: `feat(nav): add TopNav with sticky header and mobile menu`

- [ ] 8. Hero section + word-by-word animation

  **What to do**:
  - Create `components/sections/Hero.tsx`: Full-bleed cream band, py-section.
  - Desktop: 2-column grid (6/6). Mobile: single column.
  - Left column:
    - Coral availability pill: green dot + profile.availability.label + " · " + profile.availability.locations
    - H1: "Frontend engineer who ships AI." — font-display, text-display-xl (64px desktop, 40px mobile), tracking-tighter, weight 400. "AI" in text-primary coral.
    - Sub-paragraph: profile.tagline, font-sans 18px, text-body, leading-relaxed (1.55)
    - Button row: "View projects" (primary, smooth-scrolls to #projects) + "Download resume" (secondary, downloads /resume.pdf with download attribute)
  - Right column: CodeWindow with faux-terminal session (static, no typewriter). Syntax coloring: $ and commands in text-on-dark, → and output in text-accent-teal, "AI"/"ai" in coral.
  - Hero animation: Word-by-word fade-in using motion variants + staggerChildren 0.06. Final word "AI" gets 150ms extra delay, then color transition from text-ink to text-primary over 300ms. Total ~900ms. Plays once on mount. Wrap in MotionConfig reducedMotion="user" or use useReducedMotion hook to skip animation when prefers-reduced-motion is set.

  **Must NOT do**:
  - Do NOT add typewriter effect
  - Do NOT add scroll-triggered animation (mount only)
  - Do NOT repeat animation on re-render
  - Do NOT add any other animations to the hero

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T9, T10, T11)
  - **Blocks**: T17
  - **Blocked By**: T2, T4, T5, T6, T7

  **References**:
  - Hero spec from prompt
  - motion/react variants + staggerChildren pattern from research
  - useReducedMotion hook from motion/react

  **Acceptance Criteria**:
  - [ ] Hero renders with 2-column layout at desktop, 1-column at mobile
  - [ ] H1 uses Fraunces font, tracking-tighter, 64px desktop / 40px mobile
  - [ ] "AI" word is coral color
  - [ ] Word-by-word animation plays on mount (~900ms total)
  - [ ] Animation skips when prefers-reduced-motion is set
  - [ ] CodeWindow renders with correct syntax coloring
  - [ ] Availability pill renders with green dot
  - [ ] "View projects" button smooth-scrolls to #projects
  - [ ] "Download resume" has download attribute

  **QA Scenarios**:
  ```
  Scenario: Hero renders correctly at desktop
    Tool: Playwright
    Steps:
      1. Navigate to page with Hero
      2. Resize to 1440px
      3. Wait 2 seconds for animation to complete
      4. Screenshot full hero section
      5. Assert H1 text contains "Frontend engineer who ships AI"
      6. Assert "AI" element has coral color (#cc785c)
      7. Assert availability pill visible with green dot
    Expected Result: Hero renders with all elements, "AI" in coral
    Evidence: .sisyphus/evidence/task-8-hero-desktop.png

  Scenario: Hero animation respects reduced motion
    Tool: Playwright
    Steps:
      1. Emulate prefers-reduced-motion: reduce via CDP
      2. Navigate to page
      3. Assert H1 is immediately visible (no animation delay)
    Expected Result: H1 renders instantly, no animation
    Evidence: .sisyphus/evidence/task-8-reduced-motion.txt

  Scenario: Hero at mobile
    Tool: Playwright
    Steps:
      1. Resize to 375px
      2. Assert single column layout (CodeWindow below text)
      3. Assert H1 is 40px
    Expected Result: Mobile layout correct
    Evidence: .sisyphus/evidence/task-8-hero-mobile.png
  ```

  **Commit**: YES (groups with T9, T10, T11)
  - Message: `feat(sections): add Hero with word-by-word animation and terminal card`

- [ ] 9. About section

  **What to do**:
  - Create `components/sections/About.tsx`: Cream-canvas band, py-section.
  - Single column, max-width 720px, centered.
  - Two paragraphs in font-sans 18px, text-body-strong, leading-relaxed (1.6).
  - Paragraph 1: 3-4 sentences on who Lochan is — 6 YoE, frontend-heavy with full-stack and AI, current focus on production AI features (CopilotKit/RAG/agents), drawn to complex frontend problems.
  - Paragraph 2: 2-3 sentences on what he's looking for — senior FE-AI roles, Bengaluru or remote, seeking meaningful problems.
  - Tone: editorial, considered, not breathy SaaS copy.
  - Use `<section>` with aria-labelledby pointing to hidden heading.

  **Must NOT do**:
  - Do NOT add images or illustrations
  - Do NOT add skill tags or badges
  - Do NOT use hype language ("passionate", "rockstar", "ninja")

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T8, T10, T11)
  - **Blocks**: T17
  - **Blocked By**: T2, T4

  **References**:
  - About spec from prompt
  - Profile data from lib/data/profile.ts

  **Acceptance Criteria**:
  - [ ] About section renders with py-section spacing
  - [ ] Max-width 720px, centered
  - [ ] Two paragraphs with correct typography
  - [ ] Content matches editorial tone
  - [ ] Semantic section with aria-labelledby

  **QA Scenarios**:
  ```
  Scenario: About section renders
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #about section
      3. Assert two paragraphs visible
      4. Assert max-width is 720px
      5. Screenshot
    Expected Result: About section renders correctly
    Evidence: .sisyphus/evidence/task-9-about.png
  ```

  **Commit**: YES (groups with T8, T10, T11)
  - Message: `feat(sections): add About section with editorial copy`

- [ ] 10. Skills section (dark terminal)

  **What to do**:
  - Create `components/sections/Skills.tsx`: Dark-navy band (bg-surface-dark), py-section.
  - Single CodeWindow-style block, full-width (max 1200px), centered.
  - Render skills as faux-terminal output with 5 commands:
    - `$ lochan --stack frontend` → react, next.js, typescript, tailwind, zustand, react-query, d3, storybook
    - `$ lochan --stack ai` → copilotkit, langchain (familiar), rag, vector-search, pgvector, openai-sdk, anthropic-sdk, gemini, prompt-engineering, evaluations
    - `$ lochan --stack backend` → node, express, postgres, mongodb, go (light), grpc, rest
    - `$ lochan --stack devops` → azure, aws (basics), github-actions, ci-cd, playwright, jest, vitest
    - `$ lochan --strengths` → shipping production AI features, frontend system design, test infrastructure, cross-functional collaboration
  - Syntax coloring: $ and commands in text-on-dark, → arrows and skills in text-accent-teal, parenthetical qualifiers in text-on-dark-soft 13px italic, literal "AI" in coral.
  - Caption below card: "Honest about levels — fluent, comfortable, and learning are clearly marked." in caption-uppercase text-on-dark-soft.
  - This is the deliberate dark-section break in the page rhythm (cream→dark→cream pacing).

  **Must NOT do**:
  - Do NOT make terminal interactive (no input)
  - Do NOT add more than 5 command groups
  - Do NOT use green-on-black (use the specified color scheme)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T8, T9, T11)
  - **Blocks**: T17
  - **Blocked By**: T2, T4, T6

  **References**:
  - Skills spec from prompt
  - Skills data from lib/data/skills.ts
  - CodeWindow component from T6

  **Acceptance Criteria**:
  - [ ] Skills section has bg-surface-dark background
  - [ ] CodeWindow renders with 5 command groups
  - [ ] Syntax coloring correct ($ in text-on-dark, → in teal, AI in coral)
  - [ ] Caption below card renders
  - [ ] Max-width 1200px, centered

  **QA Scenarios**:
  ```
  Scenario: Skills section renders dark band
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #skills section
      3. Assert background color is #181715
      4. Assert 5 command groups visible
      5. Assert "AI" text is coral
      6. Screenshot
    Expected Result: Dark skills terminal renders correctly
    Evidence: .sisyphus/evidence/task-10-skills.png
  ```

  **Commit**: YES (groups with T8, T9, T11)
  - Message: `feat(sections): add Skills dark terminal section`

- [ ] 11. Footer component

  **What to do**:
  - Create `components/sections/Footer.tsx`: Dark-navy footer (bg-surface-dark), py-section.
  - Four small columns:
    1. "Portfolio" — links to anchors (About, Projects, Experience, Writing, Contact)
    2. "Connect" — email, LinkedIn, GitHub
    3. "Built with" — Next.js, CopilotKit, Vercel (small text)
    4. "Last updated April 2026"
  - `now` line from profile data renders above copyright row in text-on-dark-soft 13px italic.
  - Bottom copyright row: "© 2026 Lochan Vishwanath" in text-on-dark-soft.
  - Use semantic `<footer>` element.
  - Mobile: columns stack vertically.

  **Must NOT do**:
  - Do NOT add newsletter signup
  - Do NOT add social icons beyond text links
  - Do NOT add sitemap

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T8, T9, T10)
  - **Blocks**: T17
  - **Blocked By**: T2, T4

  **References**:
  - Footer spec from prompt
  - Profile data (now line)

  **Acceptance Criteria**:
  - [ ] Footer has bg-surface-dark background
  - [ ] 4 columns render at desktop
  - [ ] Columns stack at mobile
  - [ ] now line renders in italic
  - [ ] Copyright row at bottom
  - [ ] All links work (anchor links, external links)

  **QA Scenarios**:
  ```
  Scenario: Footer renders at desktop and mobile
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to footer
      3. Assert 4 columns at 1440px
      4. Resize to 375px
      5. Assert columns stack vertically
      6. Assert copyright text visible
    Expected Result: Footer renders correctly at both sizes
    Evidence: .sisyphus/evidence/task-11-footer.png
  ```

  **Commit**: YES (groups with T8, T9, T10)
  - Message: `feat(sections): add Footer with 4-column layout`

- [ ] 12. ProjectCard + ProjectModal with focus trap

  **What to do**:
  - Create `components/sections/ProjectCard.tsx`: Renders a single project using chat-exchange layout.
    - User bubble (right): "Tell me about {project.name}."
    - Assistant bubble (left): H3 (font-display, 28px) with project name, tagline, tech stack pills (max 6 visible, "+N more" if longer), metrics row (3 stat tiles with caption-uppercase labels, font-display 22px values, thin top border), preview (conditional: iframe/mockup/gif), CTA row (Live →, GitHub →, Read more →).
    - Preview rendering:
      - iframe: sandboxed, 16:9 aspect ratio, dark frame, "Live" pill top-right, transparent click-overlay opening live URL
      - mockup: static image in CodeWindow shell with "Public demo coming soon" pill
      - gif: img with loading="lazy", prefers-reduced-motion fallback to first-frame PNG
  - Create `components/sections/ProjectModal.tsx`: Centered modal, max-width 880px, max-height 90vh, scrollable.
    - Backdrop: bg-ink at 40% opacity, closes on click
    - Close on Esc, backdrop click, close button
    - Focus trap inside modal (use custom useFocusTrap hook)
    - Restore focus to trigger button on close
    - Contents: project name (font-display 36px), tagline, full preview, "What's interesting about this" section with interestingDecisions as feature-cards, full tech stack, full metrics, CTAs, optional Architecture expandable section.
  - Create `hooks/useFocusTrap.ts`: Custom hook capturing trigger element, focusing first focusable on open, trapping Tab/Shift+Tab, restoring focus on close.

  **Must NOT do**:
  - Do NOT use /projects/[slug] routes
  - Do NOT add Mermaid diagrams in Architecture section
  - Do NOT use focus-trap-react library (custom hook only)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T13, T14, T15)
  - **Blocks**: T13, T17
  - **Blocked By**: T4, T5, T6

  **References**:
  - ProjectCard/Modal spec from prompt
  - Project data from lib/data/projects.ts
  - Focus trap pattern from research (custom hook)
  - ChatBubble component from T6
  - CodeWindow component from T6

  **Acceptance Criteria**:
  - [ ] ProjectCard renders chat-exchange layout
  - [ ] Tech stack pills render with max 6 + "+N more"
  - [ ] Metrics row renders with 3 stat tiles
  - [ ] Preview renders conditionally based on previewType
  - [ ] ProjectModal opens on "Read more →" click
  - [ ] Modal traps focus (Tab cycles within modal)
  - [ ] Modal closes on Esc
  - [ ] Modal closes on backdrop click
  - [ ] Focus returns to trigger button on close
  - [ ] Modal is scrollable when content exceeds 90vh

  **QA Scenarios**:
  ```
  Scenario: ProjectCard renders with chat layout
    Tool: Playwright
    Steps:
      1. Render ProjectCard with ClipGuessr data
      2. Assert user bubble right-aligned with coral bg
      3. Assert assistant bubble left-aligned with cream bg
      4. Assert H3 contains "ClipGuessr"
      5. Assert tech pills visible
      6. Assert metrics row visible
      7. Screenshot
    Expected Result: Chat-exchange layout renders correctly
    Evidence: .sisyphus/evidence/task-12-card.png

  Scenario: Modal opens, traps focus, closes on Esc
    Tool: Playwright
    Steps:
      1. Render page with ProjectCard
      2. Click "Read more →"
      3. Assert modal visible with backdrop
      4. Press Tab 10 times, assert focus stays within modal
      5. Press Escape
      6. Assert modal closed
      7. Assert focus returned to "Read more →" button
    Expected Result: Modal behavior correct
    Evidence: .sisyphus/evidence/task-12-modal.txt
  ```

  **Commit**: YES (groups with T13, T14, T15)
  - Message: `feat(sections): add ProjectCard with chat layout and ProjectModal with focus trap`

- [ ] 13. Projects section (3 cards, chat-exchange layout)

  **What to do**:
  - Create `components/sections/Projects.tsx`: Cream-canvas band, py-section.
  - Section header H2 in font-display 36px: "Projects".
  - Three ProjectCards stacked vertically with gap-xxl (48px) between them.
  - Each card uses the chat-exchange layout from T12.
  - Each card has unique user bubble text: "Tell me about ClipGuessr.", "Show me RAG-Raju.", "What's QA Playwright Plugin?"
  - State management: track which modal is open (React state with project slug).
  - Pass project data from lib/data/projects.ts to each card.

  **Must NOT do**:
  - Do NOT add more than 3 project cards
  - Do NOT add filtering or sorting
  - Do NOT add pagination

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T12, T14, T15)
  - **Blocks**: T17
  - **Blocked By**: T4, T12

  **References**:
  - Projects spec from prompt
  - ProjectCard from T12
  - Project data from lib/data/projects.ts

  **Acceptance Criteria**:
  - [ ] Section renders with H2 "Projects"
  - [ ] 3 cards stacked with 48px gap
  - [ ] Each card has unique user bubble text
  - [ ] Each card's "Read more →" opens correct modal
  - [ ] ClipGuessr iframe loads or shows screenshot fallback
  - [ ] RAG-Raju shows mockup in CodeWindow
  - [ ] QA Playwright shows GIF in CodeWindow

  **QA Scenarios**:
  ```
  Scenario: All 3 project cards render
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #projects
      3. Assert 3 project cards visible
      4. Assert each has unique user bubble text
      5. Screenshot at 1440px
    Expected Result: All 3 cards render with chat layout
    Evidence: .sisyphus/evidence/task-13-projects.png

  Scenario: Each modal opens with correct content
    Tool: Playwright
    Steps:
      1. Click "Read more →" on first card
      2. Assert modal title is "ClipGuessr"
      3. Close modal
      4. Click "Read more →" on second card
      5. Assert modal title is "RAG-Raju"
      6. Close modal
      7. Click "Read more →" on third card
      8. Assert modal title is "QA Playwright Plugin"
    Expected Result: Each modal shows correct project
    Evidence: .sisyphus/evidence/task-13-modals.txt
  ```

  **Commit**: YES (groups with T12, T14, T15)
  - Message: `feat(sections): add Projects section with 3 chat-exchange cards`

- [ ] 14. Experience section (timeline + expandable details)

  **What to do**:
  - Create `components/sections/Experience.tsx`: Cream-canvas band, py-section.
  - Vertical timeline on left: thin bg-hairline line with coral dots at role markers.
  - Right of each dot: card showing role + company (font-display 24px), period + location (caption-uppercase text-muted), one-line summary (font-sans 16px text-body-strong).
  - `<details>` element labeled "Show details" that expands to reveal bullet list. Closed by default.
  - Bullets use font-sans 15px text-body with "· " markers (interpunct) in text-primary coral.
  - Smooth height transition using grid-template-rows: 0fr → 1fr trick (cross-browser compatible).
  - Pull data from lib/data/experience.ts.

  **Must NOT do**:
  - Do NOT use interpolate-size: allow-keywords as primary (Firefox/Safari unsupported)
  - Do NOT use JS measurement for height animation
  - Do NOT expand details by default

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T12, T13, T15)
  - **Blocks**: T17
  - **Blocked By**: T2, T4

  **References**:
  - Experience spec from prompt
  - Experience data from lib/data/experience.ts
  - grid-template-rows animation pattern from research

  **Acceptance Criteria**:
  - [ ] Timeline renders with vertical line and coral dots
  - [ ] 2 experience cards render
  - [ ] Details closed by default
  - [ ] Clicking "Show details" expands smoothly
  - [ ] Bullets use coral interpunct markers
  - [ ] Works in Firefox (grid-template-rows trick)

  **QA Scenarios**:
  ```
  Scenario: Experience timeline renders
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #experience
      3. Assert vertical timeline visible
      4. Assert 2 experience cards
      5. Assert details are collapsed
      6. Screenshot
    Expected Result: Timeline renders correctly
    Evidence: .sisyphus/evidence/task-14-timeline.png

  Scenario: Details expand smoothly
    Tool: Playwright
    Steps:
      1. Click "Show details" on first experience
      2. Assert bullet list becomes visible
      3. Assert bullets have coral interpunct markers
      4. Click again to collapse
      5. Assert bullets hidden
    Expected Result: Expand/collapse works
    Evidence: .sisyphus/evidence/task-14-expand.txt
  ```

  **Commit**: YES (groups with T12, T13, T15)
  - Message: `feat(sections): add Experience timeline with expandable details`

- [ ] 15. Writing section (placeholder cards)

  **What to do**:
  - Create `components/sections/Writing.tsx`: Cream-canvas band, py-section.
  - Section header H2 in font-display 36px: "Writing".
  - Sub-paragraph in text-muted: "Notes on building production AI features. Coming soon."
  - Two feature-cards side-by-side (1-up on mobile).
  - Each card: caption-uppercase text-muted label "DRAFT · MAY 2026", title in font-display 22px text-ink, teaser in font-sans 15px text-body, "Coming soon" caption at bottom.
  - Cards visually muted: opacity-85, cursor-default.
  - Pull data from lib/data/writing.ts.

  **Must NOT do**:
  - Do NOT make cards clickable (they're placeholders)
  - Do NOT add more than 2 writing cards
  - Do NOT add actual blog content

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T12, T13, T14)
  - **Blocks**: T17
  - **Blocked By**: T2, T4

  **References**:
  - Writing spec from prompt
  - Writing data from lib/data/writing.ts

  **Acceptance Criteria**:
  - [ ] Section renders with H2 "Writing"
  - [ ] 2 placeholder cards side-by-side at desktop
  - [ ] Cards stack 1-up at mobile
  - [ ] Cards have opacity-85 and cursor-default
  - [ ] "DRAFT · MAY 2026" labels visible
  - [ ] "Coming soon" captions visible

  **QA Scenarios**:
  ```
  Scenario: Writing section renders
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #writing
      3. Assert 2 cards side-by-side at 1440px
      4. Resize to 375px
      5. Assert cards stack vertically
      6. Assert opacity is 0.85
    Expected Result: Writing section renders correctly
    Evidence: .sisyphus/evidence/task-15-writing.png
  ```

  **Commit**: YES (groups with T12, T13, T14)
  - Message: `feat(sections): add Writing placeholder cards`

- [ ] 16. Contact section + coral CTA card

  **What to do**:
  - Create `components/sections/Contact.tsx`: Cream-canvas band, py-section, max-width 720px centered.
  - Section header H2 in font-display 36px: "Get in touch".
  - Sub-paragraph in text-body-strong: "Senior FE-AI roles, contract engagements, or just a chat about LLM systems — happy to hear from you."
  - Three contact method cards (cream surface, hairline border, p-lg):
    - Email: Mail icon + "Email" label + lochan.vish@hotmail.com (clickable mailto)
    - LinkedIn: LinkedIn icon + "LinkedIn" + linkedin.com/in/lochanv (opens in new tab)
    - GitHub: GitHub icon + "GitHub" + [handle] (opens in new tab)
  - Below cards: coral callout-card-coral (bg-primary text-on-primary):
    - H3 in font-display 28px: "Or just ask the bot."
    - Sub-line: "It can hand you my resume, walk you through any project, or tell you why CloudBees was a great place to be."
    - Button-secondary (cream button on coral surface): "Open chat ↘" — programmatically opens CopilotKit chat panel.
  - Use Lucide React icons: Mail, Linkedin, Github.

  **Must NOT do**:
  - Do NOT add a contact form
  - Do NOT add phone number to page (only exposed via chatbot tool)
  - Do NOT add social media beyond email, LinkedIn, GitHub

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with T17)
  - **Blocks**: T17 (page composition needs this)
  - **Blocked By**: T2, T5

  **References**:
  - Contact spec from prompt
  - Profile data from lib/data/profile.ts
  - Lucide React icons: Mail, Linkedin, Github

  **Acceptance Criteria**:
  - [ ] Section renders with H2 "Get in touch"
  - [ ] 3 contact cards render with icons
  - [ ] Email card is clickable mailto link
  - [ ] LinkedIn and GitHub open in new tabs
  - [ ] Coral callout card renders with H3
  - [ ] "Open chat ↘" button present

  **QA Scenarios**:
  ```
  Scenario: Contact section renders
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Scroll to #contact
      3. Assert 3 contact cards visible
      4. Assert coral callout card visible
      5. Assert "Open chat ↘" button present
      6. Screenshot
    Expected Result: Contact section renders correctly
    Evidence: .sisyphus/evidence/task-16-contact.png

  Scenario: Email link is mailto
    Tool: Playwright
    Steps:
      1. Assert email link href starts with "mailto:"
    Expected Result: mailto link correct
    Evidence: .sisyphus/evidence/task-16-email.txt
  ```

  **Commit**: YES (groups with T17)
  - Message: `feat(sections): add Contact section with coral CTA`

- [ ] 17. page.tsx composition + layout.tsx + metadata

  **What to do**:
  - Update `app/layout.tsx`:
    - Import and apply fonts (already done in T2)
    - Add metadata: title "Lochan Vishwanath — Frontend Engineer who ships AI", description from profile.tagline, OG tags, viewport, charset
    - Wrap children in CopilotKit provider (runtimeUrl="/api/copilotkit") — BUT only wrap, don't render popup yet (that's T19)
    - Add MotionConfig reducedMotion="user" for global reduced-motion support
  - Create `app/page.tsx`:
    - Compose all sections in order: TopNav, Hero, About, Projects, Experience, Skills, Writing, Contact, Footer
    - Each section wrapped in `<section>` with id and aria-labelledby
    - Ensure smooth scroll behavior: `html { scroll-behavior: smooth }` in globals.css
    - One H1 only (in Hero), all other headings are H2/H3

  **Must NOT do**:
  - Do NOT add additional pages or routes
  - Do NOT add loading.tsx or error.tsx (out of scope)
  - Do NOT add not-found.tsx

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with T16)
  - **Blocks**: T18-T22
  - **Blocked By**: T7-T16 (all sections)

  **References**:
  - Next.js 15 metadata API: `https://nextjs.org/docs/app/building-your-application/optimizing/metadata`
  - CopilotKit provider setup from research

  **Acceptance Criteria**:
  - [ ] page.tsx composes all 9 sections in correct order
  - [ ] layout.tsx has metadata with title, description, OG tags
  - [ ] CopilotKit provider wraps children
  - [ ] MotionConfig reducedMotion="user" applied
  - [ ] Only one H1 on page (in Hero)
  - [ ] All sections have id and aria-labelledby
  - [ ] Smooth scroll behavior enabled

  **QA Scenarios**:
  ```
  Scenario: Full page renders
    Tool: Playwright
    Steps:
      1. Navigate to localhost:3000
      2. Assert TopNav visible
      3. Assert Hero visible
      4. Scroll down, assert all sections present
      5. Assert only one H1 element
      6. Full-page screenshot at 1440px
    Expected Result: Complete page renders
    Evidence: .sisyphus/evidence/task-17-fullpage.png

  Scenario: Metadata is correct
    Tool: Playwright
    Steps:
      1. Assert page title contains "Lochan Vishwanath"
      2. Assert meta description matches profile.tagline
    Expected Result: Metadata correct
    Evidence: .sisyphus/evidence/task-17-metadata.txt
  ```

  **Commit**: YES (groups with T16)
  - Message: `feat(app): compose all sections in page.tsx with metadata`

- [ ] 18. CopilotKit runtime route with Zen proxy

  **What to do**:
  - Create `app/api/copilotkit/route.ts`:
    - Use CopilotKit runtime with handleCopilotKitApi
    - Configure BuiltInAgent with @ai-sdk/openai-compatible pointing to https://opencode.ai/zen/v1
    - Use model: qwen3.6-plus (OpenAI-compatible endpoint)
    - Set maxSteps: 10 to enable tool calling
    - System prompt loaded from lib/copilot/system-prompt.ts
    - API key from process.env.OPENCODE_ZEN_API_KEY (server-side only)
    - Add SSE middleware to filter out Zen's custom ping events before forwarding to CopilotKit
    - Error handling: if API key missing, return 500 with helpful message
  - Create `lib/copilot/system-prompt.ts`:
    - Export SYSTEM_PROMPT string from spec
    - Include all 8 tool descriptions
    - Include tone guidelines and deflection rules
  - Create `.env.example` with OPENCODE_ZEN_API_KEY placeholder

  **Must NOT do**:
  - Do NOT expose API key in client bundle (no NEXT_PUBLIC_ prefix)
  - Do NOT use GPT or Claude models (they use different protocols)
  - Do NOT skip SSE ping filtering

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with T19, T20, T21, T22)
  - **Blocks**: T19-T22
  - **Blocked By**: T1, T17

  **References**:
  - CopilotKit runtime docs: `https://docs.copilotkit.ai/`
  - @ai-sdk/openai-compatible: `https://sdk.vercel.ai/providers/community-providers/openai-compatible`
  - OpenCode Zen API: `https://opencode.ai/docs/zen`
  - Research findings on Zen multi-protocol gateway

  **Acceptance Criteria**:
  - [ ] /api/copilotkit route exists and handles POST requests
  - [ ] BuiltInAgent configured with @ai-sdk/openai-compatible
  - [ ] maxSteps set to 10
  - [ ] System prompt loaded from lib/copilot/system-prompt.ts
  - [ ] API key read from process.env (server-side only)
  - [ ] SSE ping events filtered
  - [ .env.example created with placeholder

  **QA Scenarios**:
  ```
  Scenario: Runtime route responds
    Tool: Bash (curl)
    Steps:
      1. Start dev server
      2. Send POST to /api/copilotkit with minimal CopilotKit request body
      3. Assert response is 200 or streaming SSE
    Expected Result: Route handles request (may error if API key invalid, but route exists)
    Evidence: .sisyphus/evidence/task-18-route.txt

  Scenario: API key not exposed in client bundle
    Tool: Bash
    Steps:
      1. Run `npm run build`
      2. Search .next/ static JS files for the API key prefix "sk-Se1D"
      3. Assert no matches found
    Expected Result: API key not in client bundle
    Evidence: .sisyphus/evidence/task-18-no-leak.txt
  ```

  **Commit**: YES (groups with T19-T22)
  - Message: `feat(copilot): add runtime route with Zen proxy and system prompt`

- [ ] 19. CopilotChat wrapper + CopilotPopup styling

  **What to do**:
  - Create `components/chat/CopilotChat.tsx`:
    - Client component ("use client" directive)
    - Wraps CopilotPopup from @copilotkit/react-ui
    - Custom styling via className prop to match DESIGN.md chat conventions:
      - Cream canvas background
      - Ink text
      - Coral user bubbles
      - Cream surface-card assistant bubbles
      - SpikeMark glyph as assistant avatar
    - 380px wide × 560px tall on desktop
    - Full-screen sheet on mobile
    - Props: defaultOpen=false, clickOutsideToClose=true, hitEscapeToClose=true
  - Override CopilotKit CSS using custom CSS file that targets cpk-prefixed classes
  - Ensure no default CopilotKit chrome leaks through

  **Must NOT do**:
  - Do NOT use default CopilotKit styling
  - Do NOT add custom avatars beyond SpikeMark
  - Do NOT add sound effects

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with T18, T20, T21, T22)
  - **Blocks**: T22 (chat avatar button opens this)
  - **Blocked By**: T1, T17, T18

  **References**:
  - CopilotPopup props from research
  - CopilotKit CSS override patterns (cpk prefix)
  - DESIGN.md chat conventions

  **Acceptance Criteria**:
  - [ ] CopilotPopup renders with custom styling
  - [ ] 380×560px on desktop
  - [ ] Full-screen on mobile
  - [ ] Cream canvas, ink text, coral user bubbles
  - [ ] SpikeMark as assistant avatar
  - [ ] Closes on Escape and outside click
  - [ ] No default CopilotKit chrome visible

  **QA Scenarios**:
  ```
  Scenario: Chat panel opens with custom styling
    Tool: Playwright
    Steps:
      1. Trigger chat open (via button or programmatically)
      2. Assert panel is 380×560px at 1440px
      3. Assert cream background
      4. Assert user bubble would be coral (send test message)
      5. Screenshot
    Expected Result: Chat panel styled per DESIGN.md
    Evidence: .sisyphus/evidence/task-19-chat.png

  Scenario: Chat panel is full-screen on mobile
    Tool: Playwright
    Steps:
      1. Resize to 375px
      2. Trigger chat open
      3. Assert panel covers full viewport
    Expected Result: Full-screen on mobile
    Evidence: .sisyphus/evidence/task-19-chat-mobile.png
  ```

  **Commit**: YES (groups with T18, T20-T22)
  - Message: `feat(chat): add CopilotChat wrapper with custom DESIGN.md styling`

- [ ] 20. 8 frontend tools (useCopilotAction)

  **What to do**:
  - Create `components/chat/ChatTools.tsx` (client component):
    - Define all 8 tools using useCopilotAction (or useFrontendTool for v2):
      1. downloadResume: no params, triggers /resume.pdf download, returns confirmation
      2. goToProject: params { name: slug }, smooth-scrolls to project card, opens modal, triggers coral border pulse
      3. playDemo: params { name: slug }, same as goToProject but focuses preview element
      4. explainProject: params { name: slug }, returns structured explanation from projects.ts
      5. showSkill: params { skill: string }, searches skills data, returns relevance/depth
      6. contactMe: params { method?: "email"|"linkedin"|"github" }, opens channel, returns confirmation
      7. tellMeAboutCloudBees: no params, returns structured CloudBees summary
      8. showAvailability: no params, returns availability status + location + now line
    - Each tool dispatches custom event `copilot:tool-fired` with { name, params }
    - Tools pull data from lib/data/ files
    - Zod schemas for parameter validation

  **Must NOT do**:
  - Do NOT implement tools as backend actions (all frontend-only)
  - Do NOT add more than 8 tools
  - Do NOT invent data not in lib/data/ files

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with T18, T19, T21, T22)
  - **Blocks**: T21, T22
  - **Blocked By**: T4, T17, T18

  **References**:
  - useCopilotAction API from research
  - Tool definitions from prompt spec
  - Data files from lib/data/

  **Acceptance Criteria**:
  - [ ] All 8 tools defined with correct parameters
  - [ ] Each tool dispatches copilot:tool-fired event
  - [ ] downloadResume triggers file download
  - [ ] goToProject scrolls to card and opens modal
  - [ ] explainProject returns structured data
  - [ ] showAvailability returns correct status
  - [ ] Zod schemas validate parameters

  **QA Scenarios**:
  ```
  Scenario: Tools are registered
    Tool: Playwright
    Steps:
      1. Open chat panel
      2. Send message "download my resume"
      3. Wait for tool call
      4. Assert copilot:tool-fired event dispatched with name "downloadResume"
    Expected Result: Tool fires correctly
    Evidence: .sisyphus/evidence/task-20-tools.txt

  Scenario: goToProject triggers card pulse
    Tool: Playwright
    Steps:
      1. Open chat
      2. Send "show me ClipGuessr"
      3. Assert goToProject tool fires
      4. Assert ClipGuessr card gets coral border pulse
      5. Assert page scrolls to project card
    Expected Result: Tool triggers visual feedback
    Evidence: .sisyphus/evidence/task-20-gotoproject.txt
  ```

  **Commit**: YES (groups with T18-T22)
  - Message: `feat(chat): define 8 frontend tools with useCopilotAction`

- [ ] 21. ToolCallPill component + coral border pulse

  **What to do**:
  - Create `components/chat/ToolCallPill.tsx`:
    - Renders above chat panel input when a tool fires
    - Format: "🔧 calling: explainProject("clipguessr")"
    - Stays visible for 2 seconds, then fades out
    - font-mono 12px, bg-surface-dark-elevated, text-on-dark, rounded-pill, px-md py-xs
    - Listens for copilot:tool-fired custom event
  - Create coral border pulse CSS:
    - Triggered when goToProject or playDemo fires
    - box-shadow transition: 0 0 0 0 rgba(204,120,92,0) → 0 0 0 4px rgba(204,120,92,0.4) → fade
    - 2-second duration
    - Applied to target project card via className or data attribute
    - Respects prefers-reduced-motion (instant state change, no animation)

  **Must NOT do**:
  - Do NOT use coral border pulse anywhere except tool-fire
  - Do NOT make ToolCallPill persistent (must fade after 2s)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with T18-T20, T22)
  - **Blocks**: None
  - **Blocked By**: T20

  **References**:
  - ToolCallPill spec from prompt
  - Coral color: #cc785c

  **Acceptance Criteria**:
  - [ ] ToolCallPill renders on tool fire
  - [ ] Shows tool name and params
  - [ ] Fades after 2 seconds
  - [ ] Coral border pulse triggers on target card
  - [ ] Pulse respects prefers-reduced-motion

  **QA Scenarios**:
  ```
  Scenario: ToolCallPill renders and fades
    Tool: Playwright
    Steps:
      1. Open chat
      2. Send message that triggers a tool
      3. Assert ToolCallPill appears with correct format
      4. Wait 3 seconds
      5. Assert ToolCallPill faded out
    Expected Result: Pill appears and fades
    Evidence: .sisyphus/evidence/task-21-pill.txt

  Scenario: Coral border pulse on tool fire
    Tool: Playwright
    Steps:
      1. Open chat
      2. Send "show me ClipGuessr"
      3. Assert ClipGuessr card gets coral box-shadow
      4. Wait 3 seconds
      5. Assert box-shadow faded
    Expected Result: Card pulses coral
    Evidence: .sisyphus/evidence/task-21-pulse.png
  ```

  **Commit**: YES (groups with T18-T22)
  - Message: `feat(chat): add ToolCallPill and coral border pulse`

- [ ] 22. Chat avatar button + pulse animation + "Ask Lochan" label

  **What to do**:
  - Create `components/chat/ChatAvatar.tsx` (client component):
    - Bottom-right floating button, 64px circular
    - Inside: coral circle with "LV" monogram in font-display 24px white (placeholder until avatar.jpg swapped)
    - Pulse animation: 2.5s cycle, coral ring expanding from 100% to 130%, opacity 0.6→0, resetting. Every 8 seconds.
    - Stops after first user interaction (persist in localStorage).
    - "Ask Lochan" label: small dark pill next to button on first load. Auto-dismisses after 6 seconds or on first interaction. Dismissible manually.
    - Clicking opens CopilotKit chat panel (programmatically triggers CopilotPopup open).
    - Keyboard navigable: Tab reaches button, Enter opens, Esc closes.
    - Respects prefers-reduced-motion (no pulse animation).

  **Must NOT do**:
  - Do NOT use actual avatar.jpg (use LV monogram placeholder)
  - Do NOT add notification badges
  - Do NOT make pulse continuous (stop after first interaction)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with T18-T21)
  - **Blocks**: None
  - **Blocked By**: T17, T19

  **References**:
  - Chat avatar spec from prompt
  - localStorage for interaction tracking

  **Acceptance Criteria**:
  - [ ] 64px circular button bottom-right
  - [ ] Coral circle with "LV" monogram
  - [ ] Pulse animation runs every 8 seconds
  - [ ] Pulse stops after first interaction
  - [ ] "Ask Lochan" label appears and auto-dismisses after 6s
  - [ ] Click opens chat panel
  - [ ] Keyboard accessible (Tab, Enter, Esc)
  - [ ] Respects prefers-reduced-motion

  **QA Scenarios**:
  ```
  Scenario: Avatar button renders and opens chat
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Assert floating button visible bottom-right
      3. Assert "LV" monogram visible
      4. Click button
      5. Assert chat panel opens
    Expected Result: Avatar button works
    Evidence: .sisyphus/evidence/task-22-avatar.png

  Scenario: "Ask Lochan" label auto-dismisses
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Assert "Ask Lochan" label visible
      3. Wait 7 seconds
      4. Assert label dismissed
    Expected Result: Label auto-dismisses
    Evidence: .sisyphus/evidence/task-22-label.txt
  ```

  **Commit**: YES (groups with T18-T21)
  - Message: `feat(chat): add floating avatar button with pulse and label`

- [ ] 23. CP1 — Foundation verification

  **What to do**:
  - Create `tests/cp1-foundation.spec.ts`
  - Verify: npm run build exits 0, no errors or warnings
  - Verify: bg-canvas is #faf9f5
  - Verify: TopNav is sticky
  - Verify: Fraunces font loaded on wordmark
  - Verify: No console errors
  - Run at 1440px and 375px

  **Must NOT do**:
  - Do NOT test section content (that's later checkpoints)
  - Do NOT test chatbot

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T24-T28)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **References**:
  - Playwright test patterns
  - Tailwind v4 token values

  **Acceptance Criteria**:
  - [ ] Build succeeds with exit code 0
  - [ ] bg-canvas color verified as #faf9f5
  - [ ] TopNav sticky position verified
  - [ ] Fraunces font loaded
  - [ ] Zero console errors

  **QA Scenarios**:
  ```
  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run `npm run build`
      2. Assert exit code 0
      3. Assert no errors or warnings in output
    Expected Result: Clean build
    Evidence: .sisyphus/evidence/task-23-build.txt

  Scenario: Foundation visual check
    Tool: Playwright
    Steps:
      1. Start dev server
      2. Navigate to localhost:3000
      3. Resize to 1440px
      4. Assert body background color is #faf9f5
      5. Assert nav position is sticky
      6. Assert font-family of wordmark contains "Fraunces"
      7. Assert console error count is 0
      8. Screenshot
      9. Repeat at 375px
    Expected Result: Foundation verified at both sizes
    Evidence: .sisyphus/evidence/task-23-visual.png
  ```

  **Commit**: NO (part of final verification)

- [ ] 24. CP2 — Hero + About verification

  **What to do**:
  - Create `tests/cp2-hero-about.spec.ts`
  - Verify: Hero renders with correct H1 text
  - Verify: "AI" word is coral (#cc785c)
  - Verify: Terminal renders with monospace and syntax coloring
  - Verify: Open-to-work pill visible
  - Verify: About section renders with two paragraphs
  - Verify: Word-by-word animation completes within 5 seconds
  - Run axe-core a11y check
  - Run at 1440px and 375px

  **Must NOT do**:
  - Do NOT test projects or other sections

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T23, T25-T28)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **Acceptance Criteria**:
  - [ ] H1 text correct
  - [ ] "AI" is coral
  - [ ] Terminal syntax coloring visible
  - [ ] Availability pill visible
  - [ ] About has 2 paragraphs
  - [ ] Animation completes within 5s
  - [ ] axe-core reports zero serious issues

  **QA Scenarios**:
  ```
  Scenario: Hero visual and animation check
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Wait 5 seconds
      3. Assert H1 fully visible
      4. Assert "AI" element color is #cc785c
      5. Screenshot hero at 1440px
      6. Resize to 375px, screenshot
    Expected Result: Hero renders correctly
    Evidence: .sisyphus/evidence/task-24-hero.png

  Scenario: Accessibility check
    Tool: Playwright
    Steps:
      1. Inject axe-core
      2. Run axe.run() on page
      3. Assert no serious or critical violations
    Expected Result: Zero serious a11y issues
    Evidence: .sisyphus/evidence/task-24-a11y.txt
  ```

  **Commit**: NO

- [ ] 25. CP3 — Projects + modals verification

  **What to do**:
  - Create `tests/cp3-projects.spec.ts`
  - Verify: All 3 project cards render with chat-exchange layout
  - Verify: ClipGuessr iframe loads or screenshot fallback renders
  - Verify: Click each "Read more →" button
  - Verify: Modal opens, screenshot at 1440px
  - Verify: Modal closes with Esc
  - Verify: Focus returns to trigger button
  - Verify: axe-core inside open modal
  - Run at 1440px and 375px

  **Must NOT do**:
  - Do NOT test chatbot tools

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T23-T24, T26-T28)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **Acceptance Criteria**:
  - [ ] 3 cards render with chat layout
  - [ ] Modals open/close correctly
  - [ ] Focus trap works
  - [ ] Esc closes modal
  - [ ] Focus returns to trigger
  - [ ] axe-core passes inside modal

  **QA Scenarios**:
  ```
  Scenario: All project cards render
    Tool: Playwright
    Steps:
      1. Navigate to #projects
      2. Assert 3 cards with chat-exchange layout
      3. Screenshot at 1440px
    Expected Result: Cards render correctly
    Evidence: .sisyphus/evidence/task-25-cards.png

  Scenario: Modal open, focus trap, Esc close
    Tool: Playwright
    Steps:
      1. Click "Read more →" on first card
      2. Assert modal visible
      3. Press Tab 10 times, assert focus stays in modal
      4. Press Escape
      5. Assert modal closed
      6. Assert focus on trigger button
    Expected Result: Modal behavior correct
    Evidence: .sisyphus/evidence/task-25-modal.txt
  ```

  **Commit**: NO

- [ ] 26. CP4 — Experience + Skills + Writing + Contact verification

  **What to do**:
  - Create `tests/cp4-sections.spec.ts`
  - Verify: Experience timeline renders with expandable details
  - Verify: Click "Show details", confirm smooth height transition
  - Verify: Skills dark-navy section renders (bg #181715)
  - Verify: Writing placeholder cards render
  - Verify: Contact section with coral CTA card
  - Verify: cream→dark→cream pacing intact
  - Run at 1440px and 375px

  **Must NOT do**:
  - Do NOT test chatbot

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T23-T25, T27-T28)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **Acceptance Criteria**:
  - [ ] Timeline with expandable details
  - [ ] Skills is dark navy
  - [ ] Writing cards render
  - [ ] Contact coral CTA visible
  - [ ] Pacing correct (cream→dark→cream)

  **QA Scenarios**:
  ```
  Scenario: All sections render at desktop
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Full-page screenshot at 1440px
      3. Assert Skills section bg is #181715
      4. Assert coral CTA card visible in Contact
    Expected Result: All sections render
    Evidence: .sisyphus/evidence/task-26-sections.png

  Scenario: Details expand
    Tool: Playwright
    Steps:
      1. Click "Show details" on CloudBees
      2. Assert bullet list visible
      3. Assert coral interpunct markers
    Expected Result: Expand works
    Evidence: .sisyphus/evidence/task-26-expand.txt
  ```

  **Commit**: NO

- [ ] 27. CP5 — CopilotKit integration verification

  **What to do**:
  - Create `tests/cp5-chatbot.spec.ts`
  - Verify: Floating avatar button visible bottom-right
  - Verify: Chat panel opens on click
  - Verify: Chat panel closes on Esc
  - Verify: Send message "show me ClipGuessr"
  - Verify: Assistant calls goToProject or explainProject tool
  - Verify: ToolCallPill renders
  - Verify: If goToProject, page scrolls and card pulses coral
  - Verify: Response is grounded in project data
  - Test "download my resume" → confirm download triggers
  - Test "is Lochan looking for work?" → confirm showAvailability fires
  - Run at 1440px and 375px

  **Must NOT do**:
  - Do NOT test with real API if key is invalid (mock responses acceptable)
  - Do NOT test all 8 tools individually (spot-check 3)

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T23-T26, T28)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **References**:
  - CopilotKit tool firing patterns
  - Custom event dispatching

  **Acceptance Criteria**:
  - [ ] Avatar button visible
  - [ ] Chat opens/closes
  - [ ] Tool fires on relevant message
  - [ ] ToolCallPill renders
  - [ ] Coral border pulse on card
  - [ ] Download triggers
  - [ ] Response grounded in data

  **QA Scenarios**:
  ```
  Scenario: Chat opens and responds
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Click avatar button
      3. Assert chat panel opens
      4. Type "tell me about your projects"
      5. Wait 15 seconds
      6. Assert response received
    Expected Result: Chat works
    Evidence: .sisyphus/evidence/task-27-chat.txt

  Scenario: Tool fires with visual feedback
    Tool: Playwright
    Steps:
      1. Open chat
      2. Send "show me ClipGuessr"
      3. Wait for tool call
      4. Assert ToolCallPill visible
      5. Assert ClipGuessr card pulses coral
      6. Assert page scrolled to projects
    Expected Result: Tool fires with visual feedback
    Evidence: .sisyphus/evidence/task-27-tool.png
  ```

  **Commit**: NO

- [ ] 28. CP6 — Polish + responsive sweep

  **What to do**:
  - Create `tests/cp6-polish.spec.ts`
  - Mobile sweep at 375px: every section, every modal, chatbot
  - Tablet sweep at 768px
  - Verify no horizontal overflow at 375, 768, 1024, 1440, 1920px
  - Verify chat panel becomes full-screen on mobile
  - Verify modals are 100vw on mobile
  - Verify all tap targets ≥ 40px
  - Verify all links/buttons have hover, focus, active states
  - Run axe-core full-page
  - Full-page screenshots at 375, 768, 1440

  **Must NOT do**:
  - Do NOT run Lighthouse (manual step, not automatable in this context)
  - Do NOT test with JS disabled (manual step)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 7 (with T23-T27)
  - **Blocks**: None
  - **Blocked By**: T1-T22

  **Acceptance Criteria**:
  - [ ] No horizontal overflow at any breakpoint
  - [ ] Chat full-screen on mobile
  - [ ] Modals 100vw on mobile
  - [ ] Tap targets ≥ 40px
  - [ ] Hover/focus/active states present
  - [ ] axe-core zero serious issues

  **QA Scenarios**:
  ```
  Scenario: No horizontal overflow
    Tool: Playwright
    Steps:
      1. For each viewport [375, 768, 1024, 1440, 1920]:
      2. Resize to width
      3. Assert document.body.scrollWidth <= viewport width
      4. Full-page screenshot
    Expected Result: No overflow at any size
    Evidence: .sisyphus/evidence/task-28-overflow.png

  Scenario: Tap targets ≥ 40px
    Tool: Playwright
    Steps:
      1. Resize to 375px
      2. Find all buttons and links
      3. Assert each has min-width and min-height of 40px
    Expected Result: All tap targets meet minimum
    Evidence: .sisyphus/evidence/task-28-tap-targets.txt
  ```

  **Commit**: NO

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `npm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1 (T1-T4)**: `chore(portfolio): scaffold Next.js 15 project with dependencies, tokens, and data`
- **Wave 2 (T5-T7)**: `feat(ui): add SpikeMark, Badge, Button, Card, CodeWindow, ChatBubble, TopNav`
- **Wave 3 (T8-T11)**: `feat(sections): add Hero, About, Skills, Footer sections`
- **Wave 4 (T12-T15)**: `feat(sections): add Projects, Experience, Writing with modals and timeline`
- **Wave 5 (T16-T17)**: `feat(app): add Contact section and compose full page with metadata`
- **Wave 6 (T18-T22)**: `feat(chat): add CopilotKit runtime, 8 tools, chat UI, avatar button`
- **Wave 7 (T23-T28)**: No commit (verification only)

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0, no errors
npm run dev            # Expected: serves at localhost:3000
npx playwright test    # Expected: all 6 checkpoints pass
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All 6 Playwright checkpoints pass at desktop and mobile
- [ ] CopilotKit chat opens, responds, fires tools
- [ ] No horizontal overflow at 375, 768, 1024, 1440, 1920px
- [ ] Hero animation is one-shot, respects reduced-motion
- [ ] Project modals trap focus, close on Esc/backdrop
- [ ] No API key in client bundle
- [ ] DESIGN.md tokens followed with Fraunces as only deviation
- [ ] Coral used ONLY for specified elements

# Lochan Portfolio — Deep Architecture

## Overview

A single-page portfolio website (Next.js 16 App Router) with an embedded AI chatbot powered by CopilotKit v2. The AI assistant has 8 custom frontend tools that render rich UI components in chat — resume download buttons, project cards, contact links — using structured data from a single-source-of-truth data layer.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                          │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ Static      │  │ CopilotKit   │  │ Custom Events       │ │
│  │ Sections    │  │ Popup        │  │ (open-chat-panel)   │ │
│  │ (9 sections)│  │ (ChatPopup)  │  │                     │ │
│  └─────┬──────┘  └──────┬───────┘  └─────────────────────┘ │
│        │                │                                    │
│  ┌─────▼────────────────▼──────────────────────────────────┐│
│  │            lib/data/ (Single Source of Truth)            ││
│  │  profile.ts │ projects.ts │ experience.ts │ skills.ts   ││
│  └─────────────────────────────────────────────────────────┘│
│        │                │                                    │
│  ┌─────▼──────┐  ┌──────▼──────────────────────────────────┐│
│  │ Static     │  │  CopilotKit Tools (useFrontendTool)      ││
│  │ Components │  │  • resume • projects • experience        ││
│  │ (read data)│  │  • skills • contact • writing            ││
│  │            │  │  • availability • bookCall               ││
│  └────────────┘  └──────┬──────────────────────────────────┘│
└──────────────────────────┼──────────────────────────────────┘
                           │ POST /api/copilotkit
┌──────────────────────────▼──────────────────────────────────┐
│                    Server (Next.js API Route)                │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  app/api/copilotkit/route.ts                           │  │
│  │                                                        │  │
│  │  BuiltInAgent({                                        │  │
│  │    model: deepseek-v4-flash (via OpenCode Zen)         │  │
│  │    prompt: SYSTEM_PROMPT (80 lines, strict guardrails) │  │
│  │    maxSteps: 10                                        │  │
│  │    temperature: 0.7                                    │  │
│  │  })                                                    │  │
│  │                                                        │  │
│  │  transformRequestBody: disable thinking mode           │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Page Composition
```
layout.tsx (RootLayout)
  ├── CopilotKit provider (wraps entire app)
  ├── MotionConfig (reducedMotion="never")
  └── page.tsx (Home)
        ├── ScrollProgress
        ├── TopNav (sticky, scroll-spy)
        ├── Hero (word-by-word animation, terminal code window)
        ├── About (personal narrative, editorial copy)
        ├── Skills (dark section, terminal typewriter animation)
        ├── Experience (vertical timeline, expandable details)
        ├── Projects (chat-exchange layout, modal on click)
        ├── Writing (blog post teasers)
        ├── Contact (method cards + coral CTA)
        ├── Footer (dark section)
        ├── ChatPopup (CopilotKit popup, registers all 8 tools)
        └── ChatCallout (floating "AI here" callout, auto-dismisses)
```

### AI Pipeline

```
User types message in chat popup
  │
  ├─→ CopilotKit sends POST /api/copilotkit
  │
  ├─→ createOpenAICompatible provider (OpenCode Zen gateway)
  │     └─→ transformRequestBody: strips thinking mode from DeepSeek
  │
  ├─→ BuiltInAgent receives message + SYSTEM_PROMPT context
  │     └─→ decides which tool to call (or answers directly)
  │
  ├─→ Tool call → handler in ChatPopup.tsx
  │     └─→ reads data from lib/data/*.ts
  │     └─→ returns structured data
  │
  └─→ CopilotKit renders tool output as React component in chat
        └─→ Resume: download button card
        └─→ Projects: cards with tech stack + metrics
        └─→ Contact: pill buttons (Email, LinkedIn, GitHub)
        └─→ Skills: badge grid by category
        └─→ etc.
```

## Data Layer: Single Source of Truth

All portfolio data lives in `lib/data/` as TypeScript files with typed exports. Both the static sections and the CopilotKit tools read from the same source:

```
lib/data/
├── profile.ts     → { name, tagline, location, email, phone,
│                      github, linkedin, resumeUrl, avatarUrl,
│                      availability: { status, label, locations },
│                      now }
├── projects.ts    → Project[] { slug, name, tagline, liveUrl,
│                      githubUrl, techStack, metrics,
│                      interestingDecisions, previewType, screenshots }
├── experience.ts  → Experience[] { company, role, period,
│                      location, summary, bullets }
├── skills.ts      → { groups: { name, icon, skills }[],
│                      strengths: string[] }
└── writing.ts     → Writing[] { title, teaser, date, url }
```

### Why Not a CMS?
Deliberate choice. For a portfolio with ~10 data entries, a CMS adds complexity without benefit. TypeScript files are:
- Type-safe (no runtime validation needed)
- Version-controlled (git history is the audit log)
- Zero-latency (no API calls at render time)
- No build step (imported directly)

### Future: Dynamic Data
If the portfolio grows beyond ~20 entries, the data layer is designed for a clean migration to a CMS. The interfaces are already defined, and both static components and CopilotKit tools consume them — swapping the data source would be a one-line change per consumer.

## CopilotKit Tool Architecture

Each tool follows the same pattern:

```typescript
// lib/tools/resume.tsx
export function useResumeTool() {
  useFrontendTool({
    name: "getResumeUrl",
    description: "Get Lochan's resume download URL",
    parameters: [],
    handler: () => {
      return {
        resumeUrl: profile.resumeUrl,
      };
    },
    render: ({ status, args, result }) => {
      if (status === "executing") return <SpikeMark />;
      return (
        <Card>
          <Button href={result.resumeUrl}>
            Download Resume (PDF)
          </Button>
        </Card>
      );
    },
  });
}
```

### The 8 Tools

| Tool | Handler Returns | Renders |
|------|----------------|---------|
| `getResumeUrl` | `{ resumeUrl }` | Download button card |
| `getProjectDetails` | `Project[]` (optionally filtered by slug) | Project cards with tech stack, metrics, interesting decisions |
| `getExperience` | `Experience[]` | Timeline cards with role, company, period |
| `getSkills` | `{ groups, strengths }` | Badge grids grouped by category |
| `getContact` | `{ email, linkedin, github }` | Pill buttons for each method |
| `getWriting` | `Writing[]` | Blog post teasers |
| `getAvailability` | `{ status, label }` | Green dot + status text |
| `bookCall` | `{ message }` | Scheduling info card |

### Tool Registration
All 8 tools are registered in `ChatPopup.tsx`:
```typescript
useResumeTool();
useProjectsTool();
useExperienceTool();
useSkillsTool();
useContactTool();
useWritingTool();
useAvailabilityTool();
useBookCallTool();
```

## Design System

### Token Architecture
```
DESIGN.md
  ├── Color Palette (13 tokens)
  │     canvas → surface-card → surface-dark → surface-dark-soft
  │     ink → body → muted → primary → hairline
  │     on-primary → on-dark → on-dark-soft → accent-teal
  ├── Typography (Fraunces display, Inter body, JetBrains Mono code)
  ├── Spacing Scale (section 96px → xs 4px)
  ├── Border Radius (md 8px → pill 9999px)
  ├── Components (Buttons, Cards, Code Windows, Chat Bubbles, Badges)
  └── Surface Rhythm (cream → dark → cream)
```

### Coral Usage Rules
Coral (#cc785c) is **reserved** for:
- Primary CTA buttons
- User chat bubbles
- Open-to-work pill
- Callout card (Contact section)
- "AI" word in Hero headline
- Card border pulse on CopilotKit tool-fire

**Nowhere else. No exceptions.** This constraint ensures the accent color signals importance consistently.

### Tailwind v4 @theme Integration
Design tokens map directly to Tailwind's `@theme` directive in `globals.css`, enabling:
```css
@theme {
  --color-canvas: #faf9f5;
  --color-primary: #cc785c;
  --font-display: var(--font-fraunces);
  /* ... */
}
```

## CopilotKit CSS Overrides

142 lines of CSS in `app/copilotkit-overrides.css`:
- Hides CopilotKit branding (`data-copilotkit-branding { display: none }`)
- Restyles popup button, header, input, and suggestions to match design tokens
- Custom bubble styling (user: coral, assistant: surface-card)
- Custom scrollbar colors
- Focus ring colors changed to primary

## Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useFocusTrap` | `hooks/useFocusTrap.ts` | Tab cycling within project modals, trigger capture/restore on open/close |
| `useActiveSection` | `lib/hooks/useActiveSection.ts` | IntersectionObserver-based scroll spy for TopNav highlighting |

## Event Flow: Contact → Chat

The Contact section dispatches a custom DOM event when the coral CTA is clicked:
```typescript
// Contact.tsx
window.dispatchEvent(new CustomEvent('open-chat-panel'));
```

`ChatPopup.tsx` listens for this event:
```typescript
// ChatPopup.tsx
useEffect(() => {
  const handler = () => copilotkit.open();
  window.addEventListener('open-chat-panel', handler);
  return () => window.removeEventListener('open-chat-panel', handler);
}, []);
```

This is a clean decoupling pattern — the Contact section doesn't import or know about CopilotKit. It just fires an event.

## Testing Strategy

6 Playwright test suites:

| Suite | Coverage |
|-------|----------|
| `cp1-foundation` | Layout renders, fonts loaded, nav present |
| `cp2-hero` | Hero text, about section content, terminal code window |
| `cp3-projects` | Project cards render, modal opens/closes, skills section |
| `cp4-experience` | Experience timeline, contact cards, footer |
| `cp5-responsive` | All sections at mobile (375px) viewport |
| `cp6-chatbot` | Chat popup opens, message sent, tool fires, response renders |

All tests run at both desktop (1440px) and mobile (375px). The chatbot test includes full interaction flow — opening the popup, sending "What's Lochan's resume?", verifying the tool fires and a download button appears.

## Build & Deployment

```
Next.js 16 App Router
  ├── app/page.tsx (client component - "use client")
  ├── app/layout.tsx (server component - wraps with CopilotKit)
  ├── app/api/copilotkit/route.ts (API route - CopilotKit runtime)
  └── next.config.ts

Build: npm run build → .next/
Deploy: Vercel (recommended) or any Node.js host
Runtime: Node.js 18+
```

The CopilotKit runtime endpoint uses `mode: "single-route"` with `cors: true`, meaning a single `/api/copilotkit` endpoint handles all agent communication (no separate endpoints for different agents).

## Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| OpenCode Zen over OpenAI | Multi-protocol gateway, cheaper, deepseek-v4-flash performs comparably |
| DeepSeek thinking disabled | CopilotKit's tool-calling flow doesn't need reasoning tokens — they add latency |
| 8 tools + rich renderers | Chat isn't just text — it's interactive UI. Recruiters can download a resume from the chat |
| Single-source-of-truth data layer | No data duplication. TypeScript files are the database |
| Claude.com design with Fraunces | Recognizable design quality + unique typographic identity |
| Coral reserved for CTAs | Consistent visual hierarchy — coral always means "action" |
| Custom events for cross-component communication | Contact section can open the chat without importing CopilotKit |

## Files
```
lochan-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, CopilotKit provider, fonts
│   ├── page.tsx                # Single-page composition (9 sections + chat)
│   ├── globals.css             # Tailwind v4 @theme, base styles
│   ├── copilotkit-overrides.css # 142 lines of CopilotKit branding removal
│   └── api/copilotkit/route.ts # CopilotKit runtime endpoint
├── components/
│   ├── chat/ChatPopup.tsx      # CopilotKit popup + tool registration
│   ├── chat/ChatCallout.tsx    # "AI here" floating callout
│   ├── nav/TopNav.tsx          # Sticky nav with scroll-spy
│   ├── sections/ (10 files)    # Hero, About, Projects, Experience, Skills, etc.
│   └── ui/ (8 files)           # Button, Badge, Card, CodeWindow, ChatBubble, etc.
├── lib/
│   ├── data/ (5 files)         # profile, projects, experience, skills, writing
│   ├── tools/ (8 files)        # CopilotKit frontend tools
│   ├── prompts/system-prompt.ts # 80-line AI persona definition
│   └── hooks/useActiveSection.ts
├── hooks/useFocusTrap.ts
├── DESIGN.md                   # Complete design token reference
├── tests/ (6 test files)       # Playwright E2E tests
└── package.json
```

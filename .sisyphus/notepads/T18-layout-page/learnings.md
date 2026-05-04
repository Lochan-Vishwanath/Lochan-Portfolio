# T18 Learnings: Layout + Page Composition

## Key Findings
- `CopilotKitProvider` lives in `@copilotkit/react-core/v2` subpath, NOT the main `@copilotkit/react-core` import
- `@copilotkit/react-core` main path exports `CopilotKit` (v1), not `CopilotProvider`
- `CopilotKitProvider` accepts `runtimeUrl` prop pointing to the CopilotKit API route
- `MotionConfig` from `motion/react` wraps children with `reducedMotion="user"` to respect OS accessibility
- The `Fraunces` font had `weight: "400"` (string), not `weight: ["400"]` — must remain as-is

## Sections Available (9 total)
| # | Section | Import Path |
|---|---------|-------------|
| 1 | TopNav | `@/components/nav/TopNav` |
| 2 | Hero | `@/components/sections/Hero` |
| 3 | About | `@/components/sections/About` |
| 4 | Projects | `@/components/sections/Projects` |
| 5 | Experience | `@/components/sections/Experience` |
| 6 | Skills | `@/components/sections/Skills` |
| 7 | Writing | `@/components/sections/Writing` |
| 8 | Contact | `@/components/sections/Contact` |
| 9 | Footer | `@/components/sections/Footer` |

## Build Result
- `npm run build` exits 0
- All 9 sections composed in a Fragment with `"use client"` directive
- Layout wraps children in `CopilotKitProvider > MotionConfig`

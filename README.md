# Lochan Vishwanath — Portfolio + AI Copilot

A portfolio website that doesn't just show my work — it lets recruiters have a conversation with an AI that knows my entire career inside out.

## About

This is my personal portfolio website built with Next.js 16 and CopilotKit. It presents my work experience, projects, skills, and writing through a carefully designed single-page experience. But the centerpiece is the **AI chatbot** — a CopilotKit-powered assistant that can answer any question about my background, projects, and availability.

**Live**: [lochan.dev](https://lochan.dev) *(coming soon)*

### What It Does

- **Static sections**: Hero, About, Skills (with terminal animations), Experience timeline, Projects (in chat-exchange layout), Writing, and Contact
- **AI Chatbot (CopilotKit)**: A branded assistant with **8 structured tools** that can share my resume, walk through projects, list skills, provide contact info, check availability, and schedule calls — all rendered as rich UI cards inside the chat
- **Strict guardrails**: The bot refuses to write code, solve LeetCode, or provide general programming advice. It ONLY talks about my portfolio

### Why a Chatbot on a Portfolio?

I build CopilotKit-powered AI assistants professionally at CloudBees. My portfolio IS a CopilotKit-powered assistant. It's eating my own dogfood — the chat experience immediately communicates what I do better than any bullet point in a resume.

When a recruiter visits, they can skip scrolling and just ask: *"What did Lochan do at CloudBees?"* or *"Tell me about his RAG project."* The bot answers with structured data rendered as UI cards — resume download buttons, project breakdowns, contact links.

## What Makes This Unique

### 1. Eat Your Own Dogfood
I build AI copilots professionally. My portfolio is one. The chat-exchange layout in the Projects section and the terminal-aesthetic Skills section both reinforce the AI/developer identity.

### 2. 8 CopilotKit Frontend Tools
Each tool isn't just returning JSON text — it renders **React components** in the chat:
- `getResumeUrl` → Download button card
- `getProjectDetails` → Project cards with tech stacks, metrics, interesting decisions
- `getExperience` → Timeline cards with expandable details
- `getSkills` → Badge grids grouped by category
- `getContact` → Email, LinkedIn, GitHub pill buttons
- `getAvailability` → Status indicator with green dot
- `getWriting` → Blog post teasers
- `bookCall` → Scheduling info card

### 3. OpenCode Zen Over OpenAI
Instead of using the standard OpenAI API, the CopilotKit runtime connects through **OpenCode Zen** — a multi-protocol LLM gateway — using **DeepSeek v4 Flash**. A custom `transformRequestBody` disables DeepSeek's thinking mode to avoid reasoning token issues with CopilotKit's tool-calling flow.

### 4. Claude.com-Inspired Design System
The design follows the Claude.com design system with one deliberate deviation — **Fraunces** (Google Fonts) as the display serif instead of Copernicus/Tiempos Headline. The coral accent color (#cc785c) is strictly reserved for CTAs, user chat bubbles, the open-to-work pill, and the "AI" word highlight. All other tokens — colors, spacing, radii, surface rhythm (cream → dark → cream) — match the Claude system exactly.

### 5. Chat-Exchange Project Layout
Projects are displayed as a simulated chat conversation — user bubble asks "Tell me about ClipGuessr", assistant bubble responds with project details. This visually demonstrates the conversational AI pattern I specialize in building.

### 6. Single Source of Truth Architecture
All profile data (name, experience, projects, skills) lives in TypeScript files under `lib/data/`. Both the static sections AND the CopilotKit tools read from the same files. No data duplication, no CMS overhead, type-safe everywhere.

## How to Run

### Prerequisites
- **Node.js 18+**
- **OpenCode Zen API key** (or any OpenAI-compatible provider)

### Setup
```bash
# Clone and install
git clone https://github.com/placeholder/lochan-portfolio
cd lochan-portfolio
npm install

# Create .env.local and add your API key:
echo 'OPENCODE_ZEN_API_KEY=your_key_here' > .env.local
# OPENCODE_ZEN_API_KEY=your_key_here
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Build & Production
```bash
npm run build
npm start
```

### Testing
```bash
npx playwright test
# 6 test suites covering desktop (1440px) and mobile (375px):
# - Foundation layout
# - Hero + About sections
# - Projects + Skills + Writing
# - Experience + Contact
# - Chatbot interactions (including tool firing)
# - Responsive behavior
```

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| AI Copilot | CopilotKit v2 (Runtime + React Core + UI) |
| LLM Gateway | OpenCode Zen (DeepSeek v4 Flash) |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Typography | Fraunces (display), Inter (body), JetBrains Mono (code) |
| Icons | Lucide React |
| Testing | Playwright (6 test suites) |
| Schema | Zod v4 |

---

**GitHub**: [github.com/placeholder/portfolio](https://github.com/placeholder/portfolio)  
**Resume**: [Download PDF](https://drive.google.com/file/d/16TRhhoZuJ2lgTFIi3uQcKdc1zd3fXc20/view)  
**Contact**: lochan.vish@hotmail.com

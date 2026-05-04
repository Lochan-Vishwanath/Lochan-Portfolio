import { CopilotRuntime, BuiltInAgent, createCopilotRuntimeHandler } from "@copilotkit/runtime/v2";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt";

const provider = createOpenAICompatible({
  name: "opencode",
  apiKey: process.env.OPENCODE_ZEN_API_KEY,
  baseURL: "https://opencode.ai/zen/go/v1",
});

const agent = new BuiltInAgent({
  model: provider("qwen3.5-plus"),
  apiKey: process.env.OPENCODE_ZEN_API_KEY,
  prompt: SYSTEM_PROMPT,
  maxSteps: 10,
  temperature: 0.7,
});

const runtime = new CopilotRuntime({
  agents: {
    default: agent,
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
  mode: "single-route",
  cors: true,
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}

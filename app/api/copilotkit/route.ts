export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle /api/copilotkit/info - runtime info endpoint
  if (path.endsWith("/info")) {
    return new Response(
      JSON.stringify({
        runtime: "remote",
        version: "1.0.0",
        agents: [],
        actions: [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Default GET handler
  return new Response(
    JSON.stringify({
      runtime: "remote",
      version: "1.0.0",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = body.messages;
  if (!messages || !Array.isArray(messages)) {
    // CopilotKit health check or initial request without messages
    // Return empty successful response
    return new Response(
      JSON.stringify({ status: "ok", runtime: "remote" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const apiKey = process.env.OPENCODE_ZEN_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API key" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://opencode.ai/api/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen3.6-plus",
        messages,
        maxSteps: 10,
        stream: true,
      }),
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to reach upstream" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "Upstream error");
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const reader = upstream.body?.getReader();
  if (!reader) {
    return new Response(JSON.stringify({ error: "No response body" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            if (buffer) {
              const lines = buffer.split("\n");
              for (const line of lines) {
                if (
                  line.startsWith("data: ping") ||
                  line.startsWith('data: {"id":"ping"')
                ) {
                  continue;
                }
                controller.enqueue(encoder.encode(line + "\n"));
              }
            }
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (
              line.startsWith("data: ping") ||
              line.startsWith('data: {"id":"ping"')
            ) {
              continue;
            }
            controller.enqueue(encoder.encode(line + "\n"));
          }
        }
      } catch {
        controller.error(new Error("Stream error"));
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

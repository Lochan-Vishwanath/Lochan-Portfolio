export async function GET() {
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

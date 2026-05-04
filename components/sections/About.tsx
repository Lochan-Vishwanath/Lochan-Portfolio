export function About() {
  return (
    <section
      id="about"
      className="py-section bg-canvas"
      aria-labelledby="about-heading"
    >
      <div className="max-w-xl mx-auto px-lg">
        <h2
          id="about-heading"
          className="sr-only"
        >
          About
        </h2>

        <div className="flex flex-col gap-lg">
          <p className="font-sans text-lg text-ink leading-relaxed">
            I&apos;m a Senior Frontend Engineer with six years of experience, currently focused on shipping production AI features — particularly around CopilotKit-powered assistants, RAG workflows, and agent-based UX patterns. I care deeply about frontend system design at scale: the architecture decisions, the test infrastructure, the performance characteristics that determine whether a product feels solid or brittle as it grows.
          </p>

          <p className="font-sans text-lg text-ink leading-relaxed">
            I&apos;m drawn to roles where frontend thinking intersects with AI — specifically building the interfaces, interaction models, and data pipelines that make AI features feel inevitable rather than bolted on. Right now, that means Bengaluru or remote, at companies building product with genuine AI depth rather than feature-forcing GPT wrappers.
          </p>
        </div>
      </div>
    </section>
  );
}
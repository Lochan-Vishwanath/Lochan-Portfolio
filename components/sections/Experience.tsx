import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-section bg-canvas"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-2xl mx-auto px-lg">
        <h2
          id="experience-heading"
          className="font-display text-3xl text-ink tracking-tight mb-xxl"
        >
          Experience
        </h2>

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-[11px] top-0 h-full w-px bg-hairline"
            aria-hidden="true"
          />

          {experience.map((exp, i) => (
            <div
              key={i}
              className="relative pl-xl pb-xxl last:pb-0"
            >
              {/* Coral dot */}
              <div
                className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-primary border-[5px] border-canvas"
                aria-hidden="true"
              />

              {/* Role + Company */}
              <h3 className="font-display text-[24px] text-ink tracking-tight leading-snug">
                {exp.role}{" "}
                <span className="text-muted">·</span>{" "}
                {exp.company}
              </h3>

              {/* Period + Location */}
              <p className="font-sans text-xs font-medium tracking-widest uppercase text-muted mt-xs">
                {exp.period} · {exp.location}
              </p>

              {/* Summary */}
              <p className="font-sans text-base text-body mt-sm leading-relaxed">
                {exp.summary}
              </p>

              {/* Expandable details */}
              <details className="group mt-md">
                <summary className="font-sans text-sm text-primary cursor-pointer list-none select-none hover:text-primary-active transition-colors">
                  Show details
                </summary>
                <div className="grid [grid-template-rows:0fr] transition-[grid-template-rows] duration-300 ease-out group-open:[grid-template-rows:1fr]">
                  <div className="overflow-hidden">
                    <ul className="mt-md flex flex-col gap-sm">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="font-sans text-base text-body leading-relaxed"
                        >
                          <span className="text-primary">· </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

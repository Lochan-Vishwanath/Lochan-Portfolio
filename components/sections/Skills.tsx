import { CodeWindow } from "@/components/ui/CodeWindow";
import { skillGroups, strengths } from "@/lib/data/skills";
import type { ReactNode } from "react";

function TerminalLine({
  command,
  content,
  isAI = false,
}: {
  command: string;
  content: ReactNode;
  isAI?: boolean;
}) {
  return (
    <div className="flex flex-col gap-xs">
      <div className="flex items-center gap-sm">
        <span className="text-muted">$</span>
        <span className="text-on-dark">{command}</span>
      </div>
      <div className={`text-accent-teal pl-lg ${isAI ? "text-primary" : ""}`}>
        <span className="text-accent-teal">→</span> {content}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-section bg-surface-dark"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-3xl mx-auto px-lg">
        <h2
          id="skills-heading"
          className="font-display text-3xl text-on-dark tracking-tight mb-xl"
        >
          Skills
        </h2>

        <CodeWindow>
          <div className="flex flex-col gap-md">
            {skillGroups.map((group) => (
              <TerminalLine
                key={group.command}
                command={group.command}
                content={
                  <span>
                    {group.skills.slice(0, -1).join(" · ")}
                    {group.skills.length > 1 && (
                      <> · <span className="text-on-dark-soft italic text-xs">{group.skills[group.skills.length - 1]}</span></>
                    )}
                  </span>
                }
                isAI={group.label === "ai"}
              />
            ))}

            <TerminalLine
              command="lochan --strengths"
              content={strengths.join(", ")}
            />
          </div>
        </CodeWindow>

        <p className="font-sans text-xs text-on-dark-soft mt-lg text-center uppercase tracking-widest">
          Honest about levels — fluent, comfortable, and learning are clearly marked.
        </p>
      </div>
    </section>
  );
}
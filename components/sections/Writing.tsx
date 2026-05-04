import { writing } from "@/lib/data/writing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Writing() {
  return (
    <section
      id="writing"
      className="bg-canvas py-section"
    >
      <div className="container">
        <h2 className="font-display text-36 mb-lg">Writing</h2>
        <div className="grid gap-lg grid-cols-1 md:grid-cols-2">
          {writing.map((entry) => (
            <Card key={entry.title} variant="feature">
              <h3 className="font-display text-24 mb-sm">{entry.title}</h3>
              <p className="text-muted caption-uppercase mb-md">
                {entry.estimatedDate} · 5 min read
              </p>
              <p className="text-ink mb-md">{entry.teaser}</p>
              <Badge variant="coral">Coming soon</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
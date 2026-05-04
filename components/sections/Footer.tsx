"use client";

import Link from "next/link";
import { profile } from "@/lib/data/profile";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

const portfolioLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

const connectLinks = [
  { href: `mailto:${profile.email}`, label: "Email" },
  { href: profile.linkedin, label: "LinkedIn", external: true },
  { href: profile.github, label: "GitHub", external: true },
];

const builtWith = [
  "Next.js",
  "CopilotKit",
  "Vercel",
];

export function Footer() {
  return (
    <footer className="py-section bg-surface-dark">
      <div className="max-w-6xl mx-auto px-lg">
        {/* now line */}
        <FadeIn>
          <p className="font-sans text-sm text-on-dark-soft italic mb-xl">
            {profile.now}
          </p>
        </FadeIn>

        {/* 4 columns */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-xl mb-xl">
          {/* Portfolio */}
          <StaggerItem>
            <div className="flex flex-col gap-sm">
              <h3 className="font-sans text-xs text-on-dark-soft uppercase tracking-widest mb-sm">
                Portfolio
              </h3>
              {portfolioLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-on-dark hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          {/* Connect */}
          <StaggerItem>
            <div className="flex flex-col gap-sm">
              <h3 className="font-sans text-xs text-on-dark-soft uppercase tracking-widest mb-sm">
                Connect
              </h3>
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-sans text-sm text-on-dark hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </StaggerItem>

          {/* Built with */}
          <StaggerItem>
            <div className="flex flex-col gap-sm">
              <h3 className="font-sans text-xs text-on-dark-soft uppercase tracking-widest mb-sm">
                Built with
              </h3>
              {builtWith.map((item) => (
                <span key={item} className="font-sans text-sm text-on-dark-soft">
                  {item}
                </span>
              ))}
            </div>
          </StaggerItem>

          {/* Last updated */}
          <StaggerItem>
            <div className="flex flex-col gap-sm">
              <h3 className="font-sans text-xs text-on-dark-soft uppercase tracking-widest mb-sm">
                Last updated
              </h3>
              <span className="font-sans text-sm text-on-dark">
                April 2026
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Copyright */}
        <FadeIn delay={0.3}>
          <div className="border-t border-surface-dark-elevated pt-lg">
            <p className="font-sans text-sm text-on-dark-soft">
              © 2026 {profile.name}
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { profile } from "@/lib/data/profile";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-canvas h-16 flex items-center border-b border-hairline"
      aria-label="Main navigation"
    >
      <div className="w-full max-w-6xl mx-auto px-lg flex items-center justify-between">
        {/* Left: SpikeMark + Wordmark */}
        <div className="flex items-center gap-sm">
          <SpikeMark className="text-ink" />
          <span className="font-display text-lg text-ink tracking-tight">
            {profile.name.split(" ")[0]}
          </span>
        </div>

        {/* Center-right: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Availability Pill */}
        <div className="hidden md:flex items-center gap-sm">
          <div className="w-xs h-xs rounded-full bg-green-500" />
          <span className="font-sans text-xs text-muted">Available</span>
        </div>

        {/* Mobile: Hamburger */}
        <button
          type="button"
          className="md:hidden p-sm text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-canvas border-b border-hairline p-lg md:hidden">
          <div className="flex flex-col gap-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-muted hover:text-ink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-sm pt-sm border-t border-hairline">
              <div className="w-xs h-xs rounded-full bg-green-500" />
              <span className="font-sans text-xs text-muted">Available</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
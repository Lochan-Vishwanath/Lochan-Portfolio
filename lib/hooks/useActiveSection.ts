"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibilityMap.set(id, entry.intersectionRatio);
            } else {
              visibilityMap.delete(id);
            }

            // Find the section with the highest visibility ratio
            let maxRatio = 0;
            let active = "";
            visibilityMap.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                active = sectionId;
              }
            });

            if (active) {
              setActiveSection(active);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}

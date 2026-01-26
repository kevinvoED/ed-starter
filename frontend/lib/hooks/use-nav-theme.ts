"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type NavTheme = "dark" | "light";

/**
 * Hook that detects which section the navbar is overlapping
 * and returns the appropriate theme based on section's data-nav-theme attribute
 */
export function useNavTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");
  const pathname = usePathname();

  const updateTheme = useCallback(() => {
    // Get all sections with data-nav-theme attribute
    const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
    if (sections.length === 0) return;

    // Get navbar height
    const navBottom = 72;

    // Find which section the navbar is currently overlapping
    for (const section of sections) {
      const rect = section.getBoundingClientRect();

      // Check if section overlaps with nav area
      if (rect.top <= navBottom && rect.bottom > navBottom) {
        const sectionTheme = section.dataset.navTheme as NavTheme;
        if (sectionTheme) {
          setTheme(sectionTheme);
        }
        return;
      }
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname must be in deps to recreate ScrollTrigger on navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial check - runs on mount and when pathname changes
    updateTheme();

    // Create a ScrollTrigger that updates on scroll
    // Recreated when pathname changes to handle new page layout
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: updateTheme,
    });

    return () => {
      trigger.kill();
    };
  }, [updateTheme, pathname]);
  return theme;
}

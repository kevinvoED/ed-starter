"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * ScrollRestoration Component
 *
 * Preserves scroll position on page refresh when using Lenis smooth scroll.
 * Must be used inside a Lenis provider.
 */
export function ScrollRestoration() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Disable browser's native scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Restore scroll position after Lenis initializes
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      const position = Number.parseInt(savedPosition, 10);
      // Wait for Lenis to be ready, then scroll to saved position
      requestAnimationFrame(() => {
        lenis.scrollTo(position, { immediate: true });
      });
    }

    // Save scroll position before unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", String(lenis.scroll));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [lenis]);

  return null;
}

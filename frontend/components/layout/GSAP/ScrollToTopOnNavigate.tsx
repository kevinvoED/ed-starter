"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Resets Lenis scroll to top on client-side route changes.
 *
 * Next.js scrolls via window.scrollTo, which Lenis can ignore while lerping.
 * Skips popstate navigations (back/forward) so the browser can restore position.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isPopStateNavigation = useRef(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateNavigation.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isPopStateNavigation.current) {
      isPopStateNavigation.current = false;
      return;
    }

    if (!lenis || !pathname) return;

    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

"use client";

/**
 * GSAP + Tempus
 *
 * This component wires Tempus to GSAP and ensures they are automatically
 * synchronized with Tempus through the <GSAP> component, providing:
 * consistent frame timing, better performance, and synchronized animations
 *
 * Documentation: https://github.com/darkroomengineering/satus/tree/main/components/gsap
 */

import { useTempus } from "tempus/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.defaults({ ease: "none" });

  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);
}

export function GSAPTempus() {
  useTempus((time) => {
    gsap.updateRoot(time / 1000);
  });

  return null;
}

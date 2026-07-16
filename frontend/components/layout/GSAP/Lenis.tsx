"use client";

/*
 * Lenis Component
 *
 * Initializes and provides Lenis smooth scrolling context to the application.
 * This component wraps the application content and enables smooth scrolling globally.
 *
 * Documentation: https://github.com/darkroomengineering/lenis
 */

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

type LenisProps = {
  children: ReactNode;
};

export function Lenis({ children }: LenisProps) {
  return (
    <ReactLenis
      root={true}
      options={{
        // Let Next.js win scroll-to-top during Link navigations while Lenis is lerping
        stopInertiaOnNavigate: true,
        lerp: 0.12,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

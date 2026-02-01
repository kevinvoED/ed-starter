"use client";

/**
 * ScrollTrigger component
 *
 * Initializing ScrollTrigger and registering GSAP's ScrollTrigger with Lenis.
 *
 * Documentation: https://github.com/darkroomengineering/satus/tree/main/components/gsap
 */

import { useLenis } from "lenis/react";
import { useEffect, useEffectEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger as GSAPScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(GSAPScrollTrigger);
  GSAPScrollTrigger.clearScrollMemory("manual");
}

export function ScrollTrigger() {
  const handleUpdate = useEffectEvent(() => {
    GSAPScrollTrigger.update();
  });

  const handleRefresh = useEffectEvent(() => {
    GSAPScrollTrigger.refresh();
  });

  const lenis = useLenis(handleUpdate);

  useEffect(() => {
    if (lenis) {
      handleRefresh();
    }
  }, [lenis]);

  return null;
}

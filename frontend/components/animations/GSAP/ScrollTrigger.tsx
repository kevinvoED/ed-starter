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
import { ScrollTrigger as GSAPScrollTrigger, SplitText } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(GSAPScrollTrigger, SplitText);
  GSAPScrollTrigger.clearScrollMemory("manual");
  // GSAPScrollTrigger.defaults({
  //   markers: process.env.NODE_ENV === "development",
  // });
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

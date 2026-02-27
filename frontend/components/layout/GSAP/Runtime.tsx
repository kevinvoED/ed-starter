"use client";

/*
 * GSAPRuntime Component
 *
 * This component houses GSAPRuntime which is a core component to enable Lenis scrolling.
 * It dynamically imports GSAP core, Tempus, and ScrollTrigger to split them
 * out of the main bundle and ensure they only execute on the client side.
 *
 * Documentation: https://github.com/darkroomengineering/satus/tree/main/components/gsap
 */

import dynamic from "next/dynamic";

const GSAPTempus = dynamic(() => import("./Tempus").then((m) => m.GSAPTempus), {
  ssr: false,
});

const ScrollTrigger = dynamic(
  () => import("./ScrollTrigger").then((m) => m.ScrollTrigger),
  { ssr: false },
);

export function GSAPRuntime() {
  return (
    <>
      <GSAPTempus />
      <ScrollTrigger />
    </>
  );
}

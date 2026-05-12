"use client";

import dynamic from "next/dynamic";

const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing").then((mod) => mod.VisualEditing),
  { ssr: false },
);

const DisableDraftMode = dynamic(
  () =>
    import("@/components/layout/DraftMode/DisableDraftMode").then(
      (mod) => mod.DisableDraftMode,
    ),
  { ssr: false },
);

export function DraftModeOverlay() {
  return (
    <>
      <DisableDraftMode />
      <VisualEditing />
    </>
  );
}

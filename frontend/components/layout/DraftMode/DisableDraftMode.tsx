"use client";

import { useEffect, useState, useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { disableDraftMode } from "@/lib/actions/draft-mode";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();
  const [pending, startTransition] = useTransition();
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Hide when inside Presentation Tool or any Studio iframe pane
  if (isPresentationTool || isInIframe) return null;

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => disableDraftMode())}
      className="fixed right-4 bottom-4 z-9999 cursor-pointer rounded-full bg-debug-blue px-4 py-2 font-semibold text-white text-xs transition-colors duration-300 ease-in-out hover:bg-debug-blue/90"
    >
      <span>{pending ? "Disabling..." : "Disable Draft Mode"}</span>
    </button>
  );
}

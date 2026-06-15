"use client";

import { useEffect, useState, useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { Button } from "@/components/primitives/Button/Button";
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
    <Button
      variant="draftMode"
      disabled={pending}
      onClick={() => startTransition(() => disableDraftMode())}
    >
      <span>{pending ? "Disabling..." : "Disable Draft Mode"}</span>
    </Button>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { SanityLinkVariants } from "@/components/primitives/Link/SanityLink";
import { disableDraftMode } from "@/lib/actions/draft-mode";
import { cn } from "@/lib/utils/cn";

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
      className={cn(
        SanityLinkVariants({
          variant: "primary",
        }),
        "fixed right-4 bottom-4 z-9999",
      )}
    >
      <span>{pending ? "Disabling..." : "Disable Draft Mode"}</span>
    </button>
  );
}

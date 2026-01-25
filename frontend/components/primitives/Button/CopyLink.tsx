"use client";

import type { Slug } from "@/sanity.types";
import { useState } from "react";
import { Button } from "@/components/primitives/Button/Button";
import { cn } from "@/lib/utils";

type CopyLinkButtonProps = {
  className?: string;
  slug?: Slug;
  type: "post" | "case-study";
};

export const CopyLinkButton = ({
  className,
  type,
  slug,
}: CopyLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      variant="copy-link"
      className={cn("", className)}
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/${type}/${slug?.current}`,
        );
        setIsCopied(true);
      }}
    >
      {isCopied ? "Copied" : "Copy Link"}
    </Button>
  );
};

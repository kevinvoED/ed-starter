"use client";

import type { VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { SanityLinkVariants } from "@/components/primitives/Link/SanityLink";
import { cn } from "@/lib/utils/cn";

// Base props shared by all variants; used from SanityLink.tsx
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "id">,
    VariantProps<typeof SanityLinkVariants> {
  id?: string;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      id,
      children,
      className,
      disabled,
      onClick,
      variant,
      width,
      type,
      card,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Push to GTM dataLayer object
      sendGTMEvent({
        event: "button_clicked",
        value: id,
      });

      // Call any onClick handler that was passed in
      onClick?.(e);
    };

    return (
      <button
        type="button"
        {...props}
        id={id}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        className={cn(
          SanityLinkVariants({ variant, width, disabled, card, className }),
        )}
      >
        {children}
      </button>
    );
  },
);

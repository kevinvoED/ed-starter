"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

export const ButtonVariants = cva(
  "group/button inline-flex select-none items-center justify-center font-inherit outline-0 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-debug-blue focus-visible:outline-offset-4 has-[>svg]:gap-1.5 [&_svg]:size-3",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
        icon: "",
        ghost: "",
        errorBoundary:
          "rounded-lg bg-white px-4 py-2 font-medium text-black text-sm hover:bg-white/95",
        banner: "size-5 rounded-full bg-debug-blue text-white",
        carouselPrevious:
          "disabled:pointer-events-auto! disabled:cursor-not-allowed! disabled:text-silver!",
        carouselNext:
          "disabled:pointer-events-auto! disabled:cursor-not-allowed! disabled:text-silver!",
        draftMode:
          "fixed right-4 bottom-4 z-9999 cursor-pointer rounded-full bg-debug-blue px-4 py-2 font-semibold text-white text-xs transition-colors duration-300 ease-in-out hover:bg-debug-blue/90",
      },
      width: {
        auto: "w-auto",
        fit: "w-fit",
        full: "w-full",
      },
      card: {
        true: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        false: "",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      width: "fit",
      card: false,
      disabled: false,
    },
  },
);

// Base props shared by all variants; used from SanityLink.tsx
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "id">,
    VariantProps<typeof ButtonVariants> {
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
      card,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      id &&
        sendGTMEvent({
          event: "button_clicked",
          value: id,
        });

      onClick?.(e);
    };

    return (
      <button
        {...props}
        type={type}
        id={id}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        className={cn(
          ButtonVariants({ variant, width, disabled, card, className }),
        )}
      >
        {children}
      </button>
    );
  },
);

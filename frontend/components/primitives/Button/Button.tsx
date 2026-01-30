import type React from "react";
import type { SanityLinkType } from "@/lib/utils/types";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@/components/primitives/Icon/Icon";
import { cn } from "@/lib/utils/cn";

export const ButtonVariants = cva(
  "group inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-inherit outline-0 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-white focus-visible:-outline-offset-1 focus-visible:ring focus-visible:ring-1 active:bg-gray-charcoal active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] has-[>svg]:gap-1.5 [&_svg]:size-3",
  {
    variants: {
      variant: {
        primary: "",
        card: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        icon: "bg-transparent",
        ghost: "type-mono-1240",
      },
      width: {
        auto: "w-auto",
        fit: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      width: "auto",
    },
  },
);

type ButtonProps = {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  link?: SanityLinkType;
  href?: string;
  disabled?: boolean;
  prefetch?: boolean;
  openInNewTab?: boolean;
  hasArrow?: boolean;
  scroll?: boolean;
  onClick?: () => void;
  ref?: React.RefObject<HTMLAnchorElement | null>;
} & VariantProps<typeof ButtonVariants>;

export const Button = ({
  id,
  children,
  className,
  link,
  href,
  disabled,
  onClick,
  ref,
  variant,
  width,
  prefetch = true,
  hasArrow = true,
  openInNewTab = false,
  scroll = true,
}: ButtonProps) => {
  if (href || link) {
    return (
      <Link
        id={id}
        href={link?.href || href || ""}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        target={link?.openInNewTab || openInNewTab ? "_blank" : undefined}
        rel={
          link?.openInNewTab || openInNewTab ? "noopener noreferrer" : undefined
        }
        scroll={scroll}
        onClick={onClick}
        ref={ref}
        prefetch={prefetch}
        className={cn(
          ButtonVariants({ variant, width, className }),
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span>{children}</span>
        {hasArrow && !openInNewTab && <Icon variant="arrow-right" />}
        {hasArrow && openInNewTab && (
          <Icon variant="copy" className="-rotate-45" />
        )}
      </Link>
    );
  }

  return (
    <Link
      id={id}
      href={"/"}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      scroll={scroll}
      onClick={onClick}
      ref={ref}
      prefetch={prefetch}
      className={cn(
        ButtonVariants({ variant, width, className }),
        disabled && "pointer-events-none opacity-50",
      )}
    >
      {children}
    </Link>
  );
};

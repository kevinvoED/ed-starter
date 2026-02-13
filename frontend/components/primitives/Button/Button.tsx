"use client";

import type { SanityLinkType } from "@/lib/utils/types";
import { type AnchorHTMLAttributes, forwardRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@/components/primitives/Icon/Icon";
import { cn } from "@/lib/utils/cn";
import { sanitizeForId } from "@/lib/utils/generic";
import { kebabCase } from "es-toolkit/string";

export const ButtonVariants = cva(
  "group inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-inherit outline-0 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-white focus-visible:-outline-offset-1 focus-visible:ring focus-visible:ring-1 active:bg-gray-charcoal active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] has-[>svg]:gap-1.5 [&_svg]:size-3",
  {
    variants: {
      variant: {
        primary: "",
        icon: "bg-transparent",
        ghost: "type-mono-1240",
      },
      card: {
        true: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        false: "",
      },
      width: {
        auto: "w-auto",
        fit: "w-fit",
        full: "w-full",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      card: false,
      width: "auto",
      disabled: false,
    },
  },
);

// Base props shared by all variants
interface BaseButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "id">,
    VariantProps<typeof ButtonVariants> {
  prefetch?: boolean;
  hasArrow?: boolean;
  hasDownload?: boolean;
  scroll?: boolean;
  disabled?: boolean;
  openInNewTab?: boolean;
}

// When link is provided, id is optional
interface ButtonWithLink extends BaseButtonProps {
  link: SanityLinkType;
  id?: "nav" | "footer" | "cta" | "item";
}

// When link is NOT provided, id is required for GTM tracking
interface ButtonWithoutLink extends BaseButtonProps {
  link?: never;
  id: "nav" | "footer" | "cta" | "item";
}

type ButtonProps = ButtonWithLink | ButtonWithoutLink;

// TODO: add case where no href no link just output a regular button
// TODO: add case where there is a card variant but still display variant style
export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      id,
      children,
      className,
      link,
      href,
      disabled,
      onClick,
      variant,
      width,
      card,
      prefetch = true,
      hasArrow = true,
      hasDownload = false,
      scroll = true,
      openInNewTab = false,
      ...props
    },
    ref,
  ) => {
    const sanityOpenInNewTab = link?.openInNewTab ?? false;
    const isNavEvent = id?.includes("nav");
    const isFooterEvent = id?.includes("footer");
    const kebabHref = kebabCase(sanitizeForId(href || ""));
    const kebabLinkHref = kebabCase(sanitizeForId(link?.href || ""));
    const linkKey = link?._key;

    const getGTMEvent = () => {
      if (isNavEvent) return "nav";
      if (isFooterEvent) return "footer";
      if (!isNavEvent && !isFooterEvent) return "cta";
      return "item";
    };

    const GTM_HREF_ID = `${getGTMEvent()}-${kebabHref}`;
    const GTM_LINK_ID = `${getGTMEvent()}-${kebabLinkHref}-${linkKey}`;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Push to GTM dataLayer object
      sendGTMEvent({
        event: getGTMEvent(),
        value: id ? id : GTM_LINK_ID,
      });

      // Call any onClick handler that was passed in
      onClick?.(e);
    };

    // If this is a non-Sanity created link, then use the href that was explicitly passed in
    if (!link?.type && href) {
      return (
        <Link
          {...props}
          id={GTM_HREF_ID}
          href={href}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          scroll={scroll}
          onClick={handleClick}
          ref={ref}
          prefetch={prefetch}
          className={cn(
            ButtonVariants({ variant, width, disabled, card, className }),
          )}
        >
          <span>{children}</span>

          {hasArrow && (
            <Icon
              variant="arrow-right"
              className={`${openInNewTab ? "-rotate-45" : ""}`}
            />
          )}
          {/* Add download case */}
          {/* {hasDownload && (
          <Icon
            variant="download"
            className={`${openInNewTab ? "-rotate-45" : ""}`}
          />
        )} */}
        </Link>
      );
    }

    // Sanity-created button with the INTERNAL link type
    if (link?.type === "internal") {
      if (!link?.href) return null;
      return (
        <Link
          {...props}
          id={GTM_LINK_ID}
          href={`${link.anchorTag ? `${link.href}#${link.anchorTag}` : link.href}`}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          target={sanityOpenInNewTab ? "_blank" : undefined}
          rel={sanityOpenInNewTab ? "noopener noreferrer" : undefined}
          scroll={scroll}
          onClick={handleClick}
          ref={ref}
          prefetch={prefetch}
          className={cn(
            ButtonVariants({ variant, width, disabled, card, className }),
          )}
        >
          <span>{children}</span>

          {hasArrow && (
            <Icon
              variant="arrow-right"
              className={`${openInNewTab ? "-rotate-45" : ""}`}
            />
          )}
          {/* Add download case */}
          {/* {hasDownload && (
          <Icon
            variant="download"
            className={`${openInNewTab ? "-rotate-45" : ""}`}
          />
        )} */}
        </Link>
      );
    }

    // Sanity-created button with the EXTERNAL link type
    if (link?.type === "external") {
      if (!link?.href) return null;
      return (
        <a
          id={GTM_LINK_ID}
          href={`${link.href}`}
          rel="noopener noreferrer"
          target="_blank"
          className={cn(
            ButtonVariants({ variant, width, disabled, card, className }),
          )}
        >
          {children}
          {hasArrow && (
            <Icon
              variant="arrow-right"
              className={`${openInNewTab ? "-rotate-45" : ""}`}
            />
          )}
        </a>
      );
    }

    return null;
  },
);

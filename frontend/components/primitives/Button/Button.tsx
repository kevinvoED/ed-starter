import type { Link as SanityLink } from "@/sanity.types";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { HoverTextScramble } from "@/components/animations/GSAP/HoverTextScramble";
import { Dot } from "@/components/primitives/Dot/Dot";
import { Icon } from "@/components/primitives/Icon/Icon";
import { cn } from "@/lib/utils/cn";

export type ResolvedLinkType = Omit<SanityLink, "href"> & {
  _key: string;
  href: string | null;
};

const primaryStyles =
  "relative uppercase justify-between overflow-hidden before:absolute before:inset-0 before:w-0 before:transition-[width] before:duration-250 before:ease-[--button-bezier] hover:before:w-full [&>span]:relative [&>span]:z-10 [&>.dot-container]:relative [&>.dot-container]:z-10";

const secondaryStyles =
  "relative type-mono-1240 after:-bottom-1 justify-between min-w-44.5 overflow-x-visible overflow-y-visible border-b-2 pb-2 uppercase after:absolute after:left-0 after:h-0.5 after:w-[20%] after:transition-transform after:duration-500 after:ease-[--button-bezier] group-hover/featured-blog-post:after:translate-x-[400%] group-hover/blog-post:after:translate-x-[400%] hover:after:translate-x-[400%] [&>span]:transition-all [&>span]:duration-500 [&>span]:ease-[--button-bezier] [&>span]:will-change-transform hover:[&>span]:translate-x-2";

const tertiaryStyles = "type-mono-1240 uppercase has-[>svg]:gap-2.5";

export const ButtonVariants = cva(
  "group inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap outline-none transition-colors duration-300 ease-in-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-orange-500 has-[>svg]:gap-1.5 [&_svg]:size-3",
  {
    variants: {
      variant: {
        "primary-white-large": `${primaryStyles} bg-white text-black type-mono-1240 px-3 py-[11px] gap-x-8 before:bg-black hover:text-white`,
        "primary-white-small": `${primaryStyles} bg-white text-black type-mono-1240 px-3 py-[7px] gap-x-4 before:bg-black hover:text-white`,
        "primary-black-large": `${primaryStyles} bg-black text-white type-mono-1240 px-3 py-[11px] gap-x-8 before:bg-neon hover:text-black`,
        "primary-black-small": `${primaryStyles} bg-black text-white type-mono-1240 px-3 py-[7px] gap-x-4 before:bg-neon hover:text-black`,
        "primary-neon-white-large": `${primaryStyles} bg-neon text-black type-mono-1240 px-3 py-[11px] gap-x-8 before:bg-white hover:text-black`,
        "primary-neon-white-small": `${primaryStyles} bg-neon text-black type-mono-1240 px-3 py-[7px] gap-x-4 before:bg-white hover:text-black`,
        "primary-neon-black-large": `${primaryStyles} bg-neon text-black type-mono-1240 px-3 py-[11px] gap-x-8 before:bg-black hover:text-white`,
        "primary-neon-black-small": `${primaryStyles} bg-neon text-black type-mono-1240 px-3 py-[7px] gap-x-4 before:bg-black hover:text-white`,
        "secondary-white": `${secondaryStyles} text-white border-b-neon bg-transparent after:bg-neon`,
        "secondary-black": `${secondaryStyles} text-black border-b-black bg-transparent after:bg-black`,
        "tertiary-black": `${tertiaryStyles} text-black`,
        "tertiary-neon": `${tertiaryStyles} text-neon`,
        "tertiary-white": `${tertiaryStyles} text-white`,
        "tertiary-grey": `${tertiaryStyles} text-alabaster`,
        "copy-link":
          "type-mono-1240 has-[>svg]:!gap-1 bg-neon text-black uppercase",
        switch:
          "type-mono-1240 h-6 min-w-24 justify-center rounded-xs bg-transparent text-black uppercase",
        "switch-active":
          "type-mono-1240 h-6 min-w-24 justify-center rounded-xs bg-black text-white uppercase",
        "footer-link": "type-mono-1240 uppercase",
        card: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        icon: "bg-transparent",
        "blog-category":
          "type-mono-1240 relative py-[1px] uppercase transition-all transition-colors duration-300 ease-in-out ease-in-out hover:bg-black hover:text-white [&>span]:hover:relative [&>span]:hover:translate-x-1 [&>span]:hover:bg-black [&>span]:hover:px-4 [&>span]:hover:transition-transform [&>span]:hover:duration-300 [&>span]:hover:ease-in-out",
        "blog-category-active":
          "type-mono-1240 relative bg-black px-4 py-[1px] text-white uppercase transition-all transition-colors duration-300 ease-in-out ease-in-out [&>span]:translate-x-1 [&>span]:bg-black [&>span]:transition-transform [&>span]:duration-300 [&>span]:ease-in-out",
        pagination:
          "type-heading-3230 !duration-0 max-h-10 w-10 justify-center bg-transparent p-5 transition-colors hover:bg-black hover:text-white lg:max-h-14 lg:min-w-14",
        "pagination-active":
          "type-heading-3230 max-h-10 w-10 justify-center bg-black p-5 text-white lg:max-h-14 lg:min-w-14",
        "pagination-chevron":
          "h-10 w-10 items-center justify-center lg:h-14 lg:min-w-14",
        ghost: "type-mono-1240",
      },
    },
    defaultVariants: {
      variant: "primary-white-large",
    },
  },
);

type ButtonProps = {
  link?: ResolvedLinkType;
  children?: React.ReactNode;
  className?: string;
  hasArrow?: boolean;
  disabled?: boolean;
  href?: string;
  openInNewTab?: boolean;
  id?: string;
  scroll?: boolean;
  onClick?: () => void;
  ref?: React.RefObject<HTMLAnchorElement | null>;
} & VariantProps<typeof ButtonVariants>;

export const Button = ({
  variant,
  disabled,
  link,
  children,
  className,
  hasArrow = true,
  href,
  openInNewTab = false,
  id,
  onClick,
  scroll = true,
  ref,
}: ButtonProps) => {
  const isPrimaryVariant = variant?.includes("primary-");

  const getDotColor = ({
    variant,
  }: {
    variant: VariantProps<typeof ButtonVariants>["variant"];
  }) => {
    if (
      variant === "primary-black-large" ||
      variant === "primary-black-small"
    ) {
      return "white";
    }
    return "black";
  };

  if (disabled && link) {
    return (
      <div
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        <span>{children}</span>
        {hasArrow && !openInNewTab && <Icon variant="arrow-right" />}
        {hasArrow && openInNewTab && (
          <Icon variant="copy" className="-rotate-45" />
        )}
      </div>
    );
  }

  if (variant === "copy-link") {
    return (
      <button
        type="button"
        id={id}
        disabled={disabled || false}
        aria-disabled={disabled}
        onClick={onClick}
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        <Icon variant="copy" />
        <span>{children}</span>
      </button>
    );
  }

  if (variant === "switch" || variant === "switch-active") {
    return (
      <button
        type="button"
        id={id}
        disabled={disabled || false}
        aria-disabled={disabled}
        onClick={onClick}
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        {children}
      </button>
    );
  }

  if (variant === "card" && link) {
    return (
      <Link
        id={id}
        href={link?.href || ""}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        onClick={onClick}
        scroll={scroll}
        ref={ref}
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        {children}
      </Link>
    );
  }

  // If a href prop is explicitly provided, override the Button with that href prop instead
  if (href && !link) {
    return (
      <Link
        id={id}
        href={href}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        scroll={scroll}
        onClick={onClick}
        ref={ref}
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        <span>{children}</span>
        {hasArrow && !openInNewTab && <Icon variant="arrow-right" />}
        {hasArrow && openInNewTab && (
          <Icon variant="copy" className="-rotate-45" />
        )}
      </Link>
    );
  }

  if (link && !href) {
    if (variant?.includes("tertiary-")) {
      return (
        <Link
          id={id}
          href={link?.href || ""}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          target={link?.openInNewTab ? "_blank" : undefined}
          rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
          scroll={scroll}
          onClick={onClick}
          ref={ref}
          className={ButtonVariants({
            variant: variant,
            className,
          })}
        >
          <HoverTextScramble className="flex items-center gap-x-2.5">
            [<span>{children}</span>
            {hasArrow && !openInNewTab && !isPrimaryVariant && (
              <Icon variant="arrow-right" />
            )}
            {hasArrow && openInNewTab && !isPrimaryVariant && (
              <Icon variant="arrow-right" className="-rotate-45" />
            )}
            {isPrimaryVariant && (
              <Dot
                color={getDotColor({ variant: variant })}
                className={cn(
                  "relative z-10 transition-colors duration-200 ease-[--button-bezier]",
                  variant?.startsWith("primary-white-") &&
                    "group-hover:bg-white",
                  variant?.startsWith("primary-black-") &&
                    "group-hover:bg-black",
                  variant?.startsWith("primary-neon-white") &&
                    "group-hover:bg-black",
                  variant?.startsWith("primary-neon-black") &&
                    "group-hover:bg-white",
                )}
              />
            )}
            ]
          </HoverTextScramble>
        </Link>
      );
    }

    return (
      <Link
        id={id}
        href={link?.href || ""}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        scroll={scroll}
        onClick={onClick}
        ref={ref}
        className={ButtonVariants({
          variant: variant,
          className,
        })}
      >
        <span>{children}</span>

        {hasArrow && !openInNewTab && !isPrimaryVariant && (
          <Icon variant="arrow-right" />
        )}
        {hasArrow && openInNewTab && !isPrimaryVariant && (
          <Icon variant="arrow-right" className="-rotate-45" />
        )}
        {isPrimaryVariant && (
          <Dot
            color={getDotColor({ variant: variant })}
            className={cn(
              "relative z-10 transition-colors duration-200 ease-[--button-bezier]",
              variant?.startsWith("primary-white-") && "group-hover:bg-white",
              variant?.startsWith("primary-black-") && "group-hover:bg-black",
              variant?.startsWith("primary-neon-white") &&
                "group-hover:bg-black",
              variant?.startsWith("primary-neon-black") &&
                "group-hover:bg-white",
            )}
          />
        )}
      </Link>
    );
  }

  return (
    <Link
      id={id}
      href={link?.href || ""}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      target={link?.openInNewTab ? "_blank" : undefined}
      rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
      scroll={scroll}
      onClick={onClick}
      ref={ref}
      className={ButtonVariants({
        variant: variant,
        className,
      })}
    >
      {children}
    </Link>
  );
};

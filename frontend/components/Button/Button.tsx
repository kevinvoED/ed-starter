import type { Cta as CtaType } from "@/sanity.types";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import { cn } from "@/lib/utils/cn";
import { handleResolveCta } from "@/sanity/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const ButtonVariants = cva(
  "group relative inline-flex max-w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-sm outline-none transition-colors duration-300 ease-in-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-orange-500 has-[>svg]:gap-2 [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-800",
        secondary: "bg-amber-600 text-white hover:bg-amber-800",
        tertiary: "bg-purple-600 text-white hover:bg-purple-800",
        outline: "bg-transparent text-black ring-1 ring-black",
        card: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        icon: "rounded-full bg-transparent text-black ring-1 ring-black hover:bg-blue hover:text-white hover:ring-blue",
        ghost: "",
        spur: "type-mono-1040 after:-bottom-1 min-w-[180px] justify-between overflow-x-visible overflow-y-visible rounded-none border-b-2 border-b-black bg-transparent pb-2 uppercase after:absolute after:left-0 after:h-0.5 after:w-[20%] after:bg-black after:transition-transform after:duration-500 after:ease-[--button-bezier] hover:after:translate-x-[400%] [&>span]:transition-all [&>span]:duration-500 [&>span]:ease-[--button-bezier] [&>span]:will-change-transform hover:[&>span]:translate-x-2",
        animation:
          "justify-start rounded-none bg-white pt-3 pr-10.5 pb-2.5 pl-6",
      },
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2.5",
        lg: "px-4 py-2.5 lg:px-8 lg:py-5.5",
        icon: "min-h-10 min-w-10",
        none: "",
      },
      disabled: {
        true: [
          "opacity-50",
          "cursor-not-allowed",
          "pointer-events-none",
          "select-none",
        ],
        false: null,
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      disabled: false,
    },
  },
);

type ButtonProps = {
  cta?: CtaType | undefined;
  children: React.ReactNode;
  className?: string;
  hasArrow?: boolean;
  href?: string;
  openInNewTab?: boolean;
} & VariantProps<typeof ButtonVariants>;

export const Button = ({
  cta,
  children,
  className,
  variant,
  size,
  disabled,
  href,
  openInNewTab = false,
  hasArrow = true,
}: ButtonProps) => {
  const resolvedUrl = cta && handleResolveCta(cta);
  const isNewTab = cta?.openInNewTab;

  // If a href prop is explicitlyprovided, override the Button with that href prop
  if (href && !cta) {
    return (
      <>
        <Link
          tabIndex={disabled ? -1 : 0}
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className={cn(
            ButtonVariants({ variant: variant, size, disabled, className }),
          )}
        >
          <span>{children}</span>
          {hasArrow && !openInNewTab && <ArrowRightIcon />}
          {hasArrow && openInNewTab && (
            <ArrowRightIcon className="-rotate-45" />
          )}
        </Link>

        <Slot
          data-slot="button"
          className={cn(
            ButtonVariants({ variant: finalVariant, size, className }),
          )}
          {...props}
        >
          <Link
            href={link?.href || ""}
            target={link?.target && link?.isExternal ? "_blank" : undefined}
            rel={link?.target && link?.isExternal ? "noopener" : undefined}
          >
            <AnimateButtonWrapper variant={finalVariant}>
              {buttonContent()}
            </AnimateButtonWrapper>
          </Link>
        </Slot>
      </>
    );
  }

  // Otherwise, render the button using the cta provided in Sanity Studio
  if (cta && !href && typeof resolvedUrl === "string") {
    return (
      <Link
        tabIndex={disabled ? -1 : 0}
        href={resolvedUrl}
        target={cta?.openInNewTab ? "_blank" : undefined}
        rel={cta?.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          ButtonVariants({ variant: variant, size, disabled, className }),
        )}
      >
        <span
          className={cn(
            variant === "animation" &&
              "group-hover:-translate-y-[200%] flex items-center transition-transform duration-700 ease-(--button-bezier)",
          )}
        >
          {children}
        </span>

        {hasArrow && !isNewTab && variant !== "animation" && <ArrowRightIcon />}
        {hasArrow && isNewTab && variant !== "animation" && (
          <ArrowRightIcon className="-rotate-45" />
        )}

        {variant === "animation" && (
          <>
            {/* Flip animation text */}
            <span
              className="absolute inset-0 flex translate-y-full items-center pl-6 transition-transform duration-700 ease-(--button-bezier) group-hover:translate-y-0"
              aria-hidden="true"
            >
              {children}
            </span>

            {/* Background long bars */}
            <div
              className="absolute top-0 right-0 grid h-full grid-cols-[3px_6px_6px_3px]"
              aria-hidden="true"
            >
              <div className="bg-white" />
              <div className="bg-black" />
              <div className="bg-white" />
              <div className="bg-black" />
            </div>

            {/* Animated small bars */}
            <div
              className="absolute top-0 right-0 grid h-2.5 grid-cols-[3px_6px_6px_3px] bg-white transition-all duration-700 ease-(--button-bezier) group-hover:top-[calc(85%-10px)]"
              aria-hidden
            >
              <div className="bg-black" />
              <div className="bg-white" />
              <div className="bg-black" />
              <div className="bg-white" />
            </div>
          </>
        )}
      </Link>
    );
  }
  return <>{children}</>;
};

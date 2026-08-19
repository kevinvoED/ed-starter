"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Tooltip component
 * @docs: https://base-ui.com/react/components/tooltip
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Tooltip components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <TooltipProvider>
 *    <TooltipRoot>
 *      <TooltipTrigger aria-label="More information">?</TooltipTrigger>
 *      <TooltipPortal>
 *        <TooltipPositioner>
 *          <TooltipPopup>
 *            <TooltipArrow />
 *            Helpful hint for sighted users.
 *          </TooltipPopup>
 *        </TooltipPositioner>
 *      </TooltipPortal>
 *    </TooltipRoot>
 *  </TooltipProvider>
 */

const TooltipPopupVariants = cva(
  "z-50 origin-(--transform-origin) outline-hidden transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-starting-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      variant: {
        default:
          "border border-black bg-black text-white shadow-[0.25rem_0.25rem_0] shadow-black/12",
      },
      size: {
        default: "type-body-1440 max-w-fit rounded-md px-3 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const TooltipArrowVariants = cva(
  "rotate-45 rounded-[2px] transition-[left,top,right,bottom] duration-100 ease-out data-[side=bottom]:top-[-5px] data-[side=left]:right-[-8px] data-[side=top]:bottom-[-5px] data-[side=right]:left-[-8px]",
  {
    variants: {
      variant: {
        default: "border border-black bg-black",
      },
      size: {
        default: "size-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider {...props} />;
}

function TooltipRoot({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger({
  className,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function TooltipPortal({ ...props }: TooltipPrimitive.Portal.Props) {
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />;
}

function TooltipPositioner({
  className,
  sideOffset = 8,
  ...props
}: TooltipPrimitive.Positioner.Props) {
  return (
    <TooltipPrimitive.Positioner
      data-slot="tooltip-positioner"
      sideOffset={sideOffset}
      className={cn("z-50 outline-hidden", className)}
      {...props}
    />
  );
}

type TooltipPopupProps = TooltipPrimitive.Popup.Props &
  VariantProps<typeof TooltipPopupVariants>;

function TooltipPopup({
  className,
  variant,
  size,
  ...props
}: TooltipPopupProps) {
  return (
    <TooltipPrimitive.Popup
      data-slot="tooltip-popup"
      className={cn(TooltipPopupVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type TooltipArrowProps = TooltipPrimitive.Arrow.Props &
  VariantProps<typeof TooltipArrowVariants>;

function TooltipArrow({
  className,
  variant,
  size,
  ...props
}: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn(TooltipArrowVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function TooltipViewport({
  className,
  ...props
}: TooltipPrimitive.Viewport.Props) {
  return (
    <TooltipPrimitive.Viewport
      data-slot="tooltip-viewport"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipViewport,
};

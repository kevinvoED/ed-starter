"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Popover component
 * @docs: https://base-ui.com/react/components/popover
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Popover components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <PopoverRoot>
 *    <PopoverTrigger>Open</PopoverTrigger>
 *    <PopoverPortal>
 *      <PopoverPositioner>
 *        <PopoverPopup>
 *          <PopoverTitle>Title</PopoverTitle>
 *          <PopoverDescription>Description text here.</PopoverDescription>
 *          <PopoverClose>Close</PopoverClose>
 *        </PopoverPopup>
 *      </PopoverPositioner>
 *    </PopoverPortal>
 *  </PopoverRoot>
 *
 * ---------------------
 * Usage Example: With arrow
 * ---------------------
 *  <PopoverRoot>
 *    <PopoverTrigger>Open</PopoverTrigger>
 *    <PopoverPortal>
 *      <PopoverPositioner>
 *        <PopoverPopup>
 *          <PopoverArrow />
 *          <PopoverTitle>Title</PopoverTitle>
 *          <PopoverDescription>Description text here.</PopoverDescription>
 *        </PopoverPopup>
 *      </PopoverPositioner>
 *    </PopoverPortal>
 *  </PopoverRoot>
 *
 * ---------------------
 * Usage Example: Controlled with onOpenChange
 * ---------------------
 *  const [open, setOpen] = useState(false);
 *
 *  <PopoverRoot open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
 *    <PopoverTrigger>Open</PopoverTrigger>
 *    <PopoverPortal>
 *      <PopoverPositioner>
 *        <PopoverPopup>
 *          <PopoverTitle>Title</PopoverTitle>
 *          <PopoverClose>Close</PopoverClose>
 *        </PopoverPopup>
 *      </PopoverPositioner>
 *    </PopoverPortal>
 *  </PopoverRoot>
 *
 * ---------------------
 * Usage Example: Modal with backdrop
 * ---------------------
 *  <PopoverRoot modal={true}>
 *    <PopoverTrigger>Open</PopoverTrigger>
 *    <PopoverPortal>
 *      <PopoverBackdrop />
 *      <PopoverPositioner>
 *        <PopoverPopup>
 *          <PopoverTitle>Title</PopoverTitle>
 *          <PopoverClose>Close</PopoverClose>
 *        </PopoverPopup>
 *      </PopoverPositioner>
 *    </PopoverPortal>
 *  </PopoverRoot>
 *
 * ---------------------
 * Usage Example: Trigger variants
 * ---------------------
 *  <PopoverRoot>
 *    <PopoverTrigger variant="default" size="default">Open</PopoverTrigger>
 *    ...
 *  </PopoverRoot>
 *
 *  {/* Custom trigger — bypass variant entirely via className *\/}
 *  <PopoverRoot>
 *    <PopoverTrigger className="rounded-full bg-black px-4 py-2 text-white">
 *      Open
 *    </PopoverTrigger>
 *    ...
 *  </PopoverRoot>
 */

const PopoverTriggerVariants = cva(
  "inline-flex cursor-pointer items-center gap-2 outline-none transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50 data-popup-open:opacity-80",
  {
    variants: {
      variant: {
        default:
          "border border-black px-3 py-1.5 text-black hover:bg-black/10 active:bg-black/10",
      },
      size: {
        default: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const PopoverPopupVariants = cva(
  "flex origin-(--transform-origin) flex-col gap-1 outline-hidden transition-[scale,opacity] duration-150 ease-out data-ending-style:scale-[0.98] data-starting-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      variant: {
        default:
          "border border-black bg-white text-black shadow-[0.25rem_0.25rem_0] shadow-black/12",
      },
      size: {
        default: "max-w-xs rounded-md px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const PopoverArrowVariants = cva(
  "rotate-45 rounded-[2px] transition-[left,top,right,bottom] duration-100 ease-out data-[side=bottom]:top-[-5px] data-[side=left]:right-[-8px] data-[side=top]:bottom-[-5px] data-[side=right]:left-[-8px]",
  {
    variants: {
      variant: {
        default: "border border-black bg-white",
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

function PopoverRoot({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root {...props} />;
}

type PopoverTriggerProps = PopoverPrimitive.Trigger.Props &
  VariantProps<typeof PopoverTriggerVariants>;

function PopoverTrigger({
  className,
  variant,
  size,
  ...props
}: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn(PopoverTriggerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal {...props} />;
}

function PopoverPositioner({
  className,
  sideOffset = 8,
  ...props
}: PopoverPrimitive.Positioner.Props) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      sideOffset={sideOffset}
      className={cn("z-50 outline-hidden", className)}
      {...props}
    />
  );
}

type PopoverPopupProps = PopoverPrimitive.Popup.Props &
  VariantProps<typeof PopoverPopupVariants>;

function PopoverPopup({
  className,
  variant,
  size,
  ...props
}: PopoverPopupProps) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={cn(PopoverPopupVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type PopoverArrowProps = PopoverPrimitive.Arrow.Props &
  VariantProps<typeof PopoverArrowVariants>;

function PopoverArrow({
  className,
  variant,
  size,
  ...props
}: PopoverArrowProps) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn(PopoverArrowVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function PopoverBackdrop({
  className,
  ...props
}: PopoverPrimitive.Backdrop.Props) {
  return (
    <PopoverPrimitive.Backdrop
      data-slot="popover-backdrop"
      className={cn(
        "fixed inset-0 bg-black/20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("h-full", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("", className)}
      {...props}
    />
  );
}

function PopoverClose({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(
        "inline-flex cursor-pointer items-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

export {
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
};

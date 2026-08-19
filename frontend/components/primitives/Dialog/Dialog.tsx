"use client";

import type * as React from "react";
import { Button } from "@base-ui/react/button";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";
import { useLenis } from "lenis/react";
import { XIcon } from "lucide-react";

/*
 * Based off of Base UI's Dialog component
 * @docs: https://base-ui.com/react/components/dialog
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Dialog components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * IMPORTANT: The LenisWrapper overrides typical scroll behavior of Base UI and shad/cn components.
 * Traditionally, these components prevent the user from scrolling.
 * useLenis stops or starts Lenis with the onOpenChange callback to restore expected behavior.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <DialogRoot>
 *    <DialogTrigger>Open</DialogTrigger>
 *    <DialogContent>
 *      Your content here
 *    </DialogContent>
 *  </DialogRoot>
 *
 * ---------------------
 * Usage Example: Full dialog with header and footer
 * ---------------------
 *  <DialogRoot>
 *    <DialogTrigger>Edit profile</DialogTrigger>
 *    <DialogContent>
 *      <DialogHeader>
 *        <DialogTitle>Edit profile</DialogTitle>
 *        <DialogDescription>
 *          Make changes to your profile here. Click save when you are done.
 *        </DialogDescription>
 *      </DialogHeader>
 *      <div className="flex-1">Your content here</div>
 *      <DialogFooter>
 *        <Button type="submit">Save changes</Button>
 *        <DialogClose>Cancel</DialogClose>
 *      </DialogFooter>
 *    </DialogContent>
 *  </DialogRoot>
 *
 * ---------------------
 * Usage Example: Controlled with onOpenChange
 * ---------------------
 *  const [open, setOpen] = useState(false);
 *
 *  <DialogRoot open={open} onOpenChange={setOpen}>
 *    <DialogTrigger>Open settings</DialogTrigger>
 *    <DialogContent>
 *      <DialogTitle>Settings</DialogTitle>
 *    </DialogContent>
 *  </DialogRoot>
 *
 * ---------------------
 * Usage Example: Controlled with side effects in onOpenChange
 * ---------------------
 *  <DialogRoot
 *    open={open}
 *    onOpenChange={(nextOpen) => {
 *      setOpen(nextOpen);
 *      if (!nextOpen) trackDialogDismissed();
 *    }}
 *  >
 *    <DialogTrigger>Open</DialogTrigger>
 *    <DialogContent>Content</DialogContent>
 *  </DialogRoot>
 */

const DialogOverlayVariants = cva(
  "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 duration-100 data-closed:animate-out data-open:animate-in data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
  {
    variants: {
      variant: {
        default: "bg-black/10",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const DialogContentVariants = cva(
  "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-clip-padding shadow-lg outline-none duration-200 ease-in-out data-closed:animate-out data-open:animate-in sm:max-w-lg",
  {
    variants: {
      variant: {
        default: "border border-alabaster bg-black text-white",
      },
      size: {
        default: "rounded-lg p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function DialogRoot({ onOpenChange, ...props }: DialogPrimitive.Root.Props) {
  const lenis = useLenis();

  // Lock Lenis scroll when the sheet is opened or closed
  const handleOpenChange = (
    open: boolean,
    eventDetails: DialogPrimitive.Root.ChangeEventDetails,
  ) => {
    open ? lenis?.stop() : lenis?.start();
    onOpenChange?.(open, eventDetails);
  };

  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
}

function DialogTrigger({ children, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
}

function DialogClose({ children, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close data-slot="dialog-close" {...props}>
      {children}
    </DialogPrimitive.Close>
  );
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

type DialogOverlayProps = DialogPrimitive.Backdrop.Props &
  VariantProps<typeof DialogOverlayVariants>;

function DialogOverlay({
  className,
  variant,
  size,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(DialogOverlayVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type DialogContentProps = DialogPrimitive.Popup.Props &
  VariantProps<typeof DialogContentVariants> & {
    showCloseButton?: boolean;
  };

function DialogContent({
  className,
  variant,
  size,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(DialogContentVariants({ variant, size, className }))}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button className="absolute top-3 right-3">
                <XIcon />
                <span className="sr-only">Close</span>
              </Button>
            }
          />
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("type-heading-2430 font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("type-body-1640 text-silver", className)}
      {...props}
    />
  );
}

export {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
};

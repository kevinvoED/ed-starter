import type { PropsWithChildren } from "react";

// ForwardRefExoticComponent no longer accepts 'children' prop in React 18.2+ and TypeScript 5.x+
// See: https://github.com/radix-ui/primitives/issues/2309#issuecomment-1916541133
declare module "@radix-ui/react-accordion" {
  export interface AccordionSingleProps extends PropsWithChildren {
    className?: string;
  }
  export interface AccordionMultipleProps extends PropsWithChildren {
    className?: string;
  }
  export interface AccordionItemProps extends PropsWithChildren {
    className?: string;
  }
  export interface AccordionHeaderProps extends PropsWithChildren {
    className?: string;
  }
  export interface AccordionTriggerProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
  }
  export interface AccordionContentProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/navigation-menu" {
  export interface NavigationMenuProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuListProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuItemProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuTriggerProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuContentProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuLinkProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuIndicatorProps extends PropsWithChildren {
    className?: string;
  }
  export interface NavigationMenuViewportProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/popover" {
  export interface PopoverProps extends PropsWithChildren {
    className?: string;
  }
  export interface PopoverTriggerProps extends PropsWithChildren {
    className?: string;
  }
  export interface PopoverContentProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/dialog" {
  export interface DialogProps extends PropsWithChildren {
    className?: string;
  }
  export interface DialogTriggerProps extends PropsWithChildren {
    className?: string;
  }
  export interface DialogContentProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/react-progress" {
  export interface ProgressProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    value?: number;
  }
  export interface ProgressIndicatorProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
  }
}

declare module "@radix-ui/react-tabs" {
  export interface TabsProps extends PropsWithChildren {
    className?: string;
  }
  export interface TabsListProps extends PropsWithChildren {
    className?: string;
  }
  export interface TabsTriggerProps extends PropsWithChildren {
    className?: string;
  }
  export interface TabsContentProps extends PropsWithChildren {
    className?: string;
  }
}

declare module "@radix-ui/react-dialog" {
  export interface DialogProps extends PropsWithChildren {
    className?: string;
  }
  export interface DialogTriggerProps extends PropsWithChildren {
    className?: string;
    asChild?: boolean;
  }
  export interface DialogCloseProps extends PropsWithChildren {
    className?: string;
    asChild?: boolean;
  }
  export interface DialogTitleProps extends PropsWithChildren {
    className?: string;
  }
  export interface DialogDescriptionProps extends PropsWithChildren {
    className?: string;
  }
  export interface DialogOverlayProps extends PropsWithChildren {
    className?: string;
  }
}

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@/components/primitives/Icon/Icon";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Combobox component
 * @docs: https://base-ui.com/react/components/combobox
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Combobox components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic (uncontrolled)
 * ---------------------
 *  const fruits = ["apple", "banana", "orange"];
 *
 *  <ComboboxRoot items={fruits} defaultValue={fruits[0]}>
 *    <ComboboxLabel>Fruit</ComboboxLabel>
 *    <ComboboxInputGroup>
 *      <ComboboxInput placeholder="Choose a fruit" />
 *      <ComboboxTrigger aria-label="Open fruit list">
 *        <ComboboxIcon>
 *          <Icon variant="caret-up-down" className="size-3" />
 *        </ComboboxIcon>
 *      </ComboboxTrigger>
 *    </ComboboxInputGroup>
 *    <ComboboxContent>
 *      <ComboboxList>
 *        {(item) => (
 *          <ComboboxItem key={item} value={item}>
 *            {item}
 *          </ComboboxItem>
 *        )}
 *      </ComboboxList>
 *      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
 *    </ComboboxContent>
 *  </ComboboxRoot>
 *
 * ---------------------
 * Usage Example: Controlled with onValueChange
 * ---------------------
 *  const [value, setValue] = useState<string | null>(null);
 *
 *  <ComboboxRoot items={fruits} value={value} onValueChange={setValue}>
 *    <ComboboxInputGroup>
 *      <ComboboxInput placeholder="Choose a fruit" />
 *      <ComboboxTrigger aria-label="Open fruit list">
 *        <ComboboxIcon>
 *          <Icon variant="caret-up-down" className="size-3" />
 *        </ComboboxIcon>
 *      </ComboboxTrigger>
 *    </ComboboxInputGroup>
 *    <ComboboxContent>
 *      <ComboboxList>
 *        {(item) => (
 *          <ComboboxItem key={item} value={item}>
 *            {item}
 *          </ComboboxItem>
 *        )}
 *      </ComboboxList>
 *    </ComboboxContent>
 *  </ComboboxRoot>
 *
 * ---------------------
 * Usage Example: Filter input with onInputValueChange
 * ---------------------
 *  <ComboboxRoot
 *    items={fruits}
 *    onInputValueChange={(query) => {
 *      analytics.track("combobox_filter", { query });
 *    }}
 *  >
 *    <ComboboxInputGroup>
 *      <ComboboxInput placeholder="Search fruits" />
 *      <ComboboxTrigger aria-label="Open fruit list">
 *        <ComboboxIcon>
 *          <Icon variant="caret-up-down" className="size-3" />
 *        </ComboboxIcon>
 *      </ComboboxTrigger>
 *    </ComboboxInputGroup>
 *    <ComboboxContent>
 *      <ComboboxList>
 *        {(item) => (
 *          <ComboboxItem key={item} value={item}>
 *            {item}
 *          </ComboboxItem>
 *        )}
 *      </ComboboxList>
 *      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
 *    </ComboboxContent>
 *  </ComboboxRoot>
 *
 * ---------------------
 * Usage Example: Disabled
 * ---------------------
 *  <ComboboxRoot items={fruits} disabled defaultValue={fruits[0]}>
 *    <ComboboxInputGroup>
 *      <ComboboxInput placeholder="Choose a fruit" />
 *      <ComboboxTrigger aria-label="Open fruit list">
 *        <ComboboxIcon>
 *          <Icon variant="caret-up-down" className="size-3" />
 *        </ComboboxIcon>
 *      </ComboboxTrigger>
 *    </ComboboxInputGroup>
 *    <ComboboxContent>
 *      <ComboboxList>
 *        {(item) => (
 *          <ComboboxItem key={item} value={item}>
 *            {item}
 *          </ComboboxItem>
 *        )}
 *      </ComboboxList>
 *    </ComboboxContent>
 *  </ComboboxRoot>
 *
 * ---------------------
 * Usage Example: Item indicator
 * ---------------------
 *  <ComboboxRoot items={fruits} defaultValue={fruits[0]}>
 *    <ComboboxInputGroup>
 *      <ComboboxInput placeholder="Choose a fruit" />
 *      <ComboboxTrigger aria-label="Open fruit list">
 *        <ComboboxIcon>
 *          <Icon variant="caret-up-down" className="size-3" />
 *        </ComboboxIcon>
 *      </ComboboxTrigger>
 *    </ComboboxInputGroup>
 *    <ComboboxContent>
 *      <ComboboxList>
 *        {(item) => (
 *          <ComboboxItem key={item} value={item} showIndicator>
 *            {item}
 *          </ComboboxItem>
 *        )}
 *      </ComboboxList>
 *    </ComboboxContent>
 *  </ComboboxRoot>
 */

const ComboboxInputGroupVariants = cva(
  "flex min-w-56 items-center gap-1 outline-none transition-colors duration-100 focus-within:outline-2 focus-within:outline-black focus-within:-outline-offset-1 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-black bg-white data-popup-open:bg-black/5",
      },
      size: {
        default: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const ComboboxInputVariants = cva(
  "min-w-0 flex-1 bg-transparent outline-none placeholder:text-black/40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-black text-sm",
      },
      size: {
        default: "px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const ComboboxTriggerVariants = cva(
  "inline-flex shrink-0 cursor-default select-none items-center justify-center outline-none transition-colors duration-100 disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-black hover:not-data-disabled:bg-black/10 active:not-data-disabled:bg-black/10",
      },
      size: {
        default: "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const ComboboxPopupVariants = cva(
  "max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto outline-hidden transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-starting-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      variant: {
        default:
          "border border-black bg-white bg-clip-padding text-black shadow-[0.25rem_0.25rem_0] shadow-black/12",
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

const ComboboxItemVariants = cva(
  "grid cursor-default select-none scroll-my-1 items-center gap-2 py-1.5 pr-2.5 pl-2.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [@media(hover:hover)]:data-highlighted:bg-black/10 [@media(hover:hover)]:data-highlighted:text-black/80",
  {
    variants: {
      variant: {
        default: "",
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

function ComboboxRoot<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple>,
) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.Label.Props) {
  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      className={cn("cursor-default", className)}
      {...props}
    />
  );
}

type ComboboxInputGroupProps = ComboboxPrimitive.InputGroup.Props &
  VariantProps<typeof ComboboxInputGroupVariants>;

function ComboboxInputGroup({
  className,
  variant,
  size,
  ...props
}: ComboboxInputGroupProps) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn(ComboboxInputGroupVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type ComboboxInputProps = ComboboxPrimitive.Input.Props &
  VariantProps<typeof ComboboxInputVariants>;

function ComboboxInput({
  className,
  variant,
  size,
  ...props
}: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(ComboboxInputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props &
  VariantProps<typeof ComboboxTriggerVariants>;

function ComboboxTrigger({
  className,
  variant,
  size,
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(ComboboxTriggerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function ComboboxIcon({ className, ...props }: ComboboxPrimitive.Icon.Props) {
  return (
    <ComboboxPrimitive.Icon
      data-slot="combobox-icon"
      className={cn(className)}
      {...props}
    />
  );
}

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Omit<ComboboxPrimitive.Positioner.Props, "className" | "children"> &
  Pick<ComboboxPrimitive.Portal.Props, "container"> &
  VariantProps<typeof ComboboxPopupVariants>;

function ComboboxContent({
  className,
  children,
  variant,
  size,
  sideOffset = 8,
  side = "bottom",
  align = "start",
  alignOffset,
  arrowPadding,
  collisionBoundary,
  collisionPadding,
  sticky,
  disableAnchorTracking = false,
  positionMethod = "absolute",
  container,
  ...popupProps
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal container={container}>
      <ComboboxPrimitive.Positioner
        data-slot="combobox-positioner"
        className="z-10 outline-hidden"
        sideOffset={sideOffset}
        side={side}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        disableAnchorTracking={disableAnchorTracking}
        positionMethod={positionMethod}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-popup"
          className={cn(ComboboxPopupVariants({ variant, size, className }))}
          {...popupProps}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("p-1", className)}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("px-2.5 py-1.5 text-black/60 text-sm", className)}
      {...props}
    />
  );
}

type ComboboxItemProps = ComboboxPrimitive.Item.Props & {
  showIndicator?: boolean;
} & VariantProps<typeof ComboboxItemVariants>;

function ComboboxItem({
  className,
  children,
  showIndicator = false,
  variant,
  size,
  ...props
}: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        ComboboxItemVariants({ variant, size }),
        showIndicator ? "grid-cols-[1rem_1fr]" : "grid-cols-1",
        className,
      )}
      {...props}
    >
      {showIndicator && (
        <ComboboxPrimitive.ItemIndicator
          data-slot="combobox-item-indicator"
          className="col-start-1"
        >
          <Icon variant="check" strokeWidth={1.5} />
        </ComboboxPrimitive.ItemIndicator>
      )}
      <span className={showIndicator ? "col-start-2" : "col-start-1"}>
        {children}
      </span>
    </ComboboxPrimitive.Item>
  );
}

export {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxRoot,
  ComboboxTrigger,
};

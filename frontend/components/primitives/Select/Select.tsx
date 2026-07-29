"use client";

import { Icon } from "@/components/primitives/Icon/Icon";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Select component
 * @docs: https://base-ui.com/react/components/select
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Select components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example
 * ---------------------
 *  <Select defaultValue={items[0]}>
 *    <SelectLabel>Items</SelectLabel>
 *    <SelectTrigger>
 *      <SelectValue>{(item) => <span>{item}</span>}</SelectValue>
 *      <SelectIcon><Icon variant="caret-up-down" className="size-3" /></SelectIcon>
 *    </SelectTrigger>
 *    <SelectContent>
 *      {items.map((item) => (
 *        <SelectItem key={item} value={item}>
 *          {item}
 *        </SelectItem>
 *      ))}
 *    </SelectContent>
 *  </Select>
 */

function Select<Value>(props: SelectPrimitive.Root.Props<Value>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectLabel({ className, ...props }: SelectPrimitive.Label.Props) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("cursor-default", className)}
      {...props}
    />
  );
}

function SelectTrigger({ className, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-8 min-w-56 select-none items-center justify-between gap-3 whitespace-nowrap border border-black pr-1 pl-2 font-normal text-black text-sm leading-none",
        "hover:not-data-disabled:bg-black/10 focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-1 active:not-data-disabled:bg-black/10",
        "disabled:border-black/20 disabled:text-black/20 data-disabled:border-black/20 data-popup-open:bg-black/50 data-disabled:text-black/20",
        className,
      )}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("data-placeholder:text-black/10", className)}
      {...props}
    />
  );
}

function SelectIcon({ className, ...props }: SelectPrimitive.Icon.Props) {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={cn(className)}
      {...props}
    />
  );
}

type SelectContentProps = SelectPrimitive.Popup.Props &
  Omit<SelectPrimitive.Positioner.Props, "className" | "children"> &
  Pick<SelectPrimitive.Portal.Props, "container">;

function SelectContent({
  className,
  children,
  // Positioner props
  sideOffset = 8,
  alignItemWithTrigger = false,
  side = "bottom",
  align = "center",
  arrowPadding,
  collisionBoundary,
  collisionPadding,
  sticky,
  disableAnchorTracking = false,
  positionMethod = "absolute",
  // Portal props
  container,
  ...popupProps
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        className="z-10 outline-hidden"
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        align={align}
        arrowPadding={arrowPadding}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        disableAnchorTracking={disableAnchorTracking}
        positionMethod={positionMethod}
      >
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(
            "group max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto",
            "border border-black bg-white bg-clip-padding text-black shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-hidden",
            "transition-[scale,opacity] duration-100 ease-out data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:transition-none data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-ending-style:scale-[0.98] data-starting-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:opacity-0",
            className,
          )}
          {...popupProps}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

type SelectItemProps = SelectPrimitive.Item.Props & {
  showIndicator?: boolean;
};

function SelectItem({
  className,
  children,
  showIndicator = false,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "grid cursor-default select-none scroll-my-1 items-center gap-2 py-1.5 pr-2.5 pl-2.5 text-sm outline-hidden [@media(hover:hover)]:data-highlighted:bg-black/10 [@media(hover:hover)]:data-highlighted:text-black/80",
        showIndicator ? "grid-cols-[1rem_1fr]" : "grid-cols-1",
        className,
      )}
      {...props}
    >
      {showIndicator && (
        <SelectPrimitive.ItemIndicator
          data-slot="select-item-indicator"
          className="col-start-1"
        >
          <Icon variant="check" strokeWidth={1.5} />
        </SelectPrimitive.ItemIndicator>
      )}

      <SelectPrimitive.ItemText
        data-slot="select-item-text"
        className={showIndicator ? "col-start-2" : "col-start-1"}
      >
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

const items = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "php",
  "cpp",
  "rust",
  "go",
  "swift",
];

export default function MultiSelectExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <Select defaultValue={items[0]}>
        <SelectLabel>Items</SelectLabel>
        <SelectTrigger>
          <SelectValue>
            {(item: (typeof items)[number]) => <span>{item}</span>}
          </SelectValue>
          <SelectIcon>
            <Icon variant="caret-up-down" className="size-3" />
          </SelectIcon>
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
};

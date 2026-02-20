import type * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/*
 * Based off of shad/cn's NativeSelect component
 * @docs: https://ui.shadcn.com/docs/components/base/native-select
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Accordion components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 * <NativeSelect>
 *   <NativeSelectOption value="">Select status</NativeSelectOption>
 *   <NativeSelectOption value="todo">Todo</NativeSelectOption>
 *   <NativeSelectOption value="in-progress">In Progress<NativeSelectOption>
 *   <NativeSelectOption value="done">Done</NativeSelectOption>
 * </NativeSelect>
 *
 * ---------------------
 * Usage Example: Nested OptionGroups
 * ---------------------
 * <NativeSelect>
 *   <NativeSelectOption value="">Select status</NativeSelectOption>
 *   <NativeSelectOption value="todo">Todo</NativeSelectOption>
 *   <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
 *   <NativeSelectOption value="done">Done</NativeSelectOption>
 *   <NativeSelectOptGroup label="Operations">
 *     <NativeSelectOption value="support">
 *       Customer Support
 *     </NativeSelectOption>
 *     <NativeSelectOption value="product-manager">
 *       Product Manager
 *     </NativeSelectOption>
 *     <NativeSelectOption value="ops-manager">
 *       Operations Manager
 *     </NativeSelectOption>
 *   </NativeSelectOptGroup>
 * </NativeSelect>
 *
 */

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "w-full min-w-0 select-none appearance-none outline-none transition-colors focus-visible:border-debug-blue focus-visible:ring-2 focus-visible:ring-debug-blue/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-debug-red aria-invalid:ring-2 aria-invalid:ring-debug-red/20 data-[size=sm]:h-7 data-[size=sm]:py-0.5",
          "border border-input bg-transparent py-2 pr-8 pl-2.5 text-sm selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 select-none text-muted-foreground"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };

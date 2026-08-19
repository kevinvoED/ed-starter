"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Switch component
 * @docs: https://base-ui.com/react/components/switch
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Switch components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic (uncontrolled)
 * ---------------------
 *  <label className="flex items-center gap-2">
 *    <SwitchRoot defaultChecked>
 *      <SwitchThumb />
 *    </SwitchRoot>
 *    Notifications
 *  </label>
 *
 * ---------------------
 * Usage Example: Controlled with onCheckedChange
 * ---------------------
 *  const [checked, setChecked] = useState(false);
 *
 *  <label className="flex items-center gap-2">
 *    <SwitchRoot checked={checked} onCheckedChange={setChecked}>
 *      <SwitchThumb />
 *    </SwitchRoot>
 *    Dark mode
 *  </label>
 *
 * ---------------------
 * Usage Example: Disabled
 * ---------------------
 *  <label className="flex items-center gap-2">
 *    <SwitchRoot disabled defaultChecked>
 *      <SwitchThumb />
 *    </SwitchRoot>
 *    Read-only setting
 *  </label>
 *
 * ---------------------
 * Usage Example: Required and read-only
 * ---------------------
 *  <label className="flex items-center gap-2">
 *    <SwitchRoot required readOnly checked={true}>
 *      <SwitchThumb />
 *    </SwitchRoot>
 *    Terms accepted
 *  </label>
 *
 * ---------------------
 * Usage Example: Inside a native form
 * ---------------------
 *  <form onSubmit={(e) => console.log(new FormData(e.currentTarget))}>
 *    <label className="flex items-center gap-2">
 *      <SwitchRoot name="marketingOptIn" value="yes" defaultChecked>
 *        <SwitchThumb />
 *      </SwitchRoot>
 *      Subscribe to updates
 *    </label>
 *    <button type="submit">Save</button>
 *  </form>
 *
 */

const SwitchRootVariants = cva(
  "peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full outline-none transition-colors duration-200 ease-in-out focus-visible:ring-3 focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-readonly:cursor-default data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-alabaster data-checked:bg-black",
      },
      size: {
        default: "h-5 w-8 p-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SwitchThumbVariants = cva(
  "pointer-events-none block rounded-full transition-transform duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-white shadow-sm",
      },
      size: {
        default: "size-4 data-checked:translate-x-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SwitchProps = SwitchPrimitive.Root.Props &
  VariantProps<typeof SwitchRootVariants>;

function SwitchRoot({ className, variant, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(SwitchRootVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type SwitchThumbProps = SwitchPrimitive.Thumb.Props &
  VariantProps<typeof SwitchThumbVariants>;

function SwitchThumb({ className, variant, size, ...props }: SwitchThumbProps) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(SwitchThumbVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { SwitchRoot, SwitchThumb };

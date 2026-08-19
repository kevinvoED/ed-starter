import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

/*
 * Based off of Base UI's Separator component
 * @docs: https://base-ui.com/react/components/separator
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Separator components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Horizontal (default)
 * ---------------------
 *  <Separator />
 *
 * ---------------------
 * Usage Example: Vertical
 * ---------------------
 *  <div className="flex items-center gap-4 h-8">
 *    <span>Left</span>
 *    <Separator orientation="vertical" />
 *    <span>Right</span>
 *  </div>
 */

const SeparatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-current opacity-10",
    },
    size: {
      default:
        "data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type SeparatorProps = SeparatorPrimitive.Props &
  VariantProps<typeof SeparatorVariants>;

function Separator({ className, variant, size, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      className={cn(SeparatorVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Separator };

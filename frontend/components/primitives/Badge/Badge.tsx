import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

/*
 * Badge Component
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Badge components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <Badge variant="default">
 *    Placeholder Text
 *  </Badge>
 */

const BadgeVariants = cva(
  "group type-mono-1040 relative inline-flex max-w-fit flex-no-wrap items-center justify-center overflow-hidden whitespace-nowrap rounded-sm uppercase",
  {
    variants: {
      variant: {
        default: "bg-debug-blue/80 text-white shadow-md ring ring-debug-blue",
        success: "bg-debug-blue text-black",
        error: "bg-debug-red text-black",
      },
      size: {
        default: "px-2 py-0.5",
        lg: "px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof BadgeVariants>;

export const Badge = ({ className, variant, size, children }: BadgeProps) => {
  return (
    <div
      className={cn(
        BadgeVariants({
          variant: variant,
          size: size,
          className,
        }),
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

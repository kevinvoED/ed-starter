import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cnfast";

const BadgeVariants = cva(
  "group type-mono-1040 relative inline-flex max-w-fit flex-no-wrap items-center justify-center overflow-hidden whitespace-nowrap rounded-full",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
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

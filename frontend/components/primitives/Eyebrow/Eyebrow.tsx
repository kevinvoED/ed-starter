import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const EyebrowVariants = cva(
  "group relative inline-flex max-w-fit flex-no-wrap items-center justify-center overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default:
          "type-mono-1040 bg-black px-2.5 py-0.5 text-black text-white ring ring-1 ring-white/70",
        filter:
          "type-mono-1040 max-w-fit rounded-full bg-black px-2 py-0.5 font-bold text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EyebrowProps = {
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof EyebrowVariants>;

export const Eyebrow = ({ className, variant, children }: EyebrowProps) => {
  return (
    <div
      className={cn(
        EyebrowVariants({
          variant: variant,
          className,
        }),
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

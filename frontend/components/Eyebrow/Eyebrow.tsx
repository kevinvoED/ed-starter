import { cva, type VariantProps } from "class-variance-authority";
import { Dot } from "@/components/Dot/Dot";
import { TextScramble } from "@/components/GSAP/TextScramble";
import { cn } from "@/lib/utils";

const EyebrowVariants = cva(
  "inline-flex max-w-fit flex-no-wrap items-center justify-center uppercase",
  {
    variants: {
      variant: {
        "dot-black": "type-mono-1240 gap-x-2.5 bg-transparent py-1 text-black",
        "dot-neon": "type-mono-1240 gap-x-2.5 bg-transparent py-1 text-white",
        neon: "type-mono-1240 bg-neon px-[3px] py-1 text-black",
        "neon-sm": "type-mono-1040 bg-neon p-1 text-black",
        black: "type-mono-1240 bg-black px-[3px] py-1 text-white",
        "black-sm": "type-mono-1040 bg-black p-1 text-white",
        white: "type-mono-1240 bg-transparent py-1 text-black",
        "white-sm": "type-mono-1040 bg-transparent p-1 text-black",
      },
    },
    defaultVariants: {
      variant: "neon",
    },
  },
);

type EyebrowProps = {
  delay?: number;
  className?: string;
  inverted?: boolean;
  children: React.ReactNode;
} & VariantProps<typeof EyebrowVariants>;

export const Eyebrow = ({
  delay = 0,
  className,
  variant,
  inverted = false,
  children,
}: EyebrowProps) => {
  return (
    <div
      className={cn(
        EyebrowVariants({
          variant: variant,
          className,
        }),
        inverted && "flex-row-reverse",
      )}
      aria-hidden="true"
    >
      {variant?.includes("dot") && (
        <Dot color={variant === "dot-black" ? "black" : "neon"} />
      )}
      <TextScramble delay={delay}>{children}</TextScramble>
    </div>
  );
};

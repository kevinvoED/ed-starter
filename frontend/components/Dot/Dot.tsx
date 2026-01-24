import { cva, type VariantProps } from "class-variance-authority";

const DotVariants = cva("inline-block", {
  variants: {
    color: {
      white: "bg-white",
      black: "bg-black",
      neon: "bg-neon",
    },
    size: {
      default: "h-[7px] w-[7px]",
      sm: "h-[3px] w-[3px]",
    },
  },
  defaultVariants: {
    color: "white",
    size: "default",
  },
});

type DotProps = {
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
} & VariantProps<typeof DotVariants>;

export const Dot = ({ className, color, size, ref }: DotProps) => {
  return (
    <div
      ref={ref}
      className={DotVariants({
        color: color,
        size: size,
        className,
      })}
      aria-hidden="true"
    />
  );
};

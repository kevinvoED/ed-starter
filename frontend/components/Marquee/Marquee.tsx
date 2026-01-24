import type { BlockProps } from "@/sanity/lib/fetch";
import { InfiniteTextMarquee } from "@/components/Marquee/InfiniteTextMarquee";
import { cn } from "@/lib/utils";

type MarqueeProps = BlockProps<"marquee">;

export const Marquee = ({
  variant,
  padding,
  separator,
  marquee,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden",
        padding === "default" && "py-10 lg:py-20",
        padding === "large" && "pt-20 pb-10 lg:pt-35 lg:pb-20",
        padding === "small" && "py-20",
        variant === "light" && "bg-platinum text-black",
        variant === "dark" && "bg-black text-white",
      )}
      data-nav-theme={variant === "dark" ? "dark" : "light"}
    >
      <InfiniteTextMarquee
        items={marquee}
        variant={variant}
        separator={separator}
        padding={padding}
      />
    </div>
  );
};

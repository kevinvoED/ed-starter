import type { BlockProps } from "@/sanity/lib/fetch";
import Image from "next/image";

type PatternProps = BlockProps<"pattern">;

export const Pattern = ({ variant }: PatternProps) => {
  return (
    <div className="relative h-15 w-full bg-black" data-nav-theme="dark">
      {variant === "black-white" && (
        <Image
          src={"/images/pattern-black-white.png"}
          alt="Black and white square pattern"
          sizes="100vw"
          className="object-cover"
          fill
        />
      )}
      {variant === "black-neon" && (
        <Image
          src={"/images/pattern-black-neon.png"}
          alt="Black and neon square pattern"
          sizes="100vw"
          className="object-cover"
          fill
        />
      )}
    </div>
  );
};

import type { ModuleProps } from "@/sanity/lib/fetch";
import { ImageMarquee } from "@/components/primitives/Marquee/ImageMarquee";
import { TextMarquee } from "@/components/primitives/Marquee/TextMarquee";

type MarqueeProps = ModuleProps<"marquee">;

export const Marquee = ({
  variant,
  items,
  images,
  enableVelocity,
  imageType,
}: MarqueeProps) => {
  return (
    <div className="grid-custom overflow-hidden bg-white text-black">
      {variant === "text" && (
        <TextMarquee
          items={items}
          enableVelocity={enableVelocity}
          gap={20}
          className="type-4860 col-span-full py-5"
        />
      )}

      {variant === "image" && (
        <ImageMarquee
          items={images}
          enableVelocity={enableVelocity}
          imageType={imageType}
          mobileBaseSize={100}
          desktopBaseSize={100}
          gap={40}
          className="type-4860 col-span-full"
        />
      )}
    </div>
  );
};

import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Image/SanityImage";

export const MediaFile = ({
  variant,
  image,
  video,
}: ModuleProps<"media-file">) => {
  if (variant === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="min-h-dvh object-cover [clip-path:inset(2px_0px)]"
      >
        <source src={video?.asset?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <figure className="min-h-dvh">
      <SanityImage
        image={image}
        sizes="100vw"
        className="size-full"
        priority={true}
      />
    </figure>
  );
};

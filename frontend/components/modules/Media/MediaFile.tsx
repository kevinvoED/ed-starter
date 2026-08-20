import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { CustomVideoPlayer } from "@/components/primitives/Video/CustomVideoPlayer";

export const MediaFile = ({
  variant,
  image,
  video,
  videoPoster,
  videoType,
  videoYoutubeUrl,
}: ModuleProps<"media-file">) => {
  if (variant === "video") {
    return (
      <CustomVideoPlayer
        src={videoType === "uploaded" ? video?.asset?.url : videoYoutubeUrl}
        poster={videoPoster?.asset?.url}
      />
    );
  }

  return (
    <figure className="md:min-h-dvh">
      <SanityImage
        image={image}
        sizes="100vw"
        className="size-full"
        priority={true}
      />
    </figure>
  );
};

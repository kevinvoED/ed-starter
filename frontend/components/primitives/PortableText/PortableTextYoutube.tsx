import { YouTubeEmbed } from "@next/third-parties/google";
import { cn } from "@/lib/utils/cn";

type PortableTextYoutubeProps = {
  className?: string;
  videoId?: string;
};

export const PortableTextYoutube = ({
  className,
  videoId,
}: PortableTextYoutubeProps) => {
  if (!videoId) return null;

  return (
    <div
      className={cn(
        "[&_lite-youtube]:!w-full [&_lite-youtube]:!max-w-none mb-12 w-full overflow-hidden [&_lite-youtube]:aspect-video",
        className,
      )}
    >
      <YouTubeEmbed videoid={videoId} params="rel=0" />
    </div>
  );
};

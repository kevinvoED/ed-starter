import type { ModuleProps } from "@/sanity/lib/fetch";

export const FullVideo = ({ video }: ModuleProps<"full-video">) => {
  if (!video?.asset?.url) return null;

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
};

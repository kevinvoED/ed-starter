import type { BlockProps } from "@/sanity/lib/fetch";

type FullVideoProps = BlockProps<"full-video">;

export const FullVideo = ({ video }: FullVideoProps) => {
  if (!video?.asset?.url) {
    return null;
  }

  return (
    <div className="bg-black" data-nav-theme="dark">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-95 w-full object-cover lg:h-160"
      >
        <source src={video?.asset?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

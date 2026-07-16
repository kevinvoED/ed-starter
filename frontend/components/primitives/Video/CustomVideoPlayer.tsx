"use client";

import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import { cn } from "cnfast";

type CustomVideoPlayerProps = {
  slot?: "media" | string;
  src?: string | null;
  poster?: string;
  muted?: boolean;
  className?: string;
};

export const CustomVideoPlayer = ({
  slot = "media",
  src = "https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4",
  poster,
  muted = true,
  className,
}: CustomVideoPlayerProps) => {
  if (!src) return null;

  return (
    <MediaController className={cn("block max-h-fit", className)}>
      <video
        slot={slot}
        src={src}
        poster={poster}
        preload="auto"
        muted={muted}
        suppressHydrationWarning={true}
        className="block"
      />
      <MediaControlBar
        style={{
          "--media-control-bar-background": "transparent",
          "--media-control-background": "transparent",
        }}
      >
        <MediaPlayButton className="px-4"></MediaPlayButton>

        <MediaTimeRange></MediaTimeRange>

        <div className="group relative flex items-center justify-center">
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 h-20 w-5 -translate-x-1/2 opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <MediaVolumeRange
              style={{
                "--media-control-background": "transparent",
                "--media-control-hover-background": "transparent",
                "--media-control-padding": "4px",
                "--media-control-height": "20px",
                "--media-range-track-background": "rgb(255 255 255 / 0.25)",
                "--media-range-bar-color": "oklch(0.9851 0 0)",
                "--media-range-thumb-background": "oklch(0.9851 0 0)",
                "--media-range-thumb-width": "10px",
                "--media-range-thumb-height": "10px",
                "--media-range-thumb-border-radius": "50%",
                "--media-range-track-height": "3px",
                "--media-range-track-border-radius": "2px",
              }}
              className="absolute top-1/2 left-1/2 mb-2 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-90"
            />
          </div>

          <MediaMuteButton
            style={{
              "--media-control-background": "transparent",
              "--media-control-hover-background": "transparent",
            }}
            className="p-2"
          />
        </div>
      </MediaControlBar>
    </MediaController>
  );
};

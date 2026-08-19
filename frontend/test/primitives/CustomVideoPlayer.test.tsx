import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomVideoPlayer } from "@/components/primitives/Video/CustomVideoPlayer";

vi.mock("media-chrome/react", () => ({
  MediaController: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="media-controller" className={className}>
      {children}
    </div>
  ),
  MediaControlBar: ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="media-control-bar" style={style}>
      {children}
    </div>
  ),
  MediaPlayButton: ({ className }: { className?: string }) => (
    <button
      type="button"
      data-testid="media-play-button"
      className={className}
    />
  ),
  MediaTimeRange: () => <div data-testid="media-time-range" />,
  MediaVolumeRange: ({
    className,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="media-volume-range" className={className} style={style} />
  ),
  MediaMuteButton: ({
    className,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <button
      type="button"
      data-testid="media-mute-button"
      className={className}
      style={style}
    />
  ),
}));

const DEFAULT_SRC =
  "https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4";

describe("CustomVideoPlayer", () => {
  test("returns null when src is null", () => {
    const { container } = render(<CustomVideoPlayer src={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders MediaController when src is provided", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-controller")).toBeInTheDocument();
  });

  test("renders video element with correct src", () => {
    const { container } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      "https://example.com/video.mp4",
    );
  });

  test("renders video as muted by default", () => {
    const { container } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(container.querySelector("video")).toHaveAttribute("muted");
  });

  test("renders video without muted attribute when muted=false", () => {
    const { container } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" muted={false} />,
    );
    expect(container.querySelector("video")).not.toHaveAttribute("muted");
  });

  test("applies poster attribute when provided", () => {
    const { container } = render(
      <CustomVideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
      />,
    );
    expect(container.querySelector("video")).toHaveAttribute(
      "poster",
      "https://example.com/poster.jpg",
    );
  });

  test("uses default src when no src prop is passed", () => {
    const { container } = render(<CustomVideoPlayer />);
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      DEFAULT_SRC,
    );
  });

  test("renders play button control", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-play-button")).toBeInTheDocument();
  });

  test("renders time range control", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-time-range")).toBeInTheDocument();
  });

  test("renders mute button control", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-mute-button")).toBeInTheDocument();
  });

  test("renders volume range control", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-volume-range")).toBeInTheDocument();
  });

  test("applies custom className to MediaController", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer
        src="https://example.com/video.mp4"
        className="custom-player"
      />,
    );
    expect(getByTestId("media-controller")).toHaveClass("custom-player");
  });

  test("MediaController has block class by default", () => {
    const { getByTestId } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(getByTestId("media-controller")).toHaveClass("block");
  });

  test("video element has preload=auto", () => {
    const { container } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(container.querySelector("video")).toHaveAttribute("preload", "auto");
  });

  test("video element uses custom slot prop", () => {
    const { container } = render(
      <CustomVideoPlayer
        src="https://example.com/video.mp4"
        slot="custom-slot"
      />,
    );
    expect(container.querySelector("video")).toHaveAttribute(
      "slot",
      "custom-slot",
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <CustomVideoPlayer src="https://example.com/video.mp4" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

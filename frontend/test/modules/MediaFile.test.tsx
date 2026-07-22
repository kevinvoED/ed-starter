import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { MediaFile } from "@/components/modules/Media/MediaFile";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/components/primitives/Video/CustomVideoPlayer", () => ({
  CustomVideoPlayer: ({
    src,
    poster,
  }: {
    src?: string | null;
    poster?: string;
  }) => (
    <div
      data-testid="custom-video-player"
      data-src={src ?? ""}
      data-poster={poster ?? ""}
    />
  ),
}));

vi.mock("@/components/primitives/Image/SanityImage", () => ({
  SanityImage: ({
    image,
    sizes,
    className,
    priority,
  }: {
    image: { asset?: { url: string } };
    sizes: string;
    className?: string;
    priority?: boolean;
  }) => (
    <div
      data-testid="sanity-image"
      data-src={image?.asset?.url ?? ""}
      data-sizes={sizes}
      data-priority={String(priority ?? false)}
      className={className}
    />
  ),
}));

const IMAGE: NonNullable<ModuleProps<"media-file">["image"]> = {
  _type: "image",
  asset: {
    _id: "image-abc123def456abc1-100x100-jpg",
    url: "https://example.com/media.jpg",
    metadata: { lqip: null, dimensions: { width: 100, height: 100 } },
  },
};

const baseProps: ModuleProps<"media-file"> = {
  _type: "media-file",
  _key: "media-file-base",
  variant: "image",
  image: IMAGE,
  video: null,
  videoType: null,
  videoYoutubeUrl: null,
  videoPoster: null,
};

describe("MediaFile", () => {
  test("renders image variant inside figure with SanityImage", () => {
    const { container, getByTestId } = render(<MediaFile {...baseProps} />);
    const sanityImage = getByTestId("sanity-image");
    expect(container.querySelector("figure")).toHaveClass("min-h-dvh");
    expect(sanityImage).toBeInTheDocument();
    expect(sanityImage).toHaveAttribute(
      "data-src",
      "https://example.com/media.jpg",
    );
    expect(sanityImage).toHaveAttribute("data-sizes", "100vw");
    expect(sanityImage).toHaveAttribute("data-priority", "true");
    expect(sanityImage).toHaveClass("size-full");
  });

  test("does not render CustomVideoPlayer when variant=image", () => {
    const { queryByTestId } = render(<MediaFile {...baseProps} />);
    expect(queryByTestId("custom-video-player")).not.toBeInTheDocument();
  });

  test("renders CustomVideoPlayer when variant=video (uploaded)", () => {
    const { getByTestId } = render(
      <MediaFile
        {...baseProps}
        variant="video"
        videoType="uploaded"
        video={{
          _type: "file",
          asset: {
            _id: "file-abc123",
            url: "https://example.com/video.mp4",
            metadata: null,
          },
        }}
        videoPoster={{
          _type: "image",
          asset: {
            _id: "image-poster",
            url: "https://example.com/poster.jpg",
            metadata: { lqip: null, dimensions: { width: 100, height: 100 } },
          },
        }}
      />,
    );

    const player = getByTestId("custom-video-player");
    expect(player).toHaveAttribute("data-src", "https://example.com/video.mp4");
    expect(player).toHaveAttribute(
      "data-poster",
      "https://example.com/poster.jpg",
    );
  });

  test("renders CustomVideoPlayer when variant=video (youtube)", () => {
    const { getByTestId } = render(
      <MediaFile
        {...baseProps}
        variant="video"
        videoType="youtube"
        videoYoutubeUrl="https://www.youtube.com/watch?v=abc123"
      />,
    );

    expect(getByTestId("custom-video-player")).toHaveAttribute(
      "data-src",
      "https://www.youtube.com/watch?v=abc123",
    );
  });

  test("does not render figure when variant=video", () => {
    const { container } = render(
      <MediaFile
        {...baseProps}
        variant="video"
        videoType="youtube"
        videoYoutubeUrl="https://www.youtube.com/watch?v=abc123"
      />,
    );
    expect(container.querySelector("figure")).not.toBeInTheDocument();
  });

  test("matches snapshot — image variant", () => {
    const { asFragment } = render(<MediaFile {...baseProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — video variant", () => {
    const { asFragment } = render(
      <MediaFile
        {...baseProps}
        variant="video"
        videoType="youtube"
        videoYoutubeUrl="https://www.youtube.com/watch?v=abc123"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

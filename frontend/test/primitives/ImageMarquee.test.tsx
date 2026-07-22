import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import Image from "next/image";
import { ImageMarquee } from "@/components/primitives/Marquee/ImageMarquee";
import { describe, expect, test, vi } from "vitest";

vi.mock("gsap/all", () => ({
  Observer: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    kill: vi.fn(),
  },
}));

vi.mock("@/lib/utils/horizontal-loop", () => ({
  horizontalLoop: vi.fn(() => ({ kill: vi.fn() })),
}));

vi.mock("@/lib/hooks/use-is-mobile", () => ({
  useIsMobile: vi.fn(() => ({ isMobile: false })),
}));

vi.mock("@sanity-labs/logo-soup/react", () => ({
  LogoSoup: ({ logos }: { logos: unknown[] }) => (
    <div data-testid="logo-soup" data-logos={logos.length} />
  ),
  // Return empty normalizedLogos so the GSAP animation effect exits early
  // (normalizedLogos.length === 0 → early return), while rendered output
  // for imageType="regular" still comes from the items prop directly.
  useLogoSoup: vi.fn(() => ({ normalizedLogos: [] })),
}));

vi.mock("@/components/primitives/Image/SanityImage", () => ({
  SanityImage: ({
    image,
  }: {
    image: { alt?: string; asset?: { url: string } };
  }) => (
    <Image
      data-testid="sanity-image"
      alt={image?.alt ?? ""}
      src={image?.asset?.url ?? ""}
      width={100}
      height={100}
    />
  ),
}));

const mockImages = [
  {
    _key: "img-1",
    _type: "image",
    alt: "Logo One",
    asset: {
      _id: "id-1",
      _type: "sanity.imageAsset",
      url: "https://example.com/logo1.svg",
    },
  },
  {
    _key: "img-2",
    _type: "image",
    alt: "Logo Two",
    asset: {
      _id: "id-2",
      _type: "sanity.imageAsset",
      url: "https://example.com/logo2.svg",
    },
  },
];

const baseProps = {
  enableVelocity: false as false,
  mobileBaseSize: 100,
  desktopBaseSize: 100,
  gap: 40,
};

describe("ImageMarquee", () => {
  test("returns null when items is null", () => {
    const { container } = render(
      <ImageMarquee {...baseProps} items={null} imageType="regular" />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("returns null when items is an empty array", () => {
    const { container } = render(
      <ImageMarquee {...baseProps} items={[]} imageType="regular" />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders LogoSoup when imageType=logo", () => {
    const { getByTestId } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="logo"
      />,
    );
    expect(getByTestId("logo-soup")).toBeInTheDocument();
  });

  test("renders SanityImages when imageType=regular — triples items (2×3=6)", () => {
    const { getAllByTestId } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="regular"
      />,
    );
    expect(getAllByTestId("sanity-image")).toHaveLength(6);
  });

  test("renders role=marquee on regular container", () => {
    const { container } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="regular"
      />,
    );
    expect(container.querySelector('[role="marquee"]')).toBeInTheDocument();
  });

  test("renders role=marquee on logo container", () => {
    const { container } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="logo"
      />,
    );
    expect(container.querySelector('[role="marquee"]')).toBeInTheDocument();
  });

  test("applies custom className to the marquee container", () => {
    const { container } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="regular"
        className="custom-marquee"
      />,
    );
    expect(container.querySelector('[role="marquee"]')).toHaveClass(
      "custom-marquee",
    );
  });

  test("applies gap as inline marginRight on each span", () => {
    const { container } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="regular"
        gap={60}
      />,
    );
    const firstSpan = container.querySelector('[role="marquee"] span');
    expect(firstSpan).toHaveStyle({ marginRight: "60px" });
  });

  test("defaults imageType to regular when not provided", () => {
    const { getAllByTestId } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
      />,
    );
    expect(getAllByTestId("sanity-image")).toHaveLength(6);
  });

  test("matches snapshot — regular imageType", () => {
    const { asFragment } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="regular"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — logo imageType", () => {
    const { asFragment } = render(
      <ImageMarquee
        {...baseProps}
        items={mockImages as unknown as ModuleProps<"marquee">["images"]}
        imageType="logo"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

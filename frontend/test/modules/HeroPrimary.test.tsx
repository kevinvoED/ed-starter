import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { HeroPrimary } from "@/components/modules/Hero/HeroPrimary";
import { describe, expect, test, vi } from "vitest";

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

const TITLE_BLOCK: ModuleProps<"hero-primary">["title"] = [
  {
    _type: "block",
    _key: "t1",
    children: [{ _type: "span", _key: "s1", marks: [], text: "Hero Title" }],
    markDefs: [],
    style: "normal",
  },
];

const DESCRIPTION_BLOCK: ModuleProps<"hero-primary">["description"] = [
  {
    _type: "block",
    _key: "d1",
    children: [
      { _type: "span", _key: "s2", marks: [], text: "Hero description." },
    ],
    markDefs: [],
    style: "normal",
  },
];

const IMAGE: ModuleProps<"hero-primary">["image"] = {
  _type: "image",
  asset: {
    _id: "image-abc123def456abc1-100x100-jpg",
    url: "https://example.com/hero.jpg",
    metadata: { lqip: null, dimensions: { width: 100, height: 100 } },
  },
};

const baseProps: ModuleProps<"hero-primary"> = {
  _type: "hero-primary",
  _key: "hero-primary-base",
  title: TITLE_BLOCK,
  description: DESCRIPTION_BLOCK,
  links: [
    {
      _key: "lnk1",
      _type: "link",
      type: "external",
      href: "https://example.com",
      label: "Get started",
    },
  ],
  image: IMAGE,
};

describe("HeroPrimary", () => {
  test("renders badge", () => {
    const { getByText } = render(<HeroPrimary {...baseProps} />);
    expect(getByText("ED Starter Kits")).toBeInTheDocument();
  });

  test("renders title", () => {
    const { getByText } = render(<HeroPrimary {...baseProps} />);
    expect(getByText("Hero Title")).toBeInTheDocument();
  });

  test("renders description", () => {
    const { getByText } = render(<HeroPrimary {...baseProps} />);
    expect(getByText("Hero description.")).toBeInTheDocument();
  });

  test("renders CTA link when provided", () => {
    const { getByRole } = render(<HeroPrimary {...baseProps} />);
    const link = getByRole("link", { name: /Get started/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("renders SanityImage with hero image", () => {
    const { getByTestId } = render(<HeroPrimary {...baseProps} />);
    const sanityImage = getByTestId("sanity-image");
    expect(sanityImage).toBeInTheDocument();
    expect(sanityImage).toHaveAttribute(
      "data-src",
      "https://example.com/hero.jpg",
    );
    expect(sanityImage).toHaveAttribute(
      "data-sizes",
      "(max-width: 768px) 100vw, 50vw",
    );
    expect(sanityImage).toHaveClass("size-full", "rounded-3xl");
  });
  test("matches snapshot", () => {
    const { asFragment } = render(<HeroPrimary {...baseProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

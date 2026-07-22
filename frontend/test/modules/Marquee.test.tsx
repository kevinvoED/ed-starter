import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { Marquee } from "@/components/modules/Marquee/Marquee";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/components/primitives/Marquee/TextMarquee", () => ({
  TextMarquee: ({ items }: { items: unknown[] }) => (
    <div data-testid="text-marquee" data-items={items?.length ?? 0} />
  ),
}));

vi.mock("@/components/primitives/Marquee/ImageMarquee", () => ({
  ImageMarquee: ({ items }: { items: unknown[] }) => (
    <div data-testid="image-marquee" data-items={items?.length ?? 0} />
  ),
}));

const baseProps = {
  _type: "marquee" as const,
  _key: "test-marquee",
  enableVelocity: false as false,
  imageType: null as null,
  items: [] as ModuleProps<"marquee">["items"],
  images: [] as ModuleProps<"marquee">["images"],
};

describe("Marquee", () => {
  test("renders TextMarquee when variant=text", () => {
    const { getByTestId } = render(<Marquee {...baseProps} variant="text" />);
    expect(getByTestId("text-marquee")).toBeInTheDocument();
  });

  test("renders ImageMarquee when variant=image", () => {
    const { getByTestId } = render(
      <Marquee {...baseProps} variant="image" imageType="regular" />,
    );
    expect(getByTestId("image-marquee")).toBeInTheDocument();
  });

  test("does not render ImageMarquee when variant=text", () => {
    const { queryByTestId } = render(<Marquee {...baseProps} variant="text" />);
    expect(queryByTestId("image-marquee")).not.toBeInTheDocument();
  });

  test("does not render TextMarquee when variant=image", () => {
    const { queryByTestId } = render(
      <Marquee {...baseProps} variant="image" imageType="regular" />,
    );
    expect(queryByTestId("text-marquee")).not.toBeInTheDocument();
  });

  test("renders outer container with overflow-hidden", () => {
    const { container } = render(<Marquee {...baseProps} variant="text" />);
    expect(container.firstChild).toHaveClass("overflow-hidden");
  });

  test("renders outer container with place-items-center", () => {
    const { container } = render(<Marquee {...baseProps} variant="text" />);
    expect(container.firstChild).toHaveClass("place-items-center");
  });

  test("passes items to TextMarquee", () => {
    const items = [
      { _key: "a", title: [] },
      { _key: "b", title: [] },
    ];
    const { getByTestId } = render(
      <Marquee {...baseProps} variant="text" items={items} />,
    );
    expect(getByTestId("text-marquee")).toHaveAttribute("data-items", "2");
  });

  test("passes images to ImageMarquee", () => {
    const images = [{ _key: "img-1" }, { _key: "img-2" }, { _key: "img-3" }];
    const { getByTestId } = render(
      <Marquee
        {...baseProps}
        variant="image"
        imageType="regular"
        images={images as unknown as ModuleProps<"marquee">["images"]}
      />,
    );
    expect(getByTestId("image-marquee")).toHaveAttribute("data-items", "3");
  });

  test("matches snapshot — text variant", () => {
    const { asFragment } = render(<Marquee {...baseProps} variant="text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — image variant", () => {
    const { asFragment } = render(
      <Marquee {...baseProps} variant="image" imageType="logo" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

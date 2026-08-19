import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AspectRatio } from "@/components/primitives/AspectRatio/AspectRatio";

describe("AspectRatio", () => {
  test("renders children", () => {
    const { getByText } = render(
      <AspectRatio ratio={16 / 9}>
        <span>Content</span>
      </AspectRatio>,
    );
    expect(getByText("Content")).toBeInTheDocument();
  });

  test("has data-slot attribute", () => {
    const { container } = render(<AspectRatio ratio={1} />);
    expect(container.firstChild).toHaveAttribute("data-slot", "aspect-ratio");
  });

  test("applies ratio as CSS custom property", () => {
    const { container } = render(<AspectRatio ratio={16 / 9} />);
    expect(container.firstChild).toHaveStyle({
      "--ratio": "1.7777777777777777",
    });
  });

  test("applies default classes", () => {
    const { container } = render(<AspectRatio ratio={4 / 3} />);
    expect(container.firstChild).toHaveClass("relative", "aspect-(--ratio)");
  });

  test("applies custom className", () => {
    const { container } = render(
      <AspectRatio ratio={1} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("spreads additional div props", () => {
    const { container } = render(
      <AspectRatio ratio={1} aria-label="Media container" />,
    );
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "Media container",
    );
  });

  test("matches snapshot — 16:9 ratio", () => {
    const { asFragment } = render(
      <AspectRatio ratio={16 / 9}>
        <span>16:9</span>
      </AspectRatio>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — 1:1 ratio", () => {
    const { asFragment } = render(
      <AspectRatio ratio={1}>
        <span>1:1</span>
      </AspectRatio>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

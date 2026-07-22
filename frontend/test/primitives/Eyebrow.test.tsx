import { render } from "@testing-library/react";
import { Eyebrow } from "@/components/primitives/Eyebrow/Eyebrow";
import { describe, expect, test } from "vitest";

describe("Eyebrow", () => {
  test("renders children", () => {
    const { getByText } = render(<Eyebrow>My Title</Eyebrow>);
    expect(getByText("My Title")).toBeInTheDocument();
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = render(<Eyebrow>Default</Eyebrow>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — filter variant", () => {
    const { asFragment } = render(<Eyebrow variant="filter">Filter</Eyebrow>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("applies default variant classes", () => {
    const { container } = render(<Eyebrow>Label</Eyebrow>);
    expect(container.firstChild).toHaveClass(
      "bg-black",
      "text-white",
      "rounded-full",
    );
  });

  test("applies filter variant classes", () => {
    const { container } = render(<Eyebrow variant="filter">Label</Eyebrow>);
    expect(container.firstChild).toHaveClass("font-bold");
  });

  test("applies custom className", () => {
    const { container } = render(
      <Eyebrow className="custom-class">Label</Eyebrow>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

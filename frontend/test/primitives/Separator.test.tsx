import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Separator } from "@/components/primitives/Separator/Separator";

describe("Separator", () => {
  test("renders with horizontal orientation by default", () => {
    const { getByRole } = render(<Separator />);
    expect(getByRole("separator")).toBeInTheDocument();
  });

  test("renders with vertical orientation", () => {
    const { getByRole } = render(<Separator orientation="vertical" />);
    const el = getByRole("separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });

  test("has data-slot attribute", () => {
    const { getByRole } = render(<Separator />);
    expect(getByRole("separator")).toHaveAttribute("data-slot", "separator");
  });

  test("applies custom className", () => {
    const { getByRole } = render(<Separator className="custom-class" />);
    expect(getByRole("separator")).toHaveClass("custom-class");
  });

  test("matches snapshot — horizontal", () => {
    const { asFragment } = render(<Separator />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — vertical", () => {
    const { asFragment } = render(<Separator orientation="vertical" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

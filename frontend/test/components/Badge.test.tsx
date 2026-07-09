import { render } from "@testing-library/react";
import { Badge } from "@/components/primitives/Badge/Badge";
import { describe, expect, test } from "vitest";

describe("Badge", () => {
  test("renders children", () => {
    const { getByText } = render(<Badge>My Title</Badge>);
    expect(getByText("My Title")).toBeInTheDocument();
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = render(<Badge>Default</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — success variant", () => {
    const { asFragment } = render(<Badge variant="success">Success</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — error variant", () => {
    const { asFragment } = render(<Badge variant="error">Error</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("applies default variant classes", () => {
    const { container } = render(<Badge>Label</Badge>);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  test("applies custom className", () => {
    const { container } = render(<Badge className="custom-class">Label</Badge>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

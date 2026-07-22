import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { Spacer } from "@/components/modules/Miscellaneous/Spacer";
import { describe, expect, test } from "vitest";

const baseProps: ModuleProps<"spacer"> = {
  _type: "spacer",
  _key: "spacer-base",
  spacing: "default",
  anchorId: null,
};

describe("Spacer", () => {
  test("returns null when spacing is missing", () => {
    const { container } = render(<Spacer {...baseProps} spacing={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("sets kebab-cased id from anchorId", () => {
    const { container } = render(
      <Spacer {...baseProps} anchorId="My Section Anchor" />,
    );
    expect(container.firstChild).toHaveAttribute("id", "my-section-anchor");
  });

  test("does not set id when anchorId is missing", () => {
    const { container } = render(<Spacer {...baseProps} anchorId={null} />);
    expect(container.firstChild).not.toHaveAttribute("id");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Spacer {...baseProps} spacing="medium" anchorId="section-one" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

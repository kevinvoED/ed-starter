import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Anchor } from "@/components/modules/Miscellaneous/Anchor";

const baseProps: ModuleProps<"anchor"> = {
  _type: "anchor",
  _key: "anchor-base",
  anchorText: { _type: "slug", current: "" },
};

describe("Anchor", () => {
  test("sets id from anchorText slug current value", () => {
    const { container } = render(
      <Anchor
        {...baseProps}
        anchorText={{ _type: "slug", current: "section-one" }}
      />,
    );
    expect(container.querySelector("#section-one")).toBeTruthy();
  });

  test("sets empty id when anchorText current is empty", () => {
    const { container } = render(
      <Anchor {...baseProps} anchorText={{ _type: "slug", current: "" }} />,
    );
    expect(container.querySelector("[id='']")).toBeTruthy();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Anchor
        {...baseProps}
        anchorText={{ _type: "slug", current: "my-anchor" }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

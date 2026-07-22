import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { RichText } from "@/components/modules/Text/RichText";
import { describe, expect, test } from "vitest";

const CONTENT_BLOCK: NonNullable<ModuleProps<"rich-text">["content"]> = [
  {
    _type: "block",
    _key: "c1",
    children: [
      { _type: "span", _key: "s1", marks: [], text: "Rich text paragraph." },
    ],
    markDefs: [],
    style: "normal",
  },
];

const baseProps: ModuleProps<"rich-text"> = {
  _type: "rich-text",
  _key: "rich-text-base",
  content: CONTENT_BLOCK,
};

describe("RichText", () => {
  test("returns null when content is missing", () => {
    const { container } = render(<RichText {...baseProps} content={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders content inside article", () => {
    const { getByText, container } = render(<RichText {...baseProps} />);
    expect(container.querySelector("article")).toHaveClass("max-w-200");
    expect(getByText("Rich text paragraph.")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<RichText {...baseProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { DriverText } from "@/components/modules/Driver/DriverText";
import { describe, expect, test } from "vitest";

const TITLE_BLOCK: ModuleProps<"driver-text">["title"] = [
  {
    _type: "block",
    _key: "t1",
    children: [{ _type: "span", _key: "s1", marks: [], text: "My Title" }],
    markDefs: [],
    style: "normal",
  },
];

const DESCRIPTION_BLOCK: ModuleProps<"driver-text">["description"] = [
  {
    _type: "block",
    _key: "d1",
    children: [
      { _type: "span", _key: "s2", marks: [], text: "Card description." },
    ],
    markDefs: [],
    style: "normal",
  },
];

const props: ModuleProps<"driver-text"> = {
  _type: "driver-text",
  _key: "base",
  title: TITLE_BLOCK,
  description: DESCRIPTION_BLOCK,
  links: [
    {
      _key: "lnk1",
      _type: "link",
      type: "external",
      href: "https://example.com",
      label: "Learn more",
    },
  ],
};

describe("DriverText", () => {
  test("renders title", () => {
    const { getByText } = render(<DriverText {...props} />);
    expect(getByText("My Title")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    const { getByText } = render(<DriverText {...props} />);
    expect(getByText("Card description.")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<DriverText {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders CTA link when provided", () => {
    const { getByRole } = render(<DriverText {...props} />);
    const links = getByRole("link", { name: /Learn more/i });
    expect(links).toBeInTheDocument();
    expect(links).toHaveAttribute("href", "https://example.com");
  });
});

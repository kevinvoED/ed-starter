import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { CardExample } from "@/components/modules/Card/CardExample";
import { describe, expect, test } from "vitest";

const TITLE_BLOCK: ModuleProps<"card-example">["title"] = [
  {
    _type: "block",
    _key: "t1",
    children: [{ _type: "span", _key: "s1", marks: [], text: "My Title" }],
    markDefs: [],
    style: "normal",
  },
];

const DESCRIPTION_BLOCK: ModuleProps<"card-example">["description"] = [
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

const props: ModuleProps<"card-example"> = {
  _type: "card-example",
  _key: "base",
  title: TITLE_BLOCK,
  description: DESCRIPTION_BLOCK,
  link: [
    {
      _key: "lnk1",
      _type: "link",
      type: "external",
      href: "https://example.com",
      label: "Learn more",
    },
  ],
  cards: [
    {
      _key: "c1",
      title: [
        {
          _type: "block",
          _key: "t1",
          children: [
            { _type: "span", _key: "s1", marks: [], text: "My card title" },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      description: [
        {
          _type: "block",
          _key: "d1",
          children: [
            { _type: "span", _key: "s2", marks: [], text: "Card descriptions" },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      link: [],
      image: {
        _type: "image",
        asset: {
          _id: "image-abc123def456abc1-100x100-jpg",
          url: "https://example.com",
          metadata: { lqip: null, dimensions: { width: 100, height: 100 } },
        },
      },
    },
  ],
};

describe("CardExample", () => {
  test("renders title", () => {
    const { getByText } = render(<CardExample {...props} />);
    expect(getByText("My Title")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    const { getByText } = render(<CardExample {...props} />);
    expect(getByText("Card description.")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<CardExample {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders CTA link when provided", () => {
    const { getByRole } = render(<CardExample {...props} />);
    const link = getByRole("link", { name: /Learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});

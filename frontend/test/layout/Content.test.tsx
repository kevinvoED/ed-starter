import type { ContentIndexVariant } from "@/lib/utils/types";
import { useSearchParams } from "next/navigation";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQueryStates } from "nuqs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  ContentFilter,
  ContentFilterItem,
} from "@/components/layout/Content/ContentFilter";
import { ContentHero } from "@/components/layout/Content/ContentHero";
import { ContentListing } from "@/components/layout/Content/ContentListing";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { ContentPaginationScrollHandler } from "@/components/layout/Content/ContentPaginationScrollHandler";
import { ContentPost } from "@/components/layout/Content/ContentPost";

vi.mock("@/components/primitives/Image/SanityImage", () => ({
  SanityImage: ({
    image,
    sizes,
    className,
  }: {
    image: { asset?: { url: string } };
    sizes: string;
    className?: string;
  }) => (
    <div
      data-testid="sanity-image"
      data-src={image?.asset?.url ?? ""}
      data-sizes={sizes}
      className={className}
    />
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/blog"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock("nuqs", () => ({
  parseAsString: {
    withDefault: (defaultValue: string) => defaultValue,
  },
  useQueryStates: vi.fn(),
}));

const createTextBlock = (text: string) =>
  [
    {
      _type: "block" as const,
      _key: `${text}-block`,
      children: [
        {
          _type: "span" as const,
          _key: `${text}-span`,
          marks: [],
          text,
        },
      ],
      markDefs: [],
      style: "normal" as const,
    },
  ] satisfies ContentIndexVariant["title"];

const mockImage: NonNullable<ContentIndexVariant["posts"][number]["image"]> = {
  _type: "image",
  asset: {
    _id: "image-abc123def456abc1-100x100-jpg",
    url: "https://example.com/post.jpg",
    metadata: { lqip: null, dimensions: { width: 100, height: 100 } },
  },
};

const mockPost: ContentIndexVariant["posts"][number] = {
  _id: "post-1",
  _type: "blog-post",
  _createdAt: "2024-01-15T00:00:00.000Z",
  publishedDate: null,
  slug: { _type: "slug", current: "first-post" },
  links: [],
  title: createTextBlock("First Post"),
  image: mockImage,
  description: createTextBlock("Post description"),
  href: "/blog/first-post",
  category: [{ _id: "cat-1", title: createTextBlock("Technology") }],
  contentTopic: [{ _id: "topic-1", title: createTextBlock("Design") }],
};

const mockFilters: ContentIndexVariant["filters"] = {
  defaults: {
    label: "All",
    count: 12,
  },
  categories: {
    label: "Field of Study",
    items: [
      {
        _id: "cat-1",
        slug: { _type: "slug", current: "technology" },
        title: createTextBlock("Technology"),
        count: 5,
      },
    ],
  },
  topics: {
    label: "Topic",
    items: [
      {
        _id: "topic-1",
        slug: { _type: "slug", current: "design" },
        title: createTextBlock("Design"),
        count: 3,
      },
    ],
  },
};

const mockPagination: ContentIndexVariant["pagination"] = {
  totalPages: 10,
  scrollTargetId: "blog-posts-list",
};

describe("ContentHero", () => {
  test("returns null when title is missing", () => {
    const { container } = render(
      <ContentHero
        title={undefined as unknown as ContentIndexVariant["title"]}
        description={createTextBlock("Description")}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders title and description", () => {
    const { getByRole, getByText } = render(
      <ContentHero
        title={createTextBlock("Blog Index")}
        description={createTextBlock("Latest articles.")}
      />,
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Blog Index");
    expect(getByText("Latest articles.")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <ContentHero
        title={createTextBlock("Blog Index")}
        description={createTextBlock("Latest articles.")}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ContentListing", () => {
  test("returns null when posts is empty", async () => {
    const ui = await ContentListing({
      scrollTargetId: "blog-posts-list",
      posts: [],
    });
    const { container } = render(ui);
    expect(container.firstChild).toBeNull();
  });

  test("returns null when posts is undefined", async () => {
    const ui = await ContentListing({
      scrollTargetId: "blog-posts-list",
      posts: undefined as unknown as ContentIndexVariant["posts"],
    });
    const { container } = render(ui);
    expect(container.firstChild).toBeNull();
  });

  test("renders list with scroll target id", async () => {
    const ui = await ContentListing({
      scrollTargetId: "blog-posts-list",
      posts: [mockPost],
    });
    const { getByRole } = render(ui);

    const list = getByRole("list");
    expect(list).toHaveAttribute("id", "blog-posts-list");
  });

  test("renders a ContentPost for each post", async () => {
    const ui = await ContentListing({
      scrollTargetId: "blog-posts-list",
      posts: [
        mockPost,
        { ...mockPost, _id: "post-2", href: "/blog/second-post" },
      ],
    });
    const { getAllByRole } = render(ui);

    expect(getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("ContentPost", () => {
  test("renders post title and link", () => {
    const { getByRole, getByText } = render(
      <ContentPost post={mockPost} index={0} />,
    );

    expect(getByRole("link")).toHaveAttribute("href", "/blog/first-post");
    expect(getByText("First Post")).toBeInTheDocument();
  });

  test("renders SanityImage when image is provided", () => {
    const { getByTestId } = render(<ContentPost post={mockPost} index={0} />);

    const image = getByTestId("sanity-image");
    expect(image).toHaveAttribute("data-src", "https://example.com/post.jpg");
    expect(image).toHaveAttribute(
      "data-sizes",
      "(max-width: 768px) 100vw, 33vw",
    );
  });

  test("does not render SanityImage when image is missing", () => {
    const { queryByTestId } = render(
      <ContentPost
        post={{
          ...mockPost,
          image: undefined as unknown as typeof mockPost.image,
        }}
        index={0}
      />,
    );

    expect(queryByTestId("sanity-image")).not.toBeInTheDocument();
  });

  test("renders category and topic eyebrows", () => {
    const { getByText } = render(<ContentPost post={mockPost} index={0} />);

    expect(getByText("Technology")).toBeInTheDocument();
    expect(getByText("Design")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<ContentPost post={mockPost} index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ContentFilter", () => {
  beforeEach(() => {
    vi.mocked(useQueryStates).mockImplementation(() => [
      { category: "All", topic: "All" },
      vi.fn(),
    ]);
  });

  test("renders nav with accessible label", () => {
    const { getByRole } = render(<ContentFilter data={mockFilters} />);
    expect(
      getByRole("navigation", { name: "Category and topic filter" }),
    ).toBeInTheDocument();
  });

  test("renders category and topic filter sections", () => {
    const { getByText } = render(<ContentFilter data={mockFilters} />);

    expect(getByText("Field of Study")).toBeInTheDocument();
    expect(getByText("Topic")).toBeInTheDocument();
  });

  test("does not render category section when items are empty", () => {
    const { queryByText, getByText } = render(
      <ContentFilter
        data={{
          ...mockFilters,
          categories: { ...mockFilters.categories, items: [] },
        }}
      />,
    );

    expect(queryByText("Field of Study")).not.toBeInTheDocument();
    expect(getByText("Topic")).toBeInTheDocument();
  });
});

describe("ContentFilterItem", () => {
  const setQueryStates = vi.fn();

  beforeEach(() => {
    setQueryStates.mockReset();
    vi.mocked(useQueryStates).mockImplementation(() => [
      { category: "All" },
      setQueryStates,
    ]);
  });

  test("renders default filter option with count", () => {
    const { getByText } = render(
      <ContentFilterItem data={mockFilters} queryKey="category" />,
    );

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("(12)")).toBeInTheDocument();
  });

  test("renders filter items with slug labels and counts", () => {
    const { getByText } = render(
      <ContentFilterItem data={mockFilters} queryKey="category" />,
    );

    expect(getByText("Technology")).toBeInTheDocument();
    expect(getByText("(5)")).toBeInTheDocument();
  });

  test("updates query state when a filter item is clicked", async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <ContentFilterItem data={mockFilters} queryKey="category" />,
    );

    await user.click(getByText("Technology"));

    expect(setQueryStates).toHaveBeenCalledWith({ category: "technology" });
  });
});

describe("ContentPagination", () => {
  beforeEach(() => {
    vi.mocked(useQueryStates).mockImplementation(() => [
      { category: undefined, topic: undefined },
      vi.fn(),
    ]);
  });

  test("returns null when totalPages is 1 or less", () => {
    const { container } = render(
      <ContentPagination
        pagination={{ totalPages: 1, scrollTargetId: "blog-posts-list" }}
        currentPage={1}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders page links for multi-page results", () => {
    const { getByRole } = render(
      <ContentPagination pagination={mockPagination} currentPage={1} />,
    );

    expect(getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/blog?page=2",
    );
    expect(getByRole("link", { name: "10" })).toHaveAttribute(
      "href",
      "/blog?page=10",
    );
  });

  test("renders previous link when not on first page", () => {
    const { getAllByRole } = render(
      <ContentPagination pagination={mockPagination} currentPage={3} />,
    );

    const links = getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/blog?page=2");
  });

  test("renders next link when not on last page", () => {
    const { getAllByRole } = render(
      <ContentPagination pagination={mockPagination} currentPage={3} />,
    );

    const links = getAllByRole("link");
    expect(links.at(-1)).toHaveAttribute("href", "/blog?page=4");
  });

  test("includes active category and topic params in page urls", () => {
    vi.mocked(useQueryStates).mockImplementation(() => [
      { category: "technology", topic: "design" },
      vi.fn(),
    ]);

    const { getByRole } = render(
      <ContentPagination pagination={mockPagination} currentPage={2} />,
    );

    expect(getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/blog?category=technology&topic=design&page=3",
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <ContentPagination pagination={mockPagination} currentPage={2} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ContentPaginationScrollHandler", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("returns null", () => {
    const { container } = render(
      <ContentPaginationScrollHandler
        scrollTargetId="blog-posts-list"
        scrollOffset={175}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test("does not scroll when page param is missing", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReturnType<typeof useSearchParams>,
    );

    render(
      <ContentPaginationScrollHandler
        scrollTargetId="blog-posts-list"
        scrollOffset={175}
      />,
    );

    vi.advanceTimersByTime(100);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test("scrolls to listing target when page param is greater than 1", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("page=2") as ReturnType<typeof useSearchParams>,
    );

    const target = document.createElement("ul");
    target.id = "blog-posts-list";
    Object.defineProperty(target, "offsetTop", {
      value: 500,
      configurable: true,
    });
    document.body.appendChild(target);

    render(
      <ContentPaginationScrollHandler
        scrollTargetId="blog-posts-list"
        scrollOffset={175}
      />,
    );

    vi.advanceTimersByTime(100);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 325 });

    target.remove();
  });
});

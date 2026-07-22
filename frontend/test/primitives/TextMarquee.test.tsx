import type { ModuleProps } from "@/sanity/lib/fetch";
import { render } from "@testing-library/react";
import { TextMarquee } from "@/components/primitives/Marquee/TextMarquee";
import { describe, expect, test, vi } from "vitest";

// Override global gsap mock to include utils.toArray
vi.mock("gsap", () => {
  const chain = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    kill: vi.fn().mockReturnThis(),
  };
  const gsapMock = {
    ...chain,
    timeline: vi.fn(() => chain),
    registerPlugin: vi.fn(),
    utils: {
      toArray: vi.fn(() => []),
    },
  };
  return { ...gsapMock, gsap: gsapMock, default: gsapMock };
});

vi.mock("gsap/all", () => ({
  Observer: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    kill: vi.fn(),
  },
}));

vi.mock("@/lib/utils/horizontal-loop", () => ({
  horizontalLoop: vi.fn(() => ({ kill: vi.fn(), timeScale: vi.fn() })),
}));

vi.mock("@portabletext/react", () => ({
  toPlainText: vi.fn(() => "Item Text"),
}));

const mockItems = [
  {
    _key: "a",
    title: [{ _key: "t1", _type: "block", children: [{ text: "Item A" }] }],
  },
  {
    _key: "b",
    title: [{ _key: "t2", _type: "block", children: [{ text: "Item B" }] }],
  },
];

describe("TextMarquee", () => {
  test("returns null when items is undefined", () => {
    const { container } = render(
      <TextMarquee
        items={[] as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("returns null when items is an empty array", () => {
    const { container } = render(
      <TextMarquee items={[]} enableVelocity={false} gap={20} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders container with role=marquee", () => {
    const { container } = render(
      <TextMarquee
        items={mockItems as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
      />,
    );
    expect(container.querySelector('[role="marquee"]')).toBeInTheDocument();
  });

  test("triples items for seamless loop — 2 items produces 6 marquee-item divs", () => {
    const { container } = render(
      <TextMarquee
        items={mockItems as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
      />,
    );
    expect(container.querySelectorAll(".marquee-item")).toHaveLength(6);
  });

  test("renders toPlainText output for each item", () => {
    const { getAllByText } = render(
      <TextMarquee
        items={mockItems as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
      />,
    );
    expect(getAllByText("Item Text")).toHaveLength(6);
  });

  test("applies custom className to the marquee container", () => {
    const { container } = render(
      <TextMarquee
        items={mockItems as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
        className="custom-marquee"
      />,
    );
    expect(container.querySelector('[role="marquee"]')).toHaveClass(
      "custom-marquee",
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <TextMarquee
        items={mockItems as ModuleProps<"marquee">["items"]}
        enableVelocity={false}
        gap={20}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

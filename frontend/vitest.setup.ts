import { vi } from "vitest";
import "@testing-library/jest-dom";

const { splitTextMock, customEaseMock } = vi.hoisted(() => {
  const splitTextMock = {
    create: vi.fn(() => ({
      lines: [] as Element[],
      revert: vi.fn(),
    })),
  };

  const customEaseMock = {
    create: vi.fn(() => "customEase"),
  };

  return { splitTextMock, customEaseMock };
});

// Mock GSAP and ScrollTrigger globally. This is likely used in most modules hence mocked globally.
vi.mock("gsap", () => {
  const chain = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    kill: vi.fn().mockReturnThis(),
    scrollTrigger: { kill: vi.fn() },
  };

  const gsapMock = {
    ...chain,
    timeline: vi.fn(() => chain),
    registerPlugin: vi.fn(),
    utils: {
      toArray: vi.fn(() => []),
    },
  };

  return {
    ...gsapMock,
    gsap: gsapMock,
    default: gsapMock,
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    kill: vi.fn(),
    getAll: vi.fn(),
  },
}));

vi.mock("gsap/all", () => ({
  CustomEase: customEaseMock,
  SplitText: splitTextMock,
  Observer: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    kill: vi.fn(),
  },
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    kill: vi.fn(),
    getAll: vi.fn(),
  },
}));

vi.mock("gsap/SplitText", () => ({
  SplitText: splitTextMock,
  default: splitTextMock,
}));

vi.mock("gsap/ScrambleTextPlugin", () => ({
  default: {
    scrambleText: vi.fn(),
  },
}));

vi.mock("@gsap/react", async () => {
  const { useEffect } = await import("react");
  return {
    useGSAP: (
      cb: () => undefined | (() => void),
      depsOrOptions?:
        | unknown[]
        | {
            dependencies?: unknown[];
            scope?: unknown;
            revertOnUpdate?: boolean;
          },
    ) => {
      const deps = Array.isArray(depsOrOptions)
        ? depsOrOptions
        : (depsOrOptions?.dependencies ?? []);
      useEffect(cb, deps);
    },
  };
});

// Mock `window.matchMedia` globally. This is likely used in most modules hence mocked globally.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/personal",
}));

vi.mock("nuqs", () => ({
  useQueryState: vi.fn().mockImplementation(() => {
    // Return a tuple [value, setter]
    return [undefined, vi.fn()];
  }),
}));

vi.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: vi.fn(),
  },
}));

vi.mock("next-sanity/image", () => ({
  imageLoader: vi.fn(
    ({ src, width }: { src: string; width: number }) => `${src}?w=${width}`,
  ),
}));

vi.mock("@/sanity/lib/image", () => ({
  urlFor: vi.fn(() => ({
    url: vi.fn(() => "https://example.com/image.jpg"),
    width: vi.fn().mockReturnThis(),
    height: vi.fn().mockReturnThis(),
    fit: vi.fn().mockReturnThis(),
  })),
}));

// --- Global IntersectionObserver mock ---
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

// @ts-expect-error
global.IntersectionObserver = MockIntersectionObserver;

import { render } from "@testing-library/react";
import { Transition } from "@/components/animations/Transition";
import { describe, expect, test, vi } from "vitest";

describe("Transition", () => {
  test("renders children", () => {
    const { getByText } = render(<Transition>Hello</Transition>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  test("renders with a custom slot element", () => {
    const { container } = render(<Transition as="section">Content</Transition>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  test("applies className", () => {
    const { container } = render(
      <Transition className="custom-class">Child</Transition>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("sets opacity:0 for fade animations", () => {
    const { container } = render(
      <Transition animation="fadeIn">Child</Transition>,
    );
    expect(container.firstChild).toHaveStyle({ opacity: 0 });
  });

  test("sets opacity:1 for non-fade animations", () => {
    const { container } = render(
      <Transition animation="slideUp">Child</Transition>,
    );
    expect(container.firstChild).toHaveStyle({ opacity: 1 });
  });

  test("calls gsap.set with the correct 'from' config", async () => {
    const { gsap } = await import("gsap");
    render(<Transition animation="fadeInUp">Child</Transition>);
    expect(gsap.set).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0, y: 10 }),
    );
  });

  test("calls gsap.to with the correct animation params", async () => {
    const { gsap } = await import("gsap");
    render(
      <Transition
        animation="slideDown"
        duration={1.2}
        delay={0.3}
        ease="linear"
      >
        Child
      </Transition>,
    );
    expect(gsap.to).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "linear",
      }),
    );
  });

  test("passes triggerOnce=true toggleActions", async () => {
    const { gsap } = await import("gsap");
    render(<Transition triggerOnce={true}>Child</Transition>);
    expect(gsap.to).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({
          toggleActions: "play none none none",
        }),
      }),
    );
  });

  test("passes triggerOnce=false toggleActions", async () => {
    const { gsap } = await import("gsap");
    render(<Transition triggerOnce={false}>Child</Transition>);
    expect(gsap.to).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({
          toggleActions: "play none none reverse",
        }),
      }),
    );
  });
  test("calls onComplete callback when provided", async () => {
    const { gsap } = await import("gsap");
    const onComplete = vi.fn();
    render(<Transition onComplete={onComplete}>Child</Transition>);
    expect(gsap.to).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ onComplete }),
    );
  });

  test("matches snapshot — default props", () => {
    const { asFragment } = render(<Transition>Snap</Transition>);
    expect(asFragment()).toMatchSnapshot();
  });
});

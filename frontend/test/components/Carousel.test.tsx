import { render, screen } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/primitives/Carousel/Carousel";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [vi.fn(), undefined]),
}));

vi.mock("@next/third-parties/google", () => ({
  sendGTMEvent: vi.fn(),
}));

const renderCarousel = () =>
  render(
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </CarouselContent>
      <CarouselControls>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselControls>
    </Carousel>,
  );

describe("renders carousel", () => {
  test("renders with data-slot=carousel on root section", () => {
    const { container } = renderCarousel();
    expect(
      container.querySelector('[data-slot="carousel"]'),
    ).toBeInTheDocument();
  });

  test("renders as a section element", () => {
    const { container } = renderCarousel();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  test("renders carousel item content", () => {
    renderCarousel();
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("previous button is disabled when api has no previous scroll", () => {
    renderCarousel();
    const prevBtn = screen.getByText("Previous slide").closest("button");
    expect(prevBtn).toBeDisabled();
  });

  test("next button is disabled when api has no next scroll", () => {
    renderCarousel();
    const nextBtn = screen.getByText("Next slide").closest("button");
    expect(nextBtn).toBeDisabled();
  });

  test("renders CarouselItem with data-slot=carousel-item", () => {
    const { container } = renderCarousel();
    expect(
      container.querySelector('[data-slot="carousel-item"]'),
    ).toBeInTheDocument();
  });

  test("renders CarouselControls with data-slot=carousel-controls", () => {
    const { container } = renderCarousel();
    expect(
      container.querySelector('[data-slot="carousel-controls"]'),
    ).toBeInTheDocument();
  });

  test("applies custom className to Carousel root", () => {
    const { container } = render(
      <Carousel className="custom-carousel">
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    expect(container.querySelector('[data-slot="carousel"]')).toHaveClass(
      "custom-carousel",
    );
  });

  test("applies custom className to CarouselItem", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem className="custom-item">Slide</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    expect(container.querySelector('[data-slot="carousel-item"]')).toHaveClass(
      "custom-item",
    );
  });

  test("responds to ArrowLeft key without throwing", async () => {
    const user = userEvent.setup();
    const { container } = renderCarousel();
    const carousel = container.querySelector(
      '[data-slot="carousel"]',
    ) as HTMLElement;
    carousel.focus();
    await user.keyboard("[ArrowLeft]");
  });

  test("responds to ArrowRight key without throwing", async () => {
    const user = userEvent.setup();
    const { container } = renderCarousel();
    const carousel = container.querySelector(
      '[data-slot="carousel"]',
    ) as HTMLElement;
    carousel.focus();
    await user.keyboard("[ArrowRight]");
  });

  test("matches snapshot", () => {
    const { asFragment } = renderCarousel();
    expect(asFragment()).toMatchSnapshot();
  });
});

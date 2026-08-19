import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/Accordion/Accordion";

const renderAccordion = (theme?: "default" | "second-theme") =>
  render(
    <Accordion display="flex" theme={theme} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger One</AccordionTrigger>
        <AccordionContent>Content One</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger Two</AccordionTrigger>
        <AccordionContent>Content Two</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe("Accordion", () => {
  test("renders with data-slot=accordion", () => {
    const { container } = renderAccordion();
    expect(
      container.querySelector('[data-slot="accordion"]'),
    ).toBeInTheDocument();
  });

  test("renders all trigger buttons", () => {
    renderAccordion();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  test("renders open item content", () => {
    renderAccordion();
    expect(screen.getByText("Content One")).toBeInTheDocument();
  });

  test("sets data-display=grid on root when display=grid", () => {
    const { container } = render(
      <Accordion display="grid">
        <AccordionItem value="item-1">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(
      container.querySelector('[data-display="grid"]'),
    ).toBeInTheDocument();
  });

  test("sets data-display=flex on root when display=flex", () => {
    const { container } = renderAccordion();
    expect(
      container.querySelector('[data-display="flex"]'),
    ).toBeInTheDocument();
  });

  test("applies custom className to AccordionItem", () => {
    const { container } = render(
      <Accordion display="flex">
        <AccordionItem value="item-1" className="custom-item">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(container.querySelector('[data-slot="accordion-item"]')).toHaveClass(
      "custom-item",
    );
  });

  test("applies custom className to AccordionContent inner div", () => {
    const { container } = render(
      <Accordion display="flex" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent className="custom-content">
            Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const panel = container.querySelector('[data-slot="accordion-content"]');
    expect(panel?.firstElementChild).toHaveClass("custom-content");
  });

  test("toggles item open on trigger click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText("Trigger Two"));
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  test("matches snapshot — default theme", () => {
    const { asFragment } = renderAccordion();
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot — second-theme", () => {
    const { asFragment } = renderAccordion("second-theme");
    expect(asFragment()).toMatchSnapshot();
  });
});

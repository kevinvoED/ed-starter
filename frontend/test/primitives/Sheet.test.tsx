import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/primitives/Sheet/Sheet";

vi.mock("lenis/react", () => ({
  useLenis: vi.fn(() => null),
}));

describe("Sheet", () => {
  test("renders Sheet with SheetTrigger", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
      </Sheet>,
    );
    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });

  test("SheetTrigger renders with data-slot=sheet-trigger", () => {
    const { container } = render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
      </Sheet>,
    );
    expect(
      container.querySelector('[data-slot="sheet-trigger"]'),
    ).toBeInTheDocument();
  });

  test("SheetHeader renders with data-slot=sheet-header", () => {
    const { container } = render(<SheetHeader>Header Content</SheetHeader>);
    expect(
      container.querySelector('[data-slot="sheet-header"]'),
    ).toBeInTheDocument();
  });

  test("SheetFooter renders with data-slot=sheet-footer", () => {
    const { container } = render(<SheetFooter>Footer Content</SheetFooter>);
    expect(
      container.querySelector('[data-slot="sheet-footer"]'),
    ).toBeInTheDocument();
  });

  test("SheetHeader renders children", () => {
    render(<SheetHeader>Header Text</SheetHeader>);
    expect(screen.getByText("Header Text")).toBeInTheDocument();
  });

  test("SheetFooter renders children", () => {
    render(<SheetFooter>Footer Text</SheetFooter>);
    expect(screen.getByText("Footer Text")).toBeInTheDocument();
  });

  test("SheetTitle renders children", () => {
    render(
      <Sheet>
        <SheetTitle>Sheet Title</SheetTitle>
      </Sheet>,
    );
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
  });

  test("SheetDescription renders children", () => {
    render(
      <Sheet>
        <SheetDescription>Sheet description text</SheetDescription>
      </Sheet>,
    );
    expect(screen.getByText("Sheet description text")).toBeInTheDocument();
  });

  test("SheetHeader applies custom className", () => {
    const { container } = render(
      <SheetHeader className="custom-header">Content</SheetHeader>,
    );
    expect(container.querySelector('[data-slot="sheet-header"]')).toHaveClass(
      "custom-header",
    );
  });

  test("SheetFooter applies custom className", () => {
    const { container } = render(
      <SheetFooter className="custom-footer">Content</SheetFooter>,
    );
    expect(container.querySelector('[data-slot="sheet-footer"]')).toHaveClass(
      "custom-footer",
    );
  });

  test("SheetTrigger renders as a button", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
      </Sheet>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
      </Sheet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

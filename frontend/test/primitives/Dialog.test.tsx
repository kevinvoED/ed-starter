import { render, screen } from "@testing-library/react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/Dialog/Dialog";
import { describe, expect, test, vi } from "vitest";

vi.mock("lenis/react", () => ({
  useLenis: vi.fn(() => null),
}));

describe("Dialog", () => {
  test("renders DialogRoot with DialogTrigger", () => {
    render(
      <DialogRoot>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </DialogRoot>,
    );
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  test("DialogTrigger renders with data-slot=dialog-trigger", () => {
    const { container } = render(
      <DialogRoot>
        <DialogTrigger>Open</DialogTrigger>
      </DialogRoot>,
    );
    expect(
      container.querySelector('[data-slot="dialog-trigger"]'),
    ).toBeInTheDocument();
  });

  test("DialogHeader renders with data-slot=dialog-header", () => {
    const { container } = render(<DialogHeader>Header Content</DialogHeader>);
    expect(
      container.querySelector('[data-slot="dialog-header"]'),
    ).toBeInTheDocument();
  });

  test("DialogFooter renders with data-slot=dialog-footer", () => {
    const { container } = render(<DialogFooter>Footer Content</DialogFooter>);
    expect(
      container.querySelector('[data-slot="dialog-footer"]'),
    ).toBeInTheDocument();
  });

  test("DialogHeader renders children", () => {
    render(<DialogHeader>Header Text</DialogHeader>);
    expect(screen.getByText("Header Text")).toBeInTheDocument();
  });

  test("DialogFooter renders children", () => {
    render(<DialogFooter>Footer Text</DialogFooter>);
    expect(screen.getByText("Footer Text")).toBeInTheDocument();
  });

  test("DialogTitle renders children", () => {
    render(
      <DialogRoot>
        <DialogTitle>Dialog Title</DialogTitle>
      </DialogRoot>,
    );
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
  });

  test("DialogDescription renders children", () => {
    render(
      <DialogRoot>
        <DialogDescription>Dialog description text</DialogDescription>
      </DialogRoot>,
    );
    expect(screen.getByText("Dialog description text")).toBeInTheDocument();
  });

  test("DialogClose renders with data-slot=dialog-close", () => {
    const { container } = render(
      <DialogRoot>
        <DialogClose>Cancel</DialogClose>
      </DialogRoot>,
    );
    expect(
      container.querySelector('[data-slot="dialog-close"]'),
    ).toBeInTheDocument();
  });

  test("DialogHeader applies custom className", () => {
    const { container } = render(
      <DialogHeader className="custom-header">Content</DialogHeader>,
    );
    expect(container.querySelector('[data-slot="dialog-header"]')).toHaveClass(
      "custom-header",
    );
  });

  test("DialogFooter applies custom className", () => {
    const { container } = render(
      <DialogFooter className="custom-footer">Content</DialogFooter>,
    );
    expect(container.querySelector('[data-slot="dialog-footer"]')).toHaveClass(
      "custom-footer",
    );
  });

  test("DialogTrigger renders as a button", () => {
    render(
      <DialogRoot>
        <DialogTrigger>Open</DialogTrigger>
      </DialogRoot>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  test("controlled DialogRoot accepts open and onOpenChange props", () => {
    const handleOpenChange = vi.fn();

    render(
      <DialogRoot open={true} onOpenChange={handleOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Settings</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("full dialog composition renders header, content, and footer", () => {
    render(
      <DialogRoot defaultOpen={true}>
        <DialogTrigger>Open profile editor</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div>Your content here</div>
          <DialogFooter>
            <button type="submit">Save changes</button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>,
    );

    expect(
      screen.getByRole("heading", { name: "Edit profile" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Make changes to your profile here."),
    ).toBeInTheDocument();
    expect(screen.getByText("Your content here")).toBeInTheDocument();
    expect(screen.getByText("Save changes")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <DialogRoot>
        <DialogTrigger>Open</DialogTrigger>
      </DialogRoot>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

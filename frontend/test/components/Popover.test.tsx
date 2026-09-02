import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import {
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/primitives/Popover/Popover";

const POPOVER_TITLE = "Popover title";
const POPOVER_DESCRIPTION = "Popover description text.";

type RenderPopoverOptions = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  withArrow?: boolean;
  withBackdrop?: boolean;
};

const renderPopover = ({
  open,
  onOpenChange,
  modal = false,
  withArrow = false,
  withBackdrop = false,
}: RenderPopoverOptions = {}) =>
  render(
    <PopoverRoot open={open} onOpenChange={onOpenChange} modal={modal}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverPortal>
        {withBackdrop && <PopoverBackdrop />}
        <PopoverPositioner sideOffset={8}>
          <PopoverPopup>
            {withArrow && <PopoverArrow />}
            <PopoverTitle>{POPOVER_TITLE}</PopoverTitle>
            <PopoverDescription>{POPOVER_DESCRIPTION}</PopoverDescription>
            <PopoverClose>Close</PopoverClose>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>,
  );

describe("Popover", () => {
  test("renders trigger", () => {
    renderPopover();

    expect(
      screen.getByRole("button", { name: "Open popover" }),
    ).toBeInTheDocument();
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = renderPopover();
    expect(asFragment()).toMatchSnapshot();
  });

  test("opens popover content on click", async () => {
    const user = userEvent.setup();

    renderPopover();

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(screen.getByText(POPOVER_TITLE)).toBeInTheDocument();
      expect(screen.getByText(POPOVER_DESCRIPTION)).toBeInTheDocument();
    });
  });

  test("closes popover when close button is clicked", async () => {
    const user = userEvent.setup();

    renderPopover();

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(screen.getByText(POPOVER_TITLE)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByText(POPOVER_TITLE)).not.toBeInTheDocument();
    });
  });

  test("calls onOpenChange when popover opens", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderPopover({ onOpenChange });

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ reason: expect.any(String) }),
      );
    });
  });

  test("controlled open state renders popover content", async () => {
    const ControlledPopover = () => {
      const [open, setOpen] = useState(false);

      return (
        <PopoverRoot open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner>
              <PopoverPopup>
                <PopoverTitle>{POPOVER_TITLE}</PopoverTitle>
                <PopoverClose>Close</PopoverClose>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </PopoverRoot>
      );
    };

    const user = userEvent.setup();

    render(<ControlledPopover />);

    expect(screen.queryByText(POPOVER_TITLE)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(screen.getByText(POPOVER_TITLE)).toBeInTheDocument();
    });
  });

  test("applies custom className on popup", async () => {
    const user = userEvent.setup();

    render(
      <PopoverRoot>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverPopup className="custom-popup">
              <PopoverTitle>{POPOVER_TITLE}</PopoverTitle>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(
        screen.getByText(POPOVER_TITLE).closest("[data-slot='popover-popup']"),
      ).toHaveClass("custom-popup");
    });
  });

  test("renders with arrow", async () => {
    const user = userEvent.setup();

    renderPopover({ withArrow: true });

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-arrow']"),
      ).toBeInTheDocument();
    });
  });
});

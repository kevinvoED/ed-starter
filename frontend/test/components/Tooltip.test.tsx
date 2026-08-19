import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import {
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/primitives/Tooltip/Tooltip";

const TOOLTIP_CONTENT = "Helpful hint for sighted users.";

type RenderTooltipOptions = {
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  side?: "top" | "right" | "bottom" | "left";
};

const renderTooltip = ({
  disabled,
  onOpenChange,
  open,
  side = "top",
}: RenderTooltipOptions = {}) =>
  render(
    <TooltipProvider delay={0} closeDelay={0}>
      <TooltipRoot disabled={disabled} open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger aria-label="More information">?</TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner side={side} sideOffset={8}>
            <TooltipPopup>
              <TooltipArrow />
              {TOOLTIP_CONTENT}
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>,
  );

describe("Tooltip", () => {
  test("renders trigger", () => {
    renderTooltip();

    expect(
      screen.getByRole("button", { name: "More information" }),
    ).toBeInTheDocument();
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows tooltip content on hover", async () => {
    const user = userEvent.setup();

    renderTooltip();

    await user.hover(screen.getByRole("button", { name: "More information" }));

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_CONTENT)).toBeInTheDocument();
    });
  });

  test("calls onOpenChange when tooltip opens", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderTooltip({ onOpenChange });

    await user.hover(screen.getByRole("button", { name: "More information" }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ reason: expect.any(String) }),
      );
    });
  });

  test("does not open when disabled", async () => {
    const user = userEvent.setup();

    renderTooltip({ disabled: true });

    const trigger = screen.getByRole("button", { name: "More information" });

    await user.hover(trigger);

    expect(screen.queryByText(TOOLTIP_CONTENT)).not.toBeInTheDocument();
  });

  test("applies custom className on popup", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delay={0} closeDelay={0}>
        <TooltipRoot>
          <TooltipTrigger aria-label="More information">?</TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup className="custom-popup">
                {TOOLTIP_CONTENT}
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole("button", { name: "More information" }));

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_CONTENT)).toHaveClass("custom-popup");
    });
  });

  test("controlled open state renders tooltip content", async () => {
    const ControlledTooltip = () => {
      const [open, setOpen] = useState(false);

      return (
        <TooltipProvider delay={0} closeDelay={0}>
          <TooltipRoot open={open} onOpenChange={setOpen}>
            <TooltipTrigger aria-label="More information">?</TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipPopup>{TOOLTIP_CONTENT}</TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </TooltipRoot>
          <button type="button" onClick={() => setOpen(true)}>
            Open tooltip
          </button>
        </TooltipProvider>
      );
    };

    const user = userEvent.setup();

    render(<ControlledTooltip />);

    expect(screen.queryByText(TOOLTIP_CONTENT)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open tooltip" }));

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_CONTENT)).toBeInTheDocument();
    });
  });
});

import { render } from "@testing-library/react";
import { SwitchRoot, SwitchThumb } from "@/components/primitives/Switch/Switch";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

describe("Switch", () => {
  test("renders unchecked by default", () => {
    const { getByRole } = render(
      <SwitchRoot>
        <SwitchThumb />
      </SwitchRoot>,
    );
    expect(getByRole("switch")).toHaveAttribute("data-unchecked");
  });

  test("renders checked when defaultChecked is set", () => {
    const { getByRole } = render(
      <SwitchRoot defaultChecked>
        <SwitchThumb />
      </SwitchRoot>,
    );
    expect(getByRole("switch")).toHaveAttribute("data-checked");
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = render(
      <SwitchRoot>
        <SwitchThumb />
      </SwitchRoot>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    const { getByRole } = render(
      <SwitchRoot checked={false} onCheckedChange={onCheckedChange}>
        <SwitchThumb />
      </SwitchRoot>,
    );

    await user.click(getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  test("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    const { getByRole } = render(
      <SwitchRoot disabled onCheckedChange={onCheckedChange}>
        <SwitchThumb />
      </SwitchRoot>,
    );

    const switchEl = getByRole("switch");
    expect(switchEl).toHaveAttribute("data-disabled");

    await user.click(switchEl);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test("does not toggle when readOnly", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    const { getByRole } = render(
      <SwitchRoot readOnly checked={false} onCheckedChange={onCheckedChange}>
        <SwitchThumb />
      </SwitchRoot>,
    );

    await user.click(getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test("applies required and data-required attribute", () => {
    const { getByRole } = render(
      <SwitchRoot required>
        <SwitchThumb />
      </SwitchRoot>,
    );
    expect(getByRole("switch")).toHaveAttribute("data-required");
  });

  test("applies custom className on root", () => {
    const { getByRole } = render(
      <SwitchRoot className="custom-class">
        <SwitchThumb />
      </SwitchRoot>,
    );
    expect(getByRole("switch")).toHaveClass("custom-class");
  });
});

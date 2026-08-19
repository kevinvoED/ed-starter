import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxTrigger,
} from "@/components/primitives/Combobox/Combobox";

const fruits = ["apple", "banana", "orange"] as const;

type RenderComboboxOptions = {
  defaultValue?: (typeof fruits)[number] | null;
  disabled?: boolean;
  showIndicator?: boolean;
  onInputValueChange?: (value: string) => void;
  onValueChange?: (value: (typeof fruits)[number] | null) => void;
  value?: (typeof fruits)[number] | null;
};

const renderCombobox = ({
  defaultValue,
  disabled,
  showIndicator = false,
  onInputValueChange,
  onValueChange,
  value,
}: RenderComboboxOptions = {}) =>
  render(
    <ComboboxRoot
      items={[...fruits]}
      defaultValue={defaultValue}
      disabled={disabled}
      onInputValueChange={onInputValueChange}
      onValueChange={onValueChange}
      value={value}
    >
      <ComboboxInputGroup>
        <ComboboxInput placeholder="Choose a fruit" />
        <ComboboxTrigger aria-label="Open fruit list">
          <ComboboxIcon>▼</ComboboxIcon>
        </ComboboxTrigger>
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxList>
          {(item: (typeof fruits)[number]) => (
            <ComboboxItem key={item} value={item} showIndicator={showIndicator}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      </ComboboxContent>
    </ComboboxRoot>,
  );

describe("Combobox", () => {
  test("renders input with placeholder", () => {
    renderCombobox();
    expect(screen.getByPlaceholderText("Choose a fruit")).toBeInTheDocument();
  });

  test("matches snapshot — default variant", () => {
    const { asFragment } = renderCombobox({ defaultValue: fruits[0] });
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls onValueChange when an item is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderCombobox({ onValueChange });

    await user.click(screen.getByRole("button", { name: "Open fruit list" }));
    await user.click(await screen.findByRole("option", { name: "banana" }));

    expect(onValueChange).toHaveBeenCalledWith(
      "banana",
      expect.objectContaining({ reason: expect.any(String) }),
    );
  });

  test("calls onInputValueChange when typing in the input", async () => {
    const user = userEvent.setup();
    const onInputValueChange = vi.fn();

    renderCombobox({ onInputValueChange });

    await user.type(screen.getByRole("combobox"), "app");

    expect(onInputValueChange).toHaveBeenCalled();
    expect(onInputValueChange.mock.calls.at(-1)?.[0]).toBe("app");
  });

  test("does not open when disabled", async () => {
    const user = userEvent.setup();

    renderCombobox({ disabled: true, defaultValue: fruits[0] });

    const trigger = screen.getByRole("button", { name: "Open fruit list" });
    expect(trigger).toHaveAttribute("data-disabled");

    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("applies custom className on input group", () => {
    render(
      <ComboboxRoot items={[...fruits]}>
        <ComboboxInputGroup className="custom-group">
          <ComboboxInput placeholder="Choose a fruit" />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    expect(
      screen.getByPlaceholderText("Choose a fruit").parentElement,
    ).toHaveClass("custom-group");
  });

  test("controlled value updates selected option", async () => {
    const user = userEvent.setup();

    const ControlledCombobox = () => {
      const [value, setValue] = useState<(typeof fruits)[number] | null>(
        fruits[0],
      );

      return (
        <ComboboxRoot
          items={[...fruits]}
          value={value}
          onValueChange={setValue}
        >
          <ComboboxInputGroup>
            <ComboboxInput placeholder="Choose a fruit" />
            <ComboboxTrigger aria-label="Open fruit list">
              <ComboboxIcon>▼</ComboboxIcon>
            </ComboboxTrigger>
          </ComboboxInputGroup>
          <ComboboxContent>
            <ComboboxList>
              {(item: (typeof fruits)[number]) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxRoot>
      );
    };

    render(<ControlledCombobox />);

    expect(screen.getByRole("combobox")).toHaveValue("apple");

    await user.click(screen.getByRole("button", { name: "Open fruit list" }));
    await user.click(await screen.findByRole("option", { name: "orange" }));

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveValue("orange");
    });
  });
});

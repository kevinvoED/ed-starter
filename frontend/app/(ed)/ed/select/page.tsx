import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/primitives/Select/Select";

export default async function EDSelectPage() {
  return (
    <div className="grid-custom min-h-dvh place-items-center p-custom">
      <NativeSelect>
        <NativeSelectOption value="">Select status</NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
        <NativeSelectOptGroup label="Operations">
          <NativeSelectOption value="support">
            Customer Support
          </NativeSelectOption>
          <NativeSelectOption value="product-manager">
            Product Manager
          </NativeSelectOption>
          <NativeSelectOption value="ops-manager">
            Operations Manager
          </NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  );
}

import type { ModuleProps } from "@/sanity/lib/fetch";
import { kebabCase } from "es-toolkit/string";

export const Spacer = ({ spacing, anchorId }: ModuleProps<"spacer">) => {
  if (!spacing) return null;

  const spacingMapping = {
    default: "f-py-18/24",
    tiny: "f-py-6/8",
    small: "f-py-8/14",
    medium: "f-py-16/20",
    large: "f-py-20/32",
  }[spacing || "default"];

  return (
    <div
      id={anchorId ? kebabCase(String(anchorId)) : undefined}
      className={spacingMapping}
    />
  );
};

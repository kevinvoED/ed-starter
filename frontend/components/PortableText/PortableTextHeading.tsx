import { cn, getTextFromChildren } from "@/lib/utils";
import { kebabCase } from "es-toolkit/string";

type PortableTextHeadingProps = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
};

// Generates a kebab-case `id` from the heading text for anchor linking
export const PortableTextHeading = ({
  heading,
  className,
  children,
}: PortableTextHeadingProps) => {
  const text = getTextFromChildren(children);
  const id = kebabCase(text);
  const Slot = heading;

  return (
    <Slot id={id} className={cn("mb-6", className)}>
      {children}
    </Slot>
  );
};

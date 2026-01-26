import { isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { kebabCase } from "es-toolkit/string";

type PortableTextHeadingProps = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
};

export const getTextFromChildren = (children: ReactNode): string => {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).filter(Boolean).join(" ");
  }

  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    if (element.props?.children) {
      return getTextFromChildren(element.props.children);
    }
  }

  return "";
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

import type { CustomIconProps } from "@/components/primitives/Icon/Icon";

export const ExampleCustomIcon = ({
  className,
  strokeWidth = 1.5,
}: Omit<CustomIconProps, "size">) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Example SVG content - replace with your actual icon */}
      <title>Example Custom Icon</title>
      <circle cx="12" cy="12" r="10" />
      <path d="8 12h8" />
      <path d="12 8v8" />
    </svg>
  );
};

import type { CustomIconProps } from "@/components/Icon/IconList";

export default function CategoryXIcon({
  className,
  strokeWidth = 1,
}: Omit<CustomIconProps, "size">) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
      stroke="currentColor"
    >
      <title>Clear Filters</title>
      <path
        d="M10.6062 9.42729L9.42742 10.606L5.89189 7.0705L7.07063 5.89176L10.6062 9.42729ZM4.71383 7.0705L1.1783 10.606L-0.000440692 9.42729L3.53509 5.89176L4.71383 7.0705ZM10.6062 1.17818L7.07063 4.71371L5.89189 3.53497L9.42742 -0.000566393L10.6062 1.17818ZM4.71383 3.53497L3.53509 4.71371L-0.000440692 1.17818L1.1783 -0.000566393L4.71383 3.53497Z"
        fill="currentColor"
      />
    </svg>
  );
}

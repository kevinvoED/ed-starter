import type { CustomIconProps } from "@/components/Icon/IconList";

export default function ArrowRightIcon({
  className,
  strokeWidth = 1,
}: Omit<CustomIconProps, "size">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={className}
      strokeWidth={strokeWidth}
    >
      <title>Arrow Down</title>
      <path
        d="M4.83203 -1.96701e-07L4.83203 9M4.83203 9L9.33203 5M4.83203 9L0.332031 5"
        stroke="#B3B3B3"
      />
    </svg>
  );
}

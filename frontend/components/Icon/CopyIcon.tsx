import type { CustomIconProps } from "@/components/Icon/IconList";

export default function CopyIcon({
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
      <title>Copy Icon</title>
      <path
        stroke="currentColor"
        d="M2.5 7.91536V0.832031H8.33333V7.91536H2.5ZM1.25 9.16536V2.08203H1.875V8.54036H7.08333V9.16536H1.25Z"
        fill="#141414"
      />
    </svg>
  );
}

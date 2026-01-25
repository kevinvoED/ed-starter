import type { CustomIconProps } from "./IconList";

export default function Youtube({
  className,
  strokeWidth = 1.5, // Not used for this fill-based icon, but kept for consistency
}: Omit<CustomIconProps, "size">) {
  return (
    <svg
      className={className}
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
    >
      <title>Youtube</title>
      <path
        d="M19.5821 13.3001C19.3521 14.2239 18.6744 14.9515 17.8139 15.1984C16.2542 15.6471 10 15.6471 10 15.6471C10 15.6471 3.74586 15.6471 2.18613 15.1984C1.32565 14.9514 0.647936 14.2239 0.417919 13.3001C0 11.6256 0 8.13191 0 8.13191C0 8.13191 0 4.63824 0.417919 2.96374C0.647936 2.03992 1.32565 1.34265 2.18613 1.09574C3.74586 0.647064 10 0.647064 10 0.647064C10 0.647064 16.2541 0.647064 17.8139 1.09574C18.6744 1.34265 19.3521 2.03992 19.5821 2.96374C20 4.63824 20 8.13191 20 8.13191C20 8.13191 20 11.6256 19.5821 13.3001ZM7.95453 4.95992V11.3039L13.1818 8.13183L7.95453 4.95992Z"
        fill="currentColor"
      />
    </svg>
  );
}

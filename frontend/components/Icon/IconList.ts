// Type for custom icon components that match Lucide's interface
export type CustomIconProps = {
  className?: string;
  strokeWidth?: number;
  size?: number;
};

// Export type that matches LucideIcon for consistency
export type CustomIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

export { default as ArrowDown } from "./ArrowDownIcon";
export { default as ArrowRight } from "./ArrowRightIcon";
export { default as CategoryX } from "./CategoryX";
export { default as Copy } from "./CopyIcon";
// Export all custom icons here
export { default as Youtube } from "./YoutubeIcon";

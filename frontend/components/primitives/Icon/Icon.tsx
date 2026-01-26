import * as CustomIcons from "@/components/primitives/Icon/IconList";
import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  variant: string;
  strokeWidth?: number;
  size?: number;
};

// Map of custom icon names to their components
const iconComponents: Record<string, CustomIcons.CustomIcon> = {
  youtube: CustomIcons.Youtube,
  copy: CustomIcons.Copy,
  "arrow-down": CustomIcons.ArrowDown,
  "arrow-right": CustomIcons.ArrowRight,
  "category-x": CustomIcons.CategoryX,
};

export const Icon = ({
  className,
  variant,
  strokeWidth = 1,
  size = 4,
}: IconProps) => {
  if (variant === "none") {
    return null;
  }

  // Check for custom icons first
  if (iconComponents[variant]) {
    const IconComponent = iconComponents[variant];
    return (
      <IconComponent
        className={cn(`size-${size}`, className)}
        strokeWidth={strokeWidth}
      />
    );
  }

  // Icon not found
  return null;
};

import { ArrowRightIcon } from "@/components/primitives/Icon/ArrowRightIcon";
import { CopyIcon } from "@/components/primitives/Icon/CopyIcon";
import { cn } from "@/lib/utils/cn";

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

// Add additional icons here
const iconComponents: Record<string, CustomIcon> = {
  copy: CopyIcon,
  "arrow-right": ArrowRightIcon,
};

type IconProps = {
  variant: keyof typeof iconComponents;
  strokeWidth?: number;
  className?: string;
  size?: number;
};

export const Icon = ({
  variant,
  className,
  strokeWidth = 1,
  size = 4,
}: IconProps) => {
  const IconComponent = iconComponents[variant];

  return (
    <IconComponent
      className={cn(`size-${size}`, className)}
      strokeWidth={strokeWidth}
    />
  );
};

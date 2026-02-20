import { ArrowRightIcon } from "@/components/primitives/Icon/ArrowRightIcon";
import { CopyIcon } from "@/components/primitives/Icon/CopyIcon";
import { cn } from "@/lib/utils/cn";

/*
 * Master Icon component for rendering custom svg icons
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 * <Icon variant="arrow-right" />
 *
 * ---------------------
 * Usage Example: Custom size and stroke width
 * ---------------------
 * <Icon variant="copy" size={10} strokeWidth={2} />
 */

const iconComponents = {
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

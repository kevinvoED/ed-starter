import { ArrowRightIcon } from "@/components/primitives/Icon/ArrowRightIcon";
import { CaretUpDownIcon } from "@/components/primitives/Icon/CaretUpDownIcon";
import { CheckIcon } from "@/components/primitives/Icon/CheckIcon";
import { CopyIcon } from "@/components/primitives/Icon/CopyIcon";

/*
 * Master Icon component for rendering custom svg icons
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 * <Icon variant="arrow-right" />
 *
 * ---------------------
 * Usage Example: Custom stroke width
 * ---------------------
 * <Icon variant="copy" strokeWidth={2} />
 */

const iconComponents = {
  copy: CopyIcon,
  "arrow-right": ArrowRightIcon,
  check: CheckIcon,
  "caret-up-down": CaretUpDownIcon,
};

type IconProps = {
  variant: keyof typeof iconComponents;
  strokeWidth?: number;
  className?: string;
};

export const Icon = ({ variant, className, strokeWidth = 1 }: IconProps) => {
  const IconComponent = iconComponents[variant];

  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

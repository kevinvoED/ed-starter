import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { ArrowRightIcon } from '@/components/Icons/ArrowRightIcon';
import { cn } from '@/lib/utils/cn';
import { handleResolveCta } from '@/sanity/lib/utils';
import type { Cta as CtaType } from '@/sanity.types';

const ButtonVariants = cva(
  'group relative inline-flex max-w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-sm outline-none transition-colors duration-300 ease-in-out focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-orange-500 has-[>svg]:gap-2 [&_svg]:size-4',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-800',
        secondary: 'bg-amber-600 text-white hover:bg-amber-800',
        tertiary: 'bg-purple-600 text-white hover:bg-purple-800',
        outline: 'bg-transparent text-black ring-1 ring-black',
        card: 'whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[""]',
        icon: 'rounded-full bg-transparent text-black ring-1 ring-black hover:bg-blue hover:text-white hover:ring-blue',
        ghost: '',
      },
      size: {
        default: 'px-6 py-3.5',
        sm: 'px-4 py-2.5',
        lg: 'px-8 py-5.5',
        icon: 'min-h-10 min-w-10',
        none: '',
      },
      disabled: {
        true: [
          'opacity-50',
          'cursor-not-allowed',
          'pointer-events-none',
          'select-none',
        ],
        false: null,
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      disabled: false,
    },
  },
);

type ButtonProps = {
  cta: CtaType | undefined;
  children: React.ReactNode;
  className?: string;
  hasArrow?: boolean;
} & VariantProps<typeof ButtonVariants>;

export const Button = ({
  cta,
  children,
  className,
  variant,
  size,
  disabled,
  hasArrow = false,
}: ButtonProps) => {
  const resolvedUrl = handleResolveCta(cta);
  const isNewTab = cta?.openInNewTab;

  if (typeof resolvedUrl === 'string') {
    return (
      <Link
        tabIndex={disabled ? -1 : 0}
        href={resolvedUrl}
        target={cta?.openInNewTab ? '_blank' : undefined}
        rel={cta?.openInNewTab ? 'noopener noreferrer' : undefined}
        className={cn(
          ButtonVariants({ variant: variant, size, disabled, className }),
        )}
      >
        {children}
        {hasArrow && !isNewTab && <ArrowRightIcon />}
        {hasArrow && isNewTab && <ArrowRightIcon className="-rotate-45" />}
      </Link>
    );
  }
  return <>{children}</>;
};

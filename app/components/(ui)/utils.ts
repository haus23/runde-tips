import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

export const focusRing = tv({
  base: 'outline outline-offset-2',
  variants: {
    variant: {
      default: 'outline-cn',
      primary: 'outline-cn',
      secondary: 'outline-cn',
    },
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

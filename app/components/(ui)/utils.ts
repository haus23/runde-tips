import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

// Hack:
// Um den Focus-Ring an die jeweiligen Komponenten und deren Farbe (Accent/Neutral) anzupassen,
// liste ich hier einfach jede bekannte Variante auf und dazu die jeweilige Outline-Color.
// Ist bist dato kein großer Aufwand, vielleicht sehen ich irgendwann die eine bessere Lösung.
export const focusRing = tv({
  base: 'outline outline-offset-2',
  variants: {
    variant: {
      default: 'outline-cn',
      primary: 'outline-ca',
      secondary: 'outline-cn',
      toolbar: 'outline-ca',
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

export const itemStyles = tv({
  base: [
    'group flex items-center cursor-default text-subtle outline-none transition-colors select-none',
    'px-2 py-1.5 rounded-sm',
  ],
  variants: {
    isFocused: {
      true: 'bg-cn-hover text-app',
    },
    isSelected: {
      true: 'text-subtle-accent',
    },
  },
});

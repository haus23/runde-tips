import { Link, type LinkProps, NavLink } from '@remix-run/react';
import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRing } from './utils';

const link = tv({
  extend: focusRing,
  base: 'rounded-sm outline-0 focus-visible:outline-2',
  variants: {
    variant: {
      default: '',
      primary: '',
    },
  },
});

const navLink = tv({
  extend: link,
  base: 'px-2 py-1 transition-colors hover:text-subtle-accent',
  variants: {
    isActive: {
      true: 'text-subtle-accent',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface _LinkProps extends LinkProps, VariantProps<typeof link> {}

function _Link({ className, variant, ...props }: _LinkProps) {
  return <Link {...props} className={twMerge(link({ variant }), className)} />;
}

interface _NavLinkProps extends LinkProps, VariantProps<typeof link> {}

function _NavLink({ className, ...props }: _NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        navLink({ ...renderProps, className }),
      )}
    />
  );
}

export { _Link as Link, _NavLink as NavLink };

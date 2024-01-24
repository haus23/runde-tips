import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRing } from './utils';

const button = tv({
  extend: focusRing,
  base: 'px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 cursor-default',
  variants: {
    variant: {
      primary: 'bg-ca hover:bg-ca-hover pressed:bg-ca-active',
      secondary: 'bg-cn hover:bg-cn-hover pressed:bg-cn-active',
      toolbar:
        'p-1.5 bg-ca hover:bg-ca-hover active:bg-ca-active focus:ring-ca text-subtle hover:text-app',
    },
    isDisabled: {
      true: 'disabled:pointer-events-none disabled:opacity-40',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface _ButtonProps
  extends ButtonProps,
    Pick<VariantProps<typeof button>, 'variant'> {}

function _Button(props: _ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}

export { _Button as Button };

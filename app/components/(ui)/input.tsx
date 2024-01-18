import { type VariantProps, cx } from 'cva';
import { Input, InputProps } from 'react-aria-components';
import { cva } from '#app/utils/cva.config';

const inputVariants = cva({
  base: [
    'flex w-full border border-cn bg-transparent placeholder:text-muted',
    // Focus
    'focus:outline-none focus:ring-2 focus:ring-cn focus:ring-offset-2 focus:ring-offset-app',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-40',
    // Invalid
    'invalid:border-red-600 dark:invalid:border-red-400',
  ],
  variants: {
    size: {
      lg: 'h-12 rounded-lg px-4 text-lg',
      md: 'h-10 rounded-md px-4 text-base',
      sm: 'h-8 rounded px-3 text-sm',
      xs: 'h-6 rounded px-2 text-xs',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface _InputProps
  extends Omit<InputProps, 'size'>,
    VariantProps<typeof inputVariants> {
  className?: string;
}

const _Input = ({ className, size, ...props }: _InputProps) => {
  return (
    <Input
      className={cx(
        inputVariants({
          size,
          className,
        }),
      )}
      {...props}
    />
  );
};

export { _Input as Input };

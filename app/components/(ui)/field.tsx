import {
  FieldError,
  type FieldErrorProps,
  Label,
  type LabelProps,
  Text,
  type TextProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps } from './utils';

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-neutral',
      true: 'border-neutral-active',
    },
    isInvalid: {
      true: 'border-error',
    },
    isDisabled: {
      true: '',
    },
  },
});

function _Label(props: LabelProps) {
  return (
    <Label
      {...props}
      className={twMerge(
        'text-sm text-subtle font-medium cursor-default w-fit',
        props.className,
      )}
    />
  );
}

function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge('text-sm text-muted', props.className)}
    />
  );
}

function _FieldError(props: FieldErrorProps) {
  return (
    <FieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'text-sm text-error',
      )}
    />
  );
}

export { _Label as Label, Description, _FieldError as FieldError };

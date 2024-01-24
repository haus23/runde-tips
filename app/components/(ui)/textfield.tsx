import {
  Input,
  TextField,
  type TextFieldProps,
  type ValidationResult,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label, fieldBorderStyles } from './field';
import { composeTailwindRenderProps, focusRing } from './utils';

const inputStyles = tv({
  extend: focusRing,
  base: [
    'px-2 py-1.5 flex-1 outline outline-0 text-sm bg-transparent',
    'border-2 rounded-md',
    'disabled:cursor-not-allowed disabled:opacity-40',
  ],
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

interface _TextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  inputClassName?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function _TextField({
  label,
  description,
  placeholder,
  errorMessage,
  className,
  inputClassName,
  ...props
}: _TextFieldProps) {
  return (
    <TextField
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-2')}
    >
      {label && <Label>{label}</Label>}
      <Input
        placeholder={placeholder}
        className={composeRenderProps(
          inputClassName,
          (className, renderProps) =>
            inputStyles({ ...renderProps, className }),
        )}
      />
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}

export { _TextField as TextField };

/* import {
  Text,
  TextField,
  TextFieldProps,
  TextProps,
} from 'react-aria-components';
import { cx } from '#app/utils/cva.config';

const _TextField = ({ className, ...props }: TextFieldProps) => {
  return <TextField className={cx('w-full', className)} {...props} />;
};

const TextFieldDescription = ({ className, ...props }: TextProps) => {
  return (
    <Text
      elementType="div"
      slot="description"
      className={cx('mt-2 text-sm text-muted', className)}
      {...props}
    />
  );
};

const TextFieldErrorMessage = ({ className, ...props }: TextProps) => {
  return (
    <Text
      elementType="div"
      slot="errorMessage"
      className={cx('mt-2 text-sm text-red-600 dark:text-red-400', className)}
      {...props}
    />
  );
};

export { _TextField as TextField, TextFieldDescription, TextFieldErrorMessage };
*/

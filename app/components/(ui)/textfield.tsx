import { cx } from '#app/utils/cva.config';
import {
  Text,
  TextField,
  TextFieldProps,
  TextProps,
} from 'react-aria-components';

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

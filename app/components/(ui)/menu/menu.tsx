import { useContext, useRef } from 'react';
import { useHover } from 'react-aria';
import {
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  type MenuTriggerProps,
  OverlayTriggerStateContext,
  Popover,
  type PopoverProps,
  Section,
  type SectionProps,
  Separator,
  type SeparatorProps,
} from 'react-aria-components';
import { cx } from '#app/utils/cva.config';

export const _Menu = (props: MenuTriggerProps) => {
  return <MenuTrigger {...props} />;
};

interface _MenuContentProps<T>
  extends Omit<PopoverProps, 'children' | 'style' | 'className'>,
    MenuProps<T> {
  autoClose?: boolean;
}

function _MenuContent<T extends object>({
  autoClose = false,
  ...props
}: _MenuContentProps<T>) {
  const ctx = useContext(OverlayTriggerStateContext);
  const hasClosingIntent = useRef(false);
  const debounceClosing = useRef(0);

  const { hoverProps } = useHover({
    onHoverStart: () => {
      if (autoClose && hasClosingIntent) {
        hasClosingIntent.current = false;
        clearTimeout(debounceClosing.current);
      }
    },
    onHoverEnd: () => {
      if (autoClose) {
        hasClosingIntent.current = true;
        debounceClosing.current = window.setTimeout(() => {
          hasClosingIntent && ctx.close();
        }, 750);
      }
    },
  });

  return (
    <Popover
      placement="bottom end"
      {...props}
      className={cx(
        'min-w-[150px] overflow-auto rounded-md bg-cn shadow outline-none',
      )}
    >
      <div {...hoverProps}>
        <Menu {...props} className={cx('outline-none')} />
      </div>
    </Popover>
  );
}

function _MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <MenuItem
      className={cx(
        'flex items-center gap-2 rounded-sm px-2 py-1.5 text-subtle outline-none transition-colors select-none',
        'hover:bg-cn-hover hover:text-app',
        'focus:bg-cn-hover focus:text-app',
        className,
      )}
      {...props}
    />
  );
}

const _MenuSection = <T extends object>(props: SectionProps<T>) => {
  return <Section {...props} />;
};

const _MenuSeparator = ({ className, ...props }: SeparatorProps) => {
  return (
    <Separator
      className={cx('mx-1 my-1.5 border-t border-cn', className)}
      {...props}
    />
  );
};

export {
  _Menu as Menu,
  _MenuContent as MenuContent,
  _MenuItem as MenuItem,
  _MenuSection as MenuSection,
  _MenuSeparator as MenuSeparator,
};

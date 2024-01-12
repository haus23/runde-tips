import { cx } from '#app/utils/cva.config';
import { useContext, useRef } from 'react';
import { useHover, useMenuTrigger } from 'react-aria';
import {
  ButtonContext,
  Menu,
  MenuContext,
  MenuItem,
  MenuItemProps,
  MenuProps,
  MenuTriggerProps,
  OverlayTriggerStateContext,
  Popover,
  PopoverContext,
  PopoverProps,
  Provider,
  Section,
  SectionProps,
  Separator,
  SeparatorProps,
} from 'react-aria-components';
import { useMenuTriggerState } from 'react-stately';

function _Menu({ ...props }: MenuTriggerProps) {
  const state = useMenuTriggerState(props);
  const ref = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger(props, state, ref);

  return (
    <Provider
      values={[
        [
          ButtonContext,
          {
            ...menuTriggerProps,
            ref,
            isPressed: state.isOpen,
          },
        ],
        [OverlayTriggerStateContext, state],
        [PopoverContext, { triggerRef: ref, placement: 'bottom start' }],
        [MenuContext, menuProps],
      ]}
    >
      {props.children}
    </Provider>
  );
}

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

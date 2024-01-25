import { Check } from 'lucide-react';
import { useContext } from 'react';
import { useRef } from 'react';
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
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { itemStyles } from '../utils';

export const _MenuTrigger = (props: MenuTriggerProps) => {
  return <MenuTrigger {...props} />;
};

interface _MenuProps<T> extends MenuProps<T> {
  placement?: PopoverProps['placement'];
  autoClose?: boolean;
}

export function _Menu<T extends object>({
  placement,
  autoClose = false,
  ...props
}: _MenuProps<T>) {
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
      placement={placement}
      className="min-w-[150px] rounded-md bg-cn shadow"
    >
      <div {...hoverProps}>
        <Menu
          {...props}
          className="p-1 outline outline-0 max-h-[inherit] overflow-auto"
        />
      </div>
    </Popover>
  );
}

export function _MenuItem({ children, className, ...props }: MenuItemProps) {
  return (
    <MenuItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        children,
        (children, { selectionMode, isSelected }) => (
          <>
            <span className="flex-1 flex items-center gap-2">{children}</span>
            {selectionMode !== 'none' && (
              <span className="w-4 flex items-center">
                {isSelected && <Check aria-hidden className="w-4 h-4" />}
              </span>
            )}
          </>
        ),
      )}
    </MenuItem>
  );
}

export { _MenuTrigger as MenuTrigger, _Menu as Menu, _MenuItem as MenuItem };

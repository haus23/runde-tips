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
  OverlayArrow,
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
      className="min-w-[150px] rounded-md bg-cn shadow mt-2"
    >
      <OverlayArrow className="translate-y-2">
        <svg
          className="translate-y-[3px]"
          role="img"
          aria-label="Menüpfeil"
          width={16}
          height={12}
          viewBox="0 0 16 12"
        >
          <path
            className="stroke-[var(--component-neutral-bg)] fill-[var(--component-neutral-bg)]"
            d="M0 9 L8 0 L16 9"
          />
        </svg>
      </OverlayArrow>
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

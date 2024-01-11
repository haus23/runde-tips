import { cx } from 'cva';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '../(ui)/button/button';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
} from '../(ui)/menu/menu';

const colorSchemes = [
  { label: 'Light', icon: SunIcon },
  { label: 'Dark', icon: MoonIcon },
  { label: 'System', icon: LaptopIcon },
];

export function ThemeMenu() {
  const current = 'System';
  return (
    <Menu>
      <Button variant="toolbar" size="toolbar">
        <LaptopIcon className="h-5" />
      </Button>
      <MenuContent>
        <MenuSection>
          {colorSchemes.map((t) => (
            <MenuItem
              key={t.label}
              className={cx(
                current === t.label &&
                  'text-subtle-accent hover:text-app-accent focus:text-app-accent',
              )}
            >
              <t.icon className="h-5" />
              <span>{t.label}</span>
            </MenuItem>
          ))}
        </MenuSection>
        <MenuSeparator />
        <MenuSection>
          <MenuItem className={cx('px-2.5 gap-x-3')}>
            <span className="size-5 rounded-full bg-teaser-violet" />
            <span>Violet</span>
          </MenuItem>
          <MenuItem className={cx('px-2.5 gap-x-3')}>
            <span className="size-5 rounded-full bg-teaser-orange" />
            <span>Orange</span>
          </MenuItem>
        </MenuSection>
      </MenuContent>
    </Menu>
  );
}

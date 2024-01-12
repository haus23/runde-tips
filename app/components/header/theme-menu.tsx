import { useTheme } from '#app/modules/theme/theme';
import { cx } from 'cva';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Key } from 'react-aria-components';
import { Button } from '../(ui)/button/button';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
} from '../(ui)/menu/menu';

const colorSchemes = [
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: 'system', label: 'System', icon: LaptopIcon },
];

const schemeIcons = {
  light: SunIcon,
  dark: MoonIcon,
  system: LaptopIcon,
};

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const Icon = schemeIcons[theme.colorScheme];

  function handleAction(key: Key) {
    if (key === 'dark' || key === 'light' || key === 'system') {
      key !== theme.colorScheme && setTheme({ ...theme, colorScheme: key });
    } else if (key === 'violet' || key === 'orange') {
      key !== theme.brand && setTheme({ ...theme, brand: key });
    }
  }

  return (
    <Menu>
      <Button variant="toolbar" size="toolbar">
        <Icon className="h-5" />
      </Button>
      <MenuContent onAction={handleAction} autoClose>
        <MenuSection>
          {colorSchemes.map((t) => (
            <MenuItem
              key={t.name}
              id={t.name}
              className={cx(
                theme.colorScheme === t.name &&
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
          <MenuItem id="violet" className={cx('px-2.5 gap-x-3')}>
            <span className="size-5 rounded-full bg-teaser-violet" />
            <span>Violett</span>
          </MenuItem>
          <MenuItem id="orange" className={cx('px-2.5 gap-x-3')}>
            <span className="size-5 rounded-full bg-teaser-orange" />
            <span>Orange</span>
          </MenuItem>
        </MenuSection>
      </MenuContent>
    </Menu>
  );
}

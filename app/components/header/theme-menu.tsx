import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useState } from 'react';
import { type Key, type Selection } from 'react-aria-components';
import { colorSchemeNames, useTheme } from '#app/modules/theme/theme';
import { includes } from '#app/utils/misc';
import { Button } from '../(ui)/button';
import { Menu, MenuItem, MenuTrigger } from '../(ui)/menu/menu';

const colorSchemes = [
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: 'system', label: 'System', icon: LaptopIcon },
];

const schemeIcons = {
  light: SunIcon,
  dark: MoonIcon,
};

export function ThemeMenu() {
  const { theme, setTheme, colorScheme } = useTheme();
  const Icon = schemeIcons[colorScheme];

  function handleAction(key: Key) {
    if (includes(colorSchemeNames, key)) {
      key !== theme.colorScheme && setTheme({ ...theme, colorScheme: key });
    }
  }

  const [selected, setSelected] = useState<Selection>(
    new Set([theme.colorScheme]),
  );

  return (
    <MenuTrigger>
      <Button variant="toolbar">
        <Icon className="h-5" />
      </Button>
      <Menu
        autoClose
        placement="bottom"
        selectionMode="single"
        selectedKeys={selected}
        onAction={handleAction}
        onSelectionChange={setSelected}
      >
        {colorSchemes.map((t) => (
          <MenuItem key={t.name} id={t.name}>
            <t.icon className="h-5" />
            <span>{t.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}

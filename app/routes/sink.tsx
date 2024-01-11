import type { MetaFunction } from '@remix-run/node';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '#app/components/(ui)/button/button';
import { Menu, MenuContent, MenuItem } from '#app/components/(ui)/menu/menu';
import { AppHeader } from '#app/components/header/app-header';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
};

export default function Index() {
  return (
    <div>
      <AppHeader />
      <div className="mx-12 mt-20 h-[2000px] p-4 bg-panel">
        Content
        <div className="flex mt-8 justify-center">
          <Menu>
            <Button className="flex items-center gap-2 cursor-default">
              <span>Menu</span>
              <ChevronDownIcon size={16} strokeWidth={3} />
            </Button>
            <MenuContent>
              <MenuItem>Item One</MenuItem>
              <MenuItem>Item Two</MenuItem>
              <MenuItem>Item Three</MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </div>
    </div>
  );
}

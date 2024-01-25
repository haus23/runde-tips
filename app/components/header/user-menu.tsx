import { UserIcon } from 'lucide-react';
import { useUser } from '#app/utils/auth';
import { Button } from '../(ui)/button';
import { Menu, MenuItem, MenuTrigger } from '../(ui)/menu/menu';

export function UserMenu() {
  const user = useUser();

  return (
    <MenuTrigger>
      <Button variant="toolbar">
        <UserIcon className="h-5" />
        <Menu autoClose placement="bottom end">
          {user.role.includes('ADMIN') && (
            <MenuItem className="cursor-pointer" href="/manager">
              Manager
            </MenuItem>
          )}
          <MenuItem className="cursor-pointer" href="/logout">
            Log Out
          </MenuItem>
        </Menu>
      </Button>
    </MenuTrigger>
  );
}

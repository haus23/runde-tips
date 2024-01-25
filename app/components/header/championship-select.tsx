import { Search } from 'lucide-react';
import { Button } from '../(ui)/button';

export function ChampionshipSelect() {
  return (
    <Button variant="toolbar" className="flex items-center gap-x-1">
      <Search className="h-5" />
      <span className="hidden md:block font-medium">Turnier</span>
    </Button>
  );
}

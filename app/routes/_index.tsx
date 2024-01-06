import { AppHeader } from '#app/components/header/app-header';
import type { MetaFunction } from '@remix-run/node';

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
      <div className="mx-12 mt-20 h-[2000px] p-4 bg-panel">Content</div>
    </div>
  );
}

import type { MetaFunction } from '@remix-run/node';
import { AppHeader } from '~/components/header/app-header';

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
    </div>
  );
}

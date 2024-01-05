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
      <h1>runde.tips</h1>
    </div>
  );
}

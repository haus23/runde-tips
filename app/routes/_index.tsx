import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
};

export default function Index() {
  return (
    <div className="h-14 flex items-center px-4">
      <h1 className="text-2xl font-medium">runde.tips</h1>
    </div>
  );
}

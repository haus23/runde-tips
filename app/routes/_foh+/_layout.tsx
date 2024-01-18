import { Outlet } from '@remix-run/react';
import { AppHeader } from '#app/components/header/app-header';

export default function FohLayout() {
  return (
    <>
      <AppHeader />
      <main className="min-h-dvh mx-auto max-w-5xl pt-14 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}

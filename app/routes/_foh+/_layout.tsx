import { AppHeader } from '#app/components/header/app-header';
import { Outlet } from '@remix-run/react';

export default function FohLayout() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto mt-14 max-w-5xl pb-10 sm:mt-16 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}

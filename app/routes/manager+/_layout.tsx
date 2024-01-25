import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Link } from '#app/components/(ui)/link';
import { Logo } from '#app/components/header/logo/logo';
import { requireAdmin } from '#app/modules/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div>
      <div className="hidden bg-panel md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col">
          <div className="h-14 px-2 sm:px-4 flex items-center border-b border-transparent">
            <Link to="/" className="pl-1 pr-2 w-full" variant="primary">
              <Logo />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:pl-64">
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

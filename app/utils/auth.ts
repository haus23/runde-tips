import { useRevalidator, useRouteLoaderData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import type { loader } from '#app/root';
import { useBroadcastChannel } from './broadcast';

export function useIsAuthenticated() {
  const data = useRouteLoaderData<typeof loader>('root');

  return !!data && !!data.user;
}

export function AuthReload() {
  const data = useRouteLoaderData<typeof loader>('root');
  const lastUser = useRef(data?.user?.id);
  const initialMount = useRef(true);
  const authChangeReceived = useRef(false);

  const revalidator = useRevalidator();
  const broadcastAuthChange = useBroadcastChannel<void>('auth', () => {
    authChangeReceived.current = true;
    if (revalidator.state === 'idle') {
      revalidator.revalidate();
    }
  });

  useEffect(() => {
    initialMount.current = false;
  }, []);

  if (initialMount.current || lastUser.current !== data?.user?.id) {
    lastUser.current = data?.user?.id;
    if (!authChangeReceived.current) broadcastAuthChange();
  }
  authChangeReceived.current = false;

  return null;
}

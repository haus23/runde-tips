import { type LoaderFunctionArgs, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { twMerge } from 'tailwind-merge';
import { getUser } from './modules/auth/auth.server';
import { ClientHintCheck } from './modules/theme/client-hints-check';
import { getHints } from './modules/theme/client-hints.server';
import { getThemeSession } from './modules/theme/session.server';
import { useTheme } from './modules/theme/theme';
import './styles.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  return json({
    user,
    requestInfo: {
      hints: getHints(request),
      prefs: await getThemeSession(request),
    },
  });
}

export default function App() {
  const { colorScheme, brandColors } = useTheme();
  return (
    <html lang="de" className={twMerge(colorScheme, brandColors)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ClientHintCheck />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

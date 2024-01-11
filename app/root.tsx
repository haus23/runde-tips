import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';

import { ClientHintCheck } from './modules/theme/client-hints-check';
import { getHints } from './modules/theme/client-hints.server';
import { getThemeSession } from './modules/theme/session.server';
import { useTheme } from './modules/theme/theme';
import styles from './styles.css';
import { cx } from './utils/cva.config';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      prefs: await getThemeSession(request),
    },
  });
}

export default function App() {
  const { colorScheme, brandColors } = useTheme();
  return (
    <html lang="de" className={cx(colorScheme, brandColors)}>
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

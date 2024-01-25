import { invariant } from '@epic-web/invariant';
import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { type loader } from '#app/root';

export const brandNames = ['default', 'violet', 'orange'] as const;
type Brand = (typeof brandNames)[number];

export const colorSchemeNames = ['system', 'light', 'dark'] as const;
type ColorScheme = (typeof colorSchemeNames)[number];

const brandColors: Record<Brand, string> = {
  default: '',
  violet: 'violet mauve',
  orange: 'orange sand',
} as const;

export type Theme = {
  brand: Brand;
  colorScheme: ColorScheme;
};

export function useTheme() {
  const fetcher = useFetcher();

  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  invariant(rootLoaderData !== undefined, 'No root route data present');

  const theme = {
    brand: rootLoaderData.requestInfo.prefs.data.theme?.brand || 'default',
    colorScheme:
      rootLoaderData.requestInfo.prefs.data.theme?.colorScheme ||
      rootLoaderData.requestInfo.hints.colorScheme,
  } satisfies Theme;

  function setTheme(theme: Theme) {
    fetcher.submit(theme, { method: 'POST', action: '/action/set-theme' });
  }

  return {
    theme,
    setTheme,
    brandColors: brandColors[theme.brand],
    colorScheme:
      theme.colorScheme === 'system'
        ? rootLoaderData.requestInfo.hints.colorScheme
        : theme.colorScheme,
  };
}

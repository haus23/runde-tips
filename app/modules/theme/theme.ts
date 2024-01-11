import { loader } from '#app/root';
import { invariant } from '@epic-web/invariant';
import { useFetcher, useRouteLoaderData } from '@remix-run/react';

const brandNames = ['violet', 'orange'] as const;
type Brand = (typeof brandNames)[number];

const colorSchemes = ['system', 'light', 'dark'] as const;
type ColorScheme = (typeof colorSchemes)[number];

const brandColors: Record<Brand, string> = {
  violet: 'mauve violet',
  orange: 'sand orange',
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
    brand: rootLoaderData.requestInfo.prefs.data.theme?.brand || 'violet',
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

import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => flatRoutes('routes', defineRoutes),
    }),
  ],
});

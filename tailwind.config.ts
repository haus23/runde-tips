import type { Config } from 'tailwindcss';

export default ({
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'), // Remove this line when issue #1 is done
      app: theme('colors.app-bg'),
      panel: theme('colors.panel-bg'),
    }),
    extend: {
      // Do not extend any more when issue #1 is done
      colors: {
        'app-bg': 'var(--app-bg)',
        'panel-bg': 'var(--panel-bg)',
      },
    },
  },
  plugins: [],
} satisfies Config);

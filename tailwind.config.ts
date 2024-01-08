import type { Config } from 'tailwindcss';

export default ({
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    textColor: ({ theme }) => ({
      ...theme('colors'), // Remove this line when issue #1 is done
      app: 'var(--app-fg)',
      subtle: 'var(--app-fg-subtle)',
    }),
    backgroundColor: ({ theme }) => ({
      ...theme('colors'), // Remove this line when issue #1 is done
      app: 'var(--app-bg)',
      panel: 'var(--panel-bg)',
      // Component with neutral color
      cn: {
        DEFAULT: 'var(--component-neutral-bg)',
        hover: 'var(--component-neutral-hover)',
        active: 'var(--component-neutral-active)',
      },
      // Component with accent color
      ca: {
        DEFAULT: 'var(--component-accent-bg)',
        hover: 'var(--component-accent-hover)',
        active: 'var(--component-accent-active)',
      },
      teaser: {
        violet: 'var(--violet-teaser)',
        orange: 'var(--orange-teaser)',
      },
    }),
    ringColor: ({ theme }) => ({
      ...theme('colors'), // Remove this line when issue #1 is done
      ca: 'var(--component-accent-border-ring)',
      cn: 'var(--component-neutral-border-ring)',
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme('colors'), // Remove this line when issue #1 is done
      app: 'var(--app-bg)',
    }),
    extend: {}, // Remove unnecessary default colors
  },
  plugins: [],
} satisfies Config);

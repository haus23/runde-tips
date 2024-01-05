import type { Config } from 'tailwindcss';

export default ({
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.500'),
    }),
    extend: {
      colors: {
        gray: {
          50: 'var(--mauve-1)', // App background
          100: 'var(--mauve-2)', // Subtle background
          200: 'var(--mauve-3)', // Component background
          300: 'var(--mauve-4)', // Component hovered background
          400: 'var(--mauve-5)', // Component active background
          500: 'var(--mauve-6)', // Subtle borders and separators
          600: 'var(--mauve-7)', // UI element border and focus rings
          700: 'var(--mauve-8)', // Hovered UI element border
          800: 'var(--mauve-9)', // Solid backgrounds
          900: 'var(--mauve-10)', // Hovered solid backgrounds
          950: 'var(--mauve-11)', // Subtle text
          full: 'var(--mauve-12)', // High-contrast text
        },
        accent: {
          50: 'var(--violet-1)',
          100: 'var(--violet-2)',
          200: 'var(--violet-3)',
          300: 'var(--violet-4)',
          400: 'var(--violet-5)',
          500: 'var(--violet-6)',
          600: 'var(--violet-7)',
          700: 'var(--violet-8)',
          800: 'var(--violet-9)',
          900: 'var(--violet-10)',
          950: 'var(--violet-11)',
          full: 'var(--violet-12)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config);

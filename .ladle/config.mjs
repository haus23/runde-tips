/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'app/**/*.stories.{ts,tsx}',
  addons: {
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024,
      },
      defaultState: 1024,
    },
  },
};

import type { Story, StoryDefault } from '@ladle/react';

export default ({
  title: 'UI / Button',
  decorators: [
    (Component) => (
      <div className="p-2">
        <Component />
      </div>
    ),
  ],
} satisfies StoryDefault);

export const Default: Story = () => (
  <button className="bg-ca hover:bg-ca-hover" type="button">
    Click mich
  </button>
);

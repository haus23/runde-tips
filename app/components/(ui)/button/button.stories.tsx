import type { Story, StoryDefault } from '@ladle/react';

export default ({
  title: 'UI / Button',
} satisfies StoryDefault);

export const Default: Story = () => <button type="button">Click mich</button>;

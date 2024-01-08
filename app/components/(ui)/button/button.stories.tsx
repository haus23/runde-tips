import type { Story, StoryDefault } from '@ladle/react';
import { Button } from './button';

export default {
  title: 'UI / Button',
  decorators: [
    (Component) => (
      <div className="p-2">
        <Component />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Default: Story = () => (
  <Button variant="default">Click mich</Button>
);

export const Primary: Story = () => (
  <Button variant="primary">Click mich</Button>
);

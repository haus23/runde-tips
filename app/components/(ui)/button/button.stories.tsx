import type { Story, StoryDefault } from '@ladle/react';
import { SunIcon } from 'lucide-react';
import { Button } from './button';

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
  <Button variant="default">Click mich</Button>
);

export const Primary: Story = () => (
  <Button variant="primary">Click mich</Button>
);

export const Toolbar: Story = () => (
  <Button variant="toolbar" size="toolbar">
    Search
  </Button>
);

export const ToolbarIcon: Story = () => (
  <Button variant="toolbar" size="toolbar">
    <SunIcon className="h-5" />
  </Button>
);

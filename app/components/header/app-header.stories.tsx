import { StoryDefault } from '@ladle/react';
import { AppHeader as Component } from './app-header';

export default ({
  title: 'Header',
} satisfies StoryDefault);

export const AppHeader = () => <Component />;

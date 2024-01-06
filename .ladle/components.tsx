import { GlobalProvider } from '@ladle/react';
import { useEffect } from 'react';
import '../app/styles.css';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  useEffect(() => {
    const darkMode = globalState.theme === 'dark';
    const documentElement =
      globalState.width === 0
        ? document.documentElement
        : document.querySelector('iframe')?.contentWindow?.document
            .documentElement;
    documentElement?.classList.toggle('dark', darkMode);
  }, [globalState.theme, globalState.width]);

  return children;
};

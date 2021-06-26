import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import light from '../styles/themes/Light';
import dark from '../styles/themes/Dark';

type ThemeContextType = {
  theme: DefaultTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(() => {
    const appTheme = localStorage.getItem('app-theme');

    if (appTheme === 'dark') return dark;
    else if (appTheme === 'light') return light;
    else {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

      if (darkThemeMq.matches) {
        return dark;
      } else {
        return light;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme.title);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

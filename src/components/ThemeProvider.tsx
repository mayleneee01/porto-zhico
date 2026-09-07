'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);

    // Enable smooth transitions only after first paint is complete
    // This prevents the initial load flash
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('theme-ready');
        readyRef.current = true;
      });
    });
  }, []);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // Apply new theme — CSS transitions on .theme-ready handle smooth animation
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

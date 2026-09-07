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

    // Support for View Transitions API
    if (!document.startViewTransition) {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return;
    }

    let x = e?.clientX;
    let y = e?.clientY;

    // Use currentTarget bounding rect for perfect centering on the button, 
    // and as a reliable fallback for mobile touch events where clientX/Y might be 0 or missing.
    if (e?.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (x === undefined || y === undefined) {
      x = innerWidth / 2;
      y = innerHeight / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // Temporarily disable CSS transitions to prevent lag during the View Transition
    document.body.classList.remove('theme-ready');

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      
      document.documentElement.animate(
        {
          clipPath: theme === 'dark' ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: theme === 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
        }
      );
    });

    // Re-enable CSS transitions after the View Transition completes
    transition.finished.finally(() => {
      document.body.classList.add('theme-ready');
    });
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

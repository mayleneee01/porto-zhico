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
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    
    // Get button position for ripple origin
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the maximum radius needed to cover the entire viewport
    const maxRadius = Math.ceil(
      Math.sqrt(
        Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2
      )
    );

    const ripple = rippleRef.current;
    if (!ripple) return;

    // Set ripple colors based on what the NEW theme will be
    ripple.style.backgroundColor = newTheme === 'light' ? '#f5f5f5' : '#0A0A0A';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.opacity = '1';
    ripple.style.display = 'block';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';

    // Force reflow
    ripple.offsetHeight;

    // Animate the ripple expanding
    ripple.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease 0.7s';
    ripple.style.width = `${maxRadius * 2}px`;
    ripple.style.height = `${maxRadius * 2}px`;
    ripple.style.transform = 'translate(-50%, -50%) scale(1)';

    // Apply theme midway through animation
    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }, 400);

    // Hide ripple after animation completes
    setTimeout(() => {
      ripple.style.opacity = '0';
      ripple.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        ripple.style.display = 'none';
        ripple.style.transition = '';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      }, 300);
    }, 800);
  }, [theme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <>
        <div
          ref={rippleRef}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99999,
            display: 'none',
            opacity: 0,
          }}
        />
        {children}
      </>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        ref={rippleRef}
        style={{
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'none',
          opacity: 0,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

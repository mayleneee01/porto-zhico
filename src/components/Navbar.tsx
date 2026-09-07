'use client';

import { useState, useEffect, useCallback } from 'react';
import { Home, FolderKanban, Briefcase, Trophy, UserCheck, Sun, Moon, Wrench, Code } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { name: 'Skills', href: '/#skills', sectionId: 'skills', icon: Code },
  { name: 'Tools', href: '/#tools', sectionId: 'tools', icon: Wrench },
  { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
  { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: Briefcase },
  { name: 'Milestones', href: '/#certifications', sectionId: 'certifications', icon: Trophy },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  // Section IDs in actual DOM order (top to bottom on the page).
  // This must match the order sections appear in page.tsx, NOT the navLinks display order.
  // Sections without a nav link (about, skills) are included so the algorithm
  // doesn't skip over them and light up the wrong tab.
  const sectionIdsInDomOrder = ['home', 'about', 'skills', 'tools', 'projects', 'experience', 'certifications', 'contact'];

  // Map non-nav sections to the nav section that should be active when scrolled there
  const sectionToNavMap: Record<string, string> = {
    'home': 'home',
    'about': 'home',
    'skills': 'home',
    'tools': 'home',
    'projects': 'projects',
    'experience': 'experience',
    'certifications': 'certifications',
    'contact': 'contact',
  };

  const detectActiveSection = useCallback(() => {
    for (let i = sectionIdsInDomOrder.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIdsInDomOrder[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection(sectionToNavMap[sectionIdsInDomOrder[i]] || sectionIdsInDomOrder[i]);
          return;
        }
      }
    }
    setActiveSection('home');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      detectActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detectActiveSection]);

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    const el = document.getElementById(link.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (link.sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const desktopNavLinks = [
    { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
    { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
    { name: 'Skills', href: '/#skills', sectionId: 'skills', icon: Code },
    { name: 'Tools', href: '/#tools', sectionId: 'tools', icon: Wrench },
    { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: Briefcase },
    { name: 'Milestones', href: '/#certifications', sectionId: 'certifications', icon: Trophy },
    { name: 'Hire Me', href: '/#contact', sectionId: 'contact', icon: UserCheck },
  ];

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav
        className={clsx(
          "floating-nav hidden md:flex items-center gap-1",
          isScrolled && "scrolled"
        )}
      >
        <div className="flex items-center gap-6">
          {desktopNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={clsx(
                "text-sm uppercase tracking-wider transition-all duration-300 relative group px-2 py-1",
                activeSection === link.sectionId
                  ? "font-medium"
                  : "hover:opacity-100 opacity-60"
              )}
              style={{ color: activeSection === link.sectionId ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            >
              {link.name}
              <span
                className={clsx(
                  "absolute -bottom-1 left-0 h-[2px] transition-all duration-300",
                  activeSection === link.sectionId
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )}
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 mx-3" style={{ backgroundColor: 'var(--border-color)' }}></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-[100] flex justify-center pointer-events-none">
        <nav className="mobile-tab-bar floating rounded-2xl pointer-events-auto" style={{
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          padding: '4px 8px'
        }}>
          <div className="flex items-center justify-between gap-1 w-full relative">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isHome = link.name === 'Home';
              const isActive = activeSection === link.sectionId;

              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="mobile-tab-home-container px-2"
                  >
                    <div
                      className={clsx(
                        "mobile-tab-home",
                        isActive && "mobile-tab-home-active"
                      )}
                    >
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                    </div>
                  </a>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="mobile-tab-item py-2 px-3 flex flex-col items-center"
                >
                  <div className={clsx(
                    "mobile-tab-icon transition-transform duration-300",
                    isActive ? "scale-110 mobile-tab-icon-active" : "opacity-70"
                  )}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Theme Toggle - Floating Bottom Right above Tab Bar */}
      <button
        onClick={toggleTheme}
        className="md:hidden fixed bottom-28 right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-primary)',
        }}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
}

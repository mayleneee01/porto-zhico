'use client';

import { useState, useEffect, useCallback } from 'react';
import { Home, FolderKanban, Briefcase, Trophy, UserCheck, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { name: 'Milestones', href: '/#certifications', sectionId: 'certifications', icon: Trophy },
  { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
  { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: Briefcase },
  { name: 'Hire Me', href: '/#contact', sectionId: 'contact', icon: UserCheck },
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

  // Desktop navbar: Home first
  const desktopNavLinks = [
    { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
    { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
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
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[100] mobile-tab-bar">
        <div className="flex justify-around items-end w-full px-2 pb-2 pt-1 relative">
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
                  className="mobile-tab-home-container"
                >
                  <div
                    className={clsx(
                      "mobile-tab-home",
                      isActive && "mobile-tab-home-active"
                    )}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                  <span className={clsx(
                    "text-[10px] mt-1 tracking-wide transition-colors duration-300"
                  )} style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {link.name}
                  </span>
                </a>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="mobile-tab-item"
              >
                <div className={clsx(
                  "mobile-tab-icon",
                  isActive && "mobile-tab-icon-active"
                )}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                <span className={clsx(
                  "text-[10px] mt-0.5 tracking-wide transition-colors duration-300",
                )} style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
    </>
  );
}

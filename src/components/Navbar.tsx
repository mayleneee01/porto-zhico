'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, FolderKanban, Briefcase, Trophy, Mail } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Project', href: '#projects', icon: FolderKanban },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Milestones', href: '#certifications', icon: Trophy },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 hidden md:block",
          isScrolled
            ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-6 max-w-6xl flex justify-center items-center">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm uppercase tracking-wider transition-all duration-300 relative group",
                  activeSection === link.href.replace('#', '')
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300",
                    activeSection === link.href.replace('#', '')
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] mobile-tab-bar">
        <div className="flex justify-around items-end px-2 pb-1 pt-1 relative">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isHome = link.name === 'Home';
            const isActive = activeSection === link.href.replace('#', '');

            if (isHome) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
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
                    "text-[10px] mt-1 tracking-wide transition-colors duration-300",
                    isActive ? "text-white" : "text-gray-500"
                  )}>
                    {link.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
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
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

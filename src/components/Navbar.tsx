'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Home, FolderKanban, Briefcase, Trophy, Mail } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { name: 'Milestones', href: '/#certifications', sectionId: 'certifications', icon: Trophy },
  { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
  { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: Briefcase },
  { name: 'Contact', href: '/#contact', sectionId: 'contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Section IDs in actual DOM order (top to bottom on the page).
  // This must match the order sections appear in page.tsx, NOT the navLinks display order.
  // Sections without a nav link (about, skills) are included so the algorithm
  // doesn't skip over them and light up the wrong tab.
  const sectionIdsInDomOrder = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];

  // Map non-nav sections to the nav section that should be active when scrolled there
  const sectionToNavMap: Record<string, string> = {
    'home': 'home',
    'about': 'home',
    'skills': 'home',
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

  // For desktop, reorder so Home is first if preferred, or keep as is.
  // Actually, standard navbar is Home first. Let's create a desktop specific array.
  const desktopNavLinks = [
    { name: 'Home', href: '/#home', sectionId: 'home', icon: Home },
    { name: 'Project', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
    { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: Briefcase },
    { name: 'Milestones', href: '/#certifications', sectionId: 'certifications', icon: Trophy },
    { name: 'Contact', href: '/#contact', sectionId: 'contact', icon: Mail },
  ];

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
            {desktopNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={clsx(
                  "text-sm uppercase tracking-wider transition-all duration-300 relative group",
                  activeSection === link.sectionId
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300",
                    activeSection === link.sectionId
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            ))}
          </div>
        </div>
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
                    "text-[10px] mt-1 tracking-wide transition-colors duration-300",
                    isActive ? "text-white" : "text-gray-500"
                  )}>
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
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}

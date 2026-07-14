'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, Briefcase, Trophy, Mail } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Project', href: '/project', icon: FolderKanban },
  { name: 'Experience', href: '/experience', icon: Briefcase },
  { name: 'Milestones', href: '/milestones', icon: Trophy },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
                  isActive(link.href)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300",
                    isActive(link.href)
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
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[100] mobile-tab-bar flex justify-center items-end gap-6 pb-2 pt-2 px-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isHome = link.name === 'Home';
          const active = isActive(link.href);

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
                    active && "mobile-tab-home-active"
                  )}
                >
                  <Icon size={24} strokeWidth={active ? 2.5 : 1.5} />
                </div>
                <span className={clsx(
                  "text-[10px] mt-1 tracking-wide transition-colors duration-300",
                  active ? "text-white" : "text-gray-500"
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
                active && "mobile-tab-icon-active"
              )}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              </div>
              <span className={clsx(
                "text-[10px] mt-0.5 tracking-wide transition-colors duration-300",
                active ? "text-white" : "text-gray-500"
              )}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

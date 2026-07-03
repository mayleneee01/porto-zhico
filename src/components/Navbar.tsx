'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'About Me', href: '#about' },
  { name: 'Skill', href: '#skills' },
  { name: 'Project', href: '#projects' },
  { name: 'Certification', href: '#certifications' },
  { name: 'Contact Person', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll listener removed as navbar is now absolute
  }, []);

  return (
    <nav
      className="relative z-50 py-5 w-full bg-transparent border-b border-white/10"
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        {/* Logo removed as requested */}
        <div className="hidden md:block w-8"></div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-dark absolute top-full left-0 right-0 py-4 flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

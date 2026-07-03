'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Award, Briefcase, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Certifications', href: '/admin/certifications', icon: Award },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Hide sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="text-xl font-bold">ZP. ADMIN</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        "md:w-64 border-r border-white/10 flex-col md:flex bg-black z-40",
        isMobileMenuOpen ? "flex" : "hidden"
      )}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-2xl font-bold tracking-widest text-gradient">
            ZP. ADMIN
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen relative">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

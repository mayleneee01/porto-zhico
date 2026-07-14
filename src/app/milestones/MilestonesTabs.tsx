'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function MilestonesTabs({ counts }: { counts: Record<string, number> }) {
  const pathname = usePathname();
  
  const tabs = [
    { key: 'all', label: 'All', href: '/milestones' },
    { key: 'certification', label: 'Certification', href: '/milestones/certification' },
    { key: 'award', label: 'Award', href: '/milestones/award' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={clsx(
              "filter-tab group relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300",
              isActive
                ? "bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200 hover:border-white/20"
            )}
          >
            {tab.label}
            <span className={clsx(
              "ml-1.5 md:ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300",
              isActive
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-500 group-hover:text-gray-300"
            )}>
              {counts[tab.key] ?? 0}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

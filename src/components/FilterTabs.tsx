'use client';

import clsx from 'clsx';

export interface FilterCategory {
  key: string;
  label: string;
}

interface FilterTabsProps {
  categories: FilterCategory[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
  counts: Record<string, number>;
}

export default function FilterTabs({ categories, activeFilter, onFilterChange, counts }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilterChange(cat.key)}
          className={clsx(
            "filter-tab group relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300",
            activeFilter === cat.key
              ? "bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200 hover:border-white/20"
          )}
        >
          {cat.label}
          <span className={clsx(
            "ml-1.5 md:ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300",
            activeFilter === cat.key
              ? "bg-white/20 text-white"
              : "bg-white/5 text-gray-500 group-hover:text-gray-300"
          )}>
            {counts[cat.key] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}

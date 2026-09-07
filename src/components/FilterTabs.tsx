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
          )}
          style={activeFilter === cat.key ? {
            background: 'var(--bg-card-hover)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-card-border-hover)',
            boxShadow: '0 0 15px var(--glow-color)',
          } : {
            background: 'var(--badge-bg)',
            color: 'var(--text-tertiary)',
            border: '1px solid var(--badge-border)',
          }}
        >
          {cat.label}
          <span
            className="ml-1.5 md:ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300"
            style={activeFilter === cat.key ? {
              background: 'var(--bg-card-hover)',
              color: 'var(--text-primary)',
            } : {
              background: 'var(--badge-bg)',
              color: 'var(--text-muted)',
            }}
          >
            {counts[cat.key] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}

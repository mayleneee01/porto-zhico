'use client';

import { useState, useMemo } from 'react';
import FadeIn from './FadeIn';
import FilterTabs, { FilterCategory } from './FilterTabs';
import { Award, ExternalLink } from 'lucide-react';
import { Certification } from '@/generated/prisma';
import Image from 'next/image';

const FILTER_CATEGORIES: FilterCategory[] = [
  { key: 'all', label: 'All' },
  { key: 'certification', label: 'Certification' },
  { key: 'award', label: 'Award' },
];

export default function Certifications({ certs }: { certs: Certification[] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: certs.length };
    for (const cert of certs) {
      const cat = cert.category || 'certification';
      result[cat] = (result[cat] || 0) + 1;
    }
    return result;
  }, [certs]);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'all') return certs;
    return certs.filter(cert => (cert.category || 'certification') === activeFilter);
  }, [certs, activeFilter]);

  return (
    <section id="certifications" className="py-24 relative z-10" style={{
      backgroundColor: 'var(--section-alt-bg)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-8 tracking-wider text-center font-[family-name:var(--font-cyber)]" style={{ color: 'var(--text-primary)' }}>MILESTONES</h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <FilterTabs
            categories={FILTER_CATEGORIES}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredCerts.map((cert, index) => (
            <FadeIn key={cert.id} direction="up" delay={index * 0.1}>
              <div className="glass rounded-2xl flex flex-row md:flex-col group hover:shadow-[0_0_20px_var(--glow-color)] transition-all overflow-hidden h-full items-center md:items-stretch" style={{
                borderColor: 'var(--glass-border)',
              }}>
                {/* Image Cover */}
                <div className="w-28 h-28 md:w-full md:h-auto md:aspect-video relative overflow-hidden shrink-0" style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  {cert.image ? (
                    <Image src={cert.image} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-[10px] md:text-sm" style={{ color: 'var(--text-muted)' }}>No Image</div>
                  )}
                  <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md text-[10px] md:text-xs font-mono shadow-md w-max" style={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    {cert.date}
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-2 left-2 z-10 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] md:text-[10px] font-mono uppercase tracking-wider" style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    {cert.category || 'certification'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors" style={{
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--badge-border)',
                      color: 'var(--text-tertiary)',
                    }}>
                      <Award size={16} className="md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-lg font-semibold leading-tight truncate md:whitespace-normal" style={{ color: 'var(--text-primary)' }}>{cert.name}</h3>
                      <p className="text-xs md:text-sm font-medium mt-0.5 md:mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2 md:pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold tracking-wider transition-colors" style={{ color: 'var(--text-primary)' }}>
                        VERIFY <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] md:text-xs font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>NO URL</span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {filteredCerts.length === 0 && (
            <div className="col-span-full text-center py-8" style={{ color: 'var(--text-muted)' }}>
              {certs.length === 0 ? 'No milestones added yet.' : 'No items match this filter.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

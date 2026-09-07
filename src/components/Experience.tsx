'use client';

import { useState, useMemo } from 'react';
import FadeIn from './FadeIn';
import FilterTabs, { FilterCategory } from './FilterTabs';
import { Experience as ExperienceModel } from '@/generated/prisma';
import Image from 'next/image';

const FILTER_CATEGORIES: FilterCategory[] = [
  { key: 'all', label: 'All' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'organization', label: 'Organization' },
];

export default function Experience({ experiences }: { experiences: ExperienceModel[] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: experiences.length };
    for (const exp of experiences) {
      const cat = exp.category || 'professional';
      result[cat] = (result[cat] || 0) + 1;
    }
    return result;
  }, [experiences]);

  const filteredExperiences = useMemo(() => {
    if (activeFilter === 'all') return experiences;
    return experiences.filter(exp => (exp.category || 'professional') === activeFilter);
  }, [experiences, activeFilter]);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn direction="up">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
              EXPERIENCE
            </h2>
            <div className="mt-3 mx-auto w-16 h-[2px]" style={{ background: 'var(--led-color)' }}></div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <FilterTabs
            categories={FILTER_CATEGORIES}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </FadeIn>

        <div className="relative ml-4 md:ml-0 mt-8">
          {/* Timeline line - Mobile left, Desktop center */}
          <div
            className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-[2px]"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--border-color) 10%, var(--border-color) 90%, transparent)`
            }}
          ></div>

          {filteredExperiences.map((exp, index) => (
            <FadeIn key={exp.id} direction="up" delay={index * 0.1}>
              <div className="mb-12 ml-8 md:ml-0 md:flex md:items-center relative">
                {/* Timeline dot */}
                <div
                  className="timeline-dot absolute w-4 h-4 rounded-full -left-[39px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10"
                  style={{
                    backgroundColor: 'var(--led-color)',
                    boxShadow: `0 0 10px var(--led-glow)`,
                  }}
                ></div>

                {/* Desktop Date (Left side) */}
                <div className="hidden md:block w-1/2 shrink-0 pr-12 text-right">
                  <span
                    className="text-sm font-mono px-3 py-1 rounded"
                    style={{
                      color: 'var(--text-tertiary)',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--badge-border)',
                    }}
                  >
                    {exp.date}
                  </span>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 shrink-0 md:pl-12">
                  <div
                    className="exp-card glass p-4 md:p-6 rounded-2xl group transition-colors relative overflow-hidden"
                  >
                    {/* Subtle glow on hover */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'var(--led-glow-far)' }}
                    ></div>

                    {/* Mobile Date & Badges */}
                    <div className="md:hidden flex flex-wrap gap-2 mb-4">
                      <span
                        className="text-xs font-mono px-2 py-1 rounded"
                        style={{
                          color: 'var(--text-tertiary)',
                          background: 'var(--badge-bg)',
                          border: '1px solid var(--badge-border)',
                        }}
                      >
                        {exp.date}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider"
                        style={{
                          color: 'var(--badge-text)',
                          background: 'var(--badge-bg)',
                          border: '1px solid var(--badge-border)',
                        }}
                      >
                        {exp.category || 'professional'}
                      </span>
                      {exp.gpa && (
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-blue-900/30 border border-blue-500/30 text-blue-300 uppercase tracking-wider">
                          GPA: {exp.gpa}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      {exp.icon && (
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative mt-1"
                          style={{
                            background: 'var(--badge-bg)',
                            border: '1px solid var(--badge-border)',
                          }}
                        >
                          <Image src={exp.icon} alt={exp.company} fill className="object-contain p-1.5" />
                        </div>
                      )}
                      <div className="min-w-0 break-words flex-grow">
                        <h3 className="text-base md:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {exp.position}
                        </h3>
                        <h4 className="text-xs md:text-md font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                          {exp.company}
                        </h4>
                        
                        {/* Desktop Badges */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          <span
                            className="backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
                            style={{
                              color: 'var(--badge-text)',
                              background: 'var(--badge-bg)',
                              border: '1px solid var(--badge-border)',
                            }}
                          >
                            {exp.category || 'professional'}
                          </span>
                          {exp.gpa && (
                            <span className="bg-blue-900/30 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-mono text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                              GPA: {exp.gpa}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm leading-relaxed font-light mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {filteredExperiences.length === 0 && (
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
              {experiences.length === 0 ? 'No experiences added yet.' : 'No items match this filter.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

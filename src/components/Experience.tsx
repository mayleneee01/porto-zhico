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
          <h2 className="text-4xl font-bold mb-8 tracking-wider text-center text-gradient">EXPERIENCE</h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <FilterTabs
            categories={FILTER_CATEGORIES}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </FadeIn>

        <div className="relative border-l border-white/20 ml-4 md:ml-0 md:pl-0 mt-8">
          {filteredExperiences.map((exp, index) => (
            <FadeIn key={exp.id} direction="up" delay={index * 0.1}>
              <div className="mb-10 ml-8 md:ml-0 md:flex md:items-center relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 rounded-full bg-white -left-[39px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"></div>

                {/* Desktop Date (Left side) */}
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <span className="text-sm font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10">{exp.date}</span>
                </div>

                {/* Content (Right side or Full on Mobile) */}
                <div className="md:w-1/2 md:pl-12">
                  <div className="glass p-6 rounded-2xl group hover:border-white/30 transition-colors relative">
                    {/* Mobile Date */}
                    <div className="md:hidden flex flex-wrap gap-2 mb-4">
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">{exp.date}</span>
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider">
                        {exp.category || 'professional'}
                      </span>
                      {exp.gpa && (
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-blue-900/30 border border-blue-500/30 text-blue-300 uppercase tracking-wider">
                          GPA: {exp.gpa}
                        </span>
                      )}
                    </div>

                    {/* Desktop Category badge */}
                    <div className="hidden md:flex absolute top-4 right-4 z-10 gap-2">
                      <div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-mono text-gray-300 border border-white/10 uppercase tracking-wider">
                        {exp.category || 'professional'}
                      </div>
                      {exp.gpa && (
                        <div className="bg-blue-900/30 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-mono text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                          GPA: {exp.gpa}
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      {exp.icon && (
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative mt-1">
                          <Image src={exp.icon} alt={exp.company} fill className="object-contain p-1.5" />
                        </div>
                      )}
                      <div className="min-w-0 break-words flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-100">{exp.position}</h3>
                        <h4 className="text-sm md:text-md font-medium text-gray-400">{exp.company}</h4>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {filteredExperiences.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              {experiences.length === 0 ? 'No experiences added yet.' : 'No items match this filter.'}
            </div>
          )}

          {/* Desktop Center Line override */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20"></div>
        </div>
      </div>
    </section>
  );
}

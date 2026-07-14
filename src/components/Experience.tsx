'use client';

import { useState, useMemo } from 'react';
import FadeIn from './FadeIn';
import FilterTabs, { FilterCategory } from './FilterTabs';
import { Experience as ExperienceModel } from '@/generated/prisma';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';

const FILTER_CATEGORIES: FilterCategory[] = [
  { key: 'all', label: 'All' },
  { key: 'professional', label: 'Professional' },
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
    <section id="experience" className="py-24 relative z-10 bg-black/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-8 tracking-wider text-center text-white font-[family-name:var(--font-cyber)]">EXPERIENCE</h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <FilterTabs
            categories={FILTER_CATEGORIES}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredExperiences.map((exp, index) => (
            <FadeIn key={exp.id} direction="up" delay={index * 0.1}>
              <div className="glass p-6 md:p-8 rounded-2xl h-full flex flex-col group hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative group-hover:border-white/30 transition-colors">
                      {exp.icon ? (
                        <Image src={exp.icon} alt={exp.company} fill className="object-contain p-2" />
                      ) : (
                        <Briefcase size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-100 leading-tight">{exp.position}</h3>
                      <p className="text-sm md:text-md text-gray-400 font-medium mt-1">{exp.company}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 font-light text-sm leading-relaxed flex-grow mb-6">
                  {exp.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">{exp.date}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 uppercase tracking-wider">
                    {exp.category || 'professional'}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
          {filteredExperiences.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              {experiences.length === 0 ? 'No experiences added yet.' : 'No items match this filter.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

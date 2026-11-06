'use client';

import FadeIn from './FadeIn';
import * as Icons from 'lucide-react';
import { Tool } from '@/generated/prisma';

export default function Tools({ tools = [] }: { tools?: Tool[] }) {
  if (!tools || tools.length === 0) return null;

  const renderIcon = (iconVal: string | null, name: string) => {
    if (!iconVal) return <Icons.Terminal size={20} />;

    const isImageUrl =
      iconVal.startsWith('http://') ||
      iconVal.startsWith('https://') ||
      iconVal.startsWith('/') ||
      iconVal.startsWith('data:');

    if (isImageUrl) {
      return (
        <img
          src={iconVal}
          alt={name}
          className="w-full h-full object-contain"
        />
      );
    }

    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[iconVal];
    return IconComponent ? <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icons.Terminal className="w-4 h-4 sm:w-5 sm:h-5" />;
  };

  return (
    <section id="tools" className="py-16 md:py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl mb-8 md:mb-12">
        <FadeIn direction="up">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-center font-[family-name:var(--font-cyber)]" style={{ color: 'var(--text-primary)' }}>
            TOOLS & SOFTWARE
          </h2>
          <p className="text-center mt-2 md:mt-3 tracking-widest text-[11px] md:text-xs uppercase" style={{ color: 'var(--text-tertiary)' }}>
            Frequently used in my workflow
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <FadeIn direction="up" delay={0.2}>
          <div className="pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-x-6 md:gap-y-4">
              {tools.map((tool, i) => (
                <div
                  key={`${tool.id}-${i}`}
                  className="flex items-center gap-2.5 sm:gap-3 md:gap-4 px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 rounded-xl transition-all duration-300 cursor-default group min-w-0 overflow-hidden"
                  style={{ background: 'var(--tools-card-bg)', border: '1px solid var(--tools-card-border)' }}
                  title={tool.name}
                >
                  <div
                    className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {renderIcon(tool.icon, tool.name)}
                  </div>
                  <span
                    className="text-xs sm:text-sm md:text-base font-medium tracking-wide truncate min-w-0 block transition-colors duration-300"
                    style={{ color: 'var(--tools-text)' }}
                  >
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

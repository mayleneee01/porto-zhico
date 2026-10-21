'use client';

import FadeIn from './FadeIn';
import * as Icons from 'lucide-react';
import { Tool } from '@/generated/prisma';

const defaultTools = [
  'Python', 'Burp Suite', 'Wazuh', 'Ghidra', 'SQLMap', 'Nmap', 'Wireshark',
  'Metasploit', 'Parrot OS', 'VS Code', 'Docker', 'Git', 'Linux',
].map((name, index) => ({
  id: `default-${index}`,
  name,
  icon: 'Terminal',
  order: index,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function Tools({ tools = [] }: { tools?: Tool[] }) {
  const displayTools = tools.length > 0 ? tools : defaultTools;

  const renderIcon = (iconVal: string | null) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[iconVal || 'Terminal'];
    return IconComponent ? <IconComponent size={20} /> : <Icons.Terminal size={20} />;
  };

  return (
    <section id="tools" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold tracking-wider text-center font-[family-name:var(--font-cyber)]" style={{ color: 'var(--text-primary)' }}>
            TOOLS & SOFTWARE
          </h2>
          <p className="text-center mt-3 tracking-widest text-xs uppercase" style={{ color: 'var(--text-tertiary)' }}>
            Frequently used in my workflow
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up" delay={0.2}>
          <div className="pb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-x-8 md:gap-y-4">
              {displayTools.map((tool, i) => (
                <div key={`${tool.id}-${i}`} className="flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 cursor-default group" style={{ background: 'var(--tools-card-bg)', border: '1px solid var(--tools-card-border)' }}>
                  <div className="flex items-center justify-center w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    {renderIcon(tool.icon)}
                  </div>
                  <span className="text-sm md:text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300" style={{ color: 'var(--tools-text)' }}>
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

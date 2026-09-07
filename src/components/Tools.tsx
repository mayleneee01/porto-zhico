'use client';

import FadeIn from './FadeIn';
import * as Icons from 'lucide-react';
import { Tool } from '@/generated/prisma';

const defaultTools = [
  { id: '1', name: 'Python', icon: 'https://cdn.simpleicons.org/python/white', order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Burp Suite', icon: 'https://cdn.simpleicons.org/burpsuite/white', order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Wazuh', icon: '🛡️', order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Ghidra', icon: '🐉', order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', name: 'SQLMap', icon: '💉', order: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: '6', name: 'Nmap', icon: '🔍', order: 6, createdAt: new Date(), updatedAt: new Date() },
  { id: '7', name: 'Wireshark', icon: 'https://cdn.simpleicons.org/wireshark/white', order: 7, createdAt: new Date(), updatedAt: new Date() },
  { id: '8', name: 'Metasploit', icon: '💀', order: 8, createdAt: new Date(), updatedAt: new Date() },
  { id: '9', name: 'Kali Linux', icon: 'https://cdn.simpleicons.org/kalilinux/white', order: 9, createdAt: new Date(), updatedAt: new Date() },
  { id: '10', name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', order: 10, createdAt: new Date(), updatedAt: new Date() },
  { id: '11', name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white', order: 11, createdAt: new Date(), updatedAt: new Date() },
  { id: '12', name: 'Git', icon: 'https://cdn.simpleicons.org/git/white', order: 12, createdAt: new Date(), updatedAt: new Date() },
  { id: '13', name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/white', order: 13, createdAt: new Date(), updatedAt: new Date() },
];

export default function Tools({ tools = [] }: { tools?: Tool[] }) {
  const displayTools = tools.length > 0 ? tools : defaultTools;

  const renderIcon = (iconVal: string | null) => {
    if (!iconVal) return <Icons.Terminal size={20} />;
    
    // Support for real image logos via URL
    if (iconVal.startsWith('http') || iconVal.startsWith('/')) {
      return <img src={iconVal} alt="Icon" width={24} height={24} className="object-contain theme-invert" />;
    }

    // Emoji check (simple heuristic)
    if (/\p{Emoji}/u.test(iconVal)) {
      return <span className="text-xl leading-none">{iconVal}</span>;
    }

    const IconComponent = (Icons as any)[iconVal];
    return IconComponent ? <IconComponent size={20} /> : <Icons.Terminal size={20} />;
  };

  return (
    <section id="tools" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <FadeIn direction="up">
          <h2
            className="text-4xl font-bold tracking-wider text-center font-[family-name:var(--font-cyber)]"
            style={{ color: 'var(--text-primary)' }}
          >
            TOOLS & SOFTWARE
          </h2>
          <p className="text-center mt-3 tracking-widest text-xs uppercase" style={{ color: 'var(--text-tertiary)' }}>
            Frequently used in my workflow
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up" delay={0.2}>
          <div className="overflow-x-auto pb-6 custom-scrollbar">
            {/* Grid layout with max 8 rows, flowing into columns */}
            <div 
              className="grid gap-x-8 gap-y-3"
              style={{
                gridTemplateRows: `repeat(${Math.min(8, displayTools.length)}, minmax(0, 1fr))`,
                gridAutoFlow: 'column',
                gridAutoColumns: 'minmax(240px, 1fr)'
              }}
            >
              {displayTools.map((tool, i) => (
                <div
                  key={`${tool.id}-${i}`}
                  className="flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 cursor-default group"
                  style={{
                    background: 'var(--tools-card-bg)',
                    border: '1px solid var(--tools-card-border)',
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {renderIcon(tool.icon)}
                  </div>
                  <span
                    className="text-sm md:text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300"
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

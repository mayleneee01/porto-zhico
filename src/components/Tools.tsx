'use client';

import FadeIn from './FadeIn';

const tools = [
  { name: 'Python', icon: '🐍' },
  { name: 'Burp Suite', icon: '🔓' },
  { name: 'Wazuh', icon: '🛡️' },
  { name: 'Nmap', icon: '🔍' },
  { name: 'Wireshark', icon: '🦈' },
  { name: 'Metasploit', icon: '💀' },
  { name: 'Kali Linux', icon: '🐉' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Splunk', icon: '📊' },
  { name: 'OWASP ZAP', icon: '⚡' },
  { name: 'Hashcat', icon: '🔐' },
];

export default function Tools() {
  // Duplicate the list for seamless infinite scroll
  const doubledTools = [...tools, ...tools];

  return (
    <section id="tools" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl mb-10">
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

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, var(--bg-primary), transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, var(--bg-primary), transparent)` }}
        />

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <div className="tools-marquee-track">
            {doubledTools.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="flex-shrink-0 mx-3 group"
              >
                <div
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 cursor-default group-hover:scale-105"
                  style={{
                    background: 'var(--tools-card-bg)',
                    border: '1px solid var(--tools-card-border)',
                  }}
                >
                  <span className="text-xl md:text-2xl">{tool.icon}</span>
                  <span
                    className="text-sm md:text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300"
                    style={{ color: 'var(--tools-text)' }}
                  >
                    {tool.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

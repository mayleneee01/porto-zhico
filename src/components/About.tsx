import FadeIn from './FadeIn';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 tracking-wider text-center" style={{ color: 'var(--text-primary)' }}>ABOUT ME</h2>
        </FadeIn>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <FadeIn direction="right" className="w-full md:w-1/3 flex justify-center">
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full p-1 relative overflow-hidden group" style={{
              border: '4px solid var(--bg-card-border)',
              boxShadow: '0 0 40px var(--glow-color)',
            }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ backgroundColor: 'var(--bg-card)' }}></div>
              <div className="relative w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
                <Image 
                  src="/profile.png" 
                  alt="Zhico Pradita" 
                  fill 
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                  className="object-cover object-[center_20%]" 
                />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full md:w-2/3">
            <div className="glass p-5 md:p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: 'var(--bg-card)' }}></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>SOC Analyst & Penetration Tester</h3>
              <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-light" style={{ color: 'var(--text-secondary)' }}>
                As an Informatics student at <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Institut Teknologi Sumatera (ITERA)</strong>, I have cultivated a profound expertise in cybersecurity. My mission is not merely to understand digital threats, but to anticipate, hunt, and neutralize them before they compromise critical infrastructure.
              </p>
              <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-light" style={{ color: 'var(--text-secondary)' }}>
                I thrive in the dynamic landscape of cybersecurity, bringing hands-on expertise in log and network monitoring via <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>SIEM Wazuh</strong>. My background spans <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Penetration Testing</strong>, active <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Bug Hunting</strong>, and various <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Freelance</strong> engagements. This diverse experience empowers me to adopt an attacker&apos;s mindset while designing robust, resilient defensive strategies.
              </p>
              <p className="text-xs md:text-lg leading-relaxed font-light italic pl-4 py-1" style={{
                color: 'var(--text-secondary)',
                borderLeft: '2px solid var(--border-color)',
              }}>
                &quot;In the realm of cybersecurity, true power lies not in breaking systems, but in architecting an unbreakable digital ecosystem for the future.&quot;
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

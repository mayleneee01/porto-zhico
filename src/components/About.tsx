import FadeIn from './FadeIn';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-12 tracking-wider text-center text-gradient">ABOUT ME</h2>
        </FadeIn>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <FadeIn direction="right" className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white/20 p-1 relative overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white/5">
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
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold text-white mb-4">SOC Analyst & Penetration Tester</h3>
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-light">
                As an Informatics student at <strong className="text-white font-medium">Institut Teknologi Sumatera (ITERA)</strong>, I have cultivated a profound expertise in cybersecurity. My mission is not merely to understand digital threats, but to anticipate, hunt, and neutralize them before they compromise critical infrastructure.
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-light">
                I thrive in the dynamic landscape of cybersecurity, bringing hands-on expertise in log and network monitoring via <strong className="text-white font-medium">SIEM Wazuh</strong>. My background spans <strong className="text-white font-medium">Penetration Testing</strong>, active <strong className="text-white font-medium">Bug Hunting</strong>, and various <strong className="text-white font-medium">Freelance</strong> engagements. This diverse experience empowers me to adopt an attacker's mindset while designing robust, resilient defensive strategies.
              </p>
              <p className="text-lg leading-relaxed text-gray-300 font-light italic border-l-2 border-white/30 pl-4 py-1">
                "In the realm of cybersecurity, true power lies not in breaking systems, but in architecting an unbreakable digital ecosystem for the future."
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

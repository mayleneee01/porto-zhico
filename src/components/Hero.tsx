import FadeIn from './FadeIn';
import Image from 'next/image';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-black via-white/30 to-black"></div>
        <div className="absolute w-[40vw] h-[40vw] bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/4"></div>
        <div className="absolute w-[30vw] h-[30vw] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4"></div>
      </div>

      <div className="z-10 text-center px-6">
        <FadeIn direction="up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-gradient">
            PORTFOLIO
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <div className="flex justify-center mb-6 mt-4">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500">
              <Image src="/profile.png" alt="Zhico Pradita" fill className="object-cover" priority />
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-light text-white mb-2 tracking-widest uppercase">
            Zhico Pradita
          </h2>
          <h3 className="text-lg md:text-xl font-light text-gray-500 mb-6 tracking-wide">
            Security Analyst
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            I identify and secure digital assets from cyber threats. As an informatics student specializing in Penetration Testing and Bug Bounty – turning vulnerabilities into robust defenses.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.4}>
          <div className="flex justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <GithubIcon size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <InstagramIcon size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <LinkedinIcon size={28} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

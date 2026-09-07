"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import FadeIn from './FadeIn';

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force muted and autoplay via JS to bypass strict browser policies (Safari/Chrome)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay was prevented by the browser:", error);
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Video Background Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.warn(e));
          }
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* LAYER 1: Base Darkening */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--hero-overlay)' }}></div>

      {/* LAYER 2: Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-30" 
        style={{ 
          backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }}
      ></div>

      {/* LAYER 3: Radial Vignette */}
      <div className="absolute inset-0 z-0" style={{
        background: `radial-gradient(circle at center, transparent 20%, var(--bg-primary) 120%)`
      }}></div>

      {/* LAYER 4: Bottom Fade */}
      <div className="absolute inset-0 z-0" style={{
        background: `linear-gradient(to bottom, transparent, transparent 50%, var(--bg-primary))`
      }}></div>

      {/* HERO CONTENT */}
      <div className="z-10 relative flex flex-col items-center justify-center w-full max-w-5xl px-6">
        
        {/* Profile Photo Behind LED Text */}
        <div className="relative flex flex-col items-center">
          {/* Half-body profile photo */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-[22rem] mb-4">
              <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}>
                <Image
                  src="/profile.png"
                  alt="Zhico Pradita"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                  className="object-cover object-[center_15%]"
                />
              </div>
              {/* Subtle glow behind */}
              <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl" style={{
                background: `radial-gradient(circle, var(--led-glow-far) 0%, transparent 70%)`
              }}></div>
            </div>
          </FadeIn>

          {/* LED Marquee Text */}
          <FadeIn direction="up" delay={0.3}>
            <div className="led-container w-[90vw] max-w-3xl h-16 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden">
              <div className="led-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                ZHICO&nbsp;&nbsp;PRADITA
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Subtitle */}
        <FadeIn direction="up" delay={0.5}>
          <p className="text-xs sm:text-sm md:text-lg font-light tracking-[0.3em] sm:tracking-widest mt-4 mb-8 uppercase text-center" style={{ color: 'var(--text-secondary)' }}>
            Breaking Systems to Build Better Defenses
          </p>
        </FadeIn>
        
        {/* Social Links */}
        <FadeIn direction="up" delay={0.7}>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/mayleneee01" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }}>
              <GithubIcon size={28} />
            </a>
            <a href="https://www.linkedin.com/in/zhico-pradita-6763432b2" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }}>
              <LinkedinIcon size={28} />
            </a>
            <a href="https://www.instagram.com/zhicoapta/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }}>
              <InstagramIcon size={28} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from 'react';
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
  const [videoOpacity, setVideoOpacity] = useState(1);

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

  // Smooth loop fade transition
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Fade out slightly during the last 0.5 seconds to hide abrupt loops
      if (duration > 0 && duration - currentTime < 0.5) {
        setVideoOpacity(0.5);
      } else {
        setVideoOpacity(1);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Video Background Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ease-in-out"
        style={{ opacity: videoOpacity }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* LAYER 1: Base Darkening (agar teks tetap terbaca) */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* LAYER 2: Dot Grid Pattern (Elemen Tambahan ala Cyber/Tech) */}
      <div 
        className="absolute inset-0 z-0 opacity-30" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }}
      ></div>

      {/* LAYER 3: Radial Vignette (Shadow di pinggiran layar) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0A0A0A_120%)] z-0"></div>

      {/* LAYER 4: Smooth Bottom Fade (Agar tidak patah saat transisi ke section bawah) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A] z-0"></div>

      <div className="z-10 text-center px-6 relative">
        <FadeIn direction="up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-white font-[family-name:var(--font-cyber)]">
            PORTFOLIO
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-widest uppercase font-[family-name:var(--font-cyber)]">
            Zhico Pradita
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <p className="text-sm md:text-lg text-gray-300 font-light tracking-widest mb-8 uppercase">
            Breaking Systems to Build Better Defenses
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.5}>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/mayleneee01" target="_blank" rel="noreferrer" className="text-white hover:scale-110 transition-transform">
              <GithubIcon size={32} />
            </a>
            <a href="https://www.linkedin.com/in/zhico-pradita-6763432b2" target="_blank" rel="noreferrer" className="text-white hover:scale-110 transition-transform">
              <LinkedinIcon size={32} />
            </a>
            <a href="https://www.instagram.com/zhicoapta/" target="_blank" rel="noreferrer" className="text-white hover:scale-110 transition-transform">
              <InstagramIcon size={32} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

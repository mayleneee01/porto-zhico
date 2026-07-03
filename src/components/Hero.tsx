import FadeIn from './FadeIn';

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
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-gradient font-[family-name:var(--font-cyber)]">
            PORTFOLIO
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-2xl md:text-4xl text-white mb-2 tracking-widest uppercase font-[family-name:var(--font-cyber)]">
            Zhico Pradita
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

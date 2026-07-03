import FadeIn from './FadeIn';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-12 tracking-wider text-center text-gradient">ABOUT ME</h2>
        </FadeIn>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <FadeIn direction="right" className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/20 p-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              {/* Fallback avatar if no image is available */}
              <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-gray-600 text-6xl font-light">
                ZP
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full md:w-2/3">
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold text-white mb-4">Security Researcher & Penetration Tester</h3>
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-light">
                I am an Informatics student at <strong className="text-white font-medium">Institut Teknologi Sumatera (ITERA)</strong> with a deep focus on cybersecurity. I have a strong passion for identifying vulnerabilities and building more resilient defenses.
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-light">
                With hands-on experience in <strong className="text-white font-medium">Penetration Testing</strong>, <strong className="text-white font-medium">Bug Bounty Hunting</strong>, and <strong className="text-white font-medium">Security Auditing</strong>, I continuously sharpen my skills to understand how systems can be exploited and how to prevent it.
              </p>
              <p className="text-lg leading-relaxed text-gray-300 font-light italic border-l-2 border-white/30 pl-4 py-1">
                "I believe that cybersecurity is not just about breaking systems — it's about building a safer digital ecosystem for everyone."
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

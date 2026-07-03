import FadeIn from './FadeIn';
import { Experience as ExperienceModel } from '@/generated/prisma';

export default function Experience({ experiences }: { experiences: ExperienceModel[] }) {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">EXPERIENCE</h2>
        </FadeIn>
        
        <div className="relative border-l border-white/20 ml-4 md:ml-0 md:pl-0">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.id} direction="up" delay={index * 0.1}>
              <div className="mb-10 ml-8 md:ml-0 md:flex md:items-center relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 rounded-full bg-white -left-[39px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"></div>
                
                {/* Desktop Date (Left side) */}
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <span className="text-sm font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10">{exp.date}</span>
                </div>
                
                {/* Content (Right side or Full on Mobile) */}
                <div className="md:w-1/2 md:pl-12">
                  <div className="glass p-6 rounded-2xl group hover:border-white/30 transition-colors relative">
                    {/* Mobile Date */}
                    <span className="md:hidden inline-block mb-3 text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">{exp.date}</span>
                    
                    <h3 className="text-xl font-bold text-gray-100">{exp.position}</h3>
                    <h4 className="text-md font-medium text-gray-400 mb-4">{exp.company}</h4>
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {experiences.length === 0 && (
            <div className="text-center text-gray-500">No experiences added yet.</div>
          )}
          
          {/* Desktop Center Line override */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20"></div>
        </div>
      </div>
    </section>
  );
}

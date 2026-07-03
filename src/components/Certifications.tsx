import FadeIn from './FadeIn';
import { Award, ExternalLink } from 'lucide-react';
import { Certification } from '@/generated/prisma';
import Image from 'next/image';

export default function Certifications({ certs }: { certs: Certification[] }) {
  return (
    <section id="certifications" className="py-24 relative z-10 bg-black/30 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">CERTIFICATIONS</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {certs.map((cert, index) => (
            <FadeIn key={cert.id} direction="up" delay={index * 0.1}>
              <div className="glass rounded-2xl flex flex-row md:flex-col group hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all overflow-hidden h-full items-center md:items-stretch">
                {/* Image Cover */}
                <div className="w-28 h-28 md:w-full md:h-auto md:aspect-video relative bg-[#111] overflow-hidden md:border-b border-white/10 shrink-0">
                  {cert.image ? (
                    <Image src={cert.image} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-[10px] md:text-sm">No Image</div>
                  )}
                  <div className="absolute bottom-2 right-2 md:top-3 md:right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-white/10 text-[9px] md:text-xs font-mono text-gray-300">
                    {cert.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-gray-400 group-hover:text-white transition-colors">
                      <Award size={16} className="md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-100 leading-tight truncate md:whitespace-normal">{cert.name}</h3>
                      <p className="text-xs md:text-sm font-medium text-gray-400 mt-0.5 md:mt-1 truncate">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2 md:pt-4 border-t border-white/5">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold tracking-wider text-white hover:text-gray-300 transition-colors">
                        VERIFY <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600">NO URL</span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {certs.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No certifications added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}

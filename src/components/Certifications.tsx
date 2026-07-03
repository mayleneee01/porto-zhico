import FadeIn from './FadeIn';
import { Award, ExternalLink } from 'lucide-react';
import { Certification } from '@prisma/client';
import Image from 'next/image';

export default function Certifications({ certs }: { certs: Certification[] }) {
  return (
    <section id="certifications" className="py-24 relative z-10 bg-black/30 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">CERTIFICATIONS</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <FadeIn key={cert.id} direction="up" delay={index * 0.1}>
              <div className="glass rounded-2xl flex flex-col group hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all overflow-hidden h-full">
                {/* Image Cover */}
                <div className="aspect-video relative bg-[#111] overflow-hidden border-b border-white/10">
                  {cert.image ? (
                    <Image src={cert.image} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">No Image</div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-gray-300">
                    {cert.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-gray-400 group-hover:text-white transition-colors">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 leading-tight">{cert.name}</h3>
                      <p className="text-sm font-medium text-gray-400 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white hover:text-gray-300 transition-colors">
                        VERIFY CREDENTIAL <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-xs font-bold tracking-wider text-gray-600">NO URL PROVIDED</span>
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

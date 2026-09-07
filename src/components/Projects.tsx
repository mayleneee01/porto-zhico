import FadeIn from './FadeIn';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/generated/prisma';
import Image from 'next/image';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>PROJECTS</h2>
            <div className="mt-3 mx-auto w-16 h-[2px]" style={{ background: 'var(--led-color)' }}></div>
            <p className="mt-4 text-xs md:text-sm tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Selected work & contributions
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {projects.map((project, index) => (
            <FadeIn key={project.id} direction="up" delay={index * 0.1}>
              <div className="project-card glass rounded-2xl overflow-hidden group h-full flex flex-col">
                {/* Image Area */}
                <div className="w-full aspect-[16/10] relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                      No Image
                    </div>
                  )}
                  
                  {/* Hover overlay with action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)'
                  }}>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: 'var(--accent-color)',
                          color: 'var(--accent-foreground)',
                        }}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <GithubIcon size={18} />
                      </a>
                    )}
                  </div>

                  {/* Top gradient for readability */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-grow relative z-[1]">
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm mb-3 md:mb-4 flex-grow line-clamp-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    {project.techStack.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-md whitespace-nowrap"
                        style={{
                          background: 'var(--badge-bg)',
                          border: '1px solid var(--badge-border)',
                          color: 'var(--badge-text)',
                        }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center" style={{ color: 'var(--text-muted)' }}>
              No projects added yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

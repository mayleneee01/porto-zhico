import FadeIn from './FadeIn';
import { ExternalLink } from 'lucide-react';
import { Project } from '@prisma/client';
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
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">PROJECTS</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={project.id} direction="up" delay={index * 0.1}>
              <div className="glass rounded-2xl overflow-hidden group h-full flex flex-col hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                <div className="aspect-video relative bg-[#111] overflow-hidden border-b border-white/10">
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#222] text-white flex items-center justify-center hover:scale-110 transition-transform">
                        <GithubIcon size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{project.title}</h3>
                  <p className="text-gray-400 font-light text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.split(',').map((tech, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No projects added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}

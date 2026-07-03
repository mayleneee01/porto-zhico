import FadeIn from './FadeIn';
import * as Icons from 'lucide-react';
import { Skill } from '@prisma/client';

export default function Skills({ skills }: { skills: Skill[] }) {
  // Helper to render icon by name dynamically
  const renderIcon = (name: string | null) => {
    if (!name) return <Icons.Code2 size={24} />;
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={24} /> : <Icons.Code2 size={24} />;
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">SKILLS</h2>
        </FadeIn>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <FadeIn key={skill.id} direction="up" delay={index * 0.1}>
              <div className="glass p-6 rounded-xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-all">
                  {renderIcon(skill.icon)}
                </div>
                <span className="text-gray-200 font-medium tracking-wide">{skill.name}</span>
              </div>
            </FadeIn>
          ))}
          {skills.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No skills added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}

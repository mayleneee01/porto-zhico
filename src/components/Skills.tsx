import FadeIn from './FadeIn';
import * as Icons from 'lucide-react';
import { Skill } from '@/generated/prisma';

const CATEGORY_ORDER = [
  'OFFENSIVE SECURITY',
  'DEFENSIVE SECURITY',
  'INVESTIGATION & ANALYSIS',
  'OTHER SKILLS'
];

const SKILL_CONFIG: Record<string, { category: string; icon: string }> = {
  'Penetration Testing': { category: 'OFFENSIVE SECURITY', icon: 'Target' },
  'Vulnerability Assessment': { category: 'OFFENSIVE SECURITY', icon: 'Bug' },
  'Reconnaissance & OSINT': { category: 'OFFENSIVE SECURITY', icon: 'Crosshair' },
  'Web Application Exploitation': { category: 'OFFENSIVE SECURITY', icon: 'Bug' },
  'Red Teaming': { category: 'OFFENSIVE SECURITY', icon: 'Crosshair' },
  'Log Monitoring & Analysis': { category: 'DEFENSIVE SECURITY', icon: 'ShieldAlert' },
  'Network Security': { category: 'DEFENSIVE SECURITY', icon: 'Shield' },
  'Incident Response': { category: 'DEFENSIVE SECURITY', icon: 'ShieldAlert' },
  'Email Investigation & Phishing Analysis': { category: 'INVESTIGATION & ANALYSIS', icon: 'FileSearch' },
  'Malware Analysis': { category: 'INVESTIGATION & ANALYSIS', icon: 'Search' },
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const renderIcon = (name: string | null) => {
    if (!name) return <Icons.Code2 size={24} />;
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={24} /> : <Icons.Code2 size={24} />;
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const config = SKILL_CONFIG[skill.name] || { category: 'OTHER SKILLS', icon: skill.icon || 'Code2' };
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push({ ...skill, configuredIcon: config.icon });
    return acc;
  }, {} as Record<string, (Skill & { configuredIcon: string })[]>);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-white font-[family-name:var(--font-cyber)]">SKILLS</h2>
        </FadeIn>
        
        {skills.length === 0 && (
          <div className="text-center text-gray-500">No skills added yet.</div>
        )}

        <div className="space-y-16">
          {CATEGORY_ORDER.map((category) => {
            const categorySkills = groupedSkills[category];
            if (!categorySkills || categorySkills.length === 0) return null;

            return (
              <div key={category} className="flex flex-col items-center">
                <FadeIn direction="up">
                  <h3 className="text-sm md:text-base text-gray-400 tracking-[0.2em] mb-8 border-b border-white/10 pb-2 uppercase">{category}</h3>
                </FadeIn>
                
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  {categorySkills.map((skill, index) => (
                    <FadeIn key={skill.id} direction="up" delay={index * 0.1} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
                      <div className="glass p-6 rounded-xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 group h-full">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-all">
                          {renderIcon(skill.configuredIcon)}
                        </div>
                        <span className="text-gray-200 font-medium tracking-wide text-center">{skill.name}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

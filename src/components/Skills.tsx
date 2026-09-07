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
    if (!name) return <Icons.Code2 size={20} />;
    
    // Support for real image logos via URL
    if (name.startsWith('http') || name.startsWith('/')) {
      return <img src={name} alt="Icon" width={20} height={20} className="object-contain theme-invert" />;
    }

    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={20} /> : <Icons.Code2 size={20} />;
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const config = SKILL_CONFIG[skill.name] || { category: 'OTHER SKILLS', icon: skill.icon || 'Code2' };
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push({ ...skill, configuredIcon: config.icon });
    return acc;
  }, {} as Record<string, (Skill & { configuredIcon: string })[]>);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center font-[family-name:var(--font-cyber)]" style={{ color: 'var(--text-primary)' }}>SKILLS</h2>
        </FadeIn>
        
        {skills.length === 0 && (
          <div className="text-center" style={{ color: 'var(--text-muted)' }}>No skills added yet.</div>
        )}

        <div className="space-y-16">
          {CATEGORY_ORDER.map((category) => {
            const categorySkills = groupedSkills[category];
            if (!categorySkills || categorySkills.length === 0) return null;

            return (
              <div key={category} className="flex flex-col">
                <FadeIn direction="up">
                  <h3 className="text-sm md:text-base tracking-[0.2em] mb-6 pb-2 uppercase w-full" style={{
                    color: 'var(--text-tertiary)',
                    borderBottom: '1px solid var(--border-color)',
                  }}>{category}</h3>
                </FadeIn>
                
                <div className={categorySkills.length > 4 ? "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 w-full" : "flex flex-col gap-2 w-full md:w-2/3"}>
                  {categorySkills.map((skill, index) => (
                    <FadeIn key={skill.id} direction="up" delay={index * 0.1}>
                      <div className="flex items-center gap-4 py-3 group cursor-default transition-colors" style={{
                        borderBottom: '1px solid var(--border-subtle)',
                      }}>
                        <div className="shrink-0 transition-colors" style={{ color: 'var(--text-muted)' }}>
                          {renderIcon(skill.configuredIcon)}
                        </div>
                        <span className="font-medium tracking-wide transition-colors" style={{ color: 'var(--text-secondary)' }}>
                          {skill.name}
                        </span>
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

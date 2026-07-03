import { prisma } from '@/lib/prisma';
import { FolderKanban, Award, Briefcase, Code2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [projectsCount, certsCount, expCount, skillsCount] = await Promise.all([
    prisma.project.count(),
    prisma.certification.count(),
    prisma.experience.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    { name: 'Total Projects', count: projectsCount, icon: FolderKanban },
    { name: 'Certifications', count: certsCount, icon: Award },
    { name: 'Experiences', count: expCount, icon: Briefcase },
    { name: 'Skills', count: skillsCount, icon: Code2 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">DASHBOARD OVERVIEW</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <stat.icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-white">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Welcome to your Portfolio Admin!</h2>
        <p className="text-gray-400">
          Use the sidebar to navigate to different sections and manage your content. Changes made here will instantly reflect on your public portfolio website.
        </p>
      </div>
    </div>
  );
}

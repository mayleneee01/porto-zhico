import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  async function addProject(formData: FormData) {
    'use server';
    await prisma.project.create({
      data: {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        techStack: formData.get('techStack') as string,
        demoUrl: (formData.get('demoUrl') as string) || null,
        githubUrl: (formData.get('githubUrl') as string) || null,
        image: (formData.get('image') as string) || null,
      },
    });
    revalidatePath('/admin/projects');
    revalidatePath('/');
  }

  async function deleteProject(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin/projects');
    revalidatePath('/');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">MANAGE PROJECTS</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Add New Project</h2>
            <form action={addProject} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Title *</label>
                <input required name="title" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Description *</label>
                <textarea required name="description" rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Tech Stack (comma separated) *</label>
                <input required name="techStack" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="React, Tailwind" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Image URL</label>
                <input name="image" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Demo URL</label>
                <input name="demoUrl" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">GitHub URL</label>
                <input name="githubUrl" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="https://..." />
              </div>
              <button type="submit" className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors mt-4">
                ADD PROJECT
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Existing Projects ({projects.length})</h2>
          {projects.map(project => (
            <div key={project.id} className="glass p-4 rounded-xl flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                <p className="text-xs font-mono text-gray-500">{project.techStack}</p>
              </div>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
        </div>
      </div>
    </div>
  );
}

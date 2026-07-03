import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminExperience() {
  const exps = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });

  async function addExp(formData: FormData) {
    'use server';
    await prisma.experience.create({
      data: {
        position: formData.get('position') as string,
        company: formData.get('company') as string,
        date: formData.get('date') as string,
        description: formData.get('description') as string,
      },
    });
    revalidatePath('/admin/experience');
    revalidatePath('/');
  }

  async function deleteExp(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.experience.delete({ where: { id } });
    revalidatePath('/admin/experience');
    revalidatePath('/');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">MANAGE EXPERIENCE</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Add Experience</h2>
            <form action={addExp} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Position *</label>
                <input required name="position" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Company *</label>
                <input required name="company" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Date Range *</label>
                <input required name="date" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="Jan 2024 - Present" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Description *</label>
                <textarea required name="description" rows={4} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors mt-4">
                ADD EXPERIENCE
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Timeline Entries ({exps.length})</h2>
          {exps.map(exp => (
            <div key={exp.id} className="glass p-4 rounded-xl flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <p className="text-md text-gray-300">{exp.company}</p>
                <p className="text-xs font-mono text-gray-500 mb-2">{exp.date}</p>
                <p className="text-sm text-gray-400">{exp.description}</p>
              </div>
              <form action={deleteExp}>
                <input type="hidden" name="id" value={exp.id} />
                <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors mt-1">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
          {exps.length === 0 && <p className="text-gray-500">No experiences found.</p>}
        </div>
      </div>
    </div>
  );
}

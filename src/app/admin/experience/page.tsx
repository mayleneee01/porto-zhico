import { prisma } from '@/lib/prisma';
import { addExp, updateExp, deleteExp } from '../actions';
import { Trash2, Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminExperience({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  // Await searchParams in Next 15+ per new App Router changes
  const params = await searchParams;
  
  const exps = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
  
  const editId = params.edit;
  const editExp = editId ? exps.find(e => e.id === editId) : null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">MANAGE EXPERIENCE & EDUCATION</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editExp ? 'Edit Entry' : 'Add Entry'}</h2>
              {editExp && (
                <Link href="/admin/experience" className="text-xs text-gray-400 hover:text-white transition-colors border border-gray-600 rounded px-2 py-1">
                  Cancel Edit
                </Link>
              )}
            </div>
            
            <form action={editExp ? updateExp : addExp} className="flex flex-col gap-4">
              {editExp && <input type="hidden" name="id" value={editExp.id} />}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Position / Degree *</label>
                <input required defaultValue={editExp?.position || ''} name="position" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Company / Institution *</label>
                <input required defaultValue={editExp?.company || ''} name="company" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Date Range *</label>
                <input required defaultValue={editExp?.date || ''} name="date" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="Jan 2024 - Present" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Description *</label>
                <textarea required defaultValue={editExp?.description || ''} name="description" rows={4} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Category *</label>
                <select name="category" defaultValue={editExp?.category || 'professional'} required className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm">
                  <option value="professional">Professional</option>
                  <option value="organization">Organization</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Company / Institution Logo {editExp && '(Leave empty to keep current)'}</label>
                <input type="file" accept="image/*" name="iconFile" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                {editExp?.icon && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <span>Current Logo:</span>
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 relative overflow-hidden">
                      <Image src={editExp.icon} alt="Current logo" fill className="object-contain p-1" />
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors mt-4 uppercase">
                {editExp ? 'SAVE CHANGES' : 'ADD ENTRY'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Timeline Entries ({exps.length})</h2>
          {exps.map(exp => (
            <div key={exp.id} className={`glass p-4 rounded-xl flex justify-between items-start gap-4 ${editId === exp.id ? 'ring-2 ring-white/50' : ''}`}>
              {exp.icon && (
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative shrink-0">
                  <Image src={exp.icon} alt={exp.company} fill className="object-contain p-1" />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <p className="text-md text-gray-300">{exp.company}</p>
                <p className="text-xs font-mono text-gray-500 mb-2">{exp.date}</p>
                <div className="mb-2">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300">{exp.category}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{exp.description}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link href={`/admin/experience?edit=${exp.id}`} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded transition-colors mt-1">
                  <Edit2 size={18} />
                </Link>
                <form action={deleteExp}>
                  <input type="hidden" name="id" value={exp.id} />
                  <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {exps.length === 0 && <p className="text-gray-500">No entries found.</p>}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Trash2, Edit2, X, Save } from 'lucide-react';
import { Skill } from '@/generated/prisma';
import { deleteSkill, updateSkill } from '../actions';

export default function SkillList({ skills }: { skills: Skill[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (skills.length === 0) {
    return <p className="text-gray-500">No skills found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill) => (
        <div key={skill.id} className="glass p-4 rounded-xl">
          {editingId === skill.id ? (
            <form action={async (formData) => {
              await updateSkill(formData);
              setEditingId(null);
            }} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={skill.id} />
              
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Name *</label>
                <input required name="name" defaultValue={skill.name} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Icon URL</label>
                <input name="icon" defaultValue={skill.icon || ''} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition flex items-center gap-2 text-xs">
                  <X size={14} /> Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-white text-black rounded hover:bg-gray-200 transition flex items-center gap-2 text-xs font-bold">
                  <Save size={14} /> Save
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center h-full">
              <div>
                <h3 className="font-bold text-lg">{skill.name}</h3>
                {skill.icon && <p className="text-xs text-gray-500 truncate w-32">{skill.icon}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditingId(skill.id)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-2 rounded transition-colors">
                  <Edit2 size={18} />
                </button>
                <form action={deleteSkill}>
                  <input type="hidden" name="id" value={skill.id} />
                  <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

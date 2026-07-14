'use client';

import { useState } from 'react';
import { Trash2, Edit2, X, Save } from 'lucide-react';
import { Project } from '@/generated/prisma';
import { deleteProject, updateProject } from '../actions';

import DraggableList from '@/components/admin/DraggableList';

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (projects.length === 0) {
    return <p className="text-gray-500">No projects found.</p>;
  }

  return (
    <DraggableList 
      items={projects} 
      model="Project"
      renderItem={(project) => (
        <div className="glass p-4 rounded-xl">
          {editingId === project.id ? (
            <form action={async (formData) => {
              await updateProject(formData);
              setEditingId(null);
            }} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={project.id} />
              
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Title *</label>
                <input required name="title" defaultValue={project.title} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Description *</label>
                <textarea required name="description" defaultValue={project.description} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Tech Stack *</label>
                <input required name="techStack" defaultValue={project.techStack} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">New Image File (Optional)</label>
                <input type="file" accept="image/*" name="imageFile" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                {project.image && <p className="text-xs text-gray-500 mt-1">Current: {project.image}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Demo URL</label>
                  <input name="demoUrl" defaultValue={project.demoUrl || ''} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">GitHub URL</label>
                  <input name="githubUrl" defaultValue={project.githubUrl || ''} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition flex items-center gap-2 text-sm">
                  <X size={16} /> Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                <p className="text-xs font-mono text-gray-500">{project.techStack}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(project.id)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-2 rounded transition-colors">
                  <Edit2 size={18} />
                </button>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )} 
    />
  );
}

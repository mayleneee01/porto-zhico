'use client';

import { useState } from 'react';
import { Trash2, Edit2, X, Save } from 'lucide-react';
import { Certification } from '@/generated/prisma';
import { deleteCert, updateCert } from '../actions';

import DraggableList from '@/components/admin/DraggableList';

export default function CertList({ certs }: { certs: Certification[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (certs.length === 0) {
    return <p className="text-gray-500">No certifications found.</p>;
  }

  return (
    <DraggableList 
      items={certs} 
      model="Certification"
      renderItem={(cert) => (
        <div className="glass p-4 rounded-xl">
          {editingId === cert.id ? (
            <form action={async (formData) => {
              await updateCert(formData);
              setEditingId(null);
            }} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={cert.id} />
              
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Name *</label>
                <input required name="name" defaultValue={cert.name} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Issuer *</label>
                <input required name="issuer" defaultValue={cert.issuer} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Date (Year) *</label>
                <input required name="date" defaultValue={cert.date} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">New Image File (Optional)</label>
                <input type="file" accept="image/*" name="imageFile" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                {cert.image && <p className="text-xs text-gray-500 mt-1">Current: {cert.image}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Credential URL</label>
                <input name="url" defaultValue={cert.url || ''} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
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
                <h3 className="font-bold text-lg">{cert.name}</h3>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">{cert.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(cert.id)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-2 rounded transition-colors">
                  <Edit2 size={18} />
                </button>
                <form action={deleteCert}>
                  <input type="hidden" name="id" value={cert.id} />
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

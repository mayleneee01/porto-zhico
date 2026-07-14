'use client';

import { Trash2, Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DraggableList from '@/components/admin/DraggableList';
import { Experience } from '@/generated/prisma';
import { deleteExp } from '../actions';

export default function ExpList({ exps, editId }: { exps: Experience[], editId?: string }) {
  return (
    <DraggableList 
      items={exps} 
      model="Experience"
      renderItem={(exp) => (
        <div className={`glass p-4 rounded-xl flex justify-between items-start gap-4 ${editId === exp.id ? 'ring-2 ring-white/50' : ''}`}>
          {exp.icon && (
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative shrink-0">
              <Image src={exp.icon} alt={exp.company} fill className="object-contain p-1" />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="font-bold text-lg">{exp.position}</h3>
            <p className="text-md text-gray-300">{exp.company}</p>
            <p className="text-xs font-mono text-gray-500 mb-2">{exp.date}</p>
            <div className="mb-2 flex gap-2">
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300">{exp.category}</span>
              {exp.gpa && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-blue-900/30 text-blue-300">GPA: {exp.gpa}</span>}
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
      )} 
    />
  );
}

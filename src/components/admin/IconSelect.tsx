'use client';

import * as Icons from 'lucide-react';
import { ICON_OPTIONS } from '@/lib/icon-options';

type IconSelectProps = {
  name: string;
  defaultValue?: string | null;
  label?: string;
};

export default function IconSelect({ name, defaultValue, label = 'Icon' }: IconSelectProps) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<any>>)[defaultValue || 'Code2'] || Icons.Code2;

  return (
    <div>
      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <select
          name={name}
          defaultValue={defaultValue || 'Code2'}
          className="w-full bg-black/50 border border-white/10 rounded p-2 pl-9 text-white text-sm"
        >
          {ICON_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <p className="text-[11px] text-gray-500 mt-1">Pilih logo dari daftar. URL gambar tidak diperlukan.</p>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import { addTool } from '../actions';
import ToolList from './ToolList';

export const revalidate = 0;

export default async function AdminTools() {
  const tools = await prisma.tool.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">MANAGE TOOLS</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Add New Tool</h2>
            <form action={addTool} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Tool Name *</label>
                <input required name="name" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="e.g. Next.js, Penetration Testing" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Icon URL (Optional)</label>
                <input name="icon" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="https://..." />
              </div>
              
              <button type="submit" className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors mt-4">
                ADD TOOL
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Existing Tools ({tools.length})</h2>
          <ToolList tools={tools} />
        </div>
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import { addCert } from '../actions';
import CertList from './CertList';

export const revalidate = 0;

export default async function AdminCertifications() {
  const certs = await prisma.certification.findMany({ orderBy: { date: 'desc' } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-wider">MANAGE CERTIFICATIONS</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6">Add Certification</h2>
            <form action={addCert} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Name *</label>
                <input required name="name" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Issuer *</label>
                <input required name="issuer" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Date (Year) *</label>
                <input required name="date" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="2023" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Image File</label>
                <input type="file" accept="image/*" name="imageFile" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Credential URL</label>
                <input name="url" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="https://..." />
              </div>
              <button type="submit" className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors mt-4">
                ADD CERTIFICATION
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Existing Certifications ({certs.length})</h2>
          <CertList certs={certs} />
        </div>
      </div>
    </div>
  );
}

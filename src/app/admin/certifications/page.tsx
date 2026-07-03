import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2 } from 'lucide-react';
import { put } from '@vercel/blob';

export const revalidate = 0;

export default async function AdminCertifications() {
  const certs = await prisma.certification.findMany({ orderBy: { date: 'desc' } });

  async function addCert(formData: FormData) {
    'use server';
    let imageUrl = null;
    const imageFile = formData.get('imageFile') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const blob = await put(imageFile.name, imageFile, { access: 'public' });
      imageUrl = blob.url;
    }

    await prisma.certification.create({
      data: {
        name: formData.get('name') as string,
        issuer: formData.get('issuer') as string,
        date: formData.get('date') as string,
        url: (formData.get('url') as string) || null,
        image: imageUrl,
      },
    });
    revalidatePath('/admin/certifications');
    revalidatePath('/');
  }

  async function deleteCert(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.certification.delete({ where: { id } });
    revalidatePath('/admin/certifications');
    revalidatePath('/');
  }

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
          {certs.map(cert => (
            <div key={cert.id} className="glass p-4 rounded-xl flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{cert.name}</h3>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">{cert.date}</p>
              </div>
              <form action={deleteCert}>
                <input type="hidden" name="id" value={cert.id} />
                <button type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
          {certs.length === 0 && <p className="text-gray-500">No certifications found.</p>}
        </div>
      </div>
    </div>
  );
}

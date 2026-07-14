import Certifications from '@/components/Certifications';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function MilestonesCertificationPage() {
  const certs = await prisma.certification.findMany({
    where: { OR: [{ category: 'certification' }, { category: '' }, { category: null }] },
    orderBy: { date: 'desc' }
  });

  return <Certifications certs={certs} />;
}

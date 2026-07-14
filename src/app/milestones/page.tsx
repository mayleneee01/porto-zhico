import Certifications from '@/components/Certifications';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function MilestonesAllPage() {
  const certs = await prisma.certification.findMany({ orderBy: { date: 'desc' } });

  return <Certifications certs={certs} />;
}

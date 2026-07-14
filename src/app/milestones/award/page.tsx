import Certifications from '@/components/Certifications';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function MilestonesAwardPage() {
  const certs = await prisma.certification.findMany({
    where: { category: 'award' },
    orderBy: { date: 'desc' }
  });

  return <Certifications certs={certs} />;
}

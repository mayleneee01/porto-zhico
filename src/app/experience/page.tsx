import Experience from '@/components/Experience';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <PageWrapper>
      <div className="pt-24 pb-12">
        <Experience experiences={experiences} />
      </div>
    </PageWrapper>
  );
}

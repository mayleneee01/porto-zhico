import Projects from '@/components/Projects';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function ProjectPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <PageWrapper>
      <div className="pt-24 pb-12">
        <Projects projects={projects} />
      </div>
    </PageWrapper>
  );
}

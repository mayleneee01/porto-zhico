import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Disable static rendering to see DB changes instantly

export default async function Home() {
  const skills = await prisma.skill.findMany({ orderBy: { createdAt: 'asc' } });

  return (
    <PageWrapper>
      <Hero />
      <About />
      <Skills skills={skills} />
    </PageWrapper>
  );
}

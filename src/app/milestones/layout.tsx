import FadeIn from '@/components/FadeIn';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';
import MilestonesTabs from './MilestonesTabs';

export const revalidate = 0;

export default async function MilestonesLayout({ children }: { children: React.ReactNode }) {
  const certs = await prisma.certification.findMany();
  
  const counts = {
    all: certs.length,
    certification: certs.filter(c => (c.category || 'certification') === 'certification').length,
    award: certs.filter(c => c.category === 'award').length,
  };

  return (
    <PageWrapper>
      <section className="pt-24 pb-12 relative z-10 bg-black/30 min-h-screen border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold mb-8 tracking-wider text-center text-white font-[family-name:var(--font-cyber)]">MILESTONES</h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <MilestonesTabs counts={counts} />
          </FadeIn>
          
          <div className="mt-8">
            {children}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

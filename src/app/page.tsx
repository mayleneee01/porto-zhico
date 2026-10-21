import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Tools from '@/components/Tools';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';

// Next.js will build this page statically. On-demand revalidation (revalidatePath)
// inside admin actions will automatically regenerate the page whenever database content changes.

export default async function Home() {
  const [skills, projects, certifications, experiences, tools] = await Promise.all([
    prisma.skill.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.project.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.tool.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return (
    <PageWrapper>
      <main className="min-h-screen font-sans flex flex-col pb-28 md:pb-0" style={{ color: 'var(--text-primary)', WebkitFontSmoothing: 'antialiased' }}>
        <Navbar />
        <Hero />
        <About />
        <Skills skills={skills} />
        <Tools tools={tools} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Certifications certs={certifications} />
        <Contact />
        
        <footer className="py-8 text-center" style={{ borderTop: '1px solid var(--footer-border)' }}>
          <p className="text-sm font-light tracking-widest" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} ZHICO PRADITA. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </PageWrapper>
  );
}

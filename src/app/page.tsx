import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import PageWrapper from '@/components/PageWrapper';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Disable static rendering to see DB changes instantly

export default async function Home() {
  const skills = await prisma.skill.findMany({ orderBy: { createdAt: 'asc' } }).catch(() => []);
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
  const certifications = await prisma.certification.findMany({ orderBy: { date: 'desc' } }).catch(() => []);
  const experiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);

  return (
    <PageWrapper>
      <main className="min-h-screen text-white font-sans selection:bg-white selection:text-black flex flex-col pb-28 md:pb-0">
        <Navbar />
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Certifications certs={certifications} />
        <Contact />
        
        <footer className="py-8 text-center border-t border-white/10">
          <p className="text-sm text-gray-500 font-light tracking-widest">
            &copy; {new Date().getFullYear()} ZHICO PRADITA. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </PageWrapper>
  );
}

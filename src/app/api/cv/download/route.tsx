import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma';
import CVDocument from '@/components/CVDocument';

export async function GET() {
  try {
    // 1. Fetch data from the database
    const [experiences, projects, skills, certifications] = await Promise.all([
      prisma.experience.findMany({ orderBy: { order: 'asc' } }),
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.certification.findMany({ orderBy: { order: 'asc' } }),
    ]);

    // 2. Generate PDF stream
    const pdfStream = await renderToStream(
      <CVDocument 
        experiences={experiences} 
        projects={projects} 
        skills={skills} 
        certifications={certifications} 
      />
    );

    // 3. Convert Node stream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        pdfStream.on('data', (chunk) => controller.enqueue(chunk));
        pdfStream.on('end', () => controller.close());
        pdfStream.on('error', (err) => controller.error(err));
      }
    });

    // 4. Return as a downloadable PDF
    return new NextResponse(readableStream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV_Zhico_Pradita_ATS.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate CV' }, { status: 500 });
  }
}

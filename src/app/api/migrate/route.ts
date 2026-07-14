import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Add category column to Experience if it doesn't exist
    await prisma.$executeRawUnsafe(`ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'professional';`);
    
    // Add icon column to Experience if it doesn't exist
    await prisma.$executeRawUnsafe(`ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "icon" TEXT;`);
    
    // Add GPA column to Experience
    await prisma.$executeRawUnsafe(`ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "gpa" TEXT;`);
    
    // Add order columns to all tables
    await prisma.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Certification" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;`);
    
    // Add category column to Certification if it doesn't exist
    await prisma.$executeRawUnsafe(`ALTER TABLE "Certification" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'certification';`);
    
    return NextResponse.json({ success: true, message: "Database schema migration complete!" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

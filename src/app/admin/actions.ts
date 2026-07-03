'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

// PROJECTS
export async function addProject(formData: FormData) {
  await prisma.project.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      techStack: formData.get('techStack') as string,
      demoUrl: (formData.get('demoUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
      image: (formData.get('image') as string) || null,
    },
  });
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      techStack: formData.get('techStack') as string,
      demoUrl: (formData.get('demoUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
      image: (formData.get('image') as string) || null,
    },
  });
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

// CERTIFICATIONS
export async function addCert(formData: FormData) {
  let imageUrl = null;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const blob = await put(imageFile.name, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  await prisma.certification.create({
    data: {
      name: formData.get('name') as string,
      issuer: formData.get('issuer') as string,
      date: formData.get('date') as string,
      url: (formData.get('url') as string) || null,
      image: imageUrl,
    },
  });
  revalidatePath('/admin/certifications');
  revalidatePath('/');
}

export async function updateCert(formData: FormData) {
  const id = formData.get('id') as string;
  
  // Handing optional new image
  let imageUrl: string | undefined = undefined;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const blob = await put(imageFile.name, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  const data: any = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    url: (formData.get('url') as string) || null,
  };

  if (imageUrl) {
    data.image = imageUrl;
  }

  await prisma.certification.update({
    where: { id },
    data,
  });
  
  revalidatePath('/admin/certifications');
  revalidatePath('/');
}

export async function deleteCert(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.certification.delete({ where: { id } });
  revalidatePath('/admin/certifications');
  revalidatePath('/');
}

// SKILLS
export async function addSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      name: formData.get('name') as string,
      icon: (formData.get('icon') as string) || null,
    },
  });
  revalidatePath('/admin/skills');
  revalidatePath('/');
}

export async function updateSkill(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      icon: (formData.get('icon') as string) || null,
    },
  });
  revalidatePath('/admin/skills');
  revalidatePath('/');
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/admin/skills');
  revalidatePath('/');
}

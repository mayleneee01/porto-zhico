'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

function sanitizeFilename(filename: string): string {
  const parts = filename.split('.');
  const ext = parts.pop() || '';
  const base = parts.join('.');
  const cleanBase = base
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-') // Replace spaces and special characters with hyphens
    .replace(/-+/g, '-')          // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '');     // Trim leading/trailing hyphens
  return `${cleanBase || 'file'}.${ext}`;
}

export async function reorderItems(model: string, items: { id: string; order: number }[]) {
  // Use sequential updates instead of a single transaction because Prisma
  // doesn't have a built-in polymorphic update method
  if (model === 'Experience') {
    for (const item of items) {
      await prisma.experience.update({ where: { id: item.id }, data: { order: item.order } });
    }
  } else if (model === 'Project') {
    for (const item of items) {
      await prisma.project.update({ where: { id: item.id }, data: { order: item.order } });
    }
  } else if (model === 'Certification') {
    for (const item of items) {
      await prisma.certification.update({ where: { id: item.id }, data: { order: item.order } });
    }
  } else if (model === 'Skill') {
    for (const item of items) {
      await prisma.skill.update({ where: { id: item.id }, data: { order: item.order } });
    }
  }
  
  revalidatePath('/admin');
  revalidatePath('/');
}

// PROJECTS
export async function addProject(formData: FormData) {
  try {
    let imageUrl = null;
    const imageFile = formData.get('imageFile') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const cleanName = sanitizeFilename(imageFile.name);
      console.log(`Uploading project image: ${cleanName} (${imageFile.size} bytes)`);
      const blob = await put(cleanName, imageFile, { access: 'public' });
      imageUrl = blob.url;
      console.log(`Uploaded successfully: ${imageUrl}`);
    }

    await prisma.project.create({
      data: {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        techStack: formData.get('techStack') as string,
        demoUrl: (formData.get('demoUrl') as string) || null,
        githubUrl: (formData.get('githubUrl') as string) || null,
        image: imageUrl,
      },
    });
    revalidatePath('/admin/projects');
    revalidatePath('/');
  } catch (error) {
    console.error("ADD_PROJECT_ERROR:", error);
    throw error;
  }
}

export async function updateProject(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    
    let imageUrl: string | undefined = undefined;
    const imageFile = formData.get('imageFile') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const cleanName = sanitizeFilename(imageFile.name);
      console.log(`Uploading new project image: ${cleanName} (${imageFile.size} bytes)`);
      const blob = await put(cleanName, imageFile, { access: 'public' });
      imageUrl = blob.url;
      console.log(`Uploaded successfully: ${imageUrl}`);
    }

    const data: any = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      techStack: formData.get('techStack') as string,
      demoUrl: (formData.get('demoUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
    };

    if (imageUrl) {
      data.image = imageUrl;
    }

    await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/projects');
    revalidatePath('/');
  } catch (error) {
    console.error("UPDATE_PROJECT_ERROR:", error);
    throw error;
  }
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

// CERTIFICATIONS
export async function addCert(formData: FormData) {
  try {
    let imageUrl = null;
    const imageFile = formData.get('imageFile') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const cleanName = sanitizeFilename(imageFile.name);
      console.log(`Uploading certification image: ${cleanName} (${imageFile.size} bytes)`);
      const blob = await put(cleanName, imageFile, { access: 'public' });
      imageUrl = blob.url;
      console.log(`Uploaded successfully: ${imageUrl}`);
    }

    await prisma.certification.create({
      data: {
        name: formData.get('name') as string,
        issuer: formData.get('issuer') as string,
        date: formData.get('date') as string,
        url: (formData.get('url') as string) || null,
        category: (formData.get('category') as string) || 'certification',
        image: imageUrl,
      },
    });
    revalidatePath('/admin/certifications');
    revalidatePath('/');
  } catch (error) {
    console.error("ADD_CERT_ERROR:", error);
    throw error;
  }
}

export async function updateCert(formData: FormData) {
  const id = formData.get('id') as string;
  
  // Handing optional new image
  let imageUrl: string | undefined = undefined;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const cleanName = sanitizeFilename(imageFile.name);
    const blob = await put(cleanName, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  const data: any = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    url: (formData.get('url') as string) || null,
    category: (formData.get('category') as string) || 'certification',
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

// EXPERIENCE
export async function addExp(formData: FormData) {
  try {
    let iconUrl = null;
    const iconFile = formData.get('iconFile') as File | null;
    
    if (iconFile && iconFile.size > 0) {
      const cleanName = sanitizeFilename(iconFile.name);
      console.log(`Uploading experience icon: ${cleanName} (${iconFile.size} bytes)`);
      const blob = await put(cleanName, iconFile, { access: 'public' });
      iconUrl = blob.url;
      console.log(`Uploaded successfully: ${iconUrl}`);
    }

    await prisma.experience.create({
      data: {
        position: formData.get('position') as string,
        company: formData.get('company') as string,
        date: formData.get('date') as string,
        description: formData.get('description') as string,
        category: (formData.get('category') as string) || 'professional',
        gpa: (formData.get('gpa') as string) || null,
        icon: iconUrl,
      },
    });
    revalidatePath('/admin/experience');
    revalidatePath('/');
  } catch (error) {
    console.error("ADD_EXP_ERROR:", error);
    throw error;
  }
}

export async function updateExp(formData: FormData) {
  const id = formData.get('id') as string;
  
  let iconUrl: string | undefined = undefined;
  const iconFile = formData.get('iconFile') as File | null;
  
  if (iconFile && iconFile.size > 0) {
    const cleanName = sanitizeFilename(iconFile.name);
    const blob = await put(cleanName, iconFile, { access: 'public' });
    iconUrl = blob.url;
  }

  const data: any = {
    position: formData.get('position') as string,
    company: formData.get('company') as string,
    date: formData.get('date') as string,
    description: formData.get('description') as string,
    category: (formData.get('category') as string) || 'professional',
    gpa: (formData.get('gpa') as string) || null,
  };

  if (iconUrl) {
    data.icon = iconUrl;
  }

  await prisma.experience.update({
    where: { id },
    data,
  });
  
  revalidatePath('/admin/experience');
  revalidatePath('/');
}

export async function deleteExp(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.experience.delete({ where: { id } });
  revalidatePath('/admin/experience');
  revalidatePath('/');
}

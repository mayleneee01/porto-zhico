import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.project.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();

  // Create Skills
  await prisma.skill.createMany({
    data: [
      { name: 'Penetration Testing', icon: 'Shield' },
      { name: 'Bug Bounty Hunting', icon: 'Bug' },
      { name: 'Network Security', icon: 'Network' },
      { name: 'Linux Administration', icon: 'Terminal' },
      { name: 'Digital Forensics', icon: 'Search' },
      { name: 'Scripting & Automation', icon: 'Code' },
    ],
  });

  // Create Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'Web App Vulnerability Scanner',
        description: 'Tool otomatis berbasis Python untuk mendeteksi kerentanan umum seperti SQL Injection, XSS, dan CSRF pada aplikasi web.',
        techStack: 'Python, OWASP, Selenium',
        demoUrl: '#',
        githubUrl: '#',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      },
      {
        title: 'Network Intrusion Detection System',
        description: 'Sistem deteksi intrusi jaringan real-time menggunakan Snort dan ELK Stack untuk monitoring dan analisis traffic mencurigakan.',
        techStack: 'Snort, ELK Stack, Linux',
        demoUrl: '#',
        githubUrl: '#',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      },
      {
        title: 'Automated Recon Framework',
        description: 'Framework reconnaissance otomatis yang mengintegrasikan subfinder, httpx, dan nuclei untuk mempercepat proses bug bounty hunting.',
        techStack: 'Bash, Go, Docker',
        demoUrl: '#',
        githubUrl: '#',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      },
      {
        title: 'Malware Analysis Toolkit',
        description: 'Toolkit untuk analisis statis dan dinamis malware, termasuk sandbox environment dan automated reporting.',
        techStack: 'Python, YARA, Cuckoo',
        demoUrl: '#',
        githubUrl: '#',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
      },
    ],
  });

  // Create Experiences
  await prisma.experience.createMany({
    data: [
      {
        position: 'Security Analyst & Penetration Tester',
        company: 'Freelance / Bug Bounty',
        date: '2023 - Present',
        description: 'Menemukan dan melaporkan kerentanan keamanan pada berbagai platform melalui program bug bounty dan melakukan security assessment independen.',
      },
      {
        position: 'Informatics Student',
        company: 'Institut Teknologi Sumatera (ITERA)',
        date: '2021 - Present',
        description: 'Mendalami fokus pada cybersecurity, network security, dan pengembangan perangkat lunak aman.',
      },
    ],
  });

  // Create Certifications
  await prisma.certification.createMany({
    data: [
      {
        name: 'Forage Job Simulation',
        issuer: 'The Forage',
        date: '2023',
        url: 'https://www.theforage.com',
        image: 'https://images.unsplash.com/photo-1523289217630-0dd16184af8e?w=800&q=80',
      },
      {
        name: 'Coursera Professional Certificate',
        issuer: 'Coursera',
        date: '2023',
        url: 'https://www.coursera.org',
        image: 'https://images.unsplash.com/photo-1589330694653-06df3cebc3f1?w=800&q=80',
      },
      {
        name: 'Security Professional Certificate',
        issuer: 'Certification Authority',
        date: '2024',
        url: '#',
        image: 'https://images.unsplash.com/photo-1614064641913-6b110b656ea0?w=800&q=80',
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

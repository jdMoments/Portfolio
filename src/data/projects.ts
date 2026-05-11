import { Project } from '../types';
import heroBackgroundImage from '../assets/hero-background-sample.png';
import lifewoodDataTechnologyImage from '../assets/lifewood-data-technology.png';
import rmClothingProjectImage from '../assets/rm-clothing-project.png';
import reviewerProjectImage from '../assets/reviewer-project.png';
import wisenergyProjectImage from '../assets/wisenergy-project.png';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Lifewood Data Technology',
    description: 'This project is a high-performance Lifewood-inspired platform focused on practical enterprise workflows. It includes secure user management, role-based access, and structured data handling so teams can manage accounts and operations efficiently. The UI was designed to be responsive, fast, and easy to navigate across devices. The core idea is to combine reliability, speed, and clean UX for real production-style business use.',
    image: lifewoodDataTechnologyImage,
    backgroundPosition: 'center center',
    deployedUrl: 'https://lifewood-2026-jholmer.netlify.app/',
    githubUrl: 'https://github.com/JholmerDamayo/Lifewood-2026',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Supabase'],
    role: 'Full stack developer',
  },
  {
    id: '2',
    title: 'Wisenergy',
    description: 'WisEnergy is a smart energy monitoring platform that uses IoT devices and AI to track appliance electricity consumption in real time. The system helps users reduce electricity bills through reports, analytics, and smart recommendations. Developing this project required major effort in hardware integration, backend development, mobile app design, testing, and real-time data synchronization.',
    image: wisenergyProjectImage,
    backgroundPosition: '72% center',
    deployedUrl: 'https://example.com',
    technologies: ['React Native', 'React', 'Tailwind CSS', 'C', 'Python', 'Firebase'],
    role: 'Frontend/Quality Assurance',
  },
  {
    id: '3',
    title: 'Reviewer',
    description: 'Reviewer is a smart flashcard application designed to help students study more efficiently using modern digital tools and cross-device accessibility. The platform focuses on improving learning habits, retention, and study organization through a clean and engaging interface. Creating this project required significant effort in UI/UX design, branding, layout planning, and responsive study-focused interface development.',
    image: reviewerProjectImage,
    backgroundPosition: 'center center',
    deployedUrl: 'https://reviewer-pi.vercel.app/',
    githubUrl: 'https://github.com/JholmerDamayo/Reviewer',
    technologies: ['React', 'TypeScript', 'CSS', 'Supabase', 'JavaScript'],
    role: 'Full-Stack',
  },
  {
    id: '4',
    title: 'RM-CLOTHING',
    description: 'RM Clothing is a modern fashion website concept that showcases local streetwear, trendy apparel, and stylish clothing collections through a premium e-commerce experience. The project emphasizes clean layouts, aesthetic product presentation, and strong fashion branding to attract younger audiences. Developing this concept required effort in visual styling, fashion-inspired layouts, product organization, and creating professional marketing visuals.',
    image: rmClothingProjectImage,
    backgroundPosition: 'center center',
    deployedUrl: 'https://rm-clothings.netlify.app/',
    githubUrl: 'https://github.com/JholmerDamayo/RM-CLOTHING',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vite', 'React', 'Supabase'],
    role: 'Full-Stack',
  },
  {
    id: '5',
    title: 'Portfolio',
    description: 'Portfolio is a personal showcase website built to present projects, skills, and creative work in a polished and easy-to-navigate format. The experience focuses on strong visual presentation, smooth section flow, and responsive layouts that make the work feel professional across devices. Building it required careful attention to layout structure, styling consistency, and turning personal work into a cohesive digital brand.',
    image: heroBackgroundImage,
    backgroundPosition: 'center center',
    deployedUrl: 'https://portfolio-jholmer.vercel.app/',
    githubUrl: 'https://github.com/JholmerDamayo/Portfolio',
    technologies: ['React', 'Vite', 'HTML', 'CSS'],
  },
];

import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Lifewood clone with User Management',
    description: 'This project is a high-performance Lifewood-inspired platform focused on practical enterprise workflows. It includes secure user management, role-based access, and structured data handling so teams can manage accounts and operations efficiently. The UI was designed to be responsive, fast, and easy to navigate across devices. The core idea is to combine reliability, speed, and clean UX for real production-style business use.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
    deployedUrl: 'https://lifewood-2026-jholmer.netlify.app/',
    githubUrl: 'https://github.com/jdMoments/Lifewood-2026',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Supabase'],
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'AI Content Generator helps users quickly create written content from prompts, keywords, and tone preferences. It supports multiple content styles and can be used for marketing copy, captions, and idea drafts. The interface keeps generation simple so users can iterate fast without technical setup. The main idea is to reduce writing friction while still giving users creative control and direction.',
    image: 'https://picsum.photos/seed/ai/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Gemini API', 'Framer Motion'],
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'Task Management System is a collaboration tool for organizing work across teams and project phases. It includes task assignment, status tracking, and deadline visibility so managers and members stay aligned. Built-in progress views make it easier to monitor productivity and spot blockers early. The project is meant for teams that need a clear, centralized workflow for day-to-day execution.',
    image: 'https://picsum.photos/seed/tasks/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Firebase', 'TypeScript'],
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Weather Dashboard provides real-time weather updates with forecast insights in a clean, interactive interface. Users can view current conditions, weekly outlooks, and visual weather patterns through map-based components. It is designed for quick checking and planning activities such as travel, events, or field work. The idea behind it is to present complex weather data in a simple and decision-friendly format.',
    image: 'https://picsum.photos/seed/weather/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'OpenWeather API', 'D3.js'],
  },
  {
    id: '5',
    title: 'Fitness Tracker',
    description: 'Fitness Tracker helps users record workouts, monitor nutrition, and review progress over time. It includes activity logs, calorie tracking, and simple analytics to keep health goals measurable. The mobile-first experience makes it practical for daily use at the gym or on the go. This project is built around consistency, motivation, and data-driven personal fitness habits.',
    image: 'https://picsum.photos/seed/fitness/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Chart.js', 'PWA'],
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'Portfolio Website is a modern template built to showcase projects, skills, and professional identity in one place. It features strong visual hierarchy, responsive sections, and smooth interactions for better presentation quality. Developers can use it to communicate their work clearly to recruiters, clients, or collaborators. The main concept is to blend personal branding with usability and performance.',
    image: 'https://picsum.photos/seed/portfolio/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Tailwind CSS', 'Motion'],
  },
];

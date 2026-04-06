import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Lifewood clone with User Management',
    description: 'A high-performance clone of the Lifewood platform, featuring robust user management, global AI data infrastructure, and a modern, responsive UI.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
    deployedUrl: 'https://lifewood-2026-jholmer.netlify.app/',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Supabase'],
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'An application that leverages LLMs to generate creative content based on user prompts.',
    image: 'https://picsum.photos/seed/ai/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Gemini API', 'Framer Motion'],
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'A collaborative tool for teams to manage projects, track time, and assign tasks.',
    image: 'https://picsum.photos/seed/tasks/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Firebase', 'TypeScript'],
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather tracking with interactive maps and 7-day forecasts.',
    image: 'https://picsum.photos/seed/weather/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'OpenWeather API', 'D3.js'],
  },
  {
    id: '5',
    title: 'Fitness Tracker',
    description: 'A mobile-responsive app to log workouts, track calories, and visualize progress.',
    image: 'https://picsum.photos/seed/fitness/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Chart.js', 'PWA'],
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'A clean and modern portfolio template for developers to showcase their work.',
    image: 'https://picsum.photos/seed/portfolio/800/600',
    deployedUrl: 'https://example.com',
    technologies: ['React', 'Tailwind CSS', 'Motion'],
  },
];

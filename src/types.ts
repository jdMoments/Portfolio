export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  deployedUrl: string;
  githubUrl?: string;
  technologies: string[];
}

export type NavItem = 'home' | 'projects' | 'about' | 'contact';

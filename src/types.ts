export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  backgroundPosition?: string;
  deployedUrl: string;
  githubUrl?: string;
  technologies: string[];
  role?: string;
}

export type NavItem =
  | 'home'
  | 'projects'
  | 'experience'
  | 'achievements'
  | 'about'
  | 'contact';

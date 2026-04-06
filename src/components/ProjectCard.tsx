import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  onImageClick?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => onImageClick?.(project.id)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-neutral-800 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-neutral-800 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 text-[10px] font-semibold uppercase tracking-wider rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        <div className="pt-4 border-t border-gray-50 dark:border-neutral-800">
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-bold text-black dark:text-white hover:underline underline-offset-4"
          >
            View Project <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

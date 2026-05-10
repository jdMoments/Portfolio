import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  isPendingSelection?: boolean;
  pulseToken?: number;
  onImageClick?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive = false,
  isPendingSelection = false,
  pulseToken = 0,
  onImageClick
}) => {
  if (isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        animate={{ y: -8, scale: 1.015 }}
        className="group overflow-visible flex flex-col h-full"
      >
        <motion.div
          key={`${project.id}-${pulseToken}`}
          className="relative aspect-video overflow-hidden cursor-pointer rounded-xl"
          onClick={() => onImageClick?.(project.id)}
          whileTap={{ scale: 0.9, y: 2 }}
          initial={false}
          animate={{
            scale: [1, 0.88, 1.14, 1.02],
            y: [0, 3, -7, 0]
          }}
          transition={{
            duration: 0.72,
            times: [0, 0.2, 0.72, 1],
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            animate={{ scale: [1, 1.07, 1.11] }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      animate={{
        y: isPendingSelection ? [0, 4, -4] : 0,
        scale: isPendingSelection ? [1, 0.9, 0.72] : 1,
        opacity: isPendingSelection ? [1, 1, 0.9] : 1
      }}
      className="group project-card-magic rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full bg-white dark:bg-neutral-900 border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-xl"
    >
      <motion.div
        key={`${project.id}-idle`}
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => onImageClick?.(project.id)}
        whileTap={{ scale: 0.9, y: 2 }}
        initial={false}
        animate={
          isPendingSelection
            ? { scale: [1, 0.92, 0.78], y: [0, 3, -2] }
            : { scale: 1, y: 0 }
        }
        transition={
          isPendingSelection
            ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.2 }
        }
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
          animate={isPendingSelection ? { scale: [1, 0.94, 0.82] } : { scale: 1 }}
          transition={isPendingSelection ? { duration: 0.22 } : { duration: 0.2 }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 py-4">
          <h3 className="text-xl font-bold text-white transition-colors">
            {project.title}
          </h3>
        </div>
      </motion.div>

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
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-50 dark:border-neutral-800">
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-bold text-black dark:text-white hover:underline underline-offset-4"
          >
            View Project <ExternalLink className="ml-2 w-4 h-4" />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-black hover:text-black dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
              aria-label={`Open ${project.title} GitHub repository`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';
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

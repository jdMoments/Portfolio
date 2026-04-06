import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (activeProjectId) {
      timerRef.current = setTimeout(() => {
        setActiveProjectId(null);
      }, 5000);
    }
  };

  useEffect(() => {
    if (activeProjectId) {
      resetTimer();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeProjectId]);

  return (
    <section 
      onMouseMove={resetTimer}
      onClick={resetTimer}
      className={`relative py-24 transition-colors duration-700 overflow-hidden min-h-[600px] ${
        activeProjectId === '1' ? 'bg-black' : 'bg-white dark:bg-neutral-950'
      }`}
    >
      <AnimatePresence mode="wait">
        {activeProjectId === '1' && activeProject ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center"
          >
            {/* Background Image with Push Backward Animation - Revealed (No Grayscale/Blur) */}
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={activeProject.image} 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </motion.div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button 
                    onClick={() => setActiveProjectId(null)}
                    className="mb-8 flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="mr-2 w-4 h-4" /> Back to Projects
                  </button>
                  
                  <h2 className="text-5xl font-black tracking-tighter text-white mb-6">
                    {activeProject.title}
                  </h2>
                  
                  <div className="space-y-8 mb-10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Frontend Stack</h4>
                      <p className="text-xl font-medium text-white">
                        React, Tailwind CSS, TypeScript, Node.js
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Backend Infrastructure</h4>
                      <p className="text-xl font-medium text-white">
                        Supabase (Auth, Database, Storage)
                      </p>
                    </div>
                  </div>

                  <a
                    href={activeProject.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                  >
                    Visit Live Website <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Selected Projects</h2>
                <p className="text-lg text-gray-500 dark:text-neutral-400 max-w-2xl">
                  A collection of some of my favorite works, ranging from complex web applications to experimental UI explorations.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onImageClick={(id) => id === '1' && setActiveProjectId(id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

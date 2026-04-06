import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Facebook } from 'lucide-react';

interface HeroProps {
  onViewProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProjects }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-white dark:bg-neutral-900/20 skew-x-12 transform origin-top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&q=80" 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 shadow-xl object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
              Available for Hire
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-gray-900 dark:text-white mb-8">
              Jholmer L. <br />
              Damayo
            </h1>
            <p className="text-xl text-gray-500 dark:text-neutral-400 leading-relaxed mb-10 max-w-xl">
              I'm a Full-Stack Developer specializing in building exceptional digital experiences that are fast, accessible, and visually stunning.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onViewProjects}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-gray-800 dark:hover:bg-neutral-200 transition-all flex items-center group"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex space-x-4 ml-4">
                <a 
                  href="https://github.com/jdMoments" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/jholmer-damayo-10a603295/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.facebook.com/jholmerrrr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Github, Linkedin, Facebook, Mail, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Code2 className="w-8 h-8 text-black dark:text-white" />
              <span className="font-bold text-xl tracking-tight dark:text-white">DEV.PORTFOLIO</span>
            </div>
            <p className="text-gray-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Crafting high-quality software solutions with a focus on user experience, performance, and scalability. Let's build something amazing together.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 dark:text-white">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/jdMoments" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jholmer-damayo-10a603295/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/jholmerrrr" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
                  <Facebook className="w-4 h-4 mr-2" /> Facebook
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 dark:text-white">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@example.com" className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> hello@example.com
                </a>
              </li>
              <li className="text-gray-500 dark:text-neutral-400">
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-50 dark:border-neutral-900 flex flex-col md:row justify-between items-center text-sm text-gray-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Dev Portfolio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

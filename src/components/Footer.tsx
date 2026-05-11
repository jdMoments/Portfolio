import React from 'react';
import { Github, Linkedin, Facebook, Mail, Code2 } from 'lucide-react';
import Particles from './Particles';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050816] pt-16 pb-8 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <Particles
          className="opacity-80"
          particleColors={['#ffffff', '#8cc8ff', '#7df9d1', '#c7b6ff']}
          particleCount={180}
          particleSpread={9}
          speed={0.08}
          particleBaseSize={92}
          moveParticlesOnHover={true}
          particleHoverFactor={0.18}
          alphaParticles={true}
          sizeRandomness={0.75}
          cameraDistance={18}
          pixelRatio={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,249,209,0.12),transparent_26%),radial-gradient(circle_at_80%_22%,rgba(140,200,255,0.12),transparent_24%),linear-gradient(180deg,rgba(3,7,18,0.78),rgba(5,8,22,0.94))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Code2 className="w-8 h-8 text-white" />
              <span className="font-bold text-xl tracking-tight text-white">MY PORTFOLIO</span>
            </div>
            <p className="max-w-sm leading-relaxed text-slate-300/82">
              Crafting high-quality software solutions with a focus on user experience, performance, and scalability. Let's build something amazing together.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/jdMoments" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300/82 transition-colors hover:text-white">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jholmer-damayo-10a603295/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300/82 transition-colors hover:text-white">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/jholmerrrr" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300/82 transition-colors hover:text-white">
                  <Facebook className="w-4 h-4 mr-2" /> Facebook
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:damayojholmer@gmail.com" className="flex items-center text-slate-300/82 transition-colors hover:text-white">
                  <Mail className="w-4 h-4 mr-2" /> damayojholmer@gmail.com
                </a>
              </li>
              <li className="text-slate-300/82">
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} Jholmer L. Damayo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

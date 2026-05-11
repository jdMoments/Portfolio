import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import portraitImage from '../assets/jholmer-portrait.png';
import SoftAurora from '../components/SoftAurora';

export const About: React.FC = () => {
  const skills = [
    'React & Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js & Express',
    'PostgreSQL & MongoDB',
    'AWS & Cloudflare',
    'UI/UX Design',
    'Performance Optimization'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative overflow-hidden bg-[#060815] py-24 transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-60">
        <SoftAurora
          speed={0.35}
          scale={1.1}
          brightness={0.4}
          color1="#eef2ff"
          color2="#7dd3fc"
          noiseFrequency={1.8}
          noiseAmplitude={0.65}
          bandHeight={0.58}
          bandSpread={0.72}
          octaveDecay={0.16}
          layerOffset={0.35}
          colorSpeed={0.45}
          enableMouseInteraction={false}
          mouseInfluence={0.1}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,21,0.8),rgba(6,8,21,0.92)_45%,rgba(6,8,21,0.98)),radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_24%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.16)] lg:p-10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${portraitImage})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.88),rgba(15,23,42,0.78),rgba(2,6,23,0.9))]" />
            <div className="relative z-10">
              <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">About Me</h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-200/88">
                <p>
                  I’m Jholmer L. Damayo, a fresh graduating Bachelor of Science in Information Technology student with a strong passion for software development and technology. I enjoy building systems and applications that solve real-world problems while improving user experience and functionality.
                </p>
                <p>
                  My journey in IT has helped me develop skills in web and mobile development, UI/UX design, database management, and problem-solving. I am continuously learning new technologies and improving my craft through personal projects, academic work, and hands-on experience.
                </p>
                <p>
                  Beyond coding, I enjoy exploring new tech trends, creating creative digital projects, and collaborating with others to turn ideas into meaningful solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl lg:p-12"
          >
            <h3 className="mb-8 text-2xl font-bold text-white">Technical Expertise</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skills.map((skill) => (
                <motion.div 
                  key={skill} 
                  variants={itemVariants}
                  className="flex items-center space-x-3 rounded-xl border border-white/10 bg-slate-950/35 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.16)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                  <span className="font-medium text-slate-200">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 rounded-2xl border border-cyan-200/10 bg-white/10 p-6 text-white">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-70">Currently Learning</p>
              <p className="text-xl font-bold italic">Web3 Development & Smart Contracts</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

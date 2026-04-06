import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

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
    <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">About Me</h2>
            <div className="space-y-6 text-lg text-gray-500 dark:text-neutral-400 leading-relaxed">
              <p>
                I'm a self-taught developer with a passion for building products that solve real-world problems. With over 5 years of experience in the industry, I've worked with startups and established companies to deliver high-quality software.
              </p>
              <p>
                My approach is centered around clean code, user-centric design, and continuous learning. I believe that the best software is not just functional, but also intuitive and delightful to use.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains, reading about new technologies, or contributing to open-source projects.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 border border-gray-100 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Technical Expertise</h3>
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
                  className="flex items-center space-x-3 p-3 bg-white dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-black dark:text-white" />
                  <span className="font-medium text-gray-700 dark:text-neutral-300">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 p-6 bg-black dark:bg-white rounded-2xl text-white dark:text-black">
              <p className="text-sm font-medium opacity-70 mb-2 uppercase tracking-widest">Currently Learning</p>
              <p className="text-xl font-bold italic">Web3 Development & Smart Contracts</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

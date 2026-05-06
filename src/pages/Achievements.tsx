import React from 'react';
import { motion } from 'motion/react';
import { Award, Rocket, Trophy } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'Product Launches',
    value: '12+',
    description: 'Shipped websites, dashboards, and internal platforms from idea to release.'
  },
  {
    icon: Rocket,
    title: 'Performance Wins',
    value: '40%',
    description: 'Improved load times and interaction responsiveness on key client experiences.'
  },
  {
    icon: Award,
    title: 'Team Impact',
    value: '5 yrs',
    description: 'Supported design systems, mentoring, and cross-functional delivery over multiple roles.'
  }
];

export const Achievements: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-neutral-500 mb-4"
          >
            Achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Milestones that reflect delivery, growth, and measurable results.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-lg text-gray-500 dark:text-neutral-400"
          >
            A few concise highlights that help round out the portfolio story beyond the project gallery.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-8 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 mb-6">
                  <Icon className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-neutral-500 mb-3">
                  {achievement.title}
                </p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{achievement.value}</p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-neutral-400">
                  {achievement.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { BriefcaseBusiness, Sparkles } from 'lucide-react';

const roles = [
  {
    period: '2023 - Present',
    title: 'Senior Frontend Developer',
    company: 'Nova Studio',
    description:
      'Leading polished web experiences, component systems, and performance improvements across client-facing products.'
  },
  {
    period: '2021 - 2023',
    title: 'Full Stack Developer',
    company: 'Northwave Labs',
    description:
      'Built end-to-end product features with React, Node.js, and PostgreSQL for fast-moving startup teams.'
  },
  {
    period: '2019 - 2021',
    title: 'Frontend Engineer',
    company: 'Pixel Forge',
    description:
      'Delivered responsive interfaces, design handoff support, and reusable UI foundations for internal tools and marketing sites.'
  }
];

export const Experience: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50/70 dark:bg-neutral-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-neutral-500 mb-4"
          >
            Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Building products with strong UI craft and reliable engineering.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-lg text-gray-500 dark:text-neutral-400"
          >
            A snapshot of the teams, roles, and focus areas that shaped my work across frontend and full stack delivery.
          </motion.p>
        </div>

        <div className="grid gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-neutral-800">
                      <BriefcaseBusiness className="w-5 h-5 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{role.title}</h3>
                      <p className="text-sm uppercase tracking-[0.18em] text-gray-400 dark:text-neutral-500">
                        {role.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-neutral-400">
                    {role.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-neutral-200">
                  <Sparkles className="w-4 h-4" />
                  <span>{role.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BriefcaseBusiness, Sparkles } from 'lucide-react';
import LiquidEther from '../components/LiquidEther';
import seniorDeveloperPreview from '../assets/experience-senior-dev.png';
import fullStackDeveloperPreview from '../assets/experience-full-stack.png';
import frontendEngineerPreview from '../assets/experience-frontend-engineer.png';

const roles = [
  {
    id: 'senior-frontend-developer',
    period: '2023 - 2025',
    title: 'Senior Frontend Developer',
    description:
      'Leading polished web experiences, component systems, and performance improvements across client-facing products.',
    previewImage: seniorDeveloperPreview,
    previewLabel: 'Senior Frontend Developer',
    previewNote: 'Design systems, refined interfaces, and production-ready frontend delivery.'
  },
  {
    id: 'full-stack-developer',
    period: '2025',
    title: 'Full Stack Developer',
    description:
      'Built end-to-end product features with React, Node.js, and PostgreSQL for fast-moving startup teams.',
    previewImage: fullStackDeveloperPreview,
    previewLabel: 'Full Stack Developer',
    previewNote: 'Shipping complete flows from UI through APIs and data models.'
  },
  {
    id: 'frontend-engineer',
    period: '2025',
    title: 'Frontend Engineer',
    description:
      'Delivered responsive interfaces, design handoff support, and reusable UI foundations for internal tools and marketing sites.',
    previewImage: frontendEngineerPreview,
    previewLabel: 'Frontend Engineer',
    previewNote: 'Responsive implementation, smoother handoff, and reusable UI patterns.'
  }
];

export const Experience: React.FC = () => {
  const [activeRoleId, setActiveRoleId] = React.useState(roles[0].id);
  const activeRole = roles.find((role) => role.id === activeRoleId) ?? roles[0];

  return (
    <section className="relative overflow-hidden py-24 bg-[#02030a] transition-colors duration-300">
      <LiquidEther
        className="absolute inset-0 z-0 opacity-90"
        colors={['#5227FF', '#FF9FFC', '#B497CF']}
        mouseForce={28}
        cursorSize={120}
        isViscous
        viscous={30}
        iterationsViscous={24}
        iterationsPoisson={24}
        resolution={0.38}
        isBounce={false}
        autoDemo={false}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={1000}
        autoRampDuration={0.6}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(82,39,255,0.18),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(255,159,252,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.9))]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300/85"
          >
            Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white"
          >
            Building products with strong UI craft and reliable engineering.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-lg text-gray-200/80"
          >
            A snapshot of the teams, roles, and focus areas that shaped my work across frontend and full stack delivery.
          </motion.p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(320px,0.92fr)_minmax(420px,1.08fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="self-stretch lg:sticky lg:top-28"
          >
            <div className="relative h-full min-h-[640px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-[6px] lg:min-h-[660px]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,24,0.08)_0%,rgba(8,10,24,0.5)_100%)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full"
                >
                  <img
                    src={activeRole.previewImage}
                    alt={activeRole.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_20%,rgba(2,6,23,0.76)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-violet-200/88">
                      {activeRole.previewLabel}
                    </p>
                    <p className="max-w-md text-sm leading-6 text-white/78 sm:text-base">
                      {activeRole.previewNote}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:ml-auto lg:max-w-3xl">
            {roles.map((role, index) => {
              const isActive = role.id === activeRoleId;

              return (
                <motion.button
                  key={`${role.id}-${role.period}`}
                  type="button"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setActiveRoleId(role.id)}
                  onFocus={() => setActiveRoleId(role.id)}
                  className={`w-full rounded-3xl border p-8 text-right shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-[4px] transition-all duration-300 ${
                    isActive
                      ? 'border-violet-300/40 bg-white/14'
                      : 'border-white/10 bg-white/8 hover:border-violet-300/25 hover:bg-white/12'
                  }`}
                >
                  <div className="flex flex-col gap-6 md:flex-row-reverse md:items-start md:justify-between">
                    <div className="max-w-2xl md:ml-auto">
                      <div className="mb-4 flex items-center justify-end gap-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                          <BriefcaseBusiness className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-base leading-relaxed text-gray-200/78">
                        {role.description}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 self-end rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white md:self-start">
                      <Sparkles className="w-4 h-4" />
                      <span>{role.period}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

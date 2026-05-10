import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Award, Rocket, Trophy, X } from 'lucide-react';
import Lanyard from '../components/Lanyard';
import Particles from '../components/Particles';

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

const schoolAchievements = [
  {
    id: 'lanyard-1',
    title: "Dean's List Honor",
    subtitle: 'Recognized for consistent academic excellence across major subjects.',
    year: '2021',
    tag: 'Academic',
    accentFrom: '#34d399',
    accentTo: '#0f172a',
    details:
      "Earned a spot on the Dean's List after maintaining strong grades throughout the academic year and contributing to classroom projects with dependable delivery.",
    highlights: ['GPA above target threshold', 'Strong course performance', 'Consistent semester standing']
  },
  {
    id: 'lanyard-2',
    title: 'Best Capstone Presentation',
    subtitle: 'Presented a standout final-year project to faculty and peers.',
    year: '2022',
    tag: 'Presentation',
    accentFrom: '#38bdf8',
    accentTo: '#172554',
    details:
      'Received recognition for a capstone presentation that clearly communicated the problem, technical execution, and user impact with a polished visual walkthrough.',
    highlights: ['Clear project storytelling', 'Strong Q&A performance', 'Faculty commendation']
  },
  {
    id: 'lanyard-3',
    title: 'Programming Contest Finalist',
    subtitle: 'Reached the final round in a school-hosted coding challenge.',
    year: '2020',
    tag: 'Coding',
    accentFrom: '#a78bfa',
    accentTo: '#1e1b4b',
    details:
      'Advanced to the final round by solving algorithmic and logic-based tasks under time pressure, showing problem-solving accuracy and speed.',
    highlights: ['Final-round qualifier', 'Fast debugging', 'High-scoring submissions']
  },
  {
    id: 'lanyard-4',
    title: 'Leadership Service Award',
    subtitle: 'Helped coordinate student activities and peer collaboration efforts.',
    year: '2023',
    tag: 'Leadership',
    accentFrom: '#f59e0b',
    accentTo: '#451a03',
    details:
      'Recognized for taking initiative in organizing student group work, supporting classmates, and helping event teams keep tasks aligned and on schedule.',
    highlights: ['Team coordination', 'Volunteer support', 'Reliable execution']
  },
  {
    id: 'lanyard-5',
    title: 'Hackathon Participation Award',
    subtitle: 'Built a working prototype during a limited-time campus event.',
    year: '2022',
    tag: 'Hackathon',
    accentFrom: '#fb7185',
    accentTo: '#4c0519',
    details:
      'Completed a prototype with teammates during a school hackathon, focusing on quick iteration, interface polish, and demo-ready presentation.',
    highlights: ['Prototype shipped', 'Team collaboration', 'Demo completed']
  },
  {
    id: 'lanyard-6',
    title: 'UI Design Excellence',
    subtitle: 'Praised for thoughtful interface layout and visual consistency.',
    year: '2021',
    tag: 'Design',
    accentFrom: '#22c55e',
    accentTo: '#052e16',
    details:
      'Received positive recognition for designing a school project interface with clear hierarchy, cleaner flows, and more accessible interaction patterns.',
    highlights: ['Clean hierarchy', 'Consistent styling', 'Improved usability']
  },
  {
    id: 'lanyard-7',
    title: 'Outstanding Team Project',
    subtitle: 'Contributed to a collaborative build chosen as a class standout.',
    year: '2020',
    tag: 'Teamwork',
    accentFrom: '#60a5fa',
    accentTo: '#172554',
    details:
      'Worked closely with a small team to deliver a complete project that stood out for communication, execution quality, and balanced contribution.',
    highlights: ['Shared ownership', 'Milestone completion', 'Strong final output']
  },
  {
    id: 'lanyard-8',
    title: 'Technology Fair Exhibitor',
    subtitle: 'Showcased a student-built digital solution during a campus fair.',
    year: '2023',
    tag: 'Exhibit',
    accentFrom: '#2dd4bf',
    accentTo: '#042f2e',
    details:
      'Presented an interactive software concept to visitors and faculty, demonstrating both the technical build and the practical user value behind it.',
    highlights: ['Public demo', 'Faculty engagement', 'Interactive showcase']
  },
  {
    id: 'lanyard-9',
    title: 'Research Poster Merit',
    subtitle: 'Created a clear, well-structured poster for technical findings.',
    year: '2022',
    tag: 'Research',
    accentFrom: '#c084fc',
    accentTo: '#3b0764',
    details:
      'Developed a poster that translated technical information into a concise visual narrative, helping judges quickly understand the work and outcomes.',
    highlights: ['Clear visual summary', 'Good information flow', 'Positive evaluator feedback']
  },
  {
    id: 'lanyard-10',
    title: 'Community Impact Recognition',
    subtitle: 'Supported a school initiative with digital materials and coordination.',
    year: '2024',
    tag: 'Service',
    accentFrom: '#f97316',
    accentTo: '#431407',
    details:
      'Helped a school-led initiative by preparing digital assets, coordinating updates, and making sure communication materials were ready on time.',
    highlights: ['Useful support work', 'Organized delivery', 'Positive team contribution']
  }
];

export const Achievements: React.FC = () => {
  const [selectedLanyardId, setSelectedLanyardId] = React.useState<string | null>(null);
  const selectedLanyard =
    schoolAchievements.find((achievement) => achievement.id === selectedLanyardId) ?? null;

  React.useEffect(() => {
    if (!selectedLanyard) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLanyardId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLanyard]);

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <Particles
          className="opacity-80"
          particleColors={['#ffffff', '#8cc8ff', '#7df9d1', '#c7b6ff']}
          particleCount={220}
          particleSpread={9}
          speed={0.08}
          particleBaseSize={92}
          moveParticlesOnHover={true}
          particleHoverFactor={0.22}
          alphaParticles={true}
          sizeRandomness={0.75}
          cameraDistance={18}
          pixelRatio={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,249,209,0.12),transparent_26%),radial-gradient(circle_at_80%_22%,rgba(140,200,255,0.12),transparent_24%),linear-gradient(180deg,rgba(3,7,18,0.78),rgba(5,8,22,0.92))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200/80"
          >
            Achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white"
          >
            Milestones that reflect delivery, growth, and measurable results.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-lg text-slate-300/82"
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
                className="rounded-3xl border border-white/10 bg-white/8 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/10">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/70">
                  {achievement.title}
                </p>
                <p className="mb-4 text-4xl font-bold text-white">{achievement.value}</p>
                <p className="text-base leading-relaxed text-slate-300/82">
                  {achievement.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-10 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-[8px] sm:px-8 lg:px-10">
          <div className="absolute inset-0 z-0">
            <Particles
              className="opacity-75"
              particleColors={['#f8fafc', '#86efac', '#93c5fd', '#c4b5fd']}
              particleCount={160}
              particleSpread={8}
              speed={0.06}
              particleBaseSize={80}
              moveParticlesOnHover={true}
              particleHoverFactor={0.18}
              alphaParticles={true}
              sizeRandomness={0.9}
              cameraDistance={16}
              pixelRatio={1}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(134,239,172,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-10 text-center"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-300/88">
                School Achievements
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                Ten sample lanyards for awards, milestones, and campus highlights.
              </h3>
            </motion.div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {schoolAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Lanyard
                    title={achievement.title}
                    subtitle={achievement.subtitle}
                    year={achievement.year}
                    tag={achievement.tag}
                    accentFrom={achievement.accentFrom}
                    accentTo={achievement.accentTo}
                    position={[index % 2 === 0 ? -4 : 4, 0, 20]}
                    gravity={[0, -40 - (index % 3) * 2, 0]}
                    onClick={() => setSelectedLanyardId(achievement.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLanyard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
            onClick={() => setSelectedLanyardId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.28)] dark:bg-neutral-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
                    {selectedLanyard.tag} / {selectedLanyard.year}
                  </p>
                  <h4 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {selectedLanyard.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLanyardId(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition hover:bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mb-6 text-base leading-8 text-gray-600 dark:text-neutral-300">
                {selectedLanyard.details}
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {selectedLanyard.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Award, Rocket, Trophy, X } from 'lucide-react';
import Lanyard from '../components/Lanyard';

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
    title: 'Dean’s List Honor',
    subtitle: 'Recognized for consistent academic excellence across major subjects.',
    year: '2021',
    tag: 'Academic',
    accentFrom: '#34d399',
    accentTo: '#0f172a',
    details:
      'Earned a spot on the Dean’s List after maintaining strong grades throughout the academic year and contributing to classroom projects with dependable delivery.',
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

        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
              School Achievements
            </p>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
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
                    {selectedLanyard.tag} • {selectedLanyard.year}
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

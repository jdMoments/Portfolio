import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'motion/react';
import MagicBento, { MagicBentoItem } from '../components/MagicBento';
import { Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const MIN_BENTO_VISIBLE = 2;
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [pulseToken, setPulseToken] = useState(0);
  const [showMagicBento, setShowMagicBento] = useState(false);
  const [bentoProjectIds, setBentoProjectIds] = useState<string[]>([]);
  const inactivityTimerRef = useRef<number | null>(null);
  const selectionTimerRef = useRef<number | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    []
  );

  const clearRevealTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      window.clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const clearSelectionTimer = useCallback(() => {
    if (selectionTimerRef.current !== null) {
      window.clearTimeout(selectionTimerRef.current);
      selectionTimerRef.current = null;
    }
  }, []);

  const scheduleReveal = useCallback(() => {
    if (!activeProjectId || showMagicBento) return;
    clearRevealTimer();
    inactivityTimerRef.current = window.setTimeout(() => {
      setShowMagicBento(true);
    }, 3000);
  }, [activeProjectId, showMagicBento, clearRevealTimer]);

  useEffect(() => {
    if (activeProjectId && !showMagicBento) {
      scheduleReveal();
    } else {
      clearRevealTimer();
    }

    return () => {
      clearRevealTimer();
      clearSelectionTimer();
    };
  }, [activeProjectId, showMagicBento, scheduleReveal, clearRevealTimer, clearSelectionTimer]);

  const handleProjectImageClick = (id: string) => {
    clearSelectionTimer();
    setPendingProjectId(id);

    const previousActiveId = activeProjectId;

    selectionTimerRef.current = window.setTimeout(() => {
      setActiveProjectId(id);
      setPulseToken((prev) => prev + 1);

      setBentoProjectIds((prev) => {
        if (!previousActiveId) {
          return projects.filter((project) => project.id !== id).map((project) => project.id);
        }

        const base = prev.length
          ? prev.filter((projectId) => projectId !== id)
          : projects
              .filter((project) => project.id !== id && project.id !== previousActiveId)
              .map((project) => project.id);

        if (previousActiveId !== id && !base.includes(previousActiveId)) {
          base.push(previousActiveId);
        }

        return base;
      });

      setPendingProjectId(null);
    }, 230);
  };

  const handleSectionInteraction = () => {
    if (!activeProjectId || showMagicBento) return;
    scheduleReveal();
  };

  const bentoCards: MagicBentoItem[] = useMemo(() => {
    return bentoProjectIds
      .map((id) => projectById.get(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => ({
        id: project.id,
        image: project.image,
        title: project.title,
        description: project.description,
        label: project.technologies[0] || 'Project'
      }));
  }, [bentoProjectIds, projectById]);

  return (
    <section
      onMouseMove={handleSectionInteraction}
      onTouchStart={handleSectionInteraction}
      onWheel={handleSectionInteraction}
      onKeyDown={handleSectionInteraction}
      className={`relative transition-colors duration-700 overflow-hidden ${
        activeProject ? 'h-screen py-16 lg:py-20' : 'min-h-[600px] py-24'
      } bg-white dark:bg-neutral-950`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence initial={false} mode="sync">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeProject.image}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 magic-bento-background-glow" />
              <div className="absolute inset-0 magic-bento-background-grid" />
              <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className={`text-4xl font-bold tracking-tight mb-4 transition-colors duration-500 ${
                activeProject ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}
            >
              {activeProject ? activeProject.title : 'Selected Projects'}
            </h2>
            <p
              className={`text-lg max-w-2xl transition-colors duration-500 ${
                activeProject ? 'text-gray-100/90' : 'text-gray-500 dark:text-neutral-400'
              }`}
            >
              {activeProject
                ? activeProject.description
                : 'A collection of some of my favorite works, ranging from complex web applications to experimental UI explorations.'}
            </p>
          </motion.div>
        </div>

        {!activeProject && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard
                    project={project}
                    isActive={activeProjectId === project.id}
                    isPendingSelection={pendingProjectId === project.id}
                    pulseToken={pulseToken}
                    onImageClick={handleProjectImageClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {activeProject && (
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_560px] gap-8 lg:gap-8 items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="text-left lg:pr-6"
              >
                <div className="flex flex-wrap gap-3 mt-4">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/35 bg-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {activeProject.githubUrl && (
                  <motion.a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="mt-6 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/35 bg-white/10 text-white hover:bg-white/20"
                    aria-label={`Open ${activeProject.title} GitHub repository`}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {showMagicBento && bentoCards.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[560px] justify-self-end self-start lg:mt-[48px]"
                >
                  <MagicBento
                    cards={bentoCards.slice(0, MIN_BENTO_VISIBLE)}
                    onCardClick={handleProjectImageClick}
                    pendingSelectionId={pendingProjectId}
                    textAutoHide={false}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    glowColor="120, 255, 178"
                    particleCount={10}
                    spotlightRadius={220}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {activeProject && !showMagicBento && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            No interaction for 3 seconds reveals other projects on the right
          </motion.p>
        )}
        {activeProject && showMagicBento && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mt-6 text-xs uppercase tracking-[0.18em] text-white/70"
          >
            Always showing 2 projects on the right
          </motion.p>
        )}
      </div>
    </section>
  );
};

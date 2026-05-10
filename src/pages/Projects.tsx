import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'motion/react';
import MagicBento, { MagicBentoItem } from '../components/MagicBento';
import { ArrowLeft, Github } from 'lucide-react';
import LiquidEther from '../components/LiquidEther';

const PROJECT_REVEAL_DELAY_MS = 1500;
const PROJECT_RETURN_DELAY_MS = 10000;
const PROJECT_VIEWPORT_TOP_SHIFT = 0;

export const Projects: React.FC = () => {
  const MIN_BENTO_VISIBLE = 2;
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [pulseToken, setPulseToken] = useState(0);
  const [showMagicBento, setShowMagicBento] = useState(false);
  const [bentoProjectIds, setBentoProjectIds] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const autoReturnTimerRef = useRef<number | null>(null);
  const selectionTimerRef = useRef<number | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const activeTitleClassName =
    activeProject?.id === '1'
      ? 'max-w-none text-white text-[3rem] leading-[0.94] sm:text-[3.6rem] lg:text-[4.4rem] lg:whitespace-nowrap'
      : 'max-w-3xl text-white text-4xl leading-[0.92] lg:text-[4rem]';
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

  const clearAutoReturnTimer = useCallback(() => {
    if (autoReturnTimerRef.current !== null) {
      window.clearTimeout(autoReturnTimerRef.current);
      autoReturnTimerRef.current = null;
    }
  }, []);

  const closeActiveProject = useCallback(() => {
    clearRevealTimer();
    clearSelectionTimer();
    clearAutoReturnTimer();
    setPendingProjectId(null);
    setShowMagicBento(false);
    setBentoProjectIds([]);
    setActiveProjectId(null);
  }, [clearAutoReturnTimer, clearRevealTimer, clearSelectionTimer]);

  const scheduleReveal = useCallback(() => {
    if (!activeProjectId || showMagicBento) return;
    clearRevealTimer();
    inactivityTimerRef.current = window.setTimeout(() => {
      setShowMagicBento(true);
    }, PROJECT_REVEAL_DELAY_MS);
  }, [activeProjectId, showMagicBento, clearRevealTimer]);

  const scheduleAutoReturn = useCallback(() => {
    if (!activeProjectId) return;
    clearAutoReturnTimer();
    autoReturnTimerRef.current = window.setTimeout(() => {
      closeActiveProject();
    }, PROJECT_RETURN_DELAY_MS);
  }, [activeProjectId, clearAutoReturnTimer, closeActiveProject]);

  const scrollSectionIntoView = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targetY = Math.max(
      section.getBoundingClientRect().top + window.scrollY + PROJECT_VIEWPORT_TOP_SHIFT,
      0
    );

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (activeProjectId && !showMagicBento) {
      scheduleReveal();
    } else {
      clearRevealTimer();
    }

    if (activeProjectId) {
      scheduleAutoReturn();
    } else {
      clearAutoReturnTimer();
    }

    return () => {
      clearRevealTimer();
      clearSelectionTimer();
      clearAutoReturnTimer();
    };
  }, [
    activeProjectId,
    showMagicBento,
    scheduleReveal,
    scheduleAutoReturn,
    clearRevealTimer,
    clearSelectionTimer,
    clearAutoReturnTimer
  ]);

  const handleProjectImageClick = (id: string) => {
    clearSelectionTimer();
    clearRevealTimer();
    clearAutoReturnTimer();
    setPendingProjectId(id);

    const previousActiveId = activeProjectId;
    const openingFromProjectList = previousActiveId === null;

    if (openingFromProjectList) {
      setShowMagicBento(false);
      setBentoProjectIds([]);
      scrollSectionIntoView();
    }

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
    if (!activeProjectId) return;

    scheduleAutoReturn();

    if (!showMagicBento) {
      scheduleReveal();
    }
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
      ref={sectionRef}
      onMouseMove={handleSectionInteraction}
      onMouseEnter={handleSectionInteraction}
      onTouchStart={handleSectionInteraction}
      onWheel={handleSectionInteraction}
      onKeyDown={handleSectionInteraction}
      className={`relative transition-colors duration-700 overflow-hidden ${
        activeProject ? 'h-screen pt-24 pb-6 lg:pt-28 lg:pb-8' : 'min-h-[600px] py-24'
      } bg-[#02030a]`}
    >
      <div className="absolute inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 opacity-90"
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={28}
          cursorSize={120}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(82,39,255,0.18),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(255,159,252,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.9))]" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <AnimatePresence initial={false} mode="sync">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeProject.image}
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                style={{ objectPosition: activeProject.backgroundPosition ?? 'center' }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.34)_0%,rgba(2,6,23,0.18)_38%,rgba(2,6,23,0.08)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_42%,rgba(255,255,255,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(2,6,23,0.14)_58%,rgba(2,6,23,0.24)_100%)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          activeProject ? 'flex h-full flex-col justify-between' : ''
        }`}
      >
        <div className={`${activeProject ? 'mb-6 lg:mb-8' : 'mb-16'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={activeProject ? 'max-w-fit rounded-3xl border border-white/12 bg-black/12 px-5 py-5 backdrop-blur-[3px] sm:px-6' : ''}
          >
            {activeProject && (
              <button
                type="button"
                onClick={closeActiveProject}
                className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-black/25 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/35"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </button>
            )}
            <h2
              className={`text-4xl font-bold tracking-tight mb-4 transition-colors duration-500 ${
                activeProject ? activeTitleClassName : 'text-white'
              }`}
            >
              {activeProject ? activeProject.title : 'My Projects'}
            </h2>
            <p
              className={`text-lg max-w-2xl transition-colors duration-500 ${
                activeProject
                  ? 'max-w-[66rem] text-base leading-7 text-gray-100/90 lg:text-[1rem]'
                  : 'max-w-full whitespace-nowrap text-base text-gray-300 lg:text-lg'
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
          <div className="grid min-h-0 flex-1 grid-cols-1 items-end gap-5 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-3xl border border-white/12 bg-black/14 px-5 py-5 text-left backdrop-blur-[4px] lg:max-w-3xl lg:self-end lg:pr-4 sm:px-6"
              >
                {activeProject.role && (
                  <p className="mb-4 text-sm font-medium text-emerald-300/95">
                    Role: <span className="text-white">{activeProject.role}</span>
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
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
                    className="mt-5 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/35 bg-white/10 text-white hover:bg-white/20"
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
                  className="w-full max-w-[500px] justify-self-end self-end"
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
            No interaction for 1.5 seconds reveals other projects on the right
          </motion.p>
        )}
      </div>
    </section>
  );
};

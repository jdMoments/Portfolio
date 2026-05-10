import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './pages/Projects';
import { Experience } from './pages/Experience';
import { Achievements } from './pages/Achievements';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { NavItem } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = React.useState<NavItem>('home');
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [heroTransitionProgress, setHeroTransitionProgress] = React.useState(0);
  const isAutoScrollingRef = React.useRef(false);
  const scrollAnimationFrameRef = React.useRef<number | null>(null);
  const scrollReleaseTimeoutRef = React.useRef<number | null>(null);
  const homeSectionRef = React.useRef<HTMLDivElement | null>(null);
  const projectsSectionRef = React.useRef<HTMLDivElement | null>(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to html element
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const stopAutoScroll = React.useCallback(() => {
    if (scrollAnimationFrameRef.current !== null) {
      cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }
    if (scrollReleaseTimeoutRef.current !== null) {
      window.clearTimeout(scrollReleaseTimeoutRef.current);
      scrollReleaseTimeoutRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  const navigateToSection = React.useCallback((section: NavItem) => {
    const element = document.getElementById(section);
    if (element) {
      stopAutoScroll();

      const navOffset = 72;
      const startY = window.scrollY;
      const targetY = Math.max(element.getBoundingClientRect().top + window.scrollY - navOffset, 0);
      const distance = targetY - startY;
      const duration = 450;

      setActiveSection(section);

      if (Math.abs(distance) < 2) {
        return;
      }

      isAutoScrollingRef.current = true;

      let startTime: number | null = null;
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          scrollAnimationFrameRef.current = requestAnimationFrame(step);
        } else {
          stopAutoScroll();
        }
      };

      scrollAnimationFrameRef.current = requestAnimationFrame(step);
      scrollReleaseTimeoutRef.current = window.setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, duration + 120);
    } else {
      setActiveSection(section);
    }
  }, [stopAutoScroll]);

  // ScrollSpy to update activeSection on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      const sections: NavItem[] = [
        'home',
        'projects',
        'experience',
        'achievements',
        'about',
        'contact'
      ];
      const scrollPosition = window.scrollY + 110;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    return () => stopAutoScroll();
  }, [stopAutoScroll]);

  React.useEffect(() => {
    let animationFrameId: number | null = null;

    const updateHeroTransition = () => {
      animationFrameId = null;

      const homeElement = homeSectionRef.current;
      const projectsElement = projectsSectionRef.current;

      if (!homeElement || !projectsElement) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const transitionStart = Math.max(homeElement.offsetTop, 0);
      const transitionEnd = Math.max(
        projectsElement.offsetTop - viewportHeight * 0.55,
        transitionStart + 1
      );
      const rawProgress =
        (window.scrollY - transitionStart) / (transitionEnd - transitionStart);
      const nextProgress = Math.max(0, Math.min(rawProgress, 1));

      setHeroTransitionProgress((current) =>
        Math.abs(current - nextProgress) < 0.01 ? current : nextProgress
      );
    };

    const requestHeroTransitionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateHeroTransition);
    };

    requestHeroTransitionUpdate();

    window.addEventListener('scroll', requestHeroTransitionUpdate, { passive: true });
    window.addEventListener('resize', requestHeroTransitionUpdate);

    return () => {
      window.removeEventListener('scroll', requestHeroTransitionUpdate);
      window.removeEventListener('resize', requestHeroTransitionUpdate);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const sectionReveal = {
    hidden: { opacity: 0, y: 56, scale: 0.985 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const projectsOpacity = 1;
  const projectsTranslateY = 0;
  const projectsScale = 1;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-gray-900 dark:text-neutral-100 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors duration-300">
      <Navbar 
        activeSection={activeSection} 
        onNavigate={navigateToSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main>
        <div className="relative">
          <div
            id="home"
            ref={homeSectionRef}
            className="sticky top-16 z-0"
            style={{
              willChange: 'auto'
            }}
          >
            <Hero
              onViewProjects={() => navigateToSection('projects')}
              transitionProgress={heroTransitionProgress}
            />
          </div>
          
          <div
            id="projects"
            ref={projectsSectionRef}
            className="relative z-10 bg-white dark:bg-neutral-950"
            style={{
              opacity: projectsOpacity,
              transform: `translate3d(0, ${projectsTranslateY}px, 0) scale(${projectsScale})`,
              transformOrigin: 'center top',
              willChange: 'transform'
            }}
          >
            <Projects />
          </div>
        </div>
        
        <motion.div
          id="experience"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22 }}
          custom={0.14}
        >
          <Experience />
        </motion.div>

        <motion.div
          id="achievements"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22 }}
          custom={0.17}
        >
          <Achievements />
        </motion.div>

        <motion.div
          id="about"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22 }}
          custom={0.19}
        >
          <About />
        </motion.div>

        <motion.div
          id="contact"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22 }}
          custom={0.2}
        >
          <Contact />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

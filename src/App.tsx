import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { NavItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = React.useState<NavItem>('home');
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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

  // Scroll to section when activeSection changes
  const isScrollingRef = React.useRef(false);

  React.useEffect(() => {
    if (isScrollingRef.current) return;
    const element = document.getElementById(activeSection);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, [activeSection]);

  // ScrollSpy to update activeSection on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections: NavItem[] = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-gray-900 dark:text-neutral-100 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors duration-300">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main>
        <div id="home">
          <Hero onViewProjects={() => setActiveSection('projects')} />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

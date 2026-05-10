import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Facebook } from 'lucide-react';
import heroBackgroundImage from '../assets/hero-background-sample.png';

interface HeroProps {
  onViewProjects: () => void;
  transitionProgress?: number;
}

const heroHighlightItems = [
  'Full-Stack Developer',
  'Modern Web Interfaces',
  'Fast & Accessible Builds'
];

export const Hero: React.FC<HeroProps> = ({ onViewProjects, transitionProgress = 0 }) => {
  const scrollStyle = React.useMemo(
    () => ({
      opacity: 1 - transitionProgress,
      transform: `scale(${1 - transitionProgress * 0.1})`
    }),
    [transitionProgress]
  );

  return (
    <section className="relative min-h-[calc(100vh-4rem+88px)] overflow-hidden bg-[#090b13] transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat opacity-72"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,15,0.88)_0%,rgba(8,9,15,0.78)_30%,rgba(11,10,18,0.5)_56%,rgba(15,11,18,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,214,102,0.06),transparent_28%),radial-gradient(circle_at_74%_20%,rgba(191,87,126,0.1),transparent_24%),radial-gradient(circle_at_78%_55%,rgba(145,114,176,0.08),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.16))]" />
      </div>

      <div
        style={scrollStyle}
        className="relative z-10 flex min-h-[calc(100vh-4rem+88px)] flex-col justify-between transition-all duration-100 ease-linear"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl lg:max-w-4xl"
            >
              <span className="mb-7 inline-flex rounded-full border border-white/16 bg-white/8 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/92 backdrop-blur-sm">
                Hi I&apos;m
              </span>
              <h1 className="mb-7 text-5xl leading-[0.92] font-bold tracking-[-0.06em] text-white sm:text-6xl sm:leading-[0.94] lg:text-[4.9rem] lg:whitespace-nowrap xl:text-[5.65rem]">
                Jholmer L. Damayo
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-[1.6] text-gray-200 sm:text-xl lg:text-[1.05rem] xl:text-[1.15rem]">
                I&apos;m a Full-Stack Developer specializing in building exceptional digital experiences that are fast, accessible, and visually stunning.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <button
                  onClick={onViewProjects}
                  className="group flex items-center rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-[#f5e9c8]"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="ml-0 flex space-x-3 sm:ml-4">
                  <a
                    href="https://github.com/jdMoments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/18 bg-white/8 p-4 text-gray-200 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jholmer-damayo-10a603295/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/18 bg-white/8 p-4 text-gray-200 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/jholmerrrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/18 bg-white/8 p-4 text-gray-200 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative border-t border-white/8 bg-[linear-gradient(90deg,#09092c_0%,#060617_46%,#121126_100%)]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68 sm:px-6 lg:px-8">
            {heroHighlightItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#bca5ff]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

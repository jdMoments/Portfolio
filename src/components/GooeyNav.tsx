import { useEffect, useMemo, useRef } from 'react';
import { NavItem } from '../types';
import './GooeyNav.css';

interface GooeyNavItem {
  id: NavItem;
  label: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
}

export const GooeyNav = ({
  items,
  activeItem,
  onNavigate,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4]
}: GooeyNavProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const timeoutIdsRef = useRef<number[]>([]);

  const activeIndex = useMemo(
    () => Math.max(items.findIndex((item) => item.id === activeItem), 0),
    [items, activeItem]
  );

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);

    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const clearParticleTimeouts = () => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  const clearParticles = () => {
    if (!filterRef.current) return;

    const particles = filterRef.current.querySelectorAll('.particle');
    particles.forEach((particle) => {
      particle.remove();
    });
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;

    element.style.setProperty('--time', `${bubbleTime}ms`);
    clearParticleTimeouts();

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      const particle = document.createElement('span');
      const point = document.createElement('span');

      particle.classList.add('particle');
      particle.style.setProperty('--start-x', `${p.start[0]}px`);
      particle.style.setProperty('--start-y', `${p.start[1]}px`);
      particle.style.setProperty('--end-x', `${p.end[0]}px`);
      particle.style.setProperty('--end-y', `${p.end[1]}px`);
      particle.style.setProperty('--time', `${p.time}ms`);
      particle.style.setProperty('--scale', `${p.scale}`);
      particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
      particle.style.setProperty('--rotate', `${p.rotate}deg`);

      point.classList.add('point');
      particle.appendChild(point);
      element.appendChild(particle);

      requestAnimationFrame(() => {
        element.classList.add('active');
      });

      const removeId = window.setTimeout(() => {
        particle.remove();
      }, t);

      timeoutIdsRef.current.push(removeId);
    }
  };

  const updateEffectPosition = (element: HTMLLIElement, index: number) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);

    const itemLabel = items[index]?.label ?? '';
    textRef.current.innerText = itemLabel;
  };

  const triggerEffect = (liEl: HTMLLIElement, index: number, withParticles: boolean) => {
    updateEffectPosition(liEl, index);

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }

    if (!filterRef.current) return;

    clearParticles();
    if (withParticles) {
      makeParticles(filterRef.current);
    }
  };

  useEffect(() => {
    const currentLi = navRef.current?.querySelectorAll('li')[activeIndex];
    if (!currentLi) return;

    updateEffectPosition(currentLi, activeIndex);

    if (textRef.current) {
      textRef.current.classList.add('active');
      textRef.current.innerText = items[activeIndex]?.label ?? '';
    }
  }, [activeIndex, items]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const currentLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentLi) {
        updateEffectPosition(currentLi, activeIndex);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      clearParticleTimeouts();
      clearParticles();
    };
  }, []);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <svg className="gooey-filter-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.id} className={activeIndex === index ? 'active' : ''}>
              <button
                type="button"
                onClick={(event) => {
                  const parent = event.currentTarget.parentElement;
                  if (parent) {
                    triggerEffect(parent, index, true);
                  }
                  onNavigate(item.id);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import './Lanyard.css';

interface LanyardProps {
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  accentFrom?: string;
  accentTo?: string;
  position?: [number, number, number];
  gravity?: [number, number, number];
  onClick?: () => void;
}

const Lanyard: React.FC<LanyardProps> = ({
  title,
  subtitle,
  year,
  tag,
  accentFrom = '#10b981',
  accentTo = '#0f172a',
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  onClick
}) => {
  const tilt = Math.max(-8, Math.min(8, position[0] * 0.6));
  const lift = Math.max(-6, Math.min(10, gravity[1] * -0.06));

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -8, rotate: tilt * 0.5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="lanyard-card"
      style={
        {
          transform: `translate3d(0, ${lift}px, 0) rotate(${tilt}deg)`,
          ['--lanyard-accent-from' as string]: accentFrom,
          ['--lanyard-accent-to' as string]: accentTo
        } as React.CSSProperties
      }
    >
      <div className="lanyard-card__rope">
        <div className="lanyard-card__clip" />
      </div>

      <div className="lanyard-card__badge">
        <div className="lanyard-card__content">
          <div className="lanyard-card__eyebrow">
            <span className="lanyard-card__dot" />
            {tag}
          </div>
          <h3 className="lanyard-card__title">{title}</h3>
          <p className="lanyard-card__subtitle">{subtitle}</p>
          <div className="lanyard-card__footer">
            <span>View Details</span>
            <span className="lanyard-card__year">{year}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default Lanyard;

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Props {
  world: 'day' | 'night' | 'dream';
}

export function AmbientParticles({ world }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles based on world
  useEffect(() => {
    const particleCount = world === 'night' ? 50 : world === 'dream' ? 30 : 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (world === 'dream' ? 8 : 4) + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [world]);

  const getParticleStyles = (world: Props['world']) => {
    switch (world) {
      case 'day':
        return {
          className: 'bg-yellow-300/30 rounded-full blur-sm',
          animation: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }
        };
      case 'night':
        return {
          className: 'bg-white/40 rounded-full blur-sm',
          animation: {
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }
        };
      case 'dream':
        return {
          className: 'bg-purple-300/30 rounded-full blur-md',
          animation: {
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => {
          const styles = getParticleStyles(world);
          return (
            <motion.div
              key={particle.id}
              className={styles.className}
              style={{
                position: 'absolute',
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                ...styles.animation,
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
} 
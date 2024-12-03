'use client';

import { motion } from 'framer-motion';

interface Props {
  piece: {
    id: string;
    title: string;
    path: string;
    category: string;
    size: 'small' | 'medium' | 'large';
  };
  world: 'day' | 'night' | 'dream';
  isMoving: boolean;
  shouldShuffle: boolean;
  color: string;
}

const EnhancedWorm = ({ piece, world, isMoving, shouldShuffle, color }: Props) => {
  // Convert the gradient color to a glow color
  const glowColor = color.split(' ')[0].replace('from-', '');
  
  // Enhanced movement patterns based on category
  const getCategoryMovement = () => {
    if (!isMoving) return {};

    const baseX = Math.random() * 40 - 20;
    const baseY = Math.random() * 30 - 15;
    
    switch (piece.category) {
      case 'object':
        return {
          x: [baseX, baseX + 100, baseX - 100, baseX],
          y: [baseY, baseY - 50, baseY + 50, baseY],
          rotate: [0, 90, -90, 0],
          scale: [1, 1.1, 0.9, 1],
        };
      case 'organic':
        return {
          x: [baseX, baseX + 150, baseX - 100, baseX + 50, baseX],
          y: [baseY, baseY - 120, baseY + 80, baseY - 40, baseY],
          scaleX: [1, 1.2, 0.8, 1.1, 1],
          scaleY: [1, 0.8, 1.2, 0.9, 1],
        };
      case 'robot':
        return {
          x: [baseX, baseX + 80, baseX + 80, baseX - 80, baseX - 80, baseX],
          y: [baseY, baseY, baseY - 60, baseY - 60, baseY + 30, baseY],
          rotate: [0, 0, -45, -45, 45, 0],
          scale: [1, 1.05, 1, 0.95, 1],
        };
      default:
        return {
          x: [baseX, baseX + 120, baseX - 80, baseX],
          y: [baseY, baseY - 80, baseY + 60, baseY],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 0.9, 1],
        };
    }
  };

  // Enhanced idle animations based on category
  const getIdleAnimation = () => {
    switch (piece.category) {
      case 'object':
        return {
          scale: [0.95, 1.05, 0.95],
          rotate: [-5, 5, -5],
        };
      case 'organic':
        return {
          scaleX: [1, 1.1, 0.95, 1],
          scaleY: [0.95, 0.9, 1.05, 0.95],
          y: [0, -5, 0],
        };
      case 'robot':
        return {
          scale: [0.98, 1.02, 0.98],
          rotate: [-2, 2, -2],
          y: [0, -2, 0],
        };
      default:
        return {
          scale: [0.95, 1.05, 0.95],
          rotate: [-3, 3, -3],
        };
    }
  };

  // World-specific effects
  const getWorldEffects = () => {
    const baseEffects = {
      transformOrigin: 'center center',
    };

    switch (world) {
      case 'day':
        return {
          ...baseEffects,
          filter: `brightness(1.1) drop-shadow(0 0 12px ${glowColor})`,
          opacity: 0.9,
        };
      case 'night':
        return {
          ...baseEffects,
          filter: `brightness(1.3) saturate(1.2) drop-shadow(0 0 15px ${glowColor})`,
          opacity: 1,
        };
      case 'dream':
        return {
          ...baseEffects,
          filter: `brightness(1.2) hue-rotate(15deg) drop-shadow(0 0 18px ${glowColor})`,
          opacity: 0.95,
        };
    }
  };

  return (
    <motion.div
      className="relative w-full h-full group cursor-pointer touch-none"
      style={getWorldEffects()}
      animate={{
        ...(isMoving ? getCategoryMovement() : getIdleAnimation()),
      }}
      transition={{
        duration: isMoving ? 6 : 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: isMoving ? "easeInOut" : "easeInOut",
        delay: Math.random() * 0.8,
      }}
      whileHover={{ 
        scale: 1.3,
        rotate: [0, 10, -10, 0],
        transition: {
          duration: 0.3,
          rotate: {
            duration: 0.5,
            repeat: Infinity,
          }
        }
      }}
      whileTap={{ scale: 0.9, rotate: 0 }}
    >
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          filter: `blur(${world === 'dream' ? 15 : 10}px)`,
          opacity: world === 'night' ? 0.5 : 0.4,
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.4, 0.6, 0.3, 0.5, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img 
          src={piece.path} 
          alt={piece.title} 
          className="w-full h-full" 
        />
      </motion.div>

      {/* Main worm */}
      <motion.img 
        src={piece.path}
        alt={piece.title}
        className="w-full h-full relative z-10" 
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
        animate={{
          filter: [
            'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
            'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Preview card */}
      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={false}
      >
        <p className="text-white text-sm font-medium">{piece.title}</p>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedWorm; 
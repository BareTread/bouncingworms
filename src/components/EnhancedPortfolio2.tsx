'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Star, Pause, Play, Filter } from 'lucide-react';
import EnhancedWorm from './EnhancedWorm';

type World = 'day' | 'night' | 'dream';

interface ArtPiece {
  id: string;
  title: string;
  path: string;
  category: string;
  size: 'small' | 'medium' | 'large';
}

const categories = [
  { 
    id: 'character',
    letter: 'C', 
    color: 'from-blue-400/80 to-cyan-500/80',
  },
  { 
    id: 'object',
    letter: 'O', 
    color: 'from-orange-400/80 to-red-500/80',
  },
  { 
    id: 'nature',
    letter: 'N', 
    color: 'from-green-400/80 to-emerald-500/80',
  },
  { 
    id: 'organic',
    letter: 'O', 
    color: 'from-purple-400/80 to-fuchsia-500/80',
  },
  { 
    id: 'robot',
    letter: 'R', 
    color: 'from-zinc-400/80 to-slate-500/80',
  }
];

const artPieces: ArtPiece[] = [
  // Character worms
  {
    id: 'character-worm-1',
    title: 'Happy Worm',
    path: '/worms/object-1.svg',
    category: 'character',
    size: 'medium'
  },
  {
    id: 'character-worm-2',
    title: 'Playful Worm',
    path: '/worms/object-2.svg',
    category: 'character',
    size: 'large'
  },
  // Object worms
  {
    id: 'object-worm-1',
    title: 'Geometric Slider',
    path: '/worms/object-1.svg',
    category: 'object',
    size: 'medium'
  },
  {
    id: 'object-worm-2',
    title: 'Cube Crawler',
    path: '/worms/object-2.svg',
    category: 'object',
    size: 'large'
  },
  {
    id: 'object-worm-3',
    title: 'Pyramid Pals',
    path: '/worms/object-3.svg',
    category: 'object',
    size: 'small'
  },
  // Nature worms
  {
    id: 'nature-worm-1',
    title: 'Leaf Slider',
    path: '/worms/organic-1.svg',
    category: 'nature',
    size: 'medium'
  },
  {
    id: 'nature-worm-2',
    title: 'Forest Friend',
    path: '/worms/organic-2.svg',
    category: 'nature',
    size: 'large'
  },
  // Organic worms
  {
    id: 'organic-worm-1',
    title: 'Blob Bouncer',
    path: '/worms/organic-1.svg',
    category: 'organic',
    size: 'medium'
  },
  {
    id: 'organic-worm-2',
    title: 'Squish Squad',
    path: '/worms/organic-2.svg',
    category: 'organic',
    size: 'large'
  },
  {
    id: 'organic-worm-3',
    title: 'Jelly Jumper',
    path: '/worms/organic-3.svg',
    category: 'organic',
    size: 'small'
  },
  // Robot worms
  {
    id: 'robot-worm-1',
    title: 'Mecha Mover',
    path: '/worms/robot-1.svg',
    category: 'robot',
    size: 'large'
  },
  {
    id: 'robot-worm-2',
    title: 'Circuit Slider',
    path: '/worms/robot-2.svg',
    category: 'robot',
    size: 'medium'
  },
  {
    id: 'robot-worm-3',
    title: 'Tech Tracker',
    path: '/worms/robot-3.svg',
    category: 'robot',
    size: 'small'
  }
];

const EnhancedPortfolio2 = () => {
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(true);
  const [shouldShuffle, setShouldShuffle] = useState(false);

  const backgrounds = {
    day: 'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100',
    night: 'bg-gradient-to-b from-indigo-950 via-blue-900 to-purple-900',
    dream: 'bg-gradient-to-b from-purple-400 via-pink-300 to-rose-300'
  };

  return (
    <div className={`min-h-screen ${backgrounds[currentWorld]} transition-colors duration-1000`}>
      {/* Category buttons - Fixed corner menu */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(
              activeCategory === category.id ? null : category.id
            )}
            className={`w-16 h-16 rounded-2xl relative flex items-center justify-center
              ${activeCategory === category.id ? 'ring-2 ring-white/30' : ''}
              hover:ring-2 hover:ring-white/20
              transition-all duration-300 backdrop-blur-sm`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color}
                opacity-${activeCategory === category.id ? '90' : '70'}`}
            />
            <span className="relative z-10 text-white font-bold text-2xl drop-shadow-lg">
              {category.letter}
            </span>
            
            {/* Category tooltip */}
            {activeCategory === category.id && (
              <motion.div
                className="absolute left-full ml-4 px-4 py-2 bg-black/40 backdrop-blur-md
                          rounded-xl text-white text-sm whitespace-nowrap shadow-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Floating artwork layer */}
      <div className="relative w-full h-full min-h-screen">
        <AnimatePresence mode="popLayout">
          {artPieces.map((piece) => {
            if (activeCategory && piece.category !== activeCategory) return null;
            return (
              <motion.div
                key={piece.id}
                className="absolute touch-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1
                }}
                style={{
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  width: piece.size === 'large' ? '100px' : piece.size === 'medium' ? '70px' : '50px',
                  height: piece.size === 'large' ? '100px' : piece.size === 'medium' ? '70px' : '50px',
                }}
              >
                <EnhancedWorm
                  piece={piece}
                  world={currentWorld}
                  isMoving={isMoving}
                  shouldShuffle={shouldShuffle}
                  color={categories.find(c => c.id === piece.category)?.color || ''}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 right-1/2 translate-x-1/2 flex items-center gap-4 z-50">
        <motion.button
          onClick={() => setCurrentWorld(prev => prev === 'day' ? 'night' : prev === 'night' ? 'dream' : 'day')}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentWorld === 'day' ? <Sun className="w-6 h-6 text-yellow-400" /> : 
           currentWorld === 'night' ? <Moon className="w-6 h-6 text-blue-400" /> : 
           <Star className="w-6 h-6 text-purple-400" />}
        </motion.button>

        <motion.button
          onClick={() => setIsMoving(!isMoving)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMoving ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </motion.button>

        <motion.button
          onClick={() => setShouldShuffle(!shouldShuffle)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default EnhancedPortfolio2;

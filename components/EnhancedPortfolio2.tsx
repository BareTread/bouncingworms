'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Star, Zap, Sparkles, Eye, Pause, Play, Filter, Cloud, Info, X } from 'lucide-react';

type World = 'day' | 'night' | 'dream';

interface ArtPiece {
  id: number;
  title: string;
  path: string;
  category: string;
  size: 'small' | 'medium' | 'large';
}

const artworks: ArtPiece[] = [
  { id: 1, title: 'Self Portrait', path: '/images/selfportrait.jpg', category: 'portrait', size: 'large' },
  { id: 2, title: 'Blue Character', path: '/images/bchar.jpg', category: 'character', size: 'medium' },
  { id: 3, title: 'Green Character', path: '/images/gchar.jpg', category: 'character', size: 'medium' },
  { id: 4, title: 'Red Character', path: '/images/rchar.jpg', category: 'character', size: 'medium' },
  { id: 5, title: 'Butterfly Study', path: '/images/butterfly.jpg', category: 'nature', size: 'large' },
  { id: 6, title: 'Worm Character', path: '/images/worm.jpg', category: 'character', size: 'small' },
  { id: 7, title: 'Typewriter', path: '/images/typerwiter.jpg', category: 'object', size: 'medium' },
  { id: 8, title: 'Tattoo Design', path: '/images/tattoo.jpg', category: 'design', size: 'large' },
  { id: 9, title: 'Nature Scene 1', path: '/images/screenshot (3).jpg', category: 'nature', size: 'large' },
  { id: 10, title: 'Nature Scene 2', path: '/images/screenshot (4).jpg', category: 'nature', size: 'large' },
  { id: 11, title: 'Nature Scene 3', path: '/images/screenshot (5).jpg', category: 'nature', size: 'large' },
  { id: 12, title: 'Urban Scene 1', path: '/images/screenshot (6).jpg', category: 'object', size: 'medium' },
  { id: 13, title: 'Urban Scene 2', path: '/images/screenshot (7).jpg', category: 'object', size: 'medium' },
  { id: 14, title: 'Landscape 1', path: '/images/screenshot (8).jpg', category: 'nature', size: 'large' },
  { id: 15, title: 'Landscape 2', path: '/images/screenshot (9).jpg', category: 'nature', size: 'large' },
];

const categories = [
  { id: 'all', letter: 'A', color: 'from-white/60 to-gray-300/60', name: 'All' },
  { id: 'character', letter: 'C', color: 'from-blue-400/80 to-cyan-500/80', name: 'Character' },
  { id: 'portrait', letter: 'P', color: 'from-pink-400/80 to-purple-500/80', name: 'Portrait' },
  { id: 'nature', letter: 'N', color: 'from-green-400/80 to-emerald-500/80', name: 'Nature' },
  { id: 'object', letter: 'O', color: 'from-yellow-400/80 to-orange-500/80', name: 'Object' },
  { id: 'design', letter: 'D', color: 'from-purple-400/80 to-indigo-500/80', name: 'Design' }
];

// Color utilities
const getShapeColor = (category: string, world: World) => {
  const opacity = world === 'night' ? '0.8' : '0.6';
  switch(category) {
    case 'portrait':
      return world === 'dream' ? `rgba(236, 72, 153, ${opacity})` : `rgba(244, 114, 182, ${opacity})`;
    case 'character':
      return world === 'dream' ? `rgba(59, 130, 246, ${opacity})` : `rgba(96, 165, 250, ${opacity})`;
    case 'nature':
      return world === 'dream' ? `rgba(34, 197, 94, ${opacity})` : `rgba(74, 222, 128, ${opacity})`;
    case 'object':
      return world === 'dream' ? `rgba(234, 179, 8, ${opacity})` : `rgba(250, 204, 21, ${opacity})`;
    default:
      return world === 'dream' ? `rgba(168, 85, 247, ${opacity})` : `rgba(192, 132, 252, ${opacity})`;
  }
};

// SVG mapping for different categories
const WormSVGs = {
  character: '/svg/cartoon-356497.svg',
  nature: '/svg/earthworm-151033.svg',
  object: '/svg/worm-161203.svg',
  portrait: '/svg/earthworm-5652736.svg',
  default: '/svg/worm-305388.svg'
};

const generateWormShape = (piece: ArtPiece, world: World, isMoving: boolean, shouldShuffle: boolean) => {
  const color = getShapeColor(piece.category, world);
  const glowColor = color.replace(')', ', 0.3)').replace('rgba', 'rgb');
  const svgPath = WormSVGs[piece.category as keyof typeof WormSVGs] || WormSVGs.default;

  // Base pulsating animation (always active)
  const pulseAnimation = {
    scale: [1, 1.1, 0.95, 1],
    rotate: [-5, 5, -5, 0],
  };

  // Initial shuffle animation values
  const shuffleX = Math.random() * 40 - 20; // Random value between -20 and 20
  const shuffleY = Math.random() * 30 - 15; // Random value between -15 and 15

  return (
    <motion.div
      className="relative w-full h-full group cursor-pointer"
      style={{ filter: `drop-shadow(0 0 10px ${glowColor})` }}
      animate={isMoving ? {
        ...pulseAnimation,
        x: shouldShuffle ? [shuffleX, "100vw", "-100vw", 0] : ["100vw", "-100vw", 0],
        y: shouldShuffle ? [shuffleY, "20vh", "-20vh", 0] : ["20vh", "-20vh", 0],
      } : {
        ...pulseAnimation,
        x: 0,
        y: 0,
      }}
      transition={isMoving ? {
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        x: {
          duration: shouldShuffle ? 0.3 : 20,
          repeat: shouldShuffle ? 1 : Infinity,
          ease: shouldShuffle ? "easeOut" : "linear",
          times: shouldShuffle ? [0, 1] : [0, 0.1, 0.9, 1] // Quick shuffle then smooth movement
        },
        y: {
          duration: shouldShuffle ? 0.3 : 15,
          repeat: shouldShuffle ? 1 : Infinity,
          ease: shouldShuffle ? "easeOut" : "easeInOut",
          times: shouldShuffle ? [0, 1] : [0, 0.1, 0.9, 1] // Quick shuffle then smooth movement
        }
      } : {
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        x: {
          duration: 0.3, // Quick return to original position
          ease: "easeOut"
        },
        y: {
          duration: 0.3, // Quick return to original position
          ease: "easeOut"
        }
      }}
      whileHover={{ 
        scale: 1.3,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 10
        }
      }}
    >
      {/* Preview on hover */}
      <div 
        className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-black/80 p-3 rounded-xl shadow-2xl
                  opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none
                  border border-white/20 backdrop-blur-sm"
        style={{ 
          width: '250px',
          height: '180px',
          transformOrigin: 'bottom center',
        }}
      >
        <div className="text-white text-sm mb-2 font-medium capitalize text-center">{piece.title}</div>
        <div className="relative w-full h-[140px]">
          <Image
            src={piece.path}
            alt={piece.title}
            fill
            className="object-contain rounded-lg"
            sizes="250px"
          />
        </div>
      </div>

      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0"
        style={{ filter: `blur(8px) opacity(0.3)` }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={svgPath} 
          alt={piece.category} 
          className="w-full h-full" 
          style={{ filter: `hue-rotate(${getHueRotation(color)})` }} 
        />
      </motion.div>

      {/* Main SVG */}
      <img 
        src={svgPath} 
        alt={piece.category}
        className="w-full h-full relative z-10 drop-shadow-md" 
        style={{ 
          filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.2)) hue-rotate(${getHueRotation(color)})`,
          opacity: world === 'day' ? 0.85 : 1
        }} 
      />
    </motion.div>
  );
};

// Helper function to calculate hue rotation based on color
const getHueRotation = (color: string) => {
  // Extract RGB values
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return '0deg';
  
  const [_, r, g, b] = match.map(Number);
  
  // Calculate hue angle (simplified version)
  const hue = Math.atan2(
    Math.sqrt(3) * (g - b),
    2 * r - g - b
  ) * (180 / Math.PI);
  
  return `${hue}deg`;
};

// Update the shape rendering in the main component
const renderShape = (piece: ArtPiece, world: World, isMoving: boolean, shouldShuffle: boolean) => {
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {generateWormShape(piece, world, isMoving, shouldShuffle)}
    </motion.div>
  );
};

// Particle component for ambient effects
const FloatingParticle = ({ index }: { index: number }) => {
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 5;
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  return (
    <motion.div
      className="absolute rounded-full bg-white/20"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const EnhancedPortfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMoving, setIsMoving] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(false);
  const [hoveredPiece, setHoveredPiece] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-white/80 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading worms...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const backgrounds = {
    day: 'bg-gradient-to-br from-slate-50 to-gray-100',
    night: 'bg-gradient-to-br from-slate-900 to-gray-900',
    dream: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur'
  };

  const getBackgroundStyle = (world: typeof currentWorld) => {
    switch (world) {
      case 'day':
        return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-gray-50 to-white';
      case 'night':
        return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-gray-900 to-slate-950';
      case 'dream':
        return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-pink-900/20 to-slate-900/20 backdrop-blur';
      default:
        return backgrounds.day;
    }
  };

  // Memoize initial positions to prevent recalculation on re-renders
  const initialPositions = useMemo(() => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const margin = windowWidth < 768 ? 60 : 120;

    return artworks.map(() => ({
      x: margin + Math.random() * (windowWidth - margin * 2),
      y: margin + Math.random() * (windowHeight - margin * 2),
      rotate: Math.random() * 360
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPiece) setSelectedPiece(null);
        if (showAbout) setShowAbout(false);
      }
      if (e.key === ' ' && !selectedPiece && !showAbout) {
        e.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPiece, showAbout, isMoving]);

  const getLineStyles = (category: string) => {
    switch (category) {
      case 'portrait': return 'w-[2px] h-32 bg-gradient-to-b from-pink-400/80 to-purple-500/80';
      case 'character': return 'w-[2px] h-40 bg-gradient-to-b from-blue-400/80 to-cyan-500/80';
      case 'nature': return 'w-[2px] h-36 bg-gradient-to-b from-green-400/80 to-emerald-500/80';
      case 'object': return 'w-[2px] h-28 bg-gradient-to-b from-yellow-400/80 to-orange-500/80';
      case 'design': return 'w-[2px] h-44 bg-gradient-to-b from-purple-400/80 to-indigo-500/80';
      default: return 'w-[2px] h-32 bg-gradient-to-b from-gray-400/80 to-gray-500/80';
    }
  };

  const getExpandedStyles = (category: string) => {
    switch (category) {
      case 'portrait': return 'bg-gradient-to-br from-pink-400 to-purple-500';
      case 'character': return 'bg-gradient-to-br from-blue-400 to-cyan-500';
      case 'nature': return 'bg-gradient-to-br from-green-400 to-emerald-500';
      case 'object': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'design': return 'bg-gradient-to-br from-purple-400 to-indigo-500';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500';
    }
  };

  const getCategoryStyle = (category: string) => {
    const categoryConfig = categories.find(c => c.id === category);
    return categoryConfig ? `bg-gradient-to-br ${categoryConfig.color}` : 'bg-white/5';
  };

  const shapeMotion = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    },
    tap: { scale: 0.95 }
  };

  const cycleWorld = () => {
    switch (currentWorld) {
      case 'day':
        setCurrentWorld('night');
        break;
      case 'night':
        setCurrentWorld('dream');
        break;
      case 'dream':
        setCurrentWorld('day');
        break;
      default:
        setCurrentWorld('day');
    }
  };

  const cycleCategory = () => {
    const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex].id);
  };

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') return artworks;
    return artworks.filter(piece => piece.category === activeCategory);
  }, [activeCategory]);

  const handlePlayPause = () => {
    if (!isMoving) {
      // Starting movement
      setShouldShuffle(true);
      setIsMoving(true);
      // Reset shuffle after initial animation
      setTimeout(() => {
        setShouldShuffle(false);
      }, 300);
    } else {
      // Immediate pause
      setIsMoving(false);
      setShouldShuffle(false);
    }
  };

  const currentCategoryInfo = categories.find(cat => cat.id === activeCategory);

  return (
    <div className={`min-h-screen ${getBackgroundStyle(currentWorld)} transition-all duration-1000 relative overflow-hidden`}>
      {/* Cursor Trail Effect */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
          left: cursorPos.x - 16,
          top: cursorPos.y - 16,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Welcome Message - All Screens */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            currentWorld === 'day'
              ? 'bg-white/40 text-gray-700'
              : 'bg-black/30 text-white/90'
          } backdrop-blur-md rounded-full px-6 py-2.5 shadow-lg border border-white/20`}
        >
          <p className="text-sm font-medium">
            <span className="hidden md:inline">Explore the bouncing worms portfolio • </span>
            <span className="text-xs opacity-75">Press SPACE to animate</span>
          </p>
        </motion.div>
      </div>

      {/* About Button */}
      <motion.button
        className={`fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-md shadow-lg border border-white/20 ${
          currentWorld === 'day' ? 'bg-white/40 text-gray-700' : 'bg-black/30 text-white/90'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAbout(true)}
      >
        <Info size={24} />
      </motion.button>

      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Artwork Layer */}
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {filteredArtworks.map((piece, index) => {
            const artworkIndex = artworks.findIndex(a => a.id === piece.id);
            const position = initialPositions[artworkIndex];
            const baseSize = piece.size === 'large' ? 120 : 80;

            return (
              <motion.div
                key={piece.id}
                className="absolute cursor-pointer transform-gpu"
                initial={{
                  x: position.x,
                  y: position.y,
                  opacity: 0,
                  rotate: position.rotate,
                  scale: 0.8
                }}
                animate={{
                  x: position.x,
                  y: position.y,
                  opacity: 1,
                  rotate: position.rotate,
                  scale: 1
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  mass: 1,
                  opacity: { duration: 0.5 }
                }}
                onClick={() => setSelectedPiece(piece)}
                onHoverStart={() => setHoveredPiece(piece.id)}
                onHoverEnd={() => setHoveredPiece(null)}
                style={{
                  width: '60px',
                  height: '60px',
                  zIndex: Math.floor(position.y)
                }}
                variants={shapeMotion}
                whileHover="hover"
                whileTap="tap"
              >
                {renderShape(piece, currentWorld, isMoving, shouldShuffle)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center gap-3">
          {/* Category Info Badge */}
          {currentCategoryInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-4 py-2 rounded-full backdrop-blur-md text-white text-sm font-medium bg-gradient-to-r ${currentCategoryInfo.color} shadow-lg`}
            >
              {currentCategoryInfo.name} ({filteredArtworks.length})
            </motion.div>
          )}

          <div className="flex flex-row gap-4 bg-black/30 backdrop-blur-md p-4 rounded-full border border-white/10 shadow-xl">
            {/* World Toggle */}
            <motion.button
              onClick={cycleWorld}
              className="p-4 rounded-full hover:bg-white/10 transition-all duration-300 relative group"
              style={{ minWidth: '60px', height: '60px' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentWorld === 'day' && <Sun size={32} className="text-yellow-400" />}
              {currentWorld === 'night' && <Moon size={32} className="text-blue-400" />}
              {currentWorld === 'dream' && <Cloud size={32} className="text-purple-400" />}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Theme: {currentWorld}
              </span>
            </motion.button>

            {/* Animation Toggle */}
            <motion.button
              onClick={handlePlayPause}
              className={`p-4 rounded-full transition-all duration-300 relative group ${
                isMoving ? 'bg-green-500/20 hover:bg-green-500/30' : 'hover:bg-white/10'
              }`}
              style={{ minWidth: '60px', height: '60px' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMoving ? (
                <Pause size={32} className="text-green-400" />
              ) : (
                <Play size={32} className="text-white" />
              )}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isMoving ? 'Pause' : 'Play'} (Space)
              </span>
            </motion.button>

            {/* Category Filter */}
            <motion.button
              onClick={cycleCategory}
              className="p-4 rounded-full hover:bg-white/10 transition-all duration-300 relative group"
              style={{ minWidth: '60px', height: '60px' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Filter size={32} className="text-white" />
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-5 h-5 flex items-center justify-center">
                  {currentCategoryInfo?.letter}
                </span>
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Filter Category
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Category Filter Sidebar */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-14 md:w-16 flex flex-col justify-center gap-3 md:gap-4
          bg-gradient-to-r from-black/20 to-transparent px-2 md:px-3 z-40"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center group
              transition-all duration-300 backdrop-blur-sm relative
              ${activeCategory === category.id
                ? `bg-gradient-to-br ${category.color} shadow-lg ring-2 ring-white/30`
                : 'bg-white/10 hover:bg-white/20 border border-white/10'}`}
            whileHover={{ scale: 1.15, x: 8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className={`text-white text-base md:text-lg font-bold ${
              activeCategory === category.id ? 'text-shadow' : ''
            }`}>
              {category.letter}
            </span>
            <motion.span
              className="absolute left-full ml-3 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg
                whitespace-nowrap backdrop-blur-md border border-white/20 shadow-xl"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: 'none' }}
            >
              {category.name}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 z-50 ${
              currentWorld === 'night' ? 'bg-blue-900/60' : 
              currentWorld === 'dream' ? 'bg-purple-900/60' : 
              'bg-black/60'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              className={`relative backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-white/10 ${
                currentWorld === 'night' ? 'bg-blue-950/80' : 
                currentWorld === 'dream' ? 'bg-purple-950/80' : 
                'bg-black/80'
              }`}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedPiece.path}
                  alt={selectedPiece.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                currentWorld === 'night' ? 'text-blue-200' : 
                currentWorld === 'dream' ? 'text-purple-200' : 
                'text-white'
              }`}>
                {selectedPiece.title}
              </h2>
              <p className="text-white/60">{selectedPiece.category}</p>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedPiece(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white/80" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              className={`relative backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border-2 ${
                currentWorld === 'night'
                  ? 'bg-blue-950/90 border-blue-400/30'
                  : currentWorld === 'dream'
                  ? 'bg-purple-950/90 border-purple-400/30'
                  : 'bg-slate-900/90 border-white/20'
              }`}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-6">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Bouncing Worms Portfolio
                </motion.h2>
                <motion.p
                  className="text-white/70 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  An interactive art experience
                </motion.p>
              </div>

              {/* Content */}
              <motion.div
                className="space-y-4 text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>
                  Welcome to a unique portfolio experience where each artwork is represented by an
                  animated worm character. Explore different worlds, filter by category, and immerse
                  yourself in creative visual storytelling.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <h3 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                      <Sparkles size={18} />
                      Features
                    </h3>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>• 3 unique worlds (day/night/dream)</li>
                      <li>• Category filtering</li>
                      <li>• Smooth animations</li>
                      <li>• Interactive worm characters</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <h3 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                      <Zap size={18} />
                      Controls
                    </h3>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>• Click worms to view artwork</li>
                      <li>• Press SPACE to animate</li>
                      <li>• Press ESC to close modals</li>
                      <li>• Hover for previews</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 pt-4 border-t border-white/10">
                  Built with Next.js, React, Framer Motion, and creative energy.
                </p>
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={() => setShowAbout(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white/60 group-hover:text-white/90" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedPortfolio;

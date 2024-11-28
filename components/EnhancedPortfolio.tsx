      'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Cloud, Star, Zap, CircleOff, Sparkles, Eye } from 'lucide-react';

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
];

const EnhancedPortfolio = () => {
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
  const [floatingMode, setFloatingMode] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const backgrounds = {
    day: 'bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]',
    night: 'bg-gradient-to-b from-[#1e293b] to-[#0f172a]',
    dream: 'bg-gradient-to-b from-[#fdf4ff] to-[#fae8ff]'
  };

  const getRandomPosition = () => ({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth * 0.8 : 1000),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 1000),
  });

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'w-32 h-32';
      case 'medium': return 'w-48 h-48';
      case 'large': return 'w-64 h-64';
      default: return 'w-48 h-48';
    }
  };

  return (
    <div className={\`min-h-screen \${backgrounds[currentWorld]} transition-colors duration-1000\`}>
      {/* Floating Artwork Layer */}
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence>
          {artworks
            .filter(art => !activeCategory || art.category === activeCategory)
            .map((artwork) => (
              <motion.div
                key={artwork.id}
                className={\`absolute cursor-pointer \${getSizeClass(artwork.size)}\`}
                initial={getRandomPosition()}
                animate={floatingMode ? {
                  x: [
                    getRandomPosition().x,
                    getRandomPosition().x,
                    getRandomPosition().x
                  ],
                  y: [
                    getRandomPosition().y,
                    getRandomPosition().y,
                    getRandomPosition().y
                  ],
                  rotate: [0, 5, -5, 0],
                } : {
                  x: getRandomPosition().x,
                  y: getRandomPosition().y,
                  rotate: 0,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 50,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
                }}
                onClick={() => setSelectedPiece(artwork)}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={artwork.path}
                    alt={artwork.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                      rounded-2xl transition-opacity duration-300 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <h3 className="text-white text-xl font-bold mb-2">{artwork.title}</h3>
                      <span className="text-white/80 text-sm capitalize">{artwork.category}</span>
                    </div>
                  </motion.div>
                  {showSparkles && (
                    <motion.div
                      className="absolute -inset-2 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                          animate={{
                            x: [0, Math.random() * 40 - 20],
                            y: [0, Math.random() * 40 - 20],
                            scale: [1, 0],
                            opacity: [1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          style={{
                            left: \`\${Math.random() * 100}%\`,
                            top: \`\${Math.random() * 100}%\`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* World Selector */}
      <motion.div 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg 
          rounded-full p-2 z-50 border border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex space-x-4">
          {[
            { id: 'day' as const, icon: Sun, label: 'Day World' },
            { id: 'night' as const, icon: Moon, label: 'Night World' },
            { id: 'dream' as const, icon: Star, label: 'Dream World' }
          ].map((world) => (
            <motion.button
              key={world.id}
              className={\`w-12 h-12 rounded-full flex items-center justify-center
                \${currentWorld === world.id ? 
                  'bg-white text-black' : 
                  'text-white hover:bg-white/20'}\`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentWorld(world.id)}
            >
              <world.icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Interactive Controls */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 
          backdrop-blur-lg rounded-full p-4 z-50 border border-white/20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex space-x-6">
          <motion.button
            className={\`w-16 h-16 \${floatingMode ? 'bg-pink-500' : 'bg-pink-400/50'} 
              rounded-full flex items-center justify-center\`}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFloatingMode(!floatingMode)}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.button>
          <motion.button
            className={\`w-16 h-16 \${showSparkles ? 'bg-yellow-500' : 'bg-yellow-400/50'} 
              rounded-full flex items-center justify-center\`}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSparkles(!showSparkles)}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.button>
          <motion.button
            className={\`w-16 h-16 \${activeCategory ? 'bg-blue-500' : 'bg-blue-400/50'} 
              rounded-full flex items-center justify-center\`}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveCategory(null)}
          >
            <Eye className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        className="fixed top-24 left-1/2 transform -translate-x-1/2 
          bg-white/10 backdrop-blur-lg rounded-full p-2 z-40 border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex space-x-2">
          {['portrait', 'character', 'nature', 'object', 'design'].map((category) => (
            <motion.button
              key={category}
              className={\`px-4 py-2 rounded-full text-sm 
                \${activeCategory === category ? 
                  'bg-white text-black' : 
                  'text-white hover:bg-white/20'}\`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-8 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-4xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square w-full mb-6">
                <Image
                  src={selectedPiece.path}
                  alt={selectedPiece.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">{selectedPiece.title}</h2>
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm capitalize">
                  {selectedPiece.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm capitalize">
                  {selectedPiece.size}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This stunning piece showcases the artist's unique style and creative vision. 
                The composition draws viewers in while the technical execution demonstrates 
                masterful control of the medium.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedPortfolio;

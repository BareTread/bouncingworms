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

const EnhancedPortfolio: React.FC = () => {
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
  const [floatingMode, setFloatingMode] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredPiece, setHoveredPiece] = useState<ArtPiece | null>(null);

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
    <div className={`min-h-screen ${backgrounds[currentWorld]} transition-colors duration-1000`}>
      {/* Floating Artwork Layer */}
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence>
          {artworks
            .filter(art => !activeCategory || art.category === activeCategory)
            .map((artwork) => (
              <motion.div
                key={artwork.id}
                className={`absolute cursor-pointer ${getSizeClass(artwork.size)}`}
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
                onHoverStart={() => setHoveredPiece(artwork)}
                onHoverEnd={() => setHoveredPiece(null)}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={artwork.path}
                    alt={artwork.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg transition-all duration-300 group-hover:brightness-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={artwork.id <= 4}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPiece?.id === artwork.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center p-2">
                      <h3 className="text-white font-bold text-lg mb-1">{artwork.title}</h3>
                      <span className="text-white/80 text-sm capitalize">{artwork.category}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Preview Modal for Selected Piece */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-4xl w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square w-full mb-4">
                <Image
                  src={selectedPiece.path}
                  alt={selectedPiece.title}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPiece.title}</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                  {selectedPiece.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                  {selectedPiece.size}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EnhancedPortfolio;

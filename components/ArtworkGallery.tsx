'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Star, Filter, X } from 'lucide-react';

type World = 'day' | 'night' | 'dream';
type Category = 'all' | 'portrait' | 'character' | 'nature' | 'object' | 'design';

interface Artwork {
  id: number;
  title: string;
  path: string;
  category: Category;
}

interface WorldTheme {
  bg: string;
  accent: string;
  text: string;
}

type Worlds = Record<World, WorldTheme>;

// Art pieces data
const artworks: Artwork[] = [
  { id: 1, title: 'Self Portrait', path: '/images/selfportrait.jpg', category: 'portrait' },
  { id: 2, title: 'Blue Character', path: '/images/bchar.jpg', category: 'character' },
  { id: 3, title: 'Green Character', path: '/images/gchar.jpg', category: 'character' },
  { id: 4, title: 'Red Character', path: '/images/rchar.jpg', category: 'character' },
  { id: 5, title: 'Butterfly Study', path: '/images/butterfly.jpg', category: 'nature' },
  { id: 6, title: 'Worm Character', path: '/images/worm.jpg', category: 'character' },
  { id: 7, title: 'Typewriter', path: '/images/typerwiter.jpg', category: 'object' },
  { id: 8, title: 'Tattoo Design', path: '/images/tattoo.jpg', category: 'design' },
];

const ArtworkGallery = () => {
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [selectedPiece, setSelectedPiece] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<Category>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const worlds: Worlds = {
    day: {
      bg: 'bg-gradient-to-b from-[#F9D5E5] to-[#AED9E0]',
      accent: 'bg-[#B8A9C9]',
      text: 'text-[#2B2D42]'
    },
    night: {
      bg: 'bg-gradient-to-b from-[#2B2D42] to-[#8D99AE]',
      accent: 'bg-[#EF233C]',
      text: 'text-white'
    },
    dream: {
      bg: 'bg-gradient-to-b from-[#FFB4A2] to-[#B5838D]',
      accent: 'bg-[#E5989B]',
      text: 'text-[#6D6875]'
    }
  };

  const categories: Category[] = ['all', 'portrait', 'character', 'nature', 'object', 'design'];

  const filteredArtworks = artworks.filter(art => 
    filter === 'all' ? true : art.category === filter
  );

  return (
    <div className={`min-h-screen ${worlds[currentWorld].bg} transition-colors duration-1000`}>
      {/* World Selector */}
      <motion.div 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full p-2 z-50"
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
              aria-label={world.label}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                ${currentWorld === world.id ? 'bg-white text-black' : 'text-white'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentWorld(world.id)}
            >
              <world.icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Filter Button */}
      <motion.button
        className="fixed top-6 right-6 bg-white/10 backdrop-blur-lg rounded-full p-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <Filter className={worlds[currentWorld].text} />
      </motion.button>

      {/* Filter Menu */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="fixed top-20 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 z-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  filter === cat ? 'bg-black/10' : ''
                }`}
                whileHover={{ x: 5 }}
                onClick={() => {
                  setFilter(cat);
                  setIsFilterOpen(false);
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Artwork Grid */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="relative aspect-square"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden cursor-pointer relative group"
                whileHover={{ scale: 1.05, rotate: [-1, 1] }}
                onClick={() => setSelectedPiece(artwork)}
              >
                <Image
                  src={artwork.path}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  <div className="flex items-center justify-center h-full">
                    <h3 className="text-white text-xl font-bold">{artwork.title}</h3>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artwork Detail Modal */}
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
              className="bg-white rounded-2xl p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPiece.title}</h2>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                    {selectedPiece.category}
                  </span>
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setSelectedPiece(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtworkGallery;

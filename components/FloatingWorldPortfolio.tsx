'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Cloud, Star, Zap, CircleOff } from 'lucide-react';

type World = 'day' | 'night' | 'dream';
type Backgrounds = Record<World, string>;

const FloatingWorldPortfolio = () => {
  const [currentWorld, setCurrentWorld] = useState<World>('day');
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  const backgrounds: Backgrounds = {
    day: 'bg-gradient-to-b from-blue-400 to-purple-400',
    night: 'bg-gradient-to-b from-indigo-900 to-purple-900',
    dream: 'bg-gradient-to-b from-pink-400 to-purple-600'
  };

  return (
    <div className={`min-h-screen ${backgrounds[currentWorld]} transition-colors duration-1000`}>
      {/* Floating Characters Layer */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Floating Elements */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: 1,
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            whileHover={{ scale: 1.5, zIndex: 50 }}
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center
              ${index % 3 === 0 ? 'bg-pink-500' : 
                index % 3 === 1 ? 'bg-green-500' : 'bg-blue-500'}`}>
              <motion.div
                className="w-16 h-16 bg-white rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* World Selector */}
      <motion.div 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full p-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex space-x-4">
          {[
            { id: 'day' as const, icon: Sun },
            { id: 'night' as const, icon: Moon },
            { id: 'dream' as const, icon: Star }
          ].map((world) => (
            <motion.button
              key={world.id}
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

      {/* Interactive Controls */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex space-x-6">
          <motion.button
            className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.button>
          <motion.button
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Cloud className="w-8 h-8 text-white" />
          </motion.button>
          <motion.button
            className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <CircleOff className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Artwork Detail View */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-black mb-2">Artwork Title</h2>
              <p className="text-gray-600">
                Interactive artwork description would go here.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingWorldPortfolio;

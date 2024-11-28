import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Star, Zap, Cloud, CircleOff } from 'lucide-react';

// Import all images
const artworks = [
  { id: 1, src: '/images/butterfly.jpg', title: 'Butterfly', category: 'illustration' },
  { id: 2, src: '/images/bchar.jpg', title: 'Character Study B', category: 'character' },
  { id: 3, src: '/images/gchar.jpg', title: 'Character Study G', category: 'character' },
  { id: 4, src: '/images/rchar.jpg', title: 'Character Study R', category: 'character' },
  { id: 5, src: '/images/selfportrait.jpg', title: 'Self Portrait', category: 'portrait' },
  { id: 6, src: '/images/tattoo.jpg', title: 'Tattoo Design', category: 'design' },
  { id: 7, src: '/images/typerwiter.jpg', title: 'Typewriter Study', category: 'illustration' },
  { id: 8, src: '/images/worm.jpg', title: 'Worm Character', category: 'character' },
];

const ArtGallery = () => {
  const [currentWorld, setCurrentWorld] = useState('day');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [hoveredPiece, setHoveredPiece] = useState(null);

  const backgrounds = {
    day: 'bg-gradient-to-b from-blue-400 to-purple-400',
    night: 'bg-gradient-to-b from-indigo-900 to-purple-900',
    dream: 'bg-gradient-to-b from-pink-400 to-purple-600'
  };

  return (
    <div className={`min-h-screen ${backgrounds[currentWorld]} transition-colors duration-1000`}>
      {/* Floating Artwork Layer */}
      <div className="fixed inset-0 overflow-hidden">
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            className="absolute cursor-pointer"
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
              rotate: [0, 10, -10, 0],
              transition: {
                duration: 30,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
            onClick={() => setSelectedPiece(artwork)}
            onHoverStart={() => setHoveredPiece(artwork)}
            onHoverEnd={() => setHoveredPiece(null)}
          >
            <motion.div 
              className="relative"
              animate={{
                boxShadow: hoveredPiece?.id === artwork.id 
                  ? [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 40px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.5)"
                    ]
                  : "0 0 20px rgba(255,255,255,0.2)"
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <img 
                src={artwork.src} 
                alt={artwork.title}
                className="w-48 h-48 object-cover rounded-lg"
                style={{ 
                  filter: currentWorld === 'night' ? 'brightness(0.8) saturate(1.2)' : 
                         currentWorld === 'dream' ? 'hue-rotate(30deg) brightness(1.1)' : 
                         'none'
                }}
              />
              {hoveredPiece?.id === artwork.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg
                            backdrop-blur-sm text-center"
                >
                  {artwork.title}
                </motion.div>
              )}
            </motion.div>
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
            { id: 'day', icon: Sun, label: 'Day World' },
            { id: 'night', icon: Moon, label: 'Night World' },
            { id: 'dream', icon: Star, label: 'Dream World' }
          ].map((world) => (
            <motion.button
              key={world.id}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                ${currentWorld === world.id ? 'bg-white text-black' : 'text-white'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentWorld(world.id)}
              title={world.label}
            >
              <world.icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Artwork Detail View */}
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
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-4xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedPiece.src}
                alt={selectedPiece.title}
                className="w-full h-auto rounded-lg mb-4 object-contain max-h-[70vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.h2 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedPiece.title}
              </motion.h2>
              <motion.div
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm">
                  {selectedPiece.category}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtGallery;

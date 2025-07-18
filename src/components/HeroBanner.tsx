
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Signal } from 'lucide-react';
import MatrixText from './MatrixText';

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Subtle Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(75)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, j) => (
              <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.15) }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Matrix Text Header with smooth animation */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <MatrixText 
            text="WELCOME, PLEB"
            className="text-2xl md:text-3xl tracking-wider mb-4 min-h-0 flex"
            initialDelay={1000}
            letterInterval={100}
            letterAnimationDuration={300}
            repeatInterval={0}
          />
        </motion.div>

        {/* Main Title with Matrix effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          className="mb-8"
        >
          <div className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <MatrixText 
              text="TAKE CONTROL."
              className="block text-green-400 mb-2 min-h-0 flex justify-center"
              initialDelay={3000}
              letterInterval={80}
              letterAnimationDuration={300}
              repeatInterval={0}
            />
            <MatrixText 
              text="UNPLUG GRACEFULLY."
              className="block text-white min-h-0 flex justify-center"
              initialDelay={5000}
              letterInterval={80}
              letterAnimationDuration={300}
              repeatInterval={0}
            />
          </div>
        </motion.div>

        {/* Tech Badge */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 6 }}
        >
          <div className="inline-flex items-center gap-3 matrix-terminal px-6 py-3">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-green-400 font-mono text-sm font-bold">
              ⚡ pwrd by Lightning & Nostr
            </span>
            <Signal className="h-5 w-5 text-green-400" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;

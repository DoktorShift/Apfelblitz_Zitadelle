
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FestivalPaymentModal from './FestivalPaymentModal';

const MatrixAppleChoice = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedApple, setSelectedApple] = useState('');
  const [hoveredApple, setHoveredApple] = useState<string | null>(null);

  const apples = [
    {
      id: 'red',
      name: 'RED_APPLE',
      description: 'PASSION_PATH',
      emoji: '🍎',
      quote: '"Sweet, crisp, and awakening - a taste of pure energy"',
      effect: 'ENHANCES_FOCUS',
      color: 'text-red-400',
      borderColor: 'border-red-500/50',
      bgGradient: 'from-red-900/30 to-black',
      glowColor: 'shadow-red-500/25'
    },
    {
      id: 'green',
      name: 'GREEN_APPLE',
      description: 'WISDOM_PATH',
      emoji: '🍏',
      quote: '"Tart, refreshing, and enlightening - nature\'s perfect balance"',
      effect: 'AMPLIFIES_CLARITY',
      color: 'text-green-400',
      borderColor: 'border-green-500/50',
      bgGradient: 'from-green-900/30 to-black',
      glowColor: 'shadow-green-500/25'
    }
  ];

  const handleChoice = (apple: typeof apples[0]) => {
    setSelectedApple(apple.name);
    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedApple('');
  };

  return (
    <div className="w-full max-w-6xl">
      {/* The Choice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {apples.map((apple, index) => (
          <motion.div
            key={apple.id}
            className="group relative"
            onHoverStart={() => setHoveredApple(apple.id)}
            onHoverEnd={() => setHoveredApple(null)}
            whileHover={{ scale: 1.02, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className={`
              matrix-terminal ${apple.borderColor} ${apple.glowColor}
              bg-gradient-to-br ${apple.bgGradient} p-8 relative overflow-hidden cursor-pointer
              hover:shadow-2xl transition-all duration-500
            `}>
              {/* Matrix Code Rain Effect */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute text-xs font-mono ${apple.color}`}
                    animate={{
                      y: [0, 400],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                {/* Apple Symbol */}
                <motion.div 
                  className="text-center mb-8"
                  animate={hoveredApple === apple.id ? { 
                    scale: [1, 1.2, 1], 
                    rotate: [0, 5, -5, 0] 
                  } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-8xl mb-4">{apple.emoji}</div>
                  <h3 className={`text-3xl font-black ${apple.color} font-mono glitch-text`}>
                    {apple.name}
                  </h3>
                  <p className={`${apple.color}/70 font-mono text-lg mt-2`}>
                    {apple.description}
                  </p>
                </motion.div>

                {/* Quote */}
                <div className="mb-8">
                  <div className={`matrix-line ${apple.borderColor}/30 p-4`}>
                    <p className={`${apple.color}/80 font-mono text-sm italic text-center leading-relaxed`}>
                      {apple.quote}
                    </p>
                  </div>
                  <div className={`text-center mt-3 ${apple.color}/60 font-mono text-xs`}>
                    EFFECT: {apple.effect}
                  </div>
                </div>

                {/* Choice Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <Button 
                    onClick={() => handleChoice(apple)}
                    className={`
                      bg-black border-2 ${apple.borderColor} ${apple.color} 
                      hover:bg-gradient-to-r hover:${apple.bgGradient}
                      font-mono font-bold px-12 py-6 text-lg
                      transition-all duration-300 relative overflow-hidden
                    `}
                    size="lg"
                  >
                    {/* Button Glitch Effect */}
                    <motion.div
                      className={`absolute inset-0 ${apple.color.replace('text-', 'bg-')}/10`}
                      animate={hoveredApple === apple.id ? {
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    
                    <Eye className="h-5 w-5 mr-3 animate-pulse relative z-10" />
                    <span className="relative z-10">CHOOSE_APPLE</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      <FestivalPaymentModal 
        isOpen={showPaymentModal} 
        onClose={closeModal}
        selectedApple={selectedApple}
      />
    </div>
  );
};

export default MatrixAppleChoice;

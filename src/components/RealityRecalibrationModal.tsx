import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface RealityRecalibrationModalProps {
  isOpen: boolean;
  onComplete: () => void;
  targetLanguage: string;
}

const RealityRecalibrationModal: React.FC<RealityRecalibrationModalProps> = ({
  isOpen,
  onComplete,
  targetLanguage
}) => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState(0);
  
  const recalibrationMessages = [
    "REALITY_MATRIX_DETECTED...",
    "DECONSTRUCTING_CURRENT_PARADIGM...",
    "LOADING_NEW_REALITY_PROTOCOLS...",
    "SYNCHRONIZING_PERCEPTION_LAYER...",
    "CALIBRATING_LINGUISTIC_INTERFACE...",
    "REALITY_RECALIBRATION_COMPLETE"
  ];

  useEffect(() => {
    if (!isOpen) return;

    const phases = [
      { delay: 0, duration: 400 },
      { delay: 400, duration: 500 },
      { delay: 900, duration: 600 },
      { delay: 1500, duration: 500 },
      { delay: 2000, duration: 400 },
      { delay: 2400, duration: 600 }
    ];

    phases.forEach((phaseConfig, index) => {
      setTimeout(() => {
        setPhase(index);
      }, phaseConfig.delay);
    });

    // Complete the recalibration
    setTimeout(() => {
      onComplete();
    }, 3200);

  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Reduced Matrix Rain for Mobile Performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(window.innerWidth < 768 ? 50 : 100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs select-none pointer-events-none"
              animate={{
                y: [0, window.innerHeight + 100],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
              }}
            >
              {Array.from({ length: Math.floor(Math.random() * 8) + 4 }, (_, j) => (
                <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.05) }}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-sm mx-auto">
          {/* Main Recalibration Message */}
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.1, 0.9, 1.05, 1],
              rotateX: [0, 5, -5, 2, 0],
            }}
            transition={{ duration: 0.5, repeat: 6 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-black text-green-400 font-mono mb-4 glitch-text leading-tight">
              REALITY_RECALIBRATION
            </h1>
            <div className="text-xs sm:text-sm md:text-xl lg:text-2xl text-green-300 font-mono">
              INITIATED_FOR: {targetLanguage === 'de' ? 'DEUTSCH' : 'ENGLISH'}
            </div>
          </motion.div>

          {/* Progress Messages */}
          <div className="space-y-3 min-h-[60px] sm:min-h-[80px] md:min-h-[120px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm md:text-lg lg:text-xl text-cyan-400 font-mono font-bold px-2 leading-tight"
              >
                {recalibrationMessages[phase]}
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="w-40 sm:w-48 md:w-64 h-1 sm:h-1.5 md:h-2 bg-green-900/30 rounded-full mx-auto overflow-hidden border border-green-500/30">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((phase + 1) / recalibrationMessages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Binary Code Stream */}
            <motion.div
              className="text-green-400/50 font-mono text-xs tracking-wider px-2 break-all"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              {Array.from({ length: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 30 : 40 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </motion.div>
          </div>

          {/* Warning Message */}
          <motion.div
            className="mt-4 sm:mt-6 md:mt-8 text-yellow-400 font-mono text-xs sm:text-sm px-2 leading-tight"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⚠️ DO_NOT_DISCONNECT_DURING_RECALIBRATION ⚠️
          </motion.div>
        </div>

        {/* Subtle Screen Distortion Effect - Only on larger screens */}
        {window.innerWidth >= 768 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "linear-gradient(0deg, transparent 0%, rgba(0,255,0,0.05) 50%, transparent 100%)",
                "linear-gradient(180deg, transparent 0%, rgba(0,255,0,0.05) 50%, transparent 100%)",
              ],
            }}
            transition={{ duration: 0.2, repeat: 15 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RealityRecalibrationModal;
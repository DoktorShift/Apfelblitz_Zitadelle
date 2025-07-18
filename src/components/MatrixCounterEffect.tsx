
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixCounterEffectProps {
  value: number | string;
  className?: string;
  prefix?: string;
  suffix?: string;
  animationDuration?: number;
  triggerDelay?: number;
  repeatInterval?: number;
}

const MatrixCounterEffect = ({ 
  value, 
  className, 
  prefix = '', 
  suffix = '',
  animationDuration = 400,
  triggerDelay = 0,
  repeatInterval = 0
}: MatrixCounterEffectProps) => {
  const text = `${prefix}${value}${suffix}`;
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    })),
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return;

      requestAnimationFrame(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          if (!newLetters[index].isSpace && !/[^\w]/.test(newLetters[index].char)) {
            newLetters[index] = {
              ...newLetters[index],
              char: getRandomChar(),
              isMatrix: true,
            };
          }
          return newLetters;
        });

        setTimeout(() => {
          setLetters((prev) => {
            const newLetters = [...prev];
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            };
            return newLetters;
          });
        }, animationDuration / 4);
      });
    },
    [getRandomChar, text, animationDuration],
  );

  const startAnimation = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, animationDuration / text.length);
    };

    setTimeout(animate, triggerDelay);
  }, [animateLetter, text, isAnimating, animationDuration, triggerDelay]);

  useEffect(() => {
    setLetters(
      text.split("").map((char) => ({
        char,
        isMatrix: false,
        isSpace: char === " ",
      }))
    );
    startAnimation();
    
    // Set up repeat interval if specified
    if (repeatInterval > 0) {
      const interval = setInterval(startAnimation, repeatInterval);
      return () => clearInterval(interval);
    }
  }, [value, text, startAnimation, repeatInterval]);

  const motionVariants = useMemo(
    () => ({
      matrix: {
        color: "#00ff00",
        textShadow: "0 2px 4px rgba(0, 255, 0, 0.5)",
      },
      normal: {
        color: "currentColor",
        textShadow: "none",
      },
    }),
    [],
  );

  return (
    <div className={cn("flex items-center", className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${index}-${letter.char}`}
          className="font-mono inline-block"
          initial="normal"
          animate={letter.isMatrix ? "matrix" : "normal"}
          variants={motionVariants}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
          }}
        >
          {letter.isSpace ? "\u00A0" : letter.char}
        </motion.span>
      ))}
    </div>
  );
};

export default MatrixCounterEffect;

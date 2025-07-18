
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
  disabled?: boolean;
}

const MatrixCounterEffect = ({ 
  value, 
  className, 
  prefix = '', 
  suffix = '',
  disabled = false
}: MatrixCounterEffectProps) => {
  const text = `${prefix}${value}${suffix}`;
  const [previousValue, setPreviousValue] = useState(text);
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
          if (!newLetters[index].isSpace) {
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
        }, 150);
      });
    },
    [getRandomChar, text],
  );

  const startAnimation = useCallback(() => {
    if (isAnimating || disabled) return;

    setIsAnimating(true);
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, 50);
    };

    animate();
  }, [animateLetter, text, isAnimating, disabled]);

  useEffect(() => {
    // Only animate if the value actually changed
    if (text !== previousValue && !disabled) {
      setPreviousValue(text);
      
      // Update letters array
      setLetters(
        text.split("").map((char) => ({
          char,
          isMatrix: false,
          isSpace: char === " ",
        }))
      );
      
      // Start animation
      startAnimation();
    } else if (disabled) {
      // If disabled, just update letters without animation
      setLetters(
        text.split("").map((char) => ({
          char,
          isMatrix: false,
          isSpace: char === " ",
        }))
      );
    }
  }, [value, text, previousValue, startAnimation, disabled]);

  const motionVariants = useMemo(
    () => ({
      matrix: {
        color: "#00ff00",
        textShadow: "0 1px 2px rgba(0, 255, 0, 0.3)",
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
            duration: 0.1,
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

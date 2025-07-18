
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';
import MatrixCounterEffect from './MatrixCounterEffect';

const MatrixTransactionCounter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setCount(847291);
    }, 1000);

    // Increment counter periodically
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="matrix-terminal border-green-500/30 bg-gradient-to-br from-green-900/10 to-black p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Activity className="h-6 w-6 text-green-400" />
        </motion.div>
        <h3 className="text-lg font-bold text-green-400 font-mono">
          TRANSACTION_COUNT
        </h3>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          {loading ? (
            <div className="text-4xl font-mono text-green-400">
              <MatrixCounterEffect 
                value="LOADING..." 
                className="text-4xl"
                animationDuration={400}
                triggerDelay={0}
                repeatInterval={0}
              />
            </div>
          ) : (
            <MatrixCounterEffect 
              value={count.toLocaleString()} 
              className="text-4xl font-bold text-green-400"
              animationDuration={300}
              triggerDelay={0}
              repeatInterval={0}
            />
          )}
          
          <p className="text-green-300/70 text-sm font-mono mt-2">
            TOTAL_PROCESSED
          </p>
        </div>

        <div className="bg-green-900/20 rounded p-3 border border-green-500/20">
          <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
            <TrendingUp className="h-4 w-4" />
            <span>+{Math.floor(Math.random() * 10) + 1} PER_MINUTE</span>
          </div>
        </div>

        <div className="matrix-line border-green-500/20 p-2">
          <div className="text-center text-green-400/60 text-xs font-mono">
            REAL_TIME_LIGHTNING_NETWORK
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixTransactionCounter;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Bitcoin, Zap } from 'lucide-react';
import MatrixCounterEffect from './MatrixCounterEffect';

const MatrixWalletBalance = () => {
  const [balances, setBalances] = useState({
    btc: 0,
    sats: 0,
    lightning: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setBalances({
        btc: 2.34567890,
        sats: 234567890,
        lightning: 450000
      });
    }, 1200);

    // Update balances periodically
    const interval = setInterval(() => {
      setBalances(prev => ({
        btc: prev.btc + (Math.random() * 0.001),
        sats: prev.sats + Math.floor(Math.random() * 1000),
        lightning: prev.lightning + Math.floor(Math.random() * 5000)
      }));
    }, 6000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="matrix-terminal border-green-500/30 bg-gradient-to-br from-green-900/10 to-black p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="h-6 w-6 text-green-400" />
        <h3 className="text-lg font-bold text-green-400 font-mono">
          WALLET_BALANCE
        </h3>
      </div>

      <div className="space-y-6">
        {/* Bitcoin Balance */}
        <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bitcoin className="h-5 w-5 text-orange-400" />
            <span className="text-orange-400 font-mono font-bold">BTC</span>
          </div>
          {loading ? (
            <MatrixCounterEffect 
              value="SYNC..." 
              className="text-2xl text-orange-400"
              duration={3000}
              delay={2}
            />
          ) : (
            <MatrixCounterEffect 
              value={balances.btc.toFixed(8)} 
              className="text-2xl font-bold text-orange-400"
              duration={3000}
              delay={200}
            />
          )}
        </div>

        {/* Satoshis Balance */}
        <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-mono font-bold text-sm">SATS</span>
          </div>
          {loading ? (
            <MatrixCounterEffect 
              value="SYNC..." 
              className="text-xl text-yellow-400"
              duration={1000}
              delay={0}
            />
          ) : (
            <MatrixCounterEffect 
              value={balances.sats.toLocaleString()} 
              className="text-xl font-bold text-yellow-400"
              duration={500}
              delay={200}
            />
          )}
        </div>

        {/* Lightning Balance */}
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-mono font-bold">LIGHTNING</span>
          </div>
          {loading ? (
            <MatrixCounterEffect 
              value="SYNC..." 
              className="text-xl text-blue-400"
              duration={1000}
              delay={0}
            />
          ) : (
            <MatrixCounterEffect 
              value={balances.lightning.toLocaleString()} 
              suffix=" sats"
              className="text-xl font-bold text-blue-400"
              duration={500}
              delay={300}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixWalletBalance;

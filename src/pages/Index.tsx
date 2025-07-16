
import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import MatrixTransactionCounter from '@/components/MatrixTransactionCounter';
import MatrixTransactionList from '@/components/MatrixTransactionList';
import MatrixWalletBalance from '@/components/MatrixWalletBalance';
import MatrixAppleChoice from '@/components/MatrixAppleChoice';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 overflow-x-hidden relative">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="matrix-rain"></div>
      </div>

      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="scanlines"></div>
      </div>

      {/* Hero Section */}
      <HeroBanner />

      {/* Main Content with Smooth Flow */}
      <div className="relative z-10">
        
        {/* Apple Choice Section - Main Feature */}
        <motion.section 
          className="px-4 md:px-6 py-20 lg:py-32 bg-gradient-to-b from-black via-black/95 to-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-green-400">
                THE CHOICE IS YOURS
              </h2>
              <p className="text-green-300/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Both paths lead to enlightenment. Both apples are perfect. 
                The real choice isn't which one to take... but how much value you give.
              </p>
            </motion.div>
            <MatrixAppleChoice />
          </div>
        </motion.section>

        {/* Live Data Dashboard */}
        <motion.section 
          className="px-4 md:px-6 py-20 bg-gradient-to-b from-black via-green-950/5 to-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
                LIVE NETWORK STATUS
              </h2>
              <p className="text-green-300/70 text-lg max-w-2xl mx-auto">
                Real-time data flowing through the Lightning Network
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Transaction Counter */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <MatrixTransactionCounter />
              </motion.div>

              {/* Wallet Balances */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <MatrixWalletBalance />
              </motion.div>
            </div>

            {/* Transaction Feed */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <MatrixTransactionList />
            </motion.div>
          </div>
        </motion.section>

        {/* Philosophical Closing - The Twist */}
        <motion.section 
          className="px-4 md:px-6 py-24 lg:py-32 bg-gradient-to-t from-black via-green-950/10 to-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-green-400 mb-8">
                SOUND MONEY, SOUND CHOICES
              </h3>
              
              <div className="matrix-terminal p-8 md:p-12 mb-12">
                <motion.p 
                  className="text-green-300 text-lg md:text-xl leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  In a world of infinite possibilities, you chose to be here. 
                  You chose to pay with Bitcoin. You chose to support value-for-value.
                </motion.p>
                
                <motion.p 
                  className="text-yellow-400 text-xl md:text-2xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  The real choice was never about the apples...
                </motion.p>
                
                <motion.p 
                  className="text-blue-400 text-xl md:text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  It was about choosing sound money.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4 text-sm text-green-400 font-mono"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <span className="matrix-pill">🍎 ORGANIC APPLES</span>
                <span className="matrix-pill">⚡ LIGHTNING NETWORK</span>
                <span className="matrix-pill">₿ SOUND MONEY</span>
                <span className="matrix-pill">🌟 VALUE FOR VALUE</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;

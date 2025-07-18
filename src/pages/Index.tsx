
import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import NetworkStatsSection from '@/components/NetworkStatsSection';
import MatrixAppleChoice from '@/components/MatrixAppleChoice';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-x-hidden relative">
      {/* Language Switcher */}
      <LanguageSwitcher />

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
                {t('theChoiceIsYours')}
              </h2>
              <p className="text-green-300/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                {t('choiceDescription')}
              </p>
            </motion.div>
            <MatrixAppleChoice />
          </div>
        </motion.section>

        {/* Live Network Stats - Redesigned */}
        <NetworkStatsSection />

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
                {t('soundMoneySoundChoices')}
              </h3>
              
              <div className="matrix-terminal p-8 md:p-12 mb-12">
                <motion.p 
                  className="text-green-300 text-lg md:text-xl leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {t('infinitePossibilities')}
                </motion.p>
                
                <motion.p 
                  className="text-yellow-400 text-xl md:text-2xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {t('realChoice')}
                </motion.p>
                
                <motion.p 
                  className="text-blue-400 text-xl md:text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {t('aboutSoundMoney')}
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4 text-sm text-green-400 font-mono"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <span className="matrix-pill">{t('organicApples')}</span>
                <span className="matrix-pill">{t('lightningNetwork')}</span>
                <span className="matrix-pill">{t('soundMoney')}</span>
                <span className="matrix-pill">{t('valueForValue')}</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;

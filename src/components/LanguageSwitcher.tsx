import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RealityRecalibrationModal from './RealityRecalibrationModal';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [showRecalibration, setShowRecalibration] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('');

  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage === i18n.language) return;
    
    setTargetLanguage(newLanguage);
    setShowRecalibration(true);
  };

  const completeRecalibration = () => {
    i18n.changeLanguage(targetLanguage);
    setShowRecalibration(false);
    setTargetLanguage('');
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <motion.div
          className="matrix-terminal p-3 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-mono text-xs font-bold">
                {t('changeReality')}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleLanguageChange('en')}
                variant="ghost"
                size="sm"
                className={`
                  font-mono text-xs px-3 py-1 h-auto transition-all duration-300
                  ${i18n.language === 'en' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'text-green-400/70 hover:text-green-400 hover:bg-green-900/20'
                  }
                `}
              >
                EN
              </Button>
              
              <Button
                onClick={() => handleLanguageChange('de')}
                variant="ghost"
                size="sm"
                className={`
                  font-mono text-xs px-3 py-1 h-auto transition-all duration-300
                  ${i18n.language === 'de' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'text-green-400/70 hover:text-green-400 hover:bg-green-900/20'
                  }
                `}
              >
                DE
              </Button>
            </div>
          </div>
          
          {/* Reality Status Indicator */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-green-900/30">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-400/70 font-mono text-xs">
              REALITY: {i18n.language.toUpperCase()}
            </span>
          </div>
        </motion.div>
      </div>

      <RealityRecalibrationModal
        isOpen={showRecalibration}
        onComplete={completeRecalibration}
        targetLanguage={targetLanguage}
      />
    </>
  );
};

export default LanguageSwitcher;
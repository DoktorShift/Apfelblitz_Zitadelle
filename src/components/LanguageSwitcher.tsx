import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Zap, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RealityRecalibrationModal from './RealityRecalibrationModal';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [showRecalibration, setShowRecalibration] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage === i18n.language) return;
    
    setTargetLanguage(newLanguage);
    setShowRecalibration(true);
    setIsExpanded(false);
  };

  const completeRecalibration = () => {
    i18n.changeLanguage(targetLanguage);
    setShowRecalibration(false);
    setTargetLanguage('');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-4 right-4 z-40" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="matrix-terminal bg-black/90 backdrop-blur-sm relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Collapsed Header */}
          <div className="flex items-center justify-between p-3">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleExpanded}
            >
              <Globe className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-mono text-xs font-bold">
                {i18n.language.toUpperCase()}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3 w-3 text-green-400" />
              </motion.div>
            </div>
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="text-green-400/50 hover:text-red-400 hover:bg-red-900/20 h-6 w-6 p-0 transition-all duration-300"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 border-t border-green-900/30">
              <div className="pt-3 mb-3">
                <span className="text-green-400 font-mono text-xs font-bold block mb-2">
                  {t('common:changeReality')}
                </span>
                
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
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400/70 font-mono text-xs">
                  REALITY: {i18n.language.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
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
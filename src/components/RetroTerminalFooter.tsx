import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, Users, MessageCircle, Code, Globe } from 'lucide-react';

const RetroTerminalFooter = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const slogans = [
    "If you can read this, you're the resistance.",
    "The code was never the problem.",
    "What you see is not what you get."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger glitch effect
      setGlitchEffect(true);
      
      setTimeout(() => {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        setGlitchEffect(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const infrastructureLinks = [
    {
      name: "Aurora",
      url: "https://aurora-pay.mybuho.de",
      description: "All-in-One API für Lightning- & On-Chain-Zahlungen",
      icon: "🟢",
      color: "text-green-400"
    },
    {
      name: "ZapTracker", 
      url: "https://zap-tracker.vercel.app",
      description: "Analyse & Visualisierung von Nostr-Zaps",
      icon: "🟣",
      color: "text-purple-400"
    }
  ];

  const teamMembers = [
    {
      role: "Owner",
      name: "Nibitor21 Profiles",
      twitter: "https://x.com/nibitor21",
      nostr: "npub1d2jmlee240r37v88cp8ndrgy45e6c06m53catmdhdj0zxaunzx3qcpwhsu",
      icon: "🔹",
      color: "text-blue-400"
    },
    {
      role: "Developer", 
      name: "DrShift",
      twitter: "https://x.com/DrShift3",
      nostr: "npub17c2szua46mc8ndp4grvy4z5465x0qxjge8tqx7vyu0vkqr24y2hssuuy6f",
      icon: "🔸",
      color: "text-cyan-400"
    }
  ];

  return (
    <footer className="relative bg-black border-t-2 border-green-500/30 py-12 px-4 overflow-hidden">
      {/* Matrix Rain Background - Subtle */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs select-none pointer-events-none"
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 8) + 4 }, (_, j) => (
              <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.2) }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto">
        {/* ASCII Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-green-400 text-sm leading-tight">
            <div>╔══════════════════════════════════════════════════════════════╗</div>
            <div>║                    SYSTEM_INFORMATION                        ║</div>
            <div>╚══════════════════════════════════════════════════════════════╝</div>
          </div>
        </motion.div>

        {/* Two Column Layout for Desktop, Stacked for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Left Column - Infrastructure & Team */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Featured Infrastructure */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>🔌 FEATURED_INFRASTRUCTURE</span>
              </div>
              
              <div className="space-y-3">
                {infrastructureLinks.map((item, index) => (
                  <div key={index} className="font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${item.color} hover:text-white transition-colors duration-300 font-bold flex items-center gap-1 group`}
                        >
                          {item.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                        <div className="text-green-300/70 text-xs mt-1 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-4 flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>👥 PROJEKTBETEILIGTE</span>
              </div>
              
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{member.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`${member.color} font-bold text-xs`}>
                          {member.role}: {member.name}
                        </div>
                        <div className="text-xs mt-1 space-y-1">
                          <a 
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1 group"
                          >
                            <span>X:</span>
                            <span className="truncate">{member.twitter.replace('https://x.com/', '@')}</span>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </a>
                          <div className="text-purple-400 text-xs">
                            <span>Nostr: </span>
                            <span className="text-purple-300 break-all">{member.nostr.substring(0, 20)}...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Community & Status */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Community */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>🗨️ COMMUNITY</span>
              </div>
              
              <div className="font-mono text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-lg">📱</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-yellow-400 font-bold">Telegram: 21Darmstadt</div>
                    <a 
                      href="https://t.me/einundzwanzigda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 text-xs flex items-center gap-1 group mt-1"
                    >
                      <span className="truncate">t.me/einundzwanzigda</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-4 flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>⚡ SYSTEM_STATUS</span>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">NETWORK: OPERATIONAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400">LIGHTNING: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400">MATRIX: CONNECTED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ASCII Separator */}
        <div className="font-mono text-green-400/50 text-xs text-center my-8">
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        </div>

        {/* Matrix Slogan - Last Element with Glitch Effect */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-green-400 text-sm mb-2">
            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
          </div>
          
          <motion.div 
            className={`font-mono text-cyan-400 text-base md:text-lg font-bold px-4 py-2 ${glitchEffect ? 'animate-pulse' : ''}`}
            animate={glitchEffect ? {
              x: [0, -2, 2, -1, 1, 0],
              filter: [
                "hue-rotate(0deg)",
                "hue-rotate(90deg)", 
                "hue-rotate(180deg)",
                "hue-rotate(270deg)",
                "hue-rotate(0deg)"
              ],
              textShadow: [
                "0 0 0 transparent",
                "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                "0 0 0 transparent"
              ]
            } : {}}
            transition={{ duration: 0.3 }}
          >
            "{slogans[currentSlogan]}"
          </motion.div>
          
          <div className="font-mono text-green-400 text-sm">
            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
          </div>
          
          {/* Network Error Effect */}
          {glitchEffect && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-mono text-red-400 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                [NETWORK_ERROR_0x4A2F] SIGNAL_INTERFERENCE_DETECTED
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default RetroTerminalFooter;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, Users, MessageCircle, Code, Globe } from 'lucide-react';

const RetroTerminalFooter = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const slogans = [
    "If you can read this, you're the resistance.",
    "The code was never the problem.",
    "What you see is not what you get.",
    "What you believe is the cage.",
    "There is no screen. Only signal.",
    "The root problem with conventional currency is all the trust that's required to make it work.",
    "Governments are good at cutting off the heads of a centrally controlled network like Napster, but pure P2P networks like Gnutella and Tor seem to be holding their own."
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
      name: "Nibitor21",
      nostr: "https://primal.net/p/nprofile1qqsx4fdluu42h3clxrnuqnek35z26vav8ad6guw4akmke83rw7f3rgs0t794d",
      icon: "◾️",
      color: "text-blue-400"
    },
    {
      role: "Developer", 
      name: "DrShift",
      nostr: "https://primal.net/p/nprofile1qqs0v9gpww6adureks65pkz2322a2r8srfyvn4sr0xzw8ktqp42j9tcxwxva2",
      x: "https://x.com/DrShift3",
      icon: "◾️",
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

        {/* Streamlined Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Infrastructure */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-green-400 text-sm mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>INFRASTRUCTURE</span>
            </div>
            
            <div className="space-y-2">
              {infrastructureLinks.map((item, index) => (
                <div key={index} className="font-mono text-xs">
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${item.color} hover:text-white transition-colors duration-300 font-bold flex items-center gap-1 group`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <div className="text-green-300/60 text-xs mt-1 leading-tight">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-green-400 text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>TEAM</span>
            </div>
            
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="font-mono text-xs">
                  <div className={`${member.color} font-bold`}>
                    {member.icon} {member.role}: {member.name}
                  </div>
                  <a 
                    href={member.nostr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-1 group mt-1"
                  >
                    <span>Nostr Profile</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community & Status */}
          <motion.div 
            className="space-y-4 md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Community */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>COMMUNITY</span>
              </div>
              
              <div className="font-mono text-xs">
                <div className="text-yellow-400 font-bold">Telegram: 21Darmstadt</div>
                <a 
                  href="https://t.me/einundzwanzigda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 flex items-center gap-1 group mt-1"
                >
                  <span>t.me/einundzwanzigda</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* System Status */}
            <div>
              <div className="font-mono text-green-400 text-sm mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>STATUS</span>
              </div>
              
              <div className="font-mono text-xs space-y-1">
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
        <div className="font-mono text-green-400/50 text-xs text-center my-6">
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
            className={`font-mono text-cyan-400 text-sm md:text-base font-bold px-4 py-2 ${glitchEffect ? 'animate-pulse' : ''}`}
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
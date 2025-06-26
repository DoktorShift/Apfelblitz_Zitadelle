import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, QrCode, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const svgSequence = ["/apple.svg", "/apple1.svg", "/bitcoin.svg"];

const AnimatedApple = ({ product }) => {
  const [currentSrc, setCurrentSrc] = useState(svgSequence[0]);
  const [animation, setAnimation] = useState({});
  const [key, setKey] = useState(0);

  const effects = [
    {
      name: "pulse",
      animate: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
      transition: { duration: 3, ease: "easeInOut" },
    },
    {
      name: "blink",
      animate: { opacity: [1, 0.2, 1] },
      transition: { duration: 3, ease: "easeInOut" },
    },
    {
      name: "glow",
      animate: {
        boxShadow: [
          "0px 0px 0px rgba(0,0,0,0)",
          "0px 0px 20px rgba(255,255,0,0.6)",
          "0px 0px 0px rgba(0,0,0,0)",
        ],
      },
      transition: { duration: 3, ease: "easeInOut" },
    },
    {
      name: "doublePulse",
      animate: { scale: [1, 1.15, 1, 1.15, 1] },
      transition: { duration: 3, ease: "easeInOut" },
    },
    {
      name: "hidden",
      animate: { opacity: [1, 0, 0] },
      transition: { duration: 3, ease: "easeInOut" },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSrc = svgSequence[Math.floor(Math.random() * svgSequence.length)];
      const nextAnim = effects[Math.floor(Math.random() * effects.length)];
      setCurrentSrc(nextSrc);
      setAnimation(nextAnim);
      setKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={key}
      animate={animation.animate}
      transition={animation.transition}
      className="w-48 h-48 mx-auto"
    >
      {animation.name !== "hidden" && (
        <img
          src={currentSrc}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      )}
    </motion.div>
  );
};

const AppleProducts = () => {
  const products = [
    {
      id: 'green',
      name: 'Golden Delicious',
      description: 'Fresh & Crunchy',
    },
    {
      id: 'red',
      name: 'Gala Royal',
      description: 'Sweet & Juicy',
    },
  ];

  const lnurl = "LNURL1DP68GURN8GHJ7MRWVFHHGTNYV5HKCMN4WFK8QT65F4ZHX7R8QHRT9U";
  const lightningUrl = `lightning:${lnurl}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center gap-12"
      style={{ backgroundImage: 'url(/apfelauro.svg)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <AnimatedApple key={index} product={product} />
        ))}
      </div>

      {/* Lightning Payment Section */}
      <div className="bg-slate-900/70 rounded-xl p-6 mt-12 backdrop-blur-sm border border-cyan-400/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 text-sm font-medium">LNURL:</span>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              <QrCode className="h-3 w-3 mr-1" /> Lightning Invoice
            </Badge>
          </div>
          <Button
            onClick={() => copyToClipboard(lnurl)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            {copied ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400 text-xs">Copied!</span>
              </div>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4">
          <code className="text-cyan-400 font-mono text-sm break-all leading-relaxed">
            {lnurl}
          </code>
        </div>
      </div>
    </div>
  );
};

export default AppleProducts;

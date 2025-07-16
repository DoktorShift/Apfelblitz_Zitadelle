import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Copy, 
  CheckCircle, 
  QrCode, 
  Wallet, 
  ExternalLink, 
  Zap, 
  AlertCircle,
  Loader2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

interface FestivalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApple?: string;
}

const FestivalPaymentModal: React.FC<FestivalPaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedApple = "Apple" 
}) => {
  // State management
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrLoading, setQrLoading] = useState(true);
  const [qrError, setQrError] = useState(false);
  const [walletError, setWalletError] = useState(false);
  
  // Refs for accessibility
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // LNURL configuration
  const lnurl = "LNURL1DP68GURN8GHJ7ARFD4JKXCT5VD5X2U3WD3HXY6T5WVHXGEF0D3H82UNVWQHNVNJPDF2XYR00M2T";
  const lightningUrl = `lightning:${lnurl}`;

  // QR Code generation with error handling
  const generateQrCode = useCallback(async () => {
    if (!isOpen) return;
    
    setQrLoading(true);
    setQrError(false);
    
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(lightningUrl)}&bgcolor=000000&color=00ff00&margin=10&ecc=M&format=png`;
      
      // Test if the QR code URL is accessible
      const img = new Image();
      img.onload = () => {
        setQrCodeUrl(qrUrl);
        setQrLoading(false);
      };
      img.onerror = () => {
        setQrError(true);
        setQrLoading(false);
      };
      img.src = qrUrl;
      
    } catch (error) {
      console.error('QR Code generation failed:', error);
      setQrError(true);
      setQrLoading(false);
    }
  }, [isOpen, lightningUrl]);

  // Copy to clipboard with robust error handling
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopied(true);
      toast.success("LNURL copied to clipboard!", {
        description: "Ready to paste in your Lightning wallet"
      });
      
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error("Copy failed", {
        description: "Please select and copy the LNURL manually"
      });
    }
  }, []);

  // Open Lightning wallet with fallback
  const openLightningWallet = useCallback(() => {
    try {
      setWalletError(false);
      window.location.href = lightningUrl;
      
      // Check if the wallet opened successfully after a delay
      setTimeout(() => {
        if (document.hasFocus()) {
          setWalletError(true);
          toast.error("No Lightning wallet found", {
            description: "Please install a Lightning wallet or copy the LNURL manually"
          });
        }
      }, 1000);
    } catch (error) {
      console.error('Wallet opening failed:', error);
      setWalletError(true);
      toast.error("Failed to open wallet", {
        description: "Please copy the LNURL and paste it in your Lightning wallet"
      });
    }
  }, [lightningUrl]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      generateQrCode();
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Return focus to previous element when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, generateQrCode]);

  // Keyboard event handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      
      // Trap focus within modal
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        {/* Enhanced Matrix Rain Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400/30 font-mono text-xs select-none pointer-events-none"
              animate={{
                y: [0, window.innerHeight + 100],
                opacity: [0, 1, 1, 0],
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
              {Array.from({ length: Math.floor(Math.random() * 20) + 10 }, (_, j) => (
                <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.08) }}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Scanning Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse"></div>
        </div>

        <motion.div
          ref={modalRef}
          initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.3, opacity: 0, rotateY: 90 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.6,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md mx-auto"
        >
          {/* Holographic Border Effects */}
          <div className="absolute inset-0 rounded-2xl">
            <motion.div 
              className="absolute inset-0 rounded-2xl border-2 border-green-400/60 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
              animate={{
                boxShadow: [
                  "0_0_40px_rgba(34,197,94,0.4)",
                  "0_0_60px_rgba(34,197,94,0.6)",
                  "0_0_40px_rgba(34,197,94,0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/5 via-cyan-400/10 to-green-400/5 blur-xl animate-pulse"></div>
          </div>

          <div className="relative bg-gradient-to-br from-black via-green-950/20 to-black border-2 border-green-400/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.3)]">
            
            {/* Animated Top Border */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Header */}
            <div className="relative p-6 pb-4">
              <Button
                ref={closeButtonRef}
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4 text-green-400 hover:text-red-400 hover:bg-red-900/20 rounded-full h-10 w-10 p-0 transition-all duration-300 border border-green-400/30 hover:border-red-400/50 z-10"
                aria-label="Close payment modal"
              >
                <X className="h-5 w-5" />
              </Button>

              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 
                  id="payment-modal-title"
                  className="flex items-center justify-center gap-3 text-green-400 text-xl sm:text-2xl font-bold font-mono tracking-wider mb-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </motion.div>
                  <span className="glitch-text" data-text="LIGHTNING_PAY">
                    LIGHTNING_PAY
                  </span>
                </h2>

                <p 
                  id="payment-modal-description"
                  className="text-green-300/80 font-mono text-sm sm:text-base mb-4"
                >
                  {selectedApple} • Pay What You Want
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge className="bg-green-900/60 text-green-300 border-green-400/60 font-mono text-xs shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <QrCode className="h-3 w-3 mr-1" />
                    LNURL-PAY
                  </Badge>
                  <Badge className="bg-cyan-900/60 text-cyan-300 border-cyan-400/60 font-mono text-xs shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    INSTANT
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* QR Code Section */}
            <div className="px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-6"
              >
                <div className="relative mx-auto w-fit">
                  {qrLoading ? (
                    <div className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-green-900/30 to-cyan-900/20 border-2 border-green-400/40 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 text-green-400 animate-spin" />
                        <span className="text-green-400 font-mono text-sm">GENERATING_QR...</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : qrError ? (
                    <div className="w-64 h-64 sm:w-72 sm:h-72 bg-red-900/20 border-2 border-red-400/40 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 font-mono text-sm mb-2">QR_GENERATION_FAILED</p>
                        <Button
                          onClick={generateQrCode}
                          variant="outline"
                          size="sm"
                          className="border-red-400/50 text-red-400 hover:bg-red-900/20 font-mono text-xs"
                        >
                          RETRY
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] border-2 border-green-400/20">
                        <img
                          src={qrCodeUrl}
                          alt="Lightning Payment QR Code"
                          className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-lg"
                          loading="eager"
                        />
                      </div>

                      {/* Animated Scanning Corners */}
                      {[
                        { position: "-top-2 -left-2", border: "border-l-4 border-t-4", corner: "rounded-tl-lg" },
                        { position: "-top-2 -right-2", border: "border-r-4 border-t-4", corner: "rounded-tr-lg" },
                        { position: "-bottom-2 -left-2", border: "border-l-4 border-b-4", corner: "rounded-bl-lg" },
                        { position: "-bottom-2 -right-2", border: "border-r-4 border-b-4", corner: "rounded-br-lg" }
                      ].map((corner, index) => (
                        <motion.div
                          key={index}
                          className={`absolute ${corner.position} w-6 h-6 sm:w-8 sm:h-8 ${corner.border} border-green-400 ${corner.corner}`}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 font-mono mb-2 tracking-wider">
                    SCAN_TO_PAY
                  </h3>
                  <p className="text-green-300/80 text-sm sm:text-base font-mono">
                    Lightning Network • Instant Settlement
                  </p>
                </motion.div>
              </motion.div>

              {/* LNURL Display */}
              <motion.div
                className="bg-black/60 border-2 border-green-400/40 rounded-xl p-4 sm:p-6 mb-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-green-400 font-mono font-bold text-xs sm:text-sm tracking-wider">
                    LNURL_ADDRESS:
                  </span>
                  <Button
                    onClick={() => copyToClipboard(lnurl)}
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300 hover:bg-green-900/40 font-mono border border-green-400/30 hover:border-green-300/50 transition-all duration-300 text-xs sm:text-sm px-3 py-1 h-auto min-h-[36px]"
                    aria-label="Copy LNURL to clipboard"
                  >
                    {copied ? (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                        <span>COPIED!</span>
                      </motion.div>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        COPY
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-black/80 rounded-lg p-3 sm:p-4 border border-green-400/30 relative">
                  <code className="text-green-400 font-mono text-xs sm:text-sm break-all leading-relaxed block select-all">
                    {lnurl}
                  </code>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={openLightningWallet}
                  className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 text-black font-mono font-bold py-3 sm:py-4 text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 border-2 border-green-400/20 hover:border-green-300/40 relative overflow-hidden group min-h-[48px]"
                  disabled={qrLoading || qrError}
                  aria-label="Open Lightning wallet to make payment"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  />
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 relative z-10" />
                  <span className="relative z-10">OPEN_WALLET</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 sm:ml-3 relative z-10" />
                </Button>

                <Button
                  onClick={() => copyToClipboard(lnurl)}
                  variant="outline"
                  className="w-full border-2 border-green-400/60 text-green-400 hover:bg-green-900/40 hover:border-green-300/80 font-mono font-bold py-3 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] relative overflow-hidden group min-h-[48px]"
                  aria-label="Copy LNURL address to clipboard"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  />
                  <Copy className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 relative z-10" />
                  <span className="relative z-10">COPY_LNURL</span>
                </Button>
              </motion.div>

              {/* Developer Attribution */}
              <motion.div
                className="mt-6 p-3 sm:p-4 bg-cyan-900/10 border border-cyan-400/30 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-3 text-cyan-400/90 text-xs sm:text-sm font-mono">
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="font-bold">20% supports DrShift.dev</p>
                    <p className="text-cyan-400/70 text-xs">Lightning & Nostr development</p>
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="text-center border-t border-green-900/40 pt-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-green-400/70 text-xs sm:text-sm font-mono">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.div>
                  <span className="tracking-wider text-center">
                    Lightning Network • Instant • Global
                  </span>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FestivalPaymentModal;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const name = "GRACE ADEGOJU";
  const nameLetters = name.split("");

  useEffect(() => {
    const duration = 2200; // Exact duration for a luxury, deliberate feel
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(update);
      } else {
        // Hold for 600ms at 100% to let the user see the complete, illuminated name
        const timer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(timer);
      }
    };

    const animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <motion.div
      id="custom-site-loader"
      className="fixed inset-0 bg-[#12100f] text-[#F0E6DB] z-[9999] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -40,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      {/* Dynamic Film Grain overlay running during loading */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,159,100,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="grain-overlay"></div>

      {/* Decorative top/bottom visual lines to frame the load space */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-[#F0E6DB]/30 uppercase select-none">
        <span>GRACE ADEGOJU</span>
        <span>VISUAL ARCHIVE ©2026</span>
      </div>

      <div className="w-full max-w-2xl px-8 flex flex-col items-center">
        {/* Editorial Subtitle */}
        <motion.p 
          className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[#C59F64] uppercase mb-8 select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          CREATIVE PORTFOLIO INITIATION
        </motion.p>

        {/* Spelling Name - Animated in Sync with Progress */}
        <div className="flex justify-center items-center select-none mb-12 flex-wrap">
          {nameLetters.map((char, index) => {
            // Calculate progress threshold for this character
            const letterThreshold = (index / nameLetters.length) * 100;
            const isLit = progress >= letterThreshold;

            return (
              <span
                key={index}
                className={`font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light transition-all duration-300 ${
                  char === " " ? "w-4 sm:w-6" : ""
                } ${
                  isLit 
                    ? "text-white text-shadow-[0_0_10px_rgba(255,255,255,0.2)] font-normal" 
                    : "text-[#F0E6DB]/10"
                }`}
                style={{
                  transform: isLit ? "translateY(0)" : "translateY(4px)",
                  transitionProperty: "color, opacity, transform",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Elegant Minimal Progress Bar Track */}
        <div className="w-full max-w-md bg-white/5 h-[2px] rounded-full overflow-hidden relative mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#A47E45] to-[#C59F64] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numerical Percentage Display */}
        <div className="font-mono text-[11px] tracking-[0.25em] text-[#C59F64] flex items-center justify-center space-x-1 select-none">
          <span>[</span>
          <span className="w-8 text-center tabular-nums">
            {Math.floor(progress).toString().padStart(3, '0')}%
          </span>
          <span>]</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-[9px] font-mono tracking-[0.2em] text-[#F0E6DB]/20 uppercase select-none">
        <span>EST. 2026</span>
        <span>LOADING ASSETS...</span>
      </div>
    </motion.div>
  );
}

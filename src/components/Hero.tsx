/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Play, Film, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

// Letter-by-letter bounce component that respects vestibular motion preferences
function InteractiveText({ text, className }: { text: string; className: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={cIdx}
              className="inline-block cursor-pointer origin-bottom"
              whileHover={{ 
                y: -12, 
                rotate: (cIdx + wIdx) % 2 === 0 ? 6 : -6,
                color: '#C59F64'
              }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 450, damping: 12 }}
            >
              {char}
            </motion.span>
          ))}
          {wIdx < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section 
      id="hero-section"
      className="relative min-h-screen pt-32 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Editorial Shadow Top-Banner Layout */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative z-10">
        
        {/* Huge Display "PORTFOLIO" with letters splitting and bouncing */}
        <div className="w-full text-center select-none mb-4 md:mb-8 mt-4">
          <InteractiveText 
            text="PORTFOLIO" 
            className="text-[13vw] sm:text-[14vw] md:text-[15vw] font-serif text-[#161311] leading-none uppercase tracking-tighter"
          />
        </div>

        {/* Lower Grid: Subheadings, description, name, photo, and circular badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-4">
          
          {/* Column 1: Subheading, Fine Line, bio, and GRACE ADEGOJU */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <div className="flex flex-col items-start">
              <span className="font-mono text-xs tracking-[0.3em] text-[#C59F64] font-semibold uppercase mb-1">
                CREATIVE
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#161311] leading-[1.1]">
                DESIGNER &<br />
                VIDEO EDITOR
              </h2>
            </div>
            
            {/* Fine horizontal separator from the reference image */}
            <div className="w-24 h-[1px] bg-[#C59F64]"></div>

            <p className="font-sans text-sm text-[#161311]/75 leading-relaxed max-w-sm">
              I craft visually compelling designs and engaging videos that tell stories, elevate brands, and leave a lasting impact.
            </p>

            {/* Name Treatment: Large, warm gold serif */}
            <div className="pt-4">
              <span className="block font-mono text-[10px] tracking-widest text-[#161311]/50 uppercase mb-1">
                CREATOR IDENTITY
              </span>
              <InteractiveText
                text="GRACE ADEGOJU"
                className="text-3xl sm:text-4xl font-serif text-[#C59F64] tracking-wide block uppercase font-medium leading-none"
              />
            </div>
          </div>

          {/* Column 2: Elegant portrait of Grace Adegoju */}
          <div className="lg:col-span-5 flex justify-center relative group">
            {/* Soft decorative shadow/glow representing warm studio lighting */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#DCCCBC]/30 to-[#C59F64]/10 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700"></div>
            
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#DCCCBC] bg-[#DCCCBC]/20 p-2 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                {/* Visual placeholder of Grace Adegoju - premium neutral Unsplash photo */}
                <img 
                  src="https://res.cloudinary.com/m8xlnr2j/image/upload/v1783634934/ChatGPT_Image_Jul_9_2026_11_08_17_PM_vdqvxx.png"
                  alt="Grace Adegoju - Portrait"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Ambient overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161311]/80 via-[#161311]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Tiny Floating Badges representing her dual nature */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 bg-[#F0E6DB]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCCCBC]/50 shadow-md">
                    <Film className="w-3.5 h-3.5 text-[#C59F64]" />
                    <span className="font-mono text-[9px] tracking-wider text-[#161311] font-bold uppercase">CINEMATICS</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#161311]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                    <Award className="w-3.5 h-3.5 text-[#C59F64]" />
                    <span className="font-mono text-[9px] tracking-wider text-white font-bold uppercase">TOP SPEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: The Custom Rotating Monogram Badge */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center lg:justify-end pb-4">
            
            {/* The circular monogram badge from reference image */}
            <div className="relative w-36 h-36 flex items-center justify-center select-none group">
              
              {/* Outer wrapping rotating circular SVG path */}
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path 
                    id="circlePath" 
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                    fill="transparent" 
                  />
                  <text className="text-[6.8px] font-mono tracking-[0.24em] font-medium fill-[#161311]">
                    <textPath href="#circlePath">
                      CREATING VISUAL STORIES THAT INSPIRE •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Circle and Gold 'G' Monogram */}
              <motion.div 
                className="w-20 h-20 rounded-full bg-[#F0E6DB] border border-[#DCCCBC] flex flex-col items-center justify-center shadow-lg group-hover:border-[#C59F64] transition-colors duration-500 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Mini background sparkle */}
                <Sparkles className="w-4 h-4 text-[#C59F64]/20 absolute top-2 right-2" />
                
                {/* The elegant Gold Monogram Letter 'G' */}
                <span className="font-serif text-4xl text-[#C59F64] font-medium leading-none select-none select-none">
                  G
                </span>

                {/* Sparkling 4-point stars on bottom left/right matching reference */}
                <div className="absolute bottom-2.5 flex space-x-4">
                  <Sparkles className="w-2.5 h-2.5 text-[#C59F64]/80" />
                  <Sparkles className="w-2.5 h-2.5 text-[#C59F64]/80" />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-between mt-12 border-t border-[#DCCCBC]/30 pt-6">
        <button
          onClick={onExploreClick}
          className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#161311]/70 hover:text-[#C59F64] transition-colors group"
        >
          <span>EXPLORE RECENT CAMPAIGNS</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

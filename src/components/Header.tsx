/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/soundEngine';

interface HeaderProps {
  onOpenArchive: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function Header({ onOpenArchive, isMuted, onToggleMute }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("14:42 UTC");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Keep dynamic clock in header representing clean tech liveness without clutter
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { label: 'WORKS', href: '#works' },
    { label: 'SERVICES & PROCESS', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleItemClick = () => {
    soundEngine.playClick();
    setIsOpen(false);
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 md:px-12 py-5 ${
        scrolled
          ? 'bg-[#F0E6DB]/90 backdrop-blur-md border-b border-[#DCCCBC]/40 shadow-sm py-4'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Label */}
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#161311] font-medium uppercase">
            CREATIVE DESIGNER & VIDEO EDITOR
          </span>
        </div>

        {/* Center / Right Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleItemClick}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs font-mono tracking-wider text-[#161311]/75 hover:text-[#C59F64] transition-colors duration-300 font-medium relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C59F64] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
            id="nav-btn-archive"
            onClick={() => {
              soundEngine.playClick();
              onOpenArchive();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center space-x-1 text-xs font-mono tracking-wider text-[#C59F64] hover:text-[#161311] transition-colors duration-300 font-semibold border-b border-[#C59F64]/40 pb-0.5"
          >
            <span>ARCHIVE</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </nav>

        {/* Right Section: Sparkle / Year & Sound Toggle */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Subtle Organic Sound Control Toggle */}
          <button
            onClick={() => {
              // Toggle mute status and play respective toggle sound
              const nextMuted = !isMuted;
              onToggleMute();
              if (nextMuted) {
                // If it was just muted, don't play anything or play a quick click
              } else {
                // Delay slightly to allow AudioContext to resume
                setTimeout(() => soundEngine.playToggleOn(), 10);
              }
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-[#DCCCBC]/40 hover:border-[#161311]/40 bg-[#161311]/5 hover:bg-[#161311]/10 text-[#161311] hover:text-[#C59F64] transition-all duration-300 font-mono text-[10px] tracking-widest uppercase cursor-pointer"
            title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3 h-3 text-[#161311]/70" />
                <span>SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 text-[#C59F64]" />
                <span className="text-[#C59F64] font-semibold">SOUND ON</span>
              </>
            )}
          </button>

          <span className="text-xs font-mono text-[#161311]/60">{timeStr}</span>
          <div className="flex items-center space-x-1 text-[#C59F64]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-serif italic font-medium text-sm text-[#161311]">2026</span>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(!isOpen);
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="md:hidden p-1.5 text-[#161311] hover:text-[#C59F64] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#F0E6DB] border-b border-[#DCCCBC] shadow-lg px-6 py-8 md:hidden flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleItemClick}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="text-sm font-mono tracking-widest text-[#161311] hover:text-[#C59F64] transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <button
                id="mobile-nav-archive"
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  onOpenArchive();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="flex items-center space-x-1.5 text-sm font-mono tracking-widest text-[#C59F64] font-semibold text-left"
              >
                <span>EXPLORE ALL PROJECTS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 border-t border-[#DCCCBC]/40 flex items-center justify-between">
              {/* Mobile Sound Control Toggle */}
              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  onToggleMute();
                  if (!nextMuted) {
                    setTimeout(() => soundEngine.playToggleOn(), 10);
                  }
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-[#DCCCBC]/40 bg-[#161311]/5 text-[#161311] transition-all duration-300 font-mono text-[10px] tracking-widest uppercase"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3 h-3 text-[#161311]/70" />
                    <span>SOUND OFF</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3 text-[#C59F64]" />
                    <span className="text-[#C59F64] font-semibold">SOUND ON</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-4 text-xs font-mono text-[#161311]/60">
                <span>{timeStr}</span>
                <div className="flex items-center space-x-1 text-[#C59F64]">
                  <Sparkles className="w-3 h-3" />
                  <span className="font-serif italic text-sm text-[#161311]">2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import MiniPortfolios from './components/MiniPortfolios';
import ServicesProcess from './components/ServicesProcess';
import ContactFooter from './components/ContactFooter';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import LoadingScreen from './components/LoadingScreen';
import { Project } from './types';
import { PROJECTS } from './data';
import { Sparkles, Volume2, VolumeX, Film, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [isBgVideoMuted, setIsBgVideoMuted] = useState(soundEngine.getMuted());

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    soundEngine.setMuted(nextMuted);
    setIsMuted(nextMuted);
    setIsBgVideoMuted(nextMuted);
  };

  // Lock scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Scroll progress for top indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Synchronize dynamic URL Hash with active modal state to ensure clean indexable permalinks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const slug = hash.replace('#work/', '');
        const matchedProject = PROJECTS.find(p => p.slug === slug);
        if (matchedProject) {
          setActiveProject(matchedProject);
          setIsArchiveOpen(false);
        }
      } else if (hash === '#archive') {
        setIsArchiveOpen(true);
        setActiveProject(null);
      } else {
        setActiveProject(null);
        setIsArchiveOpen(false);
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL Hash when project is opened/closed
  const handleSelectProject = (project: Project | null) => {
    if (project) {
      window.location.hash = `work/${project.slug}`;
      soundEngine.playSwoosh();
    } else {
      // Return to main layout while preserving scroll position or section
      window.location.hash = '';
      soundEngine.playClick();
    }
  };

  const handleNavigateProjectInModal = (project: Project) => {
    soundEngine.playClick();
    window.location.hash = `work/${project.slug}`;
  };

  const handleOpenArchive = () => {
    window.location.hash = 'archive';
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F0E6DB] text-[#161311] selection:bg-[#C59F64] selection:text-[#161311]">
      
      {/* 0. Custom Site Preloader / Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* Scroll Progress Bar at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#C59F64] origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />
      
      {/* 1. Organic Film Grain & Paper texture overlay */}
      <div className="grain-overlay"></div>

      {/* 2. Background Video Integration (Blends seamlessly with layout) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <video
          src="https://res.cloudinary.com/m8xlnr2j/video/upload/v1783633286/Untitled_video_qh4bbd.mp4"
          autoPlay
          muted={isBgVideoMuted}
          loop
          playsInline
          className="w-full h-full object-cover opacity-12 mix-blend-multiply"
        />
        {/* Soft layout blending overlay shade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0E6DB]/95 via-transparent to-[#F0E6DB]/95 pointer-events-none"></div>
      </div>



      {/* 3.1. Floating WhatsApp Quick-Chat Tab */}
      <a
        id="floating-whatsapp-chat-tab"
        href="https://wa.me/2348055944395"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 flex items-center space-x-2 bg-[#161311]/90 backdrop-blur-md hover:bg-[#C59F64] text-[#F0E6DB] hover:text-[#161311] font-mono text-[9px] md:text-xs font-bold tracking-widest px-4 py-2.5 rounded-full shadow-lg border border-[#DCCCBC]/30 hover:border-[#161311] transition-all duration-300 hover:scale-105 group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-[#25D366] rounded-full"></span>
        </div>
        <span className="uppercase tracking-widest">WHATSAPP CHAT</span>
      </a>

      {/* 4. Core Layout Structure */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        
        {/* Responsive Header Bar */}
        <Header 
          onOpenArchive={handleOpenArchive} 
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Home / Hero Section */}
        <Hero onExploreClick={() => handleScrollToSection('works')} />

        {/* Curated Selected Works Section with expander archive toggles */}
        <SelectedWorks 
          onSelectProject={handleSelectProject} 
          showAllInitially={isArchiveOpen}
        />

        {/* Mini Portfolios Section */}
        <MiniPortfolios />

        {/* Services & Process Section */}
        <ServicesProcess />

        {/* Contact Form & Footer Section */}
        <ContactFooter />

      </div>

      {/* 5. Immersive Full-Screen Project Case Study details panel */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailsModal
            project={activeProject}
            onClose={() => handleSelectProject(null)}
            onNavigateProject={handleNavigateProjectInModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

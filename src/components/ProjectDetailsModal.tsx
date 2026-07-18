/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, FolderOpen, Calendar, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateProject: (project: Project) => void;
}

export default function ProjectDetailsModal({ project, onClose, onNavigateProject }: ProjectDetailsModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll to top of modal when project changes
  useEffect(() => {
    setActiveImageIdx(0);
    setIsPlaying(true);
    const container = document.getElementById('case-study-scroll-container');
    if (container) container.scrollTop = 0;
  }, [project]);

  if (!project) return null;

  // Toggle video playback
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle video volume
  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Find next/prev project for easy cycling
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <AnimatePresence>
      <motion.div
        id="case-study-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#161311]/90 backdrop-blur-md flex justify-end"
      >
        <motion.div
          id="case-study-modal-container"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="w-full lg:w-[65%] xl:w-[55%] h-full bg-[#F0E6DB] text-[#161311] shadow-2xl flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle noise grain */}
          <div className="grain-overlay"></div>

          {/* Modal Header Bar (sticky) */}
          <div className="px-6 md:px-10 py-5 bg-[#F0E6DB]/95 border-b border-[#DCCCBC] flex items-center justify-between z-30 relative backdrop-blur-sm">
            <button
              id="case-study-back-btn"
              onClick={onClose}
              className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#161311]/60 hover:text-[#C59F64] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO MAIN</span>
            </button>

            <div className="flex items-center space-x-6">
              <span className="font-mono text-[10px] tracking-widest text-[#161311]/40 uppercase hidden sm:inline">
                CASE STUDY OVERVIEW
              </span>
              <button
                id="case-study-close-btn"
                onClick={onClose}
                className="p-2 rounded-full border border-[#DCCCBC] hover:border-[#C59F64] hover:bg-[#DCCCBC]/20 transition-all text-[#161311]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main scrollable body */}
          <div 
            id="case-study-scroll-container"
            className="flex-grow overflow-y-auto px-6 md:px-10 py-8 space-y-12 z-20 relative"
          >
            {/* Project Hero Title Card */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#C59F64]">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span className="font-mono text-xs tracking-wider uppercase font-semibold">
                  {project.category}
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#161311] leading-tight font-medium">
                {project.title}
              </h1>

              <p className="font-sans text-base md:text-lg text-[#161311]/85 font-light leading-relaxed max-w-2xl border-l-2 border-[#C59F64] pl-4 italic">
                {project.summary}
              </p>
            </div>

            {/* Campaign Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#DCCCBC]/30 border border-[#DCCCBC]/60 rounded-2xl p-6 shadow-sm">
              <div>
                <span className="block font-mono text-[9px] tracking-wider text-[#161311]/45 uppercase mb-1">CLIENT / BRAND</span>
                <span className="font-sans text-sm font-semibold text-[#161311]">{project.client}</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] tracking-wider text-[#161311]/45 uppercase mb-1">TIMELINE / YEAR</span>
                <span className="font-sans text-sm font-semibold text-[#161311]">{project.year}</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] tracking-wider text-[#161311]/45 uppercase mb-1">CREATIVE ROLE</span>
                <span className="font-sans text-sm font-semibold text-[#161311]">{project.role}</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] tracking-wider text-[#161311]/45 uppercase mb-1">AUDIT TYPE</span>
                <span className="font-sans text-sm font-semibold text-[#161311]">{project.clientType}</span>
              </div>
            </div>

            {/* If Video exists: Render premium custom Video Loop Player */}
            {project.videoUrl && (
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-wider text-[#161311]/50 uppercase block">CINEMATIC PROJECT TEASER</span>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#DCCCBC] bg-black shadow-xl group">
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    autoPlay
                    playsInline
                  />

                  {/* Dark elegant controls overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleTogglePlay}
                        className="bg-white/90 hover:bg-[#C59F64] hover:text-white transition-colors p-2 rounded-full text-black"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-white font-mono text-[10px] tracking-widest uppercase">CAMPAIGN LOOP_PLAY</span>
                    </div>

                    <button
                      onClick={handleToggleMute}
                      className="text-white/80 hover:text-[#C59F64] p-1.5 rounded"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Core Narrative Sections */}
            <div className="space-y-8">
              {/* Challenge */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[#DCCCBC] pt-6">
                <div className="md:col-span-4">
                  <h3 className="font-mono text-xs tracking-widest text-[#C59F64] font-semibold uppercase">01 / THE CHALLENGE</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="font-sans text-sm text-[#161311]/80 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[#DCCCBC] pt-6">
                <div className="md:col-span-4">
                  <h3 className="font-mono text-xs tracking-widest text-[#C59F64] font-semibold uppercase">02 / CREATIVE APPROACH</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="font-sans text-sm text-[#161311]/80 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-[#DCCCBC] pt-6">
                <div className="md:col-span-4">
                  <h3 className="font-mono text-xs tracking-widest text-[#C59F64] font-semibold uppercase">03 / THE SOLUTION</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="font-sans text-sm text-[#161311]/80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Deliverables Pills List */}
            <div className="space-y-3 border-t border-[#DCCCBC] pt-6">
              <span className="font-mono text-[10px] tracking-wider text-[#161311]/50 uppercase block">OUTCOME DELIVERABLES</span>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((deliv, index) => (
                  <span 
                    key={index} 
                    className="bg-[#DCCCBC]/40 border border-[#DCCCBC]/80 text-[10px] font-mono tracking-wider text-[#161311] px-3.5 py-1.5 rounded-lg"
                  >
                    ✓ {deliv}
                  </span>
                ))}
              </div>
            </div>

            {/* Campaign Visual Assets Showcase */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider text-[#161311]/50 uppercase">CAMPAGIN DESIGN GALLERY</span>
                <div className="flex space-x-1">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIdx === idx ? 'bg-[#C59F64] w-4' : 'bg-[#DCCCBC]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Visual Carousel with motion fading */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#DCCCBC] shadow-lg bg-[#DCCCBC]/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {project.images[activeImageIdx].endsWith('.mp4') || project.images[activeImageIdx].includes('/video/upload/') ? (
                      <video
                        src={project.images[activeImageIdx]}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={project.images[activeImageIdx]}
                        alt={`Campaign asset ${activeImageIdx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Buttons */}
                <button
                  onClick={() => setActiveImageIdx(prev => (prev - 1 + project.images.length) % project.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#F0E6DB]/90 border border-[#DCCCBC] p-2 rounded-full shadow-md text-[#161311] hover:text-[#C59F64]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIdx(prev => (prev + 1) % project.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#F0E6DB]/90 border border-[#DCCCBC] p-2 rounded-full shadow-md text-[#161311] hover:text-[#C59F64]"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results metrics */}
            <div className="bg-[#161311] text-white p-6 md:p-8 rounded-2xl space-y-6">
              <div className="flex items-center space-x-2 text-[#C59F64]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-widest uppercase">PROVEN CAMPAIGN METRICS</span>
              </div>
              <h4 className="font-serif text-2xl font-light">KEY OUTCOME IMPACT</h4>
              <ul className="space-y-4">
                {project.results.map((res, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm font-light text-[#F0E6DB]/85">
                    <span className="font-serif italic text-lg text-[#C59F64] font-medium min-w-[20px]">
                      0{index + 1}.
                    </span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer Cycling Panel (sticky) */}
          <div className="px-6 md:px-10 py-5 bg-[#DCCCBC]/20 border-t border-[#DCCCBC]/60 flex items-center justify-between z-30 relative">
            <button
              id="case-study-prev-project"
              onClick={() => onNavigateProject(prevProject)}
              className="flex items-center space-x-2 text-[10px] md:text-xs font-mono tracking-wider text-[#161311]/70 hover:text-[#C59F64] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS PROJECT</span>
            </button>

            <span className="font-mono text-[10px] text-[#161311]/40 hidden md:inline">
              PROJECT {currentIndex + 1} OF {PROJECTS.length}
            </span>

            <button
              id="case-study-next-project"
              onClick={() => onNavigateProject(nextProject)}
              className="flex items-center space-x-2 text-[10px] md:text-xs font-mono tracking-wider text-[#C59F64] font-semibold hover:text-[#161311] transition-colors"
            >
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, Tag, FolderOpen, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { soundEngine } from '../utils/soundEngine';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  showAllInitially?: boolean;
}

export default function SelectedWorks({ onSelectProject, showAllInitially = false }: SelectedWorksProps) {
  const [showAll, setShowAll] = useState(showAllInitially);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Derive unique categories and tags from projects
  const categories = useMemo(() => {
    const list = new Set(PROJECTS.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  const tags = useMemo(() => {
    const list = new Set<string>();
    PROJECTS.forEach(p => p.tags.forEach(t => list.add(t)));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let result = PROJECTS;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'All') {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.clientType.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, selectedTag, searchQuery]);

  // Display top 4 if not toggled, otherwise show full matched list
  const visibleProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 4);
  }, [filteredProjects, showAll]);

  return (
    <section 
      id="works" 
      className="bg-[#161311] text-[#F0E6DB] py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59F64]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DCCCBC]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCCCBC]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[#C59F64] mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase">CURATED CASE STUDIES</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-white font-light">
              SELECTED WORKS
            </h2>
          </div>
        </div>

        {/* Live Filter / Search Panel */}
        <div className="mb-12 bg-[#222020] border border-[#DCCCBC]/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#F0E6DB]/45">
                <Search className="w-4 h-4" />
              </span>
              <input 
                id="work-search-input"
                type="text"
                placeholder="Search campaigns, textiles, client types, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161311] border border-[#DCCCBC]/10 focus:border-[#C59F64] text-sm text-white placeholder-[#F0E6DB]/40 pl-10 pr-4 py-3 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Quick category filters (horizontal scrollable on mobile) */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCategory(cat);
                    setSelectedTag('All');
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`text-[10px] md:text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-lg transition-all shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-[#C59F64] text-[#161311] font-semibold' 
                      : 'bg-[#161311] text-[#F0E6DB]/70 hover:bg-[#161311]/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                id="toggle-expand-filters"
                onClick={() => {
                  soundEngine.playClick();
                  setIsFilterExpanded(!isFilterExpanded);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`p-2 rounded-lg transition-all ${
                  isFilterExpanded ? 'bg-[#C59F64] text-[#161311]' : 'bg-[#161311] text-[#F0E6DB]/70'
                }`}
                title="Expand tags & all filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Tags Panel */}
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                id="expanded-filter-tags-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-6 pt-6 border-t border-[#DCCCBC]/10"
              >
                {/* Full Categories list */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1.5 text-xs text-[#C59F64] font-mono tracking-wider uppercase mb-2">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={`full-cat-${cat}`}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded ${
                          selectedCategory === cat 
                            ? 'bg-[#C59F64]/20 text-[#C59F64] border border-[#C59F64]' 
                            : 'bg-[#161311] text-[#F0E6DB]/60 hover:text-white border border-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags List */}
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-[#C59F64] font-mono tracking-wider uppercase mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Tags / Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-[10px] font-mono px-3 py-1.5 rounded-full transition-colors ${
                          selectedTag === tag 
                            ? 'bg-[#C59F64] text-[#161311] font-semibold' 
                            : 'bg-[#161311]/50 text-[#F0E6DB]/50 hover:bg-[#161311] hover:text-white'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.slug}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => soundEngine.playHover()}
                className="group cursor-pointer flex flex-col justify-between"
              >
                {/* Project Card Cover */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#222020] border border-[#DCCCBC]/10 shadow-lg group-hover:border-[#C59F64]/30 transition-all duration-500 mb-5">
                  {project.coverImage.endsWith('.mp4') || project.coverImage.includes('/video/upload/') ? (
                    <video
                      src={project.coverImage}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161311]/90 via-[#161311]/25 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Corner tags/year indicator */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="bg-[#161311]/80 backdrop-blur-md text-[9px] font-mono font-medium tracking-widest text-[#C59F64] px-2.5 py-1 rounded-full border border-[#DCCCBC]/10">
                      {project.year}
                    </span>
                    <span className="bg-[#161311]/80 backdrop-blur-md text-[9px] font-mono font-medium tracking-widest text-white px-2.5 py-1 rounded-full border border-white/5">
                      {project.category}
                    </span>
                  </div>

                  {/* Play video badge overlay if video exists */}
                  {project.videoUrl && (
                    <div className="absolute bottom-4 right-4 bg-[#C59F64] text-[#161311] w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-serif text-2xl lg:text-3xl text-white group-hover:text-[#C59F64] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#F0E6DB]/40 group-hover:text-[#C59F64] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  
                  <p className="font-sans text-xs text-[#F0E6DB]/50 uppercase tracking-widest font-medium mb-3">
                    {project.clientType}
                  </p>
                  
                  <p className="font-sans text-sm text-[#F0E6DB]/75 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Mini pills of tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] font-mono text-[#C59F64]/70 border border-[#C59F64]/20 px-2.5 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-mono text-[#F0E6DB]/40 px-2 py-1">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-[#DCCCBC]/20 rounded-2xl">
            <FolderOpen className="w-12 h-12 text-[#C59F64] mx-auto mb-4 opacity-50" />
            <h4 className="font-serif text-xl text-white mb-1">No Projects Found</h4>
            <p className="font-sans text-sm text-[#F0E6DB]/50 max-w-sm mx-auto">
              We couldn't find any campaigns matching "{searchQuery}" or selected taxonomies. Try clearing filters or searching other keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="mt-4 text-xs font-mono text-[#C59F64] underline underline-offset-4"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

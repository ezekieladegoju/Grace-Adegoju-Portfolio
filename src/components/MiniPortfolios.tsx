/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';

const PORTFOLIOS = [
  {
    id: "creative-content",
    title: "Creative Content Portfolio",
    category: "Creative Direction & Strategy",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800",
    description: "A curation of modern multi-channel content strategies, editorial writings, and bespoke brand narratives designed to elevate digital presence.",
    link: "https://www.canva.com/design/DAG7H7jbXtc/LN13fc1_39gIrmwWXAsaPQ/edit?utm_content=DAG7H7jbXtc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    tags: ["Canva", "Brand Strategy", "Editorial Copy"]
  },
  {
    id: "ai-video",
    title: "AI Video Generation Portfolio",
    category: "Generative AI & Motion",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
    description: "Explorations in high-velocity AI cinematic content generation, custom prompts, automated rendering pipelines, and dynamic modern video campaigns.",
    link: "https://canva.link/b0oi2cwtxy7ba7i",
    tags: ["Generative Video", "VFX", "Cinematography"]
  },
  {
    id: "email-design",
    title: "Email Design Portfolio",
    category: "E-Commerce & CRM Design",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=800",
    description: "High-conversion editorial layouts, sustainable campaign architectures, and beautiful responsive email newsletter templates.",
    link: "https://www.figma.com/design/Wv5gkcphl7t89Xlz3llX4c/GRACE-EMAIL-DESIGNS?node-id=1669-162202&t=8HTP5uCrUcQd0sAG-1",
    tags: ["Figma", "Email Dev", "Typography"]
  },
  {
    id: "motion-video",
    title: "Motion Design & Video Editing Portfolio",
    category: "Motion Design & Video Editing",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800",
    description: "Highly engaging kinetic animations, high-fidelity visual effects, seamless post-production editing, and dynamic video narrative content optimized for modern digital platforms.",
    link: "https://canva.link/2thn0z92cbfvtgp",
    tags: ["Premiere Pro", "After Effects", "Motion Graphics"]
  }
];

export default function MiniPortfolios() {
  return (
    <section 
      id="mini-portfolios" 
      className="bg-[#12100f] text-[#F0E6DB] py-24 px-6 md:px-12 relative overflow-hidden border-t border-[#DCCCBC]/10"
    >
      {/* Decorative background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C59F64]/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCCCBC]/20 pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[#C59F64] mb-2">
              <BookOpen className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase">ADDITIONAL SHOWCASES</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-white font-light uppercase">
              MINI PORTFOLIOS
            </h2>
          </div>
          <p className="font-sans text-sm text-[#F0E6DB]/60 max-w-sm leading-relaxed md:text-right">
            Deeper deep-dives into specialized creative and technical disciplines, housed on external platforms.
          </p>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PORTFOLIOS.map((portfolio, index) => (
            <motion.a
              key={portfolio.id}
              id={`mini-portfolio-card-${portfolio.id}`}
              href={portfolio.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col justify-between bg-[#1c1917] border border-[#DCCCBC]/10 hover:border-[#C59F64]/40 p-6 md:p-8 rounded-3xl transition-all duration-500 shadow-xl"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#222020] border border-[#DCCCBC]/5 shadow-inner mb-6">
                  <img 
                    src={portfolio.image} 
                    alt={portfolio.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100f]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 bg-[#12100f]/80 backdrop-blur-md text-[9px] font-mono font-medium tracking-widest text-[#C59F64] px-3 py-1 rounded-full border border-[#DCCCBC]/10">
                    {portfolio.category}
                  </span>

                  {/* External icon overlay */}
                  <div className="absolute bottom-4 right-4 bg-[#12100f]/80 backdrop-blur-md text-[#C59F64] w-8 h-8 rounded-full flex items-center justify-center border border-[#DCCCBC]/10 group-hover:bg-[#C59F64] group-hover:text-[#12100f] transform group-hover:scale-110 transition-all duration-300">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Info and Texts */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-2xl text-white group-hover:text-[#C59F64] transition-colors duration-300">
                    {portfolio.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#F0E6DB]/40 group-hover:text-[#C59F64] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
                </div>

                <p className="font-sans text-sm text-[#F0E6DB]/75 leading-relaxed mb-6">
                  {portfolio.description}
                </p>
              </div>

              {/* Tags and Action footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCCCBC]/10 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {portfolio.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[9px] font-mono text-[#C59F64]/70 border border-[#C59F64]/20 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#C59F64] group-hover:text-white transition-colors uppercase">
                  LAUNCH PORTFOLIO →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

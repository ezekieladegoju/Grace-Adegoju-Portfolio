/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Layout, Film, Sparkles, Compass, Quote, ArrowRight, Palette, Cpu } from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../data';

// Custom icon rendering helper
const IconMap = {
  Layout: Layout,
  Film: Film,
  Sparkles: Sparkles,
  Compass: Compass,
  Palette: Palette,
  Cpu: Cpu,
};

export default function ServicesProcess() {
  return (
    <section 
      id="services" 
      className="py-24 px-6 md:px-12 bg-[#F0E6DB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#DCCCBC] pb-8 mb-16">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs tracking-widest text-[#C59F64] uppercase block mb-2">
              METHODOLOGY & CAPABILITIES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#161311] font-light leading-none">
              SERVICES & PROCESS
            </h2>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <p className="font-sans text-sm text-[#161311]/70 max-w-md lg:ml-auto leading-relaxed">
              Bridging modern digital interface architectures with premium film pacing. We construct seamless, fast-rendering web campaigns and cinematic visual systems.
            </p>
          </div>
        </div>

        {/* Content Layout: Services on Left, Process on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Services list */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="font-serif text-3xl font-light text-[#161311] mb-6">
                PROFESSIONAL SERVICES
              </h3>
              <p className="font-mono text-[10px] tracking-widest text-[#161311]/40 uppercase mb-8">
                CAPABILITIES MAP
              </p>
            </div>

            <div className="space-y-6">
              {SERVICES.map((serv, index) => {
                const IconComponent = IconMap[serv.iconName] || Sparkles;
                return (
                  <motion.div
                    key={index}
                    id={`service-item-${index}`}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group border border-[#DCCCBC] hover:border-[#C59F64] bg-[#DCCCBC]/10 hover:bg-[#DCCCBC]/20 p-6 rounded-2xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-[#F0E6DB] rounded-xl border border-[#DCCCBC] group-hover:border-[#C59F64] text-[#C59F64] transition-colors shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl text-[#161311] font-medium group-hover:text-[#C59F64] transition-colors">
                          {serv.title}
                        </h4>
                        <p className="font-sans text-xs text-[#161311]/75 leading-relaxed">
                          {serv.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Process Timeline */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h3 className="font-serif text-3xl font-light text-[#161311] mb-6">
                MY STEWARDS PROCESS
              </h3>
              <p className="font-mono text-[10px] tracking-widest text-[#161311]/40 uppercase mb-8">
                01 - 04 STEPS WORKFLOW
              </p>
            </div>

            <div className="relative border-l border-[#DCCCBC]/80 pl-6 md:pl-10 space-y-10 py-2">
              {PROCESS_STEPS.map((step, index) => (
                <div 
                  key={index}
                  id={`process-step-${step.number}`}
                  className="relative group"
                >
                  {/* Timeline node badge containing step number */}
                  <div className="absolute -left-[38px] md:-left-[54px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#F0E6DB] border border-[#DCCCBC] group-hover:border-[#C59F64] flex items-center justify-center transition-colors shadow-sm z-10">
                    <span className="font-mono text-[9px] md:text-xs text-[#C59F64] font-bold">
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl font-medium text-[#161311] group-hover:text-[#C59F64] transition-colors">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-[#161311]/70 leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pull Quote and Secondary Portrait Box */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCCCBC] shadow-lg mt-12 bg-[#DCCCBC]/10">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                
                {/* Secondary styled photo */}
                <div className="md:col-span-5 h-48 md:h-64 relative">
                  <img 
                    src="https://res.cloudinary.com/m8xlnr2j/image/upload/v1783635336/WhatsApp_Image_2026-07-09_at_9.47.55_PM_uleq2r.jpg" 
                    alt="Grace Adegoju - Creative Studio" 
                    className="w-full h-full object-cover grayscale brightness-95 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#C59F64]/10 mix-blend-multiply"></div>
                </div>

                {/* Testimonial Quote panel */}
                <div className="md:col-span-7 p-6 md:p-8 space-y-4">
                  <Quote className="w-6 h-6 text-[#C59F64]/40" />
                  <p className="font-serif italic text-base text-[#161311]/85 leading-relaxed">
                    "Web interfaces should operate like tactile editorial paper — spacious, deliberate, and responding organically to user curiosity."
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] tracking-wider text-[#C59F64] font-semibold uppercase">
                      GRACE ADEGOJU
                    </span>
                    <span className="text-xs text-[#161311]/40">— STUDIO STATEMENT</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

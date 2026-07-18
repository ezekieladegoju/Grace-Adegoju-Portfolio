/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ContactFooter() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formType, setFormType] = useState('Graphics Design');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    // Simulate premium backend delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 1500);
  };

  const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/graysaaaaaaaaa?igsh=MTE2cG84NnhteDR1OQ==', handle: '@graysaaaaaaaaa' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/grace-adegoju', handle: 'grace-adegoju' },
  ];

  return (
    <footer 
      id="contact" 
      className="bg-[#161311] text-[#F0E6DB] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C59F64]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#DCCCBC]/10 pb-16">
          
          {/* Column 1: Heading and Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-[#C59F64]">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-xs tracking-widest uppercase">GET IN TOUCH</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight font-light leading-[1.1]">
                Let's Create<br />
                Something Beautiful
              </h2>
            </div>

            <p className="font-sans text-sm text-[#F0E6DB]/75 leading-relaxed max-w-sm">
              Currently accepting selected brand campaigns, luxury digital UI system developments, and custom cinematic film productions for late 2026.
            </p>

            {/* Structured Contact List */}
            <div className="space-y-4 pt-4">
              <h3 className="font-mono text-[10px] tracking-widest text-[#C59F64] uppercase">
                LET'S CONNECT
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="mailto:graceadegoju@gmail.com" 
                  className="flex items-center space-x-3 text-sm text-[#F0E6DB]/80 hover:text-[#C59F64] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#C59F64]/60 group-hover:scale-110 transition-transform" />
                  <span className="font-sans">graceadegoju@gmail.com</span>
                </a>

                <a 
                  href="tel:+2348055944395" 
                  className="flex items-center space-x-3 text-sm text-[#F0E6DB]/80 hover:text-[#C59F64] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#C59F64]/60 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">08055944395</span>
                </a>

                <a 
                  href="https://wa.me/2348055944395" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-[#F0E6DB]/80 hover:text-[#C59F64] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#C59F64]/60 group-hover:scale-110 transition-transform" />
                  <span className="font-sans">Chat on WhatsApp</span>
                </a>

                <div className="flex items-center space-x-3 text-sm text-[#F0E6DB]/80">
                  <MapPin className="w-4 h-4 text-[#C59F64]/60" />
                  <span className="font-sans">Abuja, Nigeria & Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Elegant Email Form */}
          <div className="lg:col-span-4 bg-[#222020] border border-[#DCCCBC]/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <h3 className="font-serif text-xl text-white font-medium mb-6">
              SEND A BRIEF MESSAGE
            </h3>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  id="contact-brief-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block font-mono text-[9px] tracking-wider text-[#F0E6DB]/50 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Celine Laurent"
                      className="w-full bg-[#161311] border border-[#DCCCBC]/10 focus:border-[#C59F64] text-xs text-white placeholder-white/20 p-3 rounded-lg outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-wider text-[#F0E6DB]/50 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. celine@laurent.paris"
                      className="w-full bg-[#161311] border border-[#DCCCBC]/10 focus:border-[#C59F64] text-xs text-white placeholder-white/20 p-3 rounded-lg outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-wider text-[#F0E6DB]/50 uppercase mb-1.5">
                      Project Type
                    </label>
                    <select 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full bg-[#161311] border border-[#DCCCBC]/10 focus:border-[#C59F64] text-xs text-white p-3 rounded-lg outline-none transition-all"
                    >
                      <option value="Graphics Design">Graphics Design</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Motion Design">Motion Design</option>
                      <option value="AI Video Creation & Automation">AI Video Creation & Automation</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-wider text-[#F0E6DB]/50 uppercase mb-1.5">
                      Project Details / Message
                    </label>
                    <textarea 
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Describe your goals, timeline, and aesthetic visions..."
                      className="w-full bg-[#161311] border border-[#DCCCBC]/10 focus:border-[#C59F64] text-xs text-white placeholder-white/20 p-3 rounded-lg outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C59F64] hover:bg-[#A47E45] text-[#161311] font-mono text-xs font-bold tracking-widest uppercase p-3.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "SENDING MESSAGE..." : "TRANSMIT BRIEF"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  id="contact-form-success-state"
                  className="text-center py-8 space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-[#C59F64] mx-auto animate-bounce" />
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl text-white">Transmission Successful</h4>
                    <p className="font-sans text-xs text-[#F0E6DB]/65">
                      Thank you! Your project brief has been logged in Grace's workspace. We will get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-[10px] font-mono text-[#C59F64] underline underline-offset-4 uppercase"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Column 3: Follow / Social grid */}
          <div className="lg:col-span-3 space-y-6 lg:pl-4">
            <div>
              <h3 className="font-mono text-[10px] tracking-widest text-[#C59F64] uppercase mb-4">
                FOLLOW DISCOVERIES
              </h3>
              
              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-3 rounded-lg bg-[#222020]/40 border border-[#DCCCBC]/5 hover:border-[#C59F64]/40 transition-all group"
                  >
                    <span className="font-sans text-sm text-[#F0E6DB]/80 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#C59F64] tracking-wider">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Custom Monogram Mark "GA" */}
            <div className="pt-6 border-t border-[#DCCCBC]/10 flex flex-col items-center lg:items-start space-y-2">
              <span className="font-serif text-5xl text-[#C59F64]/30 select-none tracking-widest font-bold">
                GA
              </span>
              <span className="font-mono text-[9px] text-[#F0E6DB]/40 uppercase tracking-widest">
                GRACE ADEGOJU © 2026
              </span>
            </div>
          </div>

        </div>

        {/* Lower Disclaimer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#F0E6DB]/45 gap-4">
          <span>ALL RIGHTS RESERVED • REGISTERED DESIGNER CHAMBER NIGERIA</span>
          <div className="flex space-x-6">
            <a href="#terms" className="hover:text-white">TERMS OF PRACTICE</a>
            <a href="#privacy" className="hover:text-white">PRIVACY PROTOCOL</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

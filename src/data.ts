/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service, ProcessStep } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'luxe-brand-identity',
    title: "Luxe Graphic & Packaging System",
    category: "Graphics Design",
    clientType: "Premium Editorial Cosmetics",
    year: "2026",
    coverImage: "https://res.cloudinary.com/m8xlnr2j/image/upload/v1783638922/8101042_evvzrm.jpg",
    tags: ["Typography Layouts", "Packaging Design", "Editorial Styling", "Luxury Branding"],
    summary: "A high-contrast visual overhaul of typographic systems, luxury print collateral, and bespoke sustainable cosmetic containers for an organic skincare house.",
    challenge: "The client needed to pivot from a standard organic aesthetic to a luxurious, high-contrast, editorial graphic language that commands premium attention on retail shelves.",
    approach: "We crafted customized typography layouts pairing strong display serif headings with refined monospace labels. We also designed detailed premium cardboard mockups with blind-debossed finishes.",
    solution: "A cohesive typographic and packaging brandbook specifying luxury design grids, custom bottle prints, and a comprehensive visual asset suite for print and digital publication.",
    results: [
      "Elevated retail placement from local boutique shelves to luxury departmental stores",
      "100% stock clearance within the first 10 days of launching the redesigned packaging",
      "Acclaimed for flawless typographical design at the Editorial Design Showcase"
    ],
    role: "Lead Brand Identity & Graphic Designer",
    client: "Bloom Botanicals",
    deliverables: ["Visual Identity Design", "Luxury Package Architecture", "Editorial Layout Systems", "Pre-print Vector Proofs"],
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800"
    ],
    colorPalette: ["#E7E1D8", "#2E3B2F", "#A38A6B", "#C2B5A3"]
  },
  {
    id: '2',
    slug: 'letoile-digital-system',
    title: "L'Étoile Asymmetric Digital System",
    category: "UI/UX Design",
    clientType: "Parisian Haute Couture Store",
    year: "2026",
    coverImage: "https://res.cloudinary.com/m8xlnr2j/image/upload/v1783638687/UIUX_lwvxxk.jpg",
    tags: ["Asymmetric UI", "Figma Design System", "Responsive Layouts", "Editorial Grids"],
    summary: "An intuitive, asymmetric, and responsive user experience system built with flawless layout transitions, pristine grids, and editorial typographic hierarchies.",
    challenge: "Translating the fluid movement of tailored fashion fabrics into a digital interface without resorting to standard, boring rectangular grids.",
    approach: "We designed a custom fluid layout utilizing overlapping visual panels, asymmetrical spacing rhythms, and high-fidelity interactive product pages.",
    solution: "A complete, responsive web layout system designed meticulously in Figma and deployed in React, prioritizing micro-animations and perfect core web vitals.",
    results: [
      "42% higher client engagement compared to traditional grid templates",
      "Session times increased to 4.2 minutes due to organic layout flow",
      "Zero layout shift during transitions, rendering content instantly"
    ],
    role: "Lead UI/UX Architect",
    client: "L'Étoile Atelier",
    deliverables: ["Figma Design Library", "Asymmetric Layout System", "Interaction Guidelines", "Responsive Web Templates"],
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=800",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800"
    ],
    videoUrl: "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783633286/Untitled_video_qh4bbd.mp4",
    colorPalette: ["#F0E6DB", "#161311", "#C59F64", "#DCCCBC"]
  },
  {
    id: '3',
    slug: 'nexus-kinetic-visuals',
    title: "Nexus Kinetic Brand Environments",
    category: "Motion Design",
    clientType: "Ambient Smart Devices",
    year: "2026",
    coverImage: "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783638148/Motiondesign_cqytvg.mp4",
    tags: ["After Effects", "Kinetic Typography", "3D Animating", "Lottie Loops"],
    summary: "Animating raw graphic layouts, fluid text transitions, and 3D smart home assets to produce immersive high-contrast sensory loops and kinetic brand stories.",
    challenge: "The product's smart climate intelligence operates silently and invisibly. We needed to visually communicate air flow, thermal layers, and acoustic waves.",
    approach: "We modeled fluid particle waves using vector software and brought them to life with kinetic titles and responsive 3D animations that react to cursors.",
    solution: "A rich library of loopable motion graphics, kinetic teaser titles, and interactive visual banners integrated seamlessly across marketing channels.",
    results: [
      "Teaser motion graphics drove over 50,000 waitlist registrations",
      "Selected for outstanding motion integration at TechDesign 2026",
      "Substantially reduced website asset load time through custom JSON vector animation"
    ],
    role: "Lead Motion Designer",
    client: "Nexus Tech",
    deliverables: ["Animated Brand Guidelines", "Kinetic Title Templates", "After Effects Deliverables", "SVG Web Animation Code"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
      "https://images.unsplash.com/photo-1502005229762-fc1b2d812ca5?q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800"
    ],
    videoUrl: "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783633286/Untitled_video_qh4bbd.mp4",
    colorPalette: ["#161311", "#C59F64", "#2E2A27", "#DCCCBC"]
  },
  {
    id: '4',
    slug: 'chroma-ai-campaign',
    title: "Chroma Cinematic AI Automation",
    category: "AI Video Creation & Automation",
    clientType: "Luxury Cinema & Editorial",
    year: "2026",
    coverImage: "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783639640/Untitled_video_i1t6ct.mp4",
    tags: ["AI Synthesis", "VFX Pipeline", "Generative Video", "4K Upscaling"],
    summary: "Leveraging cutting-edge AI generation and high-definition upscaling pipelines to produce, edit, and automate cinematic campaigns with maximum velocity.",
    challenge: "Producing multiple high-end video campaign variations across global localized markets within a tight, fast-paced launch schedule.",
    approach: "We designed a hybrid workflow using generative text-to-video tools combined with manual precision color-grading, multi-frame AI upscaling, and timing automation.",
    solution: "An automated luxury campaign generator producing high-definition video renders, complete with immersive cinematic audio and kinetic subtitles.",
    results: [
      "Production timeline slashed from months to less than 10 days",
      "Generated over 1.2 million impressions with luxury social teaser variations",
      "Maintained pixel-perfect luxury brand consistency across all synthetic assets"
    ],
    role: "AI Campaign Director & Editor",
    client: "Chroma Cinema",
    deliverables: ["AI Synthesis Blueprint", "Generative Video Prompt Map", "Automated Upscale Workflows", "Cinematic Campaign Assets"],
    images: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800",
      "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783639640/Untitled_video_i1t6ct.mp4"
    ],
    videoUrl: "https://res.cloudinary.com/m8xlnr2j/video/upload/v1783633286/Untitled_video_qh4bbd.mp4",
    colorPalette: ["#0B0A0A", "#D3AB6D", "#222020", "#DFD6CB"]
  }
];

export const SERVICES: Service[] = [
  {
    title: "Graphics Design",
    description: "Creating high-impact typography, luxury brand layouts, packaging designs, and bold visual assets that command attention across physical and digital canvases.",
    iconName: "Palette"
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive, asymmetric, and responsive user experiences built with flawless layout transitions, pristine grids, and editorial typographic hierarchies.",
    iconName: "Layout"
  },
  {
    title: "Motion Design",
    description: "Animating graphic layouts, type transitions, and 3D assets to produce high-contrast visual loops, kinetic titles, and sensory digital environments.",
    iconName: "Film"
  },
  {
    title: "AI Video Creation & Automation",
    description: "Leveraging cutting-edge AI generation and upscale pipelines to create, edit, and automate cinematic campaigns, maximizing speed without sacrificing high-end luxury feel.",
    iconName: "Cpu"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Visual Identity",
    description: "We map out your brand's aesthetic DNA, designing bespoke color palettes, tailored graphic style-guides, and typography-rich foundation templates."
  },
  {
    number: "02",
    title: "Asymmetric UI/UX & Motion Storyboards",
    description: "We craft custom interactive layout wires and kinetic storyboard structures, ensuring visual content and user journeys flow in a highly-engaging rhythm."
  },
  {
    number: "03",
    title: "AI Synthesis & Motion Production",
    description: "We integrate motion design templates with advanced AI video generation pipelines, rendering fluid high-definition campaign elements with extreme speed."
  },
  {
    number: "04",
    title: "Full-Stack Launch & Performance Mastery",
    description: "We assemble the assets into premium React environments, optimizing responsive video playback speeds, and deploying a secure, indexable portfolio experience."
  }
];

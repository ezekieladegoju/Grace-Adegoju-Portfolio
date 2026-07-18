/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  clientType: string;
  year: string;
  coverImage: string;
  tags: string[];
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string[];
  role: string;
  client: string;
  deliverables: string[];
  images: string[];
  videoUrl?: string; // Optional showcase video
  colorPalette?: string[]; // Colors representing the project branding
}

export interface Service {
  title: string;
  description: string;
  iconName: 'Layout' | 'Film' | 'Sparkles' | 'Compass' | 'Palette' | 'Cpu';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

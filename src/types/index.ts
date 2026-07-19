export interface Project {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Mobile' | 'UI/UX Design';
  thumbnailUrl: string;
  overview: string;
  features: string[];
  technologies: string[];
  architecture?: string;
  databaseSchema?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  galleryUrls?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  githubClicks?: number;
  liveDemoClicks?: number;
  createdAt?: string | number;
  updatedAt?: string | number;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'Frontend' | 'Backend' | 'Database & Storage' | 'DevOps & Tools' | 'Web Architecture';
  iconName: string;
  highlight?: string;
}

export interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  highlight: string;
}

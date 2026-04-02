export interface Slide {
  id: number;
  headline: string;
  subheadline: string;
  cta: string;
  image: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface EducationLevel {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Activity {
  id: number;
  category: string;
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: any; // Lucide icon
  color: string;
  bg: string;
}

export type Page = 'home' | 'about' | 'teaching' | 'admissions' | 'contact' | 'erp' | 'admin';

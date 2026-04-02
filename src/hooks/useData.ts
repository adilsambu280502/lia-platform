import { useState, useEffect } from 'react';
import { SLIDES, EDUCATION_LEVELS } from '../constants';
import { Slide, EducationLevel, NewsItem } from '../types';

export interface Student {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  stats: {
    average: string;
    attendance: string;
    behavior: string;
    tuition: string;
  };
  performance: { month: string; grade: number }[];
  recentGrades: { subject: string; type: string; date: string; grade: string; status: string }[];
}

export interface SiteContent {
  slides: Slide[];
  educationLevels: EducationLevel[];
  news: NewsItem[];
}

export interface MockData {
  students: {
    [key: string]: Student;
  };
  siteContent: SiteContent;
}

const SCHEMA_VERSION = '1.2'; // Update this to force-clear older caches

const INITIAL_NEWS: NewsItem[] = [
  { id: 1, title: 'LIA recebe Certificação Cambridge', date: '2026-03-28', category: 'Académico', image: '/images/home-news-1.jpg' },
  { id: 2, title: 'Inscrições Abertas para 2026/27', date: '2026-03-25', category: 'Admissões', image: '/images/home-news-2.jpg' },
  { id: 3, title: 'Vencedores do Torneio de Culinária', date: '2026-03-20', category: 'Actividades', image: '/images/home-news-3.jpg' },
  { id: 4, title: 'Workshop de Artes Plásticas', date: '2026-03-15', category: 'Artes', image: '/images/home-news-4.jpg' },
];

const INITIAL_SITE_CONTENT: SiteContent = {
  slides: SLIDES,
  educationLevels: EDUCATION_LEVELS,
  news: INITIAL_NEWS,
};

const MOCK_STUDENTS = {
  // ... (rest of the student data remains the same)
  joao: {
    id: 'joao',
    name: 'João Mendes',
    grade: '7º Ano A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    stats: {
      average: '18.5',
      attendance: '98.2%',
      behavior: 'Excelente',
      tuition: 'Regular'
    },
    performance: [
      { month: 'Set', grade: 16.5 },
      { month: 'Out', grade: 17.2 },
      { month: 'Nov', grade: 18.0 },
      { month: 'Dez', grade: 17.8 },
      { month: 'Jan', grade: 18.5 },
      { month: 'Fev', grade: 18.8 },
      { month: 'Mar', grade: 19.2 },
    ],
    recentGrades: [
      { subject: 'Matemática', type: 'Teste', date: '25 Mar', grade: '19.0', status: 'high' },
      { subject: 'Português', type: 'Trabalho', date: '22 Mar', grade: '17.5', status: 'mid' },
      { subject: 'Inglês', type: 'Oral', date: '20 Mar', grade: '18.5', status: 'high' },
      { subject: 'Ciências', type: 'Teste', date: '15 Mar', grade: '16.0', status: 'mid' },
    ]
  },
  maria: {
    id: 'maria',
    name: 'Maria Mendes',
    grade: '4º Ano B',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    stats: {
      average: '19.2',
      attendance: '99.5%',
      behavior: 'Exemplar',
      tuition: 'Regular'
    },
    performance: [
      { month: 'Set', grade: 18.0 },
      { month: 'Out', grade: 18.5 },
      { month: 'Nov', grade: 18.2 },
      { month: 'Dez', grade: 19.0 },
      { month: 'Jan', grade: 19.5 },
      { month: 'Fev', grade: 19.2 },
      { month: 'Mar', grade: 19.8 },
    ],
    recentGrades: [
      { subject: 'Artes', type: 'Projeto', date: '26 Mar', grade: '20.0', status: 'high' },
      { subject: 'Música', type: 'Avaliação', date: '24 Mar', grade: '19.5', status: 'high' },
      { subject: 'Estudo do Meio', type: 'Teste', date: '21 Mar', grade: '18.0', status: 'high' },
      { subject: 'Matemática', type: 'Exercício', date: '18 Mar', grade: '18.5', status: 'high' },
    ]
  }
};

export const useData = () => {
  const [loading, setLoading] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('lia_site_content');
    const savedVersion = localStorage.getItem('lia_schema_version');

    // Force update if version is missing or old
    if (!saved || savedVersion !== SCHEMA_VERSION) {
      localStorage.setItem('lia_schema_version', SCHEMA_VERSION);
      localStorage.setItem('lia_site_content', JSON.stringify(INITIAL_SITE_CONTENT));
      return INITIAL_SITE_CONTENT;
    }
    
    return JSON.parse(saved);
  });

  const students = MOCK_STUDENTS;

  const updateEducationLevel = (id: number, updates: Partial<EducationLevel>) => {
    const newContent = {
      ...siteContent,
      educationLevels: siteContent.educationLevels.map(level => 
        level.id === id ? { ...level, ...updates } : level
      )
    };
    setSiteContent(newContent);
    localStorage.setItem('lia_site_content', JSON.stringify(newContent));
  };

  const updateSlide = (id: number, updates: Partial<Slide>) => {
    const newContent = {
      ...siteContent,
      slides: siteContent.slides.map(slide => 
        slide.id === id ? { ...slide, ...updates } : slide
      )
    };
    setSiteContent(newContent);
    localStorage.setItem('lia_site_content', JSON.stringify(newContent));
  };

  const updateNews = (id: number, updates: Partial<NewsItem>) => {
    const newContent = {
      ...siteContent,
      news: siteContent.news.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    };
    setSiteContent(newContent);
    localStorage.setItem('lia_site_content', JSON.stringify(newContent));
  };

  const refreshData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setLoading(false);
  };

  return { 
    students, 
    siteContent, 
    updateEducationLevel, 
    updateSlide, 
    updateNews,
    loading, 
    refreshData 
  };
};


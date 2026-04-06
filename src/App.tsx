import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import { ERPLayout } from './components/layout/ERPLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Page } from './types';
import { CookieConsent } from './components/CookieConsent';

// Lazy load pages
const ERP = lazy(() => import('./components/ERP').then(m => ({ default: m.ERP })));
const Login = lazy(() => import('./components/Login').then(m => ({ default: m.Login })));
const AdmissionsPage = lazy(() => import('./components/AdmissionsPage').then(m => ({ default: m.AdmissionsPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const TeachingPage = lazy(() => import('./components/TeachingPage').then(m => ({ default: m.TeachingPage })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const HeroSlider = lazy(() => import('./components/HeroSlider').then(m => ({ default: m.HeroSlider })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const EducationLevels = lazy(() => import('./components/EducationLevels').then(m => ({ default: m.EducationLevels })));
const News = lazy(() => import('./components/News').then(m => ({ default: m.News })));
const Activities = lazy(() => import('./components/Activities').then(m => ({ default: m.Activities })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Commitment = lazy(() => import('./components/Commitment').then(m => ({ default: m.Commitment })));
const Accreditation = lazy(() => import('./components/Accreditation').then(m => ({ default: m.Accreditation })));
const Newsletter = lazy(() => import('./components/Newsletter').then(m => ({ default: m.Newsletter })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfUse = lazy(() => import('./components/TermsOfUse').then(m => ({ default: m.TermsOfUse })));
const OfflineNotice = lazy(() => import('./components/OfflineNotice').then(m => ({ default: m.OfflineNotice })));
import { useTranslation } from 'react-i18next';
import { Chatbot } from './components/Chatbot';
import { SupportModal } from './components/SupportModal';
import { CONTACTS } from './constants';
import { MessageCircle, HelpCircle, GraduationCap as GraduationIcon } from 'lucide-react';
import { motion } from 'motion/react';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-lia-navy/20 border-t-lia-red rounded-full animate-spin" />
  </div>
);

// Wrapper to handle dynamic SEO and Title mapping
const SEOHandler = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'home';
    const pageKey = path === 'erp' ? 'erp' : (path === 'admin' ? 'admin' : path);
    
    const title = t(`seo.${pageKey}.title`, 'LIA - Luanda International Academy');
    const description = t(`seo.${pageKey}.description`, 'Educação internacional de excelência em Luanda.');

    // Update Document Title
    document.title = `LIA | ${title}`;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `LIA | ${title}`);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
  }, [location, t, i18n.language]);

  return null;
};

const HomePage = ({ onOpenSupport }: { onOpenSupport: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <HeroSlider />
      <Accreditation />
      <Features />
      <Commitment />
      <EducationLevels />
      <Activities />
      <section id="news">
        <News />
      </section>
      <Testimonials />
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lia-navy rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lia-red/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-sm font-bold text-lia-red uppercase tracking-widest mb-8">
                {t('cta.title')}
              </h2>
              <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-12 leading-tight tracking-tight">
                {t('cta.subtitle')}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-lia-red text-white font-bold rounded-full hover:bg-lia-red-dark transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  {t('cta.enroll')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.2)", "0 0 0 20px rgba(255, 255, 255, 0)"] 
                  }}
                  transition={{ 
                    boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeOut" } 
                  }}
                  className="px-10 py-5 bg-white text-lia-navy font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg flex items-center space-x-3"
                  onClick={() => window.open(CONTACTS.whatsapp, '_blank')}
                >
                  <MessageCircle size={24} />
                  <span>{t('cta.whatsapp')}</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Global Helpdesk / Support (From Legacy Site) */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-lia-navy transition-colors">
                <HelpCircle className="text-lia-navy group-hover:text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-lia-navy mb-4 tracking-tight">{t('cta.supportTitle')}</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs">
                {t('cta.supportDesc')}
              </p>
               <button 
                onClick={onOpenSupport}
                className="px-8 py-3 bg-lia-navy text-white font-bold rounded-2xl hover:bg-[#002244] transition-all text-sm"
              >
                {t('cta.supportButton')}
              </button>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-lia-red transition-colors">
                <GraduationIcon className="text-lia-red group-hover:text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-lia-navy mb-4 tracking-tight">{t('cta.admissionsTitle')}</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs">
                {t('cta.admissionsDesc')}
              </p>
              <button className="px-8 py-3 bg-lia-red text-white font-bold rounded-2xl hover:bg-lia-red-dark transition-all text-sm">
                {t('cta.admissionsButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [supportState, setSupportState] = useState<{ isOpen: boolean; title?: string }>({ isOpen: false });

  const openSupport = (title?: string) => setSupportState({ isOpen: true, title });

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast.success(t('chatbot.title'), { position: 'top-center' });
    };
    const handleOffline = () => {
      setIsOffline(true);
      toast.warning(t('chatbot.title'), { position: 'top-center', duration: Infinity });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // AUTHENTICATION STRATEGY: Current implementation uses localStorage for demo purposes.
  // SECURITY NOTE: In a production environment with a backend, this should be replaced
  // by a robust JWT/Cookie-based auth system with interceptors.
  useEffect(() => {
    const authStatus = localStorage.getItem('lia_isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('lia_isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // RTL Support and Language attribute
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLogout = () => {
    localStorage.removeItem('lia_isLoggedIn');
    localStorage.removeItem('lia_user_role'); // Clean up any other session data
    setIsLoggedIn(false);
    toast.info(t('erp.logout'), { position: 'bottom-right' });
  };

  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" expand />
      <SEOHandler />
      <OfflineNotice />
      <Chatbot />
      <CookieConsent />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Institutional Routes */}
          <Route path="/" element={
            <MainLayout currentPage="home" onPageChange={() => {}}>
              <HomePage onOpenSupport={() => openSupport()} />
            </MainLayout>
          } />
          <Route path="/about" element={
            <MainLayout currentPage="about" onPageChange={() => {}}>
              <AboutPage />
            </MainLayout>
          } />
          <Route path="/teaching" element={
            <MainLayout currentPage="teaching" onPageChange={() => {}}>
              <TeachingPage />
            </MainLayout>
          } />
          <Route path="/admissions" element={
            <MainLayout currentPage="admissions" onPageChange={() => {}}>
              <AdmissionsPage />
            </MainLayout>
          } />
          <Route path="/contact" element={
            <MainLayout currentPage="contact" onPageChange={() => {}}>
              <ContactPage />
            </MainLayout>
          } />
          <Route path="/privacy" element={
            <MainLayout currentPage="privacy" onPageChange={() => {}}>
              <PrivacyPolicy />
            </MainLayout>
          } />
          <Route path="/terms" element={
            <MainLayout currentPage="terms" onPageChange={() => {}}>
              <TermsOfUse />
            </MainLayout>
          } />

          {/* ERP Portal Routes */}
          <Route path="/erp" element={
            isLoggedIn ? (
              <ERPLayout>
                <ERP onLogout={handleLogout} onOpenSupport={() => openSupport(t('cta.supportTitle'))} />
              </ERPLayout>
            ) : (
              <Login onLogin={handleLogin} onBack={() => window.location.href = '/'} portalType="parent" />
            )
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            isLoggedIn ? (
              <AdminLayout>
                <AdminDashboard onLogout={handleLogout} onOpenSupport={() => openSupport("Suporte Técnico LIA")} />
              </AdminLayout>
            ) : (
              <Login onLogin={handleLogin} onBack={() => window.location.href = '/'} portalType="admin" />
            )
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <SupportModal 
        isOpen={supportState.isOpen} 
        onClose={() => setSupportState({ ...supportState, isOpen: false })} 
        title={supportState.title}
      />
    </BrowserRouter>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('lia_cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lia_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lia_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl border border-gray-200 p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Close Icon (Optional/Subtle) */}
            <button 
              onClick={handleDecline}
              title="Fechar"
              aria-label="Fechar banner de cookies"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors md:hidden"
            >
              <X size={20} />
            </button>

            <div className="flex items-start md:items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Cookie size={24} />
              </div>
              <div>
                <p className="text-[#003366] font-medium leading-relaxed pr-8 md:pr-0">
                  {t('cookies.message', 'Utilizamos cookies para lhe proporcionar a melhor experiência na nossa plataforma.')}
                </p>
                <a 
                  href="/legal" 
                  className="text-xs font-bold text-[#E31E24] hover:underline uppercase tracking-wider mt-2 inline-block"
                >
                  {t('cookies.policy', 'Ler Política de Privacidade')}
                </a>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <button
                onClick={handleDecline}
                className="px-6 py-3 font-bold text-[#003366] border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm whitespace-nowrap"
              >
                {t('cookies.decline', 'Recusar')}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 font-bold text-white bg-[#003366] rounded-xl shadow-lg hover:bg-[#002244] hover:shadow-xl transition-all hover:-translate-y-1 text-sm whitespace-nowrap"
              >
                {t('cookies.accept', 'Aceitar')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

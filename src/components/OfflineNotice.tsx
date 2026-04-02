import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, X, Zap, RefreshCw } from 'lucide-react';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOffline(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check for showOffline
    if (!navigator.onLine) setShowOffline(true);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <AnimatePresence>
        {showOffline && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[100]"
          >
            <div className="bg-lia-navy/95 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/20 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lia-red/20 rounded-full -mr-16 -mt-16 blur-3xl" />
              
              <div className="flex items-start space-x-5 relative z-10">
                <div className="w-14 h-14 bg-lia-red rounded-2xl flex items-center justify-center shadow-premium flex-shrink-0 animate-pulse">
                  <WifiOff size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-black mb-2 tracking-tight uppercase">Modo Offline LIA</h4>
                  <p className="text-sm text-white/70 leading-relaxed font-medium">
                    Está a navegar em modo offline. O site continuará funcional graças à tecnologia de cache inteligente.
                  </p>
                  <div className="mt-4 flex items-center space-x-3">
                    <button 
                      onClick={() => setShowOffline(false)}
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      Podes Prosseguir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpdate && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-8 right-8 z-[100]"
          >
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-premium max-w-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-lia-navy rounded-2xl flex items-center justify-center text-white">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-lia-navy">Nova versão disponível!</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-1 flex items-center space-x-1 text-xs font-black text-lia-red uppercase tracking-widest hover:text-lia-red-dark transition-colors"
                >
                  <RefreshCw size={14} className="animate-spin-slow" />
                  <span>Atualizar Agora</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

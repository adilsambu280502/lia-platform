import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const Newsletter: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulating API call and storage
    setTimeout(() => {
      const subscribers = JSON.parse(localStorage.getItem('lia_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push({
          email,
          date: new Date().toISOString(),
          id: Math.random().toString(36).substr(2, 9)
        });
        localStorage.setItem('lia_subscribers', JSON.stringify(subscribers));
      }
      
      setLoading(false);
      setIsSubscribed(true);
      toast.success(t('chatbot.title'), {
        description: t('news.viewAll')
      });
    }, 1500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-lia-navy rounded-[4rem] p-12 md:p-24 overflow-hidden shadow-2xl"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-lia-red/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
                <Sparkles size={16} className="text-lia-red" />
                <span className="text-xs font-black text-white uppercase tracking-[0.2em]">{t('news.events')}</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                {t('newsletter.title')}
              </h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-lg mb-0 text-pretty">
                {t('newsletter.description')}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-inner">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label htmlFor="newsletter-email" className="text-xs font-black text-white uppercase tracking-widest block ml-2">{t('newsletter.placeholder')}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-lia-red transition-colors">
                          <Mail size={20} />
                        </div>
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl text-lia-navy font-bold focus:outline-none focus:ring-4 focus:ring-lia-red/20 transition-all border-none shadow-premium text-lg"
                        />
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-lia-red text-white font-black rounded-2xl hover:bg-lia-red-dark transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 text-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{t('newsletter.button')}</span>
                          <Send size={20} />
                        </>
                      )}
                    </motion.button>
                    
                    <p className="text-[10px] text-white/40 text-center font-bold uppercase tracking-widest">
                      {t('footer.rights')} <a href="/privacy" className="text-white hover:text-lia-red underline">{t('nav.contact')}</a>.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
                      <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{t('chatbot.initial')}</h3>
                    <p className="text-white/70 font-medium leading-relaxed">
                      {t('newsletter.description')}
                    </p>
                    <button 
                      onClick={() => setIsSubscribed(false)}
                      className="mt-8 text-xs font-black text-white uppercase tracking-widest border-b border-white/20 hover:border-white transition-all pb-1"
                    >
                      {t('newsletter.button')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

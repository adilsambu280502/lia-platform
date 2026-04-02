import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Chatbot } from '../Chatbot';
import { Page } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#E31E24] selection:text-white">
      <Toaster position="top-right" expand={false} richColors />
      <Navbar currentPage={currentPage} onPageChange={onPageChange} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onPageChange={onPageChange} />
      <Chatbot />
    </div>
  );
};

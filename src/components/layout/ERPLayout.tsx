import React from 'react';
import { motion } from 'motion/react';
import { Toaster } from 'sonner';

interface ERPLayoutProps {
  children: React.ReactNode;
}

export const ERPLayout: React.FC<ERPLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#E31E24] selection:text-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-400/5 blur-[120px] pointer-events-none" />
      
      <Toaster position="top-right" expand={false} richColors />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

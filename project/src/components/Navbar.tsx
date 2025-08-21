import React from 'react';
import { motion } from 'framer-motion';
import { Atom, BookOpen, Beaker } from 'lucide-react';

interface NavbarProps {
  currentPage: 'simulation' | 'quiz';
  setCurrentPage: (page: 'simulation' | 'quiz') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-blue-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 text-blue-400"
            >
              <Atom />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Atomic Structure Lab
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('simulation')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                currentPage === 'simulation'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Beaker size={18} />
              <span>Simulation</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('quiz')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                currentPage === 'quiz'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen size={18} />
              <span>Quiz</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AtomicSimulation from './components/AtomicSimulation';
import Quiz from './components/Quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<'simulation' | 'quiz'>('simulation');

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="pt-20"
        >
          {currentPage === 'simulation' ? (
            <AtomicSimulation setCurrentPage={setCurrentPage} />
          ) : (
            <Quiz setCurrentPage={setCurrentPage} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
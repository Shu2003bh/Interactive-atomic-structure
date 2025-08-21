import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ElementInfoPanel from './ElementInfoPanel';
import AtomVisualization from './AtomVisualization';
import { elements } from '../data/elements';

interface AtomicSimulationProps {
  setCurrentPage: (page: 'simulation' | 'quiz') => void;
}

const AtomicSimulation: React.FC<AtomicSimulationProps> = ({ setCurrentPage }) => {
  const [atomicNumber, setAtomicNumber] = useState(1);
  const [massNumber, setMassNumber] = useState(1);
  const [isotopeMode, setIsotopeMode] = useState(false);
  const [highlightType, setHighlightType] = useState<'protons' | 'neutrons' | null>(null);

  const element = elements[atomicNumber - 1];
  const neutronCount = massNumber - atomicNumber;

  useEffect(() => {
    if (!isotopeMode) {
      setMassNumber(element.massNumber);
    }
  }, [atomicNumber, isotopeMode, element.massNumber]);

  const handleAtomicNumberChange = (value: number) => {
    setAtomicNumber(value);
    if (!isotopeMode) {
      setMassNumber(elements[value - 1].massNumber);
    }
  };

  const handleNeutronChange = (change: number) => {
    const newMassNumber = massNumber + change;
    if (newMassNumber >= atomicNumber && newMassNumber <= atomicNumber + 10) {
      setMassNumber(newMassNumber);
    }
  };

  const resetAtom = () => {
    setMassNumber(element.massNumber);
    setIsotopeMode(false);
    setHighlightType(null);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Simulation Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 h-96"
            >
              <AtomVisualization
                atomicNumber={atomicNumber}
                neutronCount={neutronCount}
                highlightType={highlightType}
                setHighlightType={setHighlightType}
              />
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Atomic Number Control */}
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-3">
                    Atomic Number (Z)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={atomicNumber}
                    onChange={(e) => handleAtomicNumberChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span className="text-blue-400 font-semibold">{atomicNumber}</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Isotope Controls */}
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-3">
                    Isotope Mode
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsotopeMode(!isotopeMode)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ${
                      isotopeMode
                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {isotopeMode ? 'Enabled' : 'Disabled'}
                  </motion.button>
                  {isotopeMode && (
                    <div className="flex space-x-2 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNeutronChange(-1)}
                        className="flex-1 py-1 px-2 text-xs bg-red-600 hover:bg-red-500 text-white rounded"
                      >
                        -n
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNeutronChange(1)}
                        className="flex-1 py-1 px-2 text-xs bg-green-600 hover:bg-green-500 text-white rounded"
                      >
                        +n
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetAtom}
                    className="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300"
                  >
                    Reset Atom
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentPage('quiz')}
                    className="py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
                  >
                    Start Quiz
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Element Info Panel */}
          <div className="lg:col-span-1">
            <ElementInfoPanel
              element={element}
              atomicNumber={atomicNumber}
              massNumber={massNumber}
              neutronCount={neutronCount}
              highlightType={highlightType}
              setHighlightType={setHighlightType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomicSimulation;
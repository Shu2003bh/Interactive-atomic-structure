import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';

interface ElementInfoPanelProps {
  element: Element;
  atomicNumber: number;
  massNumber: number;
  neutronCount: number;
  highlightType: 'protons' | 'neutrons' | null;
  setHighlightType: (type: 'protons' | 'neutrons' | null) => void;
}

const ElementInfoPanel: React.FC<ElementInfoPanelProps> = ({
  element,
  atomicNumber,
  massNumber,
  neutronCount,
  highlightType,
  setHighlightType
}) => {
  const getElectronConfiguration = (atomicNum: number) => {
    const shells = [];
    let remainingElectrons = atomicNum;
    let shellLevel = 1;

    while (remainingElectrons > 0) {
      const maxElectrons = 2 * shellLevel * shellLevel;
      const electronsInShell = Math.min(remainingElectrons, maxElectrons);
      shells.push(electronsInShell);
      remainingElectrons -= electronsInShell;
      shellLevel++;
    }

    return shells;
  };

  const electronConfig = getElectronConfiguration(atomicNumber);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 h-fit"
    >
      {/* Element Header */}
      <div className="text-center mb-6">
        <motion.div
          className="text-5xl font-bold text-blue-400 mb-2"
          whileHover={{ scale: 1.1 }}
        >
          {element.symbol}
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-1">{element.name}</h2>
        <p className="text-sm text-gray-400">Atomic Number: {atomicNumber}</p>
      </div>

      {/* Particle Counts */}
      <div className="space-y-4 mb-6">
        <motion.div
          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            highlightType === 'protons' 
              ? 'bg-red-500/20 border border-red-500/30' 
              : 'bg-slate-700/50 hover:bg-red-500/10'
          }`}
          whileHover={{ scale: 1.02 }}
          onClick={() => setHighlightType(highlightType === 'protons' ? null : 'protons')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Protons</span>
            <span className="text-red-400 font-semibold">{atomicNumber}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Positive charge (+1)</div>
        </motion.div>

        <motion.div
          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            highlightType === 'neutrons' 
              ? 'bg-gray-500/20 border border-gray-500/30' 
              : 'bg-slate-700/50 hover:bg-gray-500/10'
          }`}
          whileHover={{ scale: 1.02 }}
          onClick={() => setHighlightType(highlightType === 'neutrons' ? null : 'neutrons')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Neutrons</span>
            <span className="text-gray-400 font-semibold">{neutronCount}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Neutral charge (0)</div>
        </motion.div>

        <div className="p-3 rounded-lg bg-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Electrons</span>
            <span className="text-blue-400 font-semibold">{atomicNumber}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Negative charge (-1)</div>
        </div>
      </div>

      {/* Mass Number */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-blue-300">Mass Number (A)</span>
          <span className="text-blue-100 font-bold text-lg">{massNumber}</span>
        </div>
        <div className="text-xs text-blue-200 mt-1">Protons + Neutrons</div>
      </div>

      {/* Electron Configuration */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Electron Shell Configuration</h3>
        <div className="space-y-2">
          {electronConfig.map((count, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
              <span className="text-sm text-gray-300">Shell {index + 1}</span>
              <span className="text-blue-400 font-semibold">{count}e⁻</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Configuration: {electronConfig.join(', ')}
        </div>
      </div>

      {/* Element Facts */}
      <div>
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Quick Facts</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <p><span className="text-gray-300">Category:</span> {element.category}</p>
          <p><span className="text-gray-300">Period:</span> {element.period}</p>
          <p><span className="text-gray-300">Group:</span> {element.group}</p>
          {element.fact && <p className="text-blue-200 italic">💡 {element.fact}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default ElementInfoPanel;
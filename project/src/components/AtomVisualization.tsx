import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AtomVisualizationProps {
  atomicNumber: number;
  neutronCount: number;
  highlightType: 'protons' | 'neutrons' | null;
  setHighlightType: (type: 'protons' | 'neutrons' | null) => void;
}

interface Particle {
  id: string;
  type: 'proton' | 'neutron';
  x: number;
  y: number;
}

const AtomVisualization: React.FC<AtomVisualizationProps> = ({
  atomicNumber,
  neutronCount,
  highlightType,
  setHighlightType
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate electron shell configuration using 2n² rule
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

  // Generate nucleus particles with random positions
  const generateNucleusParticles = (): Particle[] => {
    const particles: Particle[] = [];
    const nucleusRadius = Math.max(20, (atomicNumber + neutronCount) * 2);

    // Add protons
    for (let i = 0; i < atomicNumber; i++) {
      const angle = (i / (atomicNumber + neutronCount)) * 2 * Math.PI;
      const radius = Math.random() * nucleusRadius * 0.6;
      particles.push({
        id: `proton-${i}`,
        type: 'proton',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    }

    // Add neutrons
    for (let i = 0; i < neutronCount; i++) {
      const angle = ((i + atomicNumber) / (atomicNumber + neutronCount)) * 2 * Math.PI;
      const radius = Math.random() * nucleusRadius * 0.6;
      particles.push({
        id: `neutron-${i}`,
        type: 'neutron',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    }

    return particles;
  };

  const electronConfiguration = getElectronConfiguration(atomicNumber);
  const nucleusParticles = generateNucleusParticles();

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Electron Shells */}
      {electronConfiguration.map((electronCount, shellIndex) => {
        const shellRadius = 60 + shellIndex * 40;
        return (
          <div key={`shell-${shellIndex}`} className="absolute">
            {/* Shell orbit path */}
            <motion.div
              className="absolute rounded-full border border-blue-400/20"
              style={{
                width: shellRadius * 2,
                height: shellRadius * 2,
                left: -shellRadius,
                top: -shellRadius
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shellIndex * 0.2 }}
            />

            {/* Electrons */}
            {Array.from({ length: electronCount }).map((_, electronIndex) => {
              const angle = (electronIndex / electronCount) * 2 * Math.PI;
              const orbitDuration = 3 + shellIndex * 0.5;

              return (
                <motion.div
                  key={`electron-${shellIndex}-${electronIndex}`}
                  className="absolute w-3 h-3"
                  style={{
                    left: -6,
                    top: -6
                  }}
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: orbitDuration,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full shadow-lg"
                    style={{
                      boxShadow: '0 0 10px #60a5fa, 0 0 20px #3b82f6',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{
                      x: Math.cos(angle) * shellRadius,
                      y: Math.sin(angle) * shellRadius
                    }}
                    whileHover={{
                      scale: 1.5,
                      boxShadow: '0 0 15px #60a5fa, 0 0 30px #3b82f6'
                    }}
                    title={`Electron (Shell ${shellIndex + 1})`}
                  />
                </motion.div>
              );
            })}
          </div>
        );
      })}

      {/* Nucleus */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setHighlightType(highlightType ? null : 'protons')}
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {nucleusParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-4 h-4 rounded-full cursor-pointer ${
              particle.type === 'proton' 
                ? `bg-red-500 ${highlightType === 'protons' ? 'ring-4 ring-red-300' : ''}` 
                : `bg-gray-400 ${highlightType === 'neutrons' ? 'ring-4 ring-gray-200' : ''}`
            }`}
            style={{
              left: particle.x - 8,
              top: particle.y - 8,
              boxShadow: particle.type === 'proton' 
                ? '0 0 8px rgba(239, 68, 68, 0.6)' 
                : '0 0 4px rgba(156, 163, 175, 0.4)'
            }}
            animate={{
              x: Math.sin(Date.now() * 0.001 + parseFloat(particle.id.split('-')[1])) * 2,
              y: Math.cos(Date.now() * 0.001 + parseFloat(particle.id.split('-')[1])) * 2
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.3,
              boxShadow: particle.type === 'proton' 
                ? '0 0 15px rgba(239, 68, 68, 0.8)' 
                : '0 0 10px rgba(156, 163, 175, 0.6)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setHighlightType(particle.type === 'proton' ? 'protons' : 'neutrons');
            }}
            title={`${particle.type === 'proton' ? 'Proton' : 'Neutron'} - ${
              particle.type === 'proton' ? 'Charge: +1' : 'Charge: 0'
            }`}
          />
        ))}
        
        {/* Nucleus glow effect */}
        <div 
          className="absolute rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-sm"
          style={{
            width: Math.max(40, (atomicNumber + neutronCount) * 4),
            height: Math.max(40, (atomicNumber + neutronCount) * 4),
            left: -Math.max(20, (atomicNumber + neutronCount) * 2),
            top: -Math.max(20, (atomicNumber + neutronCount) * 2)
          }}
        />
      </motion.div>

      {/* Legend */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-300">Proton (+1)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-gray-300">Neutron (0)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-blue-400 rounded-full shadow-sm" style={{boxShadow: '0 0 5px #60a5fa'}}></div>
          <span className="text-gray-300">Electron (-1)</span>
        </div>
      </div>
    </div>
  );
};

export default AtomVisualization;
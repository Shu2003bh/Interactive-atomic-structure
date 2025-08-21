import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { elements } from '../data/elements';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  setCurrentPage: (page: 'simulation' | 'quiz') => void;
}

interface DroppedElectron {
  id: string;
  shell: number;
}

const Quiz: React.FC<QuizProps> = ({ setCurrentPage }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [droppedElectrons, setDroppedElectrons] = useState<DroppedElectron[]>([]);
  const [availableElectrons, setAvailableElectrons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null; message: string }>({ type: null, message: '' });

  // Quiz questions (first 10 elements)
  const quizQuestions = elements.slice(0, 10);
  const currentElement = quizQuestions[currentQuestionIndex];

  const getCorrectConfiguration = (atomicNum: number) => {
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

  const correctConfig = getCorrectConfiguration(currentElement.atomicNumber);

  useEffect(() => {
    // Reset for new question
    setDroppedElectrons([]);
    setFeedback({ type: null, message: '' });
    setAvailableElectrons(Array.from({ length: currentElement.atomicNumber }, (_, i) => `electron-${i}`));
  }, [currentQuestionIndex, currentElement.atomicNumber]);

  const handleDrop = (electronId: string, shellIndex: number) => {
    const electronsInShell = droppedElectrons.filter(e => e.shell === shellIndex).length;
    const maxElectronsInShell = 2 * (shellIndex + 1) * (shellIndex + 1);

    if (electronsInShell < maxElectronsInShell) {
      setDroppedElectrons(prev => [...prev, { id: electronId, shell: shellIndex }]);
      setAvailableElectrons(prev => prev.filter(id => id !== electronId));
    }
  };

  const checkAnswer = () => {
    const userConfig = correctConfig.map((_, index) => 
      droppedElectrons.filter(e => e.shell === index).length
    );

    const isCorrect = userConfig.every((count, index) => count === correctConfig[index]) && 
                     droppedElectrons.length === currentElement.atomicNumber;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ 
        type: 'correct', 
        message: 'Excellent! Your electron configuration is correct!' 
      });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `Not quite right. The correct configuration is: ${correctConfig.join(', ')}` 
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const resetQuestion = () => {
    setDroppedElectrons([]);
    setFeedback({ type: null, message: '' });
    setAvailableElectrons(Array.from({ length: currentElement.atomicNumber }, (_, i) => `electron-${i}`));
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setFeedback({ type: null, message: '' });
  };

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6"
          >
            {percentage >= 70 ? (
              <CheckCircle className="w-full h-full text-green-400" />
            ) : (
              <XCircle className="w-full h-full text-red-400" />
            )}
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
          <p className="text-xl text-blue-400 mb-2">Your Score: {score}/{quizQuestions.length}</p>
          <p className="text-lg text-gray-300 mb-6">{percentage.toFixed(0)}%</p>

          <div className="mb-6">
            {percentage >= 90 && (
              <p className="text-green-400">Outstanding! You have mastered atomic structure! 🎉</p>
            )}
            {percentage >= 70 && percentage < 90 && (
              <p className="text-blue-400">Great job! You have a solid understanding! 👏</p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-yellow-400">Good effort! Keep practicing to improve! 💪</p>
            )}
            {percentage < 50 && (
              <p className="text-red-400">Keep studying! Review the simulation for better understanding! 📚</p>
            )}
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-all duration-300"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('simulation')}
              className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300"
            >
              Back to Simulation
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Quiz Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Electron Configuration Quiz</h1>
          <p className="text-gray-300">Drag electrons to the correct shells</p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-blue-400">Score: {score}/{quizQuestions.length}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6"
          >
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">{currentElement.symbol}</div>
              <h2 className="text-xl font-semibold text-white">{currentElement.name}</h2>
              <p className="text-sm text-gray-400">Atomic Number: {currentElement.atomicNumber}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Electrons</h3>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-slate-700/30 rounded-lg">
                {availableElectrons.map(electronId => (
                  <Draggable key={electronId} onStop={(e, data) => {
                    // Handle drop zones here
                  }}>
                    <motion.div
                      className="w-6 h-6 bg-blue-400 rounded-full cursor-move shadow-lg"
                      style={{ boxShadow: '0 0 10px #60a5fa' }}
                      whileHover={{ scale: 1.2 }}
                      whileDrag={{ scale: 1.3 }}
                    />
                  </Draggable>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkAnswer}
                disabled={droppedElectrons.length !== currentElement.atomicNumber}
                className={`w-full py-3 px-6 rounded-lg transition-all duration-300 ${
                  droppedElectrons.length === currentElement.atomicNumber
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Check Answer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetQuestion}
                className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {feedback.type && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-lg ${
                    feedback.type === 'correct' 
                      ? 'bg-green-600/20 border border-green-500/30 text-green-300'
                      : 'bg-red-600/20 border border-red-500/30 text-red-300'
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Atom Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Electron Shells</h3>
            
            <div className="relative h-96 flex items-center justify-center">
              {/* Electron Shells */}
              {correctConfig.map((maxElectrons, shellIndex) => {
                const shellRadius = 40 + shellIndex * 35;
                const electronsInShell = droppedElectrons.filter(e => e.shell === shellIndex);
                
                return (
                  <div key={shellIndex} className="absolute">
                    {/* Shell orbit */}
                    <div
                      className="absolute rounded-full border-2 border-dashed border-blue-400/40 transition-all duration-300 hover:border-blue-400/60"
                      style={{
                        width: shellRadius * 2,
                        height: shellRadius * 2,
                        left: -shellRadius,
                        top: -shellRadius
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const electronId = e.dataTransfer.getData('text/plain');
                        if (electronId && availableElectrons.includes(electronId)) {
                          handleDrop(electronId, shellIndex);
                        }
                      }}
                    />

                    {/* Shell label */}
                    <div
                      className="absolute text-xs text-blue-300 bg-slate-700/50 px-2 py-1 rounded"
                      style={{
                        left: shellRadius - 20,
                        top: -shellRadius - 20
                      }}
                    >
                      Shell {shellIndex + 1} ({electronsInShell.length}/{maxElectrons})
                    </div>

                    {/* Electrons in shell */}
                    {electronsInShell.map((electron, index) => {
                      const angle = (index / Math.max(electronsInShell.length, 1)) * 2 * Math.PI;
                      return (
                        <motion.div
                          key={electron.id}
                          className="absolute w-4 h-4 bg-blue-400 rounded-full"
                          style={{
                            left: Math.cos(angle) * shellRadius - 8,
                            top: Math.sin(angle) * shellRadius - 8,
                            boxShadow: '0 0 10px #60a5fa'
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.2 }}
                        />
                      );
                    })}
                  </div>
                );
              })}

              {/* Nucleus */}
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg" 
                   style={{ boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }} />
            </div>

            {/* Target Configuration Display */}
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-300 mb-2">Target Configuration:</h4>
              <div className="text-sm text-gray-300">
                {correctConfig.map((count, index) => (
                  <span key={index} className="mr-4">
                    Shell {index + 1}: {count} electrons
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
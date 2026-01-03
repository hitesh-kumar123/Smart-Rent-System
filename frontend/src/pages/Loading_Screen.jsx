import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onLoadingComplete) onLoadingComplete();
            }, 800);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      <div className={`text-center px-4 transition-all duration-500 ${
        isExiting ? 'translate-y-[-50px] opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="mb-8">
          <div className="inline-block relative">
            <div className={`relative p-6 transition-all duration-500 ${
              progress === 100 ? 'scale-125' : 'scale-100'
            }`}>
              <Home 
                className={`w-24 h-24 text-gray-800 transition-all duration-500 ${
                  progress === 100 ? 'animate-bounce' : 'animate-pulse-scale'
                }`} 
                strokeWidth={1.5} 
              />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          Smart Rent System
        </h1>
        
        <p className="text-lg text-gray-600 mb-12">
          {progress === 100 ? 'Ready!' : 'Loading your experience...'}
        </p>

        <div className="w-64 mx-auto mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-800 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          {progress}%
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
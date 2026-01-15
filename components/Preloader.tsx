import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLesLiveFit, setShowLesLiveFit] = useState(true);
  const [showHerBootyCamp, setShowHerBootyCamp] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLesLiveFit(false);
      setShowHerBootyCamp(true);
    }, 1500); // Show "LESLIVEFIT" for 1.5s

    const timer2 = setTimeout(() => {
      setShowHerBootyCamp(false);
      setIsVisible(false);
      onLoaded();
    }, 3500); // Show "HER BOOTYCAMP" for 2s after LESLIVEFIT, then fade out preloader

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-primary-black z-[9999] flex flex-col items-center justify-center transition-opacity duration-800 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1
        className={`font-headline text-soft-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 transition-all duration-700 ease-in-out transform ${
          showLesLiveFit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        LESLIVEFIT
      </h1>
      <h2
        className={`font-preloader-subtitle text-accent-pink text-4xl sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-in-out transform ${
          showHerBootyCamp ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        HER BOOTYCAMP
      </h2>
    </div>
  );
};

export default Preloader;
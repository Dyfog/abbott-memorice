import React, { useState, useEffect } from 'react';
import { Timer, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameOverScreenProps {
  onRetry: () => void;
  onHome: () => void;
  autoResetSeconds: number;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  onRetry,
  onHome,
  autoResetSeconds,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(autoResetSeconds);

  // Auto return to home countdown
  useEffect(() => {
    if (autoResetSeconds <= 0) return;

    if (secondsLeft <= 0) {
      onHome();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, autoResetSeconds, onHome]);

  const handleRetry = () => {
    soundManager.playClick();
    onRetry();
  };

  const handleGoHome = () => {
    soundManager.playClick();
    onHome();
  };

  const progressPercentage =
    autoResetSeconds > 0
      ? ((autoResetSeconds - secondsLeft) / autoResetSeconds) * 100
      : 0;

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1:1 Reference Background Graphic (1080x1920) */}
      <img
        src="/assets/screens/bg_gameover.png"
        alt="Abbott Inténtalo de nuevo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Interactive Golden "JUGAR" Button Area (aligned with artwork button) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[50.5%] w-[53.5%] max-w-[550px] h-[7.3%] z-20">
        <button
          onClick={handleRetry}
          className="relative w-full h-full rounded-full cursor-pointer transition-transform duration-150 active:scale-95 group focus:outline-none"
          aria-label="Jugar de nuevo"
        >
          {/* Subtle golden shimmer and touch highlight */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 bg-white/15 shadow-[0_0_40px_rgba(243,216,140,0.7)]" />
        </button>
      </div>

      {/* Auto Return Countdown & Return to Home Option (below JUGAR button) */}
      {autoResetSeconds > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[61%] w-[84%] max-w-[460px] flex flex-col items-center gap-2.5 z-20 text-center">
          {/* Countdown pill */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#001736]/85 border border-[#E5B25D]/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <Timer className="w-4 h-4 text-[#E5B25D] animate-pulse shrink-0" />
            <span className="text-[clamp(13px,1.8vw,16px)] font-semibold text-white/90 tracking-wide">
              Volviendo al inicio en{' '}
              <strong className="text-[#F3D88C] font-mono text-base font-bold">
                {secondsLeft}s
              </strong>
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D] transition-all duration-1000 ease-linear rounded-full shadow-[0_0_6px_#E5B25D]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Manual immediate Return to Welcome Button */}
          <button
            onClick={handleGoHome}
            className="mt-1 flex items-center gap-2 px-4 py-1.5 rounded-xl text-[clamp(12px,1.5vw,14px)] font-medium text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-white/20"
          >
            <Home className="w-4 h-4 text-[#00A3E0]" />
            <span>Volver a bienvenida ahora</span>
          </button>
        </div>
      )}
    </div>
  );
};

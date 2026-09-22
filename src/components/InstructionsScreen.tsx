import React from 'react';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';
import { GameSettings } from '../types';
import { soundManager } from '../utils/audio';
import { useCountdownProgress } from '../hooks/useCountdownProgress';

interface InstructionsScreenProps {
  settings: GameSettings;
  onStartGame: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({
  settings,
  onStartGame,
}) => {
  const { progress, secondsLeft } = useCountdownProgress(
    settings.instructionsSeconds,
    onStartGame
  );

  const handleManualStart = () => {
    soundManager.playClick();
    onStartGame();
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1080x1920 Background with Abbott Logo and bottom waves */}
      <img
        src="/assets/screens/bg_board.png"
        alt="Abbott Instructions Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Main Content Area - Safely below Abbott logo (y > 18%) and above wave (y < 82%) */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[88%] max-w-[720px] bottom-[19%] flex flex-col justify-between items-center z-10 text-center">
        
        {/* Title */}
        <div>
          <h1
            className="text-[clamp(28px,5.5cqw,50px)] font-black tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            style={{
              background: 'linear-gradient(180deg, #F9E7B9 0%, #E5B25D 60%, #C98F32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CÓMO JUGAR
          </h1>
          <div className="mt-2 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D]" />
        </div>

        {/* Central Simple & Punchy Instruction Card */}
        <div className="w-full p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#001736]/90 via-[#00224d]/80 to-[#001736]/90 border border-[#E5B25D]/60 backdrop-blur-md shadow-[0_0_40px_rgba(229,178,93,0.25)] flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Subtle icon badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#00A3E0]/20 border border-[#00A3E0]/50 flex items-center justify-center shadow-lg shadow-[#00A3E0]/20">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#00A3E0]" />
          </div>

          {/* Big, direct, easy-to-read instruction */}
          <p className="text-[clamp(20px,3.8cqw,32px)] font-extrabold text-white leading-snug tracking-wide">
            Voltea las tarjetas para <span className="text-[#F3D88C]">emparejarlas</span> y <span className="text-[#00A3E0]">ganar</span>.
          </p>

          <p className="text-[clamp(13px,2cqw,18px)] text-white/80 font-medium max-w-[480px]">
            Encuentra las 8 parejas idénticas de productos Abbott antes de que termine el tiempo.
          </p>

          {/* Configured Time Pill inside card */}
          <div className="w-full mt-2 py-3 px-6 rounded-2xl bg-black/40 border border-[#E5B25D]/50 flex items-center justify-center gap-3.5 shadow-inner">
            <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5B25D] animate-pulse shrink-0" />
            <span className="text-[clamp(15px,2.4cqw,20px)] font-black text-[#F3D88C] tracking-wider uppercase">
              TIEMPO: {settings.timerSeconds} SEGUNDOS
            </span>
          </div>
        </div>

        {/* Countdown & Action Button Area */}
        <div className="w-full flex flex-col items-center gap-3">
          {/* Automatic Countdown bar */}
          <div className="w-full flex items-center justify-between text-[clamp(12px,1.5cqw,15px)] text-white/70 tracking-wider">
            <span>Iniciando juego...</span>
            <span className="font-mono font-bold text-[#F3D88C] text-sm sm:text-base">
              {secondsLeft}s
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D] rounded-full shadow-[0_0_8px_#E5B25D]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Large Golden CTA Button */}
          <button
            onClick={handleManualStart}
            className="mt-2 w-full py-3.5 sm:py-4 rounded-full cursor-pointer overflow-hidden transition-all duration-200 active:scale-95 shadow-[0_0_35px_rgba(229,178,93,0.4)] hover:shadow-[0_0_50px_rgba(243,216,140,0.7)] group border border-white/30 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(180deg, #E6BA67 0%, #D49D42 50%, #B87B24 100%)',
            }}
          >
            <span className="text-[clamp(18px,3.2cqw,28px)] font-black tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] uppercase">
              ¡EMPEZAR AHORA!
            </span>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Timer } from 'lucide-react';
import { useCountdownProgress } from '../hooks/useCountdownProgress';

interface GameOverScreenProps {
  onHome: () => void;
  autoResetSeconds: number;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  onHome,
  autoResetSeconds,
}) => {
  const { progress, secondsLeft } = useCountdownProgress(
    autoResetSeconds,
    onHome
  );

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1:1 Clean Background Graphic with Abbott Logo and bottom waves (1080x1920) */}
      <img
        src="/assets/screens/bg_gameover.png"
        alt="Abbott Se te acabó el tiempo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Main Content Area: Title + Timer Card centered vertically */}
      <div className="absolute top-[39%] left-1/2 -translate-x-1/2 w-[88%] max-w-[620px] flex flex-col items-center gap-6 sm:gap-8 z-20 text-center pointer-events-none">
        
        {/* Title: SE TE ACABÓ EL TIEMPO (with TIEMPO in golden gradient) */}
        <h1 className="text-[clamp(30px,5cqw,52px)] font-black tracking-wider uppercase leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
          <span className="text-white">SE TE ACABÓ EL </span>
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(180deg, #F9E7B9 0%, #E5B25D 60%, #C98F32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(229,178,93,0.5))',
            }}
          >
            TIEMPO
          </span>
        </h1>

        {/* Glowing glass timer badge */}
        <div className="w-full py-6 sm:py-8 px-6 sm:px-10 rounded-3xl bg-gradient-to-b from-[#001736]/90 via-[#00224d]/80 to-[#001736]/90 border-2 border-[#E5B25D]/60 backdrop-blur-md shadow-[0_0_45px_rgba(229,178,93,0.25)] flex flex-col items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E5B25D]/20 border border-[#E5B25D]/50 flex items-center justify-center shadow-lg shadow-[#E5B25D]/20">
            <Timer className="w-7 h-7 sm:w-8 sm:h-8 text-[#E5B25D] animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[clamp(13px,2cqw,18px)] font-bold text-white/75 uppercase tracking-widest">
              Volviendo al menú principal en
            </span>
            <span className="font-mono font-black text-[clamp(38px,5.8cqw,56px)] text-[#F3D88C] tracking-wider drop-shadow-[0_0_15px_rgba(243,216,140,0.6)]">
              {secondsLeft}s
            </span>
          </div>

          {/* Frame-Synced Progress Bar */}
          <div className="w-full max-w-[360px] h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D] rounded-full shadow-[0_0_10px_#E5B25D]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

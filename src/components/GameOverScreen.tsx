import React from 'react';
import { Timer } from 'lucide-react';
import { soundManager } from '../utils/audio';
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

  const handleGoHome = () => {
    soundManager.playClick();
    onHome();
  };

  return (
    <div
      onClick={handleGoHome}
      className="relative w-full h-full overflow-hidden select-none cursor-pointer"
      title="Toca para volver al menú principal"
    >
      {/* Clean 1:1 Background Graphic without JUGAR button (1080x1920) */}
      <img
        src="/assets/screens/bg_gameover.png"
        alt="Abbott Inténtalo de nuevo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Prominent Kiosk Return Timer Badge (centered below INTÉNTALO DE NUEVO) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[52%] w-[86%] max-w-[540px] flex flex-col items-center gap-4 z-20 text-center pointer-events-none">
        {/* Glowing glass timer badge */}
        <div className="w-full py-6 px-8 rounded-3xl bg-gradient-to-b from-[#001736]/90 via-[#00224d]/80 to-[#001736]/90 border-2 border-[#E5B25D]/60 backdrop-blur-md shadow-[0_0_40px_rgba(229,178,93,0.25)] flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5B25D]/20 border border-[#E5B25D]/50 flex items-center justify-center shadow-lg shadow-[#E5B25D]/20">
            <Timer className="w-7 h-7 text-[#E5B25D] animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[clamp(13px,2cqw,18px)] font-bold text-white/70 uppercase tracking-widest">
              Volviendo al menú principal en
            </span>
            <span className="font-mono font-black text-[clamp(36px,5.5cqw,54px)] text-[#F3D88C] tracking-wider drop-shadow-[0_0_12px_rgba(243,216,140,0.5)]">
              {secondsLeft}s
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-[340px] h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00A3E0] to-[#E5B25D] rounded-full shadow-[0_0_8px_#E5B25D]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Touch anywhere hint */}
        <span className="text-[clamp(12px,1.6cqw,16px)] text-white/50 tracking-widest uppercase mt-2 animate-pulse">
          Toca la pantalla para volver ahora
        </span>
      </div>
    </div>
  );
};

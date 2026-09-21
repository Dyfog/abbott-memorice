import React from 'react';

interface WinScreenProps {
  onPlayAgain: () => void;
  autoResetSeconds: number;
}

export const WinScreen: React.FC<WinScreenProps> = ({ onPlayAgain, autoResetSeconds }) => {
  return (
    <div
      onClick={onPlayAgain}
      className="relative w-full h-full overflow-hidden select-none cursor-pointer"
      title="Toca para continuar"
    >
      {/* 1:1 Reference Background Graphic (1080x1920) */}
      <img
        src="/assets/screens/bg_win.png"
        alt="Abbott Felicidades"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Subtle celebratory ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-[#F3D88C]/15 via-transparent to-transparent animate-pulse" />

      {/* Touch anywhere hint */}
      <div className="absolute bottom-[4%] left-0 right-0 text-center text-white/50 text-[clamp(12px,1.5vw,18px)] tracking-widest uppercase">
        {autoResetSeconds > 0 ? 'Toca la pantalla para continuar' : 'Toca la pantalla para jugar de nuevo'}
      </div>
    </div>
  );
};

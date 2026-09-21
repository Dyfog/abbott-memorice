import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div
      onClick={onStart}
      className="relative w-full h-full overflow-hidden select-none cursor-pointer"
    >
      {/* 1:1 Reference Background Graphic (1080x1920) */}
      <img
        src="/assets/screens/bg_home.png"
        alt="Abbott Memorice Home"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Interactive Golden "JUGAR" Button Area (exactly aligned with the artwork button) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[59.4%] w-[53.5%] max-w-[550px] h-[7.3%] z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="relative w-full h-full rounded-full cursor-pointer transition-transform duration-150 active:scale-95 group focus:outline-none"
          aria-label="Jugar"
        >
          {/* Subtle golden shimmer and touch highlight */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 bg-white/15 shadow-[0_0_40px_rgba(243,216,140,0.7)]" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { CardItem } from '../types';

interface CardComponentProps {
  card: CardItem;
  onClick: (card: CardItem) => void;
  disabled: boolean;
}

export const CardComponent: React.FC<CardComponentProps> = ({ card, onClick, disabled }) => {
  const isFlipped = card.isFlipped || card.isMatched;

  return (
    <div
      onClick={() => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
          onClick(card);
        }
      }}
      className={`relative w-full aspect-[3/4] cursor-pointer select-none perspective-1000 transition-transform duration-200 active:scale-95 ${
        card.isMatched ? 'cursor-default' : ''
      }`}
    >
      <div
        className={`w-full h-full relative preserve-3d transition-transform duration-500 ease-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* BACK OF CARD (Showing Abbott Logo) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-[10%] overflow-hidden shadow-lg shadow-black/40 hover:brightness-105 transition-all"
        >
          <img
            src="/assets/cards/card_back.png"
            alt="Abbott Card Back"
            className="w-full h-full object-cover pointer-events-none"
            loading="eager"
            draggable={false}
          />
        </div>

        {/* FRONT OF CARD (Revealed Product / Logo) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[10%] overflow-hidden shadow-xl shadow-black/50 ${
            card.isMatched ? 'matched-glow' : ''
          }`}
        >
          <img
            src={card.image}
            alt={card.label}
            className="w-full h-full object-cover pointer-events-none"
            loading="eager"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

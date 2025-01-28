import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardCarousel = ({ cards = [] }) => {
  // Track the current index of the first visible card
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate how many cards to show based on viewport width
  const [visibleCards, setVisibleCards] = useState(3);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(prevIndex + 1, cards.length - visibleCards)
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Check if we can navigate in either direction
  const canGoNext = currentIndex < cards.length - visibleCards;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={!canGoPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full
          ${canGoPrev ? 'hover:bg-primary-hover' : 'opacity-80 cursor-not-allowed'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={!canGoNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full
          ${canGoNext ? 'hover:bg-primary-hover' : 'opacity-80 cursor-not-allowed'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 md:w-1/3 p-4"
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(cards.length / visibleCards) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors
              ${currentIndex === index * visibleCards ? 'bg-primary' : 'bg-neutralDark-secondary'}`}
            onClick={() => setCurrentIndex(index * visibleCards)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
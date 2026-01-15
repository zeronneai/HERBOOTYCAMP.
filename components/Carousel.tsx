import React, { useRef, useEffect, useState } from 'react';
import { CarouselProps, CarouselItem } from '../types';

interface TestimonialOverlayProps {
  item: CarouselItem;
  isActive: boolean;
}

const TestimonialOverlay: React.FC<TestimonialOverlayProps> = ({ item, isActive }) => {
  const [showContent, setShowContent] = useState(false); // Controls both background and text opacity

  useEffect(() => {
    if (isActive) {
      // Delay content appearance after the image is likely visible
      const timer = setTimeout(() => setShowContent(true), 700); // 700ms delay for content
      return () => clearTimeout(timer);
    } else {
      setShowContent(false); // Reset when not active
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
      {/* Background layer for darkening the image, fades in/out with showContent */}
      <div
        className={`absolute inset-0 bg-primary-sage transition-opacity duration-500 ease-in-out ${
          showContent ? 'opacity-70' : 'opacity-0' // Changed from opacity-30 to 0 if initial is meant to be clearer.
        }`}
      ></div>

      {/* Text content, also fades in/out with showContent */}
      <div
        className={`relative z-10 transition-opacity duration-500 ease-in-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-accent italic text-2xl md:text-3xl text-soft-beige leading-relaxed mb-4 max-w-2xl">
          "{item.testimonial}"
        </p>
        <p className="font-body text-lg font-semibold text-accent-pink">
          - {item.author}
        </p>
      </div>
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ items, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const slideDuration = 7000; // 7 seconds per slide (includes image + testimonial display time)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className={`relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-xl ${className}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={idx !== currentIndex}
        >
          <img
            src={item.src}
            alt={`Fitness testimonial from ${item.author}`}
            className="w-full h-full object-cover"
          />
          <TestimonialOverlay item={item} isActive={idx === currentIndex} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
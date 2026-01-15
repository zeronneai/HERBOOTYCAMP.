import React, { useEffect, useState } from 'react';
import { FloatingParticlesProps } from '../types'; // Import the interface

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 200, className, isHovered = false }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Random position within a wider range to allow particles to float in/out
      top: `${Math.random() * 100 * 1.5 - 25}%`, // -25% to 125%
      left: `${Math.random() * 100 * 1.5 - 25}%`, // -25% to 125%
      // Random size for variety - significantly increased for much more visibility
      size: `${Math.random() * 6 + 6}px`, // 6px to 12px
      // Random animation delays and durations for non-uniform movement
      delayFloatX: `${Math.random() * 15}s`,
      durationFloatX: `${Math.random() * 20 + 20}s`, // 20-40s
      delayFloatY: `${Math.random() * 15}s`,
      durationFloatY: `${Math.random() * 20 + 20}s`, // 20-40s
      delayFade: `${Math.random() * 10}s`,
      durationFade: `${Math.random() * 10 + 10}s`, // 10-20s
      // Increased blur for a softer, much more glowing effect
      blur: `${Math.random() * 3 + 4}px`, // 4px to 7px blur
      // Set color explicitly to accent-pink for consistent, strong glow
      color: 'var(--color-accent-pink)',
      // Increased base opacity for always-present and clearly visible particles
      baseOpacity: Math.random() * 0.4 + 0.6, // 0.6 to 1.0 for strong constant presence
      // Increased additional opacity when hovered for extremely strong glow
      hoverOpacityIncrease: Math.random() * 0.2 + 0.8, // 0.8 to 1.0 additional opacity on hover
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full transition-opacity duration-300 ease-in-out" // Add transition for smooth opacity change
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            // Calculate current opacity based on hover state
            opacity: isHovered ? (Math.min(1.0, p.baseOpacity + p.hoverOpacityIncrease)) : p.baseOpacity, // Clamp max opacity to 1.0
            filter: `blur(${p.blur})`,
            animation: `particle-float-x ${p.durationFloatX} ease-in-out ${p.delayFloatX} infinite alternate,
                        particle-float-y ${p.durationFloatY} ease-in-out ${p.delayFloatY} infinite alternate,
                        particle-fade ${p.durationFade} ease-in-out ${p.delayFade} infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
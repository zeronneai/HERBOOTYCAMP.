import React from 'react';
import Button from './Button';
import FloatingParticles from './FloatingParticles'; // Import FloatingParticles

interface FloatingCTAProps {
  onOpenSignup: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenSignup }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Wrapper for the button and its intense glow */}
      <div className="relative inline-block p-4"> {/* Added padding for glow to expand */}
        {/* The glowing aura div */}
        <div
          className="absolute inset-0 z-0 rounded-full" // Make it rounded like the button
          style={{
            background: 'radial-gradient(circle, var(--color-accent-pink) 0%, transparent 60%)',
            filter: 'blur(40px)', // Strong blur for an intense, wide glow
            opacity: '1.0', // Full opacity for maximum visibility
            animation: 'pulse-glow 4s ease-in-out infinite alternate', // Reusing pulse-glow
          }}
        >
          {/* Floating Light Particles within the glow */}
          <FloatingParticles count={60} isHovered={true} className="z-0" /> {/* Adjusted count for button size */}
        </div>

        {/* The actual button, placed above the glow */}
        <Button onClick={onOpenSignup} variant="primary" className="relative z-10 shadow-xl"> {/* Added relative z-10 */}
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;
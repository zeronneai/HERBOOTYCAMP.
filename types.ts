// Add missing import for React to resolve React.ReactNode types
import React from 'react';

export interface SignupFormFields {
  name: string;
  email: string;
  whatsappNumber: string;
  goal: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface CarouselItem {
  src: string;
  testimonial: string;
  author: string;
}

export interface CarouselProps {
  items: CarouselItem[]; // Changed from images: string[]
  className?: string;
}

export interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface FloatingChatButtonProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FloatingParticlesProps {
  count?: number; // Number of particles to generate
  className?: string; // Additional class names for the container
  isHovered?: boolean; // New prop to indicate hover state
}
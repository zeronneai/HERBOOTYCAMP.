import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) => {
  let baseStyles = 'px-8 py-4 font-body font-semibold text-lg uppercase tracking-wider rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-opacity-75';
  let variantStyles = '';
  let animationClass = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-accent-pink text-soft-white hover:bg-accent-pink-light';
      animationClass = 'animate-button-pulse'; // Apply pulse animation
      break;
    case 'secondary':
      variantStyles = 'bg-soft-white text-primary-black hover:bg-gray-200';
      animationClass = 'animate-button-pulse'; // Apply pulse animation
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-accent-pink border-2 border-accent-pink hover:bg-accent-pink hover:text-soft-white';
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${animationClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
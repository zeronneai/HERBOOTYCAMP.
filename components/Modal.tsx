import React, { useEffect, useRef } from 'react';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-sage bg-opacity-90 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative bg-light-sage p-8 rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100 animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-soft-beige hover:text-accent-pink text-3xl font-light leading-none focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="font-headline text-soft-beige text-4xl mb-6 text-center">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
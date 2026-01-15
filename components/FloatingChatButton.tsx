import React from 'react';
import { FloatingChatButtonProps } from '../types';

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onToggleChat, isChatOpen }) => {
  return (
    <button
      onClick={onToggleChat}
      className={`fixed bottom-6 left-6 z-40 w-16 h-16 bg-primary-black text-soft-white rounded-full flex items-center justify-center shadow-xl border-2 ${
        isChatOpen ? 'border-gray-500' : 'border-accent-pink'
      } hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-opacity-75 animate-button-pulse`}
      aria-label={isChatOpen ? "Close chat" : "Open chat"}
    >
      {/* Chat bubble icon */}
      <svg
        className={`w-8 h-8 ${isChatOpen ? 'text-gray-400' : 'text-accent-pink'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        ></path>
      </svg>
    </button>
  );
};

export default FloatingChatButton;
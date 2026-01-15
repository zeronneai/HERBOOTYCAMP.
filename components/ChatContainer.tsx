import React, { useState, useEffect, useRef } from 'react';
import { ChatContainerProps } from '../types';
import Button from './Button';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string; // Changed to string for direct text output, not React.ReactNode
}

// Function to simulate AI responses based on keywords and chat context
const getSimulatedBotResponse = (userMessage: string, currentUserName: string | null): string => {
  const lowerCaseMessage = userMessage.toLowerCase();
  const joinNowPrompt = "Ready to ignite your power? Click the 'Join Now' button on the page to secure your spot and start your incredible journey!";
  const fallbackResponse = `That's a great thought, ${currentUserName || 'gorgeous'}! I totally get it. My main mission here is to guide incredible women like you towards their fitness dreams with HER BOOTYCAMP. Whether you're curious about the workouts, nutrition, or how we empower confidence, I'm here to help you take that exciting first step! Remember, spaces fill up fast, so if you're feeling that spark, ${joinNowPrompt}`;

  // Define keywords and corresponding responses
  if (lowerCaseMessage.includes('what is her bootcamp') || lowerCaseMessage.includes('what is this') || lowerCaseMessage.includes('what is the program') || lowerCaseMessage.includes('about the program')) {
    return `HER BOOTYCAMP is your ultimate journey to transform, strengthen, and empower yourself, ${currentUserName}! It's an incredible program crafted specifically for women like *you* to sculpt those gorgeous glutes, tone your entire body, and unleash unstoppable confidence. Imagine feeling stronger, more vibrant, and absolutely radiant! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('what included') || lowerCaseMessage.includes('what do i get') || lowerCaseMessage.includes('what comes with it') || lowerCaseMessage.includes('benefits')) {
    return `You're getting so much more than just workouts, sweetie! HER BOOTYCAMP provides dynamic, results-driven workout plans, delicious and easy-to-follow nutrition guidance, a truly inspiring community of fierce women cheering you on, and a mindset shift that builds lasting confidence. It’s a holistic transformation package designed for *your* success! Are you ready to seize it? ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('how long') || lowerCaseMessage.includes('duration') || lowerCaseMessage.includes('length of program') || lowerCaseMessage.includes('weeks')) {
    return `Our HER BOOTYCAMP is an intensive and rewarding 8-week program, ${currentUserName}! That's 8 weeks dedicated to building your dream body and boosting your confidence. You'll see incredible progress in that time! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('who is it for') || lowerCaseMessage.includes('for whom') || lowerCaseMessage.includes('who can join') || lowerCaseMessage.includes('target audience')) {
    return `HER BOOTYCAMP is for every woman, ${currentUserName}, who is ready to invest in herself! Whether you're looking to grow strong glutes, tone your entire body, or build unshakeable confidence, this program is designed to guide and empower you. All fitness levels are welcome – we meet you where you are and help you shine! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('how to join') || lowerCaseMessage.includes('sign up') || lowerCaseMessage.includes('enroll') || lowerCaseMessage.includes('register')) {
    return `It's super easy to join our incredible community, my love! Simply click on any of the 'Join Now' buttons you see on the page. They'll take you straight to our secure signup, where you can reserve your spot and officially begin your journey with HER BOOTYCAMP! I can't wait to see you inside! What are you waiting for? ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('time') || lowerCaseMessage.includes('busy') || lowerCaseMessage.includes('schedule') || lowerCaseMessage.includes('no time')) {
    return `I totally get it, ${currentUserName}, life gets busy! But remember, your wellness is worth making time for. Our workouts are efficient and effective, designed to give you maximum results without taking over your whole day. You can fit them into your schedule and still see amazing changes! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('beginner') || lowerCaseMessage.includes('new to fitness') || lowerCaseMessage.includes('not fit') || lowerCaseMessage.includes('first time')) {
    return `Absolutely, ${currentUserName}! HER BOOTYCAMP is perfect for beginners and adaptable for all levels. We provide modifications and guidance every step of the way. You don't need to be 'fit' to start; you just need to be ready to become fit! We'll build your strength and confidence together! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('results') || lowerCaseMessage.includes('guarantee') || lowerCaseMessage.includes('will i see changes')) {
    return `Oh, the results, ${currentUserName}! Our incredible women consistently report stronger glutes, a more toned physique, increased energy, and a massive boost in confidence! While individual results vary, if you put in the work, you *will* see and feel the difference. Your transformation awaits! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('how much') || lowerCaseMessage.includes('expensive')) {
    return `Investing in yourself is the best decision you can make, ${currentUserName}! For full details on the pricing and any current offers, please click the 'Join Now' button. You'll find all the information there to take this powerful step! It’s more affordable than you think for a complete transformation! ${joinNowPrompt}`;
  } else if (lowerCaseMessage.includes('join now')) {
    return `That's the spirit, ${currentUserName}! I love your enthusiasm! Click that 'Join Now' button and let's get you signed up for HER BOOTYCAMP. Your future self will thank you!`;
  }
  else {
    // Default fallback
    return fallbackResponse;
  }
};

const ChatContainer: React.FC<ChatContainerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [isNameCollected, setIsNameCollected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset chat state when opening
      setMessages([{ sender: 'bot', text: 'What’s your name, gorgeous? I\'m so excited to chat with you about HER BOOTYCAMP!' }]);
      setUserName(null);
      setIsNameCollected(false);
      setInputValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessageText }]);
    setInputValue('');

    if (!isNameCollected) {
      // First message is expected to be the user's name
      const name = userMessageText;
      setUserName(name);
      setIsNameCollected(true);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Hi ${name}, welcome to HER BOOTYCAMP. I'm here to cheer you on and answer any questions you have about igniting your power!` },
      ]);
    } else {
      // Subsequent messages go through the simulated AI
      const botResponse = getSimulatedBotResponse(userMessageText, userName);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse },
      ]);
    }
  };

  const handleOptionClick = (option: string) => {
    // Simulate sending the option as a user message to trigger AI response
    setInputValue(option); // Set input value to the option
    setTimeout(() => {
      handleSendMessage(); // Trigger send message after a short delay
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-24 left-6 z-50 w-80 h-[480px] bg-primary-sage border border-subtle-sage-dark rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div className="flex justify-between items-center p-4 border-b border-subtle-sage-dark">
        <h3 id="chat-title" className="font-headline text-accent-pink text-xl"> {/* Changed title color to accent-pink */}
          HER BOOTYCAMP Chat
        </h3>
        <button
          onClick={onClose}
          className="text-soft-beige hover:text-accent-pink text-3xl font-light leading-none focus:outline-none"
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg shadow ${
                msg.sender === 'user'
                  ? 'bg-accent-pink text-soft-beige'
                  : 'bg-light-sage text-soft-beige'
              }`}
            >
              <p className="text-sm font-body">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-subtle-sage-dark">
        {isNameCollected && (
          <div className="grid grid-cols-1 gap-2 mb-3">
            <Button onClick={() => handleOptionClick('What is HER BOOTYCAMP?')} className="w-full text-sm py-2" variant="outline">
              What is this?
            </Button>
            <Button onClick={() => handleOptionClick('What do I get in the program?')} className="w-full text-sm py-2" variant="outline">
              What do I get?
            </Button>
            <Button onClick={() => handleOptionClick('How do I join HER BOOTYCAMP?')} className="w-full text-sm py-2" variant="outline">
              How do I join?
            </Button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isNameCollected ? 'Ask me anything...' : 'Type your name...'}
            className="flex-1 p-2 rounded-l-md bg-light-sage border border-subtle-sage-dark text-soft-beige placeholder-soft-beige-dark focus:outline-none focus:ring-1 focus:ring-accent-pink"
            aria-label={isNameCollected ? "Your message input" : "Your name input"}
          />
          <button
            type="submit"
            className="bg-accent-pink text-soft-beige p-2 rounded-r-md hover:bg-accent-pink-light transition-colors"
            aria-label="Send message"
          >
            {isNameCollected ? 'Send' : 'Start Chat'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
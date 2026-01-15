import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import Carousel from './components/Carousel';
import Preloader from './components/Preloader';
import FloatingCTA from './components/FloatingCTA';
import RevealOnScroll from './components/RevealOnScroll';
import FloatingChatButton from './components/FloatingChatButton'; // New import
import ChatContainer from './components/ChatContainer'; // New import
import FloatingParticles from './components/FloatingParticles'; // New import
import { SignupFormFields, CarouselItem } from './types'; // Updated import for CarouselItem

// Helper function to encode base64 (for images)
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const App: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // New state for chat
  const [showSignupSuccess, setShowSignupSuccess] = useState(false); // New state for signup success message
  const [isImageHovered, setIsImageHovered] = useState(false); // New state for image hover
  // Removed parallaxOffset state and its effect

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setShowSignupSuccess(false); // Reset success message when opening modal
  };
  const closeSignupModal = () => setIsSignupModalOpen(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen); // Toggle function for chat
  const closeChat = () => setIsChatOpen(false); // Close function for chat container

  const handleSignupSubmit = (fields: SignupFormFields) => {
    console.log('Signup form submitted:', fields);
    // In a real app, you would send this to a backend or CRM
    // alert(`Thank you, ${fields.name}! We've reserved your spot.`); // Replaced by success message in modal

    setShowSignupSuccess(true); // Show success message

    setTimeout(() => {
      closeSignupModal(); // Close modal after showing success message
      setShowSignupSuccess(false); // Reset success message state
    }, 3000); // Close after 3 seconds
  };

  const carouselItems: CarouselItem[] = [
    { src: 'https://i.imgur.com/NL5A0NQ.jpeg', testimonial: "¡Este bootcamp ha superado mis expectativas! Me siento más fuerte y segura que nunca.", author: "Sofía G." },
    { src: 'https://i.imgur.com/DEX1OD3.jpeg', testimonial: "Los entrenamientos son desafiantes pero te empoderan. ¡Mis glúteos nunca se habían visto tan bien!", author: "Valentina R." },
    { src: 'https://i.imgur.com/1IJiIGC.png', testimonial: "Finalmente, una comunidad fitness que realmente apoya a las mujeres. ¡Lo amo!", author: "Camila V." },
    { src: 'https://i.imgur.com/q056OaZ.jpeg', testimonial: "He visto resultados increíbles en solo unas pocas semanas. ¡Súper recomiendo HER BOOTYCAMP!", author: "Andrea L." },
    { src: 'https://picsum.photos/id/1039/1200/800', testimonial: "Mi confianza se ha disparado. ¡Este programa es verdaderamente transformador!", author: "Daniela M." },
  ];

  // New hero background images
  const heroBackgroundImages: string[] = [
    'https://i.imgur.com/gQ50WAu.png',
    'https://i.imgur.com/pOatXRK.png',
    'https://i.imgur.com/t3dtZJC.png',
    'https://i.imgur.com/2brZZ7E.png',
    'https://i.imgur.com/vxEeA2H.png',
  ];

  // Helper to get a random image from the new list
  const getRandomHeroBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * heroBackgroundImages.length);
    return heroBackgroundImages[randomIndex];
  };

  // Generate enough images to fill the 200vh grid, randomly picking from the new list
  const numberOfGridItems = 5 * 5 * 4; // Roughly 5 columns * 5 rows (for 100vh) * 2 (for 200vh height) * 2 (to ensure enough for random spread)
  const allCollageImages = Array.from({ length: numberOfGridItems }).map(() => getRandomHeroBackgroundImage());


  const handlePreloaderLoaded = () => {
    setIsPageLoaded(true);
  };

  return (
    <div className="min-h-screen bg-primary-sage text-soft-beige font-body">
      {!isPageLoaded && <Preloader onLoaded={handlePreloaderLoaded} />}

      {isPageLoaded && (
        <>
          <main>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center p-4 overflow-hidden">
              {/* Layer 1: Image Collage Background (z-index: 0) */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <div
                  className="absolute top-0 left-0 w-full h-[200vh] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 animate-image-grid-scroll"
                  style={{
                    filter: 'brightness(0.6) contrast(0.8) blur(2px)', // Darken, reduce contrast, blur for atmospheric effect
                  }}
                >
                  {allCollageImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Fitness collage image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* Layer 1.5: Glowing Horizontal Pink Light at Bottom (z-index: 10) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[100px] z-10"
                style={{
                  background: 'linear-gradient(to top, var(--color-light-sage) 0%, transparent 80%)',
                  filter: 'blur(20px)',
                  opacity: '0.3', // Adjustable
                  animation: 'bottom-glow-pulse 6s ease-in-out infinite alternate',
                }}
              ></div>

              {/* Layer 2: Subtle Horizontal Pink Light Beam (z-index: 15) */}
              <div
                className="absolute inset-y-0 w-[200vw] h-full z-15"
                style={{
                  background: 'linear-gradient(to right, transparent, var(--color-light-sage) 15%, var(--color-light-sage) 85%, transparent)',
                  filter: 'blur(35px)',
                  opacity: '0.1',
                  animation: 'light-sweep 40s linear infinite',
                  left: '-50vw',
                }}
              ></div>

              {/* Layer 3: Circular Pink Light Glow (z-index: 20) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-20"
                style={{
                  background: 'radial-gradient(circle, var(--color-light-sage) 0%, transparent 70%)',
                  filter: 'blur(100px)',
                  opacity: '0.2',
                  animation: 'pulse-glow 5s ease-in-out infinite alternate',
                }}
              ></div>

              {/* Layer 4: Darker Overlay for Text Readability (z-index: 30) */}
              <div className="absolute inset-0 z-30 opacity-40"
                   style={{ background: 'radial-gradient(circle at top left, var(--subtle-pink) 0%, transparent 40%), radial-gradient(circle at bottom right, var(--subtle-sage-dark) 0%, transparent 50%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-bg 25s ease-in-out infinite alternate'
                   }}>
              </div>

              {/* Layer 5: Main Text and CTA (z-index: 40) */}
              <div className="relative z-40 text-center max-w-4xl mx-auto">
                <RevealOnScroll>
                  <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-tight">
                    Ignite <span className="text-accent-pink">Your Power</span>
                  </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={300}>
                  <p className="font-accent text-3xl sm:text-4xl md:text-5xl italic text-soft-beige mt-4 mb-8">
                    Unleash the <span className="text-accent-pink">HER</span> within.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={600}>
                  <Button onClick={openSignupModal}>
                    Start My Transformation
                  </Button>
                </RevealOnScroll>
              </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
              <RevealOnScroll>
                <h2 className="font-headline text-4xl sm:text-5xl text-center mb-12 uppercase">
                  What is <span className="text-accent-pink">HER BOOTYCAMP</span>?
                </h2>
              </RevealOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <RevealOnScroll>
                  <p className="text-lg leading-relaxed mb-6">
                    HER BOOTYCAMP is more than just a workout; it's a movement designed exclusively for women ready to sculpt their bodies, elevate their strength, and ignite their inner confidence. This program blends high-intensity training with targeted muscle activation to deliver unparalleled results.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We focus on building strong glutes, toned legs, and a powerful core, all while fostering a supportive community. Get ready to transform not just your physique, but your mindset.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  {/* Image with glowing hover effect */}
                  <div
                    className="relative group p-6"
                    onMouseEnter={() => setIsImageHovered(true)} // Set hover state on mouse enter
                    onMouseLeave={() => setIsImageHovered(false)} // Clear hover state on mouse leave
                  >
                    <img
                      src="https://i.imgur.com/6ZFJQKY.png"
                      alt="Woman working out"
                      className="w-full h-auto rounded-lg shadow-xl relative z-10"
                    />
                    {/* Floating Light Particles over the image, with hover state */}
                    <FloatingParticles count={20} className="z-15" isHovered={isImageHovered} />
                    {/* Glowing element */}
                    <div
                      className="absolute inset-0 -m-6 rounded-lg transform scale-95 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, var(--color-accent-pink) 0%, transparent 60%)',
                        filter: 'blur(30px)', // Soft blur for atmospheric effect
                      }}
                    ></div>
                  </div>
                </RevealOnScroll>
              </div>
              <RevealOnScroll delay={400} className="text-center mt-12">
                <Button onClick={openSignupModal} variant="outline">
                  Reserve My Spot
                </Button>
              </RevealOnScroll>
            </section>

            {/* Features Section */}
            <section className="bg-primary-sage py-24 px-4 md:px-8">
              <div className="max-w-6xl mx-auto">
                <RevealOnScroll>
                  <h2 className="font-headline text-4xl sm:text-5xl text-center mb-16 uppercase">
                    Your <span className="text-accent-pink">Transformation</span> Awaits
                  </h2>
                </RevealOnScroll>
                <div className="grid md:grid-cols-3 gap-10">
                  <RevealOnScroll>
                    <div className="text-center p-8 border-2 border-subtle-sage-dark rounded-xl hover:border-accent-pink transition-all duration-300">
                      <span className="text-accent-pink text-5xl mb-4 block">💪</span>
                      <h3 className="font-headline text-2xl uppercase mb-3">Targeted Workouts</h3>
                      <p className="text-md leading-relaxed text-soft-beige">
                        Sculpt and strengthen your glutes, legs, and core with expertly designed routines.
                      </p>
                    </div>
                  </RevealOnScroll>
                  <RevealOnScroll delay={150}>
                    <div className="text-center p-8 border-2 border-subtle-sage-dark rounded-xl hover:border-accent-pink transition-all duration-300">
                      <span className="text-accent-pink text-5xl mb-4 block">💖</span>
                      <h3 className="font-headline text-2xl uppercase mb-3">Empowering Community</h3>
                      <p className="text-md leading-relaxed text-soft-beige">
                        Join a sisterhood of strong women supporting each other every step of the way.
                      </p>
                    </div>
                  </RevealOnScroll>
                  <RevealOnScroll delay={300}>
                    <div className="text-center p-8 border-2 border-subtle-sage-dark rounded-xl hover:border-accent-pink transition-all duration-300">
                      <span className="text-accent-pink text-5xl mb-4 block">🔥</span>
                      <h3 className="font-headline text-2xl uppercase mb-3">Ignite Confidence</h3>
                      <p className="text-md leading-relaxed text-soft-beige">
                        Discover your inner strength and radiate confidence both inside and out.
                      </p>
                    </div>
                  </RevealOnScroll>
                </div>
                <RevealOnScroll delay={450} className="text-center mt-16">
                  <Button onClick={openSignupModal}>
                    Join The Movement
                  </Button>
                </RevealOnScroll>
              </div>
            </section>

            {/* Meet Your Coach Section */}
            <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
              <RevealOnScroll>
                <h2 className="font-headline text-4xl sm:text-5xl text-center mb-12 uppercase">
                  Meet Your <span className="text-accent-pink">Coach</span>, Leslie Bernal
                </h2>
              </RevealOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <RevealOnScroll>
                  {/* Coach image with ambient light particles glow */}
                  <div className="relative p-6"> {/* This div creates the expanded frame area for glow and particles */}
                    <img
                      src="https://i.imgur.com/m4F3ATt.jpeg"
                      alt="Leslie Bernal, your HER BOOTYCAMP Coach"
                      className="w-full h-auto rounded-lg shadow-xl mb-8 md:mb-0 md:max-w-md mx-auto relative z-10"
                    />
                    {/* Layer for the strong, always-on ambient glow and particles */}
                    <div
                      className="absolute inset-0 z-[5]" /* `inset-0` ensures it covers the `p-6` area; `z-[5]` places it behind the image (`z-10`) */
                      style={{
                        background: 'radial-gradient(circle, var(--color-accent-pink) 0%, transparent 60%)',
                        filter: 'blur(70px)', // Increased from 30px for a much wider, more diffuse aura
                        opacity: '1.0', // Increased from 0.8 for maximum background glow intensity
                        animation: 'pulse-glow 5s ease-in-out infinite alternate', // Subtle pulse animation
                      }}
                    >
                      {/* Floating Light Particles always active for a constant, strong glow */}
                      <FloatingParticles count={200} isHovered={true} /> {/* Increased count to 200 */}
                    </div>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  <div className="text-lg leading-relaxed">
                    <h3 className="font-headline text-3xl uppercase text-accent-pink mb-4">Leslie Bernal</h3>
                    <p className="text-xl font-semibold mb-2">Age: 32</p>
                    <p className="text-xl font-semibold mb-4">Role: Nutrition Coach & Founder of LesLiveFit</p>
                    <p className="mb-4">
                      Con más de una década de experiencia en fitness y nutrición, Leslie Bernal es la fuerza apasionada detrás de LesLiveFit y HER BOOTYCAMP. Su viaje comenzó con una búsqueda personal de fuerza y bienestar, que rápidamente evolucionó hacia la misión de empoderar a otras mujeres para que descubran todo su potencial.
                    </p>
                    <p>
                      Leslie se especializa en crear programas transformadores que combinan entrenamientos efectivos con hábitos nutricionales sostenibles. Ella cree que el verdadero fitness va más allá de lo físico, fomentando una mentalidad de confianza, resiliencia y amor propio. ¡Únete a Leslie y deja que te guíe hacia una tú más fuerte, saludable y empoderada!
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            {/* Animated Light Beam Section (between Coach and Carousel) */}
            <section className="relative h-[150px] w-full overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-y-0 w-[200vw] h-full"
                style={{
                  background: 'linear-gradient(to right, transparent, var(--color-subtle-pink) 15%, var(--color-subtle-pink) 85%, transparent)',
                  filter: 'blur(30px)',
                  opacity: '0.15',
                  animation: 'light-sweep 30s linear infinite',
                  left: '-50vw',
                }}
              ></div>
            </section>

            {/* Carousel Section */}
            <section className="py-24 max-w-7xl mx-auto">
              <RevealOnScroll>
                <h2 className="font-headline text-4xl sm:text-5xl text-center mb-12 uppercase">
                  Live <span className="text-accent-pink">The Fit Life</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <Carousel items={carouselItems} /> {/* Pass carouselItems */}
              </RevealOnScroll>
            </section>

            {/* Call to Action Section */}
            <section className="bg-accent-pink py-24 px-4 md:px-8 text-center">
              <RevealOnScroll>
                <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl uppercase text-soft-beige mb-8">
                  Ready to Feel <span className="font-accent italic">Phenomenal?</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-xl md:text-2xl font-semibold text-soft-beige mb-10">
                  Don't wait another day to start your journey. Spaces are limited!
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={400}>
                <Button onClick={openSignupModal} variant="secondary">
                  Join Now & Secure Your Spot
                </Button>
              </RevealOnScroll>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-primary-sage py-12 text-center text-soft-beige">
            <p>&copy; {new Date().getFullYear()} LesLiveFit. All rights reserved.</p>
            <p className="mt-2 text-sm">Empowering HER Transformation.</p>
            <div className="flex justify-center space-x-6 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/leslivefit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border-2 border-subtle-sage-dark rounded-full text-soft-beige hover:border-accent-pink hover:text-accent-pink transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5zM12 15a3 3 0 100-6 3 3 0 000 6zM17.5 6.5h.01"
                  ></path>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@leslivefit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border-2 border-subtle-sage-dark rounded-full text-soft-beige hover:border-accent-pink hover:text-accent-pink transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h-3v-4.5a3.5 3.5 0 10-7 0V20H4V10a2 2 0 012-2h3V6.5A5.5 5.5 0 0115 1H9a8 8 0 00-8 8v11h3V10h4z"
                  ></path>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:leslivefitcollabs@gmail.com"
                className="flex items-center justify-center w-10 h-10 border-2 border-subtle-sage-dark rounded-full text-soft-beige hover:border-accent-pink hover:text-accent-pink transition-colors"
                aria-label="Email us"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </a>
            </div>
          </footer>

          {/* Signup Modal */}
          <Modal
            isOpen={isSignupModalOpen}
            onClose={closeSignupModal}
            title={showSignupSuccess ? "¡Felicidades!" : "Únete a HER BOOTYCAMP"}
          >
            {showSignupSuccess ? (
              <div className="text-center py-8">
                <p className="text-6xl mb-6">🍑</p>
                <h3 className="font-accent text-3xl italic text-soft-beige mb-4">
                  ¡Increíble! Tu viaje hacia una tú más fuerte y confiada ha comenzado.
                </h3>
                <p className="text-lg text-soft-beige">
                  ¡Prepárate para brillar!
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSignupSubmit({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    whatsappNumber: formData.get('whatsappNumber') as string, // Capture new field
                    goal: formData.get('goal') as string, // Capture new field
                  });
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-soft-beige text-lg font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full p-3 bg-light-sage border border-subtle-sage-dark rounded-md text-soft-beige focus:ring-accent-pink focus:border-accent-pink"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-soft-beige text-lg font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-3 bg-light-sage border border-subtle-sage-dark rounded-md text-soft-beige focus:ring-accent-pink focus:border-accent-pink"
                    placeholder="jane.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="whatsappNumber" className="block text-soft-beige text-lg font-semibold mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    required
                    className="w-full p-3 bg-light-sage border border-subtle-sage-dark rounded-md text-soft-beige focus:ring-accent-pink focus:border-accent-pink"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label htmlFor="goal" className="block text-soft-beige text-lg font-semibold mb-2">
                    What do you want to achieve in this course?
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    rows={4}
                    required
                    className="w-full p-3 bg-light-sage border border-subtle-sage-dark rounded-md text-soft-beige focus:ring-accent-pink focus:border-accent-pink"
                    placeholder="e.g., Build stronger glutes, gain confidence, tone my body..."
                  ></textarea>
                </div>
                <div className="pt-4 text-center">
                  <Button type="submit" variant="primary" onClick={() => {}}>
                    ¡Lista para esto!
                  </Button>
                </div>
              </form>
            )}
          </Modal>

          {/* Floating CTA Button */}
          <FloatingCTA onOpenSignup={openSignupModal} />

          {/* Floating Chat Button */}
          <FloatingChatButton onToggleChat={toggleChat} isChatOpen={isChatOpen} />

          {/* Chat Container (visible when isChatOpen is true) */}
          <ChatContainer isOpen={isChatOpen} onClose={closeChat} />
        </>
      )}
    </div>
  );
};

export default App;
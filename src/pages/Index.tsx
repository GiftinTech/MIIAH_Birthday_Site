
import React, { useState, useEffect } from 'react';
import { BirthdayGate } from '@/components/BirthdayGate';
import { Header } from '@/components/Header';
import { BirthdayPlayer } from '@/components/BirthdayPlayer';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Games } from '@/components/Games';
import { WishesSection } from '@/components/WishesSection';
import { SocialFollow } from '@/components/SocialFollow';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGlitter, setShowGlitter] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    
    // Hide glitter after 5 seconds
    setTimeout(() => {
      setShowGlitter(false);
    }, 5000);
  }, []);

  return (
    <BirthdayGate>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-champagne relative">
        {/* Glitter Animation */}
        {showGlitter && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {/* Magazine Header */}
        <Header />
        
        {/* Hero Section */}
        <section className={`relative py-20 px-4 text-center transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-navy mb-6 decorative-line">
              Happy Birthday MIIAH! 🎂
            </h1>
            {/* MIIAH's Photo */}
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                alt="MIIAH" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-gold shadow-2xl"
              />
            </div>
            
            <p className="font-cormorant text-2xl md:text-3xl text-charcoal mb-12 max-w-3xl mx-auto">
              Celebrating the most creative fashion designer and dearest friend
            </p>
            
            {/* Birthday Message */}
            <div className="bg-gradient-gold rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
              <h2 className="font-playfair text-3xl font-semibold text-navy mb-4">
                🎉 IT'S YOUR BIRTHDAY! 🎉
              </h2>
              <p className="font-cormorant text-xl text-charcoal">
                Wishing you the most wonderful day filled with joy and happiness!
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 opacity-20">
            <div className="w-full h-full border-2 border-gold rotate-45"></div>
          </div>
          <div className="absolute bottom-10 right-10 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-gold rounded-full animate-float"></div>
          </div>
        </section>

        {/* Birthday Song Player */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-navy mb-8">
              Birthday Serenade for MIIAH
            </h2>
            <BirthdayPlayer autoPlay={true} />
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-20 px-4 bg-gradient-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-navy mb-16">
              Memories with MIIAH
            </h2>
            <PhotoGallery />
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-navy mb-16">
              Fun Games for MIIAH's Day
            </h2>
            <Games />
          </div>
        </section>

        {/* Birthday Wishes */}
        <section className="py-20 px-4 bg-gradient-gold">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-navy mb-16">
              Birthday Wishes for MIIAH
            </h2>
            <WishesSection />
          </div>
        </section>

        {/* Social Media Follow */}
        <SocialFollow />

        {/* Footer */}
        <Footer />
      </div>
    </BirthdayGate>
  );
};

export default Index;

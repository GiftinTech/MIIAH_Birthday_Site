import React, { useState, useEffect } from "react";
import { BirthdayGate } from "@/components/BirthdayGate";
import { Header } from "@/components/Header";
import { BirthdayPlayer } from "@/components/BirthdayPlayer";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Games } from "@/components/Games";
import { WishesSection } from "@/components/WishesSection";
import { SocialFollow } from "@/components/SocialFollow";
import { Footer } from "@/components/Footer";

import couchShot from "../assets/images/couchshot.jpg";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Example state

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <BirthdayGate>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-champagne relative">
        {/* Magazine Header */}
        <Header />

        {/* Hero Section - Updated for Magazine Look */}
        <section
          className={`relative py-12 px-4 text-center transition-all duration-1000 ${
            isLoaded ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-navy mb-6 decorative-line">
              Happy Birthday MIIAH!
            </h1>

            {/* Magazine-style layout for image and main text */}
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 mb-12">
              {/* MIIAH's Photo - Magazine style */}
              <div className="mb-8 md:mb-0 md:flex-shrink-0 md:w-1/2 lg:w-2/5">
                {" "}
                {/* Added width classes for control */}
                <img
                  src={couchShot}
                  alt="MIIAH, The Fashion Designer"
                  className="w-full h-auto max-h-[450px] object-cover object-center rounded-lg shadow-2xl border border-gold/30"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              <div className="md:flex-grow text-center md:text-left md:w-1/2 lg:w-3/5">
                {" "}
                {/* Added width classes for control */}
                <p className="font-cormorant text-2xl md:text-3xl text-charcoal leading-relaxed mb-6">
                  Celebrating the most creative fashion designer and dearest
                  friend, whose boundless talent and heartwarming presence
                  enrich our lives every day. May your special day be as vibrant
                  and inspiring as you!
                </p>
                <p className="font-playfair text-xl text-gold font-semibold italic">
                  — With love from all of us
                </p>
              </div>
            </div>

            {/* Birthday Message - remains centered below */}
            <div className="bg-gradient-gold rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto text-center">
              <h2 className="font-playfair text-3xl font-semibold text-navy mb-4">
                🎉 IT'S YOUR BIRTHDAY! 🎉
              </h2>
              <p className="font-cormorant text-xl text-charcoal">
                Wishing you the most wonderful day filled with joy and
                happiness!
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 opacity-20 hidden md:block">
            {" "}
            {/* Hidden on small screens */}
            <div className="w-full h-full border-2 border-gold rotate-45"></div>
          </div>
          <div className="absolute bottom-10 right-10 w-16 h-16 opacity-20 hidden md:block">
            {" "}
            {/* Hidden on small screens */}
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

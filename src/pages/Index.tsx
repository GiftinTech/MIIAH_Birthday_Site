import React, { Suspense, lazy } from "react";
import { BirthdayGate } from "@/components/BirthdayGate";
import { Header } from "@/components/Header";

import couchShot from "@/assets/images/couchshot.jpg";
import gif4 from "@/assets/gif/winnie-the-pooh.gif";

import floorImg from "@/assets/images/floorImg.jpg";

// Lazy load all section components
const LazyBirthdayPlayer = lazy(() => import("@/components/BirthdayPlayer"));
const LazyPhotoGallery = lazy(() => import("@/components/PhotoGallery"));
const LazyGames = lazy(() => import("@/components/Games"));
const LazyWishesSection = lazy(() => import("@/components/WishesSection"));
const LazySocialFollow = lazy(() => import("@/components/SocialFollow"));
const LazyFooter = lazy(() => import("@/components/Footer"));

// Simple Loading Fallback Component
const SectionLoadingFallback = () => (
  <div className="flex justify-center items-center py-20 min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gold"></div>
    <p className="ml-4 font-cormorant text-lg text-charcoal">
      Loading section...
    </p>
  </div>
);

const Index = () => {
  const headingText = "Happy Birthday MIIAH!";

  return (
    <BirthdayGate>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-champagne relative overflow-hidden">
        <Header />

        {/* Hero Section */}
        <section
          className={`relative py-12 px-4 text-center transition-all duration-1000 animate-fade-in`}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-navy mb-6 decorative-line text-center">
              {headingText.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-char-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:space-x-8 mb-12">
              <div className="mb-8 md:mb-0 md:flex-shrink-0 md:w-1/2 lg:w-2/5">
                <img
                  src={couchShot}
                  alt="MIIAH, The Fashion Designer"
                  className="w-full h-auto max-h-[450px] object-cover object-center rounded-lg shadow-2xl border border-gold/30"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              <div className="md:flex-grow text-center md:text-left md:w-1/2 lg:w-3/5">
                <p className="font-cormorant text-2xl md:text-3xl text-charcoal leading-relaxed mb-6">
                  Celebrating the most creative fashion designer and dearest
                  friend, whose boundless talent and heartwarming presence
                  enrich our lives every day. May your special day be as vibrant
                  and inspiring as you!
                </p>
                <p className="font-playfair text-xl text-gold font-semibold italic">
                  — With love from Gifty
                </p>
              </div>
            </div>
            <div className="absolute top-50 md:top-0 right-0 z-0 w-[20%] h-[20%]">
              <img src={gif4} alt="Dancing Pooh" />
            </div>

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

          <div className="absolute top-10 left-10 w-20 h-20 opacity-20 hidden md:block">
            <div className="w-full h-full border-2 border-gold rotate-45"></div>
          </div>
          <div className="absolute bottom-10 right-10 w-16 h-16 opacity-20 hidden md:block">
            <div className="w-full h-full bg-gold rounded-full animate-float"></div>
          </div>
        </section>

        {/* Birthday Song Player - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <section className="relative  py-16 px-2 sm:px-4 bg-white">
            <div className="z-10 relative max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-navy mb-8">
                Birthday Serenade for MIIAH
              </h2>
              <LazyBirthdayPlayer autoPlay={true} />
            </div>
            <div className="absolute top-0 md:top-40 left-0 z-0 w-[20%] h-[20%]">
              <img src={gif4} alt="Dancing Pooh" />
            </div>
          </section>
        </Suspense>

        {/* Photo Gallery - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <section className="py-20 px-4 bg-gradient-cream">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-navy mb-16">
                Memories with MIIAH
              </h2>
              <LazyPhotoGallery />
            </div>
          </section>
        </Suspense>

        {/* Games Section - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-center text-navy mb-16">
                Fun Games for MIIAH's Day
              </h2>
              <LazyGames />
            </div>
          </section>
        </Suspense>

        {/* Birthday Wishes - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <section className="sm:py-20 py-10  bg-gradient-gold">
            <h2 className="font-playfair text-4xl mb-10 md:text-5xl font-semibold text-center text-navy">
              Birthday Wishes for MIIAH
            </h2>
            <div className="w-[100vw] mb-16 sm:absolute sm:top-50 sm:right-0">
              <img
                src={floorImg}
                className="w-[100vw] h-[580px] lg:h-[600px]"
                alt="An image of MIIAH."
              />
            </div>
            <div className="max-w-4xl px-4 mx-auto">
              <LazyWishesSection />
            </div>
          </section>
        </Suspense>

        {/* Social Media Follow - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <LazySocialFollow />
        </Suspense>

        {/* Footer - Lazy Loaded */}
        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyFooter />
        </Suspense>
      </div>
    </BirthdayGate>
  );
};

export default Index;

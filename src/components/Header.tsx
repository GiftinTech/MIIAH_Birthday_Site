import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, Heart, Sparkles } from "lucide-react";

// Import your GIF files here
import gif1 from "@/assets/gif/pooh-sparkle.gif";
import gif2 from "@/assets/gif/winnie-the-pooh-i-love-you.gif";
import gif3 from "@/assets/gif/winnie-the-pooh-tigger.gif";

// Define the type for GIF objects
interface GifPosition {
  id: number;
  url: string;
  top: string;
  left: string;
  size: string;
}

export const Header = () => {
  // Memoize GIF URLs to prevent re-creation on every render
  const memoizedGifUrls = useMemo(() => [gif1, gif2, gif3], []);

  // State to hold currently active GIFs
  const [activeGifs, setActiveGifs] = useState<GifPosition[]>([]);

  // Callback to generate a random GIF with random position and size
  const generateRandomGif = useCallback(() => {
    const randomUrl =
      memoizedGifUrls[Math.floor(Math.random() * memoizedGifUrls.length)];
    // Position GIFs across the entire viewport
    const randomTop = `${Math.random() * 100}vh`;
    const randomLeft = `${Math.random() * 100}vw`;
    const randomSize = `${Math.random() * 80 + 50}px`;

    return {
      id: Date.now() + Math.random(), // Unique ID for React key
      url: randomUrl,
      top: randomTop,
      left: randomLeft,
      size: randomSize,
    };
  }, [memoizedGifUrls]);

  // Effect to manage GIF generation
  useEffect(() => {
    // Start generating random GIFs when the Header component mounts
    const gifGenerationInterval = setInterval(() => {
      setActiveGifs((prevGifs) => {
        // Keep a maximum number of GIFs on screen (e.g., 5)
        const newGifs = [...prevGifs.slice(-3), generateRandomGif()];
        return newGifs;
      });
    }, 1000); // Generate a new GIF every second

    return () => {
      clearInterval(gifGenerationInterval);
      setActiveGifs([]);
    };
  }, [generateRandomGif]);

  return (
    <header className="relative bg-white border-b-2 border-gold py-6 px-4 overflow-hidden">
      {/* Render the active GIFs */}
      {activeGifs.map((gif) => (
        <img
          key={gif.id}
          src={gif.url}
          alt="Birthday GIF"
          // absolute positioning relative to the header
          // z-index: 0 to be behind header content but still visible
          className="absolute z-0 rounded-lg shadow-lg"
          style={{
            top: gif.top,
            left: gif.left,
            width: gif.size,
            height: gif.size,
            objectFit: "contain",
            // Center the GIF on its random point
            transform: "translate(-50%, -50%)",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none"; // Hide broken images
            console.error("GIF failed to load:", gif.url);
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {" "}
        {/* z-index: 10 to be above GIFs */}
        {/* Magazine Masthead */}
        <div className="text-center mb-4">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-navy mb-2">
            EVERYTHING MIIAH
          </h1>
          <div className="flex items-center justify-center space-x-4 text-charcoal">
            <div className="h-px bg-gold w-16"></div>
            <p className="font-cormorant text-lg tracking-wider">
              A SPECIAL EDITION
            </p>
            <div className="h-px bg-gold w-16"></div>
          </div>
        </div>
        {/* Navigation Bar */}
        <nav className="flex justify-center flex-wrap gap-3 sm:gap-0 items-center space-x-8 text-sm font-inter font-medium text-charcoal">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gold transition-colors">
            <Calendar className="w-4 h-4" />
            <span>JULY 19TH SPECIAL</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gold transition-colors">
            <Heart className="w-4 h-4" />
            <span>FASHION & STYLE</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gold transition-colors">
            <Sparkles className="w-4 h-4" />
            <span>CELEBRATIONS</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

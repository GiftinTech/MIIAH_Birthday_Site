
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BirthdayPlayerProps {
  autoPlay?: boolean;
}

export const BirthdayPlayer = ({ autoPlay = false }: BirthdayPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay) {
      // Auto-start playing on birthday
      console.log('🎵 Auto-playing Happy Birthday song! 🎵');
      setIsPlaying(true);
      // Simulate song ending after 30 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 30000);
    }
  }, [autoPlay]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Since we can't use actual audio files, we'll simulate the experience
        console.log('🎵 Playing Happy Birthday song! 🎵');
        setIsPlaying(true);
        setTimeout(() => {
          setIsPlaying(false);
        }, 30000); // Simulate 30 second song
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-cream to-champagne rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto border border-gold/30">
        <div className="text-center mb-8">
          <Music className="w-12 h-12 text-gold mx-auto mb-4 animate-float" />
          <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">
            A Special Birthday Song
          </h3>
          <p className="font-cormorant text-lg text-charcoal">
            Dedicated to the most elegant soul we know
          </p>
        </div>

        {/* Simulated Audio Player */}
        <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-6">
            <Button
              onClick={handlePlayPause}
              className="bg-gold hover:bg-gold/80 text-navy rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter text-sm text-charcoal">
                  {isPlaying ? "🎵 Now Playing..." : "Happy Birthday Song"}
                </span>
                <Volume2 className="w-4 h-4 text-charcoal" />
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gold h-2 rounded-full transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    width: isPlaying ? '45%' : '0%',
                    transition: isPlaying ? 'width 30s linear' : 'width 0.3s'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {isPlaying && (
            <div className="mt-6 text-center">
              <p className="font-cormorant text-lg text-charcoal animate-fade-in">
                🎶 "May this year bring you endless style and happiness" 🎶
              </p>
            </div>
          )}
        </div>

        {/* Musical Notes Animation */}
        {isPlaying && (
          <div className="flex justify-center mt-6 space-x-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-gold text-2xl animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              >
                ♪
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

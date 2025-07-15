import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BirthdayPlayerProps {
  autoPlay?: boolean;
}

const BirthdayPlayer = ({ autoPlay = false }: BirthdayPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Helper function to format time for display (e.g., 0:00)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Memoized event handlers using useCallback
  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0); // Reset current time when song ends
  }, []);

  const handlePlaySuccess = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePauseSuccess = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handlePlayError = useCallback((error: Event) => {
    setIsPlaying(false);
    console.error("Audio playback error:", error);
    alert(
      "Autoplay was prevented by the browser or there was an audio issue. Please click the play button."
    );
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // Effect for setting up and tearing down audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;

      audio.addEventListener("ended", handleAudioEnded);
      audio.addEventListener("play", handlePlaySuccess);
      audio.addEventListener("pause", handlePauseSuccess); // Listen for explicit pause
      audio.addEventListener("error", handlePlayError);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      if (autoPlay) {
        audio.play().catch((error) => {
          console.error("Autoplay failed:", error);
          // Only show alert if user hasn't already interacted
          if (!localStorage.getItem("userInteractedWithAudio")) {
            alert(
              "Autoplay was prevented by the browser. Please click the play button to start the music!"
            );
          }
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnded);
        audio.removeEventListener("play", handlePlaySuccess);
        audio.removeEventListener("pause", handlePauseSuccess);
        audio.removeEventListener("error", handlePlayError);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [
    autoPlay,
    volume,
    handleAudioEnded,
    handlePlaySuccess,
    handlePauseSuccess,
    handlePlayError,
    handleTimeUpdate,
    handleLoadedMetadata,
  ]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Manual play failed:", error);
          alert("Failed to play audio. Your browser might have restrictions.");
        });
      }
      localStorage.setItem("userInteractedWithAudio", "true"); // Mark user interaction
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime); // Update state for immediate UI feedback
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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

        {/* Actual Audio Element */}
        {/* Changed preload to 'metadata' to load duration faster without full audio */}
        <audio
          ref={audioRef}
          src="/happy-birthday-357371.mp3"
          preload="metadata"
        />

        {/* Audio Player UI */}
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
                  {isPlaying
                    ? "🎵 Now Playing: Happy Birthday!"
                    : "Happy Birthday Song"}
                </span>
                <Volume2 className="w-4 h-4 text-charcoal" />
              </div>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-gold"
              />

              {/* Progress Bar with Current Time and Duration */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 relative">
                <input
                  type="range"
                  min="0"
                  max={duration || 0} // Ensure max is not NaN
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute top-0 left-0 w-full h-full bg-transparent appearance-none cursor-pointer z-10"
                  style={
                    {
                      // Custom track styles for accurate progress visualization
                      background: `linear-gradient(to right, var(--tw-accent-gold) ${progressPercentage}%, #d1d5db ${progressPercentage}%)`,
                      "--tw-accent-gold": "var(--color-gold, #FFD700)", // Define custom property if needed, or replace directly
                      borderRadius: "9999px", // full rounded
                    } as React.CSSProperties
                  } // Cast to CSSProperties to allow custom properties
                />
              </div>

              <div className="flex justify-between text-xs font-inter text-charcoal/70 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
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

        {isPlaying && (
          <div className="flex justify-center mt-6 space-x-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-gold text-2xl animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
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

export default BirthdayPlayer;

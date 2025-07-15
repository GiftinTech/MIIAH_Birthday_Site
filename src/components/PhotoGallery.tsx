import React, { useState } from "react";
import { Camera, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import artWork from "../assets/images/art.jpg";
import braidShot from "../assets/images/braidshot.jpg";
import newYearsShot from "../assets/images/newyearsshot.jpg";
import staircaseShot from "../assets/images/staircaseshot.jpg";

export const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Personal memory photos
  const photos = [
    {
      url: artWork,
      caption: "That perfect day when we couldn't stop laughing",
      title: "Best Friends Forever",
    },
    {
      url: braidShot,
      caption: "Coffee dates and heart-to-heart conversations",
      title: "Our Coffee Moments",
    },
    {
      url: staircaseShot,
      caption: "Exploring new places and making memories",
      title: "Adventure Buddies",
    },
    {
      url: newYearsShot,
      caption: "Those spontaneous trips that became our best stories",
      title: "Memory Lane",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="animate-fade-in">
      {/* Main Gallery */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
        <div className="relative h-96 md:h-[500px]">
          <img
            src={photos[currentSlide].url + "?w=1200&h=500&fit=crop"}
            alt={photos[currentSlide].caption}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-playfair text-2xl md:text-3xl font-semibold mb-2">
                {photos[currentSlide].title}
              </h3>
              <p className="font-cormorant text-lg md:text-xl">
                {photos[currentSlide].caption}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-12 h-12 p-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-12 h-12 p-0"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center py-6 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gold scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 ${
              index === currentSlide ? "ring-4 ring-gold" : ""
            }`}
          >
            <img
              src={photo.url + "?w=300&h=200&fit=crop"}
              alt={photo.caption}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-white" />
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Memory Quote */}
      <div className="text-center mt-12">
        <div className="bg-gradient-gold rounded-2xl p-8 max-w-2xl mx-auto">
          <blockquote className="font-cormorant text-2xl md:text-3xl text-navy italic mb-4">
            "Every photo tells a story of friendship, laughter, and
            unforgettable moments with you"
          </blockquote>
          <div className="flex items-center justify-center space-x-2 text-charcoal">
            <Heart className="w-5 h-5 text-gold" />
            <span className="font-inter text-sm">With Love & Memories</span>
            <Heart className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

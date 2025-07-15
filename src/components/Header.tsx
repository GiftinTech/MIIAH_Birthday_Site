import { Calendar, Heart, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white border-b-2 border-gold py-6 px-4">
      <div className="max-w-7xl mx-auto">
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

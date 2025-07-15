import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Sparkles,
  Award,
  RefreshCw,
  Gift,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Games = () => {
  const [currentGame, setCurrentGame] = useState("quiz");
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [surpriseCards, setSurpriseCards] = useState<
    Array<{
      id: number;
      flipped: boolean;
      type: "buy" | "do";
      item: string;
      price?: string;
      emoji: string;
    }>
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [revealedSurprise, setRevealedSurprise] = useState<number | null>(null);

  // MIIAH's Personality Quiz Questions - Updated for multiple correct answers
  const quizQuestions = [
    {
      question: "It's Friday night, what would MIIAH choose to do?",
      options: [
        "Out having fun",
        "Netflix, snacks and Anime",
        "Video call with friends while sewing",
      ],
      correct: [1, 2],
    },
    {
      question: "What was the colour of MIIAH's Convocation dress",
      options: ["Blue", "Black", "White"],
      correct: [1],
    },
    {
      question: "When is MIIAH launching her collection?",
      options: ["On Christmas Day", "19th July, 2025", "Next month"],
      correct: [1],
    },
    {
      question: "When MIIAH gets stressed, she:",
      options: [
        "Reorganizes her workspace",
        "Sketches random designs",
        "Steps out to clear her head",
      ],
      correct: [1, 2],
    },
    {
      question: "MIIAH's perfect birthday gift would be:",
      options: [
        "Handmade item from a friend",
        "High-quality sewing supplies",
        "Surprise party with loved ones",
      ],
      correct: [0, 1, 2],
    },
    {
      question: "When MIIAH sees a badly designed outfit, she:",
      options: [
        "Mentally redesigns it",
        "Takes notes for what not to do",
        "Offers styling advice",
      ],
      correct: [0, 1],
    },
    {
      question:
        "If MIIAH wasn't a fashion designer, what career path might she have taken?",
      options: ["Dancer", "Chef", "Artist"],
      correct: [1, 2],
    },
    {
      question: "At a friend's party, MIIAH is most likely to:",
      options: [
        "Be the life of the party",
        "Help the host with everything",
        "Take candid photos of everyone",
      ],
      correct: [0, 1, 2],
    },
    {
      question: "When choosing an outfit, MIIAH prioritizes:",
      options: ["Comfort above all", "Latest trends", "Bold statement pieces"],
      correct: [0],
    },
    {
      question: "MIIAH's ideal creative space would have:",
      options: [
        "Minimalist white walls",
        "Colorful inspiration boards",
        "Vintage furniture and plants",
      ],
      correct: [0, 2],
    },
  ];

  const allSurpriseCardItems = [
    {
      type: "buy",
      item: "A bottle of wine for MIIAH",
      price: "₦10,000",
      emoji: "🍾",
    },
    { type: "buy", item: "Beautiful flowers", price: "₦10,800", emoji: "🌸" },
    {
      type: "buy",
      item: "Her favorite chocolate",
      price: "₦10,200",
      emoji: "🍫",
    },
    {
      type: "buy",
      item: "Cute stickers for her planner",
      price: "₦5,200",
      emoji: "✨",
    },
    { type: "buy", item: "Nice scented candle", price: "₦10,000", emoji: "🕯️" },
    { type: "buy", item: "Pretty bookmark", price: "₦4,600", emoji: "🔖" },
    { type: "buy", item: "Artisan tea blend", price: "₦5,000", emoji: "🍵" },
    {
      type: "buy",
      item: "Small succulent plant",
      price: "₦8,400",
      emoji: "🌵",
    },
    { type: "buy", item: "Designer notebook", price: "₦8,200", emoji: "📔" },
    { type: "buy", item: "Silk hair scrunchie", price: "₦3,600", emoji: "🎀" },
    { type: "buy", item: "Artisan soap bar", price: "₦5,000", emoji: "🧼" },
    { type: "do", item: "Give MIIAH a big hug", emoji: "🤗" },
    { type: "do", item: "Tell her your favorite memory together", emoji: "💕" },
    { type: "do", item: "Compliment her latest design", emoji: "👗" },
    { type: "do", item: "Send her a funny meme", emoji: "😂" },
    { type: "do", item: "Write her a heartfelt note", emoji: "💌" },
    { type: "do", item: "Sing happy birthday to her", emoji: "🎵" },
    { type: "do", item: "Share an old photo together", emoji: "📸" },
    { type: "do", item: "Tell her how proud you are", emoji: "🌟" },
    { type: "do", item: "Plan a brunch date with her", emoji: "☕" },
    { type: "do", item: "Ask about her current projects", emoji: "✂️" },
  ];

  const initializeSurpriseGame = () => {
    const cards = [...allSurpriseCardItems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16)
      .map((item, index) => ({
        id: index,
        flipped: false,
        type: item.type as "buy" | "do",
        item: item.item,
        price: item.price,
        emoji: item.emoji,
      }));
    setSurpriseCards(cards);
    setFlippedCards([]);
    setTotalSpent(0);
    setRevealedSurprise(null);
  };

  const handleSurpriseCardClick = (cardId: number) => {
    if (surpriseCards[cardId].flipped || revealedSurprise !== null) return;

    const newCards = [...surpriseCards];
    newCards[cardId].flipped = true;
    setSurpriseCards(newCards);
    setRevealedSurprise(cardId);

    if (newCards[cardId].type === "buy" && newCards[cardId].price) {
      const price = parseInt(
        newCards[cardId].price!.replace("₦", "").replace(",", "")
      );
      setTotalSpent((prev) => prev + price);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    // Check if the selected answer is one of the correct options for the current question
    if (quizQuestions[currentQuestion].correct.includes(answerIndex)) {
      setQuizScore((prev) => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowResult(false);
  };

  useEffect(() => {
    if (currentGame === "surprise") {
      initializeSurpriseGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGame]);

  return (
    <div className="animate-fade-in">
      {/* Game Selection */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-2xl p-2 shadow-lg flex space-x-2">
          <Button
            onClick={() => setCurrentGame("quiz")}
            className={`px-6 py-3 rounded-xl transition-all ${
              currentGame === "quiz"
                ? "bg-gold text-navy shadow-md"
                : "bg-transparent text-charcoal hover:bg-gold/20"
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Personality Quiz
          </Button>
          <Button
            onClick={() => setCurrentGame("surprise")}
            className={`px-6 py-3 rounded-xl transition-all ${
              currentGame === "surprise"
                ? "bg-gold text-navy shadow-md"
                : "bg-transparent text-charcoal hover:bg-gold/20"
            }`}
          >
            <Gift className="w-4 h-4 mr-2" />
            Surprise Cards
          </Button>
        </div>
      </div>

      {/* MIIAH's Personality Quiz Game */}
      {currentGame === "quiz" && (
        <Card className="max-w-2xl mx-auto shadow-2xl border-gold/20">
          <CardContent className="p-8">
            {!showResult ? (
              <div className="animate-slide-in-left">
                <div className="text-center mb-8">
                  <Gamepad2 className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">
                    How Well Do You Know MIIAH?
                  </h3>
                  <p className="font-cormorant text-lg text-charcoal">
                    Test your knowledge of her personality!
                  </p>
                  <div className="mt-4 text-sm text-charcoal">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-cormorant text-xl text-navy mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h4>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className="w-full text-left justify-start p-4 bg-cream hover:bg-gold/20 text-charcoal border border-gold/20 rounded-xl transition-all hover:scale-105"
                        >
                          {option}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center animate-scale-in">
                <Award className="w-16 h-16 text-gold mx-auto mb-6" />
                <h3 className="font-playfair text-3xl font-semibold text-navy mb-4">
                  Quiz Complete!
                </h3>
                <div className="bg-gradient-gold rounded-2xl p-6 mb-6">
                  <p className="font-cormorant text-2xl text-navy mb-2">
                    Your Score: {quizScore}/{quizQuestions.length}
                  </p>
                  <p className="text-charcoal">
                    {quizScore >= 8
                      ? "Perfect! You know MIIAH incredibly well! 🎉"
                      : quizScore >= 6
                      ? "Great job! You're a wonderful friend! ✨"
                      : quizScore >= 4
                      ? "Good effort! You know her pretty well! 💕"
                      : "Time to spend more quality time with MIIAH! 💖"}
                  </p>
                </div>
                <Button
                  onClick={resetQuiz}
                  className="bg-gold hover:bg-gold/80 text-navy px-6 py-3 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Surprise Cards Game */}
      {currentGame === "surprise" && (
        <Card className="max-w-4xl mx-auto shadow-2xl border-gold/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Gift className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">
                Surprise Cards for MIIAH
              </h3>
              <p className="font-cormorant text-lg text-charcoal mb-4">
                Flip cards to reveal sweet gestures or affordable gifts!{" "}
                {revealedSurprise === null ? "Choose one to reveal." : ""}
              </p>
              <div className="text-sm text-charcoal flex items-center justify-center gap-4">
                <span>
                  Cards Revealed:{" "}
                  {surpriseCards.filter((card) => card.flipped).length}/1
                </span>
                {totalSpent > 0 && (
                  <span className="flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Total: ₦{totalSpent.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
              {surpriseCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleSurpriseCardClick(card.id)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 p-2 ${
                    card.flipped
                      ? card.type === "buy"
                        ? "bg-gold shadow-lg text-navy"
                        : "bg-gradient-cream shadow-lg text-navy"
                      : revealedSurprise === null
                      ? "bg-white shadow-md hover:bg-gold/20 text-charcoal cursor-pointer hover:scale-105"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {card.flipped ? (
                    <div className="text-center">
                      <div className="text-lg mb-1">{card.emoji}</div>
                      <div className="text-xs font-cormorant leading-tight">
                        {card.item}
                      </div>
                      {card.price && (
                        <div className="text-xs font-bold mt-1">
                          {card.price}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xl">🎁</div>
                  )}
                </div>
              ))}
            </div>

            {revealedSurprise !== null && (
              <div className="text-center animate-scale-in">
                <p className="font-cormorant text-2xl text-gold mb-4">
                  🎉 Surprise revealed! 🎉
                </p>
                <p className="text-charcoal mb-4">
                  {totalSpent > 0
                    ? `You've planned a sweet gesture worth ₦${totalSpent.toLocaleString()}!`
                    : "You've planned a beautiful gesture for MIIAH!"}
                </p>
                <Button
                  onClick={initializeSurpriseGame}
                  className="bg-gold hover:bg-gold/80 text-navy px-6 py-3 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reveal Another Surprise
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Games;

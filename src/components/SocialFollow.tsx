import React from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SocialFollow = () => {
  const socialAccounts = [
    {
      name: "MIIAH Couture",
      handle: "@miiahcouture._",
      description: "High-end fashion designs and couture pieces",
      link: "https://www.instagram.com/miiahcouture._?igsh=MWhoeml2ZmR6MjR4MQ==",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      name: "MIIAH Surprises",
      handle: "@miiahsurprises._",
      description: "Creative gift ideas and surprise planning",
      link: "https://www.instagram.com/miiahsurprises._?igsh=MWc2MXV6azJ0YTlpNw==",
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-cream">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-navy mb-4">
          Follow MIIAH's Journey
        </h2>
        <p className="font-cormorant text-xl text-charcoal mb-12">
          Stay connected with her amazing business ventures
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {socialAccounts.map((account, index) => (
            <Card
              key={index}
              className="shadow-2xl border-gold/20 overflow-hidden"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 rounded-full ${account.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <Instagram className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">
                  {account.name}
                </h3>
                <p className="text-gold font-medium mb-3">{account.handle}</p>
                <p className="font-cormorant text-charcoal mb-6">
                  {account.description}
                </p>

                <Button
                  onClick={() => window.open(account.link, "_blank")}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all hover:scale-105"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Follow on Instagram
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gold/20">
          <p className="font-cormorant text-lg text-navy">
            ✨ Support MIIAH's creative businesses and be part of her
            entrepreneurial journey! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  number: string;
  description: string;
}

const cardData: CardData[] = [
  { id: 1, number: "100+", description: "Years of Excellence in Real Estate Development" },
  { id: 2, number: "50K+", description: "Satisfied Customers Across the Globe" },
  { id: 3, number: "200+", description: "Award-Winning Projects Completed" },
  { id: 4, number: "25+", description: "Countries with Our Presence" }
];

const Group = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-container",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    cardsRef.current.forEach((card, index) => {
      tl.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2
      }, index * 0.1);
    });
  }, []);

  return (
    <div className="relative mb-[10%]">
      {/* Hero Image Container */}
      <div className="relative h-[100%]  w-full ">
        <img
          src="/img/b2.png"
          alt="Hero"
          className="w-full h-[700px] scale-x-[1.3] object-contain object-center"
        />


        <div className="absolute bottom-0 transform translate-y-[80px] justify-self-center flex w-[100%]  -mt-32 px-4  mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={card.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="backdrop-blur-xl bg-gray-900/40 p-8 rounded-xl
                border border-gray-900/20 shadow-2xl transform 
                transition-all duration-300 hover:bg-white/20
                hover:scale-105"
            >
              <h3 className="text-4xl font-bold text-white mb-4">
                {card.number}
              </h3>
              <p className="text-white/90 text-sm font-medium">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Cards Grid */}

    </div>
  );
};

export default Group;
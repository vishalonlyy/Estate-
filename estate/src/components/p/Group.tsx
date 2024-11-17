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
  { id: 1, number: "20+", description: "Years of Excellence in Real Estate Development" },
  { id: 2, number: "1000+", description: "Satisfied Customers Across the Globe" },
  { id: 3, number: "5+", description: "Award winnig projects completed" },
  { id: 4, number: "5+", description: "Cities with our presence" }
];


const Group = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-container",
        start: "top bottom-=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Set initial state for all cards
    gsap.set(cardsRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9
    });

    // Animate each card with stagger
    cardsRef.current.forEach((card, index) => {
      tl.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.15 // Staggered delay
      }, index * 0.2); // Staggered start time
    });

  }, []);

   return (
    <div className="relative mb-[10%]">
                    <div id="about" className="about-section  relative md:max-w-7xl mx-auto px-4 py-16 sm:py-24 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-5 ">
              <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
          
            {/* Content container with glass effect */}
            <div className="relative backdrop-blur-sm  rounded-2xl 
            xxsm:p-0 xsm:p-0 p-8 sm:p-12  border-white/20">
              {/* Decorative icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
          
              <h2 className="about-title text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                About Us
              </h2>
          
              {/* Decorative line */}
              <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
          
              <p className="about-text text-base xxsm:text-sm sm:text-lg md:text-xl text-gray-700 xxsm:w-[100%] md:max-w-4xl mx-auto text-center leading-relaxed">
                Founded by a team of young and dynamic entrepreneurs with over <span className="font-semibold text-emerald-600">20 years</span> of combined experience, 
                our company is built on a foundation of <span className="font-semibold text-emerald-600">quality</span>, <span className="font-semibold text-emerald-600">trust</span>, and <span className="font-semibold text-emerald-600">commitment</span>. We bring a fresh 
                perspective to the real estate industry, combining innovative ideas with a deep understanding 
                of the market. Our focus is on delivering high-quality residential, commercial, and industrial 
                projects that meet the evolving needs of modern buyers and investors.
              </p>
            </div>
          </div>
      <div className="relative h-[100%] w-full">
        <img
          src="/img/b2.png"
          alt="Hero"
          className="w-full xxsm:h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] scale-x-[1.3] object-contain object-center"
        />
  
        <div className="cards-container absolute bottom-0 transform xxsm:translate-y-[90px] sm:translate-y-[60px] md:translate-y-[80px] w-full px-4 mx-auto z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 xxsm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {cardData.map((card, index) => (
                <div
                  key={card.id}
                  ref={el => { cardsRef.current[index] = el; }}
                  className="backdrop-blur-xl bg-gray-900/40 p-4 sm:p-6 md:p-8 rounded-xl
                  xxsm:scale-[0.9] sm:scale-[0.8] md:scale-[1] lg:scale-[1]
                    border border-gray-900/20 shadow-2xl transform 
                    transition-all duration-300 hover:bg-white/20
                    hover:scale-105"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                    {card.number}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Group;
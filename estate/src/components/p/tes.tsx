/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { UserRound } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  img: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Vishwajeet ",
    role: "Business Owner",
    content: "Reliable, visionary, and always on time",
    img : "/testi/t1.jpg",
  },
  {
    id: 2,
    name: "Shubham",
    role: "Data Scientist",
    content: "Exceptional quality, timely delivery, and a vision that transforms spaces – highly recommend for all your real estate needs!",
    img : "/testi/t2.jpg",
  },

  {
    id: 3,
    name: "Vivek",
    role: "Software Engineer",
    content: "Professional developers with on time possession",
    img : "/testi/t3.jpg",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".testimonial-card");
    
    gsap.set(cards, { opacity: 0, y: 50 });
    
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Hover animation for cards
    cards.forEach((card) => {
      gsap.to(card as any, {
        scale: 1,
        duration: 0.3,
        paused: true,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen xxsm:mt-[20%] md:mt-[0%] bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What our clients say!
          </h2>
          {/* <div className="max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
              Rera Details: The Project has been registered via UP-RERA registration number: UPRERAPRJ103248/16/2024,RERA Collection A/c No- 9260002900000019 TEAM SHAURYA INFRAZONE PVT LTD,PUNJAB NATIONAL BANK, 2C/116, VRINDAVAN YOJNA, RAEBAREILLY ROAD, LUCKNOW,IFSC Code - PUNB0926000 It is available on the website https://up-rera.in/ under registered projects.
            </p>
          </div> */}
        </div>
    
        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 
                transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                bg-blue-100 rounded-full mb-4 sm:mb-5 md:mb-6 mx-auto">
                {/* <UserRound className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" /> */}
              
                <img src={testimonial.img} alt="testimonial"
                 className="w-14 h-14 xxsm:w-10 xxsm:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full" />
              </div>
              <blockquote className="text-sm sm:text-base text-gray-700 text-center mb-4 sm:mb-5 md:mb-6">
              &quot;{testimonial.content}&quot;
              </blockquote>
              <div className="text-center">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}

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
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Developer",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "First-time Buyer",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What our clients say!</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Rera Details: The project has been registed via UP-RERA registration number UPRERAPRJ023248/16/2024.RERA collection
              A/c no-00000000000000 M/s(name),(bank name),(location),,FSC--00000000000000.It is available
              on the website https://000000.in/ under register projects.
            </p>
          </div>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                <UserRound className="w-8 h-8 text-blue-600" />
              </div>
              <blockquote className="text-gray-700 text-center mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}

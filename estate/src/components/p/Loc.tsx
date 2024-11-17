/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MapPin, ArrowRight } from 'lucide-react';
const Loc = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content animation
            gsap.from('.content > *', {
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
            // Button hover animation
            buttonRef.current?.addEventListener('mouseenter', () => {
                gsap.to(buttonRef.current, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to('.arrow', {
                    x: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            buttonRef.current?.addEventListener('mouseleave', () => {
                gsap.to(buttonRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to('.arrow', {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);
        return (
      <div ref={containerRef} className="max-w-8xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          <div className="w-full lg:w-[60%]">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0330127986156!2d80.9719289!3d26.7525181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ1JzA5LjEiTiA4MMKwNTgnMTkuMCJF!5e0!3m2!1sen!2sin!4v1635774149453"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  filter: 'grayscale(0.2)',
                  transform: 'scale(1)',
                  transition: 'transform 700ms'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="w-full lg:w-[40%] content space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 text-emerald-600">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Prime Location</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black">
              At The Heart of Modern Lucknow
            </h1>
            <p className="text-gray-600 leading-relaxed flex flex-col">
              <span className="flex items-center space-x-1">
                <span className="font-semibold">Hazratganj:</span>
                <span>9 kms</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="font-semibold">Charbagh Railway Station:</span>
                <span>12 kms</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="font-semibold">Gomti Nagar Railway Station:</span>
                <span>7 kms</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="font-semibold">Shaheed Path:</span>
                <span>1.5 kms</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="font-semibold">S.G.P.G.I.:</span>
                <span>1.5 kms</span>
              </span>
            </p>
            <button
              ref={buttonRef}
              className="group flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-3 
                  rounded-full hover:bg-emerald-700 transition-colors duration-300"
            >
              <span>View Location</span>
              <ArrowRight className="w-4 h-4 arrow transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
};
export default Loc;
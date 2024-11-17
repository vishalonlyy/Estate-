/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MapPin, ArrowRight } from 'lucide-react';
import Loc from './Loc';
// import Cos from './cos';
import CenterCarousel from './cos';
import Testimonials from './tes';

const C1 = () => {
  const images = [
    { id: 0, src: '/cos/a/1.jpg' },
    { id: 1, src: '/cos/a/2.jpg' },
    { id: 2, src: '/cos/a/3.jpg' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    gsap.set(slidesRef.current, {
      opacity: 0,
      scale: 1,
      display: 'none'
    });

    gsap.set(slidesRef.current[0], {
      opacity: 1,
      scale: 1,
      display: 'block'
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const distance = (x - startX);

    if (Math.abs(distance) > 100) {
      if (distance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const animateSlide = (next: number, direction: 'left' | 'right') => {
    const current = slidesRef.current[currentSlide];
    const nextSlide = slidesRef.current[next];
    
    const tl = gsap.timeline();
  
    // Simple crossfade animation
    tl.to(current, {
      opacity: 0,
      duration: 0.8,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.set(current, { 
          display: 'none'
        });
      }
    })
    .set(nextSlide, {
      display: 'block',
      opacity: 0
    })
    .to(nextSlide, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    });
  
    setCurrentSlide(next);
  };

  const handleNext = () => {
    const next = (currentSlide + 1) % images.length;
    animateSlide(next, 'left');
  };

  const handlePrev = () => {
    const next = (currentSlide - 1 + images.length) % images.length;
    animateSlide(next, 'right');
  };

  useEffect(() => {
    const delay = 10000;
    const interval = setInterval(handleNext, delay);
    return () => clearInterval(interval);
  }, [currentSlide]); // Add currentSlide as dependency

  return (
<div id="gallery"
  ref={containerRef} 
  className={`relative overflow-hidden w-full select-none
    h-[50vh] sm:h-screen
    aspect-[16/9] sm:aspect-auto
    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
>
  {/* Slides */}
  {images.map((image, index) => (
    <div
      key={image.id}
      ref={el => { slidesRef.current[index] = el }}
      className="absolute inset-0 w-full h-full"
    >
      <Image
        src={image.src}
        alt={`Slide ${index + 1}`}
        fill
        className="object-contain sm:object-cover" // Changed to contain on mobile
        priority={index === 0}
        draggable="false"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" /> */}
    </div>
  ))}
  
      <div className="absolute z-10 inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
  
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-1 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors 
                ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => animateSlide(index, index > currentSlide ? 'left' : 'right')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};





const Part = () => {
    return (
        <><C1 /><Loc /><CenterCarousel/>
        </>
    );
    }
export default Part;
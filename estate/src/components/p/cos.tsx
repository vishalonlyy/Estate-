'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CenterCarousel = () => {
  const images = [
    { id: 0, src: '/img/image.png' },
    { id: 1, src: '/img/image.png' },
    { id: 2, src: '/img/image.png' }
  ];
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateSlidesPosition = (current: number) => {
    const total = images.length;
    slidesRef.current.forEach((slide, index) => {
      let position: number;
      if (index === current) {
        position = 0;
      } else {
        const diff = index - current;
        const wrappedDiff = ((diff + total / 2) % total + total) % total - total / 2;
        position = wrappedDiff * 100;
      }

      gsap.to(slide, {
        x: `${position}%`,
        scale: index === current ? 1 : 0.8,
        opacity: index === current ? 1 : 0.5,
        zIndex: index === current ? 2 : 1,
        duration: 0.35,
        ease: 'power2.inOut'
      });
    });
  };

  useEffect(() => {
    updateSlidesPosition(currentSlide);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const currentX = e.pageX;
    const difference = startX - currentX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        animateSlides('right');
      } else {
        animateSlides('left');
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSlideClick = (index: number) => {
    if (index === currentSlide) return;
    const direction = index > currentSlide ? 'right' : 'left';
    animateSlides(direction, index);
  };

  const animateSlides = (direction: 'left' | 'right', targetIndex?: number) => {
    const total = images.length;
    let nextSlide;

    if (targetIndex !== undefined) {
      nextSlide = targetIndex;
    } else {
      if (direction === 'right') {
        nextSlide = (currentSlide + 1) % total;
      } else {
        nextSlide = (currentSlide - 1 + total) % total;
      }
    }

    updateSlidesPosition(nextSlide);
    setCurrentSlide(nextSlide);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={el => { slidesRef.current[index] = el; }}
            className={`absolute w-[80%] max-w-3xl aspect-video transition-all duration-300
              ${index !== currentSlide ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={() => handleSlideClick(index)}
          >
            <div className='relative'>
                <img
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-2xl shadow-gray-800"
                  draggable="false"
                />
                <div className="absolute bottom-0 left-0 -translate-x-[30%] translate-y-[80%]
                max-w-[300px]
                 p-6 backdrop-blur-lg bg-white rounded-xl 
                     border border-gray-900/20 shadow-lg transform transition-all duration-300
                     hover:bg-white/20" >
                    <h2 className="text-gray-500 text-2xl font-bold mb-2">Buy a House</h2>
                    <p className="text-gray-500 text-sm max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    </p>
                </div>

            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 rounded-lg" />
          </div>
        ))}
      </div>

      {/* <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10">
        <button
          onClick={() => animateSlides('left')}
          className="p-3 rounded-full bg-gray-900 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => animateSlides('right')}
          className="p-3 rounded-full bg-gray-900 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div> */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors 
                ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => handleSlideClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterCarousel;
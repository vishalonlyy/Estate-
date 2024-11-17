'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';


const CenterCarousel = () => {
  const images = [
    { id: 0, src: '/cos/b/1.jpg' },
    { id: 1, src: '/cos/b/2.jpg' },
    { id: 2, src: '/cos/b/3.jpg' },
    { id: 3, src: '/cos/b/4.jpg' },
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

  /**Chnage slide every 3 sec */
  useEffect(() => {
    const interval = setInterval(() => {
      animateSlides('right');
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);
    

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
      ref={containerRef} id="gallery"
      className={`relative xxsm:h-[60vh] md:h-screen w-full overflow-hidden 
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
            className={`absolute w-[70%]
               sm:w-[80%] max-w-4xl aspect-video transition-all duration-300
              ${index !== currentSlide ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={() => handleSlideClick(index)}
          >
            <div className='relative'>
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full aspect-auto
                object-cover rounded-lg shadow-2xl shadow-gray-800 aspect-auto"
                draggable="false"
              />
                           {/* <div className="absolute bottom-0 left-0 xxsm:scale-[0.6] md:scale-[1]
                           xxsm:-translate-x-[30%] md:-translate-x-[30%] 
                xxsm:-translate-y-[-50%] md:translate-y-[20%]
                translate-y-[80%]
                max-w-[200px] sm:max-w-[300px] md:max-w-[400px] p-4 sm:p-6 
                bg-white/10 backdrop-blur-md
                rounded-xl 
                border border-white/20
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                transform transition-all duration-300
                hover:bg-white/20
                before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl">
                <h2 className="relative text-gray-800 text-xl sm:text-2xl font-bold mb-2">Buy a House</h2>
                <p className="relative text-gray-900/80 text-xs sm:text-sm max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                </p>
              </div> */}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 rounded-lg" />
          </div>
        ))}
      </div>
    
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex space-x-1 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors 
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
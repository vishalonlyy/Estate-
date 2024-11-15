/* eslint-disable @next/next/no-img-element */
"use client";
import Group from "@/components/p/Group";
import Part from "@/components/p/part";
import Testimonials from "@/components/p/tes";
import Footer from "@/components/Ui/Footer";
import Navbar from "@/components/Ui/Navbar";
import { Building, Shield, Sprout, Home as H, Maximize } from "lucide-react";
import React, { useLayoutEffect, useState } from "react";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
interface ImageData {
  id: string;
  url: string;
  alt: string;
}

const Images = [
  {
    id: '1',
    url: '/i/b.jpg',
    alt: 'Building exterior'
  },
  {
    id: '2',
    url: '/i/night.jpg',
    alt: 'Building exterior'
  }
];
const ImageSection: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  // const getNextImage = (): ImageData => {
  //   const currentImage = {
  //     id: '1',
  //     url: '/i/a.jpg',
  //     alt: 'Building exterior'
  //   };

  //   // Toggle between two images
  //   const newCurrent = currentImage.id === '1' 
  //     ? {
  //         id: '2',
  //         url: 'https://www.imperialresidencia.com/img/Elevation%20(2).jpg',
  //         alt: 'Building elevation'
  //       }
  //     : {
  //         id: '1',
  //         url: '/i/b.jpg',
  //         alt: 'Building exterior'
  //       };
  //   setCurrentImage(newCurrent);
  //   return newCurrent;
    
  // };
  const transitionImage = (nextImage: ImageData): void => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .set(imageRef.current, {
      backgroundImage: `url(${nextImage.url})`,
    })
    .to(imageRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.in"
    });
  };
  useLayoutEffect(() => {
    transitionImage(Images[currentImage]);
  }, [currentImage]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % Images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentImage]);
  return (
    <div className="relative xxsm:h-[400px] md:h-[700px] w-full overflow-hidden">
            <div 
        ref={imageRef}
        className="absolute inset-0 mt-[60px] xxsm:h-[350px] md:h-[550px] w-full"
        style={{
          backgroundPosition: 'center',
          backgroundSize: '100% 100%', // Forces full width and height
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.2)', // Slightly scaled for better coverage
          transformOrigin: 'center center'
        }}
        role="img"
        aria-label={Images[currentImage || 0].alt}
      />
    </div>
  );
};
const Exclusive_Features = () => {
  return (
    <>
      <div className="h-[250px] w-full mt-[20px]
        bg-[url('/i/c.png')] 
        bg-cover 
        bg-center 
        bg-no-repeat">
          <h1 className="text-2xl text-black xxsm:text-2xl sm:text-3xl font-bold text-center  py-4 sm:py-8">
            Exclusive Features</h1>
      </div>
    </>
  );
}
const Features = () => {
  return (
    <>
        <div className="bg-emerald-800 text-white py-16 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                  {[
                    {
                      icon: <Maximize />,
                      title: "Three side open",
                      description: "Maximum natural light and ventilation",
                    },
                    {
                      icon: <Sprout />,
                      title: "Lavish greenery",
                      description: "Landscaped gardens and parks",
                    },
                    {
                      icon: <Building />,
                      title: "Modern amenities",
                      description: "State-of-the-art facilities",
                    },
                    {
                      icon: <H />,
                      title: "Luxurious homes",
                      description: "Premium finishes and materials",
                    },
                    {
                      icon: <Shield />,
                      title: "Multi layer Security",
                      description: "24x7 surveillance and monitoring",
                    },
                    
                  ].map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
      </div>
    </>
  )
}
export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
const videoId = "1KtK5iMGb4DomdtAML2xLgevp5nBvXw-z";

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <ImageSection/>
    <div className="w-full xxsm:scale-x-[1.2] md:scale-x-[1] transform xxsm:-translate-y-[90px]
         md:-translate-y-[0px] absolute bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Marquee for mobile */}
            <div className="block md:hidden overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-flex gap-4">
                {[...Array(2)].map((_, arrayIndex) => (
                  <div key={arrayIndex} className="inline-flex gap-4">
                    {[
                       { value: "168", label: "Residential Units" },{ value: "2.5", label: "BHK" },{ value: "03", label: "BHK" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="inline-flex flex-col p-4 transition-shadow z-10 shadow-gray 
                          shadow-lg hover:shadow-xl rounded-b-md bg-white min-w-[200px]"
                      >
                        <div className="text-2xl font-bold text-emerald-800">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Grid for desktop */}
            <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8 text-center">
              {[
                
                { value: "168", label: "Residential Units" },{ value: "2.5", label: "BHK" },{ value: "03", label: "BHK" },
                
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-6 transition-shadow z-10 shadow-gray ${
                    index === 0 || index === 2 
                      ? "shadow-lg hover:shadow-xl rounded-b-2xl" 
                      : "shadow-lg hover:shadow-md"
                  } bg-white`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-800">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
    </div>
    <div className="xxsm:mt-[100px] md:mt-[0px]">
    <Exclusive_Features/>
    </div>
    <Features/>
      {/* Features Section */}
      <Part />
      <div>
      <div className="xxsm:min-h-[100%] md:max-h-[70%] relative cursor-pointer" 
       onClick={() => setShowVideo(true)}>
    {!showVideo ? (
      <div className="relative">
        <img 
          src="/img/building.png" 
          alt="Click to play video" 
          className="w-full h-full object-cover md:scale-[1]" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    ) : (
      <iframe
        className="w-full h-full aspect-video md:scale-[1]"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    )}
  </div>
        <div className="bg-[#065f46] transform md:-translate-y-10 pb-3 rounded-b-3xl">
          <h1 className="text-2xl xxsm:text-2xl sm:text-3xl font-bold text-center text-white py-4 sm:py-8">Walk Through</h1>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 text-white text-xs sm:text-base md:text-lg">
              Luxury space is ready to give a lot of the lifestyle and comfort to
              its residents. Experience the perfect blend of comfort and
              sophistication in every corner. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque labore, in eaque iusto culpa nesciunt ipsa provident sed porro et similique repellat pariatur eum omnis at. Iusto aliquid voluptatibus natus?
            </p>
          </div>
        </div>
      </div>
      {/* Next */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/img/mapbg.png')] bg-cover bg-center opacity-[0.9] blur-sm"></div>
        <img src='/img/map.png' alt='map' className='relative w-full h-full object-cover justify-self-center xxsm:scale-[0.8] sm:scale-[0.75] md:scale-[0.5]' />
      </div>
      {/* Group */}
      <Group />
      <Testimonials />
      <Footer />
    </main>
  );
}
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-emerald-900/50 rounded-lg hover:bg-emerald-900/70 transition-all duration-300 hover:scale-105">
      <div className="mb-4 text-emerald-50">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-8 h-8",
        })}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-emerald-50/80">{description}</p>
    </div>
  );
}
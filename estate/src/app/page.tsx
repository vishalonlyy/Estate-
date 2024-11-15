/* eslint-disable @next/next/no-img-element */
"use client";

import Group from "@/components/p/Group";
import Part from "@/components/p/part";
import Testimonials from "@/components/p/tes";
import Footer from "@/components/Ui/Footer";
import Navbar from "@/components/Ui/Navbar";
import { Building, Shield, Sprout, Home as H, Maximize } from "lucide-react";
import React from "react";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ImageSection = () => {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 1
      }
    });

    tl.fromTo(img1Ref.current,
      { 
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
      }
    ).fromTo(img2Ref.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
      },
      '-=0.5' // Overlap with previous animation
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center items-center mt-[60px]">
        <img
          ref={img1Ref}
          src="/i/b.png"
          alt="Apartment exterior"
          className="w-full md:w-1/2 h-[100%] object-contain scale-y-[1.4] shadow-lg"
        />
        <img 
          ref={img2Ref}
          src="https://www.imperialresidencia.com/img/Elevation%20(2).jpg"
          alt="Apartment exterior"
          className="w-full md:w-1/2 h-[100%] object-contain scale-y-[1.3] shadow-lg"
        />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      {/* Hero Section */}
      <div className="relative xxsm:h-[330px] sm:h-[500px] md:h-[480px] w-full bg-black">
        <div className="h-[100%] bg-black overflow-hidden">
          <ImageSection />
        </div>

        <div className="absolute inset-0 bg-black/10" />

                <div className="w-full transform translate-y-[130px] absolute bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Marquee for mobile */}
            <div className="block md:hidden overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-flex gap-4">
                {[...Array(2)].map((_, arrayIndex) => (
                  <div key={arrayIndex} className="inline-flex gap-4">
                    {[
                      { value: "03", label: "BHK" },
                      { value: "168", label: "Residential Units" },
                      { value: "2.5", label: "BHK" },
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
                { value: "03", label: "BHK" },
                { value: "168", label: "Residential Units" },
                { value: "2.5", label: "BHK" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-6 transition-shadow z-10 shadow-gray ${
                    index === 0 || index === 2 
                      ? "shadow-lg hover:shadow-xl rounded-b-md" 
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
      </div>

      {/* Features Section */}
            <div className="bg-emerald-800 text-white py-16 mt-[150px] mb-[30px]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                  {[
                    {
                      icon: <Shield />,
                      title: "Security",
                      description: "24/7 security with CCTV surveillance",
                    },
                    {
                      icon: <Building />,
                      title: "Modern amenities",
                      description: "State-of-the-art facilities",
                    },
                    {
                      icon: <Sprout />,
                      title: "Lavish greenery",
                      description: "Landscaped gardens and parks",
                    },
                    {
                      icon: <H />,
                      title: "Luxurious homes",
                      description: "Premium finishes and materials",
                    },
                    {
                      icon: <Maximize />,
                      title: "Three side open",
                      description: "Maximum natural light and ventilation",
                    },
                  ].map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </div>
    
      <Part />

      <div>
        <div className="xxsm:min-h-[100%] md:max-h-[70%]">
          <img src="/img/building.png" alt="building" className="w-full h-full object-cover md:scale-[0.9]" />
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
        <div className="absolute inset-0 bg-[url('/img/mapbg.png')] bg-cover bg-center opacity-[0.9] blur-md"></div>
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
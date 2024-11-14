"use client";

import Group from "@/components/p/Group";
import Part from "@/components/p/part";
import Navbar from "@/components/Ui/Navbar";
import { Building, Shield, Sprout, Home as H, Maximize } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[500px] w-full  ">
        <img
          src="/i/b.png"
          alt="Apartment exterior"
          className="absolute inset-0 w-full h-full scale-x-[1.4]  mt-[60px] object-contain "
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="w-[100%] tranform translate-y-[130px] absolute bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { value: "03", label: "BHK" },
                { value: "168", label: "Residential Units" },
                { value: "2.5", label: "BHK" },
              ].map((stat, index) => (
                <div
                  key={index}
                                    className={`p-6  transition-shadow z-10 shadow-gray ${
                    index === 0 || index === 2 
                      ? "shadow-lg hover:shadow-xl rounded-b-md " 
                      : "shadow-lg hover:shadow-md"
                  } bg-white`}
                >
                  <div className="text-4xl font-bold text-emerald-800">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}

      {/* <div className="pt-16 bg-[url('/i/c.png')] bg-cover bg-center bg-no-repeat 
       text-black w-[100%] h-[500px] flex justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Exclusive Features
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-16 text-gray-800">
            Luxury space is ready to give a lot of the lifestyle and comfort to
            its residents. Experience the perfect blend of comfort and
            sophistication in every corner. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque labore, in eaque iusto culpa nesciunt ipsa provident sed porro et similique repellat pariatur eum omnis at. Iusto aliquid voluptatibus natus?
          </p>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="bg-emerald-800 text-white py-16 mt-[150px] mb-[30px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
    
    <Part/>

    <div>
      <div className="max-h-[70%]">
      <img src="/img/building.png" alt="building" className="w-full h-full object-cover scale-[0.9]" />
      </div>
      <div className="bg-[#065f46] transform -translate-y-10 pb-3 rounded-b-3xl">
            <h1 className="text-3xl font-bold text-center text-white py-8">Walk Through</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center max-w-3xl mx-auto mb-16 text-white">
                Luxury space is ready to give a lot of the lifestyle and comfort to
                its residents. Experience the perfect blend of comfort and
                sophistication in every corner. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque labore, in eaque iusto culpa nesciunt ipsa provident sed porro et similique repellat pariatur eum omnis at. Iusto aliquid voluptatibus natus?
              </p>
            <div/>
      </div>
      </div>
    </div>

    {/**Next */}
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/img/mapbg.png')] bg-cover bg-center opacity-[0.9] blur-md"></div>
      <img src='/img/map.png' alt='map' className='relative w-full h-full object-cover justify-self-center scale-[0.5]' />
    </div>

    {/**Group */}
    <Group/>
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

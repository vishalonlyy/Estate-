'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="text-white">
      {/* Section 1 - Logo and RERA */}
    <div className="footer-section w-full px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - QR and Logo (40%) */}
          <div className="flex items-center gap-[5%] md:w-[40%]  justify-between">
            <div className="w-20 h-20 flex-shrink-0">
              <img 
                src="/scanner.jpeg" 
                alt="QR Scanner"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="w-32 pl-10 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Company Logo"
                width={100}
                height={35}
                className="w-full object-contain"
              />
            </div>
          </div>
          
          {/* Right side - RERA Details (60%) */}
          <div className="md:w-[60%] text-center md:text-left md:pl-[200px]">
            <h3 className="text-lg font-bold mb-2 text-gray-800">RERA Details</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
            The Project has been registered via UP-RERA registration number: UPRERAPRJ103248/16/2024,RERA Collection A/c No- 9260002900000019 TEAM SHAURYA INFRAZONE PVT LTD,PUNJAB NATIONAL BANK, 2C/116, VRINDAVAN YOJNA, RAEBAREILLY ROAD, LUCKNOW,IFSC Code - PUNB0926000
            It is available on the website https://up-rera.in/ under registered projects.
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* Section 2 - Corporate Office */}
      <div className="bg-[#065f46] w-full">
        <div className="footer-section max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Corporate Office</h2>
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-300" />
              <p className="text-gray-200">GH-05, Sector -14 Vrindavan Yojna
              Socials</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-300" />
              <a href="mailto:teamshauryainfrazone@gmail.com" className="text-gray-200 hover:text-white transition-colors">
                teamshauryainfrazone@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-300" />
              <a href="tel:+91 9559854111" className="text-gray-200 hover:text-white transition-colors">
                +91 9559854111
              </a>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="footer-section mt-12 pt-8 border-t border-gray-600">
            <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
            PS Apartment RERA No. UPRERAPRJ103248/16/2024 is being constructed by TEAM SHAURYA INFRAZONE PVT LTD, with 2.5 BHK and 3 BHK  Apartments in Sector 14, Vrindavan Yojna, Lucknow wherein as on 17th November 2024 the configuration, image and views shown/claimed in this advertisement is to give an idea of the manner of utilization of the constructed space and is not a legally enforceable offering by the Company. This advertisement is only for the purpose of providing information. By viewing this advertisement, the viewer confirms that the information contained is solely for informational and advertisement purposes and the viewer has not relied on this information for making any booking/purchase/investments in any project of the company. Nothing in this advertisement constitutes advertising, marketing, booking, selling, or an offer for sale, or invitation to purchase a unit in any project by the company. The company is not liable for any consequence of any action taken by the viewer relying on such material/information in this advertisement. This advertisement is not a legal offering and does not form part of any agreement or is legally binding on the part of the company or any nominated agency.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

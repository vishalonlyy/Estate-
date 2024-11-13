"use client";

import { Phone, Mail } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const tlRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    tlRef.current = gsap.timeline({ paused: true });
    
    tlRef.current
      .to(navRef.current, {
        backgroundColor: "#ffffff",
        color: isScrolled ? "#000000" : "#000000",
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(navRef.current, {
        boxShadow: isScrolled ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "none",
        padding: isScrolled ? "0.5rem 0" : "1rem 0",
        duration: 0.3,
        ease: "power2.inOut"
      }, "<")
      .fromTo(navRef.current, {
        y: isScrolled ? "-100%" : "0%"
      }, {
        y: "0%",
        duration: 0.3,
        ease: "power2.inOut"
      }, "<");

    tlRef.current.play();
  }, [isScrolled]);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-white text-black h-[60px]">
      <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8 py-2 pt-0">
        <div className={`${!isScrolled && "transform -translate-y-2"} flex items-center justify-between `}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className=" w-[40px]"
            />
          </div>

          {/* Center Text */}
          <div className="hidden md:block">
            {isScrolled ? (
              <div className="flex space-x-8">
                <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Features</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
              </div>
            ) : (
              <h1 className="text-xl font-bold text-emerald-700 font-sans tracking-wider">
                PS Apartment by Team Shaurya
              </h1>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {isScrolled ? (
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Enquiry Now
              </button>
            ) : (
              <>
                <a href="tel:+1234567890" className="hover:text-emerald-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:info@example.com" className="hover:text-emerald-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
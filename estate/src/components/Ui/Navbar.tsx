"use client";

import { Phone, Mail, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Forms from "./F";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const tlRef = useRef<gsap.core.Timeline>();
  const mobileMenuRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  interface NavLink {
    id: number;
    name: string;
    sectionId: string; // Added for scroll targeting
  }
  
  const Links: NavLink[] = [
    {
      id: 1,
      name: "Home",
      sectionId: "home",
    },
    {
      id: 2,
      name: "Features",
      sectionId: "features",
    },
    {
      id: 3,
      name: "Location",
      sectionId: "location",
    },
    {
      id: 4,
      name: "Photo Gallery",
      sectionId: "gallery",
    },
    {
      id: 5,
      name: "Walkthrough",
      sectionId: "walkthrough",
    },
    {
      id: 6,
      name: "Site Plan",
      sectionId: "siteplan",
    },
    {
      id: 7,
      name: "About Us",
      sectionId: "about",
    },
  ];
  const handleScroll = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL with hash
      window.history.pushState({}, '', `#${sectionId}`);
      
      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  };


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

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        y: isMobileMenuOpen ? 0 : '-100%',
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };





  
  return (
    <>
            <Forms isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <nav ref={navRef} className="fixed top-0 w-full z-50 bg-white text-black h-[60px]">
      
        <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8 py-2 pt-0">

          <div className={`${!isScrolled && "transform -translate-y-2"} flex items-center justify-between`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-[40px]"
              />
            </div>

            {/* Center Text */}
            <div className="block">
  {isScrolled ? (
    <div className="hidden md:flex space-x-8">
      {/* <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
      <a href="#" className="hover:text-emerald-600 transition-colors">Features</a>
      <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
      <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a> */}
      {Links.map((link) => (
  <a 
    key={link.id} 
    href={`#${link.sectionId}`}
    onClick={handleScroll(link.sectionId)}
    className="hover:text-emerald-600 transition-colors"
  >
    {link.name}
  </a>
))}
    </div>
  ) : (
    <h1 className="text-base md:text-xl font-bold text-emerald-700 font-sans tracking-wider justify-self-center
    xxsm:text-sm ">
      PS Apartment by Team Shaurya
    </h1>
  )}
</div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 focus:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {isScrolled ? (
                        <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
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
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-[60px] h-full left-0 w-full bg-white z-40 transform -translate-y-full shadow-lg md:hidden"
      >
        <div className="p-4 space-y-4 text-gray-700">
          <div className="flex flex-col gap-4  items-center">
          {Links.map((link) => (
  <a 
    key={link.id} 
    href={`#${link.sectionId}`}
    onClick={handleScroll(link.sectionId)}
    className="hover:text-emerald-600 transition-colors"
  >
    {link.name}
  </a>
))}
          </div>
          <div className="pt-4 flex flex-col space-y-4">
            <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Enquiry Now
            </button>
            <div className="flex space-x-4 justify-center">
              <a href="tel:+91 9559854111" className="hover:text-emerald-600 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:teamshauryainfrazone@gmail.com" className="hover:text-emerald-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
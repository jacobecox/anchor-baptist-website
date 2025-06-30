// components/Navbar.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Church Logo - Fixed at top */}
      <div className="w-full flex justify-center items-center mb-0 bg-calvary-blue">
        <Image
          src="/calvary-baptist-logo.png"
          alt="Calvary Baptist Church Simi Valley"
          width={600}
          height={200}
          className="w-2/3 md:w-1/3 h-auto"
          priority
          unoptimized
        />
      </div>

      {/* Navigation Container - Sticky */}
      <nav className="w-full shadow-md sticky top-0 z-50">
        <div className="w-full flex items-center justify-center bg-custom-blue py-2 md:py-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 justify-center">
            <button 
              onClick={() => router.push('/')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              Home
            </button>
            <button 
              onClick={() => router.push('/visit')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              Visit Us
            </button>
            <button 
              onClick={() => router.push('/how-to-be-saved')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              How to Be Saved
            </button>
            <button 
              onClick={() => router.push('/watch')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              Watch Live
            </button>
            <button 
              onClick={() => router.push('/beliefs')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              What We Believe
            </button>
            <button 
              onClick={() => {
                router.push('/');
                setTimeout(() => {
                  const contactForm = document.querySelector('[data-contact-form]');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              Contact
            </button>
            <button 
              onClick={() => router.push('/more')}
              className="text-white hover:text-gray-200 transition-colors duration-200 bg-transparent border-none outline-none mx-2 text-2xl"
            >
              More
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-custom-blue shadow-lg z-50 border-t border-white/20 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col py-4">
            <button 
              onClick={() => handleNavClick('/')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('/visit')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              Visit Us
            </button>
            <button 
              onClick={() => handleNavClick('/how-to-be-saved')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              How to Be Saved
            </button>
            <button 
              onClick={() => handleNavClick('/watch')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              Watch Live
            </button>
            <button 
              onClick={() => handleNavClick('/beliefs')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              What We Believe
            </button>
            <button 
              onClick={() => {
                handleNavClick('/');
                setTimeout(() => {
                  const contactForm = document.querySelector('[data-contact-form]');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavClick('/more')}
              className="text-white hover:text-gray-200 transition-colors duration-200 py-3 px-6 text-left hover:bg-white/10 text-2xl"
            >
              More
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

// components/Navbar.tsx
// Cache bust: 2024-01-01
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

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
      {/* Header with Logo and Navigation Inline */}
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="w-full flex items-center justify-between px-12 md:px-20 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="bg-transparent border-none outline-none p-0"
            >
              <OptimizedImage
                src="/ABCSV-logo.jpg"
                alt="Anchor Baptist Church Simi Valley"
                width={256}
                height={64}
                className="w-56 md:w-64"
                style={{ height: 'auto' }}
                priority={true}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => router.push('/')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              Home
            </button>
            <button 
              onClick={() => router.push('/visit')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              Visit Us
            </button>
            <button 
              onClick={() => router.push('/how-to-be-saved')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              How to Be Saved
            </button>
            <button 
              onClick={() => router.push('/watch')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              Watch Live
            </button>
            <button 
              onClick={() => router.push('/beliefs')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              What We Believe
            </button>
            <button 
              onClick={() => {
                router.push('/');
                setTimeout(() => {
                  const contactForm = document.querySelector('[data-contact-form]');
                  if (contactForm) {
                    const headerHeight = 100; // Approximate header height
                    const elementTop = contactForm.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementTop,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              Contact
            </button>
            <button 
              onClick={() => router.push('/more')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 bg-transparent border-none outline-none text-lg font-medium px-3"
            >
              More
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-anchor-red p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-anchor-red transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-anchor-red transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-anchor-red transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col py-4">
            <button 
              onClick={() => handleNavClick('/')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('/visit')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              Visit Us
            </button>
            <button 
              onClick={() => handleNavClick('/how-to-be-saved')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              How to Be Saved
            </button>
            <button 
              onClick={() => handleNavClick('/watch')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              Watch Live
            </button>
            <button 
              onClick={() => handleNavClick('/beliefs')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              What We Believe
            </button>
            <button 
              onClick={() => {
                handleNavClick('/');
                setTimeout(() => {
                  const contactForm = document.querySelector('[data-contact-form]');
                  if (contactForm) {
                    const headerHeight = 100; // Approximate header height
                    const elementTop = contactForm.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementTop,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavClick('/more')}
              className="text-anchor-red hover:text-custom-blue transition-colors duration-200 py-3 px-6 text-left hover:bg-gray-50 text-lg font-medium"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

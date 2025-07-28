'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PhotoSlideshow({ images, interval = 5000, height = "400px" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Main Image */}
      <div className="w-full h-full relative overflow-hidden bg-black">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Scripture Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
            Serving Together
          </h2>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg font-medium">
            &ldquo;O magnify the LORD with me, and let us exalt his name together&rdquo; - Psalm 34:3
          </p>
        </div>
      </div>

    </div>
  );
} 
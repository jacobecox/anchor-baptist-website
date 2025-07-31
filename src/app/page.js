
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PhotoSlideshow from './components/PhotoSlideshow';
import ContactForm from './components/ContactForm';
import PageFooter from './components/PageFooter';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const router = useRouter();

  // Define your slideshow images here
  const slideshowImages = [
    {
      src: "/CBSV1.jpg",
      alt: "Calvary Baptist Church Service"
    },
    {
      src: "/CBSV2.jpg",
      alt: "Calvary Baptist Church Gathering"
    },
    {
      src: "/CBSV3.jpg",
      alt: "Calvary Baptist Church Worship"
    },
    {
      src: "/CBSV4.jpg",
      alt: "Calvary Baptist Church Community"
    },
    {
      src: "/CBSV5.jpg",
      alt: "Calvary Baptist Church Speaker"
    },
    {
      src: "/CBSV6.jpg",
      alt: "Calvary Baptist Church Congregation"
    },
    {
      src: "/CBSV7.jpg",
      alt: "Calvary Baptist Church Fellowship"
    },
    {
      src: "/CBSV8.jpg",
      alt: "Calvary Baptist Church Members"
    },
    {
      src: "/CBSV9.jpg",
      alt: "Calvary Baptist Church Service"
    },
    {
      src: "/CBSV10.jpg",
      alt: "Calvary Baptist Church Community"
    }
  ];

  return (
    <main className="font-sans">
      {/* Main Content Section */}
      <section className="flex flex-col min-h-[calc(100vh-80px)]">
        {/* Photo Slideshow */}
        <PhotoSlideshow 
          images={slideshowImages}
          interval={5000} // 5 seconds between slides
        />

        {/* Horizontal Line */}
        <div className="w-full h-12 bg-custom-blue"></div>

        {/* WHO WE ARE Section */}
        <div className="w-full bg-white text-black flex items-center justify-center pt-14">
          <h2 className="text-5xl font-extrabold text-center w-3/4 text-custom-blue">WHO WE ARE:</h2>
        </div>

      {/* Hero Section */}
        <div className="w-full flex items-center justify-center pt-8 pb-12 bg-white">
          <div className="w-3/4 md:w-1/2 text-center">
            <h1 className="text-2xl mb-4 text-gray-600">
          Calvary Baptist Church is an independent, Bible-believing, Baptist church located in beautiful Simi Valley, California.
        </h1>
            <button 
              onClick={() => router.push('/beliefs')}
              className="bg-calvary-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#00b3e6] transition-colors duration-200"
            >
          WHAT WE BELIEVE
        </button>
          </div>
        </div>

        {/* WORSHIP WITH US Section */}
        <div className="w-full bg-gray-100 text-white flex items-center justify-center py-24 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/CBSV11.jpg"
              alt="Bible Study"
              fill
              className="object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/40"></div>
          </div>
          
          {/* Content */}
          <div className="w-3/4 md:w-1/2 text-center relative z-10">
            <h3 className="text-5xl font-extrabold mb-8 text-white drop-shadow-2xl">WORSHIP WITH US</h3>
            <div className="space-y-4 mb-8">
              <div className="text-white drop-shadow-2xl">
                <h5 className="text-3xl font-bold mb-2 text-white drop-shadow-2xl">SUNDAY</h5>
                <p className="text-2xl text-white drop-shadow-2xl">Morning Service | 12pm</p>
                <p className="text-2xl text-white drop-shadow-2xl">Evening Service | 6pm</p>
              </div>
              <div className="text-white drop-shadow-2xl">
                <h5 className="text-3xl font-bold mb-2 text-white drop-shadow-2xl">WEDNESDAY</h5>
                <p className="text-2xl text-white drop-shadow-2xl">Evening Service | 6:30pm</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/visit')}
                className="bg-calvary-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#00b3e6] transition-colors duration-200"
              >
                VISIT US
              </button>
              <button 
                onClick={() => router.push('/watch')}
                className="bg-custom-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#005a7a] transition-colors duration-200"
              >
                WATCH ONLINE
              </button>
            </div>
          </div>
        </div>

        {/* BRING YOUR FAMILY Section */}
        <div className="w-full bg-white text-black flex items-center justify-center py-24">
          <div className="w-3/4 md:w-1/2 text-center">
            <h3 className="text-5xl font-extrabold mb-4 text-custom-blue">BRING YOUR FAMILY</h3>
            <p className="text-2xl mb-6 text-gray-600">
              Our friendly environment at Calvary welcomes you and your family to worship with us this Sunday!
            </p>
            <button 
              onClick={() => router.push('/visit')}
              className="bg-calvary-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#00b3e6] transition-colors duration-200"
            >
              VISIT US
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactForm 
          title="CONTACT US"
          subtitle="Have questions? We'd love to hear from you."
          backgroundColor="bg-custom-blue"
          textColor="text-white"
          buttonColor="bg-white"
          buttonTextColor="text-custom-blue"
        />


      </section>

      {/* Page Footer */}
      <PageFooter />
    </main>
  );
}

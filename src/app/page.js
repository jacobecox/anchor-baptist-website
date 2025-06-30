/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="font-sans">
      {/* Main Content Section */}
      <section className="flex flex-col min-h-[calc(100vh-80px)]">
        {/* Simi Valley Image */}
        <div className="w-full relative h-[400px]">
          <Image
            src="/simi-valley.jpeg"
            alt="Simi Valley"
            fill
            className="object-cover object-[center_90%]"
            priority
          />
          {/* Opacity overlay */}
          <div className="absolute inset-0 bg-white/40"></div>
        </div>

        {/* WHO WE ARE Section */}
        <div className="w-full bg-white text-black flex items-center justify-center pb-4 pt-10">
          <h2 className="text-5xl font-extrabold text-center w-3/4 text-custom-blue">WHO WE ARE:</h2>
        </div>

      {/* Hero Section */}
        <div className="w-full flex items-center justify-center p-8 bg-white">
          <div className="w-3/4 md:w-1/2 text-center">
            <h1 className="text-2xl mb-4 text-gray-600">
          Calvary Baptist Church is an independent, Bible-believing, Baptist church located in beautiful Simi Valley, California.
        </h1>
            <button 
              onClick={() => router.push('/beliefs')}
              className="bg-[#4EC3E0] text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#3db1d0] transition-colors duration-200"
            >
          WHAT WE BELIEVE
        </button>
          </div>
        </div>

        {/* WORSHIP WITH US Section */}
        <div className="w-full bg-gray-100 text-custom-blue flex items-center justify-center py-24 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/pray.jpg"
              alt="Prayer"
              fill
              className="object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/60"></div>
          </div>
          
          {/* Content */}
          <div className="w-3/4 md:w-1/2 text-center relative z-10">
            <h3 className="text-5xl font-extrabold mb-8">WORSHIP WITH US</h3>
            <div className="space-y-4 mb-8">
              <div>
                <h5 className="text-2xl font-bold mb-2">SUNDAY</h5>
                <p className="text-xl">Morning Service | 12pm</p>
                <p className="text-xl">Evening Service | 6pm</p>
              </div>
          <div>
                <h5 className="text-2xl font-bold mb-2">WEDNESDAY</h5>
                <p className="text-xl">Evening Service | 6:30pm</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/visit')}
                className="bg-[#4EC3E0] text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#3db1d0] transition-colors duration-200"
              >
                VISIT US
              </button>
              <button 
                onClick={() => router.push('/watch')}
                className="bg-custom-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-slate-700 transition-colors duration-200"
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
              className="bg-[#4EC3E0] text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#3db1d0] transition-colors duration-200"
            >
              VISIT US
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full bg-custom-blue text-white py-24" data-contact-form>
          <div className="w-3/4 mx-auto">
            <p className="text-2xl text-center mb-4">HAVE MORE QUESTIONS?</p>
            <h3 className="text-7xl font-extrabold text-center mb-4">CONTACT US</h3>
            <p className="text-lg text-center mb-8">Fill out the form below and we will contact you as soon as possible.</p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-lg bg-white text-black border border-slate-600 focus:border-white focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-lg bg-white text-black border border-slate-600 focus:border-white focus:outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-lg mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-white text-black border border-slate-600 focus:border-white focus:outline-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-custom-blue py-3 px-8 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Church Logo and Contact Info */}
        <div className="w-full bg-custom-blue pt-2 pb-16">
          <div className="w-4/5 md:w-2/5 mx-auto text-center">
            {/* Church Logo */}
            <div className="mb-12">
              <Image
                src="/calvary-baptist-logo.png"
                alt="Calvary Baptist Church Simi Valley"
                width={600}
                height={200}
                className="w-2/3 h-auto mx-auto"
                priority
                unoptimized
              />
            </div>

            {/* Contact Information and Service Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6 text-center">
                {/* Email */}
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xl text-slate-200">pastor@calvarybcsv.com</span>
                </div>

                {/* Address */}
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xl text-slate-200">9 West Bonita Drive<br />Simi Valley, CA 93605</span>
                </div>
              </div>

              {/* Service Times */}
              <div className="space-y-6 text-center">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xl font-bold text-white mb-2">SUNDAY</h5>
                    <p className="text-lg text-slate-200">Morning Service | 12pm</p>
                    <p className="text-lg text-slate-200">Evening Service | 6pm</p>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white mb-2">WEDNESDAY</h5>
                    <p className="text-lg text-slate-200">Evening Service | 6:30pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

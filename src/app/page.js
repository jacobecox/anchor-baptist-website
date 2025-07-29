
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PhotoSlideshow from './components/PhotoSlideshow';
import ContactForm from './components/ContactForm';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const router = useRouter();
  const [serviceTimes, setServiceTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch service times from Supabase
  useEffect(() => {
    const fetchServiceTimes = async () => {
      const { data, error } = await supabase
        .from('service_times')
        .select('*')
        .order('day_of_week', { ascending: true });

      if (error) {
        console.error('Error fetching service times:', error);
      } else {
        setServiceTimes(data || []);
      }
      setLoading(false);
    };

    fetchServiceTimes();
  }, []);

  // Group service times by day
  const groupedServices = serviceTimes.reduce((acc, service) => {
    const day = service.day_of_week;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(service);
    return acc;
  }, {});

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
              {loading ? (
                <div className="text-white drop-shadow-2xl">
                  <p className="text-2xl">Loading service times...</p>
                </div>
              ) : Object.keys(groupedServices).length > 0 ? (
                Object.entries(groupedServices).map(([day, services]) => (
                  <div key={day}>
                    <h5 className="text-3xl font-bold mb-2 text-white drop-shadow-2xl">{day.toUpperCase()}</h5>
                    {services
                      .sort((a, b) => {
                        // Sort Sunday Morning before Sunday Evening
                        if (a.service_name.includes('Morning') && b.service_name.includes('Evening')) return -1;
                        if (a.service_name.includes('Evening') && b.service_name.includes('Morning')) return 1;
                        return 0;
                      })
                      .map((service, index) => (
                        <p key={index} className="text-2xl text-white drop-shadow-2xl">
                          {service.service_name} | {service.time}
                        </p>
                      ))}
                  </div>
                ))
              ) : (
                <div className="text-white drop-shadow-2xl">
                  <p className="text-2xl">Morning Service | 12pm</p>
                  <p className="text-2xl">Evening Service | 6pm</p>
                  <p className="text-2xl">Wednesday Evening Service | 6:30pm</p>
                </div>
              )}
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
                  {loading ? (
                    <div>
                      <h5 className="text-xl font-bold text-white mb-2">SERVICE TIMES</h5>
                      <p className="text-lg text-slate-200">Loading...</p>
                    </div>
                  ) : Object.keys(groupedServices).length > 0 ? (
                    Object.entries(groupedServices).map(([day, services]) => (
                      <div key={day}>
                        <h5 className="text-xl font-bold text-white mb-2">{day.toUpperCase()}</h5>
                        {services
                          .sort((a, b) => {
                            // Sort Sunday Morning before Sunday Evening
                            if (a.service_name.includes('Morning') && b.service_name.includes('Evening')) return -1;
                            if (a.service_name.includes('Evening') && b.service_name.includes('Morning')) return 1;
                            return 0;
                          })
                          .map((service, index) => (
                            <p key={index} className="text-lg text-slate-200">
                              {service.service_name} | {service.time}
                            </p>
                          ))}
                      </div>
                    ))
                  ) : (
                    <>
                      <div>
                        <h5 className="text-xl font-bold text-white mb-2">SUNDAY</h5>
                        <p className="text-lg text-slate-200">Morning Service | 12pm</p>
                        <p className="text-lg text-slate-200">Evening Service | 6pm</p>
                      </div>
                      <div>
                        <h5 className="text-xl font-bold text-white mb-2">WEDNESDAY</h5>
                        <p className="text-lg text-slate-200">Evening Service | 6:30pm</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

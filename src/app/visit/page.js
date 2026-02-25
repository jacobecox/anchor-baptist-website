'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PageFooter from '../components/PageFooter';
import { supabase } from '../../lib/supabase';

// Lazy load ContactForm component
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full bg-custom-gray text-white py-16">
    <div className="w-3/4 mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
      <p className="text-xl mb-8">Loading contact form...</p>
    </div>
  </div>
});

export default function VisitPage() {
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

  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-anchor-red text-white py-8">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">VISIT US</h1>
        </div>
      </section>

      {/* Meeting Information Section */}
      <section className="w-full bg-white text-custom-gray py-16">
        <div className="w-3/4 mx-auto text-center">
          <div className="text-custom-gray rounded-lg p-8 mb-4">
            <h2 className="text-3xl font-bold mb-4">We Meet at the Congregation B&apos;nai Emet Synagogue</h2>
            <p className="text-2xl mb-2">9 West Bonita</p>
            <p className="text-2xl mb-6">Simi Valley, CA 93065</p>
            
            {/* Google Maps and Synagogue Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
              {/* Google Maps Component */}
              <div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6594.469143234528!2d-118.80274992418181!3d34.268070106303206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82eee392db975%3A0x22991f4f519da617!2s9%20W%20Bonita%20Dr%2C%20Simi%20Valley%2C%20CA%2093065!5e0!3m2!1sen!2sus!4v1750636438561!5m2!1sen!2sus" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anchor Baptist Church Location"
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
              
              {/* Synagogue Image */}
              <div>
                <img
                  src="/synagogue.jpg"
                  alt="Anchor Baptist Church building exterior - located at 9 West Bonita Drive in Simi Valley, California"
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="w-full bg-gray-50 text-custom-gray pt-8 pb-8">
        <div className="w-3/4 mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8">SERVICE TIMES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {loading ? (
              <>
                <div className="text-custom-gray rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">SUNDAY</h3>
                  <p className="text-xl mb-2">Loading...</p>
                </div>
                <div className="text-custom-gray rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">WEDNESDAY</h3>
                  <p className="text-xl">Loading...</p>
                </div>
              </>
            ) : Object.keys(groupedServices).length > 0 ? (
              Object.entries(groupedServices).map(([day, services]) => (
                <div key={day} className="text-custom-gray rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">{day.toUpperCase()}</h3>
                  {services
                    .sort((a, b) => {
                      // Sort Sunday Morning before Sunday Evening
                      if (a.service_name.includes('Morning') && b.service_name.includes('Evening')) return -1;
                      if (a.service_name.includes('Evening') && b.service_name.includes('Morning')) return 1;
                      return 0;
                    })
                    .map((service, index) => (
                      <p key={index} className="text-xl mb-2">
                        {service.service_name} | {service.time}
                      </p>
                    ))}
                </div>
              ))
            ) : (
              <>
                <div className="text-custom-gray rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">SUNDAY</h3>
                  <p className="text-xl mb-2">Morning Service | 12pm</p>
                  <p className="text-xl">Evening Service | 6pm</p>
                </div>
                <div className="text-custom-gray rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">WEDNESDAY</h3>
                  <p className="text-xl">Evening Service | 6:30pm</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="GET IN TOUCH"
        subtitle="Planning to visit? Let us know you're coming or ask any questions!"
        backgroundColor="bg-custom-gray"
        textColor="text-white"
        buttonColor="bg-white"
        buttonTextColor="text-custom-gray"
      />

      {/* Page Footer */}
      <PageFooter />
    </main>
  );
} 
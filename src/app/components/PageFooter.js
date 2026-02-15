'use client'
// Cache bust: 2024-01-01
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function PageFooter() {
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
    <div className="w-full bg-custom-blue pt-2 pb-16">
      <div className="w-4/5 md:w-3/4 mx-auto text-center">
        {/* Church Logo */}
        <div className="mb-12">
          <img
            src="/anchor-baptist-logo.jpg"
            alt="Anchor Baptist Church Simi Valley"
            className="w-2/3 md:w-1/3 h-auto mx-auto"
            loading="eager"
          />
        </div>

        {/* Contact Information, Service Times, and Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Social Media */}
          <div className="space-y-6 text-center">
            <h5 className="text-xl font-bold text-white mb-4">STAY CONNECTED</h5>
            <div className="flex justify-center space-x-6">
              {/* Facebook Icon */}
              <button
                onClick={() => window.open('https://www.facebook.com/profile.php?id=100081858694086', '_blank')}
                className="text-white hover:text-gray-200 transition-colors duration-200"
                title="Follow us on Facebook"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* YouTube Icon */}
              <button
                onClick={() => window.open('https://www.youtube.com/@calvarybaptistchurchofsimi2174', '_blank')}
                className="text-white hover:text-gray-200 transition-colors duration-200"
                title="Subscribe to our YouTube channel"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
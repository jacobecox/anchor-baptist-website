'use client'
import { useRouter } from 'next/navigation';
import ContactForm from '../components/ContactForm';

export default function MorePage() {
  const router = useRouter();

  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-custom-blue text-white py-16">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">MORE</h1>
          <p className="text-xl">Additional Resources & Content</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white text-black py-16">
        <div className="w-3/4 mx-auto text-center">
          <div className="space-y-8">
            
            {/* Events Button */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4 text-custom-blue">Events</h3>
              <p className="text-lg mb-6 text-gray-600">
                Stay updated with our upcoming events, special services, and church activities.
              </p>
              <button 
                onClick={() => router.push('/events')}
                className="bg-calvary-blue text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-[#3db1d0] transition-colors duration-200"
              >
                VIEW CALENDAR
              </button>
            </div>


          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="CONTACT US"
        subtitle="Need help finding something specific? We're here to assist you!"
        backgroundColor="bg-custom-blue"
        textColor="text-white"
        buttonColor="bg-white"
        buttonTextColor="text-custom-blue"
      />
    </main>
  );
} 
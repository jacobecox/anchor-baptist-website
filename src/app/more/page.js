'use client'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import PageFooter from '../components/PageFooter';

// Lazy load ContactForm component
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full bg-custom-gray text-white py-16">
    <div className="w-3/4 mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
      <p className="text-xl mb-8">Loading contact form...</p>
    </div>
  </div>
});

export default function MorePage() {
  const router = useRouter();

  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-anchor-red text-white py-8">
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
              <h3 className="text-3xl font-bold mb-4 text-custom-gray">Events</h3>
              <p className="text-lg mb-6 text-gray-600">
                Stay updated with our upcoming events, special services, and church activities.
              </p>
              <button 
                onClick={() => router.push('/events')}
                className="bg-anchor-red text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-red-800 transition-colors duration-200"
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
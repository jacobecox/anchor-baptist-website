'use client'
import ContactForm from '../components/ContactForm';

export default function WatchPage() {
  const handleWatchClick = () => {
    window.open('https://www.youtube.com/@calvarybaptistchurchofsimi2174', '_blank');
  };

  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-custom-blue text-white py-16">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">WATCH LIVE</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white text-black">
        <div className="w-3/4 mx-auto text-center">
          <div className="rounded-lg p-12 mb-12">
            <h2 className="text-4xl font-bold mb-6 text-custom-blue">Watch Our Services Online</h2>
            <p className="text-xl mb-8">
              Can&apos;t make it to church in person? Join us online through our YouTube channel where we stream our services live and share recorded sermons.
            </p>
            
            <button 
              onClick={handleWatchClick}
              className="bg-[#FF0000] text-white py-6 px-12 rounded-full font-bold text-2xl hover:bg-red-700 transition-colors duration-200 flex items-center justify-center mx-auto gap-3"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              WATCH ON YOUTUBE
            </button>
            
            <p className="text-lg mt-6 text-gray-600">
              Click the button above to open our YouTube channel in a new window
            </p>
          </div>
        </div>

        {/* Service Times Section - Full Width */}
        <div className="w-full bg-gray-100 text-custom-blue py-16">
          <div className="w-3/4 mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">Service Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold mb-4">SUNDAY</h4>
                <p className="text-2xl mb-2">Morning Service | 12pm</p>
                <p className="text-2xl">Evening Service | 6pm</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-4">WEDNESDAY</h4>
                <p className="text-2xl">Evening Service | 6:30pm</p>
              </div>
            </div>
            <p className="text-2xl mt-6 text-gray-600">
              Services are streamed live on our YouTube channel. Subscribe to get notified when we go live!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="CONTACT US"
        subtitle="Having trouble accessing our live stream? We're here to help!"
        backgroundColor="bg-custom-blue"
        textColor="text-white"
        buttonColor="bg-white"
        buttonTextColor="text-custom-blue"
      />
    </main>
  );
} 
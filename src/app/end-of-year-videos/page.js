'use client'
import ContactForm from '../components/ContactForm';

export default function EndOfYearVideosPage() {
  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-custom-blue text-white py-16">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">END OF YEAR VIDEOS</h1>
          <p className="text-xl">Special Messages & Highlights</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white text-black py-16">
        <div className="w-3/4 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-custom-blue">Coming Soon</h2>
          <p className="text-xl text-gray-600">
            End of year videos and highlights will be posted here soon. Check back for updates!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="CONTACT US"
        subtitle="Have questions about our videos? We'd love to help!"
        backgroundColor="bg-custom-blue"
        textColor="text-white"
        buttonColor="bg-white"
        buttonTextColor="text-custom-blue"
      />
    </main>
  );
} 
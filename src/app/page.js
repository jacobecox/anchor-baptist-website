'use client'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import PageFooter from './components/PageFooter';

// Lazy load non-critical components
const PhotoSlideshow = dynamic(() => import('./components/PhotoSlideshow').catch((error) => {
  console.warn('Failed to load PhotoSlideshow component:', error);
  const PhotoSlideshowFallback = () => (
    <div className="relative w-full h-64 md:h-96 lg:h-[700px] bg-gray-200 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600 mb-2 md:mb-4">Serving Together</h2>
        <p className="text-base sm:text-lg md:text-2xl lg:text-2xl text-gray-500">Slideshow unavailable</p>
      </div>
    </div>
  );
  PhotoSlideshowFallback.displayName = 'PhotoSlideshowFallback';
  return PhotoSlideshowFallback;
}), {
  loading: () => <div className="relative w-full h-64 md:h-96 lg:h-[700px] bg-gray-200 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600 mb-2 md:mb-4">Serving Together</h2>
      <p className="text-base sm:text-lg md:text-2xl lg:text-2xl text-gray-500">Loading slideshow...</p>
    </div>
  </div>
});

const ContactForm = dynamic(() => import('./components/ContactForm').catch((error) => {
  console.warn('Failed to load ContactForm component:', error);
  const ContactFormFallback = () => (
    <div className="w-full bg-custom-gray text-white py-16">
      <div className="w-3/4 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
        <p className="text-xl mb-8">Contact form unavailable</p>
      </div>
    </div>
  );
  ContactFormFallback.displayName = 'ContactFormFallback';
  return ContactFormFallback;
}), {
  loading: () => <div className="w-full bg-custom-gray text-white py-16">
    <div className="w-3/4 mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
      <p className="text-xl mb-8">Loading contact form...</p>
    </div>
  </div>
});

export default function HomePage() {
  const router = useRouter();

  // Define your slideshow images here
  const slideshowImages = [
    {
      src: "/ABCSV1.jpg",
      alt: "Anchor Baptist Church Service"
    },
    {
      src: "/ABCSV2.jpg",
      alt: "Anchor Baptist Church Gathering"
    },
    {
      src: "/ABCSV3.jpg",
      alt: "Anchor Baptist Church Worship"
    },
    {
      src: "/ABCSV4.jpg",
      alt: "Anchor Baptist Church Community"
    },
    {
      src: "/ABCSV5.jpg",
      alt: "Anchor Baptist Church Speaker"
    },
    {
      src: "/ABCSV6.jpg",
      alt: "Anchor Baptist Church Congregation"
    },
    {
      src: "/ABCSV7.jpg",
      alt: "Anchor Baptist Church Fellowship"
    },
    {
      src: "/ABCSV8.jpg",
      alt: "Anchor Baptist Church Members"
    },
    {
      src: "/ABCSV9.jpg",
      alt: "Anchor Baptist Church Service"
    },
    {
      src: "/ABCSV10.jpg",
      alt: "Anchor Baptist Church Community"
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
        <div className="w-full h-12 bg-custom-gray"></div>

        {/* WHO WE ARE Section */}
        <div className="w-full bg-white text-black flex items-center justify-center pt-14">
          <h2 className="text-5xl font-extrabold text-center w-3/4 text-custom-gray">WHO WE ARE:</h2>
        </div>

      {/* Hero Section */}
        <div className="w-full flex items-center justify-center pt-8 pb-12 bg-white">
          <div className="w-3/4 md:w-1/2 text-center">
            <h1 className="text-2xl mb-4 text-gray-600">
          Anchor Baptist Church is an independent, Bible-believing, Baptist church located in beautiful Simi Valley, California.
        </h1>
            <button 
              onClick={() => router.push('/beliefs')}
              className="bg-anchor-red text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-red-800 transition-colors duration-200"
            >
          WHAT WE BELIEVE
        </button>
          </div>
        </div>

        {/* WORSHIP WITH US Section */}
        <div className="w-full bg-gray-100 text-white flex items-center justify-center py-24 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/ABCSV11.jpg"
              alt="Anchor Baptist Church worship service - congregation gathered for Bible study and worship in Simi Valley, California"
              className="object-cover w-full h-full"
              loading="lazy"
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
                className="bg-anchor-red text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-red-800 transition-colors duration-200"
              >
                VISIT US
              </button>
              <button 
                onClick={() => router.push('/watch')}
                className="bg-custom-gray text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-slate-600 transition-colors duration-200"
              >
                WATCH ONLINE
              </button>
            </div>
          </div>
        </div>

        {/* BRING YOUR FAMILY Section */}
        <div className="w-full bg-white text-black flex items-center justify-center py-24">
          <div className="w-3/4 md:w-1/2 text-center">
            <h3 className="text-5xl font-extrabold mb-4 text-custom-gray">BRING YOUR FAMILY</h3>
            <p className="text-2xl mb-6 text-gray-600">
              Our friendly environment at Anchor Baptist welcomes you and your family to worship with us this Sunday!
            </p>
            <button 
              onClick={() => router.push('/visit')}
              className="bg-anchor-red text-white py-4 px-8 rounded-full font-semibold text-xl hover:bg-red-800 transition-colors duration-200"
            >
              VISIT US
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactForm 
          title="CONTACT US"
          subtitle="Have questions? We'd love to hear from you."
          backgroundColor="bg-custom-gray"
          textColor="text-white"
          buttonColor="bg-white"
          buttonTextColor="text-custom-gray"
        />


      </section>

      {/* Page Footer */}
      <PageFooter />
    </main>
  );
}

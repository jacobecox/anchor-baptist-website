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

export default function BeliefsPage() {
  const router = useRouter();
  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-anchor-red text-white py-8">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">WHAT WE BELIEVE</h1>
        </div>
      </section>

      {/* Bible Image - Full Width */}
      <div className="w-full relative h-48 md:h-64 lg:h-80">
        <img
          src="/aaron-burden-cmIqkMPfpMQ-unsplash.jpg"
          alt="Open Bible with Golden Edges"
          className="object-cover object-[center_65%] w-full h-full"
          loading="eager"
        />
      </div>

      {/* Content Sections */}
      <section className="w-full bg-white text-black py-16">
        <div className="w-3/4 mx-auto space-y-8">
          
          {/* 1. Bible */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that the whole Bible from Genesis 1:1 to Revelation 22:21, is the verbally inspired and infallible Word of God. We believe that God has perfectly preserved His Word for us today. The King James Version is the only faithful English translation of the preserved Greek and Hebrew texts, and is the only translation used by Anchor Baptist Church.
            </p>
          </div>

          {/* 2. Jesus Christ - Virgin Birth */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that Jesus Christ was born of Mary, a virgin, that He is the Son of God, and God the Son.
            </p>
          </div>

          {/* 3. Jesus Christ - Death */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that Jesus Christ died for our sins, according to the Scriptures; the just for the unjust, that He might bring us to God.
            </p>
          </div>

          {/* 4. Jesus Christ - Resurrection */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that Jesus Christ rose bodily from the grave the third day, according to the Scriptures.
            </p>
          </div>

          {/* 5. Jesus Christ - High Priest */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that only Jesus Christ is the High Priest, and we need not the intercession of any man, but that Christ ever liveth to make intercession for us.
            </p>
          </div>

          {/* 6. Jesus Christ - Second Coming */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that Jesus Christ will come again in person, bodily, visibly, to establish His Kingdom on the earth.
            </p>
          </div>

          {/* 7. Salvation */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that in order to be saved, the soul must be born-again. This is done by personal faith in the Lord Jesus Christ, and repentance of sins against a Holy God. (John 3:7 and Ephesians 2:8,9)
            </p>
          </div>

          {/* 8. Baptism */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that every born-again believer should declare his faith by the act of baptism (immersion in water) setting forth the Lord&apos;s death, burial and resurrection.
            </p>
          </div>

          {/* 9. Church */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              that the church is a local body of baptized believers, whose mission is not to &quot;reform the world&quot; but to glorify Christ by preaching the Gospel of Salvation to the individual soul, by worshiping God together, and by the mutual encouraging and growth of believers.
            </p>
          </div>

          {/* 10. Marriage */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-gray">We Believe...</h2>
            <p className="text-lg leading-relaxed">
              marriage is the voluntary union of one man and one woman to the exclusion of all others, and that sexual intimacy was designed and given by God, to be legitimately enjoyed only within the bounds of marriage as defined by Scripture. We also believe that Christians should neither marry unbelievers, nor enter into any other spiritually detrimental alliances with them.
            </p>
          </div>

          {/* 11. Charismatic Movement */}
          <div className="bg-custom-gray text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">We Stand...</h2>
            <p className="text-lg leading-relaxed">
              opposed to the modern-day charismatic movement, which is ecumenical in character, and unscriptural in doctrine.
            </p>
          </div>

        </div>
      </section>

      {/* Related Pages Section */}
      <section className="w-full bg-gray-50 text-black py-16">
        <div className="w-3/4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-custom-gray">Learn More About Our Church</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-gray">How to Be Saved</h3>
              <p className="text-gray-600 mb-4">Learn about salvation through faith in Jesus Christ and how to receive eternal life.</p>
              <button 
                onClick={() => router.push('/how-to-be-saved')}
                className="bg-custom-gray text-white py-2 px-4 rounded font-semibold hover:bg-slate-600 transition-colors"
              >
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-gray">Visit Us</h3>
              <p className="text-gray-600 mb-4">Plan your visit to Anchor Baptist Church. Find service times, directions, and what to expect.</p>
              <button 
                onClick={() => router.push('/visit')}
                className="bg-custom-gray text-white py-2 px-4 rounded font-semibold hover:bg-slate-600 transition-colors"
              >
                Plan Visit
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-gray">Watch Online</h3>
              <p className="text-gray-600 mb-4">Can&apos;t make it in person? Join us online through our YouTube channel for live services.</p>
              <button 
                onClick={() => router.push('/watch')}
                className="bg-custom-gray text-white py-2 px-4 rounded font-semibold hover:bg-slate-600 transition-colors"
              >
                Watch Live
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="CONTACT US"
        subtitle="Have questions about our beliefs? We'd love to discuss them with you."
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
'use client'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import PageFooter from '../components/PageFooter';

// Lazy load ContactForm component
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full bg-custom-blue text-white py-16">
    <div className="w-3/4 mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
      <p className="text-xl mb-8">Loading contact form...</p>
    </div>
  </div>
});

export default function HowToBeSavedPage() {
  const router = useRouter();
  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-calvary-blue text-white py-8">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">HOW TO BE SAVED</h1>
        </div>
      </section>

      {/* Bible on Beach Image - Full Width */}
      <div className="w-full relative h-48 md:h-64 lg:h-80">
        <img
          src="/beach-1868772.jpg"
          alt="Person praying with Bible on beach"
          className="object-cover object-[center_50%] w-full h-full"
          loading="eager"
        />
      </div>

      {/* Content Sections */}
      <section className="w-full bg-white text-custom-blue py-8">
        <div className="w-3/4 mx-auto space-y-8">
          
          {/* 1. God loves you */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">1. God loves you.</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue">
                <h3 className="font-bold text-lg mb-2">John 3:16</h3>
                <p className="text-lg italic">&quot;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&quot;</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue">
                <h3 className="font-bold text-lg mb-2">Ephesians 2:4-5</h3>
                <p className="text-lg italic">&quot;But God, who is rich in mercy, for his great love wherewith he loved us, Even when we were dead in sins, hath quickened us together with Christ, by grace ye are saved;&quot;</p>
              </div>
            </div>
            
            <p className="text-lg">Because of God&apos;s love for all people, He desires that you have unbroken fellowship with Him. God wants you to know Him.</p>
          </div>

          {/* 2. You are a sinner */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">2. You are a sinner.</h2>
            
            <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue mb-6">
              <h3 className="font-bold text-lg mb-2">Romans 3:10</h3>
              <p className="text-lg italic">&quot;As it is written, There is none righteous, no, not one:&quot;</p>
            </div>
            
            <p className="text-lg">All people are &quot;sinners&quot; in that they disobey God. Sin is choosing to go your own way and do your own thing as opposed to being obedient to God. Psalm 7:11 tells us that God is &quot;angry with the wicked every day.&quot;</p>
          </div>

          {/* 3. Sin separates you from God */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">3. Sin separates you from God.</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue">
                <h3 className="font-bold text-lg mb-2">Isaiah 59:2</h3>
                <p className="text-lg italic">But your iniquities have separated between you and your God, and your sins have hid [his] face from you, that he will not hear.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue">
                <h3 className="font-bold text-lg mb-2">Romans 3:23</h3>
                <p className="text-lg italic">&quot;For all have sinned, and come short of the glory of God&quot;</p>
              </div>
            </div>
            
            <p className="text-lg">Sin forms a barrier that prevents you from entering into unbroken fellowship with God, Who is holy. As an unholy sinner, you can&apos;t have a relationship with God. The penalty for your sin is death and separation from God. You are headed for a Christ-less eternity that the Bible calls Hell. It is a real place that the Bible describes as darkness and burning, and there is no escape once you&apos;re there. (Luke 16:26)</p>
          </div>

          {/* 4. You can't save yourself */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">4. You can&apos;t save yourself.</h2>
            
            <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue mb-6">
              <h3 className="font-bold text-lg mb-2">Ephesians 2:8-9</h3>
              <p className="text-lg italic">&quot;For by grace are ye saved through faith; and that not of yourselves: [it is] the gift of God: Not of works, lest any man should boast.&quot;</p>
            </div>
            
            <p className="text-lg mb-4">Titus 3:5 • Romans 4:4-5</p>
            
            <p className="text-lg">People often think that through their efforts they can overcome the sin barrier between themselves and God. That isn&apos;t true. There&apos;s nothing you can do to restore the broken relationship with God. You can&apos;t earn God&apos;s salvation.</p>
          </div>

          {/* 5. God sent His son Jesus */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">5. God sent His son Jesus to remove the sin barrier.</h2>
            
            <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue mb-6">
              <h3 className="font-bold text-lg mb-2">Ephesians 2:8-9</h3>
              <p className="text-lg italic">&quot;For by grace are ye saved through faith; and that not of yourselves: [it is] the gift of God: Not of works, lest any man should boast.&quot;</p>
            </div>
            
            <p className="text-lg mb-4">1 Peter 2:23 • Romans 5:8 • 2 Corinthians 5:21 • Romans 10:9</p>
            
            <p className="text-lg">What you cannot do for yourself, Jesus Christ has done for you! Your sin is a barrier between you and God. But the Good News is that Jesus died on the cross for you, He took the penalty of death and the wrath of God in your place, and then rose from the dead to demonstrate that His payment was acceptable to God. By taking your punishment on Himself, Jesus made a way for you to have a relationship with God.</p>
          </div>

          {/* 6. You can receive Jesus Christ through faith */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">6. You can receive Jesus Christ through faith.</h2>
            
            <div className="bg-white rounded-lg p-4 border-l-4 border-custom-blue mb-6">
              <h3 className="font-bold text-lg mb-2">Romans 10:9-10</h3>
              <p className="text-lg italic">&quot;That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved. For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation.&quot;</p>
            </div>
            
            <p className="text-lg mb-4">John 14:6 • Acts 16:31</p>
            
            <p className="text-lg">Faith is trusting in what Jesus has done for you rather than trusting your own efforts to restore fellowship with God. Faith is complete reliance on Christ to put you in right relationship with God, allowing Him to live His life through you. Faith also involves repentance or genuine sorrow for sin and willingness to turn away from sin.</p>
          </div>

          {/* 7. Through confession */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue">7. Through confession, you can trust in Jesus Christ.</h2>
            
            <p className="text-lg">Confess to God that you are a sinner. Express sorrow and repent of your sin. Ask Him to forgive your sins. Confess that you believe the Lord that He indeed came and died in your place. Invite Jesus Christ into your life as Savior and Lord. Commit yourself to live for Him.</p>
          </div>

          {/* Reach Out Section */}
          <div className="bg-custom-blue text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Reach Out:</h2>
            <p className="text-lg">If you would like to know more about how to be saved, and what happens if you don&apos;t trust in Jesus to save you, contact us through the form below. We&apos;re more than happy to speak to you through email, phone calls, or one-on-one in person. We&apos;ll sit down with you and answer your questions about the Good News of God&apos;s salvation.</p>
          </div>

        </div>
      </section>

      {/* Next Steps Section */}
      <section className="w-full bg-gray-50 text-black py-16">
        <div className="w-3/4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-custom-blue">What&apos;s Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-blue">Learn Our Beliefs</h3>
              <p className="text-gray-600 mb-4">Discover what we believe as a Bible-believing Baptist church and our commitment to the King James Version.</p>
              <button 
                onClick={() => router.push('/beliefs')}
                className="bg-custom-blue text-white py-2 px-4 rounded font-semibold hover:bg-[#005a7a] transition-colors"
              >
                Our Beliefs
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-blue">Visit Our Church</h3>
              <p className="text-gray-600 mb-4">Join us for worship services where we preach the Gospel and teach from God&apos;s Word.</p>
              <button 
                onClick={() => router.push('/visit')}
                className="bg-custom-blue text-white py-2 px-4 rounded font-semibold hover:bg-[#005a7a] transition-colors"
              >
                Plan Your Visit
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-custom-blue">Watch Online</h3>
              <p className="text-gray-600 mb-4">Can&apos;t visit in person? Watch our services live or recorded on YouTube.</p>
              <button 
                onClick={() => router.push('/watch')}
                className="bg-custom-blue text-white py-2 px-4 rounded font-semibold hover:bg-[#005a7a] transition-colors"
              >
                Watch Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm 
        title="CONTACT US"
        subtitle="Have questions about salvation? We'd love to help you understand God's plan for your life."
        backgroundColor="bg-custom-blue"
        textColor="text-white"
        buttonColor="bg-white"
        buttonTextColor="text-custom-blue"
      />

      {/* Page Footer */}
      <PageFooter />
    </main>
  );
} 
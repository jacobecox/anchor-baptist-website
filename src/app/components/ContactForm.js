'use client'
import { useState } from 'react';

export default function ContactForm({ 
  title = "CONTACT US", 
  subtitle = "Have questions? We'd love to hear from you.",
  backgroundColor = "bg-white",
  textColor = "text-black",
  buttonColor = "bg-custom-gray",
  buttonTextColor = "text-white"
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/xvgqrwea', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`w-full ${backgroundColor} ${textColor} py-16`} data-contact-form>
      <div className="w-3/4 mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4">{title}</h2>
        <p className="text-lg mb-8">{subtitle}</p>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-6 bg-green-50 border-2 border-green-400 text-green-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
                <p className="text-lg">Thank you for your message. We will get back to you soon.</p>
              </div>
            </div>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-6 bg-red-50 border-2 border-red-400 text-red-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="text-xl font-bold">Error Sending Message</h3>
                <p className="text-lg">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
              </div>
            </div>
          </div>
        )}
        
        <form 
          onSubmit={handleSubmit}
          className="space-y-6 max-w-2xl mx-auto"
          key="contact-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg mb-2 text-left">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-gray focus:outline-none"
                placeholder="Your name"
                required
                disabled={isSubmitting}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg mb-2 text-left">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-gray focus:outline-none"
                placeholder="Your email"
                required
                disabled={isSubmitting}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-lg mb-2 text-left">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-gray focus:outline-none"
              placeholder="Your message"
              required
              disabled={isSubmitting}
              style={{ color: 'black', backgroundColor: 'white' }}
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${buttonColor} ${buttonTextColor} py-3 px-8 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 
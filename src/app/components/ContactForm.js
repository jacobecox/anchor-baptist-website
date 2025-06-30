'use client'
import { useState } from 'react';

export default function ContactForm({ 
  title = "CONTACT US", 
  subtitle = "Have questions? We'd love to hear from you.",
  backgroundColor = "bg-white",
  textColor = "text-black",
  buttonColor = "bg-custom-blue",
  buttonTextColor = "text-white"
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className={`w-full ${backgroundColor} ${textColor} py-16`}>
      <div className="w-3/4 mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        <p className="text-lg mb-8">{subtitle}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg mb-2 text-left">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-blue focus:outline-none"
                placeholder="Your name"
                required
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
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-blue focus:outline-none"
                placeholder="Your email"
                required
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
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-custom-blue focus:outline-none"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`${buttonColor} ${buttonTextColor} py-3 px-8 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity duration-200`}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 
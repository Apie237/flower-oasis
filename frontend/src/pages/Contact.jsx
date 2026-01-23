import React from 'react';

const Contact = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Logic for sending email or message
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="px-4 md:px-10 max-w-7xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-rose-800 tracking-widest uppercase">Contact Us</h1>
        <div className="w-20 h-1 bg-rose-800 mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Our Studio</h3>
            <p className="text-gray-600">123 Floral Avenue, Downtown District</p>
            <p className="text-gray-600">Dubai, United Arab Emirates</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Get In Touch</h3>
            <p className="text-gray-600">Phone: +971 50 000 0000</p>
            <p className="text-gray-600">Email: hello@yourboutique.com</p>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Opening Hours</h3>
            <div className="text-gray-600 space-y-1">
              <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
              <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={onSubmitHandler} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              rows="4" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-rose-800 text-white font-bold py-4 rounded-lg hover:bg-rose-900 transition-colors tracking-widest uppercase text-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
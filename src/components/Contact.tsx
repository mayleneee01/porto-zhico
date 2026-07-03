'use client';

import FadeIn from './FadeIn';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    setTimeout(() => {
      setLoading(false);
      alert('Message sent successfully!');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-black/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center text-gradient">CONTACT PERSON</h2>
        </FadeIn>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <FadeIn direction="right" className="w-full lg:w-1/3 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            <p className="text-gray-400 font-light mb-8">
              Interested in collaborating or have any questions? Feel free to reach out to me. I am always open to discussing new projects, creative ideas, or opportunities.
            </p>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <a href="mailto:zhicoapta123@gmail.com" className="hover:text-white transition-colors">zhicoapta123@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                <a href="https://wa.me/6282352031324" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">082352031324</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p>Lampung, Indonesia</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                  <input required type="text" id="name" className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                  <input required type="email" id="email" className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-400">Subject</label>
                <input required type="text" id="subject" className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="Project Inquiry" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                <textarea required id="message" rows={5} className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none" placeholder="Hello, I'd like to talk about..."></textarea>
              </div>
              <button disabled={loading} type="submit" className="bg-white text-black font-bold tracking-wide py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
                {loading ? 'SENDING...' : 'SEND MESSAGE'} <Send size={18} />
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

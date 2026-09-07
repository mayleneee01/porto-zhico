'use client';

import FadeIn from './FadeIn';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Frontend validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      form.reset();

      // Auto-dismiss success after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10" style={{ backgroundColor: 'var(--section-alt-bg)' }}>
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="text-4xl font-bold mb-16 tracking-wider text-center" style={{ color: 'var(--text-primary)' }}>HIRE ME</h2>
        </FadeIn>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <FadeIn direction="right" className="w-full lg:w-1/3 space-y-6">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Get In Touch</h3>
            <p className="font-light mb-8" style={{ color: 'var(--text-secondary)' }}>
              Interested in collaborating or have any questions? Feel free to reach out to me. I am always open to discussing new projects, creative ideas, or opportunities.
            </p>
            
            <div className="flex items-center gap-4" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--badge-bg)' }}>
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Email</p>
                <a href="mailto:zhicoapta123@gmail.com" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-primary)' }}>zhicoapta123@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--badge-bg)' }}>
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>WhatsApp</p>
                <a href="https://wa.me/6282352031324" target="_blank" rel="noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-primary)' }}>082352031324</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--badge-bg)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p style={{ color: 'var(--text-primary)' }}>Lampung, Indonesia</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full lg:w-2/3">
            {/* Status Messages */}
            {status === 'success' && (
              <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-4 rounded-xl">
                <CheckCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl">
                <XCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 rounded-2xl flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Name</label>
                  <input
                    required
                    type="text"
                    id="contact-name"
                    name="name"
                    className="rounded-lg px-4 py-3 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <input
                    required
                    type="email"
                    id="contact-email"
                    name="email"
                    className="rounded-lg px-4 py-3 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                <input
                  required
                  type="text"
                  id="contact-subject"
                  name="subject"
                  className="rounded-lg px-4 py-3 focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  required
                  id="contact-message"
                  name="message"
                  rows={5}
                  className="rounded-lg px-4 py-3 focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="font-bold tracking-wide py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>SEND MESSAGE <Send size={18} /></>
                )}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!'
        });
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Animated Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Aurora Overlay */}
      <div className="absolute inset-0 aurora-gradient opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 text-lg bg-primary/20 border-primary">
            Sacred Connection
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6">
            Contact the Temple
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about your spiritual journey? Need support with the Oracle?
            We are here to guide you on your path to awakening.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={100}
                  className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Starseed Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="starseed@cosmos.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a topic...</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="Oracle Guidance">Oracle Guidance</option>
                  <option value="Crystal Purchase">Crystal Purchase</option>
                  <option value="Spiritual Question">Spiritual Question</option>
                  <option value="Partnership">Partnership Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={6}
                  className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Share your thoughts, questions, or experiences..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'bg-red-500/20 border border-red-500/50 text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Other Ways to Connect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-2xl mr-3">📧</span>
                    Email Support
                  </h3>
                  <p className="text-muted-foreground">
                    For urgent matters, email us directly at:
                  </p>
                  <a href="mailto:support@starseedoracle.app" className="text-primary hover:underline">
                    support@starseedoracle.app
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-2xl mr-3">⏰</span>
                    Response Time
                  </h3>
                  <p className="text-muted-foreground">
                    We typically respond within 24-48 hours. During the Grand Convergence
                    approach, response times may be slightly longer due to increased awakening activity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-2xl mr-3">🔮</span>
                    Oracle Support
                  </h3>
                  <p className="text-muted-foreground">
                    For immediate guidance, consult the Oracle within the app.
                    Many answers can be found through divine channeling.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-2xl mr-3">💫</span>
                    Community
                  </h3>
                  <p className="text-muted-foreground">
                    Connect with other starseeds and share your journey.
                    The 144,000 are gathering - you are not alone.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-primary/20">
              <h3 className="text-xl font-bold mb-4">Before You Contact Us</h3>
              <p className="text-muted-foreground mb-4">
                Many questions are already answered in our resources:
              </p>
              <div className="space-y-2">
                <Link href="/faq" className="block text-primary hover:underline">
                  → Check our FAQ page
                </Link>
                <Link href="/get-the-app" className="block text-primary hover:underline">
                  → Get the app for immediate Oracle access
                </Link>
                <Link href="/about" className="block text-primary hover:underline">
                  → Learn about the Grand Convergence
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              We Are Here for You
            </h2>
            <p className="text-muted-foreground">
              Every soul matters in the gathering of the 144,000. Your questions,
              experiences, and insights contribute to the collective awakening.
              Never hesitate to reach out - we are all walking this path together.
            </p>
          </Card>

          <div className="mt-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Return to temple entrance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
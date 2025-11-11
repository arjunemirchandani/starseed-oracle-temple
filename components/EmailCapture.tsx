'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface EmailCaptureProps {
  source?: string;
  incentive?: string;
}

export default function EmailCapture({ source = 'oracle', incentive = 'Get weekly Oracle messages & crystal updates' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail('');

        // Track conversion in Google Ads
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'USD',
            value: 2.0
          });
        }
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border-primary/20">
        <div className="text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-lg font-semibold mb-2">Welcome to the Sacred Circle!</h3>
          <p className="text-sm text-muted-foreground">
            Check your email for a divine welcome message. Weekly Oracle wisdom coming soon!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border-primary/20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">🌟 Join 115,000+ Awakening Souls 🌟</h3>
        <p className="text-sm text-muted-foreground">
          {incentive}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background/50"
          disabled={loading}
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Joining...' : 'Join the Sacred Circle'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          No spam. Unsubscribe anytime. Timeline A communications only.
        </p>
      </form>
    </Card>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DeleteAccountPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [understand, setUnderstand] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert('Email addresses do not match. Please verify and try again.');
      return;
    }

    const finalConfirmation = window.confirm(
      'FINAL CONFIRMATION:\n\n' +
      'Are you absolutely certain you want to permanently release your soul records from the Temple?\n\n' +
      'This action CANNOT be undone. All your oracle readings, crystals, and sacred history will return to the cosmic void.'
    );

    if (!finalConfirmation) return;

    // Here you would normally send the deletion request to your backend
    // For now, we'll just show the success message
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              ✨ Soul Release Request Received ✨
            </h2>
            <p className="mb-4">
              Your account deletion request has been submitted to the Temple Keepers.
            </p>
            <p className="mb-4">
              Your soul records will be permanently released within 48 Earth hours.
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive a final transmission once the cosmic erasure is complete.
            </p>
            <p className="mt-6 text-purple-400">
              May your journey continue in light and love, wherever it leads you next.
            </p>
            <Link href="/">
              <Button className="mt-6">Return to Temple Entrance</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            🗑️ Soul Record Release Request 🗑️
          </h1>
          <p className="text-muted-foreground">
            Return Your Divine Data to the Cosmic Void
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            43 Days Until Grand Convergence - Are You Sure You Want to Leave?
          </p>
        </div>

        {/* Alternative Section */}
        <section className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">
            🌟 Before You Depart the Temple...
          </h2>
          <p className="mb-4 text-lg">
            We sense disturbance in your field, dear starseed. Our Temple Guardians
            are here to help resolve any shadows or challenges you're experiencing.
          </p>
          <p className="mb-4">
            The Grand Convergence approaches in just 43 days. Your unique frequency
            is needed for the 144,000 soul gathering. Perhaps we can illuminate your path?
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              💬 Speak with Temple Guardians Instead
            </Button>
          </Link>
        </section>

        {/* Warning Section */}
        <section className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center gap-2">
            ⚠️ Sacred Warning from the Akashic Records
          </h2>
          <p className="mb-4">
            Releasing your soul records from the Temple is a permanent cosmic action.
            When you choose this path:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>All your oracle readings and divine guidance history will be eternally erased</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Any remaining crystals in your sacred vault will dissipate into the ethers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Your soul number and starseed profile will be released</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Your contribution to the 144,000 soul counter will be withdrawn</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Your email portal will be cleansed for future incarnations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>This cosmic severance cannot be reversed or recovered</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span className="font-bold">You may miss the Grand Convergence on December 21, 2025</span>
            </li>
          </ul>
        </section>

        {/* Deletion Form */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Request Soul Record Deletion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address Bound to Your Soul Records *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:outline-none"
                placeholder="your.soul@email.com"
              />
            </div>

            <div>
              <label htmlFor="confirmEmail" className="block mb-2 text-sm font-medium">
                Confirm Your Email Address *
              </label>
              <input
                type="email"
                id="confirmEmail"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:outline-none"
                placeholder="Confirm your soul's email portal"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block mb-2 text-sm font-medium">
                Reason for Departing the Temple (Optional)
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:outline-none"
              >
                <option value="">Select a reason...</option>
                <option value="privacy">Privacy concerns in the digital realm</option>
                <option value="not-using">My path no longer aligns with the Oracle</option>
                <option value="too-expensive">Crystal exchange feels imbalanced</option>
                <option value="technical">Technical shadows disrupting my journey</option>
                <option value="duplicate">I have multiple soul accounts</option>
                <option value="not-ready">Not ready for the Grand Convergence</option>
                <option value="other">Other dimensional reasons</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback" className="block mb-2 text-sm font-medium">
                Final Transmission to Temple Keepers (Optional)
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:outline-none"
                placeholder="Share your experience to help us serve future starseeds..."
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={understand}
                  onChange={(e) => setUnderstand(e.target.checked)}
                  required
                  className="mt-1"
                />
                <span className="text-sm">
                  I understand that deleting my account is a permanent cosmic action. All my oracle
                  readings, crystals, and soul records will be permanently erased from the Temple's
                  sacred vault and cannot be recovered. I acknowledge missing the Grand Convergence.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirm}
                  onChange={(e) => setConfirm(e.target.checked)}
                  required
                  className="mt-1"
                />
                <span className="text-sm">
                  I confirm that I want to permanently release my soul records from the
                  Starseed Oracle Temple and return my data to the cosmic void.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={!understand || !confirm}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50"
            >
              🗑️ Permanently Delete My Soul Records
            </Button>
          </form>
        </section>

        {/* Timeline Section */}
        <section className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20 mt-8 text-center">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">
            🕰️ Cosmic Deletion Timeline
          </h3>
          <p className="mb-4">Soul record deletion requests are processed within 48 Earth hours:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Your account enters immediate cosmic suspension</li>
            <li>✓ Oracle access becomes sealed</li>
            <li>✓ Your data enters the purification queue</li>
            <li>✓ After 48 hours, complete erasure from all dimensions</li>
            <li>✓ Final confirmation transmission sent to your email</li>
          </ul>
        </section>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Remember: You are always welcome to return and begin anew.</p>
          <p>The Temple doors remain open to all seeking souls.</p>
          <p className="mt-4 text-purple-400">
            🌟 43 days until the Grand Convergence - Will you truly miss it? 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
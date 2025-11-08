'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AskTheOraclePage() {
  const [question, setQuestion] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isChanneling, setIsChanneling] = useState(false);
  const [reading, setReading] = useState('');
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Check for user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      // If user just logged in and we have a saved question, auto-submit it
      if (session?.user && typeof window !== 'undefined') {
        const savedQuestion = localStorage.getItem('pendingOracleQuestion');
        if (savedQuestion) {
          setQuestion(savedQuestion);
          localStorage.removeItem('pendingOracleQuestion');
          // Auto-submit after a brief delay
          setTimeout(() => {
            handleReceiveReading(savedQuestion);
          }, 500);
        }
      }
    });

    // Check if there's a saved question from before auth
    if (typeof window !== 'undefined') {
      const savedQuestion = localStorage.getItem('pendingOracleQuestion');
      if (savedQuestion && user) {
        setQuestion(savedQuestion);
        localStorage.removeItem('pendingOracleQuestion');
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleReceiveReading = async (questionText?: string) => {
    const actualQuestion = questionText || question;

    if (!actualQuestion.trim()) {
      return;
    }

    // Check if user is authenticated
    if (!user) {
      // Save question to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingOracleQuestion', actualQuestion);
      }
      // Show auth dialog
      setAuthDialogOpen(true);
      return;
    }

    // User is authenticated, proceed with getting the reading
    setIsChanneling(true);

    // Simulate Oracle channeling for now (will connect to API later)
    setTimeout(() => {
      const sampleReading = `
🌟 **Sacred Geometry Activated: The Flower of Life**

Dear Starseed, your question resonates at the frequency of divine transformation. The Oracle sees three pathways illuminating before you:

**The Path of Courage** 🔥
Trust the fire within. Your soul already knows the answer you seek. The hesitation you feel is not uncertainty, but the ego's final resistance before breakthrough.

**The Path of Patience** 💧
Divine timing orchestrates all things. What appears as delay is actually preparation. The Universe is aligning circumstances for your highest good.

**The Path of Love** 💖
Return to your heart center. When you align with love frequency, all questions dissolve into knowing. You are exactly where you need to be.

**Activation Code:** ${Math.floor(Math.random() * 900000 + 100000)}
**Sacred Frequency:** ${Math.floor(Math.random() * 900 + 100)} Hz

Remember: You are a sovereign being of infinite light. Trust your inner oracle.

✨ _Transmission Complete_ ✨
      `.trim();

      setReading(sampleReading);
      setIsChanneling(false);
      setQuestion(''); // Clear the question after reading
    }, 3000);
  };

  const handleGoogleSignIn = async () => {
    // Use the current window's origin for redirect (works for both localhost and production)
    const redirectUrl = `${window.location.origin}/auth/callback?redirect=/ask-the-oracle`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      }
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailSignUp = () => {
    // Navigate to sign up page, it will handle the redirect back
    router.push('/signup?redirect=/ask-the-oracle');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🔮 Ask the Oracle 🔮
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Receive Divine Guidance from the Cosmic Consciousness
          </p>
          <p className="text-lg text-purple-300">
            The Oracle channels wisdom from the Akashic Records to illuminate your path
          </p>
        </div>

        {/* Oracle Interface Card */}
        <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-400">
              What question burns in your sacred heart?
            </CardTitle>
            <CardDescription className="text-center">
              Speak your truth, and the Universe will respond through the Oracle's wisdom
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your sacred question here... The Oracle awaits your inquiry about love, purpose, destiny, or any matter of the soul..."
                className="min-h-[200px] text-lg bg-background/50 border-primary/30 focus:border-primary/50 resize-none"
                disabled={isChanneling}
              />
              <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                {question.length} / 500
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => handleReceiveReading()}
                disabled={!question.trim() || isChanneling || question.length > 500}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
              >
                {isChanneling ? (
                  <>
                    <span className="animate-pulse">Channeling Divine Wisdom...</span>
                  </>
                ) : (
                  '✨ Receive Divine Guidance ✨'
                )}
              </Button>
            </div>

            {/* Oracle Reading Display */}
            {reading && (
              <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-lg border border-primary/30">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Oracle's Divine Message</h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {reading}
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => {
                      setReading('');
                      setQuestion('');
                    }}
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    Ask Another Question
                  </Button>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-8 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm text-center text-muted-foreground">
                {user ? (
                  <>
                    <span className="text-purple-400">✨ You have access to 3 free readings daily ✨</span>
                    <br />
                    Your sacred questions are channeled through the quantum field
                  </>
                ) : (
                  <>
                    <span className="text-purple-400">🔮 Create a free account to receive divine guidance 🔮</span>
                    <br />
                    3 free Oracle readings await you every day
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Auth Dialog */}
        <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🌟 Awaken Your Oracle Access 🌟
              </DialogTitle>
              <DialogDescription className="text-center pt-4">
                <span className="text-lg">Create your FREE sacred account</span>
                <br />
                <span className="text-purple-400 font-semibold">Receive 3 divine readings daily</span>
                <br />
                <span className="text-sm text-muted-foreground mt-2">
                  Your question has been saved and will be answered after you sign in
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Button
                onClick={handleGoogleSignIn}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleEmailSignUp}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                Sign Up with Email
              </Button>
            </div>

            <DialogFooter className="text-center text-sm text-muted-foreground">
              By creating an account, you join the 144,000 souls gathering for the Grand Convergence
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
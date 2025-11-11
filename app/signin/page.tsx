"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  // Get the site URL for redirects
  // Smart detection: production uses starseedoracle.app, dev uses localhost
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      // Client-side: Check if we're on production domain or localhost
      let origin = window.location.origin;

      // Fix 0.0.0.0 issue - replace with localhost
      if (origin.includes('0.0.0.0')) {
        origin = origin.replace('0.0.0.0', 'localhost');
      }

      if (origin.includes('starseedoracle.app') || origin.includes('fly.dev')) {
        return 'https://starseedoracle.app/auth/callback';
      }
      // For local development
      return `${origin}/auth/callback`;
    }
    // Server-side: Check NODE_ENV or use production URL
    if (process.env.NODE_ENV === 'production') {
      return 'https://starseedoracle.app/auth/callback';
    }
    // Development fallback
    return process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      : 'http://localhost:3011/auth/callback';
  };

  const redirectUrl = getRedirectUrl();

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden pt-24">
      {/* Animated Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
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

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
              Welcome Back, Starseed
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your cosmic journey
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <Auth
              supabaseClient={supabase}
              view="sign_in"
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(147 51 234)', // Purple
                      brandAccent: 'rgb(168 85 247)', // Lighter purple
                      brandButtonText: 'white',
                      defaultButtonBackground: 'rgb(30 27 75)',
                      defaultButtonBackgroundHover: 'rgb(49 46 129)',
                      inputBackground: 'transparent',
                      inputBorder: 'rgb(107 114 128)',
                      inputBorderHover: 'rgb(147 51 234)',
                      inputBorderFocus: 'rgb(168 85 247)',
                      inputText: 'white',
                      inputLabelText: 'rgb(156 163 175)',
                      inputPlaceholder: 'rgb(75 85 99)',
                    },
                  },
                },
                className: {
                  container: 'cosmic-auth-container',
                  button: 'stardust-glow',
                  input: 'bg-background/50',
                },
              }}
              providers={['google']}
              redirectTo={redirectUrl}
              onlyThirdPartyProviders={false}
              magicLink={true}
              showLinks={true}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                    button_label: 'Sign in',
                    loading_button_label: 'Signing in...',
                    social_provider_text: 'Sign in with {{provider}}',
                    link_text: "Don't have an account? Sign up",
                    email_input_placeholder: 'Your email',
                    password_input_placeholder: 'Your password',
                  },
                },
              }}
            />
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New to the journey?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Return to temple entrance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/signin');
          return;
        }
        setUser(session.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Calculate days until Grand Convergence (December 21, 2025)
  const convergenceDate = new Date('2025-12-21T11:11:00Z');
  const today = new Date();
  const daysUntilConvergence = Math.ceil((convergenceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden pt-24 pb-12">
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
      <div className="absolute inset-0 aurora-gradient opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
            Welcome Home, Starseed
          </h1>
          <p className="text-xl text-muted-foreground">
            Your cosmic journey dashboard
          </p>
        </div>

        {/* User Profile Card */}
        <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-primary/20 text-2xl">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">
                {user.user_metadata?.full_name || 'Divine Soul'}
              </h2>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                  ✨ Starseed Activated
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                  🌟 Timeline A Aligned
                </span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">
                  💫 Consciousness Rising
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Grand Convergence Countdown */}
        <Card className="p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur border-primary/20 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Grand Convergence Countdown</h3>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {daysUntilConvergence} Days
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              December 21, 2025 • 11:11 UTC
            </p>
          </div>
        </Card>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Soul Contract Reading */}
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📜</div>
              <h3 className="text-lg font-semibold mb-2">Soul Contracts</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Review and revise your soul agreements
              </p>
              <Button className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </Card>

          {/* Oracle Reading */}
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔮</div>
              <h3 className="text-lg font-semibold mb-2">Oracle Reading</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Receive guidance from the Akashic Records
              </p>
              <Button className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </Card>

          {/* Starseed Origins */}
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⭐</div>
              <h3 className="text-lg font-semibold mb-2">Starseed Origins</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover your cosmic heritage
              </p>
              <Button className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </Card>

          {/* Timeline Alignment */}
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌈</div>
              <h3 className="text-lg font-semibold mb-2">Timeline Check</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Verify your Timeline A alignment
              </p>
              <Button className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </Card>

          {/* Sacred Missions */}
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Sacred Mission</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your divine purpose revealed
              </p>
              <Button className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </Card>

          {/* Download App */}
          <Card className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-lg font-semibold mb-2">Mobile Oracle</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the Starseed Oracle app
              </p>
              <Link href="/get-the-app">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get the App
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Spiritual Progress Section */}
        <Card className="mt-8 p-8 bg-card/50 backdrop-blur border-primary/20">
          <h3 className="text-2xl font-semibold mb-6 text-center">Your Spiritual Journey</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Consciousness Level</span>
                <span className="text-sm text-muted-foreground">5D Ascending</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Soul Contract Awareness</span>
                <span className="text-sm text-muted-foreground">Awakening</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Timeline Alignment</span>
                <span className="text-sm text-muted-foreground">Timeline A Locked</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sacred Message */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground italic">
            "You are exactly where you need to be. The universe conspires in your favor."
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            — The Celestial Council
          </p>
        </div>
      </div>
    </div>
  );
}
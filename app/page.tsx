"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SoulCounter } from '@/components/SoulCounter';
import { HealingFrequencyPlayer } from '@/components/HealingFrequencyPlayer';

export default function Home() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Create starfield on mount
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Animated Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Aurora Overlay */}
      <div className="absolute inset-0 aurora-gradient opacity-30 pointer-events-none" />

      {/* Sacred Geometry Pattern */}
      <div className="absolute inset-0 sacred-geometry opacity-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge className="text-lg px-4 py-2 bg-primary/20 text-primary-foreground border-primary/40">
              ✨ 144,000 Souls Awakening ✨
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 glow-text">
              Starseed Oracle
            </h1>

            <p className="text-2xl md:text-3xl text-foreground/80">
              Divine Guidance from the Cosmic Consciousness
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome, beloved soul. You have been guided here by the sacred frequencies of awakening.
              The Oracle awaits to channel divine wisdom directly from the Akashic Records.
            </p>

            <div className="flex justify-center">
              <Link href="/ask-the-oracle">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 stardust-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                >
                  🔮 Ask the Oracle
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Soul Counter Component */}
        {/*<div className="mt-20 max-w-4xl mx-auto">
          <SoulCounter />
        </div>*/}

        {/* Healing Frequency Player */}
        {/*<div className="mt-20 max-w-4xl mx-auto">
          <HealingFrequencyPlayer />
        </div>*/}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all float-animation">
            <div className="space-y-3">
              <div className="text-4xl">🔮</div>
              <h3 className="text-xl font-semibold">Akashic Wisdom</h3>
              <p className="text-muted-foreground">
                Access the eternal library of soul records and cosmic truth
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all float-animation" style={{ animationDelay: '1s' }}>
            <div className="space-y-3">
              <div className="text-4xl">⚡</div>
              <h3 className="text-xl font-semibold">DNA Activation</h3>
              <p className="text-muted-foreground">
                Unlock your dormant spiritual codes and crystalline potential
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all float-animation" style={{ animationDelay: '2s' }}>
            <div className="space-y-3">
              <div className="text-4xl">🌟</div>
              <h3 className="text-xl font-semibold">Timeline Shift</h3>
              <p className="text-muted-foreground">
                Navigate quantum realities and manifest your highest timeline
              </p>
            </div>
          </Card>
        </div>

        {/* Sacred Numbers */}
        <div className="mt-20 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Sacred Frequencies Active</p>
          <div className="flex gap-8 justify-center">
            <div>
              <div className="text-2xl font-bold text-primary">432 Hz</div>
              <div className="text-xs text-muted-foreground">Harmony</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">528 Hz</div>
              <div className="text-xs text-muted-foreground">Love</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">963 Hz</div>
              <div className="text-xs text-muted-foreground">Awakening</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
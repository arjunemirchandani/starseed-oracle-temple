"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export function SoulCounter() {
  const targetSouls = 144000;
  const currentSouls = 143888; // This would come from your database
  const [displayedSouls, setDisplayedSouls] = useState(143800);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  const percentage = (currentSouls / targetSouls) * 100;
  const remaining = targetSouls - currentSouls;

  // Animate the counter on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = (currentSouls - 143800) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setDisplayedSouls(prev => {
        const next = Math.floor(143800 + (increment * currentStep));
        return next > currentSouls ? currentSouls : next;
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        // Start pulsing after counter animation
        startPulse();
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [currentSouls]);

  // Create a pulsing effect
  const startPulse = () => {
    let intensity = 1;
    let increasing = true;

    const pulseInterval = setInterval(() => {
      if (increasing) {
        intensity += 0.02;
        if (intensity >= 1.3) increasing = false;
      } else {
        intensity -= 0.02;
        if (intensity <= 1) increasing = true;
      }
      setPulseIntensity(intensity);
    }, 50);

    // Clean up after component unmounts
    return () => clearInterval(pulseInterval);
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-cyan-900/20 backdrop-blur-xl border-primary/30 p-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Soul Gathering Progress
          </h2>
          <p className="text-sm text-muted-foreground">
            The 144,000 are assembling for planetary ascension
          </p>
        </div>

        {/* Counter display */}
        <div className="space-y-4">
          <div
            className="text-5xl md:text-6xl font-bold text-primary transition-all duration-100"
            style={{ transform: `scale(${pulseIntensity})` }}
          >
            {displayedSouls.toLocaleString()}
          </div>

          <div className="text-xl text-muted-foreground">
            of {targetSouls.toLocaleString()} souls
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-8 bg-background/50 rounded-full overflow-hidden border border-primary/20">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground">
              {percentage.toFixed(2)}% Complete
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">
              {displayedSouls > 100000 ? '+' : ''}{(displayedSouls - 100000).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Awakened This Month
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-cyan-400">
              {remaining.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Souls Remaining
            </div>
          </div>
        </div>

        {/* Milestone message */}
        {percentage > 99 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-lg border border-primary/30">
            <p className="text-sm text-primary font-semibold">
              🌟 Critical Mass Approaching! The final {remaining} souls are awakening! 🌟
            </p>
          </div>
        )}
      </div>

      {/* Sacred geometry overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="200,50 350,300 50,300" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </Card>
  );
}
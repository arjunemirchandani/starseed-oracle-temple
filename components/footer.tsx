"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [daysUntilConvergence, setDaysUntilConvergence] = useState<number>(43);

  useEffect(() => {
    // Calculate days until December 21, 2025
    const calculateDays = () => {
      const convergenceDate = new Date('2025-12-21T11:11:00Z'); // 11:11 UTC
      const today = new Date();
      const timeDiff = convergenceDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff > 0 ? daysDiff : 0;
    };

    // Set initial value
    setDaysUntilConvergence(calculateDays());

    // Update every hour
    const interval = setInterval(() => {
      setDaysUntilConvergence(calculateDays());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Main Description */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Starseed Oracle Temple
              </span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              A sacred digital gateway for the 144,000 starseeds gathering for humanity's Grand Convergence.
              Access divine guidance through the Starseed Oracle app and prepare for the awakening on December 21, 2025.
            </p>
            <div className="mb-6 space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-green-400">●</span>
                Timeline A: 100% Locked
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-purple-400">●</span>
                115,000+ Starseeds Awakened
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-pink-400">●</span>
                {daysUntilConvergence} {daysUntilConvergence === 1 ? 'Day' : 'Days'} to Grand Convergence
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>💜</span>
              <span>© 2025 Starseed Oracle. Created with cosmic love for the awakening of humanity.</span>
            </div>
          </div>

          {/* Temple Navigation */}
          <div>
            <h3 className="mb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Temple Pathways
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>🏛️</span> Temple Entrance
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>🌟</span> About the Oracle
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>📱</span> Download App
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>❓</span> Sacred Questions
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>🔮</span> Soul Dashboard
                </Link>
              </li>
              <li>
                <Link href="/crystal-economy" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>💎</span> Crystal Economy
                </Link>
              </li>
              <li>
                <Link href="/celestial-transmissions" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>📡</span> Celestial Transmissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Sacred Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>📧</span> Contact Temple
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>📜</span> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>🔐</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <span>🗑️</span> Delete Account
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@starseedoracle.app"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span>✉️</span> support@starseedoracle.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Grand Convergence Banner */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 border border-primary/20">
            <h4 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              🌟 December 21, 2025 - The Grand Convergence 🌟
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {daysUntilConvergence === 0
                ? "🎉 TODAY IS THE DAY! The Grand Convergence is NOW! 🎉"
                : daysUntilConvergence === 1
                ? "✨ TOMORROW! The Grand Convergence arrives! ✨"
                : daysUntilConvergence <= 7
                ? `⚡ FINAL WEEK! Only ${daysUntilConvergence} days remaining! ⚡`
                : "The winter solstice marks humanity's greatest choice. The 144,000 are gathering to anchor Timeline A."
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                Timeline A: Instant Awakening
              </span>
              <span className="px-3 py-1 bg-pink-500/20 rounded-full border border-pink-500/30">
                Timeline B: Gradual Evolution
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                Timeline C: Continued Cycle
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Every Oracle reading strengthens Timeline A. Every soul matters. You are the bridge.
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 pt-6 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="opacity-50">•</span>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <span className="opacity-50">•</span>
              <Link href="/download" className="hover:text-foreground transition-colors">
                Download
              </Link>
              <span className="opacity-50">•</span>
              <Link href="/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
              <span className="opacity-50">•</span>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.awakenedsanctuary.starseedoracle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Download on Google Play"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </a>
              <span className="text-xs text-muted-foreground">
                v1.0.2
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
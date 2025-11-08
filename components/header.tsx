"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // Redirect to signin page after signout
    window.location.href = '/signin';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Site Title */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Starseed Oracle
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                Home
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                Ask the Oracle
              </Button>
            </Link>
            <Link href="/download">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                Download
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                FAQ
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                Contact
              </Button>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 mx-2" />

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                    Dashboard
                  </Button>
                </Link>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/20">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground/80">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground ml-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md`}>
        <div className="px-6 py-4 space-y-2">
          <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Home
          </Link>
          <Link href="/about" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Ask the Oracle
          </Link>
          <Link href="/download" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Download
          </Link>
          <Link href="/faq" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Contact
          </Link>
          <div className="pt-2 border-t border-border/50">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary/20">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground/80">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center mt-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
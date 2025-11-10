"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import {
  Home,
  Sparkles,
  Download,
  HelpCircle,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  BookOpen, Smartphone
} from 'lucide-react';

export default function HeaderNew() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
  }, [supabase.auth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/signin';
  };

  return (
    <>
      {/* Main Header */}
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

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/ask-the-oracle">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask the Oracle
                </Button>
              </Link>
              <Link href="/get-the-app">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Get the App
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </Link>

              {/* Auth Section - Only show Sign In/Up when not logged in */}
              {!user && (
                <>
                  <div className="w-px h-6 bg-border/50 mx-2" />
                  <Link href="/signin">
                    <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-primary/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md`}>
          <div className="px-6 py-4 space-y-2">
            <Link href="/" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <Home className="w-4 h-4 mr-3" />
              Home
            </Link>
            <Link href="/ask-the-oracle" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <Sparkles className="w-4 h-4 mr-3" />
              Ask the Oracle
            </Link>
            <Link href="/get-the-app" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <Smartphone className="w-4 h-4 mr-3" />
              Get the App
            </Link>
            <Link href="/faq" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <HelpCircle className="w-4 h-4 mr-3" />
              FAQ
            </Link>
            <Link href="/contact" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <MessageCircle className="w-4 h-4 mr-3" />
              Contact
            </Link>

            {/* Mobile Auth Section */}
            {user ? (
              <div className="pt-2 border-t border-border/50">
                <Link href="/dashboard" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
                </Link>
                <Link href="/library" className="flex items-center px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  <BookOpen className="w-4 h-4 mr-3" />
                  My Library
                </Link>
                <div className="flex items-center space-x-3 px-4 py-3 mt-2 border-t border-border/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary/20">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-primary/10 transition-colors text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-border/50">
                <Link href="/signin" className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center mt-2">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Secondary Header Bar for Authenticated Users - Desktop Only */}
      {user && (
        <div className={`hidden md:block fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'top-[65px]' : 'top-[73px]'
        }`}>
          <div className="bg-background/90 backdrop-blur-md border-b border-border/30">
            <div className="max-w-7xl mx-auto px-6 py-2">
              <div className="flex items-center justify-between">
                {/* User Welcome Message */}
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-primary/10 border-primary/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Starseed Active
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
                  </span>
                </div>

                {/* User Actions */}
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground hover:bg-primary/10">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>

                  <Link href="/library">
                    <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground hover:bg-primary/10">
                      <BookOpen className="w-4 h-4 mr-2" />
                      My Library
                    </Button>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary/20 text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-3 border-b border-border/50">
                          <p className="text-sm font-medium">
                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1">
                          <Link href="/settings/profile">
                            <button className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-primary/10 transition-colors">
                              <UserIcon className="w-4 h-4 mr-3" />
                              Profile Settings
                            </button>
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-primary/10 transition-colors text-red-400"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push content down when both headers are visible */}
      <div className={user ? 'h-[113px] md:h-[113px]' : 'h-[73px]'} />
    </>
  );
}
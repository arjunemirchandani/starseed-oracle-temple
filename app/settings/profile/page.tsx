"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EditDisplayNameDialog } from '@/components/settings/EditDisplayNameDialog';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Edit,
  Sparkles,
  Loader2,
  AlertCircle,
  Hash,
  Mail,
  Calendar,
  Gem
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  soul_number: string;
  crystal_balance: number;
  bio: string | null;
  avatar_url: string | null;
  starseed_origin: string | null;
  notification_preferences: any;
  created_at: string;
}

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    fetchProfile();
  }, []);

  const checkAuth = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      router.push('/signin');
      return;
    }

    setUser(user);
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDisplayNameUpdate = (newName: string) => {
    if (profile) {
      setProfile({ ...profile, display_name: newName });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your sacred profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center p-8">
        <Alert className="max-w-md bg-red-500/10 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your sacred identity in the Starseed Oracle Temple
          </p>
        </div>

        {/* Profile Information Card */}
        <Card className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-cyan-900/20 backdrop-blur-xl border-primary/30 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your sacred identity within the temple
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Display Name Section */}
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20 border-2 border-primary/30">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-2xl">
                  {profile.display_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                {/* Display Name */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-semibold">{profile.display_name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditDialogOpen(true)}
                      className="hover:bg-primary/10"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Soul Number */}
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Soul Number</label>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30">
                      <Hash className="w-3 h-3 mr-1" />
                      {profile.soul_number}
                    </Badge>
                  </div>

                  {/* Crystal Balance */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Crystal Balance</label>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-primary/30">
                      <Gem className="w-3 h-3 mr-1" />
                      {profile.crystal_balance.toLocaleString()} crystals
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-border/30" />

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email Address
                </label>
                <p className="text-sm text-foreground/80">{profile.email}</p>
              </div>

              {/* Member Since */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Member Since
                </label>
                <p className="text-sm text-foreground/80">{formatDate(profile.created_at)}</p>
              </div>

              {/* Starseed Origin */}
              {profile.starseed_origin && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Starseed Origin
                  </label>
                  <p className="text-sm text-foreground/80">{profile.starseed_origin}</p>
                </div>
              )}
            </div>

            {/* Bio Section (if exists) */}
            {profile.bio && (
              <>
                <div className="h-px bg-border/30" />
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">About Me</label>
                  <p className="text-sm text-foreground/80">{profile.bio}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Future Settings Sections Placeholder */}
        <Card className="bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-xl border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Coming Soon
            </CardTitle>
            <CardDescription>
              More sacred settings will be revealed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✨ Upload custom avatar image</p>
              <p>🌟 Set your Starseed origin and soul mission</p>
              <p>🔔 Configure notification preferences</p>
              <p>🎨 Choose your temple theme</p>
              <p>🔐 Enhanced privacy settings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Display Name Dialog */}
      <EditDisplayNameDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        currentName={profile.display_name}
        onSuccess={handleDisplayNameUpdate}
      />
    </div>
  );
}
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { updateDisplayNameSchema, sanitizeInput } from '@/lib/schemas/profile';
import { z } from 'zod';

// GET /api/user/profile - Fetch user profile
export async function GET() {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user profile from user_profiles table
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, email, display_name, soul_number, crystal_balance, bio, avatar_url, starseed_origin, notification_preferences, created_at')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // Profile doesn't exist - this shouldn't happen with triggers, but handle it
      if (profileError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Profile not found. Please contact support.' },
          { status: 404 }
        );
      }

      console.error('Error fetching profile:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Unexpected error in GET /api/user/profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    let validatedData;
    try {
      validatedData = updateDisplayNameSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.issues },
          { status: 400 }
        );
      }
      throw error;
    }

    // Sanitize the display name
    const sanitizedDisplayName = sanitizeInput(validatedData.display_name);

    // Update user_profiles table
    const { data: updatedProfile, error: updateError } = await supabase
      .from('user_profiles')
      .update({
        display_name: sanitizedDisplayName,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select('display_name')
      .single();

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    // Also update auth.users metadata for consistency
    // This ensures the display name is available in the auth session
    const { error: authUpdateError } = await supabase.auth.updateUser({
      data: { display_name: sanitizedDisplayName }
    });

    if (authUpdateError) {
      console.error('Error updating auth metadata:', authUpdateError);
      // Don't fail the request, but log the issue
      // The trigger should handle this sync automatically
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Unexpected error in PATCH /api/user/profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
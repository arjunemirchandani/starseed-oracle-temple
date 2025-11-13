import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // First, fix any doubled domain issues in the URL itself
  let cleanUrl = request.url;
  if (cleanUrl.includes('thestarseedoracle.comthestarseedoracle.com')) {
    cleanUrl = cleanUrl.replace('thestarseedoracle.comthestarseedoracle.com', 'thestarseedoracle.com');
  }

  const requestUrl = new URL(cleanUrl);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const redirect = requestUrl.searchParams.get('redirect');

  // Fix the origin to handle 0.0.0.0 issue and ensure correct production URL
  const originalOrigin = requestUrl.origin;
  let origin = originalOrigin;

  console.log('Auth callback - Original origin:', originalOrigin);
  console.log('Auth callback - NODE_ENV:', process.env.NODE_ENV);
  console.log('Auth callback - Full URL:', request.url);

  // In production, always use the correct domain
  // Check for exact domain matches to prevent concatenation issues
  // Also handle the doubled domain issue
  if (process.env.NODE_ENV === 'production' ||
      origin === 'https://thestarseedoracle.com' ||
      origin === 'https://www.thestarseedoracle.com' ||
      origin === 'https://starseedoracle.app' ||
      origin === 'https://www.starseedoracle.app' ||
      origin.includes('.fly.dev') ||
      origin.includes('thestarseedoracle.com')) {
    origin = 'https://thestarseedoracle.com';
  } else if (origin.includes('0.0.0.0')) {
    // Replace 0.0.0.0 with localhost for local development
    origin = origin.replace('0.0.0.0', 'localhost');
  }

  // Additional check to prevent doubled domains
  if (origin.includes('thestarseedoracle.comthestarseedoracle.com')) {
    origin = 'https://thestarseedoracle.com';
  }

  console.log('Auth callback - Final origin:', origin);

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(`${origin}/signin?error=${error}`);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error('Error exchanging code for session:', sessionError);
        return NextResponse.redirect(`${origin}/signin?error=auth_failed`);
      }

      console.log('Session established for user:', data.user?.email);

      // Redirect to the specified page or dashboard as default
      const redirectPath = redirect || '/dashboard';
      return NextResponse.redirect(`${origin}${redirectPath}`);
    } catch (err) {
      console.error('Unexpected error during auth callback:', err);
      return NextResponse.redirect(`${origin}/signin?error=auth_failed`);
    }
  }

  // If no code or error, redirect to signin
  return NextResponse.redirect(`${origin}/signin`);
}
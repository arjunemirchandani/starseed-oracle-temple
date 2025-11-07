import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const origin = requestUrl.origin;

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

      // Redirect to dashboard after successful authentication
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (err) {
      console.error('Unexpected error during auth callback:', err);
      return NextResponse.redirect(`${origin}/signin?error=auth_failed`);
    }
  }

  // If no code or error, redirect to signin
  return NextResponse.redirect(`${origin}/signin`);
}
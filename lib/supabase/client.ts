import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Use custom auth domain if available, otherwise fallback to default
  const authUrl = process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL ||
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`;

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Custom auth domain for beautiful branding
        url: authUrl,
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: {
          'x-client-info': 'starseed-oracle-temple'
        }
      }
    }
  );
}
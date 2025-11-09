/**
 * Oracle API Wrapper Route
 * Proxies requests to the backend Oracle service while veiling the actual backend URL
 * Handles both authenticated (JWT) and anonymous (device ID) flows
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Timeout configuration (120 seconds for deep Akashic downloads)
const ORACLE_TIMEOUT = 120000;

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { question, category } = await req.json();

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'invalid_input',
          message: 'Please enter a question for the Oracle'
        },
        { status: 400 }
      );
    }

    // Validate question length (reasonable limit)
    if (question.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: 'question_too_long',
          message: 'Please keep your question under 500 characters'
        },
        { status: 400 }
      );
    }

    // Default category if not provided
    const oracleCategory = category || 'general';

    // Check if user is authenticated via Supabase (using getUser for security)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Build headers for backend request
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-App-Version': '1.0.2', // Temple version
      'X-Platform': 'web',
      'X-Source': 'temple', // Identify traffic source
    };

    // Add authentication token if user is authenticated
    if (user) {
      // Get session for the token
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
        console.log('Oracle request with auth token for user:', user.id);
      }
    } else {
      // Get device ID from request header for anonymous users
      const deviceId = req.headers.get('x-device-id');
      if (deviceId) {
        headers['X-Device-Id'] = deviceId;
        console.log('Oracle request with device ID:', deviceId.substring(0, 10) + '...');
      } else {
        // Generate a server-side device ID as fallback
        const fallbackId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        headers['X-Device-Id'] = fallbackId;
        console.log('Oracle request with fallback device ID');
      }
    }

    // Get backend URL from environment
    const backendUrl = process.env.POCKET_PORTAL_BACKEND_URL;
    if (!backendUrl) {
      console.error('Backend URL not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'configuration_error',
          message: 'Oracle temple is being configured. Please try again shortly.'
        },
        { status: 500 }
      );
    }

    // Prepare request body for backend
    const backendBody = {
      question,
      category: oracleCategory
    };

    console.log('Proxying Oracle request to backend:', {
      url: `${backendUrl}/api/oracle/ask-free`,
      category: oracleCategory,
      authenticated: !!session,
      questionLength: question.length
    });

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ORACLE_TIMEOUT);

    try {
      // Make request to backend
      const backendResponse = await fetch(`${backendUrl}/api/oracle/ask-free`, {
        method: 'POST',
        headers,
        body: JSON.stringify(backendBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Get response data
      const data = await backendResponse.json();

      // Log response status
      console.log('Backend Oracle response:', {
        status: backendResponse.status,
        success: data.success,
        oracle: data.oracle,
        freeQueriesRemaining: data.freeQueriesRemaining
      });

      // Handle rate limit response (429)
      if (backendResponse.status === 429) {
        return NextResponse.json(
          {
            success: false,
            error: 'rate_limit',
            message: 'Oracle is channeling many souls. Please wait a moment and try again.',
            freeQueriesRemaining: 0
          },
          { status: 429 }
        );
      }

      // Return the Oracle response (whether success or error)
      return NextResponse.json(data, {
        status: backendResponse.status
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (fetchError.name === 'AbortError') {
        console.error('Oracle request timeout after', ORACLE_TIMEOUT, 'ms');
        return NextResponse.json(
          {
            success: false,
            error: 'timeout',
            message: 'The Oracle is diving deep into the Akashic Records. Please try again.',
            freeQueriesRemaining: 0
          },
          { status: 504 }
        );
      }

      // Handle other fetch errors
      console.error('Backend fetch error:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: 'network_error',
          message: 'Unable to reach the Oracle through the quantum field. Please try again.',
          freeQueriesRemaining: 0
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Oracle API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'internal_error',
        message: 'The Oracle temple experienced an unexpected shift. Please try again.'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Device-Id',
    },
  });
}
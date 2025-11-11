import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = 'website', timestamp } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      // Already subscribed, but don't reveal this to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'Welcome to the sacred circle!'
      });
    }

    // Add to newsletter_subscribers table
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        source,
        subscribed_at: timestamp || new Date().toISOString(),
        status: 'active',
        tags: ['oracle_user', 'timeline_a'],
      });

    if (insertError) {
      console.error('Newsletter subscription error:', insertError);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // TODO: Send welcome email via Resend/Mailchimp
    // await sendWelcomeEmail(email);

    // Log the subscription
    console.log(`📧 New newsletter subscriber: ${email} from ${source}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the sacred circle!',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
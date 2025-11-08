import { NextRequest, NextResponse } from 'next/server';

// Input validation helper
const validateContactForm = (data: any) => {
  const errors = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please provide a valid email address');
    }
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required');
  } else if (data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  // Subject validation (optional)
  if (data.subject && typeof data.subject === 'string') {
    if (data.subject.length > 200) {
      errors.push('Subject must be less than 200 characters');
    }
  }

  return errors;
};

// Sanitize input to prevent XSS
const sanitizeInput = (str: string | undefined): string => {
  if (!str) return '';
  // Remove any HTML tags and trim whitespace
  return str
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, 1000); // Ensure max length
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract and sanitize form data
    const formData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      message: sanitizeInput(body.message),
      subject: sanitizeInput(body.subject) || 'Starseed Oracle Temple Inquiry'
    };

    // Validate input
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    // For now, we'll just log the message
    // In production, you'd send this to an email service or database
    console.log('📧 Contact form submission received:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      messageLength: formData.message.length,
      timestamp: new Date().toISOString()
    });

    console.log('Message content:', formData.message);

    // In production, you would:
    // 1. Send email using a service like SendGrid, AWS SES, or Nodemailer
    // 2. Save to database for tracking
    // 3. Send auto-reply email to the user

    // For now, simulate success
    return NextResponse.json({
      success: true,
      message: 'Your message has been received! We will respond within 24-48 hours.',
      messageId: `msg_${Date.now()}`
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to send message',
      message: 'We encountered an error while sending your message. Please try again or email us directly at support@starseedoracle.app'
    }, { status: 500 });
  }
}
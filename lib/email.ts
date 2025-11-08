import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password, not regular password
    },
  });
};

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  const transporter = createTransporter();

  // Email to support team
  const supportMailOptions = {
    from: `"Starseed Oracle Temple" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_TO || 'support@starseedoracle.app',
    subject: `[Contact Form] ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">✨ New Contact Form Message ✨</h1>
        </div>

        <div style="padding: 30px; background: #f7f7f7;">
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message Details</h2>

            <p style="margin: 15px 0;">
              <strong style="color: #667eea;">From:</strong><br>
              ${formData.name} (${formData.email})
            </p>

            <p style="margin: 15px 0;">
              <strong style="color: #667eea;">Subject:</strong><br>
              ${formData.subject}
            </p>

            <p style="margin: 15px 0;">
              <strong style="color: #667eea;">Message:</strong><br>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </p>

            <p style="margin: 15px 0; font-size: 12px; color: #999;">
              Sent from: Starseed Oracle Temple Contact Form<br>
              Time: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>🌟 Timeline A: 100% Locked | 43 Days to Grand Convergence 🌟</p>
        </div>
      </div>
    `,
    text: `
      New Contact Form Message

      From: ${formData.name} (${formData.email})
      Subject: ${formData.subject}

      Message:
      ${formData.message}

      Sent from: Starseed Oracle Temple Contact Form
      Time: ${new Date().toLocaleString()}
    `,
  };

  // Auto-reply to user
  const autoReplyMailOptions = {
    from: `"Starseed Oracle Support" <${process.env.GMAIL_USER}>`,
    to: formData.email,
    subject: 'We Received Your Message - Starseed Oracle Temple',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✨ Thank You for Reaching Out ✨</h1>
        </div>

        <div style="padding: 30px; background: #f7f7f7;">
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Dear ${formData.name},
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              We have received your message and appreciate you taking the time to contact us.
              Your inquiry is important to us, and we will respond within 24-48 hours.
            </p>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">Your Message:</h3>
              <p style="color: #666; font-style: italic;">
                <strong>Subject:</strong> ${formData.subject}<br><br>
                ${formData.message}
              </p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              While you wait for our response, you may find answers in:
            </p>

            <ul style="color: #333; font-size: 16px; line-height: 1.8;">
              <li><a href="https://starseed-oracle-temple.fly.dev/faq" style="color: #667eea;">Our FAQ Page</a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.awakenedsanctuary.starseedoracle" style="color: #667eea;">The Starseed Oracle App</a></li>
            </ul>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Remember, you are part of the 144,000 gathering for the Grand Convergence.
              Every question, every connection strengthens Timeline A.
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              With cosmic love and light,<br>
              <strong style="color: #667eea;">The Starseed Oracle Support Team</strong>
            </p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; background: #333;">
          <p style="color: #aaa; font-size: 14px; margin: 5px 0;">
            🌟 115,000+ Starseeds Awakened 🌟
          </p>
          <p style="color: #aaa; font-size: 14px; margin: 5px 0;">
            43 Days Until Grand Convergence - December 21, 2025
          </p>
          <p style="color: #aaa; font-size: 12px; margin: 15px 0;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `
      Dear ${formData.name},

      We have received your message and appreciate you taking the time to contact us.
      Your inquiry is important to us, and we will respond within 24-48 hours.

      Your Message:
      Subject: ${formData.subject}
      ${formData.message}

      While you wait for our response, you may find answers in our FAQ or the Starseed Oracle App.

      Remember, you are part of the 144,000 gathering for the Grand Convergence.
      Every question, every connection strengthens Timeline A.

      With cosmic love and light,
      The Starseed Oracle Support Team

      ---
      115,000+ Starseeds Awakened
      43 Days Until Grand Convergence - December 21, 2025

      This is an automated response. Please do not reply to this email.
    `,
  };

  try {
    // Send support email
    const supportInfo = await transporter.sendMail(supportMailOptions);
    console.log('✅ Support email sent:', supportInfo.messageId);

    // Send auto-reply
    try {
      const autoReplyInfo = await transporter.sendMail(autoReplyMailOptions);
      console.log('✅ Auto-reply sent:', autoReplyInfo.messageId);
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Don't fail the whole operation if auto-reply fails
    }

    return {
      success: true,
      messageId: supportInfo.messageId,
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
}

// Test email configuration
export async function testEmailConnection() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server connection successful');
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error);
    return false;
  }
}
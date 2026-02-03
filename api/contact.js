// Vercel Serverless Function to handle contact form submissions
// Uses Resend for email notifications

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'company', 'interest', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        fields: missingFields
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'BearingNorthAI Contact <noreply@bearingnorthai.com>',
          to: [process.env.CONTACT_EMAIL || 'hello@bearingnorthai.com'],
          reply_to: formData.email,
          subject: `New Contact: ${formData.firstName} ${formData.lastName} - ${formData.interest}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0a0a0f; border-bottom: 3px solid #00d4ff; padding-bottom: 12px;">
                🔔 New Contact Form Submission
              </h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #0a0a0f;">${formData.firstName} ${formData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #00d4ff;">${formData.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Phone:</td>
                    <td style="padding: 8px 0; color: #0a0a0f;">${formData.phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Company:</td>
                    <td style="padding: 8px 0; color: #0a0a0f;">${formData.company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Interest:</td>
                    <td style="padding: 8px 0; color: #0a0a0f;"><strong>${formData.interest}</strong></td>
                  </tr>
                </table>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #0a0a0f; margin-bottom: 12px;">Message:</h3>
                <div style="background: #ffffff; padding: 16px; border-left: 4px solid #00d4ff; border-radius: 4px;">
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
                </div>
              </div>
              
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
                Submitted: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)
              </div>
            </div>
          `
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Resend API error:', error);
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully via Resend');
    } else {
      // Fallback: Just log if no Resend API key configured
      console.log('📧 Contact Form Submission (No Resend API Key):', {
        timestamp: new Date().toISOString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        interest: formData.interest,
        message: formData.message
      });
      console.warn('⚠️  Set RESEND_API_KEY environment variable to send emails');
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      message: 'Please try again or email us directly at hello@bearingnorthai.com'
    });
  }
}

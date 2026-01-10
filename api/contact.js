// Vercel Serverless Function to handle contact form submissions
// This file will automatically be deployed as an API endpoint at /api/contact

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'company', 'industry', 'interest', 'message'];
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

    // Here you can implement different storage options:

    // OPTION 1: Send email via SendGrid
    // Uncomment and configure if you want to use SendGrid
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'info@bearingnorthai.com',
      from: 'noreply@bearingnorthai.com',
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      text: `
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        Company: ${formData.company}
        Industry: ${formData.industry}
        Interest: ${formData.interest}
        Message: ${formData.message}
        Newsletter: ${formData.newsletter ? 'Yes' : 'No'}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Industry:</strong> ${formData.industry}</p>
        <p><strong>Interest:</strong> ${formData.interest}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <p><strong>Newsletter:</strong> ${formData.newsletter ? 'Yes' : 'No'}</p>
      `,
    };

    await sgMail.send(msg);
    */

    // OPTION 2: Save to Google Sheets
    // Uncomment and configure if you want to use Google Sheets
    /*
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const { JWT } = require('google-auth-library');

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      'First Name': formData.firstName,
      'Last Name': formData.lastName,
      Email: formData.email,
      Phone: formData.phone || '',
      Company: formData.company,
      Industry: formData.industry,
      Interest: formData.interest,
      Message: formData.message,
      Newsletter: formData.newsletter ? 'Yes' : 'No'
    });
    */

    // OPTION 3: Save to Airtable
    // Uncomment and configure if you want to use Airtable
    /*
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

    await base('Contacts').create([
      {
        fields: {
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Email': formData.email,
          'Phone': formData.phone || '',
          'Company': formData.company,
          'Industry': formData.industry,
          'Interest': formData.interest,
          'Message': formData.message,
          'Newsletter': formData.newsletter ? 'Yes' : 'No',
          'Submitted At': new Date().toISOString()
        }
      }
    ]);
    */

    // OPTION 4: Log to Vercel (for testing - data will be in deployment logs)
    console.log('Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      ...formData
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

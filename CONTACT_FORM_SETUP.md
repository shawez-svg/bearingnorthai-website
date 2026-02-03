# Contact Form Setup Guide

The contact form is now configured and ready to use. Follow these steps to enable email notifications.

## ✅ What's Already Done

- Contact form page created (`contact.html`)
- Backend API endpoint configured (`/api/contact`)
- Form validation and error handling
- Professional email template

## 🔧 Setup Steps

### Option 1: Resend (Recommended - Free & Simple)

**Why Resend?**
- Modern, simple API
- Free tier: 3,000 emails/month
- No credit card required for free tier
- Better deliverability than traditional services

**Setup:**

1. **Create Resend Account**
   - Go to https://resend.com
   - Sign up for free
   - Verify your email

2. **Get API Key**
   - Go to API Keys section
   - Create a new API key
   - Copy it (starts with `re_...`)

3. **Add Environment Variable to Vercel**
   - Go to your Vercel dashboard
   - Select `bearingnorthai-website` project
   - Go to Settings → Environment Variables
   - Add:
     - **Name:** `RESEND_API_KEY`
     - **Value:** Your Resend API key (e.g., `re_abc123...`)
     - **Environment:** Production (and Preview if you want)
   - Click Save

4. **Optional: Set Contact Email**
   - Add another environment variable:
     - **Name:** `CONTACT_EMAIL`
     - **Value:** `hello@bearingnorthai.com` (or your preferred email)
   - If not set, defaults to `hello@bearingnorthai.com`

5. **Verify Domain (Optional but Recommended)**
   - In Resend dashboard → Domains
   - Add `bearingnorthai.com`
   - Add the DNS records they provide
   - Verify domain
   - This improves email deliverability

6. **Deploy**
   - Push changes to your repository, or
   - Trigger a redeploy in Vercel
   - The environment variables will be loaded

**Done!** Form submissions will now send emails to your inbox.

---

### Option 2: Formspree (Even Simpler, No Code)

If you want something even simpler without touching code:

1. Go to https://formspree.io
2. Sign up for free (50 submissions/month)
3. Create a new form
4. Get your form endpoint (e.g., `https://formspree.io/f/abc123`)
5. Update `contact.html` form action:

```html
<!-- Replace the existing form tag with: -->
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

6. Remove or comment out the JavaScript form handler at the bottom of `contact.html`

**Pros:** Zero setup, works immediately  
**Cons:** Limited to 50 submissions/month on free tier

---

## 🧪 Testing

### Local Testing
The form will work on Vercel but logs to console if no API key is set.

### Production Testing
1. Fill out the form on your live site
2. Submit
3. Check your email inbox
4. If no email arrives:
   - Check Vercel function logs
   - Verify environment variables are set
   - Check spam folder

---

## 📧 Email Configuration

### Current Setup
- **From:** `BearingNorthAI Contact <noreply@bearingnorthai.com>`
- **To:** Value of `CONTACT_EMAIL` env var (or `hello@bearingnorthai.com`)
- **Reply-To:** Customer's email (so you can reply directly)
- **Subject:** `New Contact: [Name] - [Interest]`

### Email Template
Professional HTML email with:
- Contact details in a table
- Message in a highlighted box
- Timestamp in UAE timezone
- Clean, branded design

---

## 🔐 Security Features

- CORS headers configured
- Input validation (email format, required fields)
- Error handling with user-friendly messages
- API key stored in environment variables (never in code)
- Rate limiting handled by Vercel

---

## 💡 Next Steps (Optional)

### Add to Google Sheets
Want to save submissions to a spreadsheet too?

1. Set up Google Sheets API
2. Uncomment the Google Sheets section in `api/contact.js`
3. Add required environment variables

### Add Auto-Reply
Want to send a confirmation email to the customer?

Add this to the Resend API call:

```javascript
// Send confirmation to customer
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
  },
  body: JSON.stringify({
    from: 'BearingNorthAI <hello@bearingnorthai.com>',
    to: formData.email,
    subject: 'We received your message!',
    html: `
      <h2>Thanks for reaching out!</h2>
      <p>Hi ${formData.firstName},</p>
      <p>We received your message and will get back to you within 24 hours.</p>
      <p>Best,<br>BearingNorthAI Team</p>
    `
  })
});
```

---

## 🚨 Troubleshooting

### "Failed to send email" error
- Check Resend API key is correct
- Verify environment variable is set in Vercel
- Check Resend dashboard for error logs

### Form submits but no email
- Check spam folder
- Verify `CONTACT_EMAIL` is correct
- Check Vercel function logs for errors

### "500 Internal Server Error"
- Check Vercel deployment logs
- Verify all environment variables are set
- Test in Vercel preview environment first

---

## 📊 Monitoring

### View Submissions
- **Resend Dashboard:** See all sent emails
- **Vercel Logs:** See all form submissions (even failed ones)
- **Your Inbox:** Receive notifications in real-time

### Analytics
Consider adding:
- Google Analytics event tracking on form submit
- Vercel Analytics for page views
- Form conversion rate tracking

---

**Questions?** The form is ready to go as soon as you add the `RESEND_API_KEY` to Vercel!

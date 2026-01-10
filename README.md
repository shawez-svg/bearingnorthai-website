# BearingNorthAI Website

Professional AI advisory and implementation website for BearingNorthAI - your trusted partner in artificial intelligence transformation for the UAE market.

## 🎯 **Our Mission**

At BearingNorthAI, we empower UAE organizations to harness the transformative potential of artificial intelligence, driving innovation and sustainable growth in alignment with the nation's Vision 2031.

## 📋 **Website Pages**

1. **Home** - Landing page showcasing our services and value proposition
2. **Services** - Comprehensive AI solutions we offer
3. **About** - Our mission, values, team, and approach
4. **Case Studies** - Real success stories from client engagements
5. **Contact** - Get in touch with our team

## ✨ **Key Features**

- ✅ Fully responsive design for all devices
- ✅ Modern, professional UI/UX
- ✅ Integrated Google Calendar booking system
- ✅ Contact form with data saving capability
- ✅ UAE market-focused content
- ✅ Fast loading and optimized performance

## 🚀 **Quick Start**

### View Locally

```bash
# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000
```

## 📦 **Deployment to Vercel**

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Update website"
git push origin main
```

### Step 2: Deploy on Vercel

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Import the `bearingnorthai-website` repository
3. Click Deploy
4. Your site will be live at: `https://bearingnorthai-website.vercel.app`

### Step 3: Custom Domain Setup (GoDaddy)

#### In Vercel:
1. Go to Settings → Domains
2. Add your domain: `bearingnorthai.com`
3. Add www subdomain: `www.bearingnorthai.com`

#### In GoDaddy:
1. Login → My Products → Domains → Manage DNS
2. **Add these DNS records:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 1 Hour |
| CNAME | www | cname.vercel-dns.com | 1 Hour |

3. **Delete old A records** pointing to other servers
4. Wait 5-30 minutes for DNS propagation

## 🔧 **Configuration**

### Google Calendar Booking

Already configured with your booking link. To update:

1. Open `script.js`
2. Find line 54
3. Update: `const GOOGLE_CALENDAR_BOOKING_URL = 'YOUR_LINK';`

### Contact Form Data Saving

The contact form saves submissions via `/api/contact`. Choose your preferred storage:

#### Option 1: Email via SendGrid (Recommended)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key from Settings
3. Install package:
   ```bash
   npm init -y
   npm install @sendgrid/mail
   ```
4. Add environment variable in Vercel:
   - Go to Settings → Environment Variables
   - Add: `SENDGRID_API_KEY=your_key`
5. Uncomment SendGrid code in `api/contact.js` (lines 26-55)

#### Option 2: Google Sheets

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account and download JSON key
4. Create Google Sheet and share with service account email
5. Install packages:
   ```bash
   npm install google-spreadsheet google-auth-library
   ```
6. Add environment variables in Vercel:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
7. Uncomment Google Sheets code in `api/contact.js` (lines 58-82)

#### Option 3: Airtable

1. Sign up at [airtable.com](https://airtable.com)
2. Create base with "Contacts" table
3. Get API key
4. Install: `npm install airtable`
5. Add environment variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
6. Uncomment Airtable code in `api/contact.js` (lines 85-105)

#### Option 4: View in Logs (Current Default)

Form submissions appear in Vercel deployment logs:
- Vercel Dashboard → Deployments → View Logs

### Update Contact Information

Current details:
- **Phone**: +971 54 215 2357
- **Email**: info@bearingnorthai.com
- **Address**: Business Bay, Dubai, UAE

Update in:
- All HTML file footers
- Contact page
- `api/contact.js` error messages

### Add Your Logo

1. Add logo file (e.g., `/logo.png`) to website folder
2. In each HTML file, replace:
   ```html
<img src="https://drive.google.com/file/d/1f18K9BOrTJh2cBPSKoeEcna_9DogNTL4/view?usp=sharing" alt="BearingNorthAI" style="height: 40px;">
   BearingNorthAI
   ```
   With:
   ```html
   <img src="/logo.png" alt="BearingNorthAI" style="height: 40px;">
   BearingNorthAI
   ```

### Social Media Links

Update in all HTML file footers:
```html
<a href="YOUR_LINKEDIN_URL"><i class="fab fa-linkedin"></i></a>
<a href="YOUR_TWITTER_URL"><i class="fab fa-twitter"></i></a>
<a href="YOUR_FACEBOOK_URL"><i class="fab fa-facebook"></i></a>
```

## 📊 **Google Analytics (Optional)**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add before `</head>` in all HTML files:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📁 **Project Structure**

```
bearingnorthai-website/
├── index.html          # Home page
├── services.html       # Services
├── about.html          # About us
├── case-studies.html   # Success stories
├── contact.html        # Contact form
├── styles.css          # All styles
├── script.js           # JavaScript
├── vercel.json         # Deployment config
├── .gitignore          # Git ignore
├── README.md           # This file
└── api/
    └── contact.js      # Form API
```

## 🛠️ **Technologies**

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript
- Font Awesome 6.4.0
- Vercel Serverless Functions

## 🆘 **Troubleshooting**

### Contact Form Issues
- Check browser console for errors
- Verify `/api/contact` endpoint exists
- Check Vercel deployment logs
- Ensure environment variables are set

### DNS Not Working
- Wait 24-48 hours
- Check [whatsmydns.net](https://www.whatsmydns.net)
- Verify DNS records in GoDaddy
- Clear browser cache

### Booking Button Issues
- Verify Google Calendar link is public
- Update link in `script.js`
- Clear cache and retest

## 📞 **Support**

- **Email**: info@bearingnorthai.com
- **Phone**: +971 54 215 2357
- **Location**: Business Bay, Dubai, UAE

## ✅ **Launch Checklist**

- [x] Website developed
- [x] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Custom domain connected
- [ ] DNS propagated
- [ ] Google Calendar configured
- [ ] Contact form storage setup
- [ ] Contact info updated
- [ ] Logo added
- [ ] Social links updated
- [ ] Analytics added (optional)
- [ ] Mobile testing complete
- [ ] Contact form tested
- [ ] Booking button tested
- [ ] Launch! 🚀

## 📄 **License**

© 2026 BearingNorthAI. All rights reserved.

---

**Empowering UAE businesses with AI transformation**

Visit us at: [bearingnorthai.com](https://bearingnorthai.com)

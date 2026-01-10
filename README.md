# BearingNorthAI Website

A professional website for BearingNorthAI - AI Advisory & Implementation company serving the UAE market.

## Website Structure

The website consists of 5 main pages:

1. **Home (index.html)** - Landing page with hero section, services overview, and key features
2. **Services (services.html)** - Detailed information about all AI services offered
3. **About (about.html)** - Company mission, values, team, and approach
4. **Case Studies (case-studies.html)** - Success stories from real client engagements
5. **Contact (contact.html)** - Contact form and company information

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Navigation with Icons**: Clean navigation bar with Font Awesome icons
- **Google Calendar Integration**: "Book AI Consultation" button throughout the site
- **Modern UI/UX**: Professional design with smooth animations and transitions
- **UAE Market Focus**: Content tailored for UAE businesses and Vision 2031
- **Interactive Elements**: Smooth scrolling, animated counters, and scroll-triggered animations

## Setup Instructions

### 1. Basic Setup

Simply open `index.html` in a web browser to view the website locally.

### 2. Google Calendar Integration

To enable the "Book AI Consultation" button to work with your Google Calendar:

#### Step 1: Create a Google Calendar Appointment Schedule

1. Go to [Google Calendar](https://calendar.google.com)
2. Click the gear icon (⚙️) in the top right
3. Select **Settings**
4. In the left sidebar, click **Appointment schedules**
5. Click **Create** to create a new appointment schedule
6. Configure your appointment details:
   - Name: "AI Consultation"
   - Duration: 30 minutes (or your preferred duration)
   - Availability: Set your available time slots
   - Location: Video call, phone, or in-person
7. Click **Save**

#### Step 2: Get Your Booking Link

1. After creating the appointment schedule, click on it
2. Click **Share** or **Get link**
3. Copy the booking page URL (it will look like: `https://calendar.google.com/calendar/appointments/schedules/...`)

#### Step 3: Update the Website

1. Open `script.js` in a text editor
2. Find the line with `GOOGLE_CALENDAR_BOOKING_URL` (around line 59)
3. Replace the placeholder URL with your actual booking link:

```javascript
const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/YOUR_ACTUAL_LINK';
```

4. Save the file

Now when visitors click any "Book AI Consultation" button, they'll be directed to your Google Calendar booking page!

### 3. Customization

#### Update Contact Information

Edit the contact details in the footer and contact page:
- Phone number (currently: +971 54 215 2357)
- Email (currently: info@bearingnorthai.com)
- Address (currently: Dubai, UAE)

#### Add Your Logo

Replace the compass icon in the navigation with your logo:
1. Add your logo image to the website folder
2. In each HTML file, replace `<i class="fas fa-compass"></i>` in the logo section with:
   ```html
   <img src="your-logo.png" alt="BearingNorthAI Logo" style="height: 40px;">
   ```

#### Update Social Media Links

In the footer of each page, update the social media links:
```html
<a href="https://www.linkedin.com/company/your-company"><i class="fab fa-linkedin"></i></a>
<a href="https://twitter.com/your-company"><i class="fab fa-twitter"></i></a>
<a href="https://www.facebook.com/your-company"><i class="fab fa-facebook"></i></a>
```

### 4. Contact Form Integration

The contact form currently displays a success message without sending data. To make it functional:

#### Option 1: Use a Form Service (Easiest)

Use services like:
- [Formspree](https://formspree.io) - Free tier available
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- [Google Forms](https://www.google.com/forms) - Free

#### Option 2: Connect to Your Backend

Update the form submission in `script.js` (around line 105) to send data to your API endpoint.

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all website files
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Create account at [Netlify](https://www.netlify.com)
2. Drag and drop your website folder
3. Your site will be live instantly with a custom URL

### Option 3: Traditional Web Hosting

Upload all files to your web hosting provider via FTP.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Vanilla JS for interactivity
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Typography (system fonts)

## File Structure

```
Website/
├── index.html          # Home page
├── services.html       # Services page
├── about.html          # About page
├── case-studies.html   # Case studies page
├── contact.html        # Contact page
├── styles.css          # All styles
├── script.js           # All JavaScript
└── README.md           # This file
```

## Content Highlights

### Enriched Content Sources

The website content was inspired by leading AI consulting firms:
- McKinsey QuantumBlack
- IBM Watson
- PwC AI Services
- Deloitte AI
- BCG Gamma

All content has been customized for the UAE market and BearingNorthAI's value proposition.

### UAE-Specific Features

- References to UAE Vision 2031
- Arabic language support mentions
- GCC market focus
- UAE regulatory compliance
- Dubai and Abu Dhabi market expertise

## Support

For questions or issues:
- Email: info@bearingnorthai.ae
- Phone: +971 XX XXX XXXX

## License

© 2026 BearingNorthAI. All rights reserved.

---

**Next Steps:**

1. ✅ Set up Google Calendar booking link
2. ✅ Update contact information
3. ✅ Add your company logo
4. ✅ Update social media links
5. ✅ Configure contact form backend
6. ✅ Deploy to web hosting
7. ✅ Test on mobile devices
8. ✅ Set up analytics (Google Analytics recommended)

**Good luck with your website! 🚀**

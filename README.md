# Embrace Learning – Educational Website

A modern, lightweight, fast-loading static website for **Embrace Learning** coaching institute.

## 📁 Folder Structure

```
EmbraceLearning/
├── index.html          # Homepage
├── about.html          # About Us page
├── courses.html        # Courses page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Single combined stylesheet
├── js/
│   └── script.js       # Lightweight vanilla JavaScript
├── images/             # Place your images here
└── README.md           # This file
```

## 🚀 Features

- **Fully Responsive** – Mobile-first design that works on all devices
- **Lightweight** – No heavy frameworks, pure HTML5 + CSS3 + Vanilla JS
- **SEO Optimized** – Proper meta tags, heading hierarchy, semantic HTML
- **Fast Loading** – Minimal external dependencies (only Google Fonts)
- **Interactive** – Testimonial slider, FAQ accordion, smooth scroll, scroll-to-top
- **Clean UI** – Professional design with Deep Blue & Soft Orange color palette

## 🌐 Hosting on BigRock / GoDaddy / Any Shared Hosting

### Step 1: Get Your Hosting Plan
1. Purchase a **Web Hosting** plan from BigRock, GoDaddy, or any shared hosting provider
2. Purchase a **domain name** (e.g., `embracelearning.in`)

### Step 2: Connect Your Domain
1. Log in to your hosting provider's dashboard
2. Go to **DNS Management** or **Domain Settings**
3. Point your domain's **Nameservers** to your hosting provider's nameservers
   - BigRock: `ns1.bigrock.in`, `ns2.bigrock.in`
   - GoDaddy: Usually auto-configured
4. Wait 24-48 hours for DNS propagation

### Step 3: Upload Your Website
1. Log in to your hosting **cPanel** (usually at `yourdomain.com/cpanel`)
2. Open **File Manager**
3. Navigate to the `public_html` folder
4. **Upload all files** from this project:
   - `index.html`, `about.html`, `courses.html`, `contact.html`
   - `css/` folder (with `style.css`)
   - `js/` folder (with `script.js`)
   - `images/` folder (with any images you add)
5. Ensure `index.html` is directly inside `public_html` (not in a subfolder)

### Alternative: Upload via FTP
1. Download **FileZilla** (free FTP client)
2. Connect using your hosting FTP credentials:
   - Host: `ftp.yourdomain.com`
   - Username: (from hosting dashboard)
   - Password: (from hosting dashboard)
   - Port: `21`
3. Upload all files to the `public_html` directory

## ✏️ How to Update Content

### Update Text Content
1. Open the HTML file you want to edit in any text editor (VS Code recommended)
2. Find the text you want to change
3. Edit it and save the file
4. Re-upload the changed file to your hosting via cPanel File Manager or FTP

### Update Images
1. Optimize your images (use [TinyPNG](https://tinypng.com/) for compression)
2. Place images in the `images/` folder
3. Reference them in HTML: `<img src="images/your-image.jpg" alt="Description" loading="lazy">`
4. Upload the `images/` folder to your hosting

### Update Phone/Email/Address
Search for these placeholder values across all HTML files and replace them:
- `+91 98XXX XXXXX` → Your actual phone number
- `info@embracelearning.in` → Your actual email
- `Your City, India` / `Your Address, Your City, State – PIN` → Your actual address
- Social media links (`href="#"`) → Your actual social media URLs

### Update Founder Info
In `about.html`, find the founder section and replace:
- `Founder's Name` → Actual name
- The placeholder quote → Actual founder message
- The avatar emoji → An actual photo (replace the div with an `<img>` tag)

### Add Google Maps
In `contact.html`, replace the `.map-placeholder` div with:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
  width="100%" 
  height="250" 
  style="border:0; border-radius:8px;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```
Get the embed code from [Google Maps](https://maps.google.com) → Share → Embed a map.

### Connect Contact Form to Backend
The form currently shows a success message client-side. To actually receive submissions:

**Option A: Use Formspree (easiest, free)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. In `contact.html`, change `action="#"` to `action="https://formspree.io/f/YOUR_FORM_ID"` and remove `e.preventDefault()` from `script.js`

**Option B: Use Google Forms**
1. Create a Google Form with matching fields
2. Link the form action to your Google Form endpoint

**Option C: PHP Backend (for shared hosting)**
Create a `send-mail.php` file and update the form action.

## 🎨 Customization

### Colors
Edit CSS custom properties at the top of `css/style.css`:
```css
:root {
  --primary: #1E3A8A;      /* Deep Blue */
  --secondary: #F59E0B;    /* Soft Orange */
  --primary-light: #2563EB;
  --primary-dark: #1E2D5B;
}
```

### Fonts
The site uses **Poppins** from Google Fonts. To change, update the `<link>` tag in each HTML file's `<head>` and the `font-family` in CSS.

## ⚡ Performance Tips

- Compress images before uploading (use TinyPNG or Squoosh)
- Images already use `loading="lazy"` where applicable
- CSS is combined into a single file
- JS is minimal vanilla JavaScript (~4KB)
- Consider enabling **Gzip compression** on your hosting (usually in cPanel → Optimize Website)
- Enable **browser caching** via `.htaccess` if on Apache hosting

## 📱 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome for Android)
- Responsive down to 320px screen width

---

Built with ❤️ for Embrace Learning

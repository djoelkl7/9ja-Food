# NAIJA POT KITCHEN & GRILL LTD - CPANEL DEPLOYMENT GUIDE

This package is 100% upload-ready for **cPanel, Apache, Namecheap, GoDaddy, Hostinger, Bluehost, or any standard shared Linux hosting**.

---

## 📁 Package Contents

```text
cpanel-package/
├── index.html                   # Homepage (Hero, Signatures, Bukka Heritage, Trust Badges, Reviews)
├── menu.html                    # Full categorized menu with realistic food photography & search
├── story.html                   # Our Story, Bukka heritage, and culinary values
├── order.html                   # WhatsApp Ordering Portal & Takeaway Cart
├── reservations.html            # Table Reservations Booking Form with WhatsApp confirmation
├── contact.html                 # Location, Opening Hours, Contact Form & Telephone Desk
├── css/
│   └── styles.css               # Responsive design system (Obsidian Black & Royal Gold)
├── js/
│   └── main.js                  # Persistent cart, WhatsApp generator, menu filter, validation
├── images/                      # Realistic Nigerian food photography & official logos
│   ├── craft_chapman_cocktail.jpg
│   ├── food_beef_suya_grill_1792356257070.jpg
│   ├── food_egusi_soup_yam_1792356257944.jpg
│   ├── food_jollof_party_platter_1792356258654.jpg
│   ├── hero_naija_feast_1792356256861.jpg
│   ├── restaurant_ambiance_dining_1792356259531.jpg
│   └── logo.png
├── .htaccess                    # HTTPS redirect, clean URLs, Gzip compression, browser cache
├── robots.txt                   # Search engine crawl directions
└── sitemap.xml                  # XML sitemap for Google Search Console
```

---

## 🚀 How to Upload to cPanel (Step-by-Step)

### Step 1: Create a ZIP file of the package
On your local machine or terminal, zip the contents of `cpanel-package`:
```bash
zip -r naijapot-website.zip * .htaccess
```

### Step 2: Log in to cPanel
1. Navigate to your hosting URL (e.g. `https://yourdomain.com:2083` or your host client dashboard).
2. Enter your cPanel username and password.

### Step 3: Open File Manager
1. In cPanel, click on **File Manager** (under the "Files" header).
2. Double-click to enter your **`public_html`** folder (or the root folder of your addon domain/subdomain).
3. If you have any default `index.html` or placeholder files from your host, delete or move them.

### Step 4: Upload and Extract
1. Click the **Upload** button at the top toolbar.
2. Select your `naijapot-website.zip`.
3. Once the upload progress reaches 100% (green), return to the File Manager.
4. Right-click `naijapot-website.zip` and select **Extract**.
5. Ensure the extracted files are directly in `public_html/` (so `index.html` is at `public_html/index.html`, not inside an extra subfolder).
6. Verify that hidden files (dotfiles like `.htaccess`) are visible by clicking **Settings** (top right) -> Check **Show Hidden Files (dotfiles)** -> Save.

### Step 5: Verify SSL Certificate
1. In cPanel, go to **SSL/TLS Status**.
2. Run **AutoSSL** (or activate free Let's Encrypt SSL) so your domain serves securely via `https://`.
3. The included `.htaccess` file will automatically redirect all `http://` traffic to `https://`.

---

## ⚠️ Checklist: Replacing [Placeholder] Tags Before Launch

All unconfirmed items have been cleanly marked with `[Placeholder]` throughout the HTML and JavaScript. Before launching publicly, review this quick checklist:

### 1. Update the WhatsApp Ordering Number
Open `js/main.js` and locate lines 14-22:
```javascript
const RESTAURANT_CONFIG = {
  brandName: "NAIJA POT KITCHEN & GRILL LTD",
  whatsappNumber: "447342229865", // <-- Put your official WhatsApp number here (NO '+' or spaces)
  phoneFormatted: "+44 7444 614764", // <-- Put your display phone number here
  addressFormatted: "14 Heritage Parade, High Street, London E1 6AN", // <-- Put your official address
};
```
*Note: Make sure the WhatsApp number begins with the country code (e.g. `44` for UK) without leading zeros, plus signs, or hyphens.*

### 2. Verify Final Menu Prices
In `js/main.js`, locate the `DISHES` array and adjust the prices to your final menu rates.

### 3. Remove the Top Admin Banner
When you are ready to publish, you can remove or comment out this banner at the top of each `.html` file:
```html
<div class="placeholder-notice-banner">
  ⚠️ Admin Notice: Contact details and menu prices currently contain [Placeholder] tags...
</div>
```

---

## 🔍 SEO & Google Submission
1. Add `https://yourdomain.com` to **Google Search Console**.
2. Submit your sitemap: `https://yourdomain.com/sitemap.xml`.
3. Test your structured data using Google's **Rich Results Test** — the built-in Schema.org `Restaurant` markup is already embedded on `index.html`.

# NAIJA POT KITCHEN & GRILL LTD
> **Premium Nigerian Restaurant & Grill — Authentic Lagos Bukka Flavour, Charcoal Grills & Warm Hospitality**

*“Bold Taste. Rich Culture. Unforgettable Experience.”*  
*“Authentic Naija Flavours, Served With Love.”*

---

## 🍽️ Overview

NAIJA POT KITCHEN & GRILL LTD is a full-featured, responsive, production-ready web application for a premier Nigerian restaurant and charcoal grill brand. Inspired by the richness of Lagos Island bukka culture, wood smoke traditions, and contemporary dining aesthetics, this website delivers an upscale dining and takeaway experience.

### Brand Design Palette
* **Burgundy (`#6D1F2B`)**: Primary brand colour, headings, buttons, footer, and navigation accents.
* **Royal Gold (`#C6A15B`)**: Accents, dividers, highlights, icons, and decorative emblems.
* **Warm Ivory (`#FFF7E8`)**: Canvas background, negative space, and readability.
* **Deep Charcoal (`#211A19`)**: Body typography and dark surfaces.
* **Soft Cream (`#F3E8D6`)**: Secondary panels and contrast containers.

---

## 🚀 Key Features

1. **Brand Identity & Vector Emblem**:
   - High-precision SVG emblem featuring the traditional Nigerian iron cooking pot (*Iskoto/Ape*), tripod legs, and rising golden culinary flame.
   - Built-in support for swapping in Canva logo exports via `/images/logo.png` or `siteConfig.ts`.

2. **Full Responsive Navigation**:
   - Strict 3-zone Top Bar Contract: Wordmark brand, single-line text links, and Book a Table CTA.
   - Mobile navigation drawer and sticky quick-action bar adhering to the 15% mobile sticky cap rule.

3. **Complete Multi-Page Architecture**:
   - **Home**: Cinematic feast hero, Lagos Bukka story introduction, signature dishes showcase, 4 feature blocks, dining atmosphere, guest testimonials, Instagram gallery preview, and newsletter subscription.
   - **Our Story**: Cultural roots, the iron pot & lumpwood charcoal philosophy, and radical Nigerian warmth.
   - **Menu**: Full interactive menu with categories (Starters, Jollof & Rice, Suya Grills, Soups & Swallows, Sharing Platters, Sides, Drinks, Desserts), search filtering, dietary toggles (Halal, Gluten-Free, Vegan, Signatures), allergen warnings, and print/PDF menu generation.
   - **Gallery**: Editorial image grid with category filtering and interactive lightbox with keyboard support (Esc, arrow keys).
   - **Reservations**: Live table booking engine with party size, time slots, seating preference, dietary alerts, and instant booking reference slip generation.
   - **Order Online & Takeaway Cart**: Seamless ordering system supporting Collection vs Local Delivery, dish customizer for swallow selection (Pounded Yam, Eba, Amala), protein choices, spice levels (Mild to Extra Naija Hot), and checkout receipt.
   - **Contact & Location**: Verified address, weekly service hours breakdown, interactive Google Map, direct phone/email links, working enquiry form, and FAQ accordion.

---

## 📸 Image Asset Inventory

All food photography and atmospheric imagery were generated using high-fidelity prompts matching authentic Nigerian cuisine:

| File Name | Subject | Usage / Placement | Status |
| :--- | :--- | :--- | :--- |
| `hero_naija_feast_*.jpg` | Smoky party jollof, fried dodo, beef suya, grilled chicken & egusi | Hero section & Lagos Bukka feast platter | Generated & Active |
| `food_beef_suya_grill_*.jpg` | Sizzling beef suya skewers on charcoal with yaji spice, onions & tomatoes | Suya grill cards, story & gallery | Generated & Active |
| `food_egusi_soup_yam_*.jpg` | Rich Egusi soup with braised beef, stockfish & smooth pounded yam | Soups section & story showcase | Generated & Active |
| `restaurant_ambiance_dining_*.jpg` | Contemporary luxury dining room with burgundy & gold accents | Atmosphere feature & story hero | Generated & Active |
| `food_jollof_party_platter_*.jpg` | Reddish smoky party jollof rice with golden fried plantains & peppered chicken | Jollof section & dishes grid | Generated & Active |

---

## 💻 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 with `@theme` token definitions
- **Icons**: Lucide React
- **State Management**: React Context (`CartContext` with localStorage persistence)
- **Routing**: Deep-linking hash router (`#menu`, `#reservations`, `#story`, etc.) for seamless evaluation in sandboxes

---

## 🛠️ Local Development & Deployment

### Installation
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
```

---

## ⚙️ Content Management & Configuration

To update restaurant details, opening hours, prices, or contact information:
- Edit `src/data/siteConfig.ts` for address, phone, emails, opening hours, social links, and policies.
- Edit `src/data/menuData.ts` to add, edit, or remove menu items, prices, spice levels, and allergens.
- Edit `src/data/galleryData.ts` to update the photo gallery.
- To upload the official Canva logo, place the exported transparent PNG at `public/images/logo.png` and set `branding.logoImagePath = "/images/logo.png"` in `siteConfig.ts`.

---

## 🔒 Security & Secret Key Protection

To ensure all sensitive keys, payment credentials, and secrets remain secure and never exposed:

1. **Zero Secret Exposure in Client Code**:
   - Never embed secret API keys, private tokens, or database passwords in client-side code (`src/` or `index.html`).
   - Any sensitive third-party operations (such as payment processing with Stripe/PayPal or AI generation) must always be executed server-side via backend proxy endpoints (`/api/*`).

2. **Environment File Hygiene**:
   - Actual secrets belong exclusively in `.env` or the platform's secret manager (e.g. Cloud Run, Vercel Environment Variables).
   - `.env` and all `.env.*` files (except `.env.example`) are strictly ignored by `.gitignore`.
   - Never commit `.env` or credentials files (`credentials.json`, `*.pem`, `*.key`) to version control.

3. **Client-Safe Variables**:
   - Only non-sensitive, public configuration intended for the browser should use the `VITE_` prefix (e.g., `VITE_PUBLIC_MAPS_KEY`). Any variable without the `VITE_` prefix is unreachable by the browser bundle.


/**
 * Site Configuration for NAIJA POT KITCHEN & GRILL LTD
 * All restaurant information, opening hours, contact details,
 * and brand assets are managed centrally here.
 */

export interface RestaurantConfig {
  brandName: string;
  legalName: string;
  tagline: string;
  secondarySlogan: string;
  description: string;
  announcement: {
    enabled: boolean;
    text: string;
    ctaText?: string;
    ctaTarget?: string;
  };
  contact: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    country: string;
    phone: string; // Calling number: +44 7444 614764
    whatsappPhone: string; // WhatsApp number: +44 7342 229865
    whatsappLink: string;
    email: string;
    reservationsEmail: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  hours: {
    day: string;
    lunch?: string;
    dinner?: string;
    allDay?: string;
    isClosed?: boolean;
  }[];
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
    whatsapp: string;
  };
  branding: {
    black: string;
    blackSoft: string;
    brown: string;
    brownDark: string;
    brownWarm: string;
    brownLight: string;
    gold: string;
    goldLight: string;
    goldBright: string;
    goldDim: string;
    royalGold: string;
    burgundy: string;
    warmIvory: string;
    deepCharcoal: string;
    softCream: string;
    whatsappGreen: string;
    logoImagePath: string | null;
  };
  policies: {
    reservationGracePeriod: string;
    depositPolicy: string;
    dietaryStatement: string;
    halalStatement: string;
  };
}

export const siteConfig: RestaurantConfig = {
  brandName: "NAIJA POT",
  legalName: "NAIJA POT KITCHEN & GRILL LTD",
  tagline: "Bold Taste. Rich Culture. Unforgettable Experience.",
  secondarySlogan: "Authentic Naija Flavours, Served With Love.",
  description: "An authentic Nigerian kitchen and grill brand inspired by the richness of Lagos Island bukka culture, traditional Nigerian home cooking, charcoal-grilled delicacies, generous portions, and warm hospitality.",
  
  announcement: {
    enabled: true,
    text: "Experience the True Taste of Naija — Charcoal Grills, Authentic Soups & Party Jollof. Table Bookings & Takeaway Available.",
    ctaText: "Book Your Table",
    ctaTarget: "reservations",
  },

  contact: {
    addressLine1: "14 Heritage Parade, High Street",
    addressLine2: "Spitalfields / Shoreditch Border",
    city: "London",
    postcode: "E1 6AN",
    country: "United Kingdom",
    phone: "+44 7444 614764", // Direct call line
    whatsappPhone: "+44 7342 229865", // WhatsApp direct
    whatsappLink: "https://wa.me/447342229865",
    email: "info@naijapotkitchen.co.uk",
    reservationsEmail: "bookings@naijapotkitchen.co.uk",
    // Embed map pointing to London restaurant district
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.723871408821!2d-0.076891!3d51.520448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb0a845!2sSpitalfields%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=14+Heritage+Parade+High+Street+London+E1+6AN",
  },

  hours: [
    { day: "Monday", isClosed: true },
    { day: "Tuesday", lunch: "12:00 PM – 3:30 PM", dinner: "5:00 PM – 10:30 PM" },
    { day: "Wednesday", lunch: "12:00 PM – 3:30 PM", dinner: "5:00 PM – 10:30 PM" },
    { day: "Thursday", lunch: "12:00 PM – 3:30 PM", dinner: "5:00 PM – 10:30 PM" },
    { day: "Friday", lunch: "12:00 PM – 3:30 PM", dinner: "5:00 PM – 11:30 PM" },
    { day: "Saturday", allDay: "12:30 PM – 11:30 PM" },
    { day: "Sunday", allDay: "1:00 PM – 9:30 PM" },
  ],

  socials: {
    instagram: "https://www.instagram.com/naijapotkitchen_grill_mk",
    tiktok: "https://www.tiktok.com/@naija.pot.kitchen",
    facebook: "https://facebook.com/naijapotkitchen",
    whatsapp: "https://wa.me/447342229865",
  },

  branding: {
    black: "#0B0A09", // Deep luxury obsidian black
    blackSoft: "#141210", // Rich charcoal black
    brown: "#3D2314", // Signature roasted Bukka brown
    brownDark: "#26160C", // Deep earthen brown
    brownWarm: "#4A2C1A", // Warm mahogany brown
    brownLight: "#5C3822", // Terracotta saddle brown
    gold: "#D4A53A", // Signature royal gold
    goldLight: "#E8C547", // Shimmering light gold
    goldBright: "#F5CE58", // Radiant gold
    goldDim: "#9E7B28", // Burnished antique gold
    royalGold: "#D4A53A",
    burgundy: "#3D2314", // Graceful alias mapped to rich brown
    warmIvory: "#FAF6F0", // Warm earthen ivory
    deepCharcoal: "#141210", // Black charcoal
    softCream: "#F4ECE4", // Soft cream
    whatsappGreen: "#25D366", // Official WhatsApp green
    logoImagePath: "/assets/aistudio/IMG_7781_c41c3ef7.png", // Direct reference to uploaded official brand asset
  },

  policies: {
    reservationGracePeriod: "Tables are held for 15 minutes past booking time.",
    depositPolicy: "Parties of 6 or more require a small £10/guest deposit redeemable against the final bill.",
    dietaryStatement: "We prepare all dishes in an authentic kitchen that handles groundnuts (peanuts used in our suya spices), shellfish (dried crayfish), and sesame. Please notify staff of severe allergies.",
    halalStatement: "100% of our chicken, beef, goat meat, and lamb is certified Halal and sourced fresh daily from approved purveyors.",
  },
};

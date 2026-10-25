import React from 'react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../data/siteConfig';
import { PageId } from './Header';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0A09] text-[#FFFDF9] border-t-2 border-[#D4A53A]/40">
      {/* Upper Footer: Brand, Hours, Contact, Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Identity & Cultural Statement */}
          <div className="space-y-5">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-[#FFFDF9]/80 leading-relaxed max-w-sm">
              Authentic Nigerian dining and charcoal grill experience inspired by Lagos bukka culinary heritage. Fire, flavour, and heartfelt Naija hospitality.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#D4A53A] font-semibold block mb-2">
                Certified Halal & Daily Fresh
              </span>
              <p className="text-xs text-[#FFFDF9]/70">
                All poultry and meats are 100% Halal certified and prepared with authentic West African ingredients.
              </p>
            </div>
            {/* Social & Contact Quick Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp Green Icon */}
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                aria-label={`WhatsApp (${siteConfig.contact.whatsappPhone})`}
                title={`WhatsApp: ${siteConfig.contact.whatsappPhone}`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E1B18] border border-[#D4A53A]/40 flex items-center justify-center text-[#D4A53A] hover:text-[#FFFDF9] hover:border-[#D4A53A] transition-colors"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E1B18] border border-[#D4A53A]/40 flex items-center justify-center text-[#D4A53A] hover:text-[#FFFDF9] hover:border-[#D4A53A] transition-colors"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E1B18] border border-[#D4A53A]/40 flex items-center justify-center text-[#D4A53A] hover:text-[#FFFDF9] hover:border-[#D4A53A] transition-colors"
                aria-label="TikTok"
                title="Follow us on TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.88-4.47V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69z"/>
                </svg>
              </a>
              <a
                href={siteConfig.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E1B18] border border-[#D4A53A]/40 flex items-center justify-center text-[#D4A53A] hover:text-[#FFFDF9] hover:border-[#D4A53A] transition-colors"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B] mb-5">
              Explore Our House
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Our Story & Bukka Roots
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Full Restaurant Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Food & Dining Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('reservations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Reserve a Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Order Takeaway Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B] mb-5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Opening Hours
            </h4>
            <div className="space-y-2.5 text-xs text-[#FFF7E8]/85">
              <div className="flex justify-between py-1 border-b border-[#FFF7E8]/10">
                <span className="font-medium">Monday</span>
                <span className="text-[#C6A15B] italic">Closed (Kitchen Rest)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFF7E8]/10">
                <span className="font-medium">Tue – Thu</span>
                <span>12:00 – 15:30 · 17:00 – 22:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFF7E8]/10">
                <span className="font-medium">Friday</span>
                <span>12:00 – 15:30 · 17:00 – 23:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFF7E8]/10">
                <span className="font-medium">Saturday</span>
                <span>12:30 – 23:30</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">Sunday</span>
                <span>13:00 – 21:30</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-[#FFF7E8]/60">
              Kitchen closes 45 minutes prior to closing time.
            </p>
          </div>

          {/* Col 4: Location & Inquiries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B] mb-5">
              Find Us
            </h4>
            <div className="space-y-3 text-xs text-[#FFF7E8]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#FFF7E8]">{siteConfig.legalName}</p>
                  <p>{siteConfig.contact.addressLine1}</p>
                  <p>{siteConfig.contact.city}, {siteConfig.contact.postcode}</p>
                  <a
                    href={siteConfig.contact.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#C6A15B] hover:underline mt-1 font-medium"
                  >
                    Get Directions <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[#D4A53A] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Call Orders & Bookings</span>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#D4A53A] font-mono font-semibold text-[#FFFDF9]">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 text-[#25D366] shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
                  </svg>
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">WhatsApp Direct</span>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#25D366] font-mono font-semibold text-[#FFFDF9]"
                  >
                    {siteConfig.contact.whatsappPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A53A] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#D4A53A] text-stone-300">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { onNavigate('reservations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-2.5 px-4 bg-[#3D2314] hover:bg-[#4E2E1A] border border-[#D4A53A] text-[#FFFDF9] font-semibold text-center rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Reserve Your Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Allergen & Dietary Notice */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-400 leading-relaxed max-w-4xl">
          <p>
            <strong className="text-[#D4A53A]">Allergen Advisory:</strong> {siteConfig.policies.dietaryStatement}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-8 pt-6 border-t border-[#FFF7E8]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF7E8]/60">
          <div>
            © {currentYear} {siteConfig.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Registered in England & Wales</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, Phone } from 'lucide-react';

export type PageId = 'home' | 'story' | 'menu' | 'gallery' | 'reservations' | 'order' | 'contact';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, setIsCartOpen } = useCart();

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'order', label: 'Order Online' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0A09]/95 backdrop-blur-md border-b border-[#D4A53A]/25 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Brand Logo Element */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0"
          >
            <BrandLogo size="md" variant="light" />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#FAF6F0]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#D4A53A] font-semibold'
                      : 'text-[#FAF6F0]/80 hover:text-[#D4A53A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#D4A53A] via-[#E8C547] to-[#D4A53A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Calling Number, Cart & Book CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Calling Number Link */}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1B18] border border-[#D4A53A]/30 text-xs font-semibold text-[#FAF6F0] hover:text-[#D4A53A] hover:border-[#D4A53A] transition-colors"
              title="Call Naija Pot direct"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A53A]" />
              <span className="font-mono">{siteConfig.contact.phone}</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#D4A53A] hover:text-[#E8C547] hover:bg-[#1E1B18] rounded-full transition-colors cursor-pointer"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4A53A] text-[#0B0A09] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B0A09] shadow-xs">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Primary Action: Book a Table CTA */}
            <button
              onClick={() => handleNavClick('reservations')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] text-sm font-semibold rounded-lg shadow-sm border border-[#D4A53A]/50 hover:border-[#D4A53A] transition-all whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D4A53A]" />
              <span>Book a Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#D4A53A] hover:bg-[#1E1B18] rounded-md transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141210] border-b border-[#D4A53A]/25 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-base font-medium py-2.5 border-b border-[#D4A53A]/15 flex items-center justify-between cursor-pointer ${
                    isActive ? 'text-[#D4A53A] font-bold' : 'text-[#FAF6F0] hover:text-[#D4A53A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#D4A53A]">● Current</span>}
                </button>
              );
            })}

            {/* Calling Link & Actions on Mobile Drawer */}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-3 bg-[#1E1B18] border border-[#D4A53A]/30 text-[#FFFDF9] rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4A53A]" />
                <span>Call Us: {siteConfig.contact.phone}</span>
              </a>

              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
                </svg>
                <span>WhatsApp: {siteConfig.contact.whatsappPhone}</span>
              </a>

              <button
                onClick={() => handleNavClick('reservations')}
                className="w-full py-3 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] border border-[#D4A53A]/50 text-center font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4A53A]" />
                Book a Table
              </button>

              <button
                onClick={() => handleNavClick('order')}
                className="w-full py-3 bg-[#D4A53A] text-[#0B0A09] text-center font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Takeaway
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

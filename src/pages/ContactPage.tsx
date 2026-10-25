import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { PageId } from '../components/Header';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ChevronDown, Sparkles, Instagram, Facebook } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is all your food certified Halal?',
      a: 'Yes, 100% of our chicken, beef, goat meat, and lamb is Halal-certified and sourced fresh daily from verified UK purveyors.'
    },
    {
      q: 'Do I need a reservation or do you welcome walk-ins?',
      a: 'Walk-in guests are always welcome! However, for Friday dinner, Saturday all-day, and Sunday dining, advance table reservation is strongly recommended to guarantee your preferred seating time.'
    },
    {
      q: 'How spicy is authentic Nigerian food?',
      a: 'Nigerian cooking embraces warm, vibrant chili peppers (scotch bonnets / habaneros). We allow you to customise your heat level from Mild to Extra Naija Hot when ordering. Traditional soups have a natural warmth that is deeply flavourful rather than just sharp heat.'
    },
    {
      q: 'What is your allergy policy regarding peanuts/groundnuts?',
      a: 'Our traditional Suya spice rub (Yaji) contains roasted groundnuts (peanuts). While we take extreme care to prevent cross-contamination, we advise guests with severe peanut allergies to alert our team so we can prepare dishes using peanut-free utensils and prep surfaces.'
    },
    {
      q: 'Do you offer private dining and large celebrations?',
      a: 'Yes! We host birthday banquets, corporate dinners, and wedding anniversary parties for groups of up to 45 guests. Please email bookings@naijapotkitchen.co.uk or call us directly to discuss bespoke menus.'
    },
    {
      q: 'Can I order food for takeaway or collection?',
      a: 'Yes, you can order directly through our Order Online tab. We offer scheduled kitchen collection (ready in ~25 minutes) as well as local delivery within a 3.5-mile radius.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B0A09] via-[#141210] to-[#26160C] text-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-[#D4A53A]/25">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A53A]/15 border border-[#D4A53A]/40 text-[#E8C547] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hospitality & Location</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFFDF9]">
            Connect With Naija Pot
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            We are located in the heart of London. Call our order desk, chat directly on WhatsApp, or book your table.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Map + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Interactive Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D4A53A]/20 shadow-md space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#3D2314]">
                Restaurant Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#0B0A09]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4A53A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0B0A09] block font-serif text-base">{siteConfig.legalName}</strong>
                    <span>{siteConfig.contact.addressLine1}</span><br />
                    <span>{siteConfig.contact.addressLine2}</span><br />
                    <span>{siteConfig.contact.city}, {siteConfig.contact.postcode}</span>
                  </div>
                </div>

                {/* Direct Calling Line */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#D4A53A]/30">
                  <div className="w-9 h-9 rounded-full bg-[#3D2314] text-[#D4A53A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">
                      Direct Calling Number
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-mono font-bold text-[#3D2314] hover:text-[#D4A53A] transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Chat Line */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-500/30">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">
                      WhatsApp Quick Chat
                    </span>
                    <a
                      href={siteConfig.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-mono font-bold text-emerald-900 hover:text-emerald-700 transition-colors"
                    >
                      {siteConfig.contact.whatsappPhone}
                    </a>
                  </div>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shrink-0"
                  >
                    Chat
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4A53A] shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#3D2314] font-medium">
                    {siteConfig.contact.email}
                  </a>
                </div>

                {/* Social Media Channels */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D2314]/70 mr-1">
                    Follow:
                  </span>
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#141210] text-[#D4A53A] flex items-center justify-center hover:bg-[#D4A53A] hover:text-[#141210] transition-colors shadow-sm"
                    title="Follow on Instagram (@naijapotkitchen_grill_mk)"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#141210] text-[#D4A53A] flex items-center justify-center hover:bg-[#D4A53A] hover:text-[#141210] transition-colors shadow-sm"
                    title="Follow on TikTok (@naija.pot.kitchen)"
                    aria-label="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.88-4.47V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69z"/>
                    </svg>
                  </a>
                  <a
                    href={siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#141210] text-[#D4A53A] flex items-center justify-center hover:bg-[#D4A53A] hover:text-[#141210] transition-colors shadow-sm"
                    title="Follow on Facebook"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Hours Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#3D2314] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4A53A]" />
                  Weekly Service Hours
                </h4>
                <div className="space-y-2 text-xs text-[#0B0A09]/80">
                  {siteConfig.hours.map((h) => (
                    <div key={h.day} className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-medium">{h.day}</span>
                      {h.isClosed ? (
                        <span className="text-red-700 font-semibold italic">Closed (Kitchen Rest)</span>
                      ) : (
                        <span>{h.allDay || `${h.lunch} · ${h.dinner}`}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#D4A53A]/20 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D2314]">
                  Interactive Location Map
                </span>
                <a
                  href={siteConfig.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#D4A53A] hover:text-[#3D2314] font-bold"
                >
                  Open in Google Maps →
                </a>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title="Naija Pot Location Map"
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#D4A53A]/20 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3D2314]">
                Send Us an Enquiry
              </h3>
              <p className="text-xs text-[#0B0A09]/70 mt-1">
                Have a question about large party bookings, catering, or dietary requirements? Drop us a note.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#3D2314]">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-[#0B0A09]/75 max-w-sm mx-auto">
                  E se gan! Thank you for reaching out, {name}. Our hospitality team will respond to {email} within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[#3D2314] text-[#FFFDF9] text-xs font-bold rounded-md hover:bg-[#4E2E1A] transition-colors cursor-pointer border border-[#D4A53A]/40"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Samuel Adeleke"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Group Celebration / Private Dining">Group Celebration / Private Dining</option>
                      <option value="Dietary & Allergen Question">Dietary & Allergen Question</option>
                      <option value="Catering & Events">Catering & Events</option>
                      <option value="Feedback">Feedback on a Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our hospitality team assist you today?"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4A53A]/40"
                >
                  <Send className="w-4 h-4 text-[#D4A53A]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
            Help & Information
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B0A09]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-xl border border-[#D4A53A]/20 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#0B0A09] hover:text-[#3D2314] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#D4A53A] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#0B0A09]/80 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

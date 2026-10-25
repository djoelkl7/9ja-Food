import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, Sparkles, MapPin, Phone } from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [seatingArea, setSeatingArea] = useState('Main Dining Bukka');
  const [specialRequests, setSpecialRequests] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(false);
  const [formError, setFormError] = useState('');
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  // Time slot options
  const lunchSlots = ['12:30', '13:00', '13:30', '14:00', '14:30'];
  const dinnerSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim() || !email.trim() || !phone.trim() || !bookingDate) {
      setFormError('Please fill in all required fields including your contact details and preferred date.');
      return;
    }

    // Generate unique confirmed reference
    const ref = `NP-RES-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingReference(ref);
  };

  const handleReset = () => {
    setBookingReference(null);
    setGuestName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B0A09] via-[#141210] to-[#26160C] text-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-[#D4A53A]/25">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A53A]/15 border border-[#D4A53A]/40 text-[#E8C547] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFFDF9]">
            Reserve Your Experience
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            Book an intimate table, family gathering, or celebration. We look forward to welcoming you to the Naija Pot dining room.
          </p>
        </div>
      </section>

      {/* Main Reservation Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Booking Form or Confirmation */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#6D1F2B]/15 shadow-md">
            {bookingReference ? (
              /* Success Confirmation Slip */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#6D1F2B]">
                    Table Confirmed!
                  </h3>
                  <p className="text-xs text-[#211A19]/70">
                    A confirmation email and SMS reminder have been scheduled.
                  </p>
                </div>

                <div className="bg-[#FFF7E8] p-6 rounded-xl border border-[#C6A15B]/40 text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#211A19]/70">Booking Reference:</span>
                    <span className="font-mono font-bold text-sm text-[#6D1F2B]">{bookingReference}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#211A19]/70">Primary Guest:</span>
                    <span className="font-semibold text-[#211A19]">{guestName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#211A19]/70">Party Size:</span>
                    <span className="font-semibold text-[#211A19]">{guestsCount} Guests</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#211A19]/70">Date & Time:</span>
                    <span className="font-semibold text-[#6D1F2B]">{bookingDate} at {timeSlot}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#211A19]/70">Seating Area:</span>
                    <span className="font-semibold text-[#211A19]">{seatingArea}</span>
                  </div>
                  {specialRequests && (
                    <div className="pt-1">
                      <span className="text-[#211A19]/70 block">Special Requests:</span>
                      <span className="italic text-[#211A19]">{specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#F3E8D6] rounded-lg text-xs text-[#211A19]/80 space-y-1 text-left">
                  <p className="font-semibold text-[#6D1F2B]">Table Holding Notice:</p>
                  <p>{siteConfig.policies.reservationGracePeriod}</p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#6D1F2B] text-[#FFF7E8] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#4A121B] transition-colors cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#6D1F2B]">
                    Table Reservation Request
                  </h3>
                  <p className="text-xs text-[#211A19]/70 mt-1">
                    Select your party size and preferred dining slot below.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Party Size & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Number of Guests *
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#6D1F2B]"
                    >
                      <option value="1">1 Person (Solo Dining)</option>
                      <option value="2">2 Persons (Table for 2)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Family Table)</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6 Persons (Deposit Required)</option>
                      <option value="8">8 Persons (Celebration)</option>
                      <option value="10">10+ Persons (Bukka Banquet)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider mb-1.5">
                      Seating Preference
                    </label>
                    <select
                      value={seatingArea}
                      onChange={(e) => setSeatingArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#6D1F2B]"
                    >
                      <option value="Main Dining Bukka">Main Dining Hall</option>
                      <option value="Private Dining Alcove">Private Dining Alcove</option>
                      <option value="Grill View Counter">Charcoal Grill View Counter</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#6D1F2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#6D1F2B]"
                    >
                      <optgroup label="Dinner Service">
                        {dinnerSlots.map((s) => (
                          <option key={s} value={s}>{s} (Dinner)</option>
                        ))}
                      </optgroup>
                      <optgroup label="Lunch Service">
                        {lunchSlots.map((s) => (
                          <option key={s} value={s}>{s} (Lunch)</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <span className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider">
                    Contact Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Full Name *"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#6D1F2B]"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#6D1F2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telephone / WhatsApp Number *"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#6D1F2B]"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#6D1F2B] uppercase tracking-wider">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Birthday celebration, groundnut / peanut allergy alert, quiet corner..."
                    className="w-full px-3.5 py-2 bg-white border border-[#6D1F2B]/20 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#6D1F2B]"
                  />
                </div>

                {/* Accessibility Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="accessibility"
                    checked={accessibilityNeeds}
                    onChange={(e) => setAccessibilityNeeds(e.target.checked)}
                    className="rounded border-slate-300 text-[#6D1F2B] focus:ring-[#6D1F2B] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="accessibility" className="text-xs text-[#211A19]/80 cursor-pointer">
                    Step-free wheelchair accessibility or ground-floor seating required.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1B5E20] hover:bg-[#10471A] text-[#FFF7E8] font-bold text-sm uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer border border-[#C6A15B]/40"
                >
                  Confirm Table Booking
                </button>
              </form>
            )}
          </div>

          {/* Right: Policies & Helpful Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFF7E8] p-6 rounded-2xl border border-[#6D1F2B]/15 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#6D1F2B]">
                Reservation Policy
              </h4>
              <ul className="space-y-3 text-xs text-[#211A19]/80">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>{siteConfig.policies.reservationGracePeriod}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>{siteConfig.policies.depositPolicy}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Children and families are warmly welcomed. High chairs available.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#D4A53A]/30 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#3D2314]">
                Direct Bookings & Groups
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                For private dining hire, weddings, or corporate bookings of 12 or more guests, please contact our events team directly:
              </p>
              <div className="pt-2 text-xs font-semibold text-[#3D2314] space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4A53A]" />
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="font-mono hover:text-[#D4A53A]">
                    Call: {siteConfig.contact.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 text-[#25D366] shrink-0 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
                    </svg>
                  </span>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[#0B0A09] hover:text-[#25D366]"
                  >
                    WhatsApp: {siteConfig.contact.whatsappPhone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A53A]" />
                  <span>{siteConfig.contact.reservationsEmail}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Phone,
  Loader2,
  Printer,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import {
  ReservationRequest,
  ReservationResponse,
  ReservationFieldErrors,
  validateGuestName,
  validateEmail,
  validatePhone,
  validateGuestsCount,
  validateBookingDate,
  validateTimeSlot,
  validateReservationPayload,
  reservationApi
} from '../services/reservationApi';

export const ReservationsPage: React.FC = () => {
  // Form fields state
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [seatingArea, setSeatingArea] = useState('Main Dining Hall');
  const [specialRequests, setSpecialRequests] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(false);

  // Validation & Submission state
  const [fieldErrors, setFieldErrors] = useState<ReservationFieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<ReservationResponse | null>(null);

  // Time slot options
  const lunchSlots = ['12:30', '13:00', '13:30', '14:00', '14:30'];
  const dinnerSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  // Current minimum date (today in local browser format YYYY-MM-DD)
  const todayDateString = (() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  // Maximum allowed reservation date (90 days ahead)
  const maxDateString = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  // Single field validator for blur & active change
  const validateSingleField = (field: keyof ReservationFieldErrors, value: string): string | null => {
    switch (field) {
      case 'guestName':
        return validateGuestName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'guestsCount':
        return validateGuestsCount(value);
      case 'bookingDate':
        return validateBookingDate(value);
      case 'timeSlot':
        return validateTimeSlot(value);
      default:
        return null;
    }
  };

  const handleBlur = (field: keyof ReservationFieldErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'guestName') val = guestName;
    else if (field === 'email') val = email;
    else if (field === 'phone') val = phone;
    else if (field === 'guestsCount') val = guestsCount;
    else if (field === 'bookingDate') val = bookingDate;
    else if (field === 'timeSlot') val = timeSlot;

    const error = validateSingleField(field, val);
    setFieldErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const handleFieldChange = (field: keyof ReservationFieldErrors, value: string) => {
    // Clear general error when user modifies fields
    if (generalError) setGeneralError(null);

    // Update state
    if (field === 'guestName') setGuestName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'phone') setPhone(value);
    else if (field === 'guestsCount') setGuestsCount(value);
    else if (field === 'bookingDate') setBookingDate(value);
    else if (field === 'timeSlot') setTimeSlot(value);

    // If user has already blurred this field, provide immediate re-validation feedback
    if (touched[field]) {
      const error = validateSingleField(field, value);
      setFieldErrors((prev) => ({ ...prev, [field]: error || undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Construct full reservation payload
    const payload: ReservationRequest = {
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      guestsCount: parseInt(guestsCount, 10) || 0,
      bookingDate,
      timeSlot,
      seatingArea,
      specialRequests: specialRequests.trim() || undefined,
      accessibilityNeeds
    };

    // Mark all required fields as touched for visual validation feedback
    setTouched({
      guestName: true,
      email: true,
      phone: true,
      guestsCount: true,
      bookingDate: true,
      timeSlot: true
    });

    // Run client-side validation
    const validation = validateReservationPayload(payload);
    setFieldErrors(validation.errors);

    // If any validation error exists, STOP HERE.
    // Zero invalid data can hit the API handler or database.
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors).find(Boolean);
      setGeneralError(firstError || 'Please complete all required fields with valid details before booking.');
      return;
    }

    // Begin Submission with Mock API handler
    try {
      setIsSubmitting(true);
      const response = await reservationApi.submitBooking(payload);
      setBookingResult(response);
    } catch (err: unknown) {
      const errorObj = err as { message?: string; errors?: ReservationFieldErrors };
      if (errorObj.errors) {
        setFieldErrors(errorObj.errors);
      }
      setGeneralError(errorObj.message || 'Unable to complete your table reservation. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setBookingResult(null);
    setGuestName('');
    setEmail('');
    setPhone('');
    setGuestsCount('2');
    setBookingDate('');
    setTimeSlot('19:00');
    setSeatingArea('Main Dining Hall');
    setSpecialRequests('');
    setAccessibilityNeeds(false);
    setFieldErrors({});
    setTouched({});
    setGeneralError(null);
  };

  // Generate WhatsApp confirmation message for the booked table
  const getWhatsAppBookingUrl = () => {
    if (!bookingResult) return siteConfig.socials.whatsapp;
    const { bookingReference, reservation } = bookingResult;
    let message = `*TABLE RESERVATION CONFIRMATION - ${siteConfig.legalName}*\n`;
    message += `----------------------------------------\n`;
    message += `*Reference:* ${bookingReference}\n`;
    message += `*Guest Name:* ${reservation.guestName}\n`;
    message += `*Party Size:* ${reservation.guestsCount} Guests\n`;
    message += `*Date & Time:* ${reservation.bookingDate} at ${reservation.timeSlot}\n`;
    message += `*Seating Area:* ${reservation.seatingArea}\n`;
    message += `*Contact Phone:* ${reservation.phone}\n`;
    message += `*Email:* ${reservation.email}\n`;
    if (reservation.specialRequests) {
      message += `*Special Requests:* ${reservation.specialRequests}\n`;
    }
    if (reservation.accessibilityNeeds) {
      message += `*Accessibility:* Step-free / wheelchair seating required\n`;
    }
    message += `----------------------------------------\n`;
    message += `Please confirm our table reservation. Looking forward to our visit!`;

    return `https://wa.me/447342229865?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
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
          {/* Left Column: Form or Confirmed Slip */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#D4A53A]/25 shadow-md">
            {bookingResult ? (
              /* Success Confirmation Slip */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2314]">
                    Table Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0B0A09]/75">
                    Your table is reserved. A confirmation summary has been registered in the restaurant book.
                  </p>
                </div>

                <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#D4A53A]/30 text-left space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Booking Reference:</span>
                    <span className="font-mono font-bold text-base text-[#3D2314] bg-white px-2.5 py-0.5 rounded border border-[#D4A53A]/30">
                      {bookingResult.bookingReference}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Primary Guest:</span>
                    <span className="font-semibold text-[#0B0A09]">{bookingResult.reservation.guestName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Party Size:</span>
                    <span className="font-semibold text-[#0B0A09]">{bookingResult.reservation.guestsCount} Guests</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Date & Time:</span>
                    <span className="font-semibold text-[#3D2314]">
                      {bookingResult.reservation.bookingDate} at {bookingResult.reservation.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Seating Area:</span>
                    <span className="font-semibold text-[#0B0A09]">{bookingResult.reservation.seatingArea}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Contact Phone:</span>
                    <span className="font-mono text-[#0B0A09]">{bookingResult.reservation.phone}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                    <span className="text-[#0B0A09]/70">Email for Receipt:</span>
                    <span className="font-mono text-[#0B0A09]">{bookingResult.reservation.email}</span>
                  </div>
                  {bookingResult.reservation.specialRequests && (
                    <div className="pt-1 border-b border-stone-200 pb-2.5">
                      <span className="text-[#0B0A09]/70 block mb-0.5">Special Requests:</span>
                      <span className="italic text-[#0B0A09]">{bookingResult.reservation.specialRequests}</span>
                    </div>
                  )}
                  {bookingResult.reservation.accessibilityNeeds && (
                    <div className="pt-1 text-emerald-800 font-medium">
                      ✓ Step-free wheelchair accessible seating requested.
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#FAF6F0] rounded-lg border border-[#D4A53A]/25 text-xs text-[#0B0A09]/80 space-y-1 text-left">
                  <p className="font-semibold text-[#3D2314]">Table Holding Policy Notice:</p>
                  <p>{siteConfig.policies.reservationGracePeriod}</p>
                </div>

                {/* Post-booking Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send to WhatsApp Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-3 px-4 bg-white hover:bg-stone-50 text-[#3D2314] font-bold text-xs uppercase tracking-wider rounded-lg border border-stone-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-stone-600" />
                    <span>Print Slip</span>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#3D2314] hover:text-[#D4A53A] transition-colors py-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Make Another Reservation</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#3D2314]">
                    Table Reservation Request
                  </h3>
                  <p className="text-xs text-[#0B0A09]/70 mt-1">
                    Select your party size, date, and contact details below. All fields marked with * are required.
                  </p>
                </div>

                {/* Top General Alert Banner */}
                {generalError && (
                  <div
                    role="alert"
                    className="p-3.5 bg-red-50 border border-red-300 text-red-800 text-xs rounded-lg flex items-start gap-2.5 animate-in fade-in"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Reservation Verification Notice</p>
                      <p className="mt-0.5 text-red-700 leading-relaxed">{generalError}</p>
                    </div>
                  </div>
                )}

                {/* Party Size & Seating Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-guests"
                      className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#D4A53A]" />
                      Number of Guests *
                    </label>
                    <select
                      id="res-guests"
                      value={guestsCount}
                      onChange={(e) => handleFieldChange('guestsCount', e.target.value)}
                      onBlur={() => handleBlur('guestsCount')}
                      aria-invalid={Boolean(touched.guestsCount && fieldErrors.guestsCount)}
                      aria-describedby={fieldErrors.guestsCount ? 'guestsCount-error' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        touched.guestsCount && fieldErrors.guestsCount
                          ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                          : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                      }`}
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
                    {touched.guestsCount && fieldErrors.guestsCount && (
                      <p id="guestsCount-error" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.guestsCount}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-area"
                      className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5"
                    >
                      Seating Preference
                    </label>
                    <select
                      id="res-area"
                      value={seatingArea}
                      onChange={(e) => setSeatingArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#D4A53A]"
                    >
                      <option value="Main Dining Hall">Main Dining Hall</option>
                      <option value="Private Dining Alcove">Private Dining Alcove</option>
                      <option value="Charcoal Grill View Counter">Charcoal Grill View Counter</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4A53A]" />
                      Reservation Date *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={bookingDate}
                      min={todayDateString}
                      max={maxDateString}
                      onChange={(e) => handleFieldChange('bookingDate', e.target.value)}
                      onBlur={() => handleBlur('bookingDate')}
                      aria-invalid={Boolean(touched.bookingDate && fieldErrors.bookingDate)}
                      aria-describedby={fieldErrors.bookingDate ? 'bookingDate-error' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        touched.bookingDate && fieldErrors.bookingDate
                          ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                          : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                      }`}
                    />
                    {touched.bookingDate && fieldErrors.bookingDate ? (
                      <p id="bookingDate-error" className="mt-1 text-[11px] text-red-600 flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                        <span>{fieldErrors.bookingDate}</span>
                      </p>
                    ) : (
                      <span className="block mt-1 text-[11px] text-stone-500">
                        Open Tuesday – Sunday. Closed Mondays.
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#D4A53A]" />
                      Preferred Time Slot *
                    </label>
                    <select
                      id="res-time"
                      value={timeSlot}
                      onChange={(e) => handleFieldChange('timeSlot', e.target.value)}
                      onBlur={() => handleBlur('timeSlot')}
                      aria-invalid={Boolean(touched.timeSlot && fieldErrors.timeSlot)}
                      aria-describedby={fieldErrors.timeSlot ? 'timeSlot-error' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        touched.timeSlot && fieldErrors.timeSlot
                          ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                          : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                      }`}
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
                    {touched.timeSlot && fieldErrors.timeSlot && (
                      <p id="timeSlot-error" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.timeSlot}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information (Guest Name, Email, Phone) */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <span className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                    Guest Contact Details (All Required)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="res-name" className="block text-[11px] font-bold text-[#3D2314] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => handleFieldChange('guestName', e.target.value)}
                        onBlur={() => handleBlur('guestName')}
                        placeholder="e.g. Folake Adeyemi"
                        aria-invalid={Boolean(touched.guestName && fieldErrors.guestName)}
                        aria-describedby={fieldErrors.guestName ? 'guestName-error' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm transition-colors ${
                          touched.guestName && fieldErrors.guestName
                            ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                            : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                        }`}
                      />
                      {touched.guestName && fieldErrors.guestName && (
                        <p id="guestName-error" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{fieldErrors.guestName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="res-email" className="block text-[11px] font-bold text-[#3D2314] mb-1">
                        Email Address *
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(touched.email && fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm transition-colors ${
                          touched.email && fieldErrors.email
                            ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                            : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                        }`}
                      />
                      {touched.email && fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="res-phone" className="block text-[11px] font-bold text-[#3D2314] mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+44 7123 456789 or 07123456789"
                      aria-invalid={Boolean(touched.phone && fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-xs sm:text-sm transition-colors ${
                        touched.phone && fieldErrors.phone
                          ? 'border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                          : 'border-[#D4A53A]/30 focus:ring-1 focus:ring-[#D4A53A]'
                      }`}
                    />
                    {touched.phone && fieldErrors.phone ? (
                      <p id="phone-error" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    ) : (
                      <span className="block mt-1 text-[11px] text-stone-500">
                        Used to send your booking confirmation SMS and table notification.
                      </span>
                    )}
                  </div>
                </div>

                {/* Special Requests (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="res-notes" className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    id="res-notes"
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Birthday celebration, groundnut / peanut allergy alert, quiet corner..."
                    className="w-full px-3.5 py-2 bg-white border border-[#D4A53A]/30 rounded-lg text-xs sm:text-sm focus:ring-1 focus:ring-[#D4A53A]"
                  />
                </div>

                {/* Accessibility Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="accessibility"
                    checked={accessibilityNeeds}
                    onChange={(e) => setAccessibilityNeeds(e.target.checked)}
                    className="rounded border-slate-300 text-[#3D2314] focus:ring-[#D4A53A] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="accessibility" className="text-xs text-[#0B0A09]/80 cursor-pointer">
                    Step-free wheelchair accessibility or ground-floor seating required.
                  </label>
                </div>

                {/* Submit Button with Loading Indicator */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#3D2314] hover:bg-[#4E2E1A] disabled:opacity-60 disabled:cursor-not-allowed text-[#FFFDF9] font-bold text-sm uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer border border-[#D4A53A] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#D4A53A]" />
                      <span>Verifying Availability & Securing Table...</span>
                    </>
                  ) : (
                    <span>Confirm Table Booking</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Reservation Policies & Direct Bookings */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#D4A53A]/30 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#3D2314]">
                Reservation Policy
              </h4>
              <ul className="space-y-3 text-xs text-[#0B0A09]/80">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#D4A53A] shrink-0 mt-0.5" />
                  <span>{siteConfig.policies.reservationGracePeriod}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#D4A53A] shrink-0 mt-0.5" />
                  <span>{siteConfig.policies.depositPolicy}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4A53A] shrink-0 mt-0.5" />
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
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
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

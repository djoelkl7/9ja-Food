/**
 * NAIJA POT KITCHEN & GRILL LTD
 * Robust Reservation API Service & Validation Engine
 * 
 * Provides both client-side and server-side validation guarantees
 * for table reservations, ensuring zero invalid data can reach
 * booking state or database handlers.
 */

export interface ReservationRequest {
  guestName: string;
  email: string;
  phone: string;
  guestsCount: number;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string;    // HH:mm
  seatingArea: string;
  specialRequests?: string;
  accessibilityNeeds?: boolean;
}

export interface ReservationResponse {
  success: boolean;
  bookingReference: string;
  createdAt: string;
  reservation: ReservationRequest;
  message: string;
}

export type ReservationFieldErrors = {
  guestName?: string;
  email?: string;
  phone?: string;
  guestsCount?: string;
  bookingDate?: string;
  timeSlot?: string;
};

export interface ValidationResult {
  isValid: boolean;
  errors: ReservationFieldErrors;
}

/**
 * Validates guest full name
 */
export function validateGuestName(name: string): string | null {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return 'Full name is required to secure your table.';
  }
  if (trimmed.length < 2) {
    return 'Full name must contain at least 2 characters.';
  }
  if (trimmed.length > 80) {
    return 'Name is too long (maximum 80 characters).';
  }
  // Must contain mostly letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'\-]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Please enter a valid name using letters, spaces, and hyphens only.';
  }
  return null;
}

/**
 * Validates customer email address (RFC compliant format)
 */
export function validateEmail(email: string): string | null {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return 'Email address is required for booking confirmation & reminders.';
  }
  // Standard robust email pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return null;
}

/**
 * Validates mobile or telephone number (UK & International formats)
 */
export function validatePhone(phone: string): string | null {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return 'Telephone or WhatsApp number is required for SMS confirmation.';
  }
  
  // Strip out valid formatting characters: spaces, parentheses, dashes
  const digitsOnly = trimmed.replace(/[\s\-()]/g, '');
  
  // Must start with + or digit
  if (!/^(\+)?[0-9]{8,16}$/.test(digitsOnly)) {
    return 'Please enter a valid phone number (8 to 15 digits, e.g. +44 7123 456789 or 07123456789).';
  }

  // Reject strings with impossible repetition like 000000000
  if (/^(\+)?(\d)\2{7,}$/.test(digitsOnly)) {
    return 'Please enter an authentic contact telephone number.';
  }

  return null;
}

/**
 * Validates guest count / party size
 */
export function validateGuestsCount(guests: number | string): string | null {
  const count = typeof guests === 'string' ? parseInt(guests, 10) : guests;
  if (isNaN(count) || count < 1) {
    return 'Please specify at least 1 guest for the reservation.';
  }
  if (count > 20) {
    return 'Online reservations are limited to 20 guests. For larger parties, please contact our events team.';
  }
  return null;
}

/**
 * Validates booking date (not past, not closed day, within 90 days horizon)
 */
export function validateBookingDate(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) {
    return 'Reservation date is required.';
  }

  // Check valid YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return 'Please provide a valid date in YYYY-MM-DD format.';
  }

  const selectedDate = new Date(`${dateStr}T12:00:00Z`);
  if (isNaN(selectedDate.getTime())) {
    return 'Please enter a valid calendar date.';
  }

  // Today in UTC comparison
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const today = new Date(`${todayStr}T12:00:00Z`);

  if (selectedDate < today) {
    return 'Reservation date cannot be in the past. Please select today or a future date.';
  }

  // Maximum 90 days in advance
  const maxDate = new Date(today);
  maxDate.setUTCDate(maxDate.getUTCDate() + 90);
  if (selectedDate > maxDate) {
    return 'Bookings can only be scheduled up to 90 days in advance.';
  }

  // Closed day check: Mondays (day 1 in getUTCDay())
  // Sunday is 0, Monday is 1, Tuesday is 2...
  if (selectedDate.getUTCDay() === 1) {
    return 'Naija Pot is closed on Mondays for kitchen prep and fresh market sourcing. Please choose Tuesday through Sunday.';
  }

  return null;
}

/**
 * Validates time slot
 */
export function validateTimeSlot(timeStr: string): string | null {
  if (!timeStr || !timeStr.trim()) {
    return 'Please select a dining time slot.';
  }
  const validSlots = [
    '12:30', '13:00', '13:30', '14:00', '14:30',
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];
  if (!validSlots.includes(timeStr)) {
    return 'Selected time is outside regular dining service hours.';
  }
  return null;
}

/**
 * Comprehensive validator for the entire reservation payload
 */
export function validateReservationPayload(data: Partial<ReservationRequest>): ValidationResult {
  const errors: ReservationFieldErrors = {};

  const nameError = validateGuestName(data.guestName || '');
  if (nameError) errors.guestName = nameError;

  const emailError = validateEmail(data.email || '');
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone || '');
  if (phoneError) errors.phone = phoneError;

  const guestsError = validateGuestsCount(data.guestsCount ?? 0);
  if (guestsError) errors.guestsCount = guestsError;

  const dateError = validateBookingDate(data.bookingDate || '');
  if (dateError) errors.bookingDate = dateError;

  const timeError = validateTimeSlot(data.timeSlot || '');
  if (timeError) errors.timeSlot = timeError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Mock Reservation API Handler
 * Enforces server-side validation check before producing a confirmed reservation.
 */
export const reservationApi = {
  async submitBooking(payload: ReservationRequest): Promise<ReservationResponse> {
    // 1. Simulate server network hop (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. Strict Server-Side Validation Defense
    const validation = validateReservationPayload(payload);
    if (!validation.isValid) {
      const errorSummary = Object.values(validation.errors).filter(Boolean).join(' ');
      const err = new Error(errorSummary || 'Invalid reservation submission.');
      (err as unknown as { status: number; errors: ReservationFieldErrors }).status = 400;
      (err as unknown as { status: number; errors: ReservationFieldErrors }).errors = validation.errors;
      throw err;
    }

    // 3. Generate confirmed booking reference
    const timestamp = Date.now().toString().slice(-4);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const reference = `NP-RES-${timestamp}-${randomSuffix}`;

    return {
      success: true,
      bookingReference: reference,
      createdAt: new Date().toISOString(),
      reservation: payload,
      message: 'Your table reservation has been recorded in the kitchen book.'
    };
  }
};

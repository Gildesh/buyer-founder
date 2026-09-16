export function getBookingUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  return url || undefined;
}

import type { CSSProperties, ReactNode } from "react";
import { getBookingUrl } from "@/lib/booking";

type BookingLinkProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function BookingLink({ children, className, style }: BookingLinkProps) {
  const url = getBookingUrl();
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}

export function BookingCta({
  label = "Book a pilot call",
  className,
  style,
}: {
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const url = getBookingUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {label}
    </a>
  );
}

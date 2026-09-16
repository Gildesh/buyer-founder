import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | "waitlist_signup"
  | "try_example_loaded"
  | "try_wedge_exported"
  | "sample_view"
  | "campaign_view";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: EventParams) => void;
    fbq?: (command: string, event: string, params?: EventParams) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;

  const payload = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;

  try {
    vercelTrack(name, payload);
  } catch {
    // Analytics should never block UX.
  }

  try {
    window.gtag?.("event", name, payload);
  } catch {
    // Optional third-party tag.
  }

  try {
    window.fbq?.("trackCustom", name, payload);
  } catch {
    // Optional third-party tag.
  }
}

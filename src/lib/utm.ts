export const UTM_COOKIE_NAMES = {
  source: "bf_utm_source",
  medium: "bf_utm_medium",
  campaign: "bf_utm_campaign",
} as const;

export type UtmAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function readUtmFromCookies(): UtmAttribution {
  if (typeof document === "undefined") return {};

  const read = (name: string) => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
  };

  return {
    utmSource: read(UTM_COOKIE_NAMES.source),
    utmMedium: read(UTM_COOKIE_NAMES.medium),
    utmCampaign: read(UTM_COOKIE_NAMES.campaign),
  };
}

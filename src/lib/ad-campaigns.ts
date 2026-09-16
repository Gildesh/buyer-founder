const defaultSiteUrl = "https://buyer-founder.vercel.app";

export type AdChannel = "meta" | "google" | "linkedin" | "x";

export type AdCreative = {
  slug: string;
  channel: AdChannel;
  destinationUrl: string;
  primaryText: string;
  headline: string;
  description: string;
  cta: string;
};

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
}

/** Build a tracked campaign landing URL for paid traffic. */
export function buildCampaignAdUrl(
  slug: string,
  channel: AdChannel,
  extra?: { utm_content?: string },
): string {
  const params = new URLSearchParams({
    utm_source: channel,
    utm_medium: "paid",
    utm_campaign: slug,
  });
  if (extra?.utm_content) params.set("utm_content", extra.utm_content);

  return `${siteUrl()}/l/${slug}?${params.toString()}`;
}

/** Ready-to-paste ad sets for the first PainFork test. */
export const painforkAntiHypeAds: AdCreative[] = [
  {
    slug: "painfork-anti-hype",
    channel: "meta",
    destinationUrl: buildCampaignAdUrl("painfork-anti-hype", "meta", { utm_content: "founders-v1" }),
    primaryText:
      "Your deck pitches a paradigm shift. Your buyer is still living with the old pain.\n\nPainFork excavates evidence-backed buyer pain and exports a wedge one-pager — in your browser, no signup.\n\nTry the AS/400 legacy example and download wedge.md in five minutes.",
    headline: "Pain before paradigm",
    description: "Name the buyer pain. Export a wedge one-pager.",
    cta: "Learn more",
  },
  {
    slug: "painfork-anti-hype",
    channel: "google",
    destinationUrl: buildCampaignAdUrl("painfork-anti-hype", "google", { utm_content: "search-v1" }),
    primaryText:
      "Stop pitching features. PainFork helps technical founders excavate buyer pain, validate with evidence, and export a scoped wedge — free in the browser.",
    headline: "Buyer pain → wedge one-pager",
    description: "Free browser tool. AS/400 example included. Export markdown.",
    cta: "Try PainFork",
  },
  {
    slug: "painfork-anti-hype",
    channel: "linkedin",
    destinationUrl: buildCampaignAdUrl("painfork-anti-hype", "linkedin", { utm_content: "founders-v1" }),
    primaryText:
      "Consulting scopes balloon when the wedge isn't named.\n\nPainFork: context → excavate → validate → fork → export. Deterministic, runs locally, ships wedge.md you can send to a buyer.",
    headline: "Name the pain before the pitch",
    description: "Live on buyer-founder.com — try the legacy modernization example.",
    cta: "Try free",
  },
];

export function getAdCreativesForCampaign(slug: string): AdCreative[] {
  if (slug === "painfork-anti-hype") return painforkAntiHypeAds;
  return [];
}

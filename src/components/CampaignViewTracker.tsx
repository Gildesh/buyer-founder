"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type CampaignViewTrackerProps = {
  slug: string;
  product: string;
};

export function CampaignViewTracker({ slug, product }: CampaignViewTrackerProps) {
  useEffect(() => {
    trackEvent("campaign_view", { slug, product });
  }, [slug, product]);

  return null;
}

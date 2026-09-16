"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackSampleViewProps = {
  sample: string;
};

export function TrackSampleView({ sample }: TrackSampleViewProps) {
  useEffect(() => {
    trackEvent("sample_view", { sample });
  }, [sample]);

  return null;
}

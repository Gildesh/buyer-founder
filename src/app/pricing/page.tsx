import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start free with the founder pipeline. Upgrade when you're ready to ship and sell.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plans"
        title="Simple pricing"
        description="Start with the free pipeline. Upgrade when you're ready to ship and sell."
      />
      <Pricing showHeader={false} />
      <CTA />
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ValueProps } from "@/components/ValueProps";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About",
  description: "Built by a solo technical founder for solo technical founders.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Philosophy"
        title="Why Buyer Founder"
        description="Built by a solo technical founder for solo technical founders. No toxic positivity. No billable-hour theater."
      />
      <ValueProps showHeader={false} />
      <CTA />
    </>
  );
}

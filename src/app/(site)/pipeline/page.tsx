import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pipeline } from "@/components/Pipeline";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Founder Pipeline",
  description: "Discover buyer pain, incubate one idea, validate before you ship.",
};

export default function PipelinePage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="The founder pipeline"
        description="Three tools that turn “I have an idea” into “I have a wedge, receipts, and a ship plan.”"
      />
      <Pipeline showHeader={false} />
      <CTA />
    </>
  );
}

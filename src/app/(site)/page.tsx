import { Hero } from "@/components/Hero";
import { HomeNav } from "@/components/HomeNav";
import { StatusStrip } from "@/components/StatusStrip";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatusStrip />
      <HomeNav />
      <CTA />
    </>
  );
}

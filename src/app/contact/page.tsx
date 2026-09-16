import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get early access, book a demo, or ask about any Buyer Founder product.",
};

interface PageProps {
  searchParams: Promise<{ product?: string; plan?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const preselectedProduct = params.product ?? "";
  const preselectedPlan = params.plan ?? "";

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl tracking-tight">Get in touch</h1>
            <p className="mt-4 text-lg text-muted">
              Enterprise pilots and scoped freelance artifacts. For product
              launches, use the{" "}
              <Link href="/waitlist" className="text-ember hover:underline">
                waitlist
              </Link>
              . To excavate a wedge now,{" "}
              <Link href="/try" className="text-ember hover:underline">
                try PainFork
              </Link>
              .
            </p>

            <div className="mt-10 space-y-6">
              <div className="rounded-xl border border-border bg-surface-raised p-5">
                <h2 className="font-medium text-paper">Waitlist</h2>
                <p className="mt-2 text-sm text-muted">
                  Email capture for beta products. PainFork is already live at{" "}
                  <Link href="/try" className="text-ember hover:underline">/try</Link>.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-raised p-5">
                <h2 className="font-medium text-paper">Enterprise pilots</h2>
                <p className="mt-2 text-sm text-muted">
                  Legacy modernization (VAC), workforce scheduling (Roster Solver),
                  energy CV (Petrol Vision) — scoped proof-of-value engagements.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-raised p-5">
                <h2 className="font-medium text-paper">Freelance deliverables</h2>
                <p className="mt-2 text-sm text-muted">
                  Book a scoped artifact via Fullstack Assistant — geo-legal
                  reports, technical audits, named outcomes with decision logs.
                </p>
              </div>
            </div>
          </div>

          <ContactForm
            products={products.map((p) => ({ slug: p.slug, name: p.name }))}
            defaultProduct={preselectedProduct}
            defaultPlan={preselectedPlan}
          />
        </div>
      </div>
    </div>
  );
}

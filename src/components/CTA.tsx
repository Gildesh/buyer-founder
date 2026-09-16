import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-ember/20 bg-surface-raised px-8 py-16 text-center md:px-16">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at center, #e8a54b44 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Ready to find your wedge?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
              PainFork is live in this browser. Excavate buyer pain, export a one-pager,
              then join the waitlist for Pro libraries.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/try"
                className="rounded-full bg-ember px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember-dim"
              >
                Try PainFork
              </Link>
              <Link
                href="/waitlist?product=painfork&source=cta"
                className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-paper transition hover:border-ember/40"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

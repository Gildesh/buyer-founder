const values = [
  {
    title: "Pain before paradigm",
    description:
      "Every product starts with validated buyer pain — not feature lists. Evidence gates everything.",
    icon: "◎",
  },
  {
    title: "Privacy by default",
    description:
      "Local-first where possible. Your repo, your chats, your foundry data stay on your machine.",
    icon: "⬡",
  },
  {
    title: "Deterministic cores",
    description:
      "Pattern matching, OR-Tools, rulebooks — math and rules where LLMs would hallucinate.",
    icon: "△",
  },
  {
    title: "Named outcomes",
    description:
      "Sell artifacts and decision logs, not hours. Clients know exactly what they're buying.",
    icon: "□",
  },
];

interface ValuePropsProps {
  showHeader?: boolean;
}

export function ValueProps({ showHeader = true }: ValuePropsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Why Buyer Founder
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Built by a solo technical founder for solo technical founders.
              No toxic positivity. No billable-hour theater.
            </p>
          </div>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${showHeader ? "mt-16" : ""}`}>
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-surface-raised/30 p-6 text-center"
            >
              <span className="text-3xl text-ember" aria-hidden>{value.icon}</span>
              <h3 className="mt-4 font-display text-xl text-paper">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

interface ContactFormProps {
  products: { slug: string; name: string }[];
  defaultProduct?: string;
  defaultPlan?: string;
}

export function ContactForm({
  products,
  defaultProduct = "",
  defaultPlan = "",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: defaultProduct,
    plan: defaultPlan,
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Buyer Founder: ${form.product || form.plan || "General inquiry"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProduct: ${form.product || "—"}\nPlan: ${form.plan || "—"}\n\n${form.message}`,
    );
    window.location.href = `mailto:hello@buyerfounder.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ember/30 bg-surface-raised p-8 text-center">
        <p className="font-display text-2xl text-paper">Opening your email client…</p>
        <p className="mt-3 text-sm text-muted">
          If nothing opened, email{" "}
          <a href="mailto:hello@buyerfounder.com" className="text-ember hover:underline">
            hello@buyerfounder.com
          </a>{" "}
          directly with your inquiry.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-muted hover:text-paper"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface-raised p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-paper">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-border bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-paper">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-border bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            placeholder="you@company.com"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-paper">
              Product
            </label>
            <select
              id="product"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-ink px-4 py-2.5 text-sm text-paper focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-paper">
              Plan interest
            </label>
            <select
              id="plan"
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-ink px-4 py-2.5 text-sm text-paper focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            >
              <option value="">Select a plan</option>
              <option value="starter">Founder Starter (Free)</option>
              <option value="pro">Founder Pro ($49/mo)</option>
              <option value="enterprise">Enterprise (Custom)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-paper">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1.5 w-full resize-none rounded-lg border border-border bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-ember/50 focus:outline-none focus:ring-1 focus:ring-ember/30"
            placeholder="What are you building? What problem are you trying to solve?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-ember py-3 text-sm font-semibold text-ink transition hover:bg-ember-dim"
      >
        Send message
      </button>

      <p className="mt-4 text-center text-xs text-muted">
        Opens your email client with a pre-filled message. No data stored on our servers.
      </p>
    </form>
  );
}

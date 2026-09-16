# Buyer Founder

Marketing site for the solo-founder product suite — from buyer pain discovery to shipped products.

## Products showcased

- **Founder Pipeline:** PainFork, Kiln, Feasibility Validator
- **Professional Services:** Fullstack Assistant, Clause Finder
- **Enterprise Tools:** Visual API Compiler, Wire Fusion, Roster Solver, Form Compiler, Petrol Vision
- **Collaboration:** Planroom, Edge Searcher
- **Consumer:** Stillpoint, Travel Companion

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3400](http://localhost:3400).

- **Try PainFork:** `/try` — uses vendored `@painfork/core` in `vendor/painfork-core`.
- **Waitlist:** `POST /api/waitlist`. Without Supabase env vars, signups append to `data/waitlist.jsonl` (gitignored). With `SUPABASE_URL` + `SUPABASE_ANON_KEY`, signups persist to `waitlist_signups` (see `supabase/migrations/`).
- **Samples:** `/samples/wedge`, `/samples/feasibility`, `/samples/clauses`.
- **Campaign landings:** `/l/painfork-anti-hype`, `/l/clause-finder-search` (minimal nav, UTM-friendly).
- **SEO pain pages:** `/pain/hoa-restrictions`, `/pain/legacy-modernization-wedge`.

## Environment

Copy `.env.example` to `.env.local` for local overrides. Production (Vercel) needs at minimum:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Waitlist persistence |
| `SUPABASE_ANON_KEY` | Insert-only waitlist via RLS |
| `NEXT_PUBLIC_SITE_URL` | Sitemap, OG, canonical URLs |

Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID` for conversion pixels. Vercel Analytics is enabled by default via `@vercel/analytics`.

## Deploy

GitHub: [Gildesh/buyer-founder](https://github.com/Gildesh/buyer-founder). Vercel production deploy from that repo.

```bash
npm run build
npx vercel --prod
```

After adding Supabase env vars in the Vercel project settings, redeploy so `/api/waitlist` works in production.

## Edit products

Product data lives in `src/lib/products.ts`. Campaign copy: `src/lib/campaigns.ts`. Pain SEO pages: `src/lib/pain-pages.ts`.

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
- **Waitlist:** `POST /api/waitlist` appends to `data/waitlist.jsonl` locally (gitignored). On Vercel the filesystem is not writable, so the API returns 503 and the form tells people to email hello@buyerfounder.com.
- **Samples:** `/samples/wedge`, `/samples/feasibility`, `/samples/clauses`.

## Deploy

GitHub: [Gildesh/buyer-founder](https://github.com/Gildesh/buyer-founder). Vercel production deploy from that repo.

```bash
npm run build
npx vercel --prod
```

## Edit products

Product data lives in `src/lib/products.ts`. Update descriptions, pricing, and CTAs there.

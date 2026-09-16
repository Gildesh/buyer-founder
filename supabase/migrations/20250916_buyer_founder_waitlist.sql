create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product text not null default 'general',
  plan text not null default 'waitlist',
  source text not null default 'site',
  utm_campaign text,
  utm_source text,
  utm_medium text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index if not exists waitlist_signups_product_idx on public.waitlist_signups (product);

alter table public.waitlist_signups enable row level security;

grant insert on public.waitlist_signups to anon, authenticated, service_role;

create policy waitlist_signups_insert_anon
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

revoke select, update, delete on public.waitlist_signups from anon, authenticated;

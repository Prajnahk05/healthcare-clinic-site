create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('Owner', 'Doctor', 'Reception', 'Lab Staff', 'Pharmacy')),
  status text not null default 'Pending' check (status in ('Active', 'Pending', 'Disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admin users are readable by authenticated users" on public.admin_users;
drop policy if exists "Admin users are manageable by authenticated users" on public.admin_users;

create policy "Admin users are readable by authenticated users"
  on public.admin_users
  for select
  to anon, authenticated
  using (true);

create policy "Admin users are manageable by authenticated users"
  on public.admin_users
  for all
  to anon, authenticated
  using (true)
  with check (true);

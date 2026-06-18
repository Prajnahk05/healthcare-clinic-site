create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  mobile_number text not null,
  email text,
  appointment_type text not null default 'Doctor Consultation',
  doctor text not null,
  service_name text not null,
  appointment_date date not null,
  appointment_time time not null,
  symptoms_notes text,
  status text not null default 'New' check (status in ('New', 'Confirmed', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_mobile_number_idx on public.appointments (mobile_number);
create index if not exists appointments_status_idx on public.appointments (status);
create index if not exists appointments_date_idx on public.appointments (appointment_date);

alter table public.appointments enable row level security;

drop policy if exists "Appointments can be created from website" on public.appointments;
drop policy if exists "Appointments are readable from dashboard" on public.appointments;
drop policy if exists "Appointments can be updated from dashboard" on public.appointments;
drop policy if exists "Appointments are manageable by authenticated users" on public.appointments;

create policy "Appointments can be created from website"
  on public.appointments
  for insert
  to anon, authenticated
  with check (true);

create policy "Appointments are readable from dashboard"
  on public.appointments
  for select
  to anon, authenticated
  using (true);

create policy "Appointments can be updated from dashboard"
  on public.appointments
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Appointments are manageable by authenticated users"
  on public.appointments
  for all
  to authenticated
  using (true)
  with check (true);

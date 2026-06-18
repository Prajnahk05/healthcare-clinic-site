create table if not exists public.patient_reports (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  mobile text not null,
  title text not null,
  report_date date not null default current_date,
  status text not null default 'Draft' check (status in ('Published', 'Draft', 'Archived')),
  file_name text not null,
  file_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists patient_reports_mobile_idx on public.patient_reports (mobile);
create index if not exists patient_reports_status_idx on public.patient_reports (status);

alter table public.patient_reports enable row level security;

drop policy if exists "Published reports are readable" on public.patient_reports;
drop policy if exists "Reports are readable from dashboard" on public.patient_reports;
drop policy if exists "Reports can be created from dashboard" on public.patient_reports;
drop policy if exists "Reports can be updated from dashboard" on public.patient_reports;
drop policy if exists "Reports can be deleted from dashboard" on public.patient_reports;
drop policy if exists "Reports are manageable by authenticated users" on public.patient_reports;

create policy "Published reports are readable"
  on public.patient_reports
  for select
  to anon, authenticated
  using (status = 'Published');

create policy "Reports are readable from dashboard"
  on public.patient_reports
  for select
  to anon, authenticated
  using (true);

create policy "Reports can be created from dashboard"
  on public.patient_reports
  for insert
  to anon, authenticated
  with check (true);

create policy "Reports can be updated from dashboard"
  on public.patient_reports
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Reports can be deleted from dashboard"
  on public.patient_reports
  for delete
  to anon, authenticated
  using (true);

create policy "Reports are manageable by authenticated users"
  on public.patient_reports
  for all
  to authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public)
values ('patient-reports', 'patient-reports', true)
on conflict (id) do update set public = true;

drop policy if exists "Patient report files are publicly readable" on storage.objects;
drop policy if exists "Patient report files can be uploaded from dashboard" on storage.objects;
drop policy if exists "Patient report files can be updated from dashboard" on storage.objects;
drop policy if exists "Patient report files can be deleted from dashboard" on storage.objects;

create policy "Patient report files are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'patient-reports');

create policy "Patient report files can be uploaded from dashboard"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'patient-reports');

create policy "Patient report files can be updated from dashboard"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'patient-reports')
  with check (bucket_id = 'patient-reports');

create policy "Patient report files can be deleted from dashboard"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'patient-reports');

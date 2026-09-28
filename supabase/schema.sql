create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  whatsapp text,
  email text,
  city text,
  employment_type text,
  income numeric,
  cibil integer,
  product text,
  source text default 'Manual',
  status text default 'New',
  priority text default 'Warm',
  assigned_to uuid,
  next_followup timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  activity_type text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  product text,
  lender text,
  stage text default 'New',
  amount numeric,
  status text default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  document_type text,
  storage_path text,
  created_at timestamptz not null default now()
);

create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  provider text unique not null,
  enabled boolean default false,
  metadata jsonb default '{}'::jsonb
);

insert into integrations(provider)
values
  ('whatsapp'),
  ('facebook_leads'),
  ('google_drive')
on conflict(provider) do nothing;

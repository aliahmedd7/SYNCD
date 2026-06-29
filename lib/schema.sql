-- SYNCD Agency Dashboard Schema

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text not null,
  contact_email text not null,
  status text not null default 'prospect' check (status in ('active', 'inactive', 'prospect')),
  service_type text check (service_type in ('website', 'automation', 'ai_campaign', 'full_service')),
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'planning' check (status in ('planning', 'active', 'completed', 'paused')),
  start_date date,
  end_date date,
  budget numeric(12,2),
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  platform text not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  budget numeric(12,2),
  spend numeric(12,2) default 0,
  impressions bigint default 0,
  clicks bigint default 0,
  conversions bigint default 0,
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists projects_client_id_idx on projects(client_id);
create index if not exists campaigns_project_id_idx on campaigns(project_id);

-- Seed data
insert into clients (name, industry, contact_email, status) values
  ('Apex Brands', 'Retail', 'hello@apexbrands.com', 'active'),
  ('Meridian Health', 'Healthcare', 'contact@meridianhealth.com', 'active'),
  ('Volta Motors', 'Automotive', 'marketing@voltamotors.com', 'prospect'),
  ('Orbit Studios', 'Entertainment', 'studio@orbitstudios.io', 'active'),
  ('Novu Finance', 'Finance', 'growth@novufinance.com', 'inactive')
on conflict do nothing;

insert into projects (client_id, name, description, status, budget)
select id, 'Brand Refresh 2025', 'Full rebrand including visual identity and digital assets', 'active', 48000
from clients where name = 'Apex Brands'
on conflict do nothing;

insert into projects (client_id, name, description, status, budget)
select id, 'Q3 Awareness Push', 'Multi-channel awareness campaign across social and search', 'active', 32000
from clients where name = 'Meridian Health'
on conflict do nothing;

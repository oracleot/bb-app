create table users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  age_group text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

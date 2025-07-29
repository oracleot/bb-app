create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  module_id text not null,
  screen_id text not null,
  completed_at timestamptz,
  score integer,
  attempts integer default 0
);

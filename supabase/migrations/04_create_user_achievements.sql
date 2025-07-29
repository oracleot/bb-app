create table user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  achievement_type text not null,
  earned_at timestamptz not null default now(),
  metadata jsonb
);

create table user_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  module_id text not null,
  story_title text not null,
  story_content text not null,
  prompt_used text,
  created_at timestamptz not null default now()
);

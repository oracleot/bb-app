ALTER TABLE user_progress ADD COLUMN step TEXT;
CREATE UNIQUE INDEX user_progress_unique ON user_progress (user_id, module_id, step);
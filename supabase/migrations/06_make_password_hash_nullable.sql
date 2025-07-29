-- 06_make_password_hash_nullable.sql
-- Migration: Make password_hash column nullable in users table

ALTER TABLE users
ALTER COLUMN password_hash DROP NOT NULL;

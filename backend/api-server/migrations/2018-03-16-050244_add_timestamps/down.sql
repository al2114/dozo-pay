-- This file should undo anything in `up.sql`
ALTER TABLE users DROP COLUMN created_at;
ALTER TABLE accounts DROP COLUMN created_at;

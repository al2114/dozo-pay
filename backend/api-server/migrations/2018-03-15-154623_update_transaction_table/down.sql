-- This file should undo anything in `up.sql`
ALTER TABLE transactions
    DROP COLUMN successful,
    DROP COLUMN created_at;

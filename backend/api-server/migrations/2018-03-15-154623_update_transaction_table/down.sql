-- This file should undo anything in `up.sql`
ALTER TABLE transactions
    DROP COLUMN is_successful,
    DROP COLUMN created_at;

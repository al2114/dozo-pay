-- Your SQL goes here
ALTER TABLE transactions
    ADD COLUMN is_successful boolean NOT NULL DEFAULT false,
    ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();

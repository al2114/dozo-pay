-- Your SQL goes here
ALTER TABLE users ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE accounts ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();

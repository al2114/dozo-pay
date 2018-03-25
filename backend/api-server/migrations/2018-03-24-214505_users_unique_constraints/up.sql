-- Your SQL goes here
ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);
ALTER TABLE users ADD CONSTRAINT users_phone_no_key UNIQUE (phone_no);

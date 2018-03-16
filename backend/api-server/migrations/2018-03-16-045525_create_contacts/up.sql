-- Your SQL goes here

CREATE TABLE contacts (
    user_id     INT NOT NULL,
    contact_id  INT NOT NULL,
    is_trusted  BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, contact_id)
);

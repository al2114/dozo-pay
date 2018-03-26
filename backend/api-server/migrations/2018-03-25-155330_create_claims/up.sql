-- Your SQL goes here
CREATE TABLE claims(
  uid            SERIAL PRIMARY KEY,
  account_id     INT NOT NULL,
  owner_id       INT NOT NULL,
  receiver_id    INT,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);



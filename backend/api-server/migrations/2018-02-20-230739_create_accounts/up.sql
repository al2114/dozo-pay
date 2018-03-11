-- Your SQL goes here
CREATE TABLE users(
  uid            SERIAL PRIMARY KEY,
  phone_no       VARCHAR(20),
  picture_url    VARCHAR,
  account_id     INT,
  username       VARCHAR(24),
  password       VARCHAR(24)
);

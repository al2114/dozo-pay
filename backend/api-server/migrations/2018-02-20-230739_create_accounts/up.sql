-- Your SQL goes here
CREATE TABLE users(
  uid            SERIAL PRIMARY KEY,
  phone_no       VARCHAR(20) NOT NULL,
  picture_url    VARCHAR,
  account_id     INT NOT NULL,
  username       VARCHAR(24) NOT NULL,
  password       CHAR(32) NOT NULL
);

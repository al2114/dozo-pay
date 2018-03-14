-- Your SQL goes here
CREATE TABLE users(
  uid            SERIAL PRIMARY KEY,
  phone_no       VARCHAR(20) NOT NULL,
  picture_url    VARCHAR,
  account_id     INT NOT NULL,
  username       VARCHAR(24) NOT NULL,
  password       CHAR(32) NOT NULL
);

CREATE TABLE accounts(
  uid            SERIAL PRIMARY KEY,
  balance        INT NOT NULL
);

CREATE TABLE transactions(
  uid            SERIAL PRIMARY KEY,
  payer_id       INT NOT NULL,
  payee_id       INT NOT NULL,
  amount         INT NOT NULL
);

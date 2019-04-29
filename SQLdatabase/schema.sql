DROP DATABASE IF EXISTS similarhomes;
CREATE DATABASE similarhomes;

\connect similarhomes;

CREATE TABLE similar_homes (
  id serial PRIMARY KEY,
  city VARCHAR(255),
  property_avail VARCHAR(255),
  location_name VARCHAR(255),
  photo_url VARCHAR(255),
  price INT,
  rating REAL,
  review_count INT
);

CREATE TABLE test_homes (
  id serial PRIMARY KEY,
  city VARCHAR(255),
  property_avail VARCHAR(255),
  location_name VARCHAR(255),
  photo_url VARCHAR(255),
  price INT,
  rating REAL,
  review_count INT
);

CREATE INDEX multi ON similar_homes (city, price, rating);

\copy similar_homes FROM '/Users/simonchan/Desktop/HR/similar-homes-module/mockGenerator/tenMil.csv' DELIMITER ',' CSV HEADER;
-- \copy test_homes FROM '/Users/simonchan/Desktop/HR/similar-homes-module/mockGenerator/tenMil.csv' DELIMITER ',' CSV HEADER;

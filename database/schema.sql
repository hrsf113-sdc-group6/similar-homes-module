DROP DATABASE IF EXISTS similarhomes;
CREATE DATABASE similarhomes;

\connect similarhomes;

CREATE TABLE similarHomes (
  _id serial PRIMARY KEY, 
  propertyAvail VARCHAR(255),
  locationName VARCHAR(255),
  photoUrl VARCHAR(255),
  price  INT,
  rating VARCHAR(255),
  reviewCount INT
);

-- \copy similarhomes FROM '/Users/simonchan/Desktop/HR/similar-homes-module/data.csv' DELIMITER ',' CSV HEADER;
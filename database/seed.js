const { db } = require('./index.js');
const { RelatedHomes } = require('./model');

db.drop();

db.sync()
  .then(() => db.query(`COPY similarhomes FROM /Users/simonchan/Desktop/HR/similar-homes-module/data.csv WITH CSV, HEADER`);

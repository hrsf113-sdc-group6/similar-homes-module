const sequelize = require('./index.js');
const { RelatedHomes } = require('./model');

sequelize.drop();

sequelize.sync()
  .then(() => sequelize.query("COPY similar_homes FROM '/Users/simonchan/Desktop/HR/similar-homes-module/mockGenerator/tenMil.csv' DELIMITER ',' CSV HEADER"))
  .catch(err => console.log(err, 'sync err'));

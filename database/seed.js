const sequelize = require('./index.js');
const { RelatedHomes } = require('./model');

sequelize.drop();

sequelize.sync()
  .then(() => sequelize.query(`COPY similarhomes FROM '/Users/simonchan/Desktop/HR/similar-homes-module/data.csv' DELIMITER ',' CSV HEADER`))
  .catch(err => console.log(err, 'sync err'));

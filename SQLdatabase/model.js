const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const { Model } = Sequelize;

const tableName = 'similar_homes';

class RelatedHomes extends Model {}
RelatedHomes.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: Sequelize.STRING,
  property_avail: Sequelize.STRING,
  location_name: Sequelize.STRING,
  photo_url: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.STRING,
  review_count: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: tableName,
  timestamps: false,
  underscored: true,
});

module.exports.RelatedHomes = RelatedHomes;
module.exports.tableName = tableName;

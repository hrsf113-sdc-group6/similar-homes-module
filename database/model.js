const Sequelize = require('sequelize');
const { db } = require('./index.js');

const { Model } = Sequelize.Model;

class RelatedHomes extends Model {}
RelatedHomes.init({
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  propertyAvail: Sequelize.STRING,
  locationName: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.STRING,
  reviewCount: Sequelize.INTEGER,
}, {
  modelName: 'similarHomes',
  tableName: 'similarHomes',
  timestamps: false,
  sequelize,
});

module.exports.RelatedHomes = RelatedHomes;

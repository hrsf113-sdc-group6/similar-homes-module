const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const { Model } = Sequelize;

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
  sequelize,
  modelName: 'similarHomes',
  timestamps: false,
});


module.exports.RelatedHomes = RelatedHomes;

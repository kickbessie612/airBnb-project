'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Review.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      spotId: { type: DataTypes.INTEGER, allowNull: false },
      review: { type: DataTypes.STRING, allowNull: false },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { max: 5, min: 1 }
      }
    },
    {
      sequelize,
      modelName: 'Review',
      indexes: [{ unique: true, fields: ['userId', 'spotId'] }]
    }
  );
  return Review;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class introductions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  introductions.init({
    introduction_title: DataTypes.STRING,
    introduction_description: DataTypes.STRING,
    intro_number: DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'introductions',
  });
  return introductions;
};
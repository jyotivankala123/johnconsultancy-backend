'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rss_links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rss_links.init({
    rss_link: DataTypes.TEXT,
    link_icon: DataTypes.TEXT,
    brand_title: DataTypes.TEXT,
    valid: DataTypes.ENUM('0','1'),
  }, {
    sequelize,
    modelName: 'rss_links',
  });
  return rss_links;
};
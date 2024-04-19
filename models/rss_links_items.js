'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rss_link_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rss_link_items.init({
    rss_link_id:DataTypes.INTEGER,
    image: DataTypes.STRING,
    link: DataTypes.TEXT,
    title: DataTypes.TEXT,
    content_text: DataTypes.TEXT,
    date_published: DataTypes.TEXT,
    attachments: DataTypes.JSON,
    authors: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'rss_link_items',
  });
  return rss_link_items;
};
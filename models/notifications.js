'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notifications.init({
    to_user_id: DataTypes.INTEGER,
    from_user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    message: DataTypes.STRING,
    read_unread: DataTypes.ENUM('0','1'),
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return Notifications;
};
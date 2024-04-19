'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      expertID: {
        type: Sequelize.INTEGER
      },
      slotID: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('upcoming', 'completed', 'cancelled')
      },
      video_token: {
        type: Sequelize.STRING
      },
      channel_name: {
        type: Sequelize.STRING
      },
      isPaid: {
        type: Sequelize.ENUM('0', '1')
      },
      isRefunded: {
        type: Sequelize.ENUM('0', '1')
      },
      isDeleted: {
        type: Sequelize.ENUM('0', '1')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expertID: {
        type: Sequelize.INTEGER
      },
      appointmentID: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      booked: {
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
    await queryInterface.dropTable('booking_slots');
  }
};
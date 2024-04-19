'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'others')
      },
      image: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('user', 'expert')
      },
      verified: {
        type: Sequelize.ENUM('0', '1')
      },
      password: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      isActive: {
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
    await queryInterface.dropTable('users');
  }
};
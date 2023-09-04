/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      phoneId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id'
        }
      },
      itemId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      fullPrice: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      screen: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      }
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};


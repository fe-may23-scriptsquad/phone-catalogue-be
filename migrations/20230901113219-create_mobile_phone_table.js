'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('phones', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      namespaceId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
      },
      capacityAvailable: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      capacity: {
        type: Sequelize.STRING,
      },
      priceRegular: {
        type: Sequelize.INTEGER,
      },
      priceDiscount: {
        type: Sequelize.INTEGER,
      },
      colorsAvailable: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      color: {
        type: Sequelize.STRING,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: {
        type: DataTypes.JSONB,
      },
      screen: {
        type: Sequelize.STRING,
      },
      resolution: {
        type: Sequelize.STRING,
      },
      processor: {
        type: Sequelize.STRING,
      },
      ram: {
        type: Sequelize.STRING,
      },
      camera: {
        type: Sequelize.STRING,
      },
      zoom: {
        type: Sequelize.STRING,
      },
      cell: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('phones');
  },
};


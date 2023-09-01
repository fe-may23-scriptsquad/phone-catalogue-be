/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const porductsData = require('../src/api/phones.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('products', porductsData)
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

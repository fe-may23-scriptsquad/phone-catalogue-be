/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const phonesDetailsData = require('../src/api/phonesDetails.json');
const tabletsDetailsData = require('../src/api/tabletsDetails.json');

const tabletsData = tabletsDetailsData.map(tablet => ({
  ...tablet,
  description: JSON.stringify(tablet.description),
}));

const phonesData = phonesDetailsData.map(phone => (
  { ...phone,
    description: JSON.stringify(phone.description) }
));

const data = [...phonesData, ...tabletsData];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('phones', data);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('phones', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

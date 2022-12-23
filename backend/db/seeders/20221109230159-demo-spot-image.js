'use strict';

/** @type {import('sequelize-cli').Migration} */

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName='SpotImages'
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'imgUrls11',
          preview: true
        },
        {
          spotId: 1,
          url: 'imgUrls12',
          preview: false
        },
        {
          spotId: 2,
          url: 'imgUrls2',
          preview: true
        },
        {
          spotId: 3,
          url: 'imgUrls31',
          preview: true
        },
        {
          spotId: 3,
          url: 'imgUrls32',
          preview: false
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName='SpotImages'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      { spotId: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};

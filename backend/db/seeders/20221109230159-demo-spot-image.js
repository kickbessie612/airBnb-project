'use strict';

/** @type {import('sequelize-cli').Migration} */

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://picsum.photos/id/49/400',
          preview: true
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/id/594/400',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/id/15/400',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://picsum.photos/id/236/400',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/id/308/400',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/id/946/400',
          preview: false
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,
      { spotId: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};

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
    options.tableName='ReviewImages'
    await queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: 'imgUrl1'
        },
        {
          reviewId: 2,
          url: 'imgUrl2'
        },
        {
          reviewId: 3,
          url: 'imgUrl3'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName='ReviewImages'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      { reviewId: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};

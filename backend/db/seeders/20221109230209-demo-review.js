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
    options.tableName='Reviews'
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 2,
          review: 'This was an awesome spot!',
          stars: 5
        },
        {
          userId: 2,
          spotId: 3,
          review: 'This was a good spot!',
          stars: 4
        },
        {
          userId: 3,
          spotId: 1,
          review: 'This was a OK spot!',
          stars: 3
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName='Reviews'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      { userId: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};

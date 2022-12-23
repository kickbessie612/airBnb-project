'use strict';

/** @type {import('sequelize-cli').Migration} */

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName='Bookings'
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 2,
          startDate: '2020-06-12',
          endDate: '2020-06-15'
        },
        {
          userId: 2,
          spotId: 3,
          startDate: '2021-12-01',
          endDate: '2021-12-06'
        },
        {
          userId: 3,
          spotId: 1,
          startDate: '2022-11-07',
          endDate: '2022-11-15'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName='Bookings'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      { userId: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};

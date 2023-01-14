// EVERY seeder file
'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

// add options object to up and down functions:
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';

    await queryInterface.bulkInsert(
      options,

      [
        {
          firstName: 'Yuan',
          lastName: 'Wang',
          email: 'user1@user.io',
          username: 'yuyuani',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: 'Loki',
          lastName: 'Odinson',
          email: 'user2@user.io',
          username: 'GodOfMischief',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          firstName: 'Natasha',
          lastName: 'Romanoff',
          email: 'user3@user.io',
          username: 'BlackWidow',
          hashedPassword: bcrypt.hashSync('password3')
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      options,

      { username: { [Op.in]: ['TenRings', 'GodOfMischief', 'BlackWidow'] } },
      {}
    );
  }
};

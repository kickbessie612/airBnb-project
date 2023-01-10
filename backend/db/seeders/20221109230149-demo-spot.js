// EVERY seeder file
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
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(
      options,

      [
        {
          ownerId: 1,
          address: '59678 Ismael Park',
          city: 'Wymanstead',
          state: 'Hawaii',
          country: 'Norway',
          lat: 60.1119,
          lng: 6.6237,
          name: 'Escape Paradise',
          description: 'This is a Escape Paradise',
          price: 326,
          previewImage: 'https://picsum.photos/id/428/400'
        },
        {
          ownerId: 2,
          address: '415 Schumm Crossing',
          city: 'Thielfurt',
          state: 'Oregon',
          country: 'New Caledonia',
          lat: 52.414,
          lng: 123.9947,
          name: 'Hidden Gem',
          description: 'This is a Hidden Gem',
          price: 459,
          previewImage: 'https://picsum.photos/id/236/400'
        },
        {
          ownerId: 3,
          address: '85979 Nelle Overpass',
          city: 'North Estebanshire',
          state: 'Alaska',
          country: 'Belgium',
          lat: -52.6382,
          lng: 116.3092,
          name: 'Forrest Cabin',
          description: 'This is a Forrest Cabin',
          price: 617,
          previewImage: 'https://picsum.photos/id/308/400'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(
      options,
      { name: { [Op.in]: ['Escape Paradise', 'Hidden Gem', 'Forrest Cabin'] } },
      {}
    );
  }
};

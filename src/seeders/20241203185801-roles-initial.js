'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'STAFF',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'USER',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles')
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Image',
      [
        {
          url: 'image_000.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_001.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_002.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_003.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_004.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_005.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_006.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_007.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'image_008.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Image', null, {});
  },
};

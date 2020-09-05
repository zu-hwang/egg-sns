'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Hashtag',
      [
        {
          name: '레트로',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Baking',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '오늘하루어땠나요?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Hashtag', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authorId = await Sequelize.get;
    await queryInterface.bulkInsert(
      'Feed',
      [
        {
          content: '오늘은 모델링을 끝내고, 목데이터를 넣고있어용!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '🧀🍣🥪🍜 오늘은 딱히 먹을게 없네',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '맛난 복쑹이 케이크 사러오세요',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '간만에 엄마가 만든 수줴비르 먹었지 됸맛탱!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '시크릿 쉿쉿!!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '이거 전에는 비밀 게시글이 있답니당',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Feed', null, {});
  },
};

'use strict';

const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          userName: 'blueberry',
          password: await bcrypt.hash('blueberry!!11', 12),
          email: 'blueberry@egg.com',
          fullName: 'blueberry',
          content: '블루~ 블루베리입니당 🥶',
          secretMode: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'tomato',
          password: await bcrypt.hash('tomato!!11', 12),
          phoneNumber: '010-0000-0001',
          fullName: 'tomato',
          content: '잘익은 토마토가 나야나! 🍅',
          secretMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'orange',
          password: await bcrypt.hash('orange!!11', 12),
          email: 'orange@egg.com',
          phoneNumber: '010-0000-0002',
          fullName: 'orange',
          content: '🍊오렌지 기다린지 오렌지?',
          secretMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'apple__cider',
          password: await bcrypt.hash('applecider!!11', 12),
          email: 'apple.cider@egg.com',
          phoneNumber: '010-0000-0003',
          fullName: 'apple cider',
          content: '애플애플사이다~🥂',
          secretMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: '__peach.cake',
          password: await bcrypt.hash('peachcake!!11', 12),
          email: 'peach_cake@egg.com',
          phoneNumber: '010-0000-0004',
          fullName: 'Pastry chef',
          content: '오늘 만든, 맛난 복쑹이 케이크 🍰',
          secretMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Histories', [{
      userId: 1,
      balance: 15775,
      income: 21050,
      expense: 5275,
      startDate: '2020-03-27',
      endDate: '2020-03-31',
    },
    {
      userId: 1,
      balance: 21600,
      income: 24000,
      expense: 2400,
      startDate: '2020-03-20',
      endDate: '2020-03-26',
    },
    {
      userId: 1,
      balance: 15700,
      income: 20000,
      expense: 4300,
      startDate: '2020-03-13',
      endDate: '2020-03-18',
    },
    {
      userId: 1,
      balance: 16850,
      income: 23000,
      expense: 6150,
      startDate: '2020-03-06',
      endDate: '2020-03-12',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Histories', null, {});
  }
};

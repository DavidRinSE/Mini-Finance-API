'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('HistoryCategories', [{
      historyId: 1,
      name: "Hobbies",
      amount: 5000
    },
    {
      historyId: 1,
      name: "Snacks",
      amount: 275
    },
    {
      historyId: 2,
      name: "Snacks",
      amount: 300
    },
    {
      historyId: 2,
      name: "Gas",
      amount: 2100
    },
    {
      historyId: 3,
      name: "Food",
      amount: 2000
    },
    {
      historyId: 3,
      name: "Gas",
      amount: 2300
    },
    {
      historyId: 4,
      name: "Hobbies",
      amount: 2000
    },
    {
      historyId: 4,
      name: "Food",
      amount: 1850
    },
    {
      historyId: 4,
      name: "Gas",
      amount: 2300
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HistoryCategories', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [{
      userId: 1,
      name: "Red Bull",
      category: "Snacks",
      amount: 300,
      date: "2020-04-03",
      isExpense: true
    },
    {
      userId: 1,
      name: "Kenzie Academy",
      category: "",
      amount: 230000,
      date: "2020-04-03",
      isExpense: false
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};

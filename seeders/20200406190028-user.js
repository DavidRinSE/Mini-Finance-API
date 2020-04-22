'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: "DavidRinSE",
      password: "$2b$10$N2UgtA6Ps/BTW9DBXTtWlO64xX77BK29QVE2TW0y22xRc53HDR1LC",
      balance: 221000,
      income:230000,
      expense:300,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

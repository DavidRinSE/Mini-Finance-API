'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    userId: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    income: DataTypes.INTEGER,
    expense: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING
  }, {});
  History.associate = function(models) {
    // associations can be defined here
    History.hasMany(models.HistoryCategory, {
      foreignKey: "historyId"
    })
  };
  return History;
};
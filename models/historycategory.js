'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoryCategory = sequelize.define('HistoryCategory', {
    historyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {});
  HistoryCategory.associate = function(models) {
    // associations can be defined here
  };
  return HistoryCategory;
};
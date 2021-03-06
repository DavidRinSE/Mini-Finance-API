'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoryCategory = sequelize.define('HistoryCategory', {
    historyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {timestamps: false});
  HistoryCategory.associate = function(models) {
    // associations can be defined here
    HistoryCategory.belongsTo(models.History, {
      foreignKey: "historyId",
      onDelete: 'CASCADE'
    })
  };
  return HistoryCategory;
};
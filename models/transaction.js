'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING,
    isExpense: DataTypes.BOOLEAN
  }, {timestamps: false});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};
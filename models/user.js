'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    income: DataTypes.INTEGER,
    expense: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Transaction,{
      foreignKey:"userId"
    })
    User.hasMany(models.History,{
      foreignKey:"userId"
    })
  };
  return User;
};
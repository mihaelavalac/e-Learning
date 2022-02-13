const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Status extends Model {}

//create fields/columns for Course model

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'status'
  }
);

module.exports = Status;
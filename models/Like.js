const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },

    sub_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sub_course',
        key: 'id'
      }
    },
     status: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'like'
  }
);

module.exports = Like;
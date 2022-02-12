const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sub_course extends Model {}

//create fields/columns for Course model

Sub_course.init(
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
    },
    section_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'sub_course'
  }
);

module.exports = Sub_course;
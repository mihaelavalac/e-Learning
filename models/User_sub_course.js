const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_sub_course extends Model {}

//create fields/columns for User_course model

User_sub_course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_course_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: "user_course",
        key: "id",
      },
    },
    sub_course_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: "sub_course",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user_sub_course",
  }
);

module.exports = User_sub_course;

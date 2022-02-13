const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_course extends Model {}

//create fields/columns for Course model

User_course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "course",
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "status",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user_course",
  }
);

module.exports = User_course;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_course extends Model {}

//create fields/columns for User_course model

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
    }
   
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user_course",
  }
);

module.exports = User_course;

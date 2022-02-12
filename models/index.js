const User = require('./User');
const Course = require('./Course');
const Sub_course = require('./Sub_course');
const Like = require('./Like');
const Comment = require('./Comment');

// create associations
Course.hasMany(Sub_course, {
  foreignKey: 'course_id'
});

User.belongsToMany(Sub_course, {
  through: Like,
  as: 'like_course',
  foreignKey: 'user_id'
});

User.belongsToMany(Sub_course, {
  through: Comment,
  as: 'commented_course',
  foreignKey: 'user_id'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Like.belongsTo(User, {
  foreignKey: 'user_id'
});

Sub_course.hasMany(Like, {
  foreignKey: 'sub_course_id'
});

Like.belongsTo(Sub_course, {
  foreignKey: 'sub_course_id'
});

User.hasMany(Comments, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Sub_course.hasMany(Comment, {
  foreignKey: 'sub_course_id'
});

Comment.belongsTo(Sub_course, {
  foreignKey: 'sub_course_id'
});





module.exports = { User, Course, Sub_course, Like}
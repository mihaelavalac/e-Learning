const User = require('./User');
const Course = require('./Course');
const Status = require('./Status'); 
//has the course_id as foreign_key
const Sub_course = require('./Sub_course'); 
//has user_id and sub_course_id as foreign_key + status_column
const Like = require('./Like'); 
// has user_id and sub_course_id as foreign key.
const Comment = require('./Comment'); 
 // has user_id and course_id as foreign_key 
 //association between user and course
const User_course = require('./User_course');
// hse user_course_id, sub_course_id, and status_id as foreign_key. 
const User_sub_course = require('./User_sub_course');

// create associations between course and sub-course
Course.hasMany(Sub_course, {
  foreignKey: 'course_id'
})

Sub_course.belongsTo(Course, {
  foreignKey: 'course_id'
});

// create associations between user and course through the user_course table
Course.belongsToMany(User, {
  through: User_course,
  foreignKey: 'course_id'
});

User.belongsToMany(Course, {
  through: User_course,
  foreignKey: 'user_id'
});


Sub_course.belongsToMany(User_course, {
  through: User_sub_course,
  foreignKey: 'sub_course_id'
});

User_course.belongsToMany(Sub_course, {
  through: User_sub_course,
  foreignKey: 'user_course_id'
});

Status.hasMany(User_sub_course, {
  foreignKey: 'status_id'
})

User_sub_course.belongsTo(Status, {
  foreignKey: 'status_id'
});

User.belongsToMany(Sub_course, {
  through: Like,
  as: 'liked_course',
  foreignKey: 'user_id'
});

Sub_course.belongsToMany(User, {
  through: Like,
  as: 'liked_course',
  foreignKey: 'sub_course_id'
});

User.belongsToMany(Sub_course, {
  through: Comment,
  as: 'commented_course',
  foreignKey: 'user_id'
});

Sub_course.belongsToMany(User, {
  through: Comment,
  as: 'commented_course',
  foreignKey: 'sub_course_id'
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

User.hasMany(Comment, {
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




module.exports = { User, Course, Sub_course, Like, Comment, Status, User_course, User_sub_course }
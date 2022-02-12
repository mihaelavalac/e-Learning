const User = require('./User');
const Course = require('./Course');
const Sub_course = require('./Sub_course');

// create associations
Course.hasMany(Sub_course, {
  foreignKey: 'course_id'
});

module.exports = { User, Course, Sub_course }
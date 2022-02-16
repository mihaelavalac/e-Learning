const router = require('express').Router();
const sequelize = require('../config/connection');
const { Course } = require("../models");

router.get('/', (req, res) => {
  Course.findAll({
    attributes: ["id", "title", "description"],
  }).then(dbCourseData => {
    // pass a single post object into the homepage template
    console.log(dbCourseData[0]);
    const courses = dbCourseData.map(course => course.get({ plain: true }));

    res.render('homepage', { courses });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

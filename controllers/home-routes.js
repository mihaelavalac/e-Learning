const router = require('express').Router();
const sequelize = require('../config/connection');
const { Course } = require("../models");

router.get('/', (req, res) => {
  Course.findAll({
    attributes: ["id", "title", "description"],
  }).then(dbCourseData => {
    // pass a single post object into the homepage template
    const courses = dbCourseData.map(course => course.get({ plain: true }));

    res.render('homepage', { courses });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render('login');
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;

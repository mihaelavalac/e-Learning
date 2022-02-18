const router = require("express").Router();
const sequelize = require("../config/connection");
const { Course, Sub_course } = require("../models");

router.get("/", (req, res) => {
  Course.findAll({
    attributes: ["id", "title", "description"],
  })
    .then((dbCourseData) => {
      // pass a single post object into the homepage template
      const courses = dbCourseData.map((course) => course.get({ plain: true }));

      res.render("homepage", { courses });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/course/:id", (req, res) => {
  Sub_course.findAll({
    where: {
      course_id: req.params.id,
    },
    attributes: ["id", "title", "section_url"],
  })
    .then((dbCourseData) => {

      if (!dbCourseData) {
        res.status(404).json({ message: "No course found with this id" });
        return;
      }
      const sub_courses = dbCourseData.map((course) => course.get({ plain: true }));

      res.render("single-course", { sub_courses });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

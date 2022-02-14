
const router = require("express").Router();

const { Course, User, Sub_course, Like, Comment, User_course, User_sub_course } = require("../../models");

//ROUTES FOR USER COURSES
//Get user_courses
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  User_course.findAll({
    where: {
      user_id: req.params.is
    },
    attributes: ['id', 'user_id', 'course_id'],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create user_course
router.post("/", (req, res) => {
  User_course.create({
    user_id: req.body.user_id,
    course_id: req.body.course_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//ROUTES FOR USER SUB_COURSES
router.get("/:id/sub_courses", (req, res) => {
  // Access our User model and run .findAll() method)
  User_sub_course.findAll({
    where: {
      user_course_id: req.body.id
    },
    attributes: ['id', 'user_course_id', 'sub_course_id', 'status'],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create user_sub_course
router.post("/sub_courses", (req, res) => {
  User_sub_course.create({
    user_course_id: req.body.user_course_id,
    sub_course_id: req.body.sub_course_id,
    status: req.body.status
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
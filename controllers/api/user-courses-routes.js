const router = require("express").Router();

const {
  Course,
  User,
  Sub_course,
  Like,
  Comment,
  User_course,
  User_sub_course,
} = require("../../models");

/********** ROUTES FOR USER COURSES **********/
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  User_course.findAll({
    attributes: ["id", "user_id", "course_id"],
    order: [["created_at", "DESC"]],
    include: [
      { model: User, attributes: ["first_name", "last_name"] },
      { model: Course, attributes: ["title"] },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//FIND ALL USER COURSES
router.get("/:id", (req, res) => {
  // Access our User model and run .findAll() method)
  User_course.findAll({
    where: {
      user_id: req.params.id,
    },
    attributes: ["id", "user_id", "course_id"],
    include: [
      { model: User, attributes: ["first_name", "last_name"] },
      { model: Course, attributes: ["title"] },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//CREATE USER COURSE
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

//DELETE USER COURSE
router.delete("/:id", (req, res) => {
  User_course.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No course found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/********** ROUTES FOR USER SUB_COURSES **********/
router.get("/:id/sub_courses", (req, res) => {
  // Access our User model and run .findAll() method)
  User_sub_course.findAll({
    where: {
      user_course_id: req.params.id,
    },
    attributes: ["id", "user_course_id", "sub_course_id", "status"],
    include: [
      { model: User, attributes: ["first_name", "last_name"] },
      { model: Sub_course, attributes: ["title", "section_url"] },
    ],
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
    status: req.body.status,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

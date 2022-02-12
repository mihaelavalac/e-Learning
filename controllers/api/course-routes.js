const router = require("express").Router();
const { Course, User, Sub_course } = require("../../models");

// get all course

router.get("/", (req, res) => {
  Course.findAll({
    attributes: ["id", "title", "description"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/sub_courses", (req, res) => {
  Sub_course.findAll({
    attributes: ["id", "title", "section_url", "course_id"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Course.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description"],
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

router.get("/:id/sub_courses/", (req, res) => {
  Sub_course.findAll({
    where: {
      course_id: req.params.id,
    },
    attributes: ["id", "title", "section_url", "course_id"],
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

router.post("/", (req, res) => {
  Course.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/sub_course", (req, res) => {
  Sub_course.create({
    title: req.body.title,
    section_url: req.body.section_url,
    course_id: req.body.course_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

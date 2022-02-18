const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Sub_course, Course, Comment, Like } = require("../../models");

/* ************  ROUTES FOR SUB_COURSES ************** */
//FIND ALL SUB_COURSES FROM A COURSE

//UPDATE ONE SUB_COURSE
router.put("/:id", (req, res) => {
  Sub_course.update(
    {
      title: req.body.title,
      section_url: req.body.section_url,
      course_id: req.body.course_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No sub_course found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/course/:id", (req, res) => {
  Sub_course.findAll({
    where: {
      course_id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "section_url",
      "course_id",
      // [
      //   sequelize.literal(
      //     `(SELECT COUNT(*) FROM like AS likes WHERE likes.sub_course_id = sub_course.id AND likes.status = true)`
      //   ),
      //   'like_count'
      // ],
      // [
      //   sequelize.literal(
      //     `(SELECT COUNT(*) FROM like AS unlikes WHERE unlikes.sub_course_id = sub_course.id AND lunikes.status = false)`
      //   ),
      //   'unlike_count',
      // ],
    ],
    include: [
      {
        model: Course,
        attributes: ["title", "description", "name"],
      },
      {
        model: Comment,
        attributes: ["comment_text", "user_id", "sub_course_id", "created_at"],
      },
      {
        model: Like,
        attributes: ["user_id", "status"],
      },
    ],
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

//FIND ONE SUB_COURSE BY ID
router.get("/:id", (req, res) => {
  Sub_course.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "section_url",
      "course_id",
      // [
      //   sequelize.literal(
      //     "(SELECT COUNT(*) FROM like WHERE sub_course.id = like.sub_course_id)"
      //   ),
      //   "like_count",
      // ],
    ],
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
//CREATE ONE SUB_COURSE
router.post("/", (req, res) => {
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

//DELETE ONE SUB_COURSE
router.delete("/:id", (req, res) => {
  Sub_course.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const { Course, User, Sub_course, Like } = require("../../models");

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

//get course by id
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

//Route for all sub_sections.
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

//get all sub_courses by course id
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

//get sub_courses by id
router.get("/sub_courses/:id", (req, res) => {
  Sub_course.findOne({
    where: {
      id: req.params.id,
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

//Create course
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

// create sub_course
router.post("/sub_courses", (req, res) => {
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

// add like to a course
router.post("/sub_courses/like", (req, res) => {
  Like.create({
    user_id: req.body.user_id,
    sub_course_id: req.body.sub_course_id,
    status: req.body.status,
  }).then(() => {
    // then find the post we just voted on
    return Sub_course.findOne({
      where: {
        id: req.body.sub_course_id,
      },
      attributes: [
        "id",
        "title",
        "section_url",
        "course_id"
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM like WHERE sub_course.id = like.sub_course_id AND like.status = true)"
          ),
          "like_count"
        ],
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
});

module.exports = router;
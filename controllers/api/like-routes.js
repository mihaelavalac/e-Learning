const sequelize = require("../../config/connection");
const router = require("express").Router();
const {  Sub_course, Like } = require("../../models");

/*  *********** ROUTES FOR LIKE  ************ */
//FIND ALL LIKES
//FIND ONE LIKE BY ID

//CREATE ONE LIKE TO A SUB_COURSE
router.post("/", (req, res) => {
  Like.create({
    user_id: req.body.user_id,
    sub_course_id: req.body.sub_course_id,
    status: req.body.status,
  })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  
//UPDATE ONE LIKE
router.put("/:id", (req, res) => {
  Like.update(
    {
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE ONE LIKE



module.exports = router;
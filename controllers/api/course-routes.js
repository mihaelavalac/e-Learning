const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Course} = require("../../models");

/* ************  ROUTES FOR COURSES ************** */
//FIND ALL COURSES
router.get("/", (req, res) => {
  Course.findAll({
    attributes: ["id", "title", "description", "img_name"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//FIND ONE COURSES BY ID
router.get("/:id", (req, res) => {
  Course.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description" , "img_name"],
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

//CREATE ONE COURSES
router.post("/", (req, res) => {
  Course.create({
    title: req.body.title,
    description: req.body.description,
    img_name: req.body.img_name
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//UPDATE ONE COURSES
router.put("/:id", (req, res) => {
  Course.update(
    {
      title: req.body.title,
      description: req.body.description,
      img_name: req.body.img_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
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

//DELETE ONE COURSES
router.delete("/:id", (req, res) => {
  Course.destroy({
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


module.exports = router;

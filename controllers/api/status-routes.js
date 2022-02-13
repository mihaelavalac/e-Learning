const router = require("express").Router();
const {
  Status
} = require("../../models");

//Get Status table
router.get("/", (req, res) => {
  Status.findAll({
    attributes: ["id", "title"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create Status Table
router.post("/status", (req, res) => {
  Status.create({
    title: req.body.title,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});








module.exports = router;

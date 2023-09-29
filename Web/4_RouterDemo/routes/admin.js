const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("sorry not an admin!");
});

router.get("/", (req, res) => {
  res.send("Admin Page");
});

router.get("/topsecret", (req, res) => {
  res.send("THIS IS TOP SECRET");
});

router.get("/deleteeverything", (req, res) => {
  res.send("deleting everything");
});

module.exports = router;

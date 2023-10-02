const express = require("express");
const router = express.Router();
const passport = require("../model/passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/loginsuccess",
    failureRedirect: "/loginfail",
    failureFlash: true,
  })
);

router.get("/check", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(401).json({ message: "fail" });
  }
});

router.get("/loginsuccess", (req, res) => {
  res.render("loginsuccess");
});

router.get("/loginfail", (req, res) => {
  res.render("loginfail");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../model/db");
const bcrypt = require("bcrypt");

const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  console.log("register");
  console.log(req.body);
  const { nickname, email, password } = req.body;
  hash = await bcrypt.hash(password, 12);

  const sql = `INSERT INTO users (nickname, email, password) VALUES (?, ?, ?)`;
  try {
    await db.query(sql, [nickname, email, hash]);
    res.status(200).send("회원가입 성공");
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  try {
    const [result] = await db.query(sql, [email]);
    if (result.length === 0) {
      res.status(400).send("가입되지 않은 이메일입니다.");
    } else {
      const compare = await bcrypt.compare(password, result[0].password);
      if (compare) {
        req.session.user = result[0].nickname;
        res.redirect("/");
      } else {
        res.status(400).send("비밀번호가 틀렸습니다.");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/", requireLogin, (req, res) => {
  res.send(`Hello ${req.session.user}`);
});
module.exports = router;
